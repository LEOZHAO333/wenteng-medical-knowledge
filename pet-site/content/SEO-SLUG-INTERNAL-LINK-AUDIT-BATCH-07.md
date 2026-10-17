# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 07

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批覆盖医学复核 Batch 07 的40个节点：
- 心脏 / 肿瘤剩余高价值A级：10
- 医院选择 / 预算 / 转诊 / 远程沟通：10
- 胃肠消化A级：10
- 营养 / 处方饮食 / 消费判断A级：10

本文件只声明 Batch 07 范围结构结果；全库最终发布前仍需再跑机器级全局唯一性校验。

## 二、唯一性结果

- Batch 07 ID：40个，40/40唯一
- Batch 07 canonicalSlug：40个，40/40唯一
- 本批需要改slug：0
- 与Batch 01–06 clusterKey命名兼容
- 与现有MVP 12节点未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 07范围）**。

## 三、Cluster Key

继续/新增：
- `cardiology`
- `oncology-care`
- `care-goals`
- `vet-communication`
- `referral-records`
- `teleconsultation-boundary`
- `gastrointestinal`
- `gastrointestinal-emergency`
- `nutrition`
- `prescription-diet`
- `consumer-evidence`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

正文不硬编码相关文章URL。

## 四、Batch 07 内链表

### A. 心脏 / 肿瘤

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0407 | `cat-heart-recheck-variation` | cardiology | 0403,0404,0413,0667 |
| 0409 | `cat-heart-disease-travel-boarding` | cardiology | 0404,0410,0768,0784 |
| 0410 | `cat-heart-disease-activity` | cardiology | 0404,0409,0415,0587 |
| 0417 | `dog-heart-medication-chart` | cardiology | 0408,0649,0654,0993 |
| 0420 | `dog-heart-supplement-check` | cardiology | 0656,0658,0878,0879 |
| 0713 | `cat-cancer-pain-observation` | oncology-care | 0712,0719,0720,0584 |
| 0714 | `pet-cancer-budget-discussion` | oncology-care | 0685,0693,0700,0719 |
| 0716 | `pet-cancer-supplement-evidence` | consumer-evidence | 0420,0656,0878,0879 |
| 0719 | `pet-end-of-life-family-discussion` | care-goals | 0712,0713,0720,0599 |
| 0720 | `pet-end-of-life-planning` | care-goals | 0713,0719,0599,0700 |

**内链边界：**
- 心脏页不通过内链暗示固定活动量或固定呼吸警戒值；
- 0417只做用药管理，不提供剂量调整；
- 0716不链任何“抗癌营养品购买”页面；
- 0719/0720以舒适和生活质量为中心，不把安宁照护写成自动停止治疗。

### B. 医院选择 / 预算 / 转诊 / 远程沟通

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0681 | `pet-general-vet-or-specialist` | vet-communication | 0685,0695,0697,0700 |
| 0685 | `pet-vet-budget-priority` | vet-communication | 0693,0698,0700,0714 |
| 0691 | `pet-watchful-waiting-return-criteria` | vet-communication | 0692,0698,0684,0981 |
| 0692 | `pet-not-better-followup-records` | vet-communication | 0691,0698,0981,0996 |
| 0693 | `pet-two-treatment-options-tradeoffs` | care-goals | 0685,0700,0714,1000 |
| 0695 | `pet-referral-prepare-records` | referral-records | 0678,0679,0696,0715 |
| 0696 | `pet-change-vet-medical-record-handoff` | referral-records | 0654,0667,0695,0991 |
| 0697 | `pet-teleconsultation-limits` | teleconsultation-boundary | 0695,0715,0888,0896 |
| 0698 | `pet-vet-visit-question-list` | vet-communication | 0685,0691,0692,0996 |
| 0700 | `pet-treatment-goal-control-vs-cure` | care-goals | 0685,0693,0719,1000 |

**内链边界：**
- 0697只解释远程沟通/第二意见边界，不暗示日宠通提供在线确诊、开方或跨境医疗服务；
- 转诊页优先链病历、DICOM、病理和药单，不链商业转化；
- 预算页不以“便宜优先”替代医学优先级。

### C. 胃肠消化

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0081 | `cat-hairball-when-to-see-vet` | gastrointestinal | 0083,0085,0093,0133 |
| 0083 | `cat-regurgitation-vs-vomiting` | gastrointestinal | 0081,0085,0099,0982 |
| 0089 | `cat-vomiting-diarrhea-vet-prep` | gastrointestinal-emergency | 0093,0125,0126,0684 |
| 0101 | `dog-morning-yellow-vomit` | gastrointestinal | 0103,0106,0110,0153 |
| 0114 | `dog-vomited-toy-piece-foreign-body` | gastrointestinal-emergency | 0493,0496,0499,0500 |
| 0124 | `cat-stool-mucus-sample-vet` | gastrointestinal | 0125,0126,0133,0839 |
| 0126 | `cat-chronic-diarrhea-fecal-test` | gastrointestinal | 0124,0133,0153,0674 |
| 0133 | `cat-soft-stool-negative-fecal-next-step` | gastrointestinal | 0126,0674,0675,0153 |
| 0143 | `dog-stool-fresh-blood-photo-record` | gastrointestinal | 0144,0153,0983,0684 |
| 0153 | `dog-chronic-soft-stool-next-step` | gastrointestinal | 0126,0133,0657,0879 |

**内链边界：**
- 0083不把“吐出完整粮”直接确诊反流；
- 0089/0114急症行动优先；
- 粪检阴性页与0674互链时强调检测局限，不导向自行用药。

### D. 营养 / 处方饮食 / 消费判断

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0041 | `cat-food-price-what-to-compare` | nutrition | 0042,0055,0061,0878 |
| 0042 | `cat-food-first-ingredient-meat-not-enough` | nutrition | 0041,0055,0065,0878 |
| 0044 | `cat-food-change-soft-stool` | nutrition | 0126,0133,0153,0879 |
| 0055 | `grain-free-cat-food-meaning` | nutrition | 0041,0042,0875,0878 |
| 0061 | `complete-dog-food-vs-treats` | nutrition | 0065,0067,0079,0878 |
| 0065 | `dog-chicken-rice-long-term-nutrition` | nutrition | 0061,0064,0067,0879 |
| 0067 | `dog-treats-daily-calorie-budget` | nutrition | 0061,0079,0433,0439 |
| 0079 | `dog-prescription-diet-treats` | prescription-diet | 0067,0803,0879,0439 |
| 0875 | `pet-product-natural-not-risk-free` | consumer-evidence | 0656,0658,0878,0879 |
| 0878 | `pet-supplement-reviews-vs-evidence` | consumer-evidence | 0716,0875,0879,0999 |

**内链边界：**
- 营养页不使用“最贵/天然/无谷=更好”的锚文本；
- 处方粮页不推荐具体品牌销售；
- 0875/0878只做证据识别与风险教育。

## 五、跨专题桥接

1. `0417 心脏药表` ↔ `0654 多院药单` ↔ `0993 药品整理`。
2. `0714 肿瘤预算` ↔ `0685 检查优先级` ↔ `0693 两方案取舍`。
3. `0695/0696 转诊交接` ↔ `0678 报告` ↔ `0679 DICOM` ↔ `0715 第二意见`。
4. `0089/0114 胃肠急症` ↔ `0684 急诊描述`，急诊行动优先。
5. `0079 处方粮零食` ↔ `0803 多猫处方粮管理`，但不跨疾病泛化同一处方饮食。
6. `0716/0878/0999`形成“营销主张 → 用户评价 → 研究证据适用性”证据判断链。

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
jurisdictionContextRequired
evidenceClaimCheck
nutritionClaimCheck
```

## 七、本批结论

**PASS（Batch 07结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入 Batch 08。