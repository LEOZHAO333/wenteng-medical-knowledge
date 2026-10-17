# 日宠通 A级清库审计｜2026-10-17

状态：Content Build Only / Draft / noindex / 不上线
分支：`pet-site-v1`
PR：#3（Draft / Open / 未合并）

## 一、审计范围
本次仅审计已经进入 priority 清单的A级节点，不包含：
- B级4个补充节点；
- 尚未进入猫狗主框架的异宠60题；
- 未来新增的新药/品牌/产品级内容；
- S级是否已全部完成医学审核。

对照文件：
- `PET-CONTENT-PRIORITY.md`
- `ROUND3-EYE-HEART-ONCOLOGY-PRIORITY.md`
- `ROUND4-EAR-DENTAL-RESPIRATORY-SENIOR-PRIORITY.md`
- `ROUND5-ENDOCRINE-JOINT-NEURO-EMERGENCY-PRIORITY.md`
- `ROUND5-PARASITE-VACCINE-YOUNG-SURGERY-PRIORITY.md`
- `ROUND6-GROOMING-HOME-TRAVEL-BEHAVIOR-PRIORITY.md`
- `ROUND7-MEDS-LABS-COMMS-REPRO-PRIORITY.md`
- `ROUND9-MULTIPET-INFECTION-GI-NUTRITION-PRIORITY.md`
- `ROUND10-BREED-JAPAN-REHAB-TOOLS-PRIORITY.md`
- `A-TIER-BATCH-01` ～ `A-TIER-BATCH-18`

## 二、A级应有总数
按 priority 文件统计：

| 来源 | A级数量 |
|---|---:|
| 初始 PET priority | 34 |
| Round 3 眼病/心脏/肿瘤 | 30 |
| Round 4 耳病/牙科/呼吸/老年 | 40 |
| Round 5 内分泌/关节/神经/急症 | 36 |
| Round 5 驱虫/疫苗/幼宠/手术 | 50 |
| Round 6 美容/家居/旅行/行为 | 40 |
| Round 7 用药/检查/沟通/繁殖 | 40 |
| Round 9 多宠/感染/肠胃/营养 | 40 |
| Round 10 品种/日本医疗/康复/工具 | 40 |
| **合计** | **350** |

## 三、正文完成情况
### 审计前
`A-TIER-BATCH-01` ～ `A-TIER-BATCH-18` 共形成 **346篇** A级完整正文。

### 发现的唯一数量缺口
Round 3 的眼病A级原有10题，但此前只进入正文6题，漏掉4题：
- **0352** 狗眼屎发黄发绿，要带它检查吗？
- **0358** 狗用两种眼药，间隔和顺序怎么问清楚？
- **0359** 狗做完眼睛手术，头套什么时候能摘？
- **0360** 给宠物擦泪痕，怎样避免刺激眼周皮肤？

这4题在 priority 中存在，但在原 Batch 01–18 中没有A级完整正文。

### 已修复
新增：`A-TIER-BATCH-19-EYE-GAPS.md`

修复后：
- 应有A级：**350**
- 已有A级完整正文：**350**
- 未成正文：**0**
- 数量差额：**0**

## 四、重复审计
按专题编号区间、priority映射与 Batch 01–19 分工检查：
- 未发现需要删除的A级重复占位；
- 各批次主题边界明确，没有发现同一A级ID被两个Batch重复作为正式正文占位；
- 旧百家号迁移内容若与1000问节点主题重合，继续按“合并到唯一ID，不另起重复永久页”的原则处理。

结论：**当前A级正文库已完成ID层面的清库。**

## 五、重要：正文完成 ≠ 医学 Approved
本次“清库完成”只表示A级节点都有完整正文草稿，不代表全部已经完成兽医医学审核。

上线前仍需按风险分层：

### Medical Review Required
以下专题建议进入医学复核队列后才可标记 Approved：
- 眼科用药、眼科术后；
- 心脏病；
- 肿瘤与舒适照护；
- 呼吸系统；
- 耳病、牙科；
- 内分泌、糖尿病；
- 关节/疼痛；
- 神经症状与癫痫；
- 外伤、中毒与急症；
- 驱虫、疫苗；
- 麻醉、手术、术后；
- 处方药、抗菌药、激素；
- 化验、影像、病理；
- 繁殖急症；
- 感染性疾病与检测；
- 日本宠物药、日本新疗法、海外第二意见。

### Official Japan Verification Required
凡涉及以下内容，必须在发布前逐条核对日本官方资料：
- 日本宠物药批准状态；
- 适用犬/猫；
- 年龄/体重限制；
- 适应症；
- 剂型、浓度、规格；
- 处方属性；
- 说明书禁忌/警示；
- 新适应症或批准日期。

优先官方来源：NVAL / MAFF；不得用旧百家号文章或商业页面替代当前官方标签。

## 六、编辑完成但仍不可上线的原因
目前网站仍保持：
- Draft PR；
- `noindex`；
- 不部署；
- 不生成公开URL；
- 不接 JapanMed AI 首页；
- 不设置购买、咨询、处方、跨境宠物医疗转化入口。

A级“清库”完成后，下一阶段应从“继续写更多”切换到：
1. 医学复核队列；
2. 来源核对；
3. 去重/内链；
4. URL/slug一致性；
5. 页面模板字段完整性；
6. 最后再做上线前抽检。

## 七、审计结论
**PASS（内容完整性层面）**

- A级计划节点：350
- A级完整正文：350
- A级正文缺口：0
- 已修复缺口：4
- 结构性重复：未发现
- 发布状态：仍为 Draft / noindex / 不上线

> 下一阶段不建议继续机械扩A级数量，优先进入“医学审核 + 来源核对 + 内链整理”阶段。
