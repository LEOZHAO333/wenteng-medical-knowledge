# 日宠通生产Article日期第二轮审计｜2026-10-27

## 本轮直接读取的事实
源：`pet-site/api/pet.js`，Draft分支只读核查，未修改生产文件。

- 渲染问答总数：40。
- 12篇开头问答无`published`，详见`ARTICLE-DATE-EVIDENCE-GAPS-2026-10-27.md`。
- **其余28篇全部有`published: "2026-10-15"`**；此为源码值，不等于已核实首次公开日期。
- 40篇未见逐篇`modified`。
- 站点级`UPDATED = '2026-10-17'`不能替代逐篇日期。
- 页面Article JSON-LD有条件输出日期字段，故无日期时不会自动补写。
- 生产索引资格按Slug存在及核心栏目判断，尚未逐篇核对真实兽医签署与Founder授权；不得将日期审计视作医学批准。

## 28篇相同日期的待核验Slug
| # | Slug | 源码published | 证据状态 |
|---:|---|---|---|
| 1 | cat-ckd-staging | 2026-10-15 | 待逐篇证实 |
| 2 | cat-ckd-weight-loss | 2026-10-15 | 待逐篇证实 |
| 3 | cat-creatinine-single-high | 2026-10-15 | 待逐篇证实 |
| 4 | cat-daily-subcutaneous-fluids | 2026-10-15 | 待逐篇证实 |
| 5 | cat-fast-breathing-after-fluids | 2026-10-15 | 待逐篇证实 |
| 6 | cat-home-subcutaneous-fluid-training | 2026-10-15 | 待逐篇证实 |
| 7 | cat-litter-change-not-using-box | 2026-10-15 | 待逐篇证实 |
| 8 | cat-moving-house-urination-plan | 2026-10-15 | 待逐篇证实 |
| 9 | cat-renal-diet-refusal | 2026-10-15 | 待逐篇证实 |
| 10 | cat-subcutaneous-fluid-lump | 2026-10-15 | 待逐篇证实 |
| 11 | cat-urinary-stoma-home-care | 2026-10-15 | 待逐篇证实 |
| 12 | dog-aki-follow-up | 2026-10-15 | 待逐篇证实 |
| 13 | dog-gallbladder-abnormality | 2026-10-15 | 待逐篇证实 |
| 14 | dog-hematuria-urine-sample | 2026-10-15 | 待逐篇证实 |
| 15 | dog-house-soiling-or-urinary-problem | 2026-10-15 | 待逐篇证实 |
| 16 | dog-jaundice | 2026-10-15 | 待逐篇证实 |
| 17 | dog-kidney-values-and-urinalysis | 2026-10-15 | 待逐篇证实 |
| 18 | dog-liver-enzymes-long-term-meds | 2026-10-15 | 待逐篇证实 |
| 19 | dog-liver-nodule | 2026-10-15 | 待逐篇证实 |
| 20 | dog-post-neuter-incontinence | 2026-10-15 | 待逐篇证实 |
| 21 | dog-proteinuria-monitoring | 2026-10-15 | 待逐篇证实 |
| 22 | dog-renal-diet-refusal | 2026-10-15 | 待逐篇证实 |
| 23 | dog-sleep-urine-leakage | 2026-10-15 | 待逐篇证实 |
| 24 | dog-straining-to-urinate | 2026-10-15 | 待逐篇证实 |
| 25 | female-cat-urinary-retention | 2026-10-15 | 待逐篇证实 |
| 26 | multi-cat-litter-box-monitoring | 2026-10-15 | 待逐篇证实 |
| 27 | recurrent-cat-urinary-second-opinion-records | 2026-10-15 | 待逐篇证实 |
| 28 | senior-dog-urgency | 2026-10-15 | 待逐篇证实 |

## 日期修复门槛
1. 查每篇首次公开的正式部署、页面快照或CMS发布记录；Git提交时间只可辅助排查，不能自动等同公开时间。
2. 查每篇最后实质内容修改的可追溯版本记录；无证据则保持`modified`缺失。
3. 仅在证据成立后提交独立生产修复PR，核对可见日期与JSON-LD一致；由Founder批准合并部署。
4. 12篇缺日期与28篇待核日期分开统计；**不得批量补成2026-10-15或2026-10-17**。
5. 不修改`pet-site/api/pet.js`、索引白名单、robots、sitemap、noindex，不授予Medical Approved。

## 重要优先级
P0生产发布/索引资格缺少逐篇医学签署检查，风险高于P1日期元数据。当前应继续在Draft建立只读审计与可核对交接材料，不能把静态CI成功写成“40篇已批准公开”。
