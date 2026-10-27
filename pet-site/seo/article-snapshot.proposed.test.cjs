const test = require('node:test');
const assert = require('node:assert/strict');
const {strictArticleSnapshot,articleDigest} = require('./article-snapshot.proposed.cjs');
const base = {slug:'cat-dandruff',species:'猫',topic:'皮肤与被毛',title:'猫身上有皮屑？',summary:'简述',answer:'不能仅凭皮屑判断。',body:['第一段',{h:'观察',li:['红斑','抓挠']}],refs:[{name:'专业资料',url:'https://example.org'}],published:'2026-10-18'};
test('stable digest independent of input object key insertion order',()=>{
  assert.equal(articleDigest(base),articleDigest(Object.fromEntries(Object.entries(base).reverse())));
});
test('every medical meaning field changes digest',()=>{
  for(const key of ['species','topic','title','summary','answer','published']){
    assert.notEqual(articleDigest(base),articleDigest({...base,[key]:base[key]+'变更'}),key);
  }
  assert.notEqual(articleDigest(base),articleDigest({...base,body:['替换正文']}),'body');
  assert.notEqual(articleDigest(base),articleDigest({...base,refs:[{name:'新资料',url:'https://example.org'}]}),'refs');
  assert.notEqual(articleDigest(base),articleDigest({...base,modified:'2026-10-20'}),'modified');
  assert.notEqual(articleDigest(base),articleDigest({...base,body:['第一段',{h:'观察',li:['红斑','新项目']}]}),'nested list');
});
test('missing required fields and malformed body fail closed',()=>{
  assert.throws(()=>strictArticleSnapshot({...base,answer:''}));
  assert.throws(()=>strictArticleSnapshot({...base,body:[{h:'标题',li:[42]}]}));
  assert.throws(()=>strictArticleSnapshot({...base,refs:[{name:'no url'}]}));
});
test('nonmedical derived chrome is excluded explicitly',()=>{
  assert.equal(articleDigest(base),articleDigest({...base,relatedLinks:['not included'],runtimeCache:123}));
});
