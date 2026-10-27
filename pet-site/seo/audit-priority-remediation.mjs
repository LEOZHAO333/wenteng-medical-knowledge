#!/usr/bin/env node
/** Read-only guard for SOP V1.5 priority remediation. Never assigns Medical Approved. */
import {readFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=dirname(fileURLToPath(import.meta.url));
const read=name=>readFileSync(join(dir,name),'utf8');
const policy=JSON.parse(read('approval-boundaries.json'));
const corrections=JSON.parse(read('editorial-correction-closures.json'));
const handoff=read('CLAIM-EVIDENCE-POSTOP-MEDSAFETY-2026-10-27.md');
const plan=read('PRIORITY-REMEDIATION-2026-10-27.md');
const failures=[];
for(const id of ['0635','0643','0648','0649']){
  if(!handoff.includes(id))failures.push('missing vet handoff ID '+id);
  if(!plan.includes(id))failures.push('missing priority plan ID '+id);
}
if(policy.guardrails?.noMedicalApprovalByAI!==true)failures.push('AI approval guard missing');
if(policy.guardrails?.noAutoIndexing!==true)failures.push('auto indexing guard missing');
if(policy.scope?.activeDraftPr!==35)failures.push('active Draft PR mismatch');
if(!plan.includes('582/582')||!plan.includes('40')||!plan.includes('45'))failures.push('draft vs production population distinction missing');
if(!handoff.includes('pending_licensed_veterinarian'))failures.push('professional Hold boundary missing');
const recordText=JSON.stringify(corrections);
for(const id of ['0635','0643','0648','0649'])if(!recordText.includes(id))failures.push('missing correction history '+id);
console.log(JSON.stringify({audit:'risk-priority-remediation',mode:'read-only',medicalApprovedByThisAudit:0,productionModified:false,failures},null,2));
if(failures.length)process.exitCode=1;
