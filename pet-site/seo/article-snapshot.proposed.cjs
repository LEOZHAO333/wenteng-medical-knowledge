/** Draft-only deterministic serialization of medical article fields.
 * Renderer-bound integration is NOT implemented here.
 * This excludes automatically generated related links and page chrome;
 * changes to those may require a separate renderer/template revision policy.
 */
const {computeContentSha256} = require('./production-index-gate.proposed.cjs');
const KEYS = ['slug','species','topic','title','summary','answer','body','refs','published','modified'];
function strictArticleSnapshot(article) {
  if (!article || typeof article !== 'object' || Array.isArray(article)) throw new TypeError('article object required');
  const snapshot = {};
  for (const key of KEYS) {
    if (Object.hasOwn(article,key)) snapshot[key] = article[key];
  }
  if (typeof snapshot.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(snapshot.slug)) throw new Error('valid slug required');
  if (!Array.isArray(snapshot.body) || !snapshot.body.length) throw new Error('body required');
  for (const key of ['species','topic','title','summary','answer']) {
    if (typeof snapshot[key] !== 'string' || !snapshot[key].trim()) throw new Error('missing '+key);
  }
  for (const p of snapshot.body) {
    if (typeof p === 'string') continue;
    if (!p || typeof p !== 'object' || typeof p.h !== 'string' || (p.li !== undefined && (!Array.isArray(p.li) || p.li.some(x=>typeof x!=='string'))) || (p.li === undefined && typeof p.t !== 'string')) throw new Error('invalid body block');
  }
  if (snapshot.refs !== undefined && (!Array.isArray(snapshot.refs) || snapshot.refs.some(r=>!r || typeof r.name!=='string' || typeof r.url!=='string'))) throw new Error('invalid refs');
  if (snapshot.published !== undefined && typeof snapshot.published !== 'string') throw new Error('invalid published');
  if (snapshot.modified !== undefined && typeof snapshot.modified !== 'string') throw new Error('invalid modified');
  return JSON.stringify(snapshot);
}
function articleDigest(article) { return computeContentSha256(strictArticleSnapshot(article)); }
module.exports = {strictArticleSnapshot,articleDigest,KEYS};
