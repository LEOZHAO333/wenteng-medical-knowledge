/**
 * 日宠通 发布资格纯函数。它只判断已有的可核验元数据，不执行部署或授权。
 * 任何布尔值均不能替代真实兽医和Founder的外部核查与正式审批。
 */
const hasText = s => typeof s === 'string' && s.trim().length > 0;
const validDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s)) && new Date(s).toISOString().slice(0,10) === s;
const officialDrugFields = ['productNameJa','genericNameJa','targetSpecies','indicationJa','approvalDate','nvalRecordUrl','insertUrl','lastOfficialVerifiedAt'];

export function isMedicalEditorialReady(item){
  if(!item || item.editorialStatus!=='source_verified_editorial') return false;
  if(!hasText(item.id)||!hasText(item.canonicalSlug)||!hasText(item.directAnswer)) return false;
  if(!hasText(item.applicability)||!hasText(item.emergencyBoundary)) return false;
  if(!validDate(item.sourceCheckedAt)||!Array.isArray(item.sourceRefs)||!item.sourceRefs.length) return false;
  for(const s of item.sourceRefs){
    if(!hasText(s.publisher)||!hasText(s.url)||!validDate(s.verifiedAt)) return false;
    if(!/^https?:\/\//i.test(s.url)) return false;
  }
  const m=item.medicalReview;
  if(!m||m.status!=='approved'||!hasText(m.reviewer)||!hasText(m.credentials)||!validDate(m.reviewedAt))return false;
  if(item.contentType==='drug'){
    const d=item.japanDrug;
    if(!d || d.officialStatus!=='verified')return false;
    if(officialDrugFields.some(field=>!hasText(d[field])))return false;
    if(!validDate(d.approvalDate)||!validDate(d.lastOfficialVerifiedAt))return false;
    if(!/^https?:\/\//i.test(d.nvalRecordUrl)||!/^https?:\/\//i.test(d.insertUrl))return false;
  }
  return true;
}
export function isPublishReady(item){
  return isMedicalEditorialReady(item) &&
    ['publish_ready','published'].includes(item.publicationState);
}
export function mayBePublic(item){
  return isPublishReady(item) &&
    item.publicationState==='published' &&
    item.founderPublishApproved===true &&
    validDate(item.firstPublishedAt);
}
export function isIndexEligible(item){
  return mayBePublic(item) &&
    item.founderIndexApproved===true &&
    item.indexEligible===true;
}
export function indexableSlugs(items){
  if(!Array.isArray(items))throw new TypeError('items must be an array');
  const result=[],seen=new Set();
  for(const item of items){
    if(!isIndexEligible(item))continue;
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.canonicalSlug))throw new Error('Unsafe canonical slug');
    if(seen.has(item.canonicalSlug))throw new Error('Duplicate indexable slug: '+item.canonicalSlug);
    seen.add(item.canonicalSlug);result.push(item.canonicalSlug);
  }
  return result;
}
