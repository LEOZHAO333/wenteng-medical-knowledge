#!/usr/bin/env node
// Read-only parity audit: the Markdown source files must be exactly what the
// production API route would return. This does not deploy or open indexing.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const handler=require(join(root,'api/pet.js'));

function invoke(path){
  const out={code:200,headers:{},body:null};
  const res={
    setHeader(name,value){out.headers[name.toLowerCase()]=value;return this;},
    status(code){out.code=code;return this;},
    send(body){out.body=body;return this;}
  };
  handler({query:{path}},res);
  return out;
}
const home='https://pet.japanmedai.com/';
for(const name of ['llms.txt','llms-full.txt']){
  const staticMd=readFileSync(join(root,name),'utf8');
  const actual=invoke(name);
  assert.equal(actual.code,200,name+' must be HTTP 200');
  assert.equal(actual.headers['content-type'],'text/plain; charset=utf-8');
  assert.match(actual.headers['x-robots-tag'],/noindex/i,name+' does not override Founder noindex');
  assert.equal(actual.body,staticMd,name+' API output drifted from the reviewed markdown');
  assert.match(actual.body,/^#\s+日宠通/m);
  assert.ok(actual.body.includes(home),name+' missing canonical domain');
  assert.ok(!actual.body.includes('www.japanmedai.com/pet/'),name+' references legacy host');
}
const brief=readFileSync(join(root,'llms.txt'),'utf8');
const full=readFileSync(join(root,'llms-full.txt'),'utf8');
assert.match(brief,/^>\s+日宠通/m,'Missing llms.txt description blockquote');
assert.match(brief,/^##\s+官方入口/m);
assert.match(brief,/^##\s+AI 阅读与引用说明/m);
assert.match(brief,/https:\/\/pet\.japanmedai\.com\/llms-full\.txt/);
assert.match(brief,/noindex/);
assert.match(brief,/Medical Approved/);
assert.match(full,/NVAL/);
assert.match(full,/医疗|医学/);
assert.match(full,/noindex/i);
assert.match(full,/医学审稿|兽医审核/);
assert.ok(!/https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\//.test(brief),
  'Never promote pending individual medical article URLs in compact llms.txt');
assert.ok(!/https:\/\/pet\.japanmedai\.com\/qa\/[a-z0-9-]+\//.test(full),
  'Do not dump pending individual medical pages into llms-full.txt');
for(const file of [brief,full]){
  const links=[...file.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map(m=>m[1]);
  assert.ok(links.length>=5,'Insufficient structured source links');
  assert.ok(!links.some(l=>l.startsWith('http:')),'Use https URLs');
}
const nontext=invoke('qa/missing-llms-test-article');
assert.equal(nontext.code,404,'Normal nonexistent article should still return 404');
console.log(JSON.stringify({
  check:'pet-llms-parity-and-safety',
  files:['pet-site/llms.txt','pet-site/llms-full.txt'],
  canonical:home,routeStatus:200,robots:'noindex',
  sourceEqualsRuntime:true,unapprovedDeepLinksPromoted:false,
  nonExistentArticleStatus:nontext.code,medicalApproved:false,
  note:'Technical test only; does not assert human medical approval or search indexing'
},null,2));
