# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 02

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批覆盖医学复核 Batch 02 的40个节点：
- 驱虫 / 寄生虫 / 疫苗：10
- 麻醉 / 手术 / 出院：10
- 用药 / 抗菌药 / 激素：10
- 绝育 / 繁殖急症：10

同时与 `pet-site/api/pet.js` 现有12个MVP内嵌节点做碰撞检查。

> 本文件只声明**Batch 02范围内**的唯一性结果，不把它夸大为全350题的最终全库唯一性审计。

## 二、唯一性结果

- Batch 02 ID：40个，**40/40唯一**
- Batch 02 slug：40个，**40/40唯一**
- 同一ID在本批S/A正文中重复占位：**0**
- 与当前 `pet.js` 12个MVP slug直接碰撞：**0**
- 需要本批改slug：**0**

结论：**PASS（Batch 02范围）**。

## 三、Cluster Key 规则

正式主库建议统一使用以下稳定 `clusterKey`，而不是直接在正文里硬写专题URL：

- `parasite-prevention`
- `vaccination`
- `perioperative-anesthesia`
- `postoperative-care`
- `medication-safety`
- `antimicrobial-stewardship`
- `japan-vet-drug-verification`
- `reproduction`
- `reproductive-emergency`

页面渲染时：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

这样以后slug变化时，只改主库映射，不需要去数百篇正文里手改链接。

## 四、Batch 02 内链表

### A. 驱虫 / 寄生虫 / 疫苗

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0501 | `indoor-cat-parasite-prevention` | parasite-prevention | 0505, 0506, 0507, 0514 |
| 0505 | `cat-licked-topical-parasite-product` | parasite-prevention | 0501, 0507, 0514, 0520 |
| 0506 | `flea-one-cat-household-management` | parasite-prevention | 0501, 0507, 0514, 0520 |
| 0507 | `kitten-flea-treatment-age-weight` | parasite-prevention | 0505, 0506, 0509, 0510 |
| 0511 | `dog-tick-removal` | parasite-prevention | 0512, 0513, 0514, 0519 |
| 0514 | `dog-combo-parasite-product-coverage` | parasite-prevention | 0501, 0511, 0513, 0519 |
| 0521 | `adopted-cat-unknown-vaccine-history` | vaccination | 0523, 0524, 0526, 0532 |
| 0523 | `cat-vaccine-reaction-when-to-call-vet` | vaccination | 0521, 0524, 0526, 0533 |
| 0524 | `cat-overdue-vaccine-restart` | vaccination | 0521, 0523, 0526, 0532 |
| 0533 | `dog-vaccine-face-swelling-breathing-emergency` | vaccination | 0523, 0532, 0535, 0521 |

**内链边界：**
- 驱虫页不能互相暗示某一具体商品适合所有犬猫；
- 疫苗页不批量硬塞固定接种时间表；
- “严重反应”节点可反向链到普通疫苗准备页，但普通疫苗页不应以恐吓式锚文本反复链接急症。

### B. 麻醉 / 手术 / 出院

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0621 | `pet-preop-medication-supplement-review` | perioperative-anesthesia | 0622, 0623, 0625, 0636 |
| 0622 | `pet-fasting-before-anesthesia` | perioperative-anesthesia | 0621, 0623, 0625, 0539 |
| 0623 | `pet-anesthesia-monitoring-questions` | perioperative-anesthesia | 0621, 0622, 0625, 0637 |
| 0625 | `pet-heart-kidney-disease-anesthesia-risk` | perioperative-anesthesia | 0621, 0622, 0623, 0604 |
| 0637 | `pet-surgery-discharge-red-flags` | postoperative-care | 0632, 0634, 0636, 0638 |
| 0626 | `pet-surgery-consent-questions` | perioperative-anesthesia | 0623, 0625, 0637, 0640 |
| 0632 | `pet-cone-vs-recovery-suit` | postoperative-care | 0630, 0633, 0634, 0637 |
| 0634 | `cat-hiding-after-surgery-monitoring` | postoperative-care | 0632, 0637, 0638, 0608 |
| 0636 | `pet-discharge-medication-checklist` | postoperative-care | 0621, 0637, 0648, 0649 |
| 0638 | `pet-postoperative-recheck-importance` | postoperative-care | 0630, 0636, 0637, 0640 |

**内链边界：**
- 麻醉风险页链向“术前药物核对 / 禁食 / 监护”，不链向“某种麻醉药最好”；
- 术后页必须保留“异常时联系原手术医院/急诊”的行动边界；
- 0622不得使用“术前统一禁水X小时”作为批量锚文本。

### C. 用药 / 抗菌药 / 激素

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0641 | `cat-foaming-after-medication` | medication-safety | 0643, 0648, 0649, 0653 |
| 0643 | `cat-crush-medication-food` | medication-safety | 0641, 0647, 0648, 0649 |
| 0648 | `dog-vomits-after-medication-redose` | medication-safety | 0641, 0649, 0654, 0636 |
| 0649 | `pet-missed-dose-no-double` | medication-safety | 0648, 0652, 0653, 0654 |
| 0650 | `pet-share-leftover-medication` | medication-safety | 0651, 0652, 0654, 0659 |
| 0651 | `human-painkillers-dogs-cats` | medication-safety | 0650, 0652, 0653, 0492 |
| 0652 | `pet-antibiotic-stop-early` | antimicrobial-stewardship | 0649, 0650, 0654, 0663 |
| 0653 | `pet-steroid-increased-thirst` | medication-safety | 0649, 0651, 0654, 0621 |
| 0654 | `pet-multiple-vets-medication-list` | medication-safety | 0648, 0649, 0650, 0659 |
| 0659 | `japan-china-pet-medicine-active-ingredient` | japan-vet-drug-verification | 0650, 0654, 0883, 0884 |

**内链边界：**
- 0651可链接误食/中毒急症，但不得把毒理页做成家庭自行处置教程；
- 0652强调“按兽医方案用药”，不使用旧式“所有抗菌药都必须把固定疗程吃完”的绝对化表达；
- 0659只链接日本药品核对方法、官方信息解释与第二意见资料，不链接销售/代购页。

### D. 绝育 / 繁殖急症

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0604 | `cat-spay-normal-preop-tests-anesthesia-risk` | reproduction | 0621, 0622, 0623, 0601 |
| 0609 | `cat-pregnancy-not-by-belly-size` | reproduction | 0610, 0615, 0618, 0620 |
| 0610 | `cat-dystocia-when-emergency` | reproductive-emergency | 0609, 0618, 0619, 0620 |
| 0613 | `dog-one-testicle-cryptorchid` | reproduction | 0611, 0604, 0614, 0625 |
| 0615 | `dog-after-heat-thirst-lethargy-pyometra` | reproductive-emergency | 0611, 0618, 0619, 0620 |
| 0617 | `dog-accidental-mating-what-to-ask` | reproduction | 0611, 0609, 0615, 0618 |
| 0618 | `dog-whelping-emergency-plan` | reproductive-emergency | 0610, 0615, 0619, 0620 |
| 0619 | `lactating-dog-trembling-panting-eclampsia` | reproductive-emergency | 0610, 0615, 0618, 0620 |
| 0620 | `pet-postpartum-not-caring-for-young` | reproductive-emergency | 0609, 0610, 0618, 0619 |
| 0611 | `dog-spay-neuter-individual-decision` | reproduction | 0604, 0613, 0615, 0617 |

**内链边界：**
- 难产、子宫蓄脓、产后低钙页必须把“及时就医”放在决策链前部；
- 0611个体化绝育决策不能被写成“某品种固定月龄结论”；
- 意外交配页不链接人用避孕药、激素购买或具体自行处置方案。

## 五、建议的数据字段

本批以后进入 `RiChongTong_Pet_GEO_Master` 时，至少采用：

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
```

其中：
- `id` 永远不随标题/slug变化；
- `relatedIds` 只存ID，不存URL；
- `sourceRefs` 存来源标识，不把来源URL混进正文锚文本；
- 日本具体药品才触发 `officialJapanVerificationStatus`。

## 六、本批结论

**PASS（Batch 02结构层）**

- ID重复：0
- slug重复：0
- 与MVP 12节点slug碰撞：0
- 已建立clusterKey：40/40
- 已给出relatedIds：40/40
- 当前无需改slug
- 当前不生成公开URL
- 当前不解除noindex

下一步：继续对 Batch 03（心脏 / 肿瘤 / 呼吸 / 眼科）执行同一套“来源核对 + 风险状态 + ID/slug + relatedIds”流程。