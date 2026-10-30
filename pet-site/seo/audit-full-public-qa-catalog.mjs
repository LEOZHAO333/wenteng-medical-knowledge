#!/usr/bin/env node
/**
 * Read-only full-site HTTP + basic SEO audit for the actual public pet domain.
 * Executes on GitHub-hosted runner; does not claim Google/Baidu indexed the URLs.
 * No login, secrets, paid APIs, or website writes.
 */
import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const BASE='https://pet.japanmedai.com';
const EXPECTED=95, EXPECTED_QA=90;
const RUN_AT=new Date().toISOString();
const reportDir=process.env.AUDIT_OUTPUT_DIR||'pet-site/seo/audit-output';
const errors=[];
const warnings=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function get(url){
  const safe=new URL(url);
  if(safe.origin!==BASE||!['/','/sitemap.xml'].includes(safe.pathname)&&!/^\/(?:qa\/[a-z0-9-]+\/|cat\/|dog\/|about\/)$/.test(safe.pathname)){
    throw new Error('disallowed audit path '+url);
  }
  for(let attempt=1;attempt<=2;attempt++){
    try{
      const res=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(18000),headers:{'User-Agent':'RiChongTong-Public-SEO-Audit/1.0 (read-only; Github CI)'}});
      const text=await res.text();
      if((res.status===429||res.status>=500)&&attempt<2){await sleep(1200);continue}
      return {url,status:res.status,finalUrl:res.url,contentType:res.headers.get('content-type')||'',xRobots:res.headers.get('x-robots-tag')||'',text,attempts:attempt};
    }catch(e){
      if(attempt===2)return {url,status:0,error:String(e.message||e),finalUrl:'',contentType:'',xRobots:'',text:'',attempts:attempt};
      await sleep(1200);
    }
  }
}
const sitemap=await get(BASE+'/sitemap.xml');
if(sitemap.status!==200||!sitemap.contentType.includes('xml'))throw new Error('Cannot inspect live sitemap: HTTP '+sitemap.status+' '+(sitemap.error||''));
const entries=[...sitemap.text.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(m=>({url:m[1],lastmod:m[2]}));
if(entries.length!==EXPECTED)errors.push('sitemap URL count '+entries.length+' expected '+EXPECTED);
if(new Set(entries.map(e=>e.url)).size!==entries.length)errors.push('duplicate URLs in sitemap');
const articleURLs=entries.filter(e=>/^https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\/$/.test(e.url));
if(articleURLs.length!==EXPECTED_QA)errors.push('QA article count '+articleURLs.length+' expected '+EXPECTED_QA);
const dateCount=Object.create(null);
for(const item of entries){
  if(!/^https:\/\/pet\.japanmedai\.com\/(?:|qa\/|qa\/[a-z0-9-]+\/|cat\/|dog\/|about\/)$/.test(item.url))errors.push('unexpected URL '+item.url);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(item.lastmod))errors.push('invalid lastmod '+item.url);
  dateCount[item.lastmod]=(dateCount[item.lastmod]||0)+1;
}
const batchSize=6;
const pages=[];
for(let i=0;i<entries.length;i+=batchSize){
  const chunk=await Promise.all(entries.slice(i,i+batchSize).map(async item=>{
    const result=await get(item.url);
    const html=result.text;
    const pick=re=>(html.match(re)||[])[1]||'';
    const canonical=pick(/<link rel="canonical" href="([^"]+)">/);
    const robots=pick(/<meta name="robots" content="([^"]+)">/);
    const title=pick(/<title>([^<]*)<\/title>/);
    const desc=pick(/<meta name="description" content="([^"]*)">/);
    const h1=pick(/<h1[^>]*>([^<]*)<\/h1>/);
    const rawLD=pick(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let graphTypes=[];
    let schemaError='';
    if(rawLD){
      try {
        const obj=JSON.parse(rawLD);
        const graph=Array.isArray(obj['@graph'])?obj['@graph']:[obj];
        graphTypes=graph.flatMap(x=>Array.isArray(x['@type'])?x['@type']:[x['@type']]).filter(Boolean);
      }catch(e){schemaError=String(e.message||e)}
    }
    const isQA=/\/qa\/[a-z0-9-]+\/$/.test(item.url);
    const row={url:item.url,kind:isQA?'qa':'core',lastmod:item.lastmod,status:result.status,finalUrl:result.finalUrl,canonical,metaRobots:robots,httpRobots:result.xRobots,titleLength:title.length,metaDescriptionLength:desc.length,h1Length:h1.length,articleJsonLd:graphTypes.includes('Article'),faqJsonLd:graphTypes.includes('FAQPage'),schemaError,responseBytes:html.length,attempts:result.attempts,error:result.error||''};
    const issues=[];
    if(result.status!==200)issues.push('HTTP_'+result.status);
    if(result.finalUrl!==item.url)issues.push('UNEXPECTED_FINAL_URL');
    if(!result.contentType.includes('html'))issues.push('NON_HTML_RESPONSE');
    if(canonical!==item.url)issues.push('CANONICAL_MISMATCH');
    if(!robots.includes('index')||robots.includes('noindex'))issues.push('HTML_ROBOTS_BAD');
    if(!result.xRobots.includes('index')||result.xRobots.includes('noindex'))issues.push('HTTP_ROBOTS_BAD');
    if(!title)issues.push('NO_TITLE');
    if(!desc)issues.push('NO_META_DESCRIPTION');
    if(!h1)issues.push('NO_H1');
    if(isQA&&(!row.articleJsonLd||!row.faqJsonLd))issues.push('ARTICLE_FAQ_SCHEMA_MISSING');
    if(schemaError)issues.push('INVALID_JSON_LD');
    if(isQA&&!html.includes('立即就医信号'))issues.push('NO_EMERGENCY_SECTION');
    if(isQA&&html.includes('review_questions'))issues.push('INTERNAL_REVIEW_FIELDS_LEAK');
    if(isQA&&!/2026-10-(?:15|29|30)/.test(html))issues.push('NO_VISIBLE_REVIEW_DATE'); // advisory only
    row.issues=issues;
    return row;
  }));
  pages.push(...chunk);
  if((i+batchSize)%30===0)console.log('audited',Math.min(i+batchSize,entries.length),'/',entries.length);
}
for(const row of pages)for(const issue of row.issues){
  const label=row.url+' '+issue;
  if(issue==='NO_EMERGENCY_SECTION'||issue==='NO_VISIBLE_REVIEW_DATE')warnings.push(label);
  else errors.push(label);
}
const qa=pages.filter(x=>x.kind==='qa');
const core=pages.filter(x=>x.kind==='core');
const summary={audit:'pet-public-full-95-URL-SEO-crawl',checkedAt:RUN_AT,scope:'independent public HTTPS GET by GitHub CI; not GSC/Baidu indexing',sitemap:{status:sitemap.status,expectedURLs:EXPECTED,actualURLs:entries.length,expectedQA:EXPECTED_QA,actualQA:articleURLs.length,lastmodDistribution:dateCount},pages:{total:pages.length,core:core.length,qa:qa.length,http200:pages.filter(x=>x.status===200).length,canonicalExact:pages.filter(x=>x.canonical===x.url).length,indexableRobots:pages.filter(x=>x.metaRobots.includes('index')&&!x.metaRobots.includes('noindex')&&x.httpRobots.includes('index')&&!x.httpRobots.includes('noindex')).length,qaSchemaComplete:qa.filter(x=>x.articleJsonLd&&x.faqJsonLd).length,qaEmergencySection:qa.filter(x=>!x.issues.includes('NO_EMERGENCY_SECTION')).length},errorCount:errors.length,warningCount:warnings.length,errors:errors.slice(0,120),warnings:warnings.slice(0,120)};
mkdirSync(reportDir,{recursive:true});
writeFileSync(resolve(reportDir,'pet-full95-results.json'),JSON.stringify({summary,pages},null,2)+'\n');
const keys=['url','kind','lastmod','status','finalUrl','canonical','metaRobots','httpRobots','titleLength','metaDescriptionLength','h1Length','articleJsonLd','faqJsonLd','schemaError','responseBytes','attempts','error','issues'];
const csvVal=v=>'"'+String(Array.isArray(v)?v.join(';'):v??'').replaceAll('"','""')+'"';
writeFileSync(resolve(reportDir,'pet-full95-results.csv'),[keys.join(','),...pages.map(p=>keys.map(k=>csvVal(p[k])).join(','))].join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
if(errors.length)process.exitCode=1;
