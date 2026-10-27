# 日宠通：可信索引授权台账对接审计（2026-10-27）

## 现有证据来源及权限等级

| 来源 | 现有字段或行为 | 可作为正式索引批准证据？ |
|---|---|---|
| `pet-site/seo/medical-review-handoff.mjs` | 输出582条队列，统一 `medicalReviewStatus: PENDING_LICENSED_VETERINARIAN`、`releaseAuthorized:false`；`newMedicalApprovalsFromThisTool:0` | **否**。仅为编辑/专业复核交接清单 |
| `pet-site/content/SOURCE-VERIFICATION-BATCH-*.md` | 来源编辑核对记录（source_verified_editorial等） | **否**。不等于持证兽医审签 |
| `pet-site/seo/release-policy.mjs` | `isMedicalEditorialReady/isPublishReady/mayBePublic/isIndexEligible` 纯函数 | **否**。只能判断输入结构，不能独立验证输入真实性 |
| `pet-site/seo/approval-boundaries.json` | 明确Founder合并、部署、索引及医学风险审批边界 | **否**。这是权限制度，不是逐篇授权台账 |
| `pet-site/api/pet.js` | 生产问答列表及全局索引开关 | **否**。当前Slug存在即可能放行索引 |
| PR #37的Vercel部署核验 | A批12篇存在于2026-10-17 18:07 JST成功生产部署源码 | **否**。部署证据不是兽医审核或首次HTTP公开日期 |

## 候选模块的可信对接契约

1. 受信任服务端读取独立、受控、可审计的**逐篇**审核与Founder授权记录，不能从网页请求、普通内容JSON、AI生成结果或测试夹具直接取得批准。
2. 以不可混淆的文章ID及Slug匹配记录；核对正文版本摘要（如SHA-256）与审核时版本一致，避免旧审核放行新正文。
3. 兽医签署需可核对姓名、有效执业资格、适用专业、审核日期、具体内容版本、审签来源及撤销状态。未经核对，`verifyEvidence` 不得返回true。
4. Founder发布和索引是**两个独立批准事件**；必须有审批主体、批准时间、所批准版本、可审计引用与撤销状态。
5. 对发布/修改日期必须分别保留证据来源；Vercel部署时间、Git提交日期、统一sitemap lastmod均不能直接冒充逐篇首次公开日期。
6. 审批失效、Hold、新内容版本、验证器异常或台账不可用时默认不索引；保留审计日志并阻止缓存中的旧批准继续放行。
7. 正式接入时HTML meta robots、HTTP X-Robots-Tag、sitemap必须调用同一决策；`/new-drugs/`、Preview和404继续noindex；核心页规则独立保持。
8. 审批数据中不得包含患者身份或病历。验证器的真实权限、可信数据源、凭证撤销机制及回滚方案须另行审核。

## 本轮判断

**目前仓库可见资料不足以建立真实可信的逐篇索引批准台账。** 不得把582条编辑核对记录、40篇线上Slug、已有全局Founder索引开放批准或合成测试夹具转换为逐篇医学/索引批准。

候选代码中的 `verifyEvidence` 是待实现的接口，**不是**真实凭据校验。后续可在Draft继续做拒绝测试和版本绑定设计，但正式接入生产及改变现有索引行为必须另行取得Founder授权。
