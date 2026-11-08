# 日宠通｜首批10篇问答逐题证据与安全核对｜Claude-2交接（2026-10-29）

> 本文件为**编辑级、风险优先**检查，不是合资格执业兽医 Medical Approved。仅针对PR #41已有10篇原位扩写稿，**不新建问答、不创建第二套ID/Slug、不发布、不扩大索引**。PR #41堆叠在Draft PR #40上；本文件不能替代兽医逐篇签审与Founder发布授权。

## 一、送审部分（GPT）
- 审核角色：**Claude-2（医学内容复核）**；需要时交真实执业兽医签审。技术侧内部字段泄漏属于 **Claude-3** 范围。
- 对象：`LEOZHAO333/wenteng-medical-knowledge`，分支 `pet/batch29-20261029-heart-endocrine-15`；原ID **0418、0420、0421、0422、0423、0424、0425、0427、0428、0432**。
- 边界：仅编辑级校正文案与证据关联；`medical_review=pending/Hold`、`publishReady=false`（未授权）、`Medical Approved=0`。不改生产`pet.js`、robots、sitemap、域名或发布逻辑；不将海外AAHA、ACVIM或Tufts证据视为日本MAFF/NVAL单品批准。
- 复核方法：逐题检查**直接回答→四段正文→危险信号→免责声明→来源可及性与适用性**；沿用原Slug、来源台账唯一映射；保留临床有争议处为待兽医确认。

## 二、首批10题逐题交接

| ID | S/A | 重点医学断言及对应原始资料 | 编辑结论 / 审核关注 |
|---|---|---|---|
| 0418 | S | 突然倒地、意识丧失属于急诊快速分诊事项；Merck 2026更新的 Initial Triage https://www.merckvetmanual.com/emergency-medicine-and-critical-care/evaluation-and-initial-treatment-of-small-animal-emergency-patients/initial-triage-and-resuscitation-of-small-animal-emergency-patients | **P1已修**：由“当天联系”收紧到立即联系兽医或急诊分诊，危险征象直接急诊；仍待兽医核对失神与癫痫鉴别及分诊时效 |
| 0420 | A | 心脏病补充品并非处方药替代品，鱼油只在特定心衰犬情形可能被考虑；Tufts HeartSmart https://vet.tufts.edu/foster-hospital-small-animals/specialty-services/cardiology/heartsmart/heart-disease-nutrition ；ACVIM 2019 MMVD Stage C https://academic.oup.com/jvim/article/33/3/1127/8448111 | **P2已修**：原泛化营养主页替换为精确章节；不得推断所有心脏病犬需补充Omega-3或作日本产品推荐 |
| 0421 | A | 长毛猫判断体况结合触诊、腰线及BCS；WSAVA猫9分图 https://wsava.org/wp-content/uploads/2020/01/Cat-Body-Condition-Scoring-2017.pdf | **P2已修**：改为精确图表；由兽医结合肌肉评分判断，腹部突增排除急症 |
| 0422 | A | 每日食物称量、全家零食计量、减重不得突然大幅限食；WSAVA https://wsava.org/Global-Guidelines/Global-Nutrition-Guidelines/ | 条文安全方向一致；**P2待办**：请补核针对猫减重速率与脂肪肝风险的更精确资料，避免通用指南代替所有临床断言 |
| 0423 | S | 多食、消瘦、异常兴奋与老猫甲亢的关联，T4与鉴别检查；Cornell https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/hyperthyroidism-cats ；AAHA 2023 https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/diagnostic-testing-and-monitoring-4/ | 编辑关联合理；仍须复核个别合并症鉴别与“首轮T4阴性”边界 |
| 0424 | S | 单次医院高血糖不等于糖尿病，需证明持续性异常，果糖胺也有局限；AAHA 2026 Section 3 https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-3-diagnosing-dm-in-cats/ | 核对通过（编辑级）；不能把单次果糖胺正常作为排除糖尿病依据 |
| 0425 | S | 猫糖尿病首周出院教育、低血糖警示、SGLT2与酮症酸中毒风险；AAHA 2026 Section 11 https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-11-client-education/ | 核对关键风险相符；**P1兽医复核**：海外SGLT2药物风险仅作科学资讯，不得暗示日本可用药；病猫拒食须及时评估 |
| 0427 | S | 发抖、步态不稳、虚弱需怀疑低血糖并联系急诊；AAHA 2026 Section 11及FAQ https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/2026-aaha-diabetes-management-guidelines-faqs-cats/ | **P1已修**：糖源仅限既获兽医指导的棉签颊侧涂抹，禁强行灌液/伸手入口/延误送医；**兽医重点**核对意识变化时家庭措施与直接急诊优先级 |
| 0428 | A | 家庭监测的主人培训、设备误差与CGM选择；AAHA 2026 Sections 11/13 https://www.aaha.org/resources/2026-aaha-diabetes-management-guidelines-for-cats/section-13-glucose-monitoring/ | 编辑关联合理；确认设备不能代替就诊，不因测量失败自行调胰岛素 |
| 0432 | A | 肥胖、关节痛、心肺和甲减需鉴别，低T4单独不能确诊；AAHA 2023 https://www.aaha.org/resources/2023-aaha-selected-endocrinopathies-of-dogs-and-cats-guidelines/ ；WSAVA https://wsava.org/Global-Guidelines/Global-Nutrition-Guidelines/ | 编辑关联合理；复核心肺急症提醒，避免所有活动下降归因肥胖 |

## 三、Claude既有P2治理意见（跨批次）

2026-10-28 Claude在 PR #40 提出：`GEO关键词`、`编辑状态`、`Medical Approved` 等**内部字段不能出现在对外正文**。本批当前仍是私有工作流中的Markdown草稿、未由生产`pet.js`逐篇渲染；但**字段确实与正文写在同一Markdown条目中**，故此项标记为 **P2 OPEN**，不是已经修好。后续接入任何生产渲染器前，须将内部字段转为frontmatter/独立证据文件或有可测的过滤器，并在预览HTML逐篇检查零泄漏。此处不得为修P2而直接修改生产renderer/索引规则。

## 四、质量与交付边界
- 内容数量：**10/10现有正文已读取**；本次是安全和来源精度修订，**不等于10/10兽医医学批准**。
- 本次正文实际小修：**0418、0420、0421、0427**；其余6篇原位保留。标题、ID、Slug保持不变。
- 未解除：医学Hold、Founder公开发布批准闸门；PR #40、#41保持Draft/open，禁止自动merge/部署。
- 静态CI：以本批新增提交后的实际GitHub Actions结果为准，**不得沿用旧HEAD的通过结果**。
- P0：本轮未确认新的证据级P0；P1：0418/0427安全措辞已编辑修补但待兽医审签，0425的SGLT2辖区及用药边界待核；P2：0422资料颗粒度、内部字段隔离待办。

## 五、审核回填（Claude填写）
- Claude-2结论：**未审核**（PASS / 修改建议 / BLOCK）
- 主要意见：待填写
- 重要风险发现：**待填写**（有/无＋一句简短描述）
- 真实执业兽医：**未签署**
- Founder批准发布：**无**
