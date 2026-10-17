# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 09

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批40节点：
- 多宠 / 感染 / 家庭隔离：10
- 耳病A级：10
- 口腔牙科A级：10
- 皮肤 / 被毛A级：10

## 二、唯一性结果

- Batch 09 ID：40个，40/40唯一
- Batch 09 canonicalSlug：40个，40/40唯一
- 本批需要改slug：0
- 与Batch 01–08 clusterKey命名兼容
- 与MVP 12节点未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 09范围）**。

## 三、Cluster Key

- `multi-pet-management`
- `infectious-disease`
- `infection-control`
- `household-hygiene`
- `otology`
- `oral-dental`
- `dermatology`
- `grooming-safety`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

## 四、内链表

### A. 多宠 / 感染 / 家庭隔离

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0804 | `multi-cat-vomit-diarrhea-identify` | multi-pet-management | 0803,0089,0126,0981 |
| 0805 | `multi-cat-topical-medication-licking` | multi-pet-management | 0505,0806,0820,0654 |
| 0806 | `cat-dog-food-medication-storage` | multi-pet-management | 0803,0805,0820,0993 |
| 0810 | `dog-suspected-infection-home-isolation` | infection-control | 0834,0836,0840,0819 |
| 0816 | `pregnancy-cat-home-hygiene` | household-hygiene | 0813,0818,0819,0830 |
| 0822 | `recurrent-feline-upper-respiratory-home-care` | infectious-disease | 0384,0821,0824,0839 |
| 0829 | `cat-ringworm-home-cleaning-treatment` | infection-control | 0289,0830,0837,0819 |
| 0830 | `human-skin-lesion-after-cat-ringworm-no-pet-meds` | household-hygiene | 0289,0829,0837,0817 |
| 0834 | `parvo-puppy-discharge-home-cleaning` | infection-control | 0810,0833,0840,0535 |
| 0837 | `dog-ringworm-family-hygiene` | household-hygiene | 0289,0829,0830,0819 |

**边界：**人类皮损/孕妇问题只做风险提示；传染病页不统一套用一种消毒剂或隔离天数；外用药误舔页不提供自行解毒方案。

### B. 耳病

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0322 | `cat-ear-scratching-bleeding` | otology | 0321,0324,0330,0325 |
| 0325 | `cat-ear-drops-handling` | otology | 0322,0328,0337,0340 |
| 0326 | `multi-cat-ear-cleaner-hygiene` | otology | 0321,0325,0506,0805 |
| 0328 | `cat-ear-exam-before-cleaning` | otology | 0321,0325,0334,0677 |
| 0329 | `cat-hearing-loss-home-observation` | otology | 0324,0474,0585,0982 |
| 0332 | `dog-head-shaking-after-bath` | otology | 0334,0335,0338,0340 |
| 0333 | `floppy-ear-dog-daily-cleaning` | otology | 0332,0334,0337,0338 |
| 0337 | `dog-ear-medication-course-recheck` | otology | 0334,0338,0340,0676 |
| 0338 | `dog-ear-inflammation-hair-plucking` | otology | 0332,0334,0337,0335 |
| 0340 | `dog-different-ear-meds-avoid-mistakes` | otology | 0325,0337,0649,0820 |

**边界：**耳药页不写统一剂量/疗程；0328保留原始分泌物取样价值；歪头/平衡异常导向更高优先级评估。

### C. 口腔牙科

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0361 | `cat-bad-breath-dental-check` | oral-dental | 0362,0366,0369,0370 |
| 0363 | `cat-mouth-pain-safe-transport` | oral-dental | 0361,0362,0367,0684 |
| 0365 | `cat-eating-after-tooth-extraction` | oral-dental | 0363,0366,0377,0638 |
| 0367 | `cat-head-tilt-while-eating-video` | oral-dental | 0361,0362,0363,0982 |
| 0369 | `adult-cat-start-tooth-brushing` | oral-dental | 0361,0366,0370,0373 |
| 0370 | `cat-toothbrush-desensitization` | oral-dental | 0369,0361,0366,0782 |
| 0374 | `dog-loose-tooth-hard-chews` | oral-dental | 0371,0373,0375,0380 |
| 0376 | `puppy-retained-deciduous-teeth` | oral-dental | 0374,0377,0561,0638 |
| 0377 | `dog-dental-cleaning-preanesthetic-check` | oral-dental | 0373,0621,0623,0625 |
| 0380 | `pet-dental-cost-comparison` | oral-dental | 0373,0377,0685,0693 |

**边界：**术后饮食/头套/复查不写死统一天数；刷牙不包装成已存在牙病治疗替代；报价页不做价格营销。

### D. 皮肤 / 被毛

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0282 | `cat-dandruff-causes` | dermatology | 0288,0289,0303,0584 |
| 0284 | `cat-thin-hair-behind-ears` | dermatology | 0321,0322,0289,0290 |
| 0285 | `cat-greasy-tail-base` | dermatology | 0282,0289,0299,0303 |
| 0287 | `cat-matted-fur-scissors-risk` | grooming-safety | 0288,0584,0721,0722 |
| 0288 | `senior-cat-greasy-unkempt-coat` | dermatology | 0282,0287,0441,0584 |
| 0290 | `cat-hair-not-growing-after-shave` | dermatology | 0282,0288,0437,0667 |
| 0297 | `dog-more-shedding-after-bath` | dermatology | 0298,0300,0303,0721 |
| 0298 | `dog-dry-coat-before-supplements` | dermatology | 0297,0437,0656,0878 |
| 0299 | `dog-red-spots-belly-photo-record` | dermatology | 0300,0303,0983,0677 |
| 0300 | `dog-itching-after-shaving` | dermatology | 0297,0299,0303,0334 |

**边界：**皮屑/掉毛/毛质不直接映射缺营养；照片用于趋势记录不替代皮肤检查；毛结安全页不把剪刀操作写成DIY教程。

## 五、跨专题桥接

1. `0829 猫癣环境` ↔ `0289 猫癣诊断` ↔ `0830 人皮损边界`。
2. `0805 外用药误舔` ↔ `0505 驱虫药误舔`，统一药品身份/成分优先。
3. `0325 耳药操作` ↔ `0340 双耳不同用药` ↔ `0820 家庭药表`。
4. `0365 拔牙后` ↔ `0638 术后复查`，但不写统一恢复日程。
5. `0377 牙科术前` ↔ `0621/0623 麻醉评估与监护`。
6. `0298 毛质+补充剂` ↔ `0656 补充剂清单` ↔ `0878 用户评价vs证据`。

## 六、主库字段继续统一

沿用既有字段，并保留：
- `infectionControlContext`
- `humanHealthBoundary`
- `diagnosticContextRequired`
- `procedureTrainingRequired`
- `postoperativeCare`
- `anesthesiaContextRequired`
- `groomingSafetyBoundary`
- `nutritionClaimCheck`

## 七、本批结论

**PASS（Batch 09结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入 Batch 10。