import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApprovedQaSitemap } from './sitemap-policy.mjs';
const fixture=()=>({
  id:'TEST-001',canonicalSlug:'cat-ear-test',contentType:'qa',
  editorialStatus:'source_verified_editorial',
  sourceCheckedAt:'2026-10-18',
  sourceRefs:[{publisher:'TEST SOURCE',url:'https://example.org/article',verifiedAt:'2026-10-18'}],
  directAnswer:'耳部症状的简明安全回答',applicability:'猫的耳部症状',
  emergencyBoundary:'出现歪头或无法站立应及时就医',
  medicalReview:{status:'approved',reviewer:'TEST PERSON',credentials:'TEST ONLY',reviewedAt:'2026-10-18'},
  publicationState:'published',firstPublishedAt:'2026-10-18',lastModifiedAt:'2026-10-18',
  founderPublishApproved:true,founderIndexApproved:true,indexEligible:true
});
test('only approved published indexed QA is included',()=>{
 const a=fixture();
 const draft={...a,id:'TEST-002',canonicalSlug:'cat-ear-draft',publicationState:'draft',indexEligible:false};
 const noMedical={...a,id:'TEST-003',canonicalSlug:'cat-ear-no-medical',medicalReview:{status:'pending'}};
 const noFounder={...a,id:'TEST-004',canonicalSlug:'cat-ear-no-founder',founderIndexApproved:false};
 const drug={...a,id:'TEST-005',canonicalSlug:'japan-drug-no-qa',contentType:'drug'};
 const xml=buildApprovedQaSitemap([a,draft,noMedical,noFounder,drug]);
 assert.match(xml,/https:\/\/pet\.japanmedai\.com\/qa\/cat-ear-test\//);
 for(const slug of ['cat-ear-draft','cat-ear-no-medical','cat-ear-no-founder','japan-drug-no-qa'])
   assert.equal(xml.includes(slug),false);
 assert.match(xml,/<lastmod>2026-10-18<\/lastmod>/);
 assert.equal((xml.match(/<url>/g)||[]).length,1);
});
test('a not-yet-approved complete catalog emits empty URL set',()=>{
 const d={...fixture(),publicationState:'draft',indexEligible:false};
 assert.equal((buildApprovedQaSitemap([d]).match(/<url>/g)||[]).length,0);
});
test('duplicate approved URLs fail closed',()=>{
 const a=fixture();
 assert.throws(()=>buildApprovedQaSitemap([a,{...a,id:'TEST-OTHER'}]),/Duplicate sitemap URL/);
});
test('false editorial lastmod is not silently indexed',()=>{
 const a={...fixture(),lastModifiedAt:'2026-02-30'};
 assert.throws(()=>buildApprovedQaSitemap([a]),/Invalid editorial lastModifiedAt/);
});
