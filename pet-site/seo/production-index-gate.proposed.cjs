/** Draft-only production indexing gate; NOT imported by the live renderer.
 * No approval records are included. Empty catalog is intentionally fail-closed.
 */
const CORE_PATHS = new Set(['', 'cat', 'dog', 'qa', 'about']);
const NOINDEX_PATHS = new Set(['new-drugs']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

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
    typeof record.medicalReview.reviewer === 'string' && record.medicalReview.reviewer.trim() &&
    typeof record.medicalReview.credentials === 'string' && record.medicalReview.credentials.trim() &&
    validDate(record.medicalReview.reviewedAt) &&
    record.medicalHold !== true &&
    record.founderPublishApproved === true &&
    record.founderIndexApproved === true &&
    record.indexEligible === true &&
    record.publicationState === 'published' &&
    validDate(record.firstPublishedAt) &&
    validDate(record.lastModifiedAt));
}

/** All three outputs must use this same predicate. */
function eligible(path, {production = false, siteApproved = false, approvals = {}} = {}) {
  const p = normalizePath(path);
  if (!production || !siteApproved || NOINDEX_PATHS.has(p)) return false;
  if (CORE_PATHS.has(p)) return true;
  const match = /^qa\/([^/]+)$/.exec(p);
  if (!match || !SLUG_RE.test(match[1])) return false;
  return qaApproved(Object.hasOwn(approvals, match[1]) ? approvals[match[1]] : null, match[1]);
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
