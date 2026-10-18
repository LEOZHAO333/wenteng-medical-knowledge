#!/usr/bin/env node
/** Read-only queue for licensed veterinarian clinical review; never grants Medical Approved. */
import {readFileSync,readdirSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=join(dirname(fileURLToPath(import.meta.url)),'../content');
const names=readdirSync(dir);
const bodyFiles=names.filter(x=>/^(?:S-TIER-.+|A-TIER-BATCH-\d+-.+)\.md$/.test(x));
const ledgerFiles=names.filter(x=>/^SOURCE-VERIFICATION-BATCH-\d+\.md$/.test(x));
const canonical=new Map(),ledger=new Map(),issues=[];
for(const file of bodyFiles){
 const text=readFileSync(join(dir,file),'utf8');
 const parts=[...text.matchAll(/^##\s+(\d{4})\s*｜\s*(.+?)\s*$/gm)];
 for(let i=0;i<parts.length;i++){
  const id=parts[i][1],title=parts[i][2].trim(),segment=text.slice(parts[i].index,parts[i+1]?.index??text.length);
  const slug=segment.match(/^\s*-\s*Slug\s*[：:]\s*\x60?([a-z0-9-]+)\x60?\s*$/m)?.[1]??null;
  const item={id,title,slug,sourceFile:'pet-site/content/'+file,tier:file.startsWith('S-TIER')?'S':'A'};
  const prior=canonical.get(id);
  if(prior && prior.tier===item.tier)issues.push('duplicate canonical tier ID '+id);
  if(!prior||item.tier==='S')canonical.set(id,item);
 }
}
for(const file of ledgerFiles){
 const data=readFileSync(join(dir,file),'utf8');
 for(const line of data.split(/\r?\n/)){
  if(!/^\|\s*\d{4}\s*\|/.test(line))continue;
  const cells=line.split('|').slice(1,-1).map(c=>c.replace(/\*/g,'').trim());
  const status=cells.slice(1).find(c=>/^(source_verified_editorial|needs_edit|hold|pending)(\b|\s|\+)/i.test(c));
  if(!status)continue;
  const id=cells[0];
  if(ledger.has(id))issues.push('duplicate editorial review entry '+id);
  ledger.set(id,{ledgerFile:'pet-site/content/'+file,status});
 }
}
const urgent=/(无尿|尿不出|排尿困难|呼吸困难|张口呼吸|中毒|误食|瘫痪|抽搐|惊厥|休克|昏迷|窒息|大出血|持续出血|吞食异物|高处坠落|热射病|中暑|突然失明|难产|癫痫|肚子鼓|反复呕吐)/;
const medicine=/(药|剂量|补液|注射|疫苗|驱虫|术后|手术|麻醉|镇静|抗菌|化疗|妊娠|发情|绝育|日本|海外|进口|检疫|处方|治疗|诊疗|肝肾|肾病|心脏|皮肤)/;
function triage(id,q){
 // A symptom word in the title is not enough: distinguish an acute event
 // from a long-term monitoring/differential question before prioritizing.
 if(['0465','0480'].includes(id))return {priority:'P1_TRIAGE',reason:'非正在发生的急症：抽搐鉴别或长期抗癫痫药物监测，仍需专业兽医核对'};
 if(urgent.test(q))return {priority:'P0_TRIAGE',reason:'标题含可能的急症/中毒/梗阻信息'};
 if(medicine.test(q))return {priority:'P1_TRIAGE',reason:'标题涉及治疗/药品/监管或护理信息'};
 return {priority:'P2_TRIAGE',reason:'一般科普仍须逐句审阅'};
}
const rank={P0_TRIAGE:0,P1_TRIAGE:1,P2_TRIAGE:2};
const items=[...canonical.values()].map(x=>({
 id:x.id,title:x.title,slug:x.slug,tier:x.tier,sourceFile:x.sourceFile,
 editorialReview:ledger.get(x.id)?.status??'NO_LEDGER',
 editorialEvidenceRecord:ledger.get(x.id)?.ledgerFile??null,
 medicalReviewStatus:'PENDING_LICENSED_VETERINARIAN',
 releaseAuthorized:false,...triage(x.id,x.title)
})).sort((a,b)=>rank[a.priority]-rank[b.priority]||(a.tier===b.tier?0:a.tier==='S'?-1:1)||a.id.localeCompare(b.id));
for(const id of ledger.keys())if(!canonical.has(id))issues.push('orphaned editorial record '+id);
const missing=items.filter(x=>x.editorialReview==='NO_LEDGER');
if(missing.length)issues.push(missing.length+' articles without editorial ledger');
if(items.length!==582)issues.push('expected 582 unique IDs; got '+items.length);
if(ledger.size!==582)issues.push('expected 582 unique ledger IDs; got '+ledger.size);
const counts=items.reduce((o,x)=>(o[x.priority]=(o[x.priority]??0)+1,o),{});
const summary={
 articles:items.length,editorialEvidenceIds:ledger.size,missingEvidenceLedger:missing.length,
 requiredReviewer:'LICENSED_VETERINARIAN',newMedicalApprovalsFromThisTool:0,indexableByThisTool:0,
 triageCounts:counts,
 caveat:'Risk triage uses title keywords only, no medical diagnoses or licensed veterinary signature. Editorial citation ledger covers topics, not every sentence.',
 nextStep:'Review exact claim-to-source links, medical scope, Japan MAFF/NVAL product-specific approvals before requesting veterinary signoff.'
};
console.log(JSON.stringify({
 summary,first25:items.slice(0,25).map(({id,title,tier,priority,sourceFile,editorialEvidenceRecord,medicalReviewStatus})=>({id,title,tier,priority,sourceFile,editorialEvidenceRecord,medicalReviewStatus})),issues
},null,2));
if(process.argv.includes('--check')&&issues.length)process.exitCode=1;
