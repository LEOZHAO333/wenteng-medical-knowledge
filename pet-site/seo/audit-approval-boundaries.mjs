#!/usr/bin/env node
/**
 * Governance assertions for SOP V1.5. Read-only and fail closed.
 * This validates the stated authorization boundary, NOT individual real-world approvals.
 */
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const seoDir=dirname(fileURLToPath(import.meta.url));
const policy=JSON.parse(readFileSync(join(seoDir,'approval-boundaries.json'),'utf8'));
const sop=readFileSync(join(seoDir,'SOP-RECURRING-AUTONOMY-V1.5.md'),'utf8');
const workflow=readFileSync(join(seoDir,'../../.github/workflows/pet-geo-seo-audit.yml'),'utf8');
const failures=[];
const fail=(x)=>failures.push(x);
const requiredRoutine=[
  'create_editorial_source_review_batches','commit_to_existing_draft_branch',
  'run_readonly_ci_and_fix_failures','continue_next_nonblocked_queue_item'
];
const requiredFounder=[
  'merge_to_main_or_release_branch',
  'production_or_staging_public_deployment',
  'remove_noindex_or_enable_public_crawling_or_submit_public_sitemap',
  'publish_content_to_external_platform',
  'change_brand_logo_name_major_homepage_layout_or_site_architecture',
  'pay_contract_or_bind_external_business_partner',
  'grant_permissions_connect_app_or_expand_external_access',
  'delete_or_bulk_redirect_existing_public_content'
];
const requiredProfessional=[
  'mark_medical_review_approved','approve_individualized_medical_treatment_or_dosing',
  'release_high_risk_clinical_claims','verify_japan_product_regulatory_status_against_maff_nval'
];
const criticalGuards=[
  'noAutoMerge','noAutoDeployment','noAutoExternalPublishing','noAutoIndexing',
  'previewNoindex','noMedicalApprovalByAI','noSyntheticCitations',
  'failClosedOnUnverifiedMedicalClaims','neverClaimCiEqualsMedicalApproval',
  'continueUnblockedRoutineQueue','requireTraceableFounderApproval',
  'doNotAskAgainForRoutineTasks'
];
const isUnique=xs=>Array.isArray(xs)&&new Set(xs).size===xs.length;
for(const [key,items] of [
  ['allowedRoutineActions',requiredRoutine],
  ['founderApprovalRequiredFor',requiredFounder],
  ['professionalApprovalRequiredFor',requiredProfessional]
]){
 if(!isUnique(policy[key])){fail(key+' must be an array with unique entries');continue;}
 for(const item of items)if(!policy[key].includes(item))fail('missing '+key+' -> '+item);
}
for(const k of criticalGuards)if(policy.guardrails?.[k]!==true)fail('safety guardrail disabled: '+k);
if(policy.scope?.workingPr!==8||policy.scope?.workBranch!=='gpt/pet-geo-seo-v1-governance')
  fail('draft work boundary mismatch');
if(!policy.scope?.protectedPaths?.includes('pet-site/api/pet.js'))fail('production renderer protection missing');
if(!sop.includes('无需每次确认')&&!sop.includes('无需逐次询问Founder'))fail('routine authorization not recorded in SOP');
if(!sop.includes('必须 Founder 明确确认'))fail('major approval gate not recorded in SOP');
if(!sop.includes('真实执业兽医'))fail('professional review boundary missing');
if(!/permissions:\s*\n\s*contents:\s*read/.test(workflow))fail('CI must have read-only contents permission');
if(/^\s*contents:\s*write\s*$/m.test(workflow))fail('workflow must never have contents write permission');
if(/^\s*pull-requests:\s*write\s*$/m.test(workflow))fail('workflow must never be able to merge or edit PRs');
// Reject a step explicitly performing a write action; don't flag a negative label
// such as "(no publish permission)" that describes a safe audit step.
const stepNames=[...workflow.matchAll(/^\s*-\s*name:\s*(.+)$/gm)].map(m=>m[1].trim());
if(stepNames.some(name=>/^(?:Deploy|Publish|Merge|Production|解除索引)(?:\s|$)/i.test(name)))
  fail('workflow contains an actual deployment/publish/merge step');
console.log(JSON.stringify({
  sop:'V1.5',draftPr:policy.scope?.workingPr,
  routineActionTypes:policy.allowedRoutineActions?.length,
  founderGatedTypes:policy.founderApprovalRequiredFor?.length,
  professionalGatedTypes:policy.professionalApprovalRequiredFor?.length,
  workflowReadOnly:true,
  failures
},null,2));
if(failures.length)process.exitCode=1;
