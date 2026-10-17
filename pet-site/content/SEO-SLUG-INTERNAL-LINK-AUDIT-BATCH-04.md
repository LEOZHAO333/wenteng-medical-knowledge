# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 04

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批覆盖医学复核 Batch 04 的40个节点：
- 糖尿病 / 内分泌 / 体重：10
- 关节 / 疼痛 / 行动：10
- 感染与检测：10
- 影像 / 病理 / 第二意见资料：10

本文件只声明 Batch 04 范围内的结构结果；全库最终发布前仍需再跑机器级全局唯一性校验。

## 二、唯一性结果

- Batch 04 ID：40个，40/40唯一
- Batch 04 canonicalSlug：40个，40/40唯一
- 本批S/A正文相同ID重复占位：0
- 本批需要改slug：0
- 与Batch 01–03已建立clusterKey命名无冲突
- 与此前MVP 12节点审计记录未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 04范围）**。

## 三、Cluster Key

本批新增/继续使用：

- `endocrinology`
- `diabetes-management`
- `weight-management`
- `musculoskeletal-pain`
- `rehabilitation`
- `orthopedic-emergency`
- `feline-infectious-disease`
- `infectious-disease`
- `infection-control`
- `diagnostic-imaging`
- `pathology`
- `second-opinion-records`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

正文不硬编码相关文章URL。

## 四、Batch 04 内链表

### A. 糖尿病 / 内分泌 / 体重

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0423 | `cat-eats-more-loses-weight` | endocrinology | 0424, 0425, 0437, 0586 |
| 0424 | `cat-stress-hyperglycemia-recheck` | diabetes-management | 0425, 0427, 0428, 0666 |
| 0425 | `cat-diabetes-first-week-home` | diabetes-management | 0424, 0427, 0428, 0436 |
| 0427 | `diabetic-cat-shaking-weak-hypoglycemia` | diabetes-management | 0425, 0428, 0684, 0461 |
| 0428 | `cat-home-glucose-monitoring-training` | diabetes-management | 0424, 0425, 0427, 0676 |
| 0432 | `dog-obesity-low-activity-causes` | weight-management | 0439, 0452, 0395, 0589 |
| 0436 | `diabetic-dog-insulin-travel-caregiver-plan` | diabetes-management | 0425, 0427, 0649, 0784 |
| 0437 | `dog-hypothyroidism-one-blood-test` | endocrinology | 0432, 0661, 0667, 0676 |
| 0438 | `dog-steroid-increased-appetite-weight-gain` | endocrinology | 0432, 0439, 0653, 0654 |
| 0439 | `pet-weight-loss-body-condition-not-scale-only` | weight-management | 0421, 0422, 0432, 0879 |

**内链边界：**
- 0427先显示急诊行动，不先展示“相关推荐”；
- 糖尿病页不得通过related link暗示固定胰岛素剂量或自行补针；
- 0437不以“低T4=甲减”做锚文本；
- 0439不把快速减重包装成目标。

### B. 关节 / 疼痛 / 行动

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0441 | `cat-stops-jumping-pain` | musculoskeletal-pain | 0442, 0446, 0448, 0584 |
| 0442 | `cat-hesitant-stairs-home-modifications` | musculoskeletal-pain | 0441, 0445, 0446, 0587 |
| 0443 | `cat-limping-no-crying` | musculoskeletal-pain | 0441, 0446, 0447, 0457 |
| 0444 | `folded-ear-cat-slow-mobility-observation` | musculoskeletal-pain | 0441, 0443, 0446, 0448 |
| 0445 | `senior-cat-low-entry-litter-box` | musculoskeletal-pain | 0441, 0442, 0587, 0599 |
| 0446 | `cat-arthritis-treatment-response-log` | musculoskeletal-pain | 0441, 0442, 0443, 0983 |
| 0448 | `cat-angry-when-picked-up-pain` | musculoskeletal-pain | 0441, 0443, 0446, 0584 |
| 0450 | `cat-rehab-exercises-professional-guidance` | rehabilitation | 0446, 0911, 0917, 0916 |
| 0452 | `dog-morning-stiffness-joints` | musculoskeletal-pain | 0432, 0454, 0458, 0917 |
| 0457 | `dog-sudden-hindlimb-weakness` | orthopedic-emergency | 0467, 0452, 0400, 0684 |

**内链边界：**
- 疼痛页不直接推荐具体止痛药；
- 0444只解释遗传风险和观察点，不把品种特征写成必然严重疾病；
- 0450的康复动作链接只去“专业指导/记录/环境改造”，不去自学高强度训练；
- 0457急诊提示优先于相关文章。

### C. 感染与检测

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0821 | `cat-sneeze-feline-upper-respiratory-diagnosis` | feline-infectious-disease | 0384, 0822, 0825, 0839 |
| 0824 | `feline-coronavirus-positive-not-fip` | feline-infectious-disease | 0825, 0826, 0839, 0674 |
| 0825 | `fip-diagnosis-multiple-evidence` | feline-infectious-disease | 0824, 0826, 0674, 0677 |
| 0826 | `fip-treatment-monitoring-not-single-lab-value` | feline-infectious-disease | 0824, 0825, 0676, 0996 |
| 0827 | `feline-leukemia-positive-confirmation` | feline-infectious-disease | 0832, 0839, 0521, 0674 |
| 0832 | `cat-infection-isolation-end-decision` | infection-control | 0827, 0839, 0840, 0810 |
| 0836 | `kennel-cough-not-single-pathogen` | infectious-disease | 0399, 0839, 0840, 0535 |
| 0838 | `dog-leptospirosis-environment-travel-risk` | infectious-disease | 0519, 0521, 0839, 0840 |
| 0839 | `pathogen-positive-carrier-vs-disease` | infectious-disease | 0674, 0824, 0827, 0840 |
| 0840 | `infection-negative-return-group-activity` | infection-control | 0832, 0836, 0839, 0535 |

**内链边界：**
- FCoV阳性页不使用“猫传腹阳性”这种误导性锚文本；
- FeLV筛查阳性不直接链向永久隔离或预后结论；
- 0839/0840强调检测语境，不把“阳性/阴性”做绝对结论；
- 0838如涉及人类暴露，只提示咨询人的医疗人员。

### D. 影像 / 病理 / 第二意见资料

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0668 | `pet-ultrasound-mass-not-always-cancer` | diagnostic-imaging | 0669, 0672, 0703, 0709 |
| 0669 | `pet-xray-normal-need-ultrasound` | diagnostic-imaging | 0668, 0670, 0677, 0680 |
| 0670 | `pet-ct-vs-mri` | diagnostic-imaging | 0669, 0671, 0679, 0715 |
| 0671 | `pet-sedation-for-diagnostic-test` | diagnostic-imaging | 0621, 0623, 0670, 0677 |
| 0672 | `pet-fna-vs-biopsy` | pathology | 0668, 0673, 0703, 0707 |
| 0673 | `pet-pathology-report-questions` | pathology | 0672, 0707, 0709, 0715 |
| 0677 | `prioritize-pet-diagnostic-tests` | diagnostic-imaging | 0668, 0670, 0685, 0693 |
| 0678 | `pet-referral-lab-report-screenshot` | second-opinion-records | 0679, 0695, 0696, 0715 |
| 0679 | `pet-second-opinion-original-imaging-dicom` | second-opinion-records | 0670, 0678, 0715, 0890 |
| 0680 | `pet-lab-report-online-self-diagnosis` | second-opinion-records | 0661, 0673, 0677, 0999 |

**内链边界：**
- “占位”不自动链接“癌症确诊”；
- CT/MRI页不使用“哪个更高级”的排名式锚文本；
- 病理页优先链诊断/分级/第二意见资料，不链保健品或治疗营销；
- 0679只承接资料准备，不设置跨境宠物医疗销售/咨询CTA。

## 五、跨专题桥接

1. `0427 低血糖急症` ↔ `0425/0428 糖尿病家庭管理`，急症行动始终优先。
2. `0441/0446 猫关节疼痛` ↔ `0584/0587 老年猫功能变化与环境改造`。
3. `0457 突然后肢无力` ↔ `0467 神经搬运`，但不在页面端替用户自行区分骨科/神经病因。
4. `0824/0825/0826 FIP` ↔ `0674 检测阴性边界` ↔ `0839 病原体阳性≠发病`。
5. `0672 FNA/活检` ↔ `0673 病理` ↔ `0707 肿瘤病理` ↔ `0715 第二意见`。
6. `0670 CT/MRI` ↔ `0679 DICOM`，形成“检查选择 → 原始资料 → 第二意见”链。

## 六、主库字段

继续统一：

```text
id
canonicalSlug
species
clusterKey
riskLevel
editorialSourceStatus
medicalReviewStatus
officialJapanVerificationStatus
relatedIds
sourceRefs
lastVerifiedAt
emergencyActionFirst
medicationContent
```

本批新增建议：
- `diagnosticContextRequired: true/false`：感染检测、病理、影像等页面强制提示“结果必须结合临床背景解释”。
- `humanHealthBoundary: true/false`：钩端螺旋体等人宠共患主题触发人的医疗边界提示。

## 七、本批结论

**PASS（Batch 04结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入 Batch 05：泌尿/肾病高风险节点 + 皮肤/耳病/牙科 + 幼宠/老年/营养 + 长期照护/康复。
