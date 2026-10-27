# 日宠通40篇问答日期与索引资格联动台账｜2026-10-27

> **只读待核清单，非生产发布名单。** 来源：`pet-site/api/pet.js`及两份逐篇日期审计。所有日期均不自动视为已证实。本文不授权医学批准、发布、收录或部署。

## 汇总

| 项目 | 数量 | 判定 |
|---|---:|---|
| 生产渲染器问答 | 40 | 仅确认源码存在 |
| 缺少`published` | 12 | 待查首次公开记录 |
| 有`published: 2026-10-15` | 28 | 日期真实性待查 |
| 缺少`modified` | 40 | 待查逐篇实际修改记录 |
| 逐篇兽医正式签署 | 未由本审计核实 | **不可视为已批准** |
| 逐篇Founder发布与索引授权 | 未由本审计核实 | **不可视为已授权** |
| 允许本台账自动写入生产 | 0 | 禁止 |

## 12篇无发布日期（全部缺修改日期）
cat-dandruff、cat-belly-hair-loss、cat-ear-thinning、cat-tail-greasy、cat-chin-blackheads、dog-dandruff-itching、dog-symmetrical-hair-loss、dog-licking-paws、dog-seasonal-itch、dog-elimination-diet-snacks、dog-allergen-test、dog-itch-med-response。

## 28篇发布日期相同但未核实（全部缺修改日期）
cat-ckd-staging、cat-ckd-weight-loss、cat-creatinine-single-high、cat-daily-subcutaneous-fluids、cat-fast-breathing-after-fluids、cat-home-subcutaneous-fluid-training、cat-litter-change-not-using-box、cat-moving-house-urination-plan、cat-renal-diet-refusal、cat-subcutaneous-fluid-lump、cat-urinary-stoma-home-care、dog-aki-follow-up、dog-gallbladder-abnormality、dog-hematuria-urine-sample、dog-house-soiling-or-urinary-problem、dog-jaundice、dog-kidney-values-and-urinalysis、dog-liver-enzymes-long-term-meds、dog-liver-nodule、dog-post-neuter-incontinence、dog-proteinuria-monitoring、dog-renal-diet-refusal、dog-sleep-urine-leakage、dog-straining-to-urinate、female-cat-urinary-retention、multi-cat-litter-box-monitoring、recurrent-cat-urinary-second-opinion-records、senior-dog-urgency。

## 逐篇证据记录必须具备
- `canonicalSlug`与来源记录ID；首次实际公开日期、来源URL/正式发布或部署记录、核对人和核对日期。
- 最后一次**实质内容修改**日期、版本diff/正式记录、核对人和核对日期；仅Git提交日期不等于公开或修改日期。
- `medicalHold`、`releaseAuthorized`、`medicalReviewStatus`与正式兽医签署证据；不得仅凭空值、源码存在、站点级Founder开关放行。
- Founder逐篇发布授权与逐篇索引授权（分离记录），以及是否可进入候选sitemap。
- `lastModifiedAt`缺乏真实证据时，**不得**填入全站`UPDATED`；现有Draft `buildApprovedQaSitemap`会拒绝缺失或无效的`lastModifiedAt`，但并不能自行证明所填日期真实。

## 分阶段验收
1. 证据核对：40篇逐篇填写来源，不得自动把现有`published`值认定为真实。
2. 医学/权限核对：真实兽医签署与Founder授权单独核实；Hold始终阻断。
3. Draft代码审查：发布日期、修改日期、Article JSON-LD、HTML显示、sitemap lastmod和robots使用一致且可回退的记录。
4. Founder另行批准生产合并、部署及索引策略变更；未经授权只保留Draft。
