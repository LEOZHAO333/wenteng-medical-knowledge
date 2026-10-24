# 日宠通唯一品牌域名 / 正式决议（2026-10-18）

## Founder确认

「https://pet.japanmedai.com/ 确定为『日宠通』的唯一品牌入口。」

- 独立品牌：**日宠通｜日本宠物健康知识站**。
- 对外首页：**https://pet.japanmedai.com/**，规范HTTPS、末尾斜杠。
- 品牌关联：运营方文腾株式会社，主站 `https://www.japanmedai.com/` 负责人类医疗与日本专家二次意见；两站知识、导航、统计、SEO和医学审稿分离。
- 站内路径按根URL构造 `/qa/<slug>/`、`/cat/`、`/dog/`，不以主站 `/pet/` 作为权威URL。Logo、页眉、页脚、分享链接、canonical和组织/WebSite结构化数据在各自站点保持一致。
- 索引授权**完全独立**：当前宠物站 `INDEX_APPROVED=false`，`INDEX_ELIGIBLE_PATHS` 空集合，继续 `noindex`；确定品牌域名不等于医学审核、不等于同意发布582条草稿或解除noindex。

## 历史迁移的安全闸门

主站有28条旧 `/pet/*.html` 文章重定向规则，而当前日宠通生产代码仅维护12个新问答slug，没有包含上述28个目标文章slug。若贸然将旧主站路径改为新站对应文章，将返回404风险。迁移须先**逐页恢复/验证目标200和原文对应**，再一对一设置301；保留原本有意义的深链接，不得一律跳到首页。

相关主站草稿审核文档：`LEOZHAO333/japan-medical-second-opinion/docs/HOME-V3-PET-DOMAIN-DECISION-2026-10-18.md` 与 `docs/PET-URL-MIGRATION-AUDIT-2026-10-18.md`。

## 允许自动执行和不可越权

按照已批准SOP：GPT可更新草稿中的标准、所有权与引用一致性、历史文章映射表和只读检查脚本；不需要逐次请示。**但不得因本域名决议自动合并、部署、改生产redirect、解除noindex、发布外部内容或赋予Medical Approved。** 这些事项仍按Founder和合资格兽医独立审批。
