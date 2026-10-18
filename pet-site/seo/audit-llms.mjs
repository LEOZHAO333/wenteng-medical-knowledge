#!/usr/bin/env node
// Read-only parity and indexing policy audit for two AI text files.
// Never changes INDEX_APPROVED, robots, sitemap, or production deployment.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const apiPath=join(root,'api/pet.js');
const source=readFileSync(apiPath,'utf8');
const approved=source.match(/const\s+INDEX_APPROVED\s*=\s*(true|false)\s*;/);
assert.ok(approved,'Missing explicit Founder index approval gate');
const approvedInCode=approved[1]==='true';
const canonical='https://pet.japanmedai.com/';
const slugs=[...source.matchAll(/(?:^|\W)slug\s*:\s*'([^']+)'/g)].map(m=>m[1]);
assert.ok(slugs.length>0,'Renderer has no registered article slugs');
assert.equal(new Set(slugs).size,slugs.length,'Duplicate rendered article slug');
const core=['','cat','dog','qa','about'];
const norm=value=>String(value).replace(/\s/g,'').toLowerCase();

function request(path,environment){
  const previous=process.env.VERCEL_ENV;
  try {
    process.env.VERCEL_ENV=environment;
    delete require.cache[require.resolve(apiPath)];
    const handler=require(apiPath);
    const out={code:200,headers:{},body:''};
    const response={
      setHeader(name,value){out.headers[name.toLowerCase()]=value;return this;},
      status(value){out.code=value;return this;},
      send(content){out.body=content;return this;}
    };
    handler({query:{path}},response);
    return out;
  } finally {
    if(previous===undefined)delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV=previous;
  }
}
const short=readFileSync(join(root,'llms.txt'),'utf8');
const full=readFileSync(join(root,'llms-full.txt'),'utf8');
assert.match(short,/^#\s+日宠通/m);
assert.match(short,/^>\s+日宠通/m);
assert.match(short,/^##\s+官方入口/m);
assert.match(short,/^##\s+AI 阅读与引用说明/m);
assert.ok(short.includes(canonical+'llms-full.txt'),'Missing full guide link');
assert.match(short,/开放收录/);
assert.match(short,/尚待合并与部署/);
assert.match(full,/收录策略已获 Founder 批准开放/);
assert.match(full,/NVAL/);
assert.match(full,/医学审核|医学审稿/);
assert.ok(!/https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\//.test(short),
  'AI compact guide must not list unreviewed individual article URLs');
assert.ok(!/https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\//.test(full),
  'AI full guide must not dump unreviewed individual article URLs');

for(const markdown of [short,full]){
  const links=[...markdown.matchAll(/\]\((https:\/\/[^)]+)\)/g)];
  assert.ok(links.length>=5,'Missing structured AI-reader navigation links');
  assert.ok(!markdown.includes('www.japanmedai.com/pet/'),'Legacy domain as primary authority');
}
const vercel=JSON.parse(readFileSync(join(root,'vercel.json'),'utf8'));
for(const name of ['llms.txt','llms-full.txt']){
  const rule=(vercel.headers??[]).find(item=>item.source==='/'+name);
  assert.ok(rule,'Missing Vercel static file header rule for '+name);
  const headers=Object.fromEntries(rule.headers.map(item=>[item.key.toLowerCase(),item.value]));
  assert.match(headers['x-robots-tag']??'',/noindex/,'Static text file must be noindex');
  assert.match(headers['content-type']??'',/text\/plain/);
  const original=name==='llms.txt'?short:full;
  for(const environment of ['production','preview']){
    const result=request(name,environment);
    assert.equal(result.code,200,'Wrong HTTP status for '+name+' / '+environment);
    assert.equal(result.headers['content-type'],'text/plain; charset=utf-8');
    assert.match(result.headers['x-robots-tag'],/noindex/,'Text file must remain noindex');
    assert.equal(result.body,original,'Runtime and static file content drift for '+name);
  }
}
const sitePaths=[...core,...slugs.map(s=>'qa/'+s),'new-drugs'];
const checks=[];
for(const environment of ['preview','production']){
  for(const path of sitePaths){
    const result=request(path,environment);
    assert.equal(result.code,200,'Expected page missing: '+path);
    const expected=approvedInCode && environment==='production' && path!=='new-drugs'
      ? 'index,follow' : 'noindex,follow';
    const header=norm(result.headers['x-robots-tag']);
    assert.equal(header,expected,'Index header mismatch: '+environment+'/'+path);
    const meta=String(result.body).match(/<meta name="robots" content="([^"]+)">/);
    assert.ok(meta,'Missing robots HTML meta: '+environment+'/'+path);
    assert.equal(norm(meta[1]),expected,'HTML meta and response header diverge: '+path);
    checks.push({environment,path:path||'/',robots:header});
  }
  const missing=request('qa/missing-llms-test-article',environment);
  assert.equal(missing.code,404);
  assert.match(missing.headers['x-robots-tag'],/noindex/i);
  assert.match(missing.body,/<meta name="robots" content="noindex,follow">/);
  const sitemap=request('sitemap.xml',environment);
  assert.equal(sitemap.code,200);
  const entries=(sitemap.body.match(/<url>/g)||[]).length;
  const expectedCount=approvedInCode && environment==='production'?core.length+slugs.length:0;
  assert.equal(entries,expectedCount,'Sitemap must match actual runtime whitelist');
  if(source.includes("if(path==='robots.txt')")){
    const robots=request('robots.txt',environment);
    assert.equal(robots.code,200);
    if(approvedInCode && environment==='production')
      assert.match(robots.body,/Sitemap: https:\/\/pet\.japanmedai\.com\/sitemap\.xml/);
  }
}
const home=request('','production');
assert.ok(home.body.includes('<link rel="describedby" href="https://pet.japanmedai.com/llms.txt">'),
  'HTML homepage must expose the AI guide via describedby');
console.log(JSON.stringify({
  check:'pet-llms-parity-and-release-policy',
  sourceEqualsRuntime:true,canonical,
  approvedInCurrentCode:approvedInCode,
  productionWhiteListExpectedWhenApproved:core.length+slugs.length,
  renderedArticleCount:slugs.length,
  individualAITextRobots:'noindex',
  sitemapAndHeaderChecks:checks.length,
  previewPages:'noindex',medicalApproved:false,
  productionPages:approvedInCode?'whitelist index,follow, except new-drugs':'noindex until indexing PR merged',
  note:'Code and content audit only: does not certify live website, professional medical review or merger'
},null,2));
