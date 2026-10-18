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
