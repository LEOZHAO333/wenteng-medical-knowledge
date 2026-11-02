# 日宠通 SOP V1.5｜0653、0654、0663：用药与血常规逐主张证据核验（2026-11-02）

**范围**：沿用既有582/582编辑来源覆盖，不建立新的覆盖批次。仅修改私有草稿 `pet-site/content/S-TIER-MEDS-LABS.md`，原ID、Slug与Git历史保留。三个条目均为 `Hold / pending_licensed_veterinarian`；`Medical Approved=0`，`releaseAuthorized=false`，`indexAuthorized=false`。本次为编辑级核对，不是执业兽医签署、产品批准或实际搜索引擎收录核验。

## 0653｜pet-steroid-increased-thirst｜糖皮质激素与饮水变化（P1）

- **原正文风险**：“不要突然停激素”易被读作任何剂型、任何疗程都需减量；原编辑来源 `https://www.merckvetmanual.com/pharmacology/anti-inflammatory-agents/glucocorticoids` 本次网页读取不可访问，**不能仅据单次失败判定永久断链**。
- **编辑修复**：改为“不要未经开药兽医指导自行停药或调整；部分长期糖皮质激素治疗需要逐步调整”，明确依具体药物、剂量、疗程及个体情况决定。未添加给药剂量或停药时间表。
- **主张A（饮水/排尿增加是糖皮质激素可能的不良反应）**：`supported`，Merck *Hormonal Treatment for Integumentary Disease in Animals* 的 Glucocorticoids 部分列有 polyuria/polydipsia，并指出剂量、疗程及个体差异；页面标示 Last updated Jun 2026。<https://www.merckvetmanual.com/pharmacology/systemic-pharmacotherapeutics-of-the-integumentary-system/hormonal-treatment-for-integumentary-disease-in-animals>
- **主张B（长期用药骤停风险、部分方案需减量）**：`supported_with_scope`，同一Merck章节在长期治疗背景下说明逐步减量及低肾上腺皮质功能风险；**不支持**所有短期/局部/单次激素均需同一减量流程。
- **Hold / 待兽医**：犬猫、口服/注射/局部、原疾病、糖尿病/感染风险、饮水增加伴随急症症状的具体分流，需逐产品和病情签核。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级参考：Merck Veterinary Manual—Glucocorticoids（https://www.merckvetmanual.com/pharmacology/anti-inflammatory-agents/glucocorticoids）。医学审核：pending。

## 0654｜pet-multiple-vets-medication-list｜多医院处方药单（P1）

- **原证据错配**：原AAHA/AAFP Pain Management Guidelines实际上是AAHA 2022犬猫疼痛管理指南，主要涵盖镇痛药，不足以单独支撑“所有处方、非处方药、保健品都应跨医院共享”的完整药单主张；标题中的“AAHA/AAFP”也与原网页不符。
- **主张A（药单应含处方药、OTC及补充剂，新兽医应知晓）**：`supported`，美国FDA *Veterinary Medication Errors* 的消费者建议直接要求携带完整用药清单、向兽医报告，并询问相互作用。<https://www.fda.gov/animal-veterinary/product-safety-information/veterinary-medication-errors>
- **主张B（相似商品名、处方抄写/标签可导致错误）**：`supported`，同一FDA页面有真实的药名混淆案例和药品标签风险，但**不能**从这些案例推断特定日本产品批准或两种具体药必然相互作用。
- **编辑处理**：正文安全建议已有明确边界，未增写具体药物相互作用；将错配来源和审核状态从正文移至本交接资料。将FDA作为直接支持，AAHA仅作为特定疼痛管理的背景，不能替代药单规范来源。
- **Hold / 待兽医**：核对犬猫药物类别、外用药、驱虫药、保健品相互作用、用药频率及特殊疾病；具体相互作用逐药审核。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级参考：AAHA/AAFP Pain Management Guidelines（https://www.aaha.org/resources/2022-aaha-pain-management-guidelines-for-dogs-and-cats/）；具体相互作用需逐产品核对，医学审核：pending。

## 0663｜dog-high-white-blood-cells-antibiotics｜犬白细胞升高与抗菌药（P1）

- **原证据适配不足**：AAHA/AAFP 2022抗菌药管理指南直接支持“需有适当细菌感染指征才考虑抗菌药”，但**不直接解释**糖皮质激素/应激造成的犬白细胞分类变化；原文只给出AAHA来源，属于两种不同医学主张被同一来源概括。
- **主张A（应激/糖皮质激素可影响白细胞，不能仅凭总WBC判断感染）**：`supported`，Merck *Leukogram Abnormalities in Animals*（Full Review Aug 2026、Last updated Aug 2026）解释犬应激/皮质激素反应的成熟中性粒细胞增多等特征；提示需要绝对分类计数、血涂片与临床背景。<https://www.merckvetmanual.com/circulatory-system/leukocyte-disorders/leukogram-abnormalities-in-animals>
- **主张B（抗菌药需符合临床指征，避免经验性滥用）**：`supported`，AAHA/AAFP 2022 *Therapeutic antimicrobial use in the clinical setting* 明确要求尽可能建立适当诊断、排除非细菌病因。<https://www.aaha.org/resources/2022-aafpaaha-antimicrobial-stewardship-guidelines/therapeutic-antimicrobial-use-in-the-clinical-setting/>
- **编辑修复**：将“分类计数”明确为“白细胞分类的绝对计数、血涂片”，保留不据单项WBC开药的安全边界，不给抗菌药名称/剂量/疗程。
- **Hold / 待兽医**：具体血常规异常幅度、左移/毒性变化、发热及败血症高危表现、是否应立即就诊等均须结合个体签核；不能由本资料远程排除感染。
- **从正文原样迁出的内部注记（留档，不可直接发布）**：

> 编辑级证据：AAFP/AAHA — Therapeutic antimicrobial use in the clinical setting（https://www.aaha.org/resources/2022-aafpaaha-antimicrobial-stewardship-guidelines/therapeutic-antimicrobial-use-in-the-clinical-setting/）。医学终审：pending。

## 真实执业兽医逐ID交接

请记录：执业姓名、执照及辖区、签署日期、所审Git SHA、ID/Slug、各主张 `supported / insufficient_evidence / needs_revision / not_applicable`、具体来源章节、物种/剂型/急症边界、修改建议和可追溯签署凭据。任何一项未获真实签署不得移除Hold；本次来源核验只降低编辑错误风险。

## SEO/发布边界

本次没有修改生产 `pet-site/api/pet.js`、Article日期、相关问答、sitemap、robots、noindex或域名。582条S/A草稿不等于188条生产渲染问答；独立PR #38的逐篇索引门槛仍未接入生产。原PR #8已合并，当前医学质控仅在Draft PR #39。日本MAFF/NVAL产品级批准本次新增核验数=0；无搜索引擎实际收录验证。
