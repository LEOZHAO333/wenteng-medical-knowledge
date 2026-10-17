# 日宠通 医学复核队列｜2026-10-17

状态：Content Build Only / Draft / noindex / 不上线

> “正文已完成”与“医学可发布”严格分离。没有真实兽医复核前，不使用 `Medical Approved`、`兽医审核通过` 等表述。

## 一、状态字段
- `draft_complete`
- `source_verified_editorial`
- `needs_edit`
- `medical_review_pending`
- `official_japan_verification_pending`
- `publish_ready`

## 二、优先级
### P0
神经急症/中毒异物/尿闭AKI/呼吸晕厥血栓/麻醉手术/繁殖急症/处方药/日本宠物药产品事实。
### P1
心脏、肿瘤、内分泌、疼痛康复、感染疫苗驱虫、眼科用药、影像病理第二意见、日本新疗法批准vs研究。
### P2
皮肤耳牙、营养、幼宠老年、行为旅行与长期照护。

## 三、来源层级
### 日本药品/监管
NVAL数据库 → MAFF/NVAL现行信息 → 电子添付文书 → 官方承认/审查信息。
### 通用犬猫医学
AAHA、AAFP/FelineVMA、ACVIM、IRIS、WSAVA、CAPC、Merck Veterinary Manual、Cornell等专业中心。

商业页面、媒体、旧百家号不得作为高风险医学或批准状态的最终依据。

## 四、已完成批次

- **Batch 01：20**｜神经/误食急症10 + 日本宠物医疗10；0492措辞已修复。
- **Batch 02：40**｜驱虫疫苗10 + 麻醉手术10 + 用药10 + 繁殖急症10。
- **Batch 03：40**｜心脏10 + 肿瘤10 + 呼吸10 + 眼科10。
- **Batch 04：40**｜内分泌10 + 关节疼痛10 + 感染检测10 + 影像病理第二意见10。
- **Batch 05：40**｜泌尿肾病10 + 皮肤耳牙10 + 幼宠老年营养10 + 长期照护康复10。
- **Batch 06：40**｜神经/外伤/异物16 + 用药/补充剂/化验16 + 眼科8。
- **Batch 07：40**｜心脏肿瘤A级10 + 医院沟通10 + 胃肠10 + 营养10。
- **Batch 08：40**｜泌尿观察10 + 呼吸老年10 + 多宠儿童卫生10 + 旅行行为10。

### Batch 09｜完成（40）
- 多宠/感染/家庭隔离：0804、0805、0806、0810、0816、0822、0829、0830、0834、0837
- 耳病A级：0322、0325、0326、0328、0329、0332、0333、0337、0338、0340
- 口腔牙科A级：0361、0363、0365、0367、0369、0370、0374、0376、0377、0380
- 皮肤/被毛A级：0282、0284、0285、0287、0288、0290、0297、0298、0299、0300
- 编辑层来源核对：40/40
- `needs_edit=0`
- 结构审计：ID/slug/clusterKey/relatedIds 40/40
- 主要安全标签：`medicationContent`、`infectionControlContext`、`humanHealthBoundary`、`diagnosticContextRequired`、`procedureTrainingRequired`、`postoperativeCare`、`anesthesiaContextRequired`、`groomingSafetyBoundary`、`nutritionClaimCheck`
- 状态：`source_verified_editorial + medical_review_pending`

### 日本宠物药官方核验专项｜进行中
- 主表：`JAPAN-PET-DRUG-OFFICIAL-VERIFICATION-MASTER.md`
- 0655/0659、0881–0886、0898/0899按方法页与产品触发页分流
- BJH-R-001～004继续Hold，不猜产品名
- 具体商品坚持“一产品一记录”并核NVAL/MAFF/现行电子添文

### Batch 10｜自动继续
优先：
- 剩余老年/行为/家居安全/长期照护节点
- 品种健康与消费判断高价值节点
- 仍未进入正式来源核对的P0/P1节点
- 有明确产品身份的日本宠物药官方核验

## 五、当前累计
- Batch 01：20
- Batch 02：40
- Batch 03：40
- Batch 04：40
- Batch 05：40
- Batch 06：40
- Batch 07：40
- Batch 08：40
- Batch 09：40
- **累计：340个节点完成编辑层权威来源核对**
- `Medical Approved`：0
- `publish_ready`：0

> “340个”只代表正式来源核对完成数量，不代表全库只有340篇，也不代表可以上线。

## 六、上线阻断条件
- `needs_edit`未关闭
- 高风险节点仍`medical_review_pending`
- 日本产品仍`official_japan_verification_pending`
- 核心来源仅为商业/二手/旧平台稿
- 暗示诊断、处方或疗效保证
- 急症无明确行动边界

## 七、执行规则
执行层默认自动继续：来源核对、结构整理、证据修正、Draft文件更新、PR记录、日本宠物药核验队列维护。

重大事项仍需Founder确认：上线/部署/解除noindex、合并main、修改正式首页结构、新增销售/问诊/购药/跨境转化、对外声称Medical Approved、改变品牌或URL总架构、大批删除或不可逆操作。

## 八、当前结论
继续以：**事实依据、风险边界、ID/slug/内链唯一、日本官方状态、发布状态**为核心KPI。

当前全部保持 Draft / noindex / 不上线。