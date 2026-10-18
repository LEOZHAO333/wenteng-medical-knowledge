/**
 * Candidate sitemap for post-approval, post-merge integration.
 * Does not run in pet-site/api/pet.js and does not modify public HTTP headers.
 */
import { isIndexEligible } from './release-policy.mjs';

const DATE=/^\d{4}-\d{2}-\d{2}$/;
const safeSlug=/^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
function validDate(date){
  return typeof date==='string'&&DATE.test(date)&&
    !Number.isNaN(Date.parse(date))&&new Date(date).toISOString().slice(0,10)===date;
}
export function buildApprovedQaSitemap(items,base='https://www.japanmedai.com/pet'){
  if(!Array.isArray(items))throw new TypeError('sitemap items must be array');
  const baseUrl=new URL(base);
  if(baseUrl.protocol!=='https:'||baseUrl.pathname.replace(/\/+$/,'')!=='/pet')
    throw new Error('Sitemap base must be an HTTPS /pet home URL');
  const urls=[],seen=new Set();
  for(const item of items){
    if(item.contentType!=='qa'||!isIndexEligible(item))continue;
    if(!safeSlug.test(item.canonicalSlug))throw new Error('Invalid slug '+item.canonicalSlug);
    if(!validDate(item.lastModifiedAt))throw new Error('Invalid editorial lastModifiedAt for '+item.id);
    const loc=baseUrl.origin+'/pet/qa/'+item.canonicalSlug+'/';
    if(seen.has(loc))throw new Error('Duplicate sitemap URL '+loc);
    seen.add(loc);
    urls.push({loc,lastmod:item.lastModifiedAt});
  }
  const xml=urls.map(({loc,lastmod})=>'<url><loc>'+esc(loc)+'</loc><lastmod>'+esc(lastmod)+'</lastmod></url>').join('');
  return '<?xml version="1.0" encoding="UTF-8"?>\n'+
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+xml+'</urlset>\n';
}
