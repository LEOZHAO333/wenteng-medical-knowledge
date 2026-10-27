# 日宠通生产问答 Article 日期证据缺口｜2026-10-27（只读核对）

## 范围与结论
- 源文件：`pet-site/api/pet.js`（只读，未修改）。
- 既有审计记录：40条渲染问答，28条有`published`，12条无`published`，40条均无`modified`。
- 本轮直接读取生产渲染器源文件，核实开头12条问答的`published`与`modified`均缺失；下列12条slug与原文件对应。其余28条的真实日期来源仍待逐条追溯。
- 该文件中`UPDATED = '2026-10-17'`为站点级变量，不是逐篇可证明的发布日期/修改日期；不得自动批量填充。
- **未验证GSC、百度真实收录、线上HTML或搜索引擎富结果**。

## 已确认12条发布日期缺失（且修改日期缺失）
| 序号 | Slug | published | modified |
|---:|---|---|---|
| 1 | cat-dandruff | 缺 | 缺 |
| 2 | cat-belly-hair-loss | 缺 | 缺 |
| 3 | cat-ear-thinning | 缺 | 缺 |
| 4 | cat-tail-greasy | 缺 | 缺 |
| 5 | cat-chin-blackheads | 缺 | 缺 |
| 6 | dog-dandruff-itching | 缺 | 缺 |
| 7 | dog-symmetrical-hair-loss | 缺 | 缺 |
| 8 | dog-licking-paws | 缺 | 缺 |
| 9 | dog-seasonal-itch | 缺 | 缺 |
| 10 | dog-elimination-diet-snacks | 缺 | 缺 |
| 11 | dog-allergen-test | 缺 | 缺 |
| 12 | dog-itch-med-response | 缺 | 缺 |

## 修复前置条件
1. 从正式发布时间记录、部署记录及经核对的逐篇历史取得日期证据；不得把文件Git提交时间直接等同于公开发布日期。
2. 每篇登记：slug、首次公开日期证据URL或记录ID、最后实际内容修改日期证据、审核人、核对日期、结论。
3. 对有真实日期的条目，提出单独生产变更供Founder批准；确保Article JSON-LD与页面可见日期一致。
4. 对没有证据的条目，保持字段缺失并标记待核，不编造日期、不自动修改生产渲染器。
5. 医学Hold/发布资格问题与日期元数据问题分开；SEO日期修复不能授予Medical Approved。

## 下一项
- 继续逐条核对28条现有`published`字段的证据来源，不能仅因字段存在就认定真实。
- 先解决生产渲染器逐篇医学签署/索引资格缺口的独立设计审核，再实施生产变更。
