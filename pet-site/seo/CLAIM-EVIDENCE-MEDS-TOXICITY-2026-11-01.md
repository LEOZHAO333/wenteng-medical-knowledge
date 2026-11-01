# 日宠通 SOP V1.5｜处方药、毒性、监管8题逐主张证据与编辑注记隔离（2026-11-01）

**性质**：在既有582/582编辑来源覆盖之上的风险优先定向复核，**不是新建来源覆盖批次**。仅Draft PR #39；不改变原ID/Slug、医学结论、产品批准、生产索引/robots/sitemap。下列8题均为 `Hold / pending_licensed_veterinarian`，`Medical Approved=0`，`releaseAuthorized=false`。未取得真实执业兽医签署。

**隔离原因**：原 `pet-site/content/S-TIER-MEDS-LABS.md` 的这8个文章区块混有“编辑级证据/医学审核pending/Hold”等内部审计语句；为避免后续模板误将内部审核文字当作可公开正文，原句逐字转存此交接文件，正文仅删除对应内部审计行，不改变医疗建议。原Git历史保留。

**核验方法与边界**：2026-11-01公开可访问的原始Cornell、Merck、FDA、VCA、AAHA、MAFF/NVAL页面逐项核对；“可访问”与“支持具体主张”分开判断。没有核实任何日本具体产品批准，也没有全面逐句复核全部582条。

## 0641｜cat-foaming-after-medication

- **本轮编辑判断**：Cornell 仅直接支持给药后部分猫会流涎；Merck列举药物、口腔刺激、紧张等鉴别。**“苦味直接导致泡沫”“是否过敏”“是否已吸收”“具体急诊阈值”均非两页直接逐句支持**，保持 Hold。兽医需核对急诊分流、药物剂型与物种风险。
- **原始来源**：<https://www.vet.cornell.edu/hospitals/pharmacy/consumer-clinical-care-guidelines-animals/giving-your-cat-oral-medications>；<https://www.merckvetmanual.com/multimedia/table/causes-of-excessive-salivation-in-cats>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级依据：Cornell University College of Veterinary Medicine—Giving Your Cat Oral Medications（https://www.vet.cornell.edu/hospitals/pharmacy/consumer-clinical-care-guidelines-animals/giving-your-cat-oral-medications）支持猫给药后可能流涎；Merck Veterinary Manual—Causes of Excessive Salivation in Cats（https://www.merckvetmanual.com/multimedia/table/causes-of-excessive-salivation-in-cats）支持给药、药物或毒物、口腔刺激等不同原因。以上资料不能单独证明具体药物的过敏诊断、补服规则或全部急诊阈值；此类判断须由执业兽医审核。医学终审：pending；Hold，不发布。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0643｜cat-crush-medication-food

- **本轮编辑判断**：美国FDA消费者建议直接支持未获兽医指示不得剪切/碾碎药片胶囊；Merck仅支持剂型改变可影响药动学的原理。**具体药物能否碾碎及混食、漏服补服规则未获产品级核验**，保持 Hold。
- **原始来源**：<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>；<https://www.merckvetmanual.com/pharmacology/pharmacology-introduction/routes-of-administration-and-dosage-forms-of-drugs>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级逐主张依据：美国FDA—Veterinary Medication Errors（https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors）在面向饲主的用药错误预防建议中直接要求：未经兽医指示，不应剪切、碾碎或拆开药片与胶囊；Merck Veterinary Manual—Routes of Administration and Dosage Forms of Drugs（https://www.merckvetmanual.com/pharmacology/pharmacology-introduction/routes-of-administration-and-dosage-forms-of-drugs，页面标示2026年7月更新）支持剂型会影响释放、吸收与安全性的一般药剂学原理，但不提供每种药物的碾碎许可。具体产品、剂型与补服判断仍待执业兽医核对。医学终审：pending；Hold，不发布。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0648｜dog-vomits-after-medication-redose

- **本轮编辑判断**：美国FDA直接支持“吐药/呕吐后怎么办”应咨询兽医；VCA Sarolaner是**犬用具体药物**，其重给时间不能外推至其他犬用药，更不能用于猫。正文未给重给时间，保持 Hold；需兽医核对药物与病情。
- **原始来源**：<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>；<https://vcahospitals.com/know-your-pet/sarolaner>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级逐主张依据：美国FDA—Veterinary Medication Errors（https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors）明确把“宠物吐出或呕吐药物后怎么办”列为应向开药兽医询问的用药安全问题；VCA Animal Hospitals—Sarolaner（https://vcahospitals.com/foster/know-your-pet/sarolaner）仅是特定犬用药物示例，不能推导所有药物的补服时机或剂量。呕吐严重程度、是否吸收及具体补服决定仍待兽医审核。医学审核：pending；Hold，不发布。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0649｜pet-missed-dose-no-double

- **本轮编辑判断**：FDA直接支持漏服应询问兽医；VCA Insulin提供**胰岛素特定**漏服/禁止双倍剂量信息。不能外推抗癫痫药、心脏药或所有物种的漏服补救时间；保持 Hold。
- **原始来源**：<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>；<https://vcahospitals.com/know-your-pet/insulin>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级逐主张依据：美国FDA—Veterinary Medication Errors（https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors）将“漏服后怎么办”列为应向兽医确认的问题；VCA Animal Hospitals—Insulin（https://vcahospitals.com/know-your-pet/insulin）明确针对犬猫等动物提醒漏用胰岛素应联系兽医，且不应一次给双倍。旧引文实际是**犬糖尿病胰岛素治疗专页**，不应标作犬猫通用资料。以上不能替代不同抗癫痫药或其他处方药的具体漏服规则；逐产品处置仍待兽医审核。医学审核：pending；Hold，不发布。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0650｜pet-share-leftover-medication

- **本轮编辑判断**：FDA明确写明未经兽医确认不得将一只动物的药分享给另一只；Merck犬猫急症资料支持呼吸困难、倒地/意识异常等急症转诊。**并不证明所有药品的跨物种毒性程度或个体诊断**，保持 Hold。
- **原始来源**：<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>；<https://www.merckvetmanual.com/special-pet-topics/emergencies/evaluation-and-initial-treatment-of-dog-and-cat-emergencies>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级证据：美国FDA—Veterinary Medication Errors（https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors）；Merck Veterinary Manual—Evaluation and Initial Treatment of Dog and Cat Emergencies（https://www.merckvetmanual.com/special-pet-topics/emergencies/evaluation-and-initial-treatment-of-dog-and-cat-emergencies）。医学终审：pending。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0651｜human-painkillers-dogs-cats

- **本轮编辑判断**：Merck 2025-05更新的人用镇痛药毒理原文支持犬猫布洛芬、对乙酰氨基酚等中毒风险，猫对乙酰氨基酚尤为敏感；FDA建议给犬猫NSAID前咨询兽医。**对乙酰氨基酚不是NSAID**，不得混称；犬在兽医指导下可能有不同用法，正文仅禁止饲主自行给药。保持 Hold，不提供中毒剂量/家庭解毒操作。
- **原始来源**：<https://www.merckvetmanual.com/toxicology/toxicoses-from-human-analgesics/toxicoses-from-human-analgesics-in-animals>；<https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-about-pain-relievers-pets>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级证据：Merck Veterinary Manual—Toxicoses From Human Analgesics in Animals（https://www.merckvetmanual.com/toxicology/toxicoses-from-human-analgesics/toxicoses-from-human-analgesics-in-animals）支持人用镇痛药犬猫中毒风险；美国FDA—Get the Facts about Pain Relievers for Pets（https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-about-pain-relievers-pets）支持先咨询兽医的安全建议。FDA批准状态仅限美国，不代表日本MAFF/NVAL产品批准。医学终审：pending；Hold，不发布。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0652｜pet-antibiotic-stop-early

- **本轮编辑判断**：AAHA/AAFP 2022指南直接支持兽医监督、治疗期间重新评估必要性、疗程依具体临床证据；**不能从指南推出所有感染都必须完成固定天数疗程**。正文避免绝对化，保持 Hold。
- **原始来源**：<https://www.aaha.org/resources/2022-aafpaaha-antimicrobial-stewardship-guidelines/how-to-practice-antimicrobial-stewardship/>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级证据：2022 AAFP/AAHA Antimicrobial Stewardship Guidelines（https://www.aaha.org/resources/2022-aafpaaha-antimicrobial-stewardship-guidelines/how-to-practice-antimicrobial-stewardship/）。医学终审：pending。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 0659｜japan-china-pet-medicine-active-ingredient

- **本轮编辑判断**：MAFF/NVAL官方入口可用于检索日本动物用药批准记录，且官方提示数据库更新可能滞后；**入口存在不等于任何具体药品已获批准**。本次产品级核验数=0。FDA仅为美国用药错误通则，不证明日本批准。保持 Hold。
- **原始来源**：<https://www.maff.go.jp/nval/iyakutou/>；<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级参考：日本农林水产省 动物医药品检査所（https://www.maff.go.jp/nval/）；美国FDA—Veterinary Medication Errors（https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors）。医学审核：pending。

- **专业签署状态**：Hold / pending_licensed_veterinarian；医学批准=否；公开/索引授权=否。

## 真实执业兽医交接（逐题签署，不得批量默认PASS）

逐ID记录执业姓名、执照编号与辖区、审核日期、审查的Git SHA、ID/Slug、每个主张 `supported / needs_revision / insufficient_evidence / not_applicable`、具体来源段落、物种/剂型/适应症/急症边界、是否需正文修订、签名或可追溯签署凭据。重点请审核0641泡沫/过敏与急症分流、0648/0649补服风险、0651人用镇痛药物种毒性、0652抗菌药疗程和0659日本批准归因。

## SEO与发布阻断

本次未修改 `pet-site/api/pet.js`、Article日期、相关问答、canonical、robots、noindex、sitemap、生产45 URL候选白名单；582个S/A草稿与40个生产问答仍是不同集合。来源核对/机器CI不等于执业兽医签署；本轮没有搜索引擎实际收录核验。产品级MAFF/NVAL批准核验数=0。

## 2026-11-01 生产SEO源代码快照（仅静态，非线上收录）

- 本Draft最新CI的 `audit-production-index-gap.mjs` 从当前合并基线报告 **188条生产渲染问答**，不再是旧40条；PR #52（2026-10-31已合并）说明由90条增至188条，计划白名单为 **188篇问答+5个核心页=193个候选URL**。这是源码与PR证据，**不是已上线HTTP验收或搜索引擎实际收录**。
- 同一CI报告 `missingPublished=12`、`missingModified=188`、`unverifiedPublishedDate=176`，不得自动补造发布日期/修改日期；`productionPerArticleGateIntegrated=false`，生产索引仍依Slug白名单，不读取本Draft的兽医Hold/Founder逐篇授权。
- 主分支 `pet-site/api/pet.js` 中188条均带 `reviewLabel="本文经日本宠物医生审核"` 与 `reviewedAt`；其审核来源在已合并PR #43/#44/#45/#52记为Founder对实际日本宠物医生审核的确认。**本次只读检查没有独立读取签署原件/执业证照，也不能据此否定Founder确认**；应将这些已公开批次与本次仍Hold的582个S/A私有草稿分开管理。不能用这188个页面的标签反向给582条草稿赋予Medical Approved。
- `related`链接仍为渲染器自动按物种/主题生成，不能由代码通过推断每一条医学语义关联已逐项复核。PR #38逐篇索引闸门仍为隔离Draft，不应误报已部署。

相关仓库PR：https://github.com/LEOZHAO333/wenteng-medical-knowledge/pull/52 、https://github.com/LEOZHAO333/wenteng-medical-knowledge/pull/38 。
