#!/usr/bin/env node
/** Read-only compatibility audit against the actual production article array.
 * Never executes the entire production renderer or writes back to source.
 */
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const {strictArticleSnapshot,articleDigest}=require('./article-snapshot.proposed.cjs');
const source=fs.readFileSync(path.join(__dirname,'../api/pet.js'),'utf8');
const start=source.indexOf('const articles = [');
const end=source.indexOf('];',start);
if(start<0||end<start)throw new Error('Production article array boundary not found');
const literal=source.slice(start+'const articles = '.length,end+1);
const articles=vm.runInNewContext('('+literal+')',Object.create(null),{timeout:1000});
if(!Array.isArray(articles)||articles.length===0)throw new Error('Empty or malformed production articles');
const seen=new Set(), failures=[];
for(const article of articles){
  const slug=typeof article.slug==='string'?article.slug:'[missing slug]';
  if(seen.has(slug))failures.push({slug,error:'duplicate slug'});
  seen.add(slug);
  try{
    strictArticleSnapshot(article);
    if(!/^[a-f0-9]{64}$/.test(articleDigest(article)))throw new Error('digest format');
  }catch(err){failures.push({slug,error:err.message});}
}
const report={status:failures.length?'FAIL':'PASS',scope:'read-only source literal compatibility; NOT live HTML, vet approval, or indexing',count:articles.length,uniqueSlugs:seen.size,failures};
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exitCode=1;
