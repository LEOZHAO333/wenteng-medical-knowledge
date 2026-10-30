#!/usr/bin/env node
/** Read-only 40-QA evidence gap inventory. Never grants medical or Founder approval. */
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const dir=dirname(fileURLToPath(import.meta.url));
const src=readFileSync(resolve(dir,'../api/pet.js'),'utf8');
const start=src.indexOf('const articles = [');
const end=src.indexOf('\n];',start);
if(start<0||end<0)throw Error('Cannot find renderer article array');
const lines=src.slice(start,end).split('\n').filter(s=>/^\s+\{(?:slug:|"slug":)/.test(s));
const get=(s,key)=>(s.match(new RegExp('(?:\\b'+key+':|"'+key+'":)\\s*["\\x27]([^"\\x27]*)["\\x27]'))||[])[1]||'';
const rows=lines.map((line,i)=>({
  number:i+1,
  slug:get(line,'slug'),
  species:get(line,'species'),
  sourcePublished:get(line,'published'),
  sourceModified:get(line,'modified'),
  publicationDateEvidence:'not_verified',
  publicationEvidenceRef:'',
  publicationEvidenceReviewer:'',
  modifiedDateEvidence:'not_verified',
  modifiedEvidenceRef:'',
  modifiedEvidenceReviewer:'',
  licensedVetSignoff:'not_verified',
  vetReviewerName:'',
  vetCredentialsRef:'',
  vetSignoffDate:'',
  vetSignoffEvidenceRef:'',
  founderPublishApproval:'not_verified',
  founderPublishEvidenceRef:'',
  founderIndexApproval:'not_verified',
  founderIndexEvidenceRef:'',
  medicalHoldResolutionRef:'',
  eligibility:'not_determined_do_not_approve'
}));
const errors=[];
if(rows.length!==90)errors.push('Expected 90 renderer QAs; re-audit required');
if(rows.some(r=>!r.slug||!r.species))errors.push('Missing slug/species');
if(new Set(rows.map(r=>r.slug)).size!==rows.length)errors.push('Duplicate slugs');
if(rows.filter(r=>!r.sourcePublished).length!==12)errors.push('Published-date baseline changed');
if(rows.filter(r=>r.sourcePublished==='2026-10-15').length!==28)errors.push('Identical published-date baseline changed');
if(rows.some(r=>r.sourceModified))errors.push('Modified-date baseline changed');
const fields=Object.keys(rows[0]||{});
if(process.argv.includes('--tsv')){
 console.log(fields.join('\t'));
 for(const row of rows)console.log(fields.map(k=>String(row[k]).replace(/[\t\r\n]/g,' ')).join('\t'));
}else{
 console.log(JSON.stringify({audit:'pet-renderer-qa-evidence-gaps',mode:'read-only',qaCount:rows.length,missingPublished:rows.filter(r=>!r.sourcePublished).length,unverifiedPublishedDate:rows.filter(r=>r.sourcePublished).length,missingModified:rows.filter(r=>!r.sourceModified).length,vetSignoffVerifiedByThisAudit:0,founderApprovalVerifiedByThisAudit:0,medicalApprovedByThisAudit:0,errors},null,2));
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
