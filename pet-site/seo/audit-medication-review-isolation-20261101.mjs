#!/usr/bin/env node
/** Draft-only read-only guard: medication review notes must stay out of article bodies.
 * This is an editorial consistency check, NEVER a veterinary medical approval.
 */
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=dirname(fileURLToPath(import.meta.url));
const source=readFileSync(join(dir,'../content/S-TIER-MEDS-LABS.md'),'utf8');
const handoff=readFileSync(join(dir,'CLAIM-EVIDENCE-MEDS-TOXICITY-2026-11-01.md'),'utf8');
const expected=[
 ['0641','cat-foaming-after-medication','张口呼吸'],
 ['0643','cat-crush-medication-food','不要自行改变剂型'],
 ['0648','dog-vomits-after-medication-redose','不要凭感觉马上补'],
 ['0649','pet-missed-dose-no-double','不能擅自补双倍'],
 ['0650','pet-share-leftover-medication','不要共用'],
 ['0651','human-painkillers-dogs-cats','不要自行催吐'],
 ['0652','pet-antibiotic-stop-early','不要自行停药或延长'],
 ['0659','japan-china-pet-medicine-active-ingredient','不能据此自行换药']
];
const failures=[];
const headings=[...source.matchAll(/^##\s+(\d{4})｜/gm)];
const seen=new Set();
for(const h of headings){if(seen.has(h[1]))failures.push('duplicate source ID '+h[1]);seen.add(h[1]);}
for(const [id,slug,safety] of expected){
 const index=headings.findIndex(h=>h[1]===id);
 if(index<0){failures.push('missing article '+id);continue;}
 const block=source.slice(headings[index].index,headings[index+1]?.index??source.length);
 if(!block.includes('Slug：`'+slug+'`'))failures.push(id+': slug changed');
 if(!block.includes(safety))failures.push(id+': safety phrase missing');
 if(/^编辑级(?:依据|证据|参考|逐主张依据)|医学(?:审核|终审)：|Medical Approved=|pending_licensed_veterinarian/m.test(block))
   failures.push(id+': internal review metadata leaked into article');
 const section=handoff.split(/^##\s+/m).find(x=>x.startsWith(id+'｜'));
 if(!section){failures.push(id+': missing vet handoff');continue;}
 if(!section.includes('从正文原样迁出的内部注记')||!section.includes('https://'))
   failures.push(id+': source/history not preserved');
 if(!section.includes('pending_licensed_veterinarian')||!section.includes('Hold'))
   failures.push(id+': medical Hold missing');
}
if(!handoff.includes('Medical Approved=0')||!handoff.includes('releaseAuthorized=false'))
 failures.push('handoff approval boundary missing');
if(!handoff.includes('产品级核验数=0'))failures.push('MAFF/NVAL product-level status missing');
console.log(JSON.stringify({audit:'medication-toxicity-review-isolation',checked:expected.length,medicalApprovedByAudit:0,productionModified:false,failures},null,2));
if(failures.length)process.exitCode=1;
