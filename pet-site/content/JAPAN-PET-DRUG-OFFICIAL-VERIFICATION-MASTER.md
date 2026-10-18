# 日宠通｜日本宠物药官方核验主表

日期：2026-10-17
状态：official_japan_verification workflow / Draft / noindex / 不上线

## 一、官方来源框架（已核实）

日本具体动物用医药品的产品级信息，统一以以下官方来源为主：

1. **NVAL 动物用医药品等数据库**
   - https://www.vm.nval.go.jp/
   - 可按品名、制造销售业者、主成分、一般名、承认年月日、效能效果、用法用量、规制区分、使用上注意等字段检索。
2. **农林水产省・动物医药品检査所（NVAL）医药品等信息**
   - https://www.maff.go.jp/nval/iyakutou/
   - 官方说明：数据库收录取得制造销售承认等的动物用医药品/医药部外品信息，但更新可能存在时间差；若出现冲突或疑问，需进一步向官方/制造销售业者确认。
3. **电子添付文书**
   - https://www.maff.go.jp/nval/tenpubunsyo.html
   - 由动物用医药品等数据库检索现行电子添文；具体内容疑问可向制造销售业者确认。
4. **承认・审查信息**
   - https://www.maff.go.jp/nval/syonin_sinsa/
   - 用于新产品/新适应症、审查与部会议事等背景核对。

### 核验原则

出现以下任一内容，就不能只靠旧文章、医院宣传、电商页或搜索摘要：
- “日本已批准”
- 商品名 / 通用名 / 主成分
- 犬用 / 猫用 / 犬猫共用
- 具体疾病适应症
- 年龄、体重、品种限制
- 剂型、浓度、规格
- 用法用量
- 处方/规制区分
- 禁忌、重要警示、不良反应
- 批准日期 / 新增适应症

## 二、状态定义

- `framework_verified_official`：只讲“怎么核对日本宠物药”的方法，官方数据库框架已确认。
- `official_japan_verification_pending`：文章出现或准备出现具体产品事实，尚未逐项查NVAL/电子添文。
- `product_identity_missing`：旧稿只有“热门药/三大品牌/15款”标题，没有可核验的完整产品清单。
- `official_product_verified`：具体商品名、成分、物种、效能、规格、规制等已逐项核验并记录日期。
- `official_conflict_hold`：数据库、电子添文、制造商信息之间存在冲突/时效差，暂停发布。

> 当前没有任何旧产品盘点稿被标记为 `official_product_verified`。

## 三、现有日宠通节点核验队列

| Queue ID | 内容节点 | 触发点 | 当前状态 | 放行条件 |
|---|---|---|---|---|
| JPO-001 | 0659 日本宠物药和国内药名字不同，怎样核对是不是同一成分？ | 未来若举具体商品 | framework_verified_official | 只讲方法可保留；举例产品必须单品核验 |
| JPO-002 | 0655 网上买宠物药，怎样核对处方和产品信息？ | 日本产品批准/处方属性 | framework_verified_official | 不推荐购买渠道；具体日本产品转单品核验 |
| JPO-003 | 0881 想了解日本宠物治疗，怎样分清正规医疗和广告？ | 日本正规药/疗法判断 | framework_verified_official | 只使用官方监管/医院资质逻辑，不列未经核验产品 |
| JPO-004 | 0882 日本宠物药写着猫用，所有年龄的猫都适合吗？ | 物种/年龄/体重限制 | official_japan_verification_pending | 每个产品查电子添文限制 |
| JPO-005 | 0883 日本宠物药的日文说明，哪些信息必须翻译准确？ | 效能/用法/警示翻译 | framework_verified_official | 只讲字段；示例必须来自现行添文 |
| JPO-006 | 0884 日本兽医处方上的药名，怎样和现用药核对？ | 商品名→主成分→规格 | official_japan_verification_pending | 若出现具体药名，查NVAL/添文 |
| JPO-007 | 0885 看到日本有宠物新药，怎样确认它治疗的具体疾病？ | 批准适应症 | framework_verified_official | 具体新药必须查效能效果与批准信息 |
| JPO-008 | 0886 日本宠物新疗法报道，如何分清获批与临床研究？ | approval vs research | framework_verified_official | 不用媒体标题代替批准状态 |
| JPO-009 | 0898 宠物用日本药出现不适，主人应向谁报告和求助？ | 产品身份/不良反应 | official_japan_verification_pending | 具体产品先确认制造销售业者、添文和正式不良反应信息 |
| JPO-010 | 0899 给宠物找海外药之前，怎样先核对当地可用方案？ | 海外药/本地可替代 | framework_verified_official | 不提供购药/跨境药品转化入口 |

## 四、百家号旧产品稿｜继续阻断

### LEGACY-JP-001｜BJH-R-001
- 旧题：日本兽医怎么选狗狗驱虫药？三大热门品牌区别
- 状态：`product_identity_missing + official_japan_verification_pending`
- 原因：当前迁移记录未保留可核验的三款完整商品名/规格；不能猜品牌。
- 下一步：取得旧稿原文或产品清单 → 建三条独立产品记录 → NVAL逐项核验 → 再决定是否重写比较文。

### LEGACY-JP-002｜BJH-R-002
- 旧题：2026年最值得关注的15款日本犬用药
- 状态：`product_identity_missing + official_japan_verification_pending`
- 下一步同上；必须逐药核犬用适应症、规格、规制和现行添文。

### LEGACY-JP-003｜BJH-R-003
- 旧题：2026日本猫咪用药指南：15款值得关注的猫用药
- 状态：`product_identity_missing + official_japan_verification_pending`
- 风险备注：历史记录已明确存在犬/猫适用对象需要纠正的条目，因此不得整篇沿用旧结论。

### LEGACY-JP-004｜BJH-R-004
- 旧题：2026日本宠物药热门盘点：10款犬猫常见药物
- 状态：`product_identity_missing + official_japan_verification_pending`
- 原因：批量盘点型文章最容易把不同物种、规格和适应症混写，必须拆成单品后核验。

## 五、单品核验标准字段

每个具体日本宠物药建立一条唯一记录：

```text
productId
productNameJa
genericNameJa
activeIngredient
manufacturerMarketingAuthorizationHolder
targetSpecies
approvalDate
indicationJa
indicationZh
formStrength
ageWeightRestriction
doseAdministrationSummary
regulatoryClass
contraindicationsWarnings
adverseReactionSource
packageInsertUrl
nvalRecordUrl
lastOfficialVerifiedAt
officialJapanVerificationStatus
notes
```

### 翻译规则
- `効能又は効果`：不能扩大翻译为更宽病种。
- `用法及び用量`：知识库仅做准确理解，不提供个体化处方剂量。
- `使用上の注意`：禁忌、慎用和重要警示不得省略成营销摘要。
- “犬”“猫”“犬及び猫”严格按原文，不能因为同成分在人/另一物种有应用就自行扩适应。

## 六、发布闸门

任何具体日本宠物药页面若以下任一项未完成，不得进入 `publish_ready`：

1. 商品名和制造销售业者身份未确认；
2. 主成分/浓度/剂型未确认；
3. 适用物种未确认；
4. 批准效能效果未确认；
5. 规格/年龄/体重限制未确认；
6. 规制区分和重要警示未确认；
7. 没有保存NVAL记录或现行电子添文来源；
8. `lastOfficialVerifiedAt` 为空；
9. 仍依赖旧百家号、电商或二手媒体作为核心证据。

## 七、当前结论

- 日本官方核验框架：**已建立并确认官方入口**
- 具体产品级核验：**尚未把旧盘点稿放行**
- 4篇历史产品盘点：继续Hold
- 现阶段不虚构旧稿中的产品名，不为追求进度猜测品牌
- 下一步：随着取得明确商品名/规格，按“一个产品一条记录”连续核验，不再以整篇盘点文章作为最小审核单位


## 八、2026-10-18 续跑｜JPO-004 / 006 / 009 编辑风险核对

本轮读取 A-TIER-BATCH-17-BREED-JAPAN.md 内的 0882、0884、0898 原始正文，三题均未出现具体商品名、厂家、规格或具体产品批准断言。因此本次**仅完成三题产品事实触发审查**（不是具体药物NVAL单品核验，也不是新增三条全文医学证据复核），既有逐产品 official_japan_verification_pending 状态保留。严禁把此范围检查记为兽医Medical Approved。

- **JPO-004 / 0882**：原稿“猫用≠所有年龄适用”的限制提示方向正确；正式发表前仍须兽医审查“禁忌和用法”措辞，若新增药品示例必须核对NVAL现行添文中对象动物、年龄、体重及注意事项。无药名时不虚构单品核验。
- **JPO-006 / 0884**：原稿强调核对成分/含量/剂型/处方并防止重复用药；应明确“每日用法”属于核对处方记录，不构成平台给药建议。未列具体日本产品，不得标注 official_product_verified。
- **JPO-009 / 0898**：原稿先就诊/急诊、保留包装和批号方向保留；“只联系卖家”不可代替就诊。NVAL明确有针对兽医和制造销售业者的不良反应报告渠道，当前不应将主人自行填写专业报告表作为常规就诊替代。官方说明日本不良反应报告系统计划于**2026-11-01**迁移，且当前系统自**2026-10-20 18:00（日本时间）**停止使用；此为本轮核对时的官方公告，使用报告入口前应复查当前公告，严禁把未来切换写成已生效。

官方依据（访问核对日 2026-10-18）：
- https://www.maff.go.jp/nval/iyakutou/index.html
- https://www.maff.go.jp/nval/iyakutou/fukusayo/sousa/index.html
- https://www.maff.go.jp/nval/iyakutou/fukusayo/sousa/houkoku.html
- https://www.maff.go.jp/nval/

**结论**：本轮未认定任何单品已获日本官方核验，亦未新增全文医学审核通过条数。BJH-R-001～004 继续 product_identity_missing + Hold。所有 medical_review_pending、noindex、Draft、未合并未部署边界原样保留。
