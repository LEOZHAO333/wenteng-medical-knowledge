#!/usr/bin/env node
/** Read-only guard: no internal evidence/Hold notes in publishable article body.
 * All veterinary evidence and review status belong in separate private handoff.
 * Passing this check is NOT medical approval, indexing approval, or deployment.
 */
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(join(root,'content/A-TIER-BATCH-10-SURGERY-DISCHARGE.md'),'utf8');
const handoff=readFileSync(join(root,'seo/CLAIM-EVIDENCE-POSTOP-0630-0634-0636-2026-10-28.md'),'utf8');
const earlier=readFileSync(join(root,'seo/CLAIM-EVIDENCE-POSTOP-MEDSAFETY-2026-10-27.md'),'utf8');
const failures=[];
// Prevent literal escaped linebreaks from silently merging adjacent review bullets.
if(handoff.includes('\\n- **')) failures.push('handoff: literal escaped newline merged review bullets');
const items=[
 {id:'0630',slug:'pet-incision-discharge-photo-guide',required:['持续渗血','不要自行涂药'],evidence:['vcahospitals.com/know-your-pet/care-of-surgical-incisions-in-dogs','vcahospitals.com/roberts/know-your-pet/care-of-surgical-incisions-in-cats']},
 {id:'0634',slug:'cat-hiding-after-surgery-monitoring',required:['叫不醒','立即联系急诊兽医'],evidence:['aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/phase-3-return-home/']},
 {id:'0635',slug:'pet-postoperative-constipation-information',required:['排尿困难','磷酸钠'],evidence:['merckvetmanual.com/urinary-system/noninfectious-diseases-of-the-urinary-system-in-small-animals/obstructive-uropathy-in-dogs-and-cats']},
 {id:'0636',slug:'pet-discharge-medication-checklist',required:['剂量与单位','不要自行加倍'],evidence:['fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors']}
];
const headings=[...source.matchAll(/^##\s+(\d{4})\s*｜/gm)];
if(new Set(headings.map(h=>h[1])).size!==headings.length)failures.push('duplicate article ID');
for(let i=0;i<headings.length;i++){
 const block=source.slice(headings[i].index,headings[i+1]?.index??source.length);
 if(/编辑级逐主张依据|医学终审：|Medical Approved\s*=|releaseAuthorized\s*=|pending_licensed_veterinarian/.test(block))
  failures.push(headings[i][1]+': internal review metadata leaked into article body');
}
for(const item of items){
 const i=headings.findIndex(h=>h[1]===item.id);
 if(i<0){failures.push('missing ID '+item.id);continue;}
 const block=source.slice(headings[i].index,headings[i+1]?.index??source.length);
 if(!block.includes('Slug：`'+item.slug+'`'))failures.push(item.id+': canonical slug changed');
 for(const needle of item.required)if(!block.includes(needle))failures.push(item.id+': missing safety phrase '+needle);
 const evidenceFile=item.id==='0635'?earlier:handoff;
 const section=evidenceFile.split(/^##\s+/m).find(x=>x.startsWith(item.id+'｜'));
 if(!section)failures.push(item.id+': no dedicated evidence handoff section');
 else for(const needle of item.evidence)if(!section.includes(needle))failures.push(item.id+': missing evidence URL '+needle);
}
for(const [name,doc] of [['2026-10-28',handoff],['2026-10-27',earlier]]){
 if(!doc.includes('pending_licensed_veterinarian')||!doc.includes('Hold'))
  failures.push(name+': veterinary Hold boundary missing');
}
if(!handoff.includes('Medical Approved=0')||!handoff.includes('releaseAuthorized=false'))
 failures.push('draft-only approval boundary missing');
console.log(JSON.stringify({audit:'postop-2026-10-29',items:items.length,medicalApprovedByThisAudit:0,productionModified:false,failures},null,2));
if(failures.length)process.exitCode=1;
