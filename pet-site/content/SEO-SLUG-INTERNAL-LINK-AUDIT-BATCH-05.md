# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 05

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批覆盖医学复核 Batch 05 的40个节点：
- 泌尿 / 肾病高风险：10
- 皮肤 / 耳病 / 牙科：10
- 幼宠 / 老年 / 营养：10
- 长期照护 / 康复：10

本文件只声明 Batch 05 范围内结构结果；主库生成/上线前仍需再跑全库机器级唯一性校验。

## 二、唯一性结果

- Batch 05 ID：40个，40/40唯一
- Batch 05 canonicalSlug：40个，40/40唯一
- 本批S/A正文相同ID重复占位：0
- 本批需要改slug：0
- 与Batch 01–04 clusterKey命名兼容
- 与现有MVP 12节点未发现本批canonicalSlug直接碰撞

结论：**PASS（Batch 05范围）**。

## 三、Cluster Key

本批新增/继续使用：

- `urinary-emergency`
- `lower-urinary-tract`
- `chronic-kidney-disease`
- `fluid-therapy`
- `dermatology`
- `otology`
- `oral-dental`
- `neonatal-care`
- `senior-care`
- `nutrition`
- `long-term-care`
- `rehabilitation`
- `owner-observation`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL`

正文不硬编码相关文章URL。

## 四、Batch 05 内链表

### A. 泌尿 / 肾病高风险

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0223 | `dog-straining-no-urine` | urinary-emergency | 0228, 0235, 0229, 0684 |
| 0218 | `female-cat-urinary-retention` | urinary-emergency | 0220, 0241, 0223, 0684 |
| 0235 | `dog-low-urine-lethargic` | urinary-emergency | 0223, 0228, 0241, 0684 |
| 0228 | `dog-painful-urination` | lower-urinary-tract | 0223, 0230, 0229, 0222 |
| 0230 | `dog-recurrent-uti-urine-culture` | lower-urinary-tract | 0228, 0222, 0652, 0674 |
| 0241 | `cat-creatinine-high-once` | chronic-kidney-disease | 0243, 0245, 0246, 0667 |
| 0243 | `cat-ckd-staging` | chronic-kidney-disease | 0241, 0245, 0246, 0253 |
| 0246 | `cat-ckd-fluid-frequency` | fluid-therapy | 0241, 0243, 0249, 0905 |
| 0249 | `cat-fast-breathing-after-fluids` | fluid-therapy | 0246, 0382, 0400, 0684 |
| 0253 | `cat-ckd-sudden-vision-loss` | chronic-kidney-disease | 0243, 0349, 0350, 0684 |

**内链边界：**
- 0223/0218/0235/0249/0253先显示行动提示，再显示相关文章；
- 不把“尿不出”锚文本导向家庭处理教程；
- 补液页不互链任何固定毫升数/频率建议；
- CKD分期页不把单次肌酐直接转译为某一期。

### B. 皮肤 / 耳病 / 牙科

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0289 | `cat-circular-hair-loss-ringworm` | dermatology | 0829, 0303, 0291, 0839 |
| 0301 | `dog-licking-paws` | dermatology | 0303, 0305, 0334, 0304 |
| 0303 | `dog-itch-no-rash` | dermatology | 0301, 0305, 0334, 0506 |
| 0305 | `dog-food-allergy-diet-switching` | dermatology | 0301, 0303, 0334, 0879 |
| 0324 | `cat-head-tilt-ear-problem` | otology | 0321, 0330, 0474, 0475 |
| 0321 | `cat-black-ear-debris-ear-mites` | otology | 0324, 0330, 0501, 0506 |
| 0334 | `dog-recurrent-otitis-allergy` | otology | 0301, 0303, 0305, 0335 |
| 0362 | `cat-drooling-not-eating-hard-food` | oral-dental | 0366, 0371, 0004, 0677 |
| 0366 | `cat-stomatitis-treatment-options` | oral-dental | 0362, 0373, 0651, 0677 |
| 0373 | `dog-dental-cleaning-anesthesia` | oral-dental | 0621, 0623, 0625, 0371 |

**内链边界：**
- 猫癣页不把外观描述直接锚定为确诊；
- 反复耳炎页先链病因评估，不链具体滴耳药；
- 牙科页不把“无麻醉洗牙”包装为等效替代；
- 0366不推荐长期自行使用抗菌/激素药。

### C. 幼宠 / 老年 / 营养

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0543 | `orphan-kitten-first-steps` | neonatal-care | 0544, 0548, 0004, 0981 |
| 0544 | `kitten-milk-aspiration` | neonatal-care | 0543, 0382, 0400, 0684 |
| 0561 | `puppy-new-home-not-eating-drinking` | neonatal-care | 0569, 0537, 0684, 0981 |
| 0569 | `small-puppy-lethargic-shaking` | neonatal-care | 0561, 0427, 0461, 0684 |
| 0582 | `senior-cat-night-vocalization` | senior-care | 0584, 0586, 0591, 0981 |
| 0584 | `senior-cat-sleeping-pain-signs` | senior-care | 0441, 0446, 0587, 0599 |
| 0591 | `senior-dog-disorientation-cognitive-dysfunction` | senior-care | 0582, 0599, 0982, 0681 |
| 0004 | `cat-not-eating-when-vet` | nutrition | 0018, 0244, 0362, 0684 |
| 0018 | `cat-only-eats-treats` | nutrition | 0004, 0047, 0362, 0879 |
| 0064 | `dog-homemade-meat-rice-balanced` | nutrition | 0065, 0067, 0878, 0879 |

**内链边界：**
- 0544/0561/0569急症风险提示优先；
- 幼宠页不写家庭糖水剂量、奶量或导管喂法；
- 老年行为变化不锚定为“认知障碍确诊”；
- 营养页优先链完整营养评估，不链商品推荐。

### D. 长期照护 / 康复

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0905 | `cat-feeding-tube-home-care` | long-term-care | 0906, 0907, 0981, 0992 |
| 0906 | `cat-feeding-tube-site-redness-photo` | long-term-care | 0905, 0990, 0983, 0691 |
| 0907 | `cat-long-term-bedridden-skin-care` | long-term-care | 0914, 0442, 0587, 0599 |
| 0911 | `dog-wheelchair-assessment` | rehabilitation | 0916, 0917, 0457, 0982 |
| 0914 | `dog-bedridden-turning-bedding` | long-term-care | 0907, 0915, 0917, 0599 |
| 0915 | `dog-assisted-bladder-expression-training` | long-term-care | 0223, 0235, 0914, 0691 |
| 0916 | `dog-amputation-home-setup` | rehabilitation | 0911, 0917, 0442, 0587 |
| 0917 | `dog-rehab-more-pain-fatigue` | rehabilitation | 0911, 0916, 0450, 0446 |
| 0981 | `cat-not-right-observation-log` | owner-observation | 0982, 0983, 0992, 0692 |
| 0982 | `dog-symptoms-at-home-video-evidence` | owner-observation | 0981, 0983, 0683, 0692 |

**内链边界：**
- 0905/0906/0915标记 `procedureTrainingRequired=true`，相关文章不能把页面变成DIY医疗操作教程；
- 0915突发无尿仍必须跳转急症行动逻辑；
- 0911/0916/0917不提供统一康复动作处方；
- 0981/0982用于增强病史质量，不替代体检。

## 五、跨专题桥接

1. `0223/0218 排尿急症` ↔ `0915 辅助排尿培训`：明确“慢性居家技能”与“突然无尿急症”不是一回事。
2. `0246/0249 补液` ↔ `0382/0400 呼吸急症`：出现呼吸异常时停止继续加液并尽快求助。
3. `0289 猫癣` ↔ `0829 环境管理`：形成“诊断 → 治疗协同 → 环境清洁”链。
4. `0334 反复耳炎` ↔ `0301/0305 过敏`：解释耳道皮肤与全身过敏管理关系。
5. `0543/0544 幼猫` ↔ `0004 食欲`：新生幼宠优先体温和安全喂养，不能直接套成年猫食欲页。
6. `0905 喂食管` ↔ `0981 观察日志`：只链接记录与异常识别，不链接自行改变喂食处方。

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
```

## 七、本批结论

**PASS（Batch 05结构层）**

- ID重复：0
- slug重复：0
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex

下一步自动进入 Batch 06：继续清理未复核的P0/P1节点，并启动日本宠物药 `official_japan_verification_pending` 专项清单。