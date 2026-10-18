# 日宠通 AI 内容读取协议｜llms.txt V1.0

日期：2026-10-18  
唯一品牌域名：`https://pet.japanmedai.com/`  
状态：Draft，PR #15 暂停合并/上传；Founder 已批准 PR #13 目标开放收录策略，但 PR #13 尚未合并部署；兽医 Medical Approved 未获证实。两份 llms AI 文本文件独立保留 noindex。

## 为什么独立建设

仓库根目录的 `/llms.txt` 属于 JapanMed AI 医疗情报采集与研究层，明确指向人类医疗内容。**它不是日宠通的官网AI导航**。宠物站的Vercel Root Directory是 `pet-site/`，其已存在 `/llms.txt` 动态路由，但旧版列出了12条仍无执业兽医审核的文章链接，且未形成独立、可长期维护的品牌文档。

## 这次交付的两个官网文件

1. `pet-site/llms.txt`（最终地址 `https://pet.japanmedai.com/llms.txt`）：按llmstxt.org建议的H1、blockquote、H2链接目录格式，标明唯一品牌、运营方、猫/犬/问答/关于路径、医学审核和索引状态。
2. `pet-site/llms-full.txt`（最终地址 `https://pet.japanmedai.com/llms-full.txt`）：详细列出物种边界、医学风险、资料来源支持范围、日本MAFF/NVAL产品级批准核查、合理引用与不能外推的内容。

这两个文件都是对外的品牌和来源导航，不包括未获医学签署的582条内部草稿目录、不编造产品批准或商业服务能力；不修改站点原有索引白名单。**Founder 已批准开放收录（Production 白名单页面 index,follow；/new-drugs/ 和 Preview noindex），由 PR #13 实现，不能再描述为整站永久 noindex。** PR #13 目前待合并部署。两个AI文本文件本身仍保留 noindex，不影响其他页面的索引决定。

## 站点可用性与同步方案

- `pet-site/api/pet.js` 的两个同名端点提供与Markdown原稿**完全相同**的纯文本内容，以兼容原有动态路由。
- `pet-site/llms.txt` 和 `pet-site/llms-full.txt` 也是可能由Vercel文件系统优先服务的静态文件。因此在 `pet-site/vercel.json` 中针对两个路径分别设置 `X-Robots-Tag: noindex, follow` 与 `Content-Type: text/plain; charset=utf-8`，无论选择静态还是动态响应，这两个AI文本资源自身都保持 noindex；这不意味着整站 noindex。
- 站内HTML页面增加 `<link rel="describedby" href="https://pet.japanmedai.com/llms.txt">`，帮助能识别此关系的工具定位完整说明，不代表搜索引擎必须抓取它。
- `pet-site/seo/audit-llms.mjs` 用 Node 模拟真实API请求，比较静态原稿与动态HTTP body 的字节内容，读取实际 pet.js 的 INDEX_APPROVED 收录策略，并分别模拟 Production/Preview，核对现有代码中的白名单栏目、文章、404、new-drugs 和 sitemap；同时检查两个AI资源单独 noindex、官方唯一域名、未批准的深链未被AI文件当作可推荐诊疗方案及404路由。
- 通过 `.github/workflows/pet-geo-seo-audit.yml` 在 PR变更这些文件时自动运行只读QA；此Action不部署，不合并、不批准医学内容。
- **更新流程**：每次编辑llms原稿时，必须同时同步API镜像；CI若不一致会报错。后续需要动态生成时，可在获得相应技术审批后以单一来源编译替代双份同步。

## 正式部署前后的验收清单

- GitHub CI必须在对应最新HEAD为Success；
- Vercel Preview：两个 AI 文本文件 HTTP 200、`text/plain; charset=utf-8`、其自身 `X-Robots-Tag: noindex`、中文无乱码；**其他 Preview 页面保持 noindex**，与两个文件独立。
- 首页HTML存在 `rel=describedby`，且canonical仍为 `pet.japanmedai.com`；
- 检查是否把日本动物用药“研究/批准/上市”概念混淆，及是否把人类医疗站混入兽医正文；
- PR #13 尚未合并时不得重写或覆盖其索引白名单、`sitemap()` 和 `robots.txt`；等其合并后，以新main为基准再集成PR #15的文档与路由变更并复跑CI。**本PR当前暂停上传，即使CI通过也不能合并或部署，需Claude复审及Founder再次批准。**

## 对SEO/GEO效果的审慎表述

`llms.txt` 是开放的AI阅读建议格式，而非能强制所有大模型、Google等服务采纳的权威索引机制。它可以减少品牌与栏目识别混乱，不能承诺收录、排名、AI引用率或转化。
