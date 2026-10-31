#!/usr/bin/env node
/** Read-only Draft audit: source field coverage, not a production integration or medical approval. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {KEYS} = require('./article-snapshot.proposed.cjs');
const source = fs.readFileSync(path.join(__dirname,'../api/pet.js'),'utf8');
const start = source.indexOf('function articlePage(a)');
const end = source.indexOf('function sitemap()',start);
assert(start >= 0 && end > start,'renderer articlePage boundary changed; manual review required');
const renderer = source.slice(start,end);
const accessed = [...new Set([...renderer.matchAll(/\ba\.([a-zA-Z_]\w*)/g)].map(x=>x[1]))].sort();
const covered = [...KEYS].sort();
assert.deepEqual(accessed,covered,'production renderer fields differ from proposed snapshot fields');
assert(renderer.includes('医学审核：待由合格执业兽医复核'),'vet pending notice missing or changed');
assert(renderer.includes('本文用于宠物健康科普，不替代兽医诊断与治疗。'),'medical disclaimer changed');
assert(renderer.includes('related=articles.filter('),'related-links rendering changed');
assert(renderer.includes('JSON.stringify('),'structured data rendering changed');
console.log(JSON.stringify({status:'PASS',scope:'static renderer field coverage only',fields:accessed,uncoveredDynamic:['related links','global template chrome','structured data policy','final HTTP rendering'],productionChanged:false},null,2));
