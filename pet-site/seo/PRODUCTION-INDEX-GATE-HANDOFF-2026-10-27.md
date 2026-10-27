# 日宠通生产索引逐篇签署闸门｜独立实施交接（Draft，2026-10-27）

## P0风险与当前证据
- 现行生产源码`pet-site/api/pet.js`以核心栏目或存在于`articles`数组中的QA Slug作为索引候选，sitemap由全部renderer问答构建；未消费逐篇真实兽医签署和Founder索引许可。
- 40篇问答、45个候选URL仅是渲染与索引候选集合，不代表获得医学批准。源码已有`INDEX_APPROVED=true`的历史Founder全站开关，但它**不等于逐篇医学批准**；不得擅自改动。
- `release-policy.mjs`已提供`isMedicalEditorialReady`、`mayBePublic`、`isIndexEligible`与`indexableSlugs`纯函数；`sitemap-policy.mjs`已有候选`buildApprovedQaSitemap`，**均尚未接入生产renderer**。
- Draft审计CI通过只表示静态一致性，不构成医学或法律签署。

## 未来生产实施必须满足的契约
1. 维护与生产Slug逐条对应的**独立审核清单**，每条包括：`canonicalSlug`、原始知识ID、医学签署状态、真实执业兽医姓名/资质/签署日期及可审计记录、Founder公开发布授权、Founder索引授权、首次真实公开日期、最后真实修改日期、证据引用。
2. **Fail-closed**：找不到条目、Slug不匹配、医学Hold、缺签署、缺Founder许可、日期不真实或来源不一致时，不得进入QA可索引白名单；不得用`published`日期、源码存在、CI通过、全站开关或`source_verified_editorial`替代签署。
3. 统一由经验证的索引资格集合驱动`X-Robots-Tag`、HTML robots、sitemap；Preview保持noindex；`new-drugs`保持既定noindex。
4. **可见性与索引分离**：生产页面可访问不代表已获医疗批准或有权索引；需单独确认未经批准内容的公开可见性治理方案，不得把移除sitemap误认为内容已撤回。
5. 首页/猫/狗/问答/关于等5个核心页面的收录资格与QA逐篇签署分别决策，不能借QA审批替代核心页审核。
6. 现有40篇中12篇缺`published`，28篇`published=2026-10-15`未证实；40篇缺`modified`。不得为满足sitemap测试虚构日期或强行使用全站`UPDATED`。
7. 需覆盖：未签署、Hold、伪造签署字段、重复Slug、过期或错误日期、Preview、生产环境、核心栏目、药品栏目、404、sitemap和robots三者一致性、回滚。
8. 完成后先独立Draft PR和CI，再由真实执业兽医审签涉及的医学内容；Founder单独批准生产代码合并、部署和索引策略变更。未经这些批准不得自动上线。

## 目前执行权限
可执行：只读审计、补充测试、证据台账、Draft交接。不可执行：修改生产渲染器、合并main、部署、变更robots/sitemap/noindex、伪造或代签医学批准。

## 验收定义
- 技术验收：CI测试证明逐篇许可驱动全部索引输出且默认拒绝。
- 专业验收：每篇医学签署的真实记录可查。
- 经营验收：Founder针对上线范围、回滚与搜索收录明确授权。
- 线上验收：实际HTTP状态、X-Robots-Tag、HTML robots、sitemap及GSC/百度后台数据核对；不得用CI替代线上实测。
