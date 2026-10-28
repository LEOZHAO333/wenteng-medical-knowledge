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

## 第八轮补充：撤销与失效的测试语义

- 候选测试新增可变的可信验证器状态：授权时 `eligible=true`、`robots=index,follow`、Sitemap包含QA；撤销后立即切换为 `eligible=false`、`robots=noindex,follow`、Sitemap移除QA。
- 测试拒绝 `verifyEvidence` 返回 `false/undefined/null/0/Promise`，及异常；兽医 `revoked/pending`、审核人空值、资质空值、非法日期和medicalHold都阻断。
- **注意：** 此测试只证明每次调用纯函数时，验证器结果会重新检查；真实服务可能存在CDN/HTML/Sitemap缓存、构建时静态化或搜索引擎抓取延迟，故**不能声称线上撤销即时生效**。正式设计需要缓存失效、部署/撤回操作、审计日志及真实HTTP验证。
- **关键审计问题：** 当前 `verifyEvidence` 由调用方提供。必须确认生产环境使用独立、可信、可撤销的授权来源，且不存在用 `()=>true` 或静态缓存绕过的路径。

## 第九轮补充：未知医学字段强制阻断

`article-snapshot.proposed.cjs` 已改为拒绝任何不在显式字段白名单中的文章顶层字段；正文块和参考资料对象也拒绝未定义的嵌套字段。测试覆盖新增 `drugDose`、关联内容、正文医学说明及参考资料附注。**这是Draft候选的安全约束**：如果生产数据确有新的合法字段，必须先人工判定医学含义、更新字段白名单、测试与审核版本，再考虑接入。不要以删除字段绕过校验。

本轮不修改生产 `pet-site/api/pet.js`、不发布、不开索引。现有真实文章的未知字段分布尚待只读验证。

## 第十轮：实际生产文章兼容性审计

新增只读 `audit-production-article-snapshot-compat.cjs`：从 `pet-site/api/pet.js` 中定位 `const articles = [...];` 字面量，使用隔离的Node.js vm上下文解析**仅文章数组**，逐条调用严格快照校验和SHA-256生成，核对Slug唯一性。CI会运行此审计并在任一不兼容记录上失败。

**安全边界：** 这是源码字面量的静态兼容性审计，不执行完整生产renderer、不读取线上HTTP、不自动批准医学内容；如将来文章数组改为动态加载，定位失败会阻断，需人工升级解析方案。不得将兼容性PASS视为兽医批准或线上索引安全。
