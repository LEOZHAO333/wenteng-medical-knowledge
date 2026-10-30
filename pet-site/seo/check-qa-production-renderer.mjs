#!/usr/bin/env node
/** Local renderer contract checks; NOT a live HTTP/SEO indexing or medical approval check.
 * Run: node pet-site/seo/check-qa-production-renderer.mjs
 * No dependencies, API keys, network calls, or production writes.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const dir=dirname(fileURLToPath(import.meta.url));
const require=createRequire(import.meta.url);
const modulePath=require.resolve('../api/pet.js');
const BASE='https://pet.japanmedai.com';
const errors=[];
let checks=0;
const check=(name,fn)=>{try{fn();checks++;}catch(e){errors.push(name+': '+e.message);}};
function handlerFor(env){
  process.env.VERCEL_ENV=env;
  delete require.cache[modulePath];
  return require(modulePath);
}
function render(handler,path){
  const response={headers:{},statusCode:200,body:null};
  const res={
    setHeader(key,value){response.headers[key.toLowerCase()]=value;return this;},
    status(code){response.statusCode=code;return this;},
    send(body){response.body=String(body);return this;}
  };
  handler({query:{path}},res);
  assert.notEqual(response.body,null,'handler did not send a response');
  return response;
}
function extractSitemap(xml){
  return [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)]
    .map(m=>({url:m[1],lastmod:m[2]}));
}
const prod=handlerFor('production');
const sitemap=render(prod,'sitemap.xml');
const links=extractSitemap(sitemap.body);
const byUrl=new Map(links.map(x=>[x.url,x.lastmod]));

check('production sitemap HTTP response and 95 URL entries',()=>{
  assert.equal(sitemap.statusCode,200);
  assert.match(sitemap.headers['content-type'],/application\/xml/);
  assert.equal(links.length,95);
  assert.equal(byUrl.size,95,'duplicate sitemap URL');
  assert.equal(links.filter(x=>x.url.startsWith(BASE+'/qa/')).length,90);
  assert.ok(links.every(x=>x.url.startsWith(BASE+'/')));
});
check('four updated directory lastmod, About unchanged',()=>{
  for(const p of ['', 'cat/', 'dog/', 'qa/'])assert.equal(byUrl.get(BASE+'/'+p),'2026-10-30',p);
  assert.equal(byUrl.get(BASE+'/about/'),'2026-10-17');
});
check('90 article URL records resolve to HTTP 200 and correct canonical',()=>{
  const qa=links.filter(x=>x.url.startsWith(BASE+'/qa/'));
  for(const {url} of qa){
    const slug=url.slice(BASE.length+1,-1);
    const page=render(prod,slug);
    assert.equal(page.statusCode,200,slug);
    assert.equal(page.headers['x-robots-tag'],'index, follow',slug);
    assert.ok(page.body.includes('<meta name="robots" content="index,follow">'),slug);
    assert.ok(page.body.includes('<link rel="canonical" href="'+url+'">'),slug);
    assert.ok(!page.body.includes('review_questions'),slug);
  }
});
const critical=[
  'cat-cloudy-eye',
  'dog-bloated-dry-heaving',
  'cat-licked-topical-parasite-product',
  'kitten-milk-aspiration',
  'cat-feeding-tube-home-care'
];
check('five S0 samples have Article/FAQ JSON-LD and emergency messaging',()=>{
  for(const slug of critical){
    const page=render(prod,'qa/'+slug);
    assert.equal(page.statusCode,200,slug);
    assert.match(page.body,/立即就医信号/,slug);
    const match=page.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match,'JSON-LD missing '+slug);
    const json=JSON.parse(match[1]);
    const article=json['@graph'].find(x=>x['@type']==='Article');
    const faq=json['@graph'].find(x=>x['@type']==='FAQPage');
    assert.ok(article&&faq,slug);
    assert.equal(article.mainEntityOfPage,BASE+'/qa/'+slug+'/',slug);
    assert.equal(article.datePublished,'2026-10-30',slug);
    assert.ok(faq.mainEntity.length>=4,slug);
    assert.equal(byUrl.get(BASE+'/qa/'+slug+'/'),'2026-10-30',slug);
  }
});
check('robots and non-indexable pages',()=>{
  const robots=render(prod,'robots.txt');
  assert.equal(robots.statusCode,200);
  assert.ok(robots.body.includes('Sitemap: '+BASE+'/sitemap.xml'));
  const drug=render(prod,'new-drugs');
  assert.equal(drug.statusCode,200);
  assert.equal(drug.headers['x-robots-tag'],'noindex, follow');
  assert.ok(!byUrl.has(BASE+'/new-drugs/'));
  const unknown=render(prod,'qa/not-a-real-qa-slug');
  assert.equal(unknown.statusCode,404);
  assert.equal(unknown.headers['x-robots-tag'],'noindex, follow');
});
check('AI static index covers all 90 sitemap article URLs exactly once',()=>{
  const full=readFileSync(resolve(dir,'../llms-full.txt'),'utf8');
  const indexed=[...full.matchAll(/https:\/\/pet\.japanmedai\.com\/qa\/([a-z0-9-]+)\/\)/g)]
    .map(m=>BASE+'/qa/'+m[1]+'/');
  assert.equal(indexed.length,90);
  assert.equal(new Set(indexed).size,90);
  const sitemapQA=new Set(links.filter(x=>x.url.startsWith(BASE+'/qa/')).map(x=>x.url));
  for(const url of indexed)assert.ok(sitemapQA.has(url),url);
});
check('preview pages noindex and preview sitemap empty',()=>{
  const preview=handlerFor('preview');
  const page=render(preview,'qa/cat-cloudy-eye');
  assert.equal(page.statusCode,200);
  assert.equal(page.headers['x-robots-tag'],'noindex, follow');
  const previewMap=render(preview,'sitemap.xml');
  assert.equal(extractSitemap(previewMap.body).length,0);
});
console.log(JSON.stringify({audit:'pet-local-renderer-SEO-contract',mode:'local-renderer-only-no-network',checks,expectedChecks:7,articleSitemapCount:links.filter(x=>x.url.startsWith(BASE+'/qa/')).length,errors},null,2));
if(errors.length)process.exitCode=1;
