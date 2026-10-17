# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 03

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批覆盖医学复核 Batch 03 的40个节点：
- 心脏：10
- 肿瘤：10
- 呼吸系统：10
- 眼科：10

本文件只声明 Batch 03 范围内的结构结果；最终全库350+节点仍需在主库生成时再跑一次机器级全局唯一性校验。

## 二、唯一性结果

- Batch 03 ID：40个，40/40唯一
- Batch 03 canonicalSlug：40个，40/40唯一
- 本批S/A正文相同ID重复占位：0
- 本批需要改slug：0
- 与前两批已经建立的cluster命名无冲突
- 与此前MVP 12节点审计记录未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 03范围）**。

## 三、Cluster Key

新增/继续使用以下稳定主题键：

- `cardiology`
- `cardiovascular-emergency`
- `oncology-diagnosis`
- `oncology-care`
- `respiratory`
- `respiratory-emergency`
- `ophthalmology`
- `ophthalmic-emergency`

渲染逻辑继续锁定：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

正文不硬编码相关文章URL。

## 四、Batch 03 内链表

### A. 心脏

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0401 | `cat-heart-murmur` | cardiology | 0402, 0403, 0404, 0405 |
| 0402 | `cat-asymptomatic-heart-ultrasound` | cardiology | 0401, 0403, 0404, 0406 |
| 0403 | `cat-myocardial-thickening-questions` | cardiology | 0401, 0402, 0404, 0405 |
| 0404 | `cat-heart-home-monitoring` | cardiology | 0381, 0403, 0405, 0413 |
| 0405 | `cat-sudden-hindlimb-paralysis-heart` | cardiovascular-emergency | 0401, 0403, 0382, 0400 |
| 0406 | `cat-heart-disease-anesthesia` | cardiology | 0402, 0403, 0621, 0625 |
| 0408 | `cat-heart-medicine-missed-dose` | cardiology | 0404, 0649, 0654, 0417 |
| 0413 | `dog-heart-disease-sleeping-respiratory-rate` | cardiology | 0381, 0395, 0415, 0418 |
| 0415 | `dog-heart-disease-walking` | cardiology | 0395, 0413, 0418, 0417 |
| 0418 | `dog-collapse-syncope-heart` | cardiovascular-emergency | 0395, 0413, 0415, 0461 |

**内链边界：**
- 0401不使用“听到杂音=心脏病”锚文本；
- 0405、0418可链急诊页，但不把某个单一症状直接写成确定诊断；
- 0413/0404强调个人基线和趋势，不把固定呼吸阈值批量硬编码到所有页面。

### B. 肿瘤

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0701 | `dog-lump-recording` | oncology-diagnosis | 0703, 0704, 0672, 0709 |
| 0702 | `cat-injection-site-lump-history` | oncology-diagnosis | 0703, 0705, 0672, 0709 |
| 0703 | `pet-lump-benign-or-malignant` | oncology-diagnosis | 0701, 0704, 0672, 0707 |
| 0704 | `dog-lipoma-growing-recheck` | oncology-diagnosis | 0701, 0703, 0672, 0709 |
| 0705 | `cat-mammary-lump` | oncology-diagnosis | 0702, 0703, 0709, 0715 |
| 0707 | `pet-tumor-pathology-report` | oncology-diagnosis | 0673, 0709, 0715, 0679 |
| 0709 | `pet-cancer-stage-vs-grade` | oncology-diagnosis | 0703, 0707, 0715, 0670 |
| 0711 | `pet-chemotherapy-home-safety` | oncology-care | 0712, 0713, 0714, 0720 |
| 0712 | `dog-cancer-palliative-appetite` | oncology-care | 0711, 0713, 0719, 0720 |
| 0715 | `pet-cancer-second-opinion-records` | oncology-diagnosis | 0679, 0707, 0709, 0893 |

**内链边界：**
- 任何“肿块”页优先链向诊断/取样/病理，不链“神药/保健品抗癌”；
- 0711家庭化疗安全不写死统一防护天数；
- 0712舒适照护不自动等于停止所有治疗；
- 0715第二意见重点链原始病理、DICOM和时间线，不做跨境医疗商业转化。

### C. 呼吸系统

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0381 | `cat-sleeping-respiratory-rate-video` | respiratory | 0382, 0383, 0404, 0413 |
| 0382 | `cat-open-mouth-breathing` | respiratory-emergency | 0381, 0388, 0400, 0405 |
| 0383 | `cat-cough-vs-hairball` | respiratory | 0381, 0389, 0388, 0390 |
| 0384 | `cat-sneezing-nasal-discharge` | respiratory | 0388, 0390, 0821, 0823 |
| 0388 | `cat-noisy-breathing-video` | respiratory | 0382, 0384, 0389, 0400 |
| 0389 | `cat-asthma-inhaler-training` | respiratory | 0382, 0383, 0388, 0400 |
| 0393 | `dog-reverse-sneeze-or-other` | respiratory | 0391, 0395, 0399, 0400 |
| 0395 | `dog-exercise-intolerance-panting` | respiratory | 0413, 0415, 0418, 0400 |
| 0399 | `dog-cough-after-boarding` | respiratory | 0391, 0393, 0836, 0535 |
| 0400 | `pet-breathing-distress-transport` | respiratory-emergency | 0382, 0388, 0395, 0684 |

**内链边界：**
- “鼻涕变色”不锚定为“细菌感染”；
- “咳嗽”不自动锚定为“心脏病”；
- 0389只解释装置和训练，不提供自行更改吸入药剂量；
- 0382、0400把急诊行动放在知识扩展链接之前。

### D. 眼科

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0342 | `cat-one-eye-closed` | ophthalmic-emergency | 0344, 0346, 0348, 0347 |
| 0344 | `cat-cloudy-eye` | ophthalmic-emergency | 0342, 0348, 0350, 0354 |
| 0346 | `cat-eye-scratch-trauma` | ophthalmic-emergency | 0342, 0347, 0348, 0353 |
| 0347 | `cat-eye-drops-safe-technique` | ophthalmology | 0342, 0346, 0348, 0355 |
| 0348 | `cat-red-eye-corneal-check` | ophthalmic-emergency | 0342, 0344, 0346, 0350 |
| 0350 | `cat-anisocoria` | ophthalmic-emergency | 0344, 0348, 0349, 0353 |
| 0353 | `dog-bulging-eye-emergency` | ophthalmic-emergency | 0354, 0355, 0357, 0400 |
| 0354 | `dog-squinting-tearing-eye-pain` | ophthalmic-emergency | 0348, 0353, 0355, 0357 |
| 0355 | `dog-dry-eye-tear-test` | ophthalmology | 0347, 0354, 0357, 0351 |
| 0357 | `dog-cherry-eye-red-mass` | ophthalmology | 0353, 0354, 0355, 0351 |

**内链边界：**
- 眼痛/红眼页不直接推荐具体眼药；
- 含激素眼药相关内容必须先强调排除角膜溃疡；
- 0353眼球突出/脱出属于急症，相关文章不能挡在就医提示前；
- 0357第三眼睑腺脱出不以“直接切掉”作为科普默认方案。

## 五、跨专题桥接

允许建立的高价值跨专题链接：

1. `0405 猫突然后肢瘫痪` ↔ `0401/0403 猫心肌病`，但仍提示神经/外伤等鉴别。
2. `0413 犬睡眠呼吸` ↔ `0395 运动耐力下降` ↔ `0400 呼吸急症运输`。
3. `0707 病理报告` ↔ `0673 病理问题` ↔ `0715 肿瘤第二意见`。
4. `0715 肿瘤第二意见` ↔ `0679 原始DICOM`，形成“病理 + 影像 + 时间线”资料链。
5. `0348 红眼` ↔ `0347 滴眼药操作`，但只在兽医已经开具眼药的场景下建立锚文本。
6. `0350 瞳孔不等大` ↔ `0349 老猫突然撞东西/视力变化`，用于突发视力异常集群。

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
```

新增建议：
- `emergencyActionFirst: true/false`：呼吸、血栓、眼球脱出等急症页面渲染时强制把就医提示放在相关文章之前。
- `medicationContent: true/false`：眼药、吸入药、化疗等节点触发更严格的药物表述检查。

## 七、本批结论

**PASS（Batch 03结构层）**

- ID重复：0
- slug重复：0
- 已建立clusterKey：40/40
- 已建立relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步：Batch 04（糖尿病/内分泌 + 关节/疼痛 + 感染检测 + 影像/病理/第二意见）。