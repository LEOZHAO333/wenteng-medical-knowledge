# 日宠通 SEO / Slug / 内链一致性审计｜Batch 01

日期：2026-10-17
状态：Draft / noindex / 不上线

## 一、审计对象

本批先核对 `pet-site/api/pet.js` 内嵌的12个MVP文章，与已经完成的S/A级知识库正文是否存在：
- 同题重复内容；
- slug不一致；
- 两套正文成为两个“事实源”；
- 后续内链难以稳定指向唯一永久页。

## 二、结论

**发现12个MVP文章全部已经在正式知识库节点中存在。**

因此 `pet.js` 当前内嵌正文不应继续作为独立内容源。上线前必须改成：

> `ID = 唯一主键` → `canonicalSlug = 唯一永久slug` → 页面从统一内容库读取。

不要让 `pet.js` 与 Markdown 主库各自维护一份正文，否则后续医学修订会出现一边更新、一边遗漏。

## 三、12个MVP节点映射

| ID | 题目 | pet.js 当前slug | 知识库 canonical slug | 结果 |
|---|---|---|---|---|
| 0282 | 猫身上有皮屑，是洗澡少了吗？ | `cat-dandruff` | `cat-dandruff-causes` | **不一致** |
| 0283 | 猫肚子两边秃了，是自己舔掉的吗？ | `cat-belly-hair-loss` | `cat-belly-hair-loss` | 一致 |
| 0284 | 猫耳朵后面毛很稀，什么变化需要看医生？ | `cat-ear-thinning` | `cat-thin-hair-behind-ears` | **不一致** |
| 0285 | 猫尾巴根部油腻结块，能直接洗掉吗？ | `cat-tail-greasy` | `cat-greasy-tail-base` | **不一致** |
| 0286 | 猫下巴有黑点，换饭碗就够了吗？ | `cat-chin-blackheads` | `cat-chin-blackheads` | 一致 |
| 0292 | 狗皮屑多还很痒，洗得勤会更好吗？ | `dog-dandruff-itching` | `dog-dandruff-itching` | 一致 |
| 0293 | 狗左右对称掉毛，为什么医生可能建议验血？ | `dog-symmetrical-hair-loss` | `dog-symmetrical-hair-loss` | 一致 |
| 0301 | 狗每天舔脚，可能只是无聊吗？ | `dog-licking-paws` | `dog-licking-paws` | 一致 |
| 0304 | 狗每年同一季节都痒，怎样整理发作记录？ | `dog-seasonal-itch` | `dog-seasonal-itch-record` | **不一致** |
| 0306 | 狗做排除饮食试验时，家人偷偷喂零食会影响吗？ | `dog-elimination-diet-snacks` | `dog-elimination-diet-snacks` | 一致 |
| 0307 | 狗查了过敏原，是不是照单避开就能不痒？ | `dog-allergen-test` | `dog-allergen-test` | 一致 |
| 0308 | 狗用止痒药后好转，能说明病因已经找到了吗？ | `dog-itch-med-response` | `dog-itch-med-response` | 一致 |

统计：
- 同题重复正文：12/12
- slug一致：8
- slug不一致：4
- 当前属于预发布阶段，无需为这4个旧slug保留SEO历史权重；正式上线前应统一。

## 四、上线前修复方案

### 1. ID作为唯一主键
所有页面数据必须带四位ID，例如：
- `0282`
- `0304`

标题可优化，slug可在上线前最终调整，但ID永远不变。

### 2. canonicalSlug只保留一份
建议以S/A正文库中已经建立的slug作为 canonicalSlug。

4个需要统一的MVP slug：
- `cat-dandruff` → `cat-dandruff-causes`
- `cat-ear-thinning` → `cat-thin-hair-behind-ears`
- `cat-tail-greasy` → `cat-greasy-tail-base`
- `dog-seasonal-itch` → `dog-seasonal-itch-record`

目前未上线、强制noindex，所以应在上线前直接统一，而不是人为制造4个历史跳转页面。

### 3. pet.js停止保存第二份医学正文
后续正式架构应改为：

`RiChongTong_Pet_GEO_Master / content source` → `renderer` → `/pet/...`

`pet.js` 只承担路由/渲染，不再人工维护另一套 answer/body。

### 4. 内链用 relatedIds，不直接写死URL
推荐字段：

```text
id: 0282
canonicalSlug: cat-dandruff-causes
cluster: skin-coat
relatedIds: [0288, 0290, 0297]
```

页面生成时再把 `relatedIds` 解析成当前 canonical URL。这样以后改slug，不会造成数百篇正文里的硬编码死链。

## 五、内链规则

每个正式节点上线前至少配置：
1. 1个专题Hub链接；
2. 2–4个同主题相关问题；
3. 1个“何时就医/急症”相关节点（适用时）；
4. 日本专题仅在真正相关时链接，不为了品牌强塞“日本”。

禁止：
- 循环堆砌十几个“相关阅读”；
- 所有页面都链回同一个商业入口；
- 用同一锚文本批量机械内链；
- 把药品销售页当医学来源页。

## 六、本批审计结果

**PASS with fixes required**

- 发现双内容源风险：1项（结构性）
- MVP重复主题：12项
- slug不一致：4项
- 正式发布前必须修复：是
- 当前立即上线风险：无，因为仍为 Draft + noindex + 未部署

下一批：对 `A-TIER-BATCH-01～19` 与 `S-TIER-*` 做 ID/slug 唯一性抽检，并开始建立 cluster / relatedIds 内链表。