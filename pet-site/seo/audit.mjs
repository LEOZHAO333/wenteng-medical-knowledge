#!/usr/bin/env node
/**
 * 日宠通 GEO/SEO metadata audit (offline, no dependencies).
 * This validates an exported metadata manifest ONLY. It does not read medical
 * claims from Markdown, verify medical accuracy, deploy, or toggle noindex.
 *
 * Usage: node pet-site/seo/audit.mjs path/to/catalog.json [--full]
 * Input: an array of records or { "items": [records] }.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = process.argv[2];
const full = process.argv.includes('--full');
if (!file || file.startsWith('--')) {
  console.error('Usage: node pet-site/seo/audit.mjs <metadata.json> [--full]');
  process.exit(2);
}
let records;
try {
  const payload = JSON.parse(readFileSync(resolve(file), 'utf8'));
  records = Array.isArray(payload) ? payload : payload.items;
  if (!Array.isArray(records)) throw Error('manifest must be an array or {items: [...]}');
} catch (err) {
  console.error('Unable to read manifest:', err.message);
  process.exit(2);
}

const errors = [], warnings = [];
const error = (i, msg) => errors.push(`${i}: ${msg}`);
const warn = (i, msg) => warnings.push(`${i}: ${msg}`);
const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
const isUrl = value => {
  try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol); }
  catch { return false; }
};
const seenIds = new Map(), seenSlugs = new Map(), seenTitles = new Map();
const allowed = {
 species: new Set(['猫', '狗', '犬猫', '其他']),
 priority: new Set(['S', 'A', 'B']),
 contentType: new Set(['qa', 'guide', 'drug', 'hub']),
 editorialStatus: new Set(['draft_complete', 'source_verified_editorial', 'needs_edit', 'hold']),
 publicationState: new Set(['draft', 'publish_ready', 'published']),
 medicalReview: new Set(['pending', 'approved', 'changes_requested'])
};

records.forEach((r, index) => {
  const key = `record[${index}] ${r?.id || '(no id)'}`;
  if (!r || typeof r !== 'object' || Array.isArray(r)) { error(key, 'invalid record'); return; }
  for (const k of ['id','title','canonicalSlug','clusterKey','primaryQuery','directAnswer','applicability','emergencyBoundary','lastModifiedAt']) {
    if (typeof r[k] !== 'string' || !r[k].trim()) error(key, `missing ${k}`);
  }
  for (const k of ['species','priority','contentType','editorialStatus','publicationState']) {
    if (!allowed[k].has(r[k])) error(key, `invalid ${k}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.canonicalSlug || '')) error(key, 'slug must be lowercase kebab-case');
  for (const [field, seen, v] of [['id',seenIds,r.id],['canonicalSlug',seenSlugs,r.canonicalSlug]]) {
    if (!v) continue;
    if (seen.has(v)) error(key, `duplicate ${field}; first at record[${seen.get(v)}]`);
    else seen.set(v, index);
  }
  const ti = (r.title || '').replace(/[\s？！?。！]/g, '');
  if (ti && seenTitles.has(ti)) warn(key, `possible duplicate title with record[${seenTitles.get(ti)}]`);
  else if (ti) seenTitles.set(ti, index);
  if (!isDate(r.lastModifiedAt)) error(key, 'lastModifiedAt must be YYYY-MM-DD');
  if (r.sourceCheckedAt != null && !isDate(r.sourceCheckedAt)) error(key, 'invalid sourceCheckedAt');
  if (r.firstPublishedAt != null && !isDate(r.firstPublishedAt)) error(key, 'invalid firstPublishedAt');
  if (!Array.isArray(r.sourceRefs)) error(key, 'sourceRefs must be an array');
  else for (const [j,s] of r.sourceRefs.entries()) {
    if (!s.publisher || !isUrl(s.url)) error(key, `sourceRefs[${j}] missing publisher or valid URL`);
    if (!isDate(s.verifiedAt)) error(key, `sourceRefs[${j}] invalid verifiedAt`);
    if (isUrl(s.url) && /[?&](utm_|fbclid|gclid)/i.test(s.url)) warn(key, `sourceRefs[${j}] has tracking parameters`);
  }
  if (!r.medicalReview || !allowed.medicalReview.has(r.medicalReview.status)) error(key, 'invalid medicalReview.status');
  if (r.medicalReview?.status === 'approved') {
    if (!r.medicalReview.reviewer || !r.medicalReview.credentials || !isDate(r.medicalReview.reviewedAt))
      error(key, 'medical approval requires REAL reviewer, credentials and date');
  }
  if (!Array.isArray(r.relatedIds)) error(key, 'relatedIds must be an array');
  else if (new Set(r.relatedIds).size !== r.relatedIds.length) error(key, 'duplicate relatedIds');
  if (r.relatedIds?.includes(r.id)) error(key, 'cannot link to self');
  const release = r.publicationState === 'publish_ready' || r.publicationState === 'published' || r.indexEligible === true;
  if (r.editorialStatus === 'source_verified_editorial' && (!r.sourceRefs?.length || !isDate(r.sourceCheckedAt)))
    error(key, 'editorially verified must have sourceRefs and sourceCheckedAt');
  if (release) {
    if (r.editorialStatus !== 'source_verified_editorial') error(key, 'publish gate: missing editorial source verification');
    if (r.medicalReview?.status !== 'approved') error(key, 'publish gate: no real veterinary medical approval');
    if (!r.sourceRefs?.length || !isDate(r.sourceCheckedAt)) error(key, 'publish gate: no verified sources/date');
    if (typeof r.directAnswer !== 'string' || r.directAnswer.length < 15) error(key, 'publish gate: directAnswer too short');
    if (typeof r.emergencyBoundary !== 'string' || r.emergencyBoundary.length < 10) error(key, 'publish gate: emergency boundary missing');
  }
  if (r.contentType === 'drug') {
    const d = r.japanDrug;
    if (!d || !d.officialStatus) error(key, 'drug requires japanDrug.officialStatus even while pending');
    if (release) {
      for (const field of ['productNameJa','genericNameJa','targetSpecies','indicationJa','approvalDate','nvalRecordUrl','insertUrl','lastOfficialVerifiedAt'])
        if (!d?.[field]) error(key, `publish gate: drug missing ${field}`);
      if (d?.officialStatus !== 'verified') error(key, 'publish gate: Japan product not officially verified');
      for (const field of ['approvalDate','lastOfficialVerifiedAt']) if (d?.[field] && !isDate(d[field])) error(key, `drug invalid ${field}`);
      for (const field of ['nvalRecordUrl','insertUrl']) if (d?.[field] && !isUrl(d[field])) error(key, `drug invalid ${field}`);
    }
  }
  if (r.indexEligible === true) {
    if (r.publicationState !== 'published') error(key, 'indexEligible requires published state');
    if (r.founderIndexApproved !== true) error(key, 'indexEligible requires explicit founderIndexApproved');
  }
  if (r.publicationState === 'published' && !isDate(r.firstPublishedAt))
    error(key, 'published state requires real firstPublishedAt');
});

records.forEach((r, i) => {
  if (!r || !Array.isArray(r.relatedIds)) return;
  r.relatedIds.forEach(id => {
    if (!seenIds.has(id)) {
      const fn = full || r.publicationState === 'publish_ready' || r.publicationState === 'published' ? error : warn;
      fn(r.id || `record[${i}]`, `relatedId ${id} not in manifest; ensure target exists and is publishable`);
    }
  });
});
console.log(`日宠通GEO/SEO QA: ${records.length} records, ${errors.length} errors, ${warnings.length} warnings`);
for (const v of errors) console.error('ERROR', v);
for (const v of warnings) console.warn('WARN ', v);
if (errors.length) process.exitCode = 1;
