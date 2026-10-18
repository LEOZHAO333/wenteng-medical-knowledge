# 日宠通｜2026-10-18 GEO/SEO 现状审计与上线验收

## 核验范围
基于 GitHub 主分支的 pet-site/api/pet.js、pet-site/vercel.json、2026-10-17 医学核验队列及 PR #7。**本审计不是线上公开URL抓取测试**，外部检查尚未验证域名可正常访问。

## 现成资产
- 独立 /pet/ 首页、猫/狗、问答、新药占位、关于页、www canonical、OG、JSON-LD、sitemap.xml、llms.txt、相关链接；
- S/A级 Markdown 内容、编辑来源核对、ID/slug/clusterKey/relatedIds 专项审计；
- 已有380节点编辑层来源核对，Medical Approved=0，publish_ready=0（不能当作380篇已上线文章）；
- PR #7 仍为 open，含首页修改和索引开关 INDEXABLE=false，未合并。

## 技术待办与验收口径

| 级别 | 发现（以当前main为准） | 验收标准 |
|---|---|---|
| P0 | meta robots及X-Robots-Tag当前强制noindex | 保留noindex；Founder批准、Production与医学放行后才可开放；Preview永久noindex |
| P0 | sitemap() 当前列出全部现有文章和新药空栏目 | 上线版本只包括已发布且允许索引页面，未核实的新药单页/空栏目不进入可索引Sitemap |
| P0 | Article 的 dateModified 和所有 sitemap lastmod 使用同一常量日期 | 每页维护真实首次发布日期和实质修改日期；禁止伪更新 |
| P0 | 现有前台页面与数百条内容草稿尚未有统一的状态映射 | 导出一份ID→slug→原文→来源→医学审核→上线状态台账；没有审核不生成公开页 |
| P0 | 日本新药尚有官方产品核验pending/hold | 逐产品NVAL/MAFF + 现行电子添文核验，明确物种、适应症、批准日期与来源 |
| P1 | 相关链接按species/topic自动取前4条，未依完整relatedIds表 | 只有审核通过且真实存在的目标可内链，不得错链或跨物种误导 |
| P1 | 所有页面meta统一og:type=article | 首页用website，其余按页面类型设置；结构化数据与正文一致 |
| P1 | 缺已验证的生产响应和索引观测 | 验证HTTP状态、robots、canonical、Sitemap、JSON-LD、移动端和站内搜索 |
| P2 | llms.txt存在但不是Google正式索引要求 | 可保留导航作用，不作为GEO流量承诺 |
| P2 | 没有日宠通独立的搜索/AI引用监测基线 | 建立Search Console、Bing及人工可核验AI引用样本报告 |

## 上线质量闸门
1. 身份：唯一id、slug、canonical，避免题目近似造成重复页。
2. 证据：来源可核验、核对日期与适用范围真实，紧急信号明确。
3. 医学：真实具名兽医审查通过；不得将编辑来源复核冒充医学审稿。
4. 新药：每个具体产品单独官方核实，未证实不称日本已批准。
5. 索引：只发布且收录已允许的页面，robots+HTTP头+sitemap一致。
6. 授权：合并main、上线、解除noindex与改变首页/品牌，需要Founder明确批准。

## 当前可执行范围
- 将已有380条编辑核对记录逐批映射为可机器检查的元数据，**不复制正文、不过度声称可发布**。
- 当日猫皮肤及耳部Q&A先查重、匹配旧ID/slug，属于扩充则Draft，不新增未经审核的公开URL。
- 用 node pet-site/seo/audit.mjs path/to/catalog.json 检查导出元数据；加 --full 检查全库relatedIds。
- 交接技术整改到PR #7或独立后续代码PR；本治理PR不修改前台、不部署。

## 已进行的检查
离线使用1条测试草稿：0错误；把未审核草稿强行标成已公开可索引：触发6项错误并拒绝放行。**脚本测试不等于医学审稿或上线验收。**
