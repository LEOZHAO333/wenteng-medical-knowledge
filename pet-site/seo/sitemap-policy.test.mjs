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

test('explicit medical Hold overrides otherwise fully approved QA in sitemap',()=>{
 const a=fixture();
 const blockers=[
  {medicalHold:true},
  {releaseAuthorized:false},
  {medicalReviewStatus:'pending_licensed_veterinarian'},
  {medicalReviewStatus:'rejected'}
 ];
 for(const blocked of blockers){
  const xml=buildApprovedQaSitemap([{...a,...blocked}]);
  assert.equal((xml.match(/<url>/g)||[]).length,0);
  assert.equal(xml.includes('/qa/cat-ear-test/'),false);
 }
});
test('sitemap requires both independent Founder permissions',()=>{
 const a=fixture();
 for(const blocked of [{founderPublishApproved:false},{founderIndexApproved:false},{indexEligible:false}]){
  const xml=buildApprovedQaSitemap([{...a,...blocked}]);
  assert.equal((xml.match(/<url>/g)||[]).length,0);
 }
});
test('medical Hold does not suppress separately approved QA entries',()=>{
 const approved=fixture();
 const held={...fixture(),id:'TEST-HOLD',canonicalSlug:'cat-ear-held',medicalHold:true};
 const xml=buildApprovedQaSitemap([held,approved]);
 assert.equal((xml.match(/<url>/g)||[]).length,1);
 assert.equal(xml.includes('/qa/cat-ear-held/'),false);
 assert.equal(xml.includes('/qa/cat-ear-test/'),true);
});

test('approved QA with missing or invalid per-article lastmod fails closed',()=>{
 for(const lastModifiedAt of [undefined,null,'','2026-02-30','2026-10-17T12:00:00Z']){
  const item={...fixture(),lastModifiedAt};
  assert.throws(()=>buildApprovedQaSitemap([item]),/Invalid editorial lastModifiedAt/);
 }
});
test('site-level UPDATED or publication date cannot substitute for missing article lastmod',()=>{
 const item={...fixture(),lastModifiedAt:undefined,UPDATED:'2026-10-17',published:'2026-10-15'};
 assert.throws(()=>buildApprovedQaSitemap([item]),/Invalid editorial lastModifiedAt/);
});
test('unapproved QA with absent lastmod stays omitted, not implicitly authorized',()=>{
 const item={...fixture(),medicalHold:true,lastModifiedAt:undefined};
 const xml=buildApprovedQaSitemap([item]);
 assert.equal((xml.match(/<url>/g)||[]).length,0);
});

test('each approved QA uses its own lastModifiedAt, never a shared site date',()=>{
 const first={...fixture(),id:'TEST-101',canonicalSlug:'cat-ear-first',lastModifiedAt:'2026-10-16'};
 const second={...fixture(),id:'TEST-102',canonicalSlug:'dog-ear-second',lastModifiedAt:'2026-10-21'};
 const xml=buildApprovedQaSitemap([first,second]);
 assert.match(xml,/<loc>https:\/\/pet\.japanmedai\.com\/qa\/cat-ear-first\/<\/loc><lastmod>2026-10-16<\/lastmod>/);
 assert.match(xml,/<loc>https:\/\/pet\.japanmedai\.com\/qa\/dog-ear-second\/<\/loc><lastmod>2026-10-21<\/lastmod>/);
 assert.equal((xml.match(/<url>/g)||[]).length,2);
});
test('one approved QA with missing date blocks the entire sitemap rather than partial output',()=>{
 const valid={...fixture(),id:'TEST-201',canonicalSlug:'cat-ear-valid'};
 const missing={...fixture(),id:'TEST-202',canonicalSlug:'cat-ear-missing-date',lastModifiedAt:undefined};
 assert.throws(()=>buildApprovedQaSitemap([valid,missing]),/Invalid editorial lastModifiedAt/);
});
