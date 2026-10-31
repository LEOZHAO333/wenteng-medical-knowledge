const test = require('node:test');
const assert = require('node:assert/strict');
const {eligible, robots, sitemapPaths, qaApproved, computeContentSha256} = require('./production-index-gate.proposed.cjs');
const slug = 'cat-dandruff';
const source = 'renderer-bound synthetic article body';
const hash = computeContentSha256(source);
const rendererSource = 'synthetic renderer template';
const rendererHash = computeContentSha256(rendererSource);
const approved = {
  slug, rendererTemplateSha256:rendererHash, founderPublishRendererTemplateSha256:rendererHash, founderIndexRendererTemplateSha256:rendererHash,
  contentSha256:hash, founderPublishContentSha256:hash, founderIndexContentSha256:hash,
  medicalReview: {rendererTemplateSha256:rendererHash,contentSha256:hash,status:'approved', reviewer:'Test Reviewer',credentials:'Verified veterinary license evidence required',reviewedAt:'2026-10-20',evidenceRef:'synthetic-vet-proof'},
  founderPublishEvidenceRef:'synthetic-publish-proof',founderIndexEvidenceRef:'synthetic-index-proof',
  medicalHold:false, founderPublishApproved:true,founderIndexApproved:true,indexEligible:true,
  publicationState:'published',firstPublishedAt:'2026-10-18',lastModifiedAt:'2026-10-20'
};
const config = {production:true,siteApproved:true,approvals:{[slug]:approved},verifyEvidence:(record, s)=>s===slug && record===approved,getTrustedContent:()=>source,getTrustedRendererSource:()=>rendererSource};
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
  assert.equal(eligible('qa/'+slug,{...config,verifyEvidence:undefined}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedContent:undefined}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedRendererSource:undefined}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedRendererSource:()=>rendererSource+' changed'}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedRendererSource:()=>{throw Error('unavailable')}}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedContent:()=>source+' changed'}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedContent:()=>null}),false);
  assert.equal(eligible('qa/'+slug,{...config,getTrustedContent:()=>{throw Error('unavailable')}}),false);
  assert.equal(eligible('qa/'+slug,{...config,verifyEvidence:()=>false}),false);
  assert.equal(eligible('qa/'+slug,{...config,verifyEvidence:()=>{throw Error('unavailable')}}),false);
  for (const patch of [
    {medicalHold:true},{founderPublishApproved:false},{founderIndexApproved:false},
    {contentSha256:'b'.repeat(64)},
    {founderPublishContentSha256:'b'.repeat(64)},
    {founderIndexContentSha256:'b'.repeat(64)},
    {medicalReview:{...approved.medicalReview,contentSha256:'b'.repeat(64)}},
    {indexEligible:false},{publicationState:'draft'},{firstPublishedAt:'2026-02-30'},
    {founderPublishEvidenceRef:''},{founderIndexEvidenceRef:''},
    {medicalReview:{...approved.medicalReview,evidenceRef:''}},
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

test('any changed body hash invalidates old approvals', () => {
  const changed = {...approved,contentSha256:'b'.repeat(64)};
  assert.equal(qaApproved(changed,slug),false);
  assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:changed},verifyEvidence:()=>true}),false);
  const invalid = {...approved,contentSha256:'not-a-hash',medicalReview:{...approved.medicalReview,contentSha256:'not-a-hash'},founderPublishContentSha256:'not-a-hash',founderIndexContentSha256:'not-a-hash'};
  assert.equal(qaApproved(invalid,slug),false);
});

test('hash is derived from exact UTF-8 content bytes', () => {
  assert.match(computeContentSha256(source),/^[a-f0-9]{64}$/);
  assert.notEqual(computeContentSha256(source),computeContentSha256(source+' '));
  assert.notEqual(computeContentSha256('é'),computeContentSha256('e\u0301'));
  assert.equal(computeContentSha256(null),null);
});

test('renderer template version is bound to each approval',()=>{
  for(const key of ['rendererTemplateSha256','founderPublishRendererTemplateSha256','founderIndexRendererTemplateSha256']){
    const altered={...approved,[key]:'b'.repeat(64)};
    assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:altered},verifyEvidence:()=>true}),false);
  }
  const altered={...approved,medicalReview:{...approved.medicalReview,rendererTemplateSha256:'b'.repeat(64)}};
  assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:altered},verifyEvidence:()=>true}),false);
});

test('revocation in trusted ledger invalidates previously approved article immediately', () => {
  const ledger = {revoked:false};
  const live = {...config,verifyEvidence:()=>!ledger.revoked};
  assert.equal(eligible('qa/'+slug,live),true);
  assert.equal(robots('qa/'+slug,live),'index,follow');
  assert.ok(sitemapPaths([slug],live).includes('qa/'+slug));
  ledger.revoked = true;
  assert.equal(eligible('qa/'+slug,live),false);
  assert.equal(robots('qa/'+slug,live),'noindex,follow');
  assert.ok(!sitemapPaths([slug],live).includes('qa/'+slug));
});
test('revocation, pending vet review, missing evidence or source failures always block', () => {
  for (const verifyEvidence of [()=>false,()=>undefined,()=>null,()=>0,()=>Promise.resolve(true),()=>{throw new Error('revocation ledger unavailable')}]) {
    assert.equal(eligible('qa/'+slug,{...config,verifyEvidence}),false);
  }
  for (const medicalReview of [
    {...approved.medicalReview,status:'revoked'},
    {...approved.medicalReview,status:'pending'},
    {...approved.medicalReview,reviewer:' '},
    {...approved.medicalReview,credentials:''},
    {...approved.medicalReview,reviewedAt:'2026-02-30'}
  ]) assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:{...approved,medicalReview}},verifyEvidence:()=>true}),false);
  assert.equal(eligible('qa/'+slug,{...config,approvals:{[slug]:{...approved,medicalHold:true}},verifyEvidence:()=>true}),false);
});
