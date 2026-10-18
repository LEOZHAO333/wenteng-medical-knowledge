# 日宠通｜GEO + SEO 全系统 V1.0（执行母规范）
制定：2026-10-18 · 状态：Draft / noindex / 未获发布批准
归属：JapanMed AI 旗下独立的「日宠通｜日本宠物健康知识站」
路径：`https://www.japanmedai.com/pet/`

## 0. 铁律与已有资产

- 沿用既定架构：**品牌、导航、内容库、Sitemap、统计独立**；JapanMed AI 人类医疗站与日宠通不可混写。
- 不修改 JapanMed AI 首页；不增加销售、在线诊断、处方、购药或跨境转化入口。
- 国内：百家号 + 公众号；海外内容母站：`/pet/`；Facebook仅做分发/社区。知乎专栏继续保持人类医疗内容，不混入宠物线。
- 不建立第二份正文主库：保留 `pet-site/content/` 现有 S/A 级正文与来源核对记录，未来迁移到结构化主库时须保留 **ID、来源链接、审核历史**；本目录是「规则、模式、诊断」而非第二份正文。
- 目前PR #7是独立首页及 index 开关变更；此 PR 不碰 `pet-site/api/pet.js`、首页及 deployment 配置。
- 医学编辑核对 != 真实兽医 Medical Approved；截至既有复核记录，380个节点完成编辑层核对、Medical Approved为0；计数不代表全库规模及可发布数量。
- 当前统一 Draft / noindex。Founder 明确批准之前：**不合并 main、不部署、不解除 noindex、不以审稿状态冒称上线成果。**

## 1. 可交付系统分层

1. **信息结构**：`/pet/` 首页；`/pet/cat/` 猫；`/pet/dog/` 狗；`/pet/qa/{canonicalSlug}/` 独立问题；`/pet/new-drugs/` 新药核验；`/pet/about/` 作者/审稿规则。当前既有 URL 不能因改关键词随意迁移。
2. **搜索词与意图库**：按物种→症状→疾病→检查→居家护理→复诊资料→日本医疗/新药组织；S级（明确问题/急症）、A级（具体方案/复诊）、B级（科普背景）。见 `keyword-clusters.json`。
3. **唯一内容台账**：每一节点唯一 `id`、`canonicalSlug`、`primaryQuery`、`clusterKey`、`relatedIds`、原文来源、医学核对日期和发布状态；无记录不生成公开URL。
4. **证据与审稿**：官方/学协会/手册/医学院一手来源；物种、诊断 vs 症状、已批准 vs 临床研究严格分开；日本产品独立 NVAL 主表。
5. **SEO技术层**：唯一 title / description / H1、www canonical、可读HTML首屏正文、导航/面包屑、OG、适用的 Article / BreadcrumbList / WebSite / Organization schema、移动端可用性。
6. **GEO可引用层**：问句标题→50–100字直答→适用范围→解释与观察→何时就医→就诊准备→出处/核对日期→相关问答，答案明确边界、不伪造来源。
7. **分发**：官网为唯一权威维护版；百家号/公众号可适配表达并指向官网对应专题；不批量生成近似重复页；平台有 canonical 能力才使用，不能假定平台支持。
8. **统计迭代**：Google Search Console / Bing Webmaster Tools（启用后）；站内独立事件与分区报表；品牌搜索词、已收录页面、自然展示/点击、问答阅读路径、来源/证据维护及时率、人工核验AI引用。

## 2. 主库字段（详见 content.schema.json）

必备身份：`id, species, title, canonicalSlug, clusterKey, primaryQuery, searchIntent, contentType, priority`。
必备医学：`directAnswer, applicability, emergencyBoundary, sourceRefs[], sourceCheckedAt, medicalReview`。
必备治理：`relatedIds[], editorialStatus, publicationState, indexEligible, reviewedAt, lastModifiedAt`。
日本新药附加：`drug.productNameJa, genericNameJa, targetSpecies, indicationJa, approvalDate, nvalRecordUrl, insertUrl, officialStatus, lastOfficialVerifiedAt`。
没有资料时填 null / pending / hold，**绝不可补猜**。

## 3. 编辑模板（按内容类型）

### 3.1 健康问题型（原有大量问答）
- H1：猫/狗 + 实际问题，避免机械堆砌「日本」。
- 直答：先回答「能否等、会不会、需不需要」；区分常见情况与红旗信号。
- 主体：为什么→主人记录什么→兽医会评估什么。
- 标注：适用对象 / 何时尽快就医 / 更新日期 / 来源 / 关联问题。
- 禁止以可能表现当作确诊，禁止自拟给药方案。

### 3.2 日本宠物新药型
- 医学科普正文450–500中文字，四段约80/180/150/60字。
- 标题5个，各不超过20汉字，自然包含「日本 + 药物名 + 犬/猫疾病」；确实无法兼容才人工改。
- 3–5个 GEO词自然出现在正文；另列5–8个关键词；配图建议一句；附自检。
- 固定提示：「药物是否适合使用及具体治疗方案，应由专业兽医结合宠物病情综合评估，本文不作展开。」
- 不涉及剂量、禁忌、不良反应、联合用药和自我判断处方；正式批准、新适应症及商品名必须查日本官方产品级记录。未经证实只能表述为「待核实」，不可称已批准。

## 4. 来源优先级与版本管理

- 日本药：MAFF / NVAL 动物用医药品数据库、批准/审查信息、现行电子添付文书；必要时核对持证企业公开资料，不能用企业新闻稿单独证明已批准。
- 犬猫通用：AAHA、FelineVMA/AAFP、WSAVA、ACVIM、IRIS、CAPC、Merck Veterinary Manual、Cornell 等；按具体题目选择相应权威资料。
- 每个来源记录：真实 URL、机构、核对日期、支持的具体断言。无法验证链接时保持待核对，不引用不存在的参考链接。
- `datePublished` 使用真实首发日期，`dateModified` 仅在内容确有实质性更新时更新，禁止全站假统一更新日。
- 变化较快内容（药品批准、监管、指南）设置编辑复核提醒；低变动内容按风险等级抽查，**周期是内部SLA不是搜索排名承诺**。

## 5. 结构化与技术细则

- 每个公开内容页要自引用 canonical 且仅保留一个正式 URL；旧地址有对应内容才 301，无法对应则不做误导跳转。
- 用 `Article` 描述真实文章；有面包屑时用 `BreadcrumbList`；结构化信息与页面文字严格一致。
- `FAQPage` 只能标注页面实际可见问答，**不将 FAQ 富摘要作为预期KPI**（Google 对 FAQ 富结果已长期限制并调整）。
- `sitemap.xml` **只包含可索引且已发布页面**；草稿、未获批准、新药空页及 Preview 不得进入可索引 sitemap。
- Preview 永远 noindex；Production 在 Founder 批准并医学审核完成后，才可针对已发布页面打开 `INDEXABLE`；同时核查 HTML meta robots、HTTP `X-Robots-Tag`、robots.txt 不互相矛盾。
- `llms.txt` 可作为额外导航目录维护，但 **Google 明确不把 llms.txt 作为 AI 搜索排名或收录要求**；不把它当成「已完成GEO」证据。
- 不做伪造外链、虚假引用、关键词堆砌、同义词批量页面、虚构作者资质。

## 6. 业务内链规则

- 每条问答：同专题2–3条、跨专题1条、必要时上级栏目1条；只链接实际存在且审核放行的目标。
- 例如猫耳主题：黑耳垢 → 耳螨鉴别 → 抓耳出血 → 单侧歪头（急症警示）→ 滴耳操作就诊培训；是内容关系，不代表疾病因果链。
- 猫皮肤主题：单点反复舔 → 腹部脱毛 → 小痂 → 跳蚤过敏 → 洗护 → 复发带照片 → 多猫喂食/环境清洁。
- 严格核对 `relatedIds` 唯一且存在；断链不得发布。

## 7. 发布闸门（自动检查 + 人工授权）

`draft_complete` → `source_verified_editorial` → `medical_review_pending` → `medical_review_approved` →（涉及药品则 `official_product_verified`）→ `publish_ready` → Founder上线与索引批准 → Production published。
- P0：疾病诊断/急症边界/药品物种或适应症/法规批准错误、引用伪造、隐私暴露。阻断。
- P1：缺关键来源、关联ID错误、重复slug、未注明审核日期。整改后再复核。
- P2：措辞/视觉/关键词微调。可记录。
- **禁止**自动把编辑审核升级为兽医审核；禁止用CI通过替代真人医学意见。
- 新药栏目空页面：可以作为导航信息，但未完善的药品内容页不得索引。
- 发布前在真正的 Production 地址检验返回码、robots头、canonical、sitemap、JSON-LD、移动端、站内链接；没有通过不得宣布已公开。

## 8. 监测口径和目标

分开记录：全库草稿数、已核对来源数、已通过兽医审稿数、publish_ready数、已公开索引数。不能混用。
每周：重复题/同义意图、HTTP状态、索引覆盖、站内断链、来源时效、热门问题、健康/新药结构化数据质量。
每月：品牌词/非品牌词展示点击、不同专题表现、官网被AI实际引用的**手工可核验样本**、复诊准备内容的用户行为；不凭“答案存在”宣称AI已经引用。

## 9. 与当前主项目的接口

- 现存 `pet-site/api/pet.js` 暂不修改；PR #7 所涉及首页与索引开关由原 PR 独立审查。
- 既有 `pet-site/content/MEDICAL-REVIEW-QUEUE-2026-10-17.md` 是医学队列现况。
- `pet-site/content/JAPAN-PET-DRUG-OFFICIAL-VERIFICATION-MASTER.md` 是官方核验主表。
- `pet-site/content/SEO-SLUG-INTERNAL-LINK-AUDIT-BATCH-*.md` 是旧批次结构审计依据。
- 新 `content.schema.json` 与 `audit.mjs` 用于新/导入结构化元数据的验证，不会宣称已自动读取或审完现有Markdown全量。
