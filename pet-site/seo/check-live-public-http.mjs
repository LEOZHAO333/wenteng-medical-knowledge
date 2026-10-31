#!/usr/bin/env node
/** Read-only, public-network smoke test for pet.japanmedai.com.
 * Requires Node 20+. Does not use user credentials, private records, or privileged APIs.
 * Unlike the local renderer regression, this checks actual HTTPS responses.
 * Invoke: node pet-site/seo/check-live-public-http.mjs
 */
import assert from 'node:assert/strict';

const BASE='https://pet.japanmedai.com';
const critical=['cat-cloudy-eye','dog-bloated-dry-heaving','cat-licked-topical-parasite-product','kitten-milk-aspiration','cat-feeding-tube-home-care'];
const paths=['/','/qa/','/sitemap.xml','/robots.txt','/llms.txt','/llms-full.txt','/new-drugs/','/qa/nonexistent-seo-audit-probe-404/',...critical.map(s=>'/qa/'+s+'/')];
const failures=[];
const results={};
async function request(path){
  const address=BASE+path;
  try{
    const res=await fetch(address,{redirect:'follow',signal:AbortSignal.timeout(15000),headers:{'user-agent':'PetSite-SEO-Audit/1.0 (public, read-only)'}});
    const body=await res.text();
    return {status:res.status,finalUrl:res.url,contentType:res.headers.get('content-type')||'',xRobots:res.headers.get('x-robots-tag')||'',body};
  }catch(error){return {status:0,error:String(error?.message||error),body:'',contentType:'',xRobots:'',finalUrl:''};}
}
const payload=await Promise.all(paths.map(request));
for(let i=0;i<paths.length;i++)results[paths[i]]=payload[i];
const check=(name,fn)=>{try{fn();}catch(e){failures.push(name+': '+e.message);}};

for(const path of paths){
  const r=results[path];
  const expectedStatus=path.includes('nonexistent-seo-audit-probe')?404:200;
  check(path+' returns expected HTTP status',()=>{
    assert.equal(r.status,expectedStatus,JSON.stringify({status:r.status,error:r.error||null,finalUrl:r.finalUrl}));
    assert.ok(r.finalUrl.startsWith(BASE+'/'),'unexpected redirect '+r.finalUrl);
  });
}
const xml=results['/sitemap.xml'];
check('live production sitemap 193 canonical URLs',()=>{
  assert.match(xml.contentType,/xml/);
  const locs=[...xml.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.equal(locs.length,193,'live sitemap URL count');
  assert.equal(new Set(locs).size,193,'live sitemap duplicate URLs');
  assert.equal(locs.filter(x=>/^https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\/$/.test(x)).length,188,'live QA URLs');
});
check('live production sitemap core directory date changes',()=>{
  for(const p of ['/','/qa/','/cat/','/dog/']){
    assert.ok(xml.body.includes('<loc>'+BASE+p+'</loc><lastmod>2026-10-30</lastmod>'),'missing core date '+p);
  }
  assert.ok(xml.body.includes('<loc>'+BASE+'/about/</loc><lastmod>2026-10-17</lastmod>'));
});
check('live robots references canonical sitemap',()=>{
  assert.match(results['/robots.txt'].body,/Sitemap: https:\/\/pet\.japanmedai\.com\/sitemap\.xml/);
});
check('live AI index contains 188 unique QA article links',()=>{
  const urls=[...results['/llms-full.txt'].body.matchAll(/https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\/\)/g)].map(m=>m[0].slice(0,-1));
  assert.equal(urls.length,188);
  assert.equal(new Set(urls).size,188);
});
check('non-indexable new-drugs and missing page',()=>{
  const drugs=results['/new-drugs/'],missing=results['/qa/nonexistent-seo-audit-probe-404/'];
  assert.match(drugs.body,/<meta name="robots" content="noindex,follow">/);
  assert.match(missing.body,/<meta name="robots" content="noindex,follow">/);
  assert.match(drugs.xRobots,/noindex/);
  assert.match(missing.xRobots,/noindex/);
});
for(const slug of critical){
  const path='/qa/'+slug+'/', r=results[path];
  check('actual HTML SEO and FAQ schema '+slug,()=>{
    assert.match(r.contentType,/html/);
    assert.ok(r.body.includes('<link rel="canonical" href="'+BASE+path+'">'),'canonical mismatch');
    assert.match(r.body,/<meta name="robots" content="index,follow">/);
    assert.match(r.xRobots,/index/);
    assert.ok(r.body.includes('立即就医信号'),'missing emergency warning');
    const ld=r.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(ld,'JSON-LD missing');
    const schema=JSON.parse(ld[1]);
    const article=(schema['@graph']||[]).find(x=>x['@type']==='Article');
    const faq=(schema['@graph']||[]).find(x=>x['@type']==='FAQPage');
    assert.ok(article&&faq,'Article/FAQ schema missing');
    assert.equal(article.mainEntityOfPage,BASE+path);
    assert.ok(faq.mainEntity.length>=4);
  });
}
const summary={
  audit:'pet-live-public-HTTP-SEO-smoke',
  checkedAt:new Date().toISOString(),
  source:'GitHub-hosted runner external HTTPS requests',
  domain:BASE,
  attemptedRequests:paths.length,
  results:paths.map(path=>({path,status:results[path].status,finalUrl:results[path].finalUrl,contentType:results[path].contentType,xRobots:results[path].xRobots,error:results[path].error||null})),
  failureCount:failures.length,
  failures
};
console.log(JSON.stringify(summary,null,2));
if(failures.length)process.exitCode=1;
