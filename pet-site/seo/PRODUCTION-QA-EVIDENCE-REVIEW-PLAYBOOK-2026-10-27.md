# 日宠通40篇生产QA证据核验台账｜执行说明（Draft）

本台账由 `node pet-site/seo/export-production-qa-evidence-gaps.mjs --tsv` 生成。输出是**待核验工作底稿**，不是正式签署记录，也不是批准名单。当前每一条都必须保持 `not_verified` / `not_determined_do_not_approve`，不得由脚本推定批准。

## 工作顺序

**第一批：12篇无源码发布日期且无修改日期。** 优先追溯最早公开部署记录、历史页面快照、正式CMS发布日志与实质内容修改记录。源码缺字段不代表从未发布，Git commit时间也不能单独证明公开日期。

**第二批：28篇源码日期相同。** 每篇核验 `2026-10-15` 是否真实首次公开日；不能因为28篇同一天就断定虚假，也不能因为源码写了日期就当作已证实。40篇均需逐篇确认最后实质修改日期。

**并行专业审核：40篇均单独核对** 真实执业兽医签署及可查资质凭据、医学Hold状态与解除凭据、Founder发布批准和索引批准。没有对应证据的字段保持未核验，不用AI审核、CI、历史全站索引开关替代。

## 台账字段

- `slug`、`species`：来自当前生产渲染器源文件。
- `sourcePublished`、`sourceModified`：仅为源码中的日期，不表示已证实。
- `publicationDateEvidence` / `publicationEvidenceRef` / `publicationEvidenceReviewer`：首次公开日期核验状态、证据位置与人工复核人。
- `modifiedDateEvidence` / `modifiedEvidenceRef` / `modifiedEvidenceReviewer`：最后实质修改日期的对应证据。
- `licensedVetSignoff`、`vetReviewerName`、`vetCredentialsRef`、`vetSignoffDate`、`vetSignoffEvidenceRef`：真实兽医专业审签资料，不得自动生成或代签。
- `founderPublishApproval` / `founderPublishEvidenceRef` 与 `founderIndexApproval` / `founderIndexEvidenceRef`：两项独立授权，不得互相替代。
- `medicalHoldResolutionRef`：适用于原有医学Hold内容；无真实解除凭据时维持阻断。
- `eligibility`：脚本永远输出 `not_determined_do_not_approve`，不能据此开启生产索引。

## 验收与边界

1. 先将TSV作为人工核验模板的输入，填证据后交真实兽医与Founder分别核对；不要把人工填写结果回灌成未经授权的批准字段。
2. 40个slug与生产源码一一对应；发生增删或日期基线变化时CI要求重新审计。
3. 真实证据和签署齐全后，另行提交受控生产集成PR与审批包，才能讨论robots/sitemap/index变更。
4. 本轮只修改 `pet-site/seo/**`，不修改生产渲染器、部署、noindex或公开内容。
