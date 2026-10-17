# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 06

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批40节点：
- 神经 / 外伤 / 异物与急诊：16
- 用药 / 补充剂 / 化验解释：16
- 眼科剩余高价值节点：8

本文件只声明Batch 06范围结构结果；全库最终发布前仍需再跑机器级全局唯一性校验。

## 二、唯一性结果

- Batch 06 ID：40个，40/40唯一
- Batch 06 canonicalSlug：40个，40/40唯一
- 本批需要改slug：0
- 与现有MVP 12节点未发现本批canonicalSlug直接碰撞
- clusterKey命名与Batch 01–05兼容

结论：**PASS（Batch 06范围）**。

## 三、Cluster Key

继续/新增：
- `neurology`
- `neurology-records`
- `trauma-emergency`
- `foreign-body-emergency`
- `medication-safety`
- `medication-adherence`
- `supplement-safety`
- `lab-interpretation`
- `diagnostic-context`
- `ophthalmology`
- `ophthalmic-emergency`
- `ophthalmic-medication`
- `ophthalmic-postop`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

正文不硬编码相关文章URL。

## 四、内链表

### A. 神经 / 外伤 / 异物与急诊

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0465 | `dog-sleep-twitching-vs-seizure` | neurology | 0461,0463,0471,0982 |
| 0469 | `dog-tail-chasing-medical-or-behavior` | neurology | 0303,0470,0788,0982 |
| 0470 | `dog-normal-neuro-exam-why-imaging` | neurology | 0477,0478,0479,0670 |
| 0471 | `cat-episodic-tremor-video-log` | neurology-records | 0465,0472,0477,0983 |
| 0472 | `cat-post-seizure-safe-space` | neurology | 0461,0464,0471,0500 |
| 0473 | `cat-skin-rippling-back-licking` | neurology | 0289,0303,0477,0982 |
| 0477 | `cat-intermittent-neuro-symptom-diary` | neurology-records | 0470,0471,0479,0981 |
| 0478 | `pet-mri-preparation-anesthesia` | neurology | 0470,0479,0621,0670 |
| 0479 | `pet-neurology-second-opinion-records` | neurology-records | 0478,0679,0715,0890 |
| 0480 | `pet-long-term-antiseizure-medication-monitoring` | medication-safety | 0461,0464,0649,0676 |
| 0482 | `cat-tail-door-injury` | trauma-emergency | 0467,0497,0500,0684 |
| 0488 | `cat-scald-burn-first-aid` | trauma-emergency | 0489,0497,0500,0684 |
| 0489 | `cat-bite-wound-small-puncture` | trauma-emergency | 0488,0497,0500,0810 |
| 0493 | `dog-swallowed-sock-foreign-body` | foreign-body-emergency | 0485,0496,0499,0500 |
| 0497 | `dog-paw-glass-cut-first-aid` | trauma-emergency | 0482,0489,0500,0684 |
| 0500 | `pet-emergency-contact-list` | trauma-emergency | 0464,0488,0493,0684 |

**边界：**急症节点先行动后内链；0493不链“自行催吐教程”；0478不写死禁食小时数；0480不链任何自行改抗癫痫药剂量页面。

### B. 用药 / 补充剂 / 化验解释

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0642 | `cat-pill-spit-out-did-it-swallow` | medication-adherence | 0641,0645,0646,0649 |
| 0644 | `cat-food-aversion-after-medicine` | medication-adherence | 0642,0645,0004,0018 |
| 0645 | `cat-pill-wont-swallow` | medication-adherence | 0642,0644,0646,0905 |
| 0646 | `cat-medication-alternative-formulations` | medication-adherence | 0642,0643,0645,0659 |
| 0647 | `dog-hiding-medicine-in-food` | medication-adherence | 0643,0648,0649,0659 |
| 0655 | `online-pet-medicine-checklist` | medication-safety | 0659,0883,0885,0899 |
| 0656 | `pet-supplement-medication-review` | supplement-safety | 0654,0658,0878,0879 |
| 0657 | `pet-probiotic-how-to-choose` | supplement-safety | 0126,0153,0878,0879 |
| 0658 | `pet-fish-oil-medication-interaction` | supplement-safety | 0656,0878,0879,0621 |
| 0660 | `pet-long-term-medication-cost-options` | medication-safety | 0654,0659,0685,0693 |
| 0662 | `cat-cbc-abnormal-interpretation` | lab-interpretation | 0661,0666,0667,0676 |
| 0666 | `cat-stress-lab-results` | lab-interpretation | 0424,0662,0667,0676 |
| 0667 | `compare-pet-lab-results-between-clinics` | lab-interpretation | 0661,0662,0676,0696 |
| 0674 | `pet-infection-test-negative-not-always-rule-out` | diagnostic-context | 0824,0827,0839,0840 |
| 0675 | `pet-normal-blood-urine-tests-but-symptoms-persist` | diagnostic-context | 0662,0668,0670,0677 |
| 0676 | `why-repeat-pet-lab-test` | lab-interpretation | 0662,0667,0826,0996 |

**边界：**药物页不推荐购药渠道；日本产品自动转NVAL/MAFF核验；补充剂页不以用户好评代替证据；化验页不将单个箭头直接映射疾病。

### C. 眼科

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0341 | `cat-increased-eye-discharge` | ophthalmology | 0342,0343,0348,0352 |
| 0343 | `cat-watery-eye-causes` | ophthalmology | 0341,0345,0348,0360 |
| 0345 | `cat-third-eyelid-visible` | ophthalmology | 0342,0343,0350,0349 |
| 0349 | `senior-cat-bumping-into-things-vision` | ophthalmic-emergency | 0253,0350,0582,0684 |
| 0352 | `dog-yellow-green-eye-discharge` | ophthalmology | 0341,0354,0355,0360 |
| 0358 | `dog-multiple-eye-meds-order-interval` | ophthalmic-medication | 0347,0354,0355,0359 |
| 0359 | `dog-eye-surgery-cone-removal` | ophthalmic-postop | 0353,0354,0358,0638 |
| 0360 | `pet-tear-stain-cleaning-safety` | ophthalmology | 0343,0351,0352,0355 |

**边界：**黄绿分泌物不锚定“细菌感染”；0358不硬编码统一滴药间隔；0359不以天数自动决定摘头套；0349先处理突发视力风险。

## 五、跨专题桥接

1. `0478 MRI准备` ↔ `0621 麻醉前药单` ↔ `0670 CT/MRI选择` ↔ `0679 DICOM`。
2. `0479 神经第二意见` ↔ `0715 肿瘤第二意见` ↔ `0890 海外影像资料`，都只做资料准备，不做跨境宠物医疗转化。
3. `0493 异物` ↔ `0499 催吐边界`：明确“先联系医院”，不形成家庭高风险操作教程。
4. `0655 网上宠物药` ↔ `0659 日本药成分核对` ↔ `0883/0885 日本说明书与适应症`，统一走官方核验状态。
5. `0674 检测阴性` ↔ `0839 病原体阳性≠发病`，形成检测解释双向边界。
6. `0349 老猫视力变化` ↔ `0253 CKD突发视力异常`，但不直接替用户诊断高血压。

## 六、主库字段继续统一

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
diagnosticContextRequired
humanHealthBoundary
procedureTrainingRequired
anesthesiaContextRequired
regulatoryContextRequired
postoperativeCare
```

## 七、本批结论

**PASS（Batch 06结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入Batch 07，并继续日本宠物药官方核验专项。