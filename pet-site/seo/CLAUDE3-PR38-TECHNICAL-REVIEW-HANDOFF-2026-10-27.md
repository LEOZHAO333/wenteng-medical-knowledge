# Claude-3 技术与文档审计交接包｜日宠通 PR #38

审核对象：https://github.com/LEOZHAO333/wenteng-medical-knowledge/pull/38
基线：main上的 `pet-site/api/pet.js`；所有候选代码在 `pet-site/seo/`，生产渲染器未修改。

## 请求Claude-3审查

1. **P0：索引放行可信边界**：候选 `verifyEvidence`、`getTrustedContent`、`getTrustedRendererSource` 都由调用方注入；检查是否可能绕过、异常放行或受不可信数据控制。不得把普通JSON字段认定为有效批准。
2. **P0：正文版本绑定**：检查摘要使用UTF-8完整字符串、严格哈希、三个批准版本一致性；`article-snapshot.proposed.cjs` 的字段覆盖与 `articlePage(a)` 是否一致。
3. **P0：模板与动态内容**：模板全源码哈希是否过宽、是否仍遗漏关联问答、免责声明、FAQ结构化数据和最终HTML变化；提出不修改生产文件的Draft验证方案。
4. **P0：医疗/Founder权限**：582条编辑核对不是兽医签署；无可信逐篇授权台账；不能放行40篇QA、撤销Hold或宣称医学终审。
5. **P1：测试与CI**：核对CI是否真正运行候选单测及只读字段覆盖审计，检查恶意/错误输入、日期、路径、Slug、证据撤销、哈希变更的边界测试。
6. **P1：合并前检查**：提出最小可信审批台账、证据来源、撤销机制、生产HTTP验证和回滚计划；区分代码可用与合规可上线。

## 已知事实

- 当前main生产renderer存在QA Slug存在即可能进入index/sitemap的治理风险，详见PR #37；本PR不修复线上行为。
- 文章候选字段为 `slug,species,topic,title,summary,answer,body,refs,published,modified`。
- 静态审计仅检查源码字段引用，不验证真实HTTP、JS运行渲染、外部兽医签署或索引状态。
- `article-snapshot` 对未知字段采用白名单忽略；新增医学字段须经静态审计检测，否则可能遗漏。
- 所有测试用批准均为合成夹具，不代表真实授权。

## 期望审计输出

`PASS / BLOCK`，按P0/P1/P2列出具体文件、触发路径、可复现测试与建议修复；明确是否允许继续Draft技术工作，**不授权合并、部署、改noindex或医学审核通过**。

> 本文件仅为已保存的交接包，不表示Claude已收到或审完。需要通过既有双AI交接渠道实际提交并取得可追溯回复。
