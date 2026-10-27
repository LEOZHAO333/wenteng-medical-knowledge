/** Draft-only production indexing gate; NOT imported by the live renderer.
 * No approval records are included. Empty catalog is intentionally fail-closed.
 */
const CORE_PATHS = new Set(['', 'cat', 'dog', 'qa', 'about']);
const NOINDEX_PATHS = new Set(['new-drugs']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SHA256_RE = /^[a-f0-9]{64}$/;

function normalizePath(path) {
  return String(path || '').replace(/^\/+|\/+$/g, '');
}

function validDate(value) {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false;
  const date = new Date(value + 'T00:00:00.000Z');
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function qaApproved(record, slug) {
  return Boolean(record && record.slug === slug &&
    record.medicalReview?.status === 'approved' &&
    typeof record.contentSha256 === 'string' && SHA256_RE.test(record.contentSha256) &&
    record.medicalReview.contentSha256 === record.contentSha256 &&
    record.founderPublishContentSha256 === record.contentSha256 &&
    record.founderIndexContentSha256 === record.contentSha256 &&
    typeof record.medicalReview.reviewer === 'string' && record.medicalReview.reviewer.trim() &&
    typeof record.medicalReview.credentials === 'string' && record.medicalReview.credentials.trim() &&
    validDate(record.medicalReview.reviewedAt) &&
    typeof record.medicalReview.evidenceRef === 'string' && record.medicalReview.evidenceRef.trim() &&
    typeof record.founderPublishEvidenceRef === 'string' && record.founderPublishEvidenceRef.trim() &&
    typeof record.founderIndexEvidenceRef === 'string' && record.founderIndexEvidenceRef.trim() &&
    record.medicalHold !== true &&
    record.founderPublishApproved === true &&
    record.founderIndexApproved === true &&
    record.indexEligible === true &&
    record.publicationState === 'published' &&
    validDate(record.firstPublishedAt) &&
    validDate(record.lastModifiedAt));
}

/** All three outputs must use this same predicate. */
function eligible(path, {production = false, siteApproved = false, approvals = {}, verifyEvidence} = {}) {
  const p = normalizePath(path);
  if (!production || !siteApproved || NOINDEX_PATHS.has(p)) return false;
  if (CORE_PATHS.has(p)) return true;
  const match = /^qa\/([^/]+)$/.exec(p);
  if (!match || !SLUG_RE.test(match[1])) return false;
  const record = Object.hasOwn(approvals, match[1]) ? approvals[match[1]] : null;
  if (!qaApproved(record, match[1]) || typeof verifyEvidence !== 'function') return false;
  // Trust boundary: caller MUST provide an independent, trusted server-side verifier.
  // A JSON-supplied callback or mere existence of evidenceRefs is NOT verification.
  try { return verifyEvidence(record, match[1]) === true; } catch { return false; }
}

function robots(path, config) {
  return eligible(path, config) ? 'index,follow' : 'noindex,follow';
}

function sitemapPaths(slugs, config) {
  const core = [...CORE_PATHS].filter(p => eligible(p, config));
  const seen = new Set();
  const qa = [];
  for (const slug of slugs) {
    if (!SLUG_RE.test(slug) || seen.has(slug)) throw new Error('Invalid or duplicate QA slug');
    seen.add(slug);
    if (eligible('qa/' + slug, config)) qa.push('qa/' + slug);
  }
  return [...core, ...qa];
}

module.exports = {eligible, robots, sitemapPaths, qaApproved, validDate};
