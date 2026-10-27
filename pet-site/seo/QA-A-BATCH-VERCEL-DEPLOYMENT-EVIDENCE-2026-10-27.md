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

## 追加：正式域名绑定与网页访问证据（第二轮）

- Vercel项目域名列表显示 `pet.japanmedai.com` 的 `createdAt` 和 `updatedAt` 均为 `1792292306194`，即 **2026-10-18 11:58:26 JST**，`verified=true`。这是Vercel项目域名配置记录时间，不是DNS全球生效时间，也不是逐篇HTTP首次成功时间。
- 同项目默认域名 `japanmedai-pet.vercel.app` 的配置记录更早；因此不能把自定义域名绑定时间等同于该站所有形式的首次公开时间。
- 查询最早成功部署 `dpl_ApyrtcBBeThVq2aEWqbeQFWvHDqj` 的部署别名列表，返回空数组；这不是“历史上绝无域名访问”的证明，尤其不能排除默认部署URL。
- 尝试访问 `https://pet.japanmedai.com/qa/cat-dandruff` 与 `https://pet.japanmedai.com/qa/dog-itch-med-response`，当前网页读取工具均未能访问。**未获得HTTP状态码或响应头**；不得将工具访问失败记录为404、noindex、下线或未发布。
- 逐篇12/12历史HTTP 200、历史robots和X-Robots-Tag、首次公开日期仍然 **not_verified**。
- 保持生产页面、索引策略、正式日期字段、兽医签署和Founder批准不变。

**进一步核验所需：** 历史域名分配/访问日志或可访问的部署快照，附带URL、HTTP状态、响应时间、环境和部署SHA。单靠Vercel部署 `READY` 与项目域名配置 `verified` 不能推出逐篇正式发布日期。

## 第三轮：正式域名HTTP访问与现行索引实现核对

**网络验证结果（本轮实际请求）：** 从当前执行环境分别向以下URL发起HTTPS GET：
- `https://pet.japanmedai.com/qa/cat-dandruff`
- `https://pet.japanmedai.com/qa/dog-itch-med-response`
- `https://pet.japanmedai.com/robots.txt`
- `https://pet.japanmedai.com/sitemap.xml`

四次请求均在DNS名称解析阶段失败（`NameResolutionError`），**没有得到HTTP响应**，不能据此认定网站故障、返回404、页面不可公开或已/未被搜索引擎收录。当前环境的DNS限制应与网站真实服务状态分开记录。

**主分支源码独立复核：**
- `INDEX_APPROVED = true`，生产环境 `INDEXABLE` 为真时，`robotsFor` 依据 `INDEX_ELIGIBLE_PATHS.has` 决定 `index,follow`。
- `INDEX_ELIGIBLE_PATHS.has` 对所有存在于 `articles` 的 `qa/<slug>` 返回真，**没有逐篇兽医审签或Founder逐篇索引许可的检查**。
- `sitemap()` 在生产索引开关为真时，将全部 `articles` 追加至5个核心路径，且统一使用 `UPDATED = '2026-10-17'` 作为 `lastmod`。
- 源码注释声称“正式授权目录建立前索引资格为空”，但实际表达式仍按Slug存在与否放行，**注释与实现不一致**。这是待治理的生产索引策略缺口，不代表已实际抓取到线上HTTP头。
- 这些事实是**源码静态核验**，不是在线响应验证或兽医审核结果。

**建议P0交接：** 另开受控生产修复PR，将同一份逐篇批准目录用于HTML robots、HTTP X-Robots-Tag及sitemap，逐篇缺少正式兽医审签或Founder授权时默认不索引；保留5个核心页面的独立策略、`new-drugs` noindex、Preview及404 noindex。此修复涉及已上线生产行为，必须由Founder审核具体变更后另行授权合并和部署，本Draft仅记录证据，不触碰生产文件。
