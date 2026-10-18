#!/usr/bin/env node
/**
 * Editorial documentation QA: validate newly formatted source-review batches.
 * Syntax/provenance validation only: does not retrieve URLs or certify medical truth.
 */
import {readFileSync,readdirSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const contentDir=join(dirname(fileURLToPath(import.meta.url)),'../content');
const files=readdirSync(contentDir).filter(n=>/^SOURCE-VERIFICATION-BATCH-(?:1[1-9]|[2-9]\d+)\.md$/.test(n)).sort();
let errors=[],passed=0,checkedUrls=0,sourceBodyLinksChecked=0;
const sourceCache=new Map();
const verifiedSourceFilenames=new Set(readdirSync(contentDir).filter(n=>/^(?:S-TIER-[A-Z0-9-]+|A-TIER-BATCH-\d+-[A-Z0-9-]+)\.md$/.test(n)));
for(const file of files){
 const body=readFileSync(join(contentDir,file),'utf8');
 const rows=body.split(/\r?\n/).filter(line=>/^\|\s*\d{4}\s*\|/.test(line)).map(line=>{
   const cells=line.split('|').slice(1,-1).map(x=>x.trim());
   return {id:cells[0],sourceFile:cells[2],status:cells.find(x=>/^source_verified_editorial\b/.test(x))};
 });
 if(!rows.length)errors.push(file+': no editorial-review table rows');
 const uniqueIds=new Set(rows.map(x=>x.id));
 if(uniqueIds.size!==rows.length)errors.push(file+': duplicate IDs');
 const heads=[...body.matchAll(/^###\s+(\d{4})[｜\s]+(.+)$/gm)];
 for(const r of rows){
   if(!r.status)errors.push(file+': '+r.id+' must use source_verified_editorial or be tracked in a separate needs-edit list');
   // Require that the third table column points to the EXISTING canonical S/A source
   // and that the original file still contains this exact four-digit ID.
   // This checks provenance, not clinical validity.
   if(!verifiedSourceFilenames.has(r.sourceFile)){
     errors.push(file+': '+r.id+' missing/invalid original S/A source file: '+r.sourceFile);
   }else{
     if(!sourceCache.has(r.sourceFile))sourceCache.set(r.sourceFile,readFileSync(join(contentDir,r.sourceFile),'utf8'));
     const original=sourceCache.get(r.sourceFile);
     if(!new RegExp('^##\\s+'+r.id+'\\s*｜','m').test(original))
       errors.push(file+': '+r.id+' not found in claimed original source: '+r.sourceFile);
     else sourceBodyLinksChecked++;
   }
   const idx=heads.findIndex(h=>h[1]===r.id);
   if(idx<0){errors.push(file+': '+r.id+' missing individual review rationale');continue;}
   const paragraph=body.slice(heads[idx].index,heads[idx+1]?.index??body.length);
   for(const label of ['已核对断言','编辑边界']){
     if(!paragraph.includes(label))errors.push(file+': '+r.id+' missing '+label);
   }
   const links=[...paragraph.matchAll(/https:\/\/[A-Za-z0-9.-]+(?:\/[A-Za-z0-9_~!$&'()*+,;=:@%./?-]*)?/g)].map(m=>m[0]);
   if(!links.length)errors.push(file+': '+r.id+' no explicit HTTPS evidence link');
   for(const link of links){
     try{if(new URL(link).protocol!=='https:')throw Error('not https');}
     catch{errors.push(file+': '+r.id+' invalid source url: '+link);}
   }
   checkedUrls+=links.length;passed++;
 }
}
console.log(JSON.stringify({reviewBatchFiles:files,reviewRows:passed,originalSourceMappingsChecked:sourceBodyLinksChecked,syntaxCheckedHTTPSLinks:checkedUrls,errors},null,2));
if(errors.length)process.exitCode=1;
