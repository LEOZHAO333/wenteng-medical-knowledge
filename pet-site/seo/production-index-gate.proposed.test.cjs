const test = require('node:test');
const assert = require('node:assert/strict');
const {eligible, robots, sitemapPaths, qaApproved} = require('./production-index-gate.proposed.cjs');
const slug = 'cat-dandruff';
const approved = {
  slug, medicalReview: {status:'approved', reviewer:'Test Reviewer',credentials:'Verified veterinary license evidence required',reviewedAt:'2026-10-20'},
  medicalHold:false, founderPublishApproved:true,founderIndexApproved:true,indexEligible:true,
  publicationState:'published',firstPublishedAt:'2026-10-18',lastModifiedAt:'2026-10-20'
};
const config = {production:true,siteApproved:true,approvals:{[slug]:approved}};
test('unknown and unapproved QA fail closed', () => {
  assert.equal(eligible('qa/cat-dandruff',{production:true,siteApproved:true}),false);
  assert.equal(robots('qa/cat-dandruff',{production:true,siteApproved:true}),'noindex,follow');
  assert.equal(eligible('qa/unknown',config),false);
  assert.equal(eligible('qa/cat-dandruff',{...config,production:false}),false);
  assert.equal(eligible('qa/cat-dandruff',{...config,siteApproved:false}),false);
});
test('complete synthetic approval fixture passes only all gates', () => {
  assert.equal(qaApproved(approved,slug),true);
  assert.equal(eligible('qa/'+slug,config),true);
  for (const patch of [
    {medicalHold:true},{founderPublishApproved:false},{founderIndexApproved:false},
    {indexEligible:false},{publicationState:'draft'},{firstPublishedAt:'2026-02-30'},
    {lastModifiedAt:''},{medicalReview:{...approved.medicalReview,status:'pending'}}
  ]) assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:{...approved,...patch}}}),false);
});
test('core, new-drugs and sitemap share policy', () => {
  assert.equal(eligible('',config),true);
  assert.equal(eligible('about',config),true);
  assert.equal(eligible('new-drugs',config),false);
  assert.deepEqual(sitemapPaths([slug,'dog-dandruff-itching'],config),['','cat','dog','qa','about','qa/'+slug]);
  assert.deepEqual(sitemapPaths([slug],{production:true,siteApproved:true}),['','cat','dog','qa','about']);
  assert.deepEqual(sitemapPaths([slug],{...config,production:false}),[]);
});
test('duplicates and invalid slug rejected', () => {
  assert.throws(()=>sitemapPaths([slug,slug],config));
  assert.throws(()=>sitemapPaths(['../../bad'],config));
});
