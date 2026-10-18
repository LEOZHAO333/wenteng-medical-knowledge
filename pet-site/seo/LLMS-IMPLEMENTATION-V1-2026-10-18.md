# 日宠通 AI 内容读取协议｜llms.txt V1.0

日期：2026-10-18  
唯一品牌域名：`https://pet.japanmedai.com/`  
状态：Draft / Founder正式上线审批独立 / 兽医Medical Approved未获证实 / 保持noindex

## 为什么独立建设

仓库根目录的 `/llms.txt` 属于 JapanMed AI 医疗情报采集与研究层，明确指向人类医疗内容。**它不是日宠通的官网AI导航**。宠物站的Vercel Root Directory是 `pet-site/`，其已存在 `/llms.txt` 动态路由，但旧版列出了12条仍无执业兽医审核的文章链接，且未形成独立、可长期维护的品牌文档。

## 这次交付的两个官网文件

1. `pet-site/llms.txt`（最终地址 `https://pet.japanmedai.com/llms.txt`）：按llmstxt.org建议的H1、blockquote、H2链接目录格式，标明唯一品牌、运营方、猫/犬/问答/关于路径、医学审核和索引状态。
2. `pet-site/llms-full.txt`（最终地址 `https://pet.japanmedai.com/llms-full.txt`）：详细列出物种边界、医学风险、资料来源支持范围、日本MAFF/NVAL产品级批准核查、合理引用与不能外推的内容。

这两个文件都是对外的品牌和来源导航，不包括未经医学批准的582条内部草稿目录、不编造产品批准或商业服务能力、不改变任何页面已设定的noindex资格。

## 站点可用性与同步方案

- `pet-site/api/pet.js` 的两个同名端点提供与Markdown原稿**完全相同**的纯文本内容，以兼容原有动态路由。
- `pet-site/llms.txt` 和 `pet-site/llms-full.txt` 也是可能由Vercel文件系统优先服务的静态文件。因此在 `pet-site/vercel.json` 中针对两个路径分别设置 `X-Robots-Tag: noindex, follow` 与 `Content-Type: text/plain; charset=utf-8`，无论选择静态还是动态响应均维持安全意图。
- 站内HTML页面增加 `<link rel="describedby" href="https://pet.japanmedai.com/llms.txt">`，帮助能识别此关系的工具定位完整说明，不代表搜索引擎必须抓取它。
- `pet-site/seo/audit-llms.mjs` 用 Node 模拟真实API请求，比较静态原稿与动态HTTP body 的字节内容，检查noindex、官方唯一域名、不链接待审问答原文、普通404路由不被破坏。
- 通过 `.github/workflows/pet-geo-seo-audit.yml` 在 PR变更这些文件时自动运行只读QA；此Action不部署，不合并、不批准医学内容。
- **更新流程**：每次编辑llms原稿时，必须同时同步API镜像；CI若不一致会报错。后续需要动态生成时，可在获得相应技术审批后以单一来源编译替代双份同步。

## 正式部署前后的验收清单

- GitHub CI必须在对应最新HEAD为Success；
- Vercel Preview：HTTP 200、`text/plain; charset=utf-8`、`X-Robots-Tag: noindex`、中文无乱码、两个文件内容与原稿一致；
- 首页HTML存在 `rel=describedby`，且canonical仍为 `pet.japanmedai.com`；
- 检查是否把日本动物用药“研究/批准/上市”概念混淆，及是否把人类医疗站混入兽医正文；
- 正式合并/生产部署、解除noindex或推广仍须依Founder既定审批制度，不能仅凭文件检查通过自行执行。

## 对SEO/GEO效果的审慎表述

`llms.txt` 是开放的AI阅读建议格式，而非能强制所有大模型、Google等服务采纳的权威索引机制。它可以减少品牌与栏目识别混乱，不能承诺收录、排名、AI引用率或转化。
