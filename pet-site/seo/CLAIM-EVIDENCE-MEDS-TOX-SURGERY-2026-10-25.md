# 日宠通 SOP V1.5｜处方药、毒性与术后护理专项质控（2026-10-25）

范围：既有S/A私有草稿 0641、0648、0651、0635、0655；不新建来源覆盖批次。性质：逐主张编辑证据适配与兽医交接，**不是执业兽医 Medical Approved**。既有582/582编辑来源台账不变。

## P1｜0641 猫喂药后流涎/吐泡沫：已修复跨物种错配

- 原正文：`pet-site/content/S-TIER-MEDS-LABS.md`，Slug `cat-foaming-after-medication`。
- 发现：原“编辑级参考”使用 VCA Sarolaner（犬用口服产品的补服时间规则），**不能作为猫给药后流涎的直接证据**。链接虽可访问，但属于**物种/药物/主张不匹配**，不是断链。
- 本轮修复：移除该题犬用Sarolaner引用，替换为康奈尔兽医学院“Giving Your Cat Oral Medications”和Merck“Causes of Excessive Salivation in Cats”；同步将“过敏通常另有症状”改成“不凭泡沫诊断或排除严重问题”。保留旧来源台账，追加编辑修订历史与机器非回归门禁。
- 证据支持范围：Cornell明确猫给药后可能流涎；Merck列出药物/毒物、口腔刺激、给药、应激等可能原因。**不能**凭这些来源确认某一药物是否过敏、是否补服、具体急诊分级。
- 来源（2026-10-25可访问）：https://www.vet.cornell.edu/hospitals/pharmacy/consumer-clinical-care-guidelines-animals/giving-your-cat-oral-medications ; https://www.merckvetmanual.com/multimedia/table/causes-of-excessive-salivation-in-cats
- 兽医交接：猫流涎的鉴别诊断、严重过敏/毒性识别、喂药后剂量不确定的处理边界。状态：**Hold / pending_licensed_veterinarian**。

## P1｜0648 狗服药后呕吐：药物特例不可外推

- 原正文：`pet-site/content/S-TIER-MEDS-LABS.md`，Slug `dog-vomits-after-medication-redose`。
- 证据：VCA Sarolaner仅提供**特定犬用药**的补服规则，不能为所有犬用药制定统一补服时间。当前正文已明确不可机械套用，本轮不作无证据医学改写。
- 来源（2026-10-25可访问）：https://vcahospitals.com/foster/know-your-pet/sarolaner
- 兽医交接：按具体药物、制剂、呕吐时机、吸收风险核对；不提供通用补服时间或剂量。状态：**Hold**。

## P0｜0651 人用止痛药与犬猫中毒：核心风险有直接证据

- 原正文：`pet-site/content/S-TIER-MEDS-LABS.md`，Slug `human-painkillers-dogs-cats`。
- Merck 2025年5月更新的兽医毒理章节直接支持犬猫人用镇痛药中毒风险，尤其猫对乙酰氨基酚的敏感性；FDA也明确警告不能把人用NSAID按人类经验用于犬猫。
- 来源（2026-10-25可访问）：https://www.merckvetmanual.com/toxicology/toxicoses-from-human-analgesics/toxicoses-from-human-analgesics-in-animals ; https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-about-pain-relievers-pets
- 边界：FDA产品批准表是**美国**监管状态，不可转述成日本MAFF/NVAL批准。现稿没有剂量或家庭解毒指令；兽医仍需核对误食时的急诊措辞及药物个体差异。状态：**Hold**。
- **2026-10-26逐主张复核及修复**：Merck毒理章节直接支持犬猫人用镇痛药中毒风险（该页标示2025年5月更新），但原文“Merck明确提醒必须先咨询兽医”的特定归因不够精确；已将该行为建议明确归于FDA原始安全说明。两页当日可访问。保留原ID 0651与Slug，不扩展剂量、解毒建议或日本批准断言。

## P1｜0635 术后便秘：不自行使用人用灌肠/泻药

- 原正文：`pet-site/content/A-TIER-BATCH-10-SURGERY-DISCHARGE.md`，Slug `pet-postoperative-constipation-information`。
- 编辑边界：保留“记录进食、饮水、排便、用药，伴明显腹部不适或呕吐及时联系手术医院”；不得将术后排便减少直接诊断为便秘，也不推荐主人自行使用人用泻药或灌肠。
- **证据缺口**：现有通用术后/胃肠来源不足以逐项支持所有术式、药物及犬猫差异，须补适合的兽医临床指南和实际手术医院出院指示。
- 兽医交接：犬猫差异、尿闭/梗阻与便秘鉴别、术后无便何时需要急诊。状态：**Hold**。

## P1｜0655 网上核对宠物药：监管框架与单品批准分开

- 原正文：`pet-site/content/A-TIER-BATCH-11-MEDS-LABS.md`，Slug `online-pet-medicine-checklist`。
- 正文只讲核对产品、成分、适用物种、规格、处方要求，**没有点名某一日本已批准产品**；本次不虚构商品核验结果。
- 日本NVAL官方不良反应页面于2026-10-26复核仍显示**2026-11-01系统迁移并需重新注册**；该页面另提供动物用药数据库入口，属于监管流程与查询入口信息，**不是任何单一药品的批准凭证**。未在本轮核验具体产品。
- 来源：https://www.maff.go.jp/nval/iyakutou/fukusayo/sousa/index.html
- 兽医/药事交接：若今后新增具体产品，必须逐项查NVAL产品数据库与现行电子添文，确认商品名、物种、适应证、规格、批准与规制区分；美国FDA或卖家网页不能替代日本批准。
- 既有4篇身份不全的日本药品盘点仍 `product_identity_missing` + Hold。

## SEO与发布资格审计

- 0641正文原ID与Slug未改；其他四题原ID/Slug未改；本轮**未新增**Article页面、相关问答、URL或sitemap条目。
- 生产 `pet-site/api/pet.js`：`INDEX_ELIGIBLE_PATHS`对白名单QA依据slug与`articles`集合匹配，**未逐篇读取**`medicalReview`或`indexEligible`签署元数据。草稿 `release-policy.mjs`、`sitemap-policy.mjs`有独立资格函数，但不代表生产已接入。
- 生产Article/FAQPage元数据、related问答和45 URL候选白名单与582条私有S/A草稿是不同集合。机器校验与成功CI不代表医学通过、索引授权或实际搜索引擎收录。
- **治理阻断**：生产资格机制差异需要独立授权的上线设计；本轮仅记录，不修改`pet-site/api/pet.js`、robots、noindex、sitemap或生产代码。

## 真实执业兽医交接字段

对每条填写：执业兽医姓名、资质/辖区、审核日期、逐句来源支持与不支持的文本、犬猫适用性、诊断/急诊边界、药物具体适应证、修改建议、批准或拒绝结论、可追溯签署证据。未填写前：`medicalReview.status=pending`、Hold、不得公开。

## 本轮交付

仅在现有Draft PR #35分支修正0641原正文、补机器可读修订记录并增加本专项审计；历史来源批次保持原样。**没有新兽医签署、没有单品MAFF/NVAL批准核验、没有修改生产配置。**
