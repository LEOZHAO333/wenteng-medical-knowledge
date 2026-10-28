#!/usr/bin/env node
/** Read-only non-regression guard for editorial fixes; NEVER medical approval. */
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(join(root,'content/A-TIER-BATCH-10-SURGERY-DISCHARGE.md'),'utf8');
const handoff=readFileSync(join(root,'seo/CLAIM-EVIDENCE-POSTOP-0630-0634-0636-2026-10-28.md'),'utf8');
const failures=[];
const items=[
  {id:'0630',slug:'pet-incision-discharge-photo-guide',required:['持续渗血','不要自行涂药','vcahospitals.com/roberts/know-your-pet/care-of-surgical-incisions-in-cats']},
  {id:'0634',slug:'cat-hiding-after-surgery-monitoring',required:['叫不醒','立即联系急诊兽医','aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/phase-3-return-home/']},
  {id:'0636',slug:'pet-discharge-medication-checklist',required:['剂量与单位','不要自行加倍','fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors']}
];
const headings=[...source.matchAll(/^##\s+(\d{4})\s*｜/gm)];
for(const item of items){
 const index=headings.findIndex(h=>h[1]===item.id);
 if(index<0){failures.push('missing ID '+item.id);continue;}
 const block=source.slice(headings[index].index,headings[index+1]?.index??source.length);
 if(!block.includes('Slug：`'+item.slug+'`'))failures.push(item.id+': canonical slug changed');
 for(const needle of item.required)if(!block.includes(needle))failures.push(item.id+': missing '+needle);
 if(!block.includes('医学终审：pending；Hold，不发布。'))failures.push(item.id+': pending Hold missing');
 if(!handoff.includes(item.id)||!handoff.includes(item.slug))failures.push(item.id+': vet handoff incomplete');
}
if(!handoff.includes('Medical Approved=0')||!handoff.includes('releaseAuthorized=false'))
 failures.push('draft-only approval boundary missing');
console.log(JSON.stringify({audit:'postop-2026-10-28',items:items.length,medicalApprovedByThisAudit:0,productionModified:false,failures},null,2));
if(failures.length)process.exitCode=1;
