#!/usr/bin/env node
/** Read-only renderer index/medical gate inventory. Does not authorize publishing. */
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const dir=dirname(fileURLToPath(import.meta.url));
const src=readFileSync(resolve(dir,'../api/pet.js'),'utf8');
const policy=JSON.parse(readFileSync(resolve(dir,'approval-boundaries.json'),'utf8'));
const releaseSource=readFileSync(resolve(dir,'release-policy.mjs'),'utf8');
const start=src.indexOf('const articles = [');
const end=src.indexOf('\n];',start);
if(start<0||end<0)throw Error('renderer article array missing');
const lines=src.slice(start,end).split('\n').filter(s=>/^\s+\{(?:slug:|"slug":)/.test(s));
const get=(s,k)=>(s.match(new RegExp('(?:\\b'+k+':|"'+k+'":)\\s*["\\x27]([^"\\x27]*)["\\x27]'))||[])[1]||null;
const rows=lines.map(s=>({slug:get(s,'slug'),published:get(s,'published'),modified:get(s,'modified')}));
const errors=[];
if(rows.length!==40)errors.push('renderer count changed; re-audit required');
if(new Set(rows.map(r=>r.slug)).size!==rows.length)errors.push('duplicate slug');
if(policy.guardrails?.noMedicalApprovalByAI!==true||policy.guardrails?.noAutoIndexing!==true)errors.push('governance guard missing');
const noPerArticleGate=/const INDEX_ELIGIBLE_PATHS\s*=\s*\{\s*has:\s*p\s*=>\s*CORE_INDEX_PATHS\.includes\(p\)\s*\|\|\s*\(\/\^qa/.test(src);
const sitemapAll=/function sitemap\(\)[\s\S]*?articles\.map\(a=>'qa\/'\+a\.slug\)/.test(src);
// Guard the draft release-policy source against accidental deletion of explicit Hold blocks.
const requiredHoldGuards=[
  'item.medicalHold===true',
  'item.releaseAuthorized===false',
  "item.medicalReviewStatus==='pending_licensed_veterinarian'",
  "item.medicalReviewStatus==='rejected'"
];
for(const guard of requiredHoldGuards){
 if(!releaseSource.includes(guard))errors.push('draft release policy missing Hold guard: '+guard);
}
const summary={audit:'production-index-eligibility-gap',mode:'read-only',rendererArticles:rows.length,missingPublished:rows.filter(r=>!r.published).length,missingModified:rows.filter(r=>!r.modified).length,identicalPublishedDateCount:rows.filter(r=>r.published==='2026-10-15').length,slugBasedEligibilityDetected:noPerArticleGate,sitemapIncludesAllRendererArticles:sitemapAll,holdGuardChecks:requiredHoldGuards.length,medicalApprovedByAudit:0,productionModified:false,errors};
console.log(JSON.stringify(summary,null,2));
if(errors.length)process.exitCode=1;
