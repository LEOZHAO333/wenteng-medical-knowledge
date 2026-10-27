# 日宠通生产索引闸门：源代码接入差距与验收矩阵（2026-10-27）

> 仅依据当前PR #36分支源文件只读核对。**不修改生产渲染器，不批准医疗内容，不执行部署。** 先前PR #35已合并；本文件属于新Draft PR #36。

## 源代码确认的P0缺口

1. `pet-site/api/pet.js` 的 `INDEX_ELIGIBLE_PATHS.has` 对问答使用 `articles.some(a => 'qa/' + a.slug === p)`：仅凭slug存在即可列入生产索引候选，没有逐篇调用 `isIndexEligible`。
2. `robotsFor` 由全站 `INDEXABLE`、slug白名单和 `NOINDEX_PATHS` 驱动；`X-Robots-Tag` 与HTML robots共享此逻辑，因此两者**一致但共同缺少逐篇医学/Founder资格**。
3. `function sitemap()` 在生产环境以 `articles.map(a=>'qa/'+a.slug)` 加入全部问答，并为所有URL输出全站 `UPDATED`。40篇问答均无可核实的逐篇`modified`，不应将统一日期冒充为逐篇实质更新日期。
4. `release-policy.mjs` 和 `sitemap-policy.mjs` 是未接入生产的候选纯函数。Draft CI通过只能证明这些函数的样例测试通过，**不能证明线上HTTP已按其执行**。
5. 现有全站Founder历史索引开关与逐篇正式兽医签署、Founder逐篇发布及索引授权是不同的审批对象。**不得自动迁移或推定审批**。

## 上线前必验矩阵

| 情况 | QA HTML robots | QA HTTP X-Robots-Tag | QA sitemap | 公开可见性 |
|---|---|---|---|---|
| 未找到逐篇审核记录 | noindex | noindex | 排除 | 需另行审定是否应公开 |
| 明确医学Hold/拒绝/待兽医审核 | noindex | noindex | 排除 | 需另行审定是否应公开 |
| 医学状态approved但缺正式兽医签署证据 | noindex | noindex | 排除 | 需另行审定是否应公开 |
| 医学签署齐全但缺Founder发布授权 | noindex | noindex | 排除 | 不可自动视为已获发布许可 |
| Founder已准发布但未准索引 | noindex | noindex | 排除 | 仅按已核准公开范围 |
| 两项Founder授权、兽医签署、真实日期均齐全 | 允许候选index | 允许候选index | 可纳入，lastmod取逐篇真实修改日期 | 仍需部署审批 |
| Preview环境 | noindex | noindex | 不生成可索引问答 | 不得以Preview代替正式批准 |
| `new-drugs` | 保持noindex | 保持noindex | 排除 | 不改现有政策 |
| 404 | noindex | noindex | 排除 | 返回404 |

核心栏目5页与40篇QA分开审批，不得让QA签署替代核心页面决策。

## 建议的接入设计（待单独审批，不在本PR实施）

- 以40个生产slug为键建立**独立、可追溯且默认全阻断**的医学签署与Founder权限清单；审核信息缺失/不匹配时返回不可索引。
- 由同一套经过核对的资格判断驱动QA的HTTP robots、HTML robots、sitemap，避免三个输出使用不同数据来源。
- 将真实逐篇修改日期写入已核准的记录；缺证据时不得以`UPDATED`、`published`或Git提交时间代替。
- 单独处理未批准问答的公开可见性问题：**noindex不等于撤下网页**。
- 分别验收40个QA、5个核心页、`new-drugs`、404、Preview和生产；对比HTTP响应与页面HTML，而不只检查静态源代码。
- 完成独立Draft PR、真实兽医签署核查、Founder对具体合并/部署/索引范围的批准后，方可考虑上线。

## 本PR的范围

PR #36只允许在`pet-site/seo/**`及受控测试工作流内增加只读审计、测试和交接材料。**不修改`pet-site/api/pet.js`、`vercel.json`、生产robots、sitemap或索引策略。**
