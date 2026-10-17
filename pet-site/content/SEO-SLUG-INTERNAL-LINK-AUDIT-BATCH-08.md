# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 08

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批40节点：
- 泌尿 / 排尿观察与家庭管理：10
- 呼吸 / 老年高价值A级：10
- 多宠家庭 / 儿童 / 家庭卫生：10
- 寄养 / 搬家 / 旅行 / 行为：10

## 二、唯一性结果

- Batch 08 ID：40个，40/40唯一
- Batch 08 canonicalSlug：40个，40/40唯一
- 本批需要改slug：0
- 与Batch 01–07 clusterKey命名兼容
- 与MVP 12节点未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 08范围）**。

## 三、Cluster Key

- `lower-urinary-tract`
- `urinary-observation`
- `respiratory`
- `senior-care`
- `medication-safety`
- `multi-pet-management`
- `child-pet-safety`
- `household-hygiene`
- `boarding-travel`
- `feline-behavior-environment`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

## 四、内链表

### A. 泌尿 / 排尿观察

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0215 | `cat-not-using-litter-after-litter-change` | lower-urinary-tract | 0216,0219,0218,0220 |
| 0216 | `multi-cat-litterbox-urination-monitoring` | urinary-observation | 0215,0802,0804,0981 |
| 0219 | `cat-urinary-problem-moving-plan` | lower-urinary-tract | 0215,0220,0764,0768 |
| 0221 | `dog-sudden-house-soiling-medical-or-behavior` | urinary-observation | 0224,0226,0234,0783 |
| 0224 | `dog-urine-leak-during-sleep` | urinary-observation | 0225,0226,0230,0661 |
| 0226 | `senior-dog-urinary-accidents-home-care` | senior-care | 0224,0591,0596,0589 |
| 0227 | `dog-strong-urine-odor-infection` | urinary-observation | 0222,0228,0230,0674 |
| 0232 | `dog-orange-urine-stain-photo` | urinary-observation | 0222,0227,0228,0983 |
| 0233 | `male-dog-licking-genitals` | lower-urinary-tract | 0228,0230,0234,0613 |
| 0234 | `dog-marking-vs-frequent-urination` | urinary-observation | 0221,0227,0233,0783 |

**边界：**0215急症判断优先；尿味/颜色不自动锚定感染；行为性排尿与医学性尿频不互相替代诊断。

### B. 呼吸 / 老年

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0385 | `cat-dry-nose-meaning` | respiratory | 0384,0388,0981,0582 |
| 0390 | `multicat-cough-isolation` | respiratory | 0383,0384,0821,0839 |
| 0391 | `dog-cough-video-recording` | respiratory | 0393,0395,0399,0982 |
| 0396 | `dog-cough-collar-or-harness` | respiratory | 0391,0395,0415,0784 |
| 0398 | `dog-nose-crusting-skincare` | respiratory | 0303,0299,0391,0677 |
| 0581 | `cat-senior-age-care` | senior-care | 0582,0584,0586,0599 |
| 0585 | `senior-cat-clingy-behavior` | senior-care | 0582,0584,0783,0981 |
| 0587 | `senior-cat-mobility-home-setup` | senior-care | 0441,0442,0445,0599 |
| 0588 | `senior-cat-carrier-stress` | senior-care | 0587,0763,0788,0695 |
| 0590 | `senior-cat-medication-review` | medication-safety | 0654,0656,0660,0993 |

**边界：**0390不把咳嗽自动定义为传染病；老年行为变化不自动等于认知障碍；0590不提供自行停药/减药建议。

### C. 多宠 / 儿童 / 家庭卫生

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0803 | `multi-cat-prescription-diet-feeding` | multi-pet-management | 0079,0804,0820,0439 |
| 0807 | `pet-after-hospital-other-pets-reintroduction` | multi-pet-management | 0768,0810,0637,0691 |
| 0809 | `dogs-size-difference-play-safety` | multi-pet-management | 0443,0497,0797,0982 |
| 0811 | `child-cat-handling-warning-signs` | child-pet-safety | 0812,0813,0782,0448 |
| 0812 | `dog-sleep-child-safety-rules` | child-pet-safety | 0811,0813,0796,0584 |
| 0813 | `baby-pet-bedroom-household-plan` | household-hygiene | 0811,0818,0819,0816 |
| 0817 | `pet-licked-human-wound-what-to-do` | household-hygiene | 0818,0819,0814,0489 |
| 0818 | `litterbox-cleaning-hand-cut-hygiene` | household-hygiene | 0813,0817,0819,0816 |
| 0819 | `pet-bowls-human-dishes-cleaning-rules` | household-hygiene | 0813,0818,0722,0806 |
| 0820 | `family-pet-feeding-medication-log` | multi-pet-management | 0417,0654,0803,0993 |

**边界：**人的伤口/孕妇/婴儿问题只做风险提示；不替代人的医疗；儿童与宠物互动强调成人监督而非训练宠物“必须忍耐”。

### D. 寄养 / 搬家 / 旅行 / 行为

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0761 | `cat-boarding-environment-for-shy-cat` | boarding-travel | 0762,0763,0770,0409 |
| 0762 | `cat-home-sitter-care-checklist` | boarding-travel | 0770,0417,0500,0992 |
| 0763 | `cat-carrier-training-before-travel` | boarding-travel | 0588,0788,0695,0500 |
| 0764 | `cat-moving-safe-room-setup` | feline-behavior-environment | 0219,0768,0782,0784 |
| 0768 | `multi-cat-moving-reintroduction` | multi-pet-management | 0764,0807,0802,0784 |
| 0770 | `cat-sitter-food-intake-record` | boarding-travel | 0762,0004,0245,0981 |
| 0771 | `dog-first-boarding-handover` | boarding-travel | 0500,0654,0696,0399 |
| 0778 | `pet-long-distance-transport-health-care-comparison` | boarding-travel | 0409,0695,0500,0888 |
| 0782 | `cat-hides-from-strangers-socialization` | feline-behavior-environment | 0764,0788,0585,0448 |
| 0783 | `cat-night-vocalization-causes` | feline-behavior-environment | 0582,0585,0423,0591 |

**边界：**旅行/寄养页不推荐未经兽医评估的镇静药；0778不链接跨境商业运输服务；行为变化页保留医学排查入口。

## 五、跨专题桥接

1. `0219 尿路问题+搬家` ↔ `0764 搬家安全房`，但尿闭信号优先。
2. `0390 多猫咳嗽` ↔ `0821 上呼吸道诊断` ↔ `0839 病原体阳性≠发病`。
3. `0588 老猫猫包压力` ↔ `0763/0788 猫包适应`，老年疼痛评估仍保留。
4. `0803 处方粮` ↔ `0079 处方饮食零食`，不跨疾病泛化产品。
5. `0820 家庭药物记录` ↔ `0417 心脏药表` ↔ `0654 多院药单`。
6. `0778 长途运输` ↔ `0409 心脏病寄养/出行`，只做风险评估，不做运输销售转化。

## 六、主库字段补充

继续统一既有字段，并增加：
- `infectionControlContext`
- `childSafetyBoundary`
- `transportRiskContext`

## 七、本批结论

**PASS（Batch 08结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入 Batch 09。