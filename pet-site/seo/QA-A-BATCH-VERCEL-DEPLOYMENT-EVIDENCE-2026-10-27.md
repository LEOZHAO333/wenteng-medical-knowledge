# 日宠通A批12篇：Vercel生产部署证据交叉核验（2026-10-27）

## 本轮新取得的直接证据

通过已连接的Vercel项目 `japanmedai-pet`（项目ID `prj_OZu4aM2xmgUaB63gVHau1xrDEOe5`），读取其正式生产部署列表，逐条关联GitHub相应提交中的 `pet-site/api/pet.js` 源码。

**目前查询到的最早成功生产部署**：

- 部署ID：`dpl_ApyrtcBBeThVq2aEWqbeQFWvHDqj`
- Vercel部署创建时间：`2026-10-17T09:07:32.752Z`（日本时间2026-10-17 18:07:32）
- 状态：`READY`，目标环境：`production`
- 对应GitHub SHA：`4fa4696cca1bffd61fb6349be0ef63cbe71dccde`
- 提交摘要：`Merge 日宠通 pet knowledge site MVP`
- 该SHA中的 `pet-site/api/pet.js` 包含A批全部12个Slug。

另核对：
- `dpl_2Pbhv44dbc9Pwqwf5psMrzZNPTLT`，2026-10-17 18:14:55日本时间，`READY`，SHA `37e518c45bb3aefc2d7972d4d411d71599c3a9e4`，同样包含12篇。
- `dpl_3SMAtbckbG4tGsHA4fDcFEh28YHd`，2026-10-17 18:16:08日本时间，`READY`，SHA `5388a9273c7f35540fd8acd9984913dec3509fe9`，同样包含12篇。
- `dpl_E1GYKUQskzHnxn28XCkTwGgEEVHq`，2026-10-17 18:30:48日本时间，`READY`，SHA `64a120e8f61ba7d33fd2392c559db7567d102a4c`，同样包含12篇。

## 12篇逐条交叉核验

| # | Slug | 最早成功生产部署对应源码 | 真实首次公开HTTP证据 |
|---:|---|---|---|
| 1 | cat-dandruff | 存在 | 待核 |
| 2 | cat-belly-hair-loss | 存在 | 待核 |
| 3 | cat-ear-thinning | 存在 | 待核 |
| 4 | cat-tail-greasy | 存在 | 待核 |
| 5 | cat-chin-blackheads | 存在 | 待核 |
| 6 | dog-dandruff-itching | 存在 | 待核 |
| 7 | dog-symmetrical-hair-loss | 存在 | 待核 |
| 8 | dog-licking-paws | 存在 | 待核 |
| 9 | dog-seasonal-itch | 存在 | 待核 |
| 10 | dog-elimination-diet-snacks | 存在 | 待核 |
| 11 | dog-allergen-test | 存在 | 待核 |
| 12 | dog-itch-med-response | 存在 | 待核 |

## 证据解释与阻断

- `READY` 是Vercel部署状态，不能独立证明该部署当时已经绑定正式域名、12个URL都返回HTTP 200、内容已公开可访问或首次公开日期。
- `created` 是部署创建时间，不是逐篇 `datePublished`；若要填写真实首次公开日期，还需核对该版本实际响应、域名分配时间及更早历史。
- 本轮没有核验逐篇真实兽医签署或Founder索引批准；这些字段继续 `not_verified`。
- 没有修改生产 `pet-site/api/pet.js`、sitemap、robots、noindex，也没有部署或自动发布。
- 本轮Vercel列表返回19条正式生产部署，当前最早成功记录是2026-10-17 18:07日本时间；这不等于可证明更早不存在其他公开来源。

**当前结论：** A批12篇在2026-10-17 18:07日本时间的成功生产部署对应源码中已存在。真实逐篇首次公开日期和修改日期仍待直接证据核验。
