#!/usr/bin/env node
/** Verify editorial correction closures against live source text.
 * This checks only text consistency; it NEVER grants Medical Approved.
 */
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const repoDir=join(dirname(fileURLToPath(import.meta.url)),'../..');
const registry=JSON.parse(readFileSync(join(repoDir,'pet-site/seo/editorial-correction-closures.json'),'utf8'));
const errors=[];
for(const item of registry.items){
  for(const field of ['id','historicFile','bodyFile','supportingReference','requiredText','forbiddenBodyText']){
    if(!item[field])errors.push(item.id+': missing '+field);
  }
  let historical,source;
  try{
    historical=readFileSync(join(repoDir,item.historicFile),'utf8');
    source=readFileSync(join(repoDir,item.bodyFile),'utf8');
  }catch(e){errors.push(item.id+': source or historic file absent');continue;}
  if(!historical.includes(item.id))errors.push(item.id+': historical tracking lost');
  const nodes=[...source.matchAll(/^##\s+(\d{4})\s*｜/gm)];
  const i=nodes.findIndex(m=>m[1]===item.id);
  if(i<0){errors.push(item.id+': current ID absent');continue;}
  const block=source.slice(nodes[i].index,nodes[i+1]?.index??source.length);
  if(!block.includes(item.requiredText))errors.push(item.id+': fix missing or modified');
  if(block.includes(item.forbiddenBodyText))errors.push(item.id+': old medical attribution regressed');
  if(item.status!=='editorial_correction_applied_medical_review_pending')
    errors.push(item.id+': closure must not masquerade as medical approval');
  if(!/^https:\/\/[A-Za-z0-9.-]+\//.test(item.supportingReference))
    errors.push(item.id+': invalid editorial reference');
}
console.log(JSON.stringify({historicalCorrections:registry.items.length,scope:registry.scope,errors},null,2));
if(errors.length)process.exitCode=1;
