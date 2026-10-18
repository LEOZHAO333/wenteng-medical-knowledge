#!/usr/bin/env node
/**
 * Draft-only inventory of S/A content and editor source-ledger rows.
 * Reads existing Markdown WITHOUT modifying the canonical text.
 * No sources are considered medically verified by this exporter.
 *
 * node pet-site/seo/export-content-inventory.mjs --summary
 * node pet-site/seo/export-content-inventory.mjs --out=/tmp/pet-inventory.json
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const contentDir=join(dirname(fileURLToPath(import.meta.url)),'../content');
const allFiles=readdirSync(contentDir).sort();
const bodyFiles=allFiles.filter(n=>/^(S-TIER-.+|A-TIER-BATCH-\d+-.+)\.md$/.test(n));
const verificationFiles=allFiles.filter(n=>/^SOURCE-VERIFICATION-BATCH-\d+\.md$/.test(n));
const issues=[];
const grouped=new Map(), slugOwners=new Map(), editorialLedger=new Map();
const nodeHeader=/^##\s+(\d{4})\s*｜\s*(.+?)\s*$/gm;
const isSlug=s=>/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const count={aTier:0,sTier:0,ledgerRows:0};
for(const filename of bodyFiles){
  const tier=filename.startsWith('A-TIER')?'A':'S';
  const text=readFileSync(join(contentDir,filename),'utf8');
  const headings=[...text.matchAll(nodeHeader)];
  if(!headings.length)issues.push({type:'no_article_headings',file:filename});
  for(let i=0;i<headings.length;i++){
    const match=headings[i];
    const block=text.slice(match.index,headings[i+1]?.index??text.length);
    const slugMatch=block.match(/^\s*-\s*(?:Slug|canonicalSlug)\s*[：:]\s*\x60?([a-z0-9-]+)\x60?\s*$/m);
    const slug=slugMatch?.[1]??null;
    const title=match[2].trim();
    const id=match[1];
    count[tier==='A'?'aTier':'sTier']++;
    if(!slug||!isSlug(slug))issues.push({type:'missing_or_invalid_slug',file:filename,id,slug});
    const record={id,slug,title,tier,file:'pet-site/content/'+filename};
    if(!grouped.has(id))grouped.set(id,[]);
    grouped.get(id).push(record);
    if(slug){
      if(!slugOwners.has(slug))slugOwners.set(slug,new Set());
      slugOwners.get(slug).add(id);
    }
  }
}
for(const filename of verificationFiles){
  const sourceText=readFileSync(join(contentDir,filename),'utf8');
  for(const match of sourceText.matchAll(/^\|\s*(\d{4})\s*\|\s*([^|\r\n]+)\s*\|/gm)){
    const id=match[1],status=match[2].replace(/\*/g,'').trim();
    if(!/source_verified_editorial|needs_edit|hold|official_|pending/i.test(status))continue;
    count.ledgerRows++;
    if(!editorialLedger.has(id))editorialLedger.set(id,[]);
    editorialLedger.get(id).push({file:'pet-site/content/'+filename,status});
  }
}
const items=[];
for(const [id,versions] of grouped){
  const sorted=versions.slice().sort((a,b)=>a.tier===b.tier?a.file.localeCompare(b.file):a.tier==='S'?-1:1);
  const slugs=[...new Set(versions.map(x=>x.slug).filter(Boolean))];
  const titles=[...new Set(versions.map(x=>x.title))];
  const sourceLedger=editorialLedger.get(id)??[];
  if(slugs.length>1)issues.push({type:'same_id_multiple_slugs',id,slugs,files:versions.map(x=>x.file)});
  if(versions.filter(x=>x.tier==='A').length>1)issues.push({type:'duplicate_a_tier_id',id});
  if(versions.filter(x=>x.tier==='S').length>1)issues.push({type:'duplicate_s_tier_id',id});
  items.push({
    id,
    primaryCandidate: sorted[0],
    alternativeSources:sorted.slice(1),
    candidateSlugs:slugs,
    candidateTitles:titles,
    editorialLedger:sourceLedger,
    hasEditorialLedgerEntry:sourceLedger.length>0,
    sourceClaimLinksVerified:false,
    medicalReviewStatus:'pending',
    officialJapanProductVerificationStatus:'pending_if_product_specific',
    publicationState:'draft',
    indexEligible:false,
    founderPublishApproved:false,
    founderIndexApproved:false
  });
}
for(const [slug,owners] of slugOwners){
  if(owners.size>1)issues.push({type:'same_slug_multiple_ids',slug,ids:[...owners]});
}
for(const [id,entries] of editorialLedger){
  if(!grouped.has(id))issues.push({type:'ledger_id_missing_from_SA_body',id,files:entries.map(x=>x.file)});
}
items.sort((a,b)=>a.id.localeCompare(b.id));
const withoutLedger=items.filter(x=>!x.hasEditorialLedgerEntry);
const flaggedNeedsEdit=items.filter(x=>x.editorialLedger.some(y=>y.status.includes('needs_edit')));
const summary={
  files:{aTier:bodyFiles.filter(x=>x.startsWith('A-TIER')).length,sTier:bodyFiles.filter(x=>x.startsWith('S-TIER')).length,sourceVerification:verificationFiles.length},
  counts:{aTierSections:count.aTier,sTierSections:count.sTier,uniqueBodyIds:items.length,uniqueBodySlugs:slugOwners.size,editorialLedgerRows:count.ledgerRows,editorialLedgerIds:editorialLedger.size,idsWithLedger:items.filter(x=>x.hasEditorialLedgerEntry).length,idsWithoutLedger:withoutLedger.length,sTierWithoutLedger:withoutLedger.filter(x=>x.primaryCandidate.tier==='S').length,aTierWithoutLedger:withoutLedger.filter(x=>x.primaryCandidate.tier==='A').length,itemsWithAnyHistoricalNeedsEdit:flaggedNeedsEdit.length},
  nextReviewSample:withoutLedger.slice().sort((a,b)=>(a.primaryCandidate.tier===b.primaryCandidate.tier)?a.id.localeCompare(b.id):a.primaryCandidate.tier==='S'?-1:1).slice(0,15).map(x=>({id:x.id,title:x.primaryCandidate.title,tier:x.primaryCandidate.tier,file:x.primaryCandidate.file})),
  issueCounts:issues.reduce((acc,x)=>(acc[x.type]=(acc[x.type]??0)+1,acc),{}),
  caveat:'本报告仅扫描文件标题、ID、slug及批次状态。已核对源批次不能替代逐篇链接与医学审稿；不授权上线。'
};
const output={generatedBy:'pet-site/seo/export-content-inventory.mjs',summary,issues,items};
if(process.argv.includes('--summary')||process.argv.includes('--check'))console.log(JSON.stringify({summary,issues:issues.slice(0,35)},null,2));
else if(!process.argv.some(x=>x.startsWith('--out=')))console.log(JSON.stringify(output,null,2));
const outArg=process.argv.find(x=>x.startsWith('--out='));
if(outArg)writeFileSync(outArg.slice('--out='.length),JSON.stringify(output,null,2)+'\n','utf8');
if(process.argv.includes('--check')){
  if(count.aTier!==350){console.error('Expected 350 A-tier draft sections; got '+count.aTier);process.exitCode=1;}
  if(issues.some(x=>['missing_or_invalid_slug','same_slug_multiple_ids','duplicate_a_tier_id','duplicate_s_tier_id','ledger_id_missing_from_SA_body'].includes(x.type)))process.exitCode=1;
}
