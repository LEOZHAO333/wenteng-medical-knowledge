#!/usr/bin/env node
/**
 * 日宠通 40条renderer节点 与 GEO源对照的静态一致性审计。
 * 只读取本地git文件；不访问网络，不变更上线状态。
 * Usage: node pet-site/seo/audit-current-site.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const seoDir=dirname(fileURLToPath(import.meta.url));
const siteSource=readFileSync(resolve(seoDir,'../api/pet.js'),'utf8');
const crosswalk=JSON.parse(readFileSync(resolve(seoDir,'current-site-crosswalk.json'),'utf8'));
const recent=JSON.parse(readFileSync(resolve(seoDir,'recent-chat-question-reconciliation.json'),'utf8'));
const errors=[];
const warnings=[];
const fail=s=>errors.push(s);
const warn=s=>warnings.push(s);

const start=siteSource.indexOf('const articles = [');
const end=siteSource.indexOf('\n];',start);
if (start<0||end<0) throw new Error('Unable to locate runtime article list; inspect parser');
const renderedLines=siteSource.slice(start,end).split('\n')
  .filter(line=>/^\s+\{(?:slug:|"slug":)/.test(line));
const readKey=(line,key)=>{
 const quoted=line.match(new RegExp('(?:\\b'+key+':|"'+key+'":)\\s*\\x27([^\\x27]*)\\x27'));
 if(quoted)return quoted[1];
 const json=line.match(new RegExp('(?:\\b'+key+':|"'+key+'":)\\s*"([^"]*)"'));
 return json?json[1]:null;
};
const site=renderedLines.map(line=>({slug:readKey(line,'slug'),title:readKey(line,'title'),species:readKey(line,'species'),refsPresent:/\brefs:|"refs":/.test(line)}));
const slugs=new Set(),idOwners=new Map();
for(const row of site){
 if(!row.slug||!row.title||!row.species)fail('renderer missing slug/title/species');
 if(slugs.has(row.slug))fail('runtime duplicate slug: '+row.slug);
 slugs.add(row.slug);
}
if(crosswalk.items.length!==site.length)fail('Crosswalk count differs from runtime '+crosswalk.items.length+' vs '+site.length);
const linked=new Set();
const matched={exact_slug:0,similar_question_needs_editorial_review:0,related_only:0,new_topic_no_library_id:0};
for(const item of crosswalk.items){
 if(linked.has(item.rendererSlug))fail('duplicate crosswalk slug: '+item.rendererSlug);
 linked.add(item.rendererSlug);
 const a=site.find(z=>z.slug===item.rendererSlug);
 if(!a){fail('crosswalk slug absent from renderer: '+item.rendererSlug);continue;}
 if(item.rendererTitle!==a.title||item.rendererSpecies!==a.species)
   fail('crosswalk title/species mismatch for '+item.rendererSlug);
 if(item.matchStatus in matched)matched[item.matchStatus]++;
 else fail('unknown matchStatus '+item.matchStatus);
 if(item.matchStatus==='exact_slug'){
   if(!item.matchedKnowledgeId||item.matchedKnowledgeId!==item.candidateKnowledgeId)
     fail('exact match missing equal matchedKnowledgeId and candidateKnowledgeId: '+item.rendererSlug);
   const owner=idOwners.get(item.matchedKnowledgeId);
   if(owner)fail('same confirmed ID linked to multiple slugs: '+owner+' vs '+item.rendererSlug);
   idOwners.set(item.matchedKnowledgeId,item.rendererSlug);
 }else if(item.matchedKnowledgeId!==null){
   fail('non-exact match must not claim confirmed knowledge ID: '+item.rendererSlug);
 }
 if(item.canonicalAction!=='keep_renderer_slug_unchanged_pending_review')
   fail('unauthorized redirect/rewrite action: '+item.rendererSlug);
 if(item.publishDecision!=='not_authorized'||item.medicalReviewStatus!=='pending')
   fail('crosswalk must not silently promote unpublished medical content: '+item.rendererSlug);
}
const reviewed=JSON.parse(readFileSync(resolve(seoDir,'title-intent-reconciliation-v1.2.json'),'utf8'));
const reviewBySlug=new Map(reviewed.items.map(x=>[x.rendererSlug,x]));
const sourceCache=new Map();
for(const item of crosswalk.items){
  if(item.matchStatus==='new_topic_no_library_id')continue;
  const path=item.candidateSourcePath;
  if(!/^pet-site\/content\/(?:S-TIER-[A-Z0-9-]+|A-TIER-BATCH-\d+-[A-Z0-9-]+)\.md$/.test(path||'')){
    fail('unexpected source location for '+item.rendererSlug);continue;
  }
  let content;
  try{
    if(!sourceCache.has(path))
      sourceCache.set(path,readFileSync(resolve(seoDir,'../content',path.slice('pet-site/content/'.length)),'utf8'));
    content=sourceCache.get(path);
  }catch(e){fail('missing source file '+path);continue;}
  const headings=[...content.matchAll(/^##\s+(\d{4})[｜\s]+([^\n]*)/gm)];
  const i=headings.findIndex(h=>h[1]===item.candidateKnowledgeId);
  if(i<0){fail('candidate ID absent from source: '+item.rendererSlug+' -> '+item.candidateKnowledgeId);continue;}
  const heading=headings[i],block=content.slice(heading.index,headings[i+1]?.index??content.length);
  const slug=(block.match(/-\s*(?:Slug|canonicalSlug)[：:]\s*\x60([a-z0-9-]+)\x60/)||[])[1];
  if(!slug)fail('source ID has no slug: '+item.candidateKnowledgeId);
  if(item.matchStatus==='exact_slug'&&slug!==item.rendererSlug)
    fail('exact_slug evidence mismatch: '+item.rendererSlug+' vs '+slug);
  if(item.matchStatus!=='exact_slug'){
    const review=reviewBySlug.get(item.rendererSlug);
    if(!review||review.candidateKnowledgeId!==item.candidateKnowledgeId||
       review.knowledgeTitle!==heading[2].trim()||review.knowledgeFile!==path)
      fail('editorial title/intent review no longer matches source: '+item.rendererSlug);
    if(review?.reviewType==='identical_title_different_slug'&&item.rendererTitle!==heading[2].trim())
      fail('exact-title review drift for '+item.rendererSlug);
    if(review?.medicalApproval!=='pending'||review?.redirectApproved!==false)
      fail('unexpected publication/redirect status '+item.rendererSlug);
  }
}
if(reviewBySlug.size!==crosswalk.items.filter(x=>x.matchStatus!=='exact_slug'&&x.matchStatus!=='new_topic_no_library_id').length)
  fail('editorial review should cover every non-exact slug mapping');

for(const row of site)if(!linked.has(row.slug))fail('renderer article omitted from crosswalk: '+row.slug);
if(new Set(recent.items.map(x=>x.queueKey)).size!==recent.items.length)fail('duplicated recent question queue key');
for(const x of recent.items){
 if(x.publicURL!==null||x.medicalReview!=='pending')
   fail('recent question wrongly marked published/medically approved: '+x.queueKey);
}
const noindexMeta=siteSource.includes('<meta name="robots" content="noindex,follow">');
const noindexHeader=siteSource.includes("res.setHeader('X-Robots-Tag','noindex, follow')");
if(!noindexMeta||!noindexHeader)
 warn('Current renderer no longer has hardcoded draft noindex; separately verify PR #7 INDEXABLE and Founder authorization.');
if(siteSource.includes('dateModified:UPDATED'))
 warn('P0: all Article dateModified currently use global UPDATED, not evidence-based per-article dates.');
if(/function sitemap\(\).*articles\.map/.test(siteSource))
 warn('P0: sitemap includes all runtime articles without checking medical/Founder index eligibility.');
if(/\.slice\(0,4\)/.test(siteSource)&&/function articlePage/.test(siteSource))
 warn('P1: related links are generated by topic/species and need review against relatedIds.');
const missingRefs=site.filter(x=>!x.refsPresent).length;
if(missingRefs)warn(`${missingRefs}/${site.length} renderer articles have no inline refs field in the source; individual medical source review needed.`);
console.log(JSON.stringify({siteRecords:site.length,withInlineRefs:site.length-missingRefs,exactSlug:matched.exact_slug,similarQuestion:matched.similar_question_needs_editorial_review,relatedOnly:matched.related_only,sourceFilesChecked:sourceCache.size,intentReviews:reviewed.items.length,recentQueue:recent.items.length,hardNoindexOnMain:!!noindexMeta&&!!noindexHeader,errors,warnings},null,2));
if(errors.length)process.exitCode=1;
