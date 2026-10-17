# 日宠通 SEO / ID / Slug / 内链一致性审计｜Batch 10

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计范围

本批40节点：
- 家居安全 / 季节环境：10
- 品种健康 / 家庭管理：10
- 长期照护 / 感官与行动支持：10
- 主人观察 / 家庭记录工具：10

## 二、唯一性结果

依据既有A级清库审计与本批选定节点复核：
- Batch 10 ID：40个，40/40唯一
- Batch 10 canonicalSlug：40个，40/40唯一
- 本批需要改slug：0
- clusterKey：40/40
- relatedIds：40/40
- 不新增第二份医学正文来源，不生成公开URL

结论：**PASS（Batch 10范围）**。

## 三、Cluster Key

- `home-safety`
- `seasonal-risk`
- `breed-health-context`
- `preventive-care`
- `mobility-support`
- `sensory-support`
- `care-handover`
- `owner-tracking-tools`
- `medication-safety`
- `evidence-literacy`

继续执行：

`ID → canonicalSlug → clusterKey → relatedIds → 当前URL（上线前为空）`

## 四、内链表

### A. 家居安全 / 季节环境

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0742 | `cat-summer-cooling-signs` | seasonal-risk | 0749,0753,0759,0384 |
| 0743 | `cat-washing-machine-safety-check` | home-safety | 0749,0750,0759,0994 |
| 0749 | `cat-balcony-sun-shade-safety` | home-safety | 0742,0743,0759,0994 |
| 0750 | `cat-home-disinfectant-reentry` | home-safety | 0756,0810,0819,0998 |
| 0753 | `dog-hot-pavement-paw-risk` | seasonal-risk | 0737,0756,0757,0759 |
| 0755 | `dog-shivering-cold-or-illness` | seasonal-risk | 0581,0587,0796,0427 |
| 0756 | `dog-road-salt-deicer-paw-licking` | seasonal-risk | 0737,0750,0753,0998 |
| 0757 | `dog-red-paws-after-rain` | home-safety | 0734,0737,0299,0990 |
| 0758 | `dog-thunderstorm-safe-space` | home-safety | 0792,0787,0772,0994 |
| 0759 | `pet-heating-pad-burn-risk` | home-safety | 0742,0749,0903,0912 |

**边界：**产品/消毒/融雪剂不统一推断成分；热风险页不把家庭降温替代急症处置；行为恐惧页不提供自行镇静方案。

### B. 品种健康 / 家庭管理

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0842 | `ragdoll-cat-chronic-gi-not-just-breed` | breed-health-context | 0849,0401,0403,0410 |
| 0843 | `persian-cat-face-cleaning-gentle-care` | breed-health-context | 0854,0855,0352,0360 |
| 0844 | `sphynx-cat-skin-oil-cleaning-frequency` | breed-health-context | 0721,0282,0285,0303 |
| 0846 | `short-legged-cat-reluctant-to-jump-pain` | breed-health-context | 0587,0908,0903,0457 |
| 0849 | `kitten-healthy-parents-still-needs-checkup` | preventive-care | 0850,0543,0544,0561 |
| 0850 | `second-cat-health-care-needs-before-adoption` | preventive-care | 0803,0807,0816,0849 |
| 0852 | `corgi-stairs-mobility-management` | breed-health-context | 0587,0903,0912,0457 |
| 0854 | `poodle-tearing-not-always-normal` | breed-health-context | 0855,0352,0358,0360 |
| 0855 | `bichon-tear-stains-grooming-not-enough` | breed-health-context | 0854,0843,0352,0360 |
| 0857 | `labrador-family-feeding-plan` | preventive-care | 0985,0986,0987,0437 |

**边界：**品种只作为背景，不建立“某品种=某诊断”的捷径；眼部异常优先保留疼痛/角膜等医学边界；体重管理以总摄入和体况为核心。

### C. 长期照护 / 感官与行动支持

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0901 | `blind-cat-moving-home-layout` | sensory-support | 0902,0908,0912,0764 |
| 0902 | `deaf-cat-approach-communication` | sensory-support | 0901,0913,0329,0585 |
| 0903 | `three-legged-cat-home-care` | mobility-support | 0846,0852,0908,0912 |
| 0904 | `cat-long-term-cage-rest-welfare` | mobility-support | 0909,0910,0918,0638 |
| 0908 | `mobility-impaired-cat-litterbox-setup` | mobility-support | 0903,0901,0587,0216 |
| 0909 | `cat-recovery-low-energy-enrichment` | mobility-support | 0904,0910,0918,0638 |
| 0910 | `chronic-cat-care-handover-checklist` | care-handover | 0918,0820,0993,0994 |
| 0912 | `blind-dog-home-safety-layout` | sensory-support | 0901,0903,0913,0759 |
| 0913 | `deaf-dog-walk-safety-communication` | sensory-support | 0902,0912,0778,0995 |
| 0918 | `dog-treatment-care-delegation-workday` | care-handover | 0910,0820,0993,0994 |

**边界：**突然视听力变化不能只做环境适应；恢复/笼养不擅自突破医嘱；复杂护理保留现场培训要求。

### D. 主人观察 / 家庭记录工具

| ID | canonicalSlug | clusterKey | relatedIds |
|---|---|---|---|
| 0985 | `pet-home-weight-tracking-consistency` | owner-tracking-tools | 0857,0986,0987,0437 |
| 0986 | `pet-food-intake-weighing-vs-scoop` | owner-tracking-tools | 0985,0987,0770,0857 |
| 0987 | `family-pet-treat-log` | owner-tracking-tools | 0857,0985,0986,0820 |
| 0990 | `pet-skin-photo-progress-tracking` | owner-tracking-tools | 0299,0757,0677,0982 |
| 0993 | `pet-medication-home-organization` | medication-safety | 0820,0910,0918,0649 |
| 0994 | `pet-emergency-contact-household-plan` | care-handover | 0910,0918,0762,0771 |
| 0995 | `pet-microchip-tag-contact-update` | owner-tracking-tools | 0778,0913,0994,0764 |
| 0997 | `pet-health-video-information-quality` | evidence-literacy | 0998,0999,0878,0716 |
| 0998 | `pet-home-remedy-fact-check-before-sharing` | evidence-literacy | 0997,0999,0492,0756 |
| 0999 | `pet-study-data-applicability-to-own-pet` | evidence-literacy | 0997,0998,0878,0716 |

**边界：**家庭记录是趋势与沟通工具，不替代诊断；旧药不因“症状相似”自动复用；芯片登记规则按实际登记系统核对；研究数据不直接转化为个体疗效承诺。

## 五、跨专题桥接

1. `0742/0749/0759` 组成高温—环境—热源家庭安全链。
2. `0756/0998` 连接产品暴露与偏方/毒理信息核验。
3. `0846/0852/0903/0908/0912` 组成行动能力与家庭可达性链。
4. `0857/0985/0986/0987` 组成体重—主食—零食总摄入监测链。
5. `0910/0918/0993/0994` 组成慢病交接—药物—紧急联系人链。
6. `0997/0998/0999` 组成证据素养专题入口。

## 六、主库字段继续统一

新增/沿用：
- `householdSafetyBoundary`
- `toxicologyContext`
- `pawSafetyBoundary`
- `behaviorSafetyBoundary`
- `thermalInjuryRisk`
- `painMobilityContext`
- `sensorySupport`
- `procedureTrainingRequired`
- `medicationContent`
- `nutritionClaimCheck`
- `evidenceClaimCheck`

## 七、本批结论

**PASS（Batch 10结构层）**

- ID重复：0（Batch 10范围）
- slug重复：0（Batch 10范围）
- clusterKey：40/40
- relatedIds：40/40
- 本批需改slug：0
- 当前不生成公开URL
- 当前不解除noindex
- 当前不部署、不合并main

下一步继续日本宠物药官方核验专项与剩余P0/P1尾项。