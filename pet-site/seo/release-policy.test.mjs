import test from 'node:test';
import assert from 'node:assert/strict';
import { isMedicalEditorialReady, isPublishReady, mayBePublic, isIndexEligible, indexableSlugs } from './release-policy.mjs';

const verified=()=>({
  id:'0283',species:'猫',title:'猫舔毛与腹部脱毛的医学评估',
  canonicalSlug:'cat-belly-hair-loss',contentType:'qa',
  editorialStatus:'source_verified_editorial',
  publicationState:'draft',
  sourceCheckedAt:'2026-10-18',
  sourceRefs:[{publisher:'example professional association',url:'https://example.org/vet-guide',verifiedAt:'2026-10-18'}],
  directAnswer:'不能只凭外观判断原因',
  applicability:'持续舔毛脱毛的猫',
  emergencyBoundary:'有排尿困难或严重不适需就医',
  medicalReview:{status:'approved',reviewer:'TEST REVIEWER ONLY',credentials:'TEST',reviewedAt:'2026-10-18'},
  founderPublishApproved:false,founderIndexApproved:false,indexEligible:false,
  firstPublishedAt:null
});
test('未医学审稿、未核对来源的草稿不能放行',()=>{
 const a=verified();a.sourceRefs=[];a.medicalReview={status:'pending'};
 assert.equal(isMedicalEditorialReady(a),false);
 assert.equal(isPublishReady(a),false);
 assert.equal(isIndexEligible(a),false);
});
test('医学与来源层完成，但草稿不能进入可公开状态',()=>{
 const a=verified();
 assert.equal(isMedicalEditorialReady(a),true);
 assert.equal(isPublishReady(a),false);
 assert.deepEqual(indexableSlugs([a]),[]);
});
test('publish_ready不能在未经Founder批准时自行公开',()=>{
 const a=verified();a.publicationState='publish_ready';
 assert.equal(isPublishReady(a),true);
 assert.equal(mayBePublic(a),false);
 assert.equal(isIndexEligible(a),false);
});
test('发布与索引分别需要Founder授权',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';
 assert.equal(mayBePublic(a),false);
 a.founderPublishApproved=true;
 assert.equal(mayBePublic(a),true);
 assert.equal(isIndexEligible(a),false);
 a.founderIndexApproved=true;a.indexEligible=true;
 assert.equal(isIndexEligible(a),true);
 assert.deepEqual(indexableSlugs([a]),['cat-belly-hair-loss']);
});
test('药品NVAL官方核验pending阻断，即使其他字段通过',()=>{
 const a=verified();a.contentType='drug';a.publicationState='published';a.firstPublishedAt='2026-10-18';
 a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 a.japanDrug={officialStatus:'pending'};
 assert.equal(isMedicalEditorialReady(a),false);
 assert.equal(isIndexEligible(a),false);
});
test('拒绝重复可索引slug',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';
 a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 const b={...a,id:'another'};
 assert.throws(()=>indexableSlugs([a,b]),/Duplicate indexable slug/);
});

test('缺逐篇医学签署时一律拒绝索引',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';
 a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 for(const review of [undefined,{status:'pending'},{status:'approved',reviewer:'',credentials:'TEST',reviewedAt:'2026-10-18'},{status:'approved',reviewer:'TEST',credentials:'',reviewedAt:'2026-10-18'},{status:'approved',reviewer:'TEST',credentials:'TEST',reviewedAt:'2026-02-30'}]){
  a.medicalReview=review;
  assert.equal(isIndexEligible(a),false);
  assert.deepEqual(indexableSlugs([a]),[]);
 }
});
test('Founder发布与索引两项许可不得互相替代',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';a.indexEligible=true;
 a.founderPublishApproved=true;a.founderIndexApproved=false;
 assert.equal(isIndexEligible(a),false);
 a.founderPublishApproved=false;a.founderIndexApproved=true;
 assert.equal(isIndexEligible(a),false);
 a.founderPublishApproved=true;
 assert.equal(isIndexEligible(a),true);
});
test('无真实首次公开日期、日期无效、缺来源核验均阻断',()=>{
 const a=verified();a.publicationState='published';a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 for(const date of [null,'','2026-02-30','2026-13-01']){
  a.firstPublishedAt=date;
  assert.equal(isIndexEligible(a),false);
 }
 a.firstPublishedAt='2026-10-18';a.sourceCheckedAt='2026-02-30';
 assert.equal(isIndexEligible(a),false);
 a.sourceCheckedAt='2026-10-18';a.sourceRefs=[];
 assert.equal(isIndexEligible(a),false);
});
test('医疗Hold状态不能凭签署样例与Founder字段误放行',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';
 a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 a.medicalReview={status:'pending',reviewer:'TEST',credentials:'TEST',reviewedAt:'2026-10-18'};
 assert.equal(isIndexEligible(a),false);
});

test('显式医学Hold或禁止发布优先于所有其他批准字段',()=>{
 const a=verified();a.publicationState='published';a.firstPublishedAt='2026-10-18';
 a.founderPublishApproved=true;a.founderIndexApproved=true;a.indexEligible=true;
 assert.equal(isIndexEligible(a),true);
 for(const blocked of [
  {medicalHold:true},
  {releaseAuthorized:false},
  {medicalReviewStatus:'pending_licensed_veterinarian'},
  {medicalReviewStatus:'rejected'}
 ]){
  const item={...a,...blocked};
  assert.equal(isMedicalEditorialReady(item),false);
  assert.equal(mayBePublic(item),false);
  assert.equal(isIndexEligible(item),false);
  assert.deepEqual(indexableSlugs([item]),[]);
 }
});
