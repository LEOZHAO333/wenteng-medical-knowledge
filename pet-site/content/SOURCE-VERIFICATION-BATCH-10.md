# 日宠通 权威来源核对｜Batch 10

日期：2026-10-17
状态：editorial medical/source review / medical_review_pending / noindex / 不上线

> 本批继续执行编辑层医学事实与来源核对，不等于执业兽医签字审核。通过节点统一保持 `source_verified_editorial + medical_review_pending`；不使用 `Medical Approved` 或 `publish_ready`。

## 一、本批范围

共40题：

### A. 家居安全 / 季节环境（10）
0742、0743、0749、0750、0753、0755、0756、0757、0758、0759。

### B. 品种健康 / 家庭管理（10）
0842、0843、0844、0846、0849、0850、0852、0854、0855、0857。

### C. 长期照护 / 感官与行动支持（10）
0901、0902、0903、0904、0908、0909、0910、0912、0913、0918。

### D. 主人观察 / 家庭记录工具（10）
0985、0986、0987、0990、0993、0994、0995、0997、0998、0999。

## 二、核心来源基线

### 家居安全 / 高温 / 日常风险
- Merck Veterinary Manual：犬猫热相关疾病、常见毒理与皮肤/足垫损伤的一般原则。
- AAHA 2023 Senior Care Guidelines：老年与感觉/行动能力下降宠物的家庭环境风险管理。
- 产品接触类问题坚持“以具体标签、成分和暴露量为准”，不写统一消毒等待时间、不猜融雪剂成分。

### 品种健康 / 预防照护
- AAHA/AAFP 2021 Feline Life Stage Guidelines。
- AAHA Canine Life Stage / preventive care principles。
- WSAVA Global Nutrition Guidelines：体重、体况与总摄入管理。
- 品种只能作为风险背景，不能替代个体症状、体检和必要检查。

### 长期照护 / 疼痛与行动
- AAHA 2022 Pain Management Guidelines for Dogs and Cats。
- AAHA 2023 Senior Care Guidelines for Dogs and Cats。
- Feline-friendly / environmental-needs principles：稳定资源、降低压力、改善可达性。
- 需要管饲、辅助排尿、复杂伤口等操作时继续保留 `procedureTrainingRequired`。

### 主人观察 / 记录与信息质量
- WSAVA Global Nutrition Guidelines：体重、食物与零食总摄入记录。
- AAHA preventive / senior care principles：药物清单、长期趋势、紧急联系人与照护交接。
- 医学研究解读继续坚持：研究对象、疾病阶段、样本量、干预和结局必须与个体情境区分；单篇研究不能直接等同个体疗效。

## 三、逐题复核结果

### A. 家居安全 / 季节环境

| ID | 状态 | 核对结论 |
|---|---|---|
| 0742 | source_verified_editorial + emergencyActionFirst | 猫主动躺凉地本身不能诊断过热；张口呼吸、虚弱、反应迟钝等属于更高风险信号，应优先就医而不是继续家庭降温观察。 |
| 0743 | source_verified_editorial + householdSafetyBoundary | 洗衣机/烘干机属于可通过固定开机前检查、保持门关闭和限制进入来降低的机械/热风险；不把“猫通常会躲开”当安全依据。 |
| 0749 | source_verified_editorial + householdSafetyBoundary | 阳台同时存在高温和坠落风险；必须让猫能主动离开直晒区域，普通纱窗不能等同防坠设施。 |
| 0750 | source_verified_editorial + toxicologyContext | 消毒剂差异大，重新进入时间应按产品标签的稀释、冲洗、通风和干燥要求；不设统一“几小时后安全”。出现异常暴露时保存产品信息并联系兽医。 |
| 0753 | source_verified_editorial + pawSafetyBoundary | 路面温度不能只由气温推断；频繁抬脚、停走、舔爪及足垫红肿/水泡提示需要停止暴露并评估损伤。 |
| 0755 | source_verified_editorial + diagnosticContextRequired | 发抖可由低温、焦虑、疼痛、低血糖等多种原因引起；离开寒冷环境后仍持续或伴精神/步态异常时不能只靠穿衣处理。 |
| 0756 | source_verified_editorial + toxicologyContext | 融雪剂/路盐成分与风险不一；回家后清水清洁足部、避免继续舔食合理，较大量误食或出现胃肠/神经异常时按具体产品暴露联系兽医。 |
| 0757 | source_verified_editorial + diagnosticContextRequired | 雨后趾间发红可受潮湿、接触刺激、过敏或原有皮肤病影响；标准化照片和舔咬/持续时间记录有价值，但不能凭照片单独定性。 |
| 0758 | source_verified_editorial + behaviorSafetyBoundary | 雷雨恐惧宜提前建立可退出的安全空间并减少刺激；严重喘、逃逸、自伤或长期影响生活时需要兽医/行为专业评估，不提供自行镇静方案。 |
| 0759 | source_verified_editorial + thermalInjuryRisk | 老年、瘫痪、麻醉恢复期或感觉迟钝宠物更可能无法及时离开热源；电热垫必须允许自主离开并避免持续直接接触，不把“低温档”视作绝对安全。 |

### B. 品种健康 / 家庭管理

| ID | 状态 | 核对结论 |
|---|---|---|
| 0842 | source_verified_editorial + diagnosticContextRequired | 反复软便、呕吐或体重变化不能只归因“布偶肠胃弱”；品种背景不能替代寄生虫、饮食、炎症及其他个体病因评估。 |
| 0843 | source_verified_editorial | 波斯猫眼鼻周与皮褶护理应温和，分泌物突增、脓性变化、红痛或鼻塞属于健康评估问题，不能只加强美容。 |
| 0844 | source_verified_editorial + dermatologyContext | 无毛猫清洁频率应根据个体油脂和皮肤反应调整；过度清洁可能刺激皮肤，反复炎症/瘙痒需兽医评估。 |
| 0846 | source_verified_editorial + painMobilityContext | 短腿体型不能解释所有不跳/行动下降；与既往相比的犹豫、僵硬、跛行和触碰疼痛更有判断价值。 |
| 0849 | source_verified_editorial + preventiveCareContext | 父母无已知病史不能替代幼猫自己的体检、寄生虫评估、疫苗计划和生长监测；先天或感染问题仍可能存在。 |
| 0850 | source_verified_editorial + multiPetContext | 引入第二只猫应同时考虑健康史、感染筛查、疫苗、饮食、资源和原住猫慢病/压力风险；渐进介绍优于直接混住。 |
| 0852 | source_verified_editorial + painMobilityContext | 柯基楼梯管理需基于年龄、体况、脊背/关节和当前症状；既不一刀切禁止，也不在疼痛或后肢异常时强行训练。 |
| 0854 | source_verified_editorial + ophthalmologyContext | 贵宾/泰迪持续流泪不能直接视为品种正常；单眼加重、眯眼、揉眼、异常分泌物或角膜变化需要眼科评估。 |
| 0855 | source_verified_editorial + ophthalmologyContext | 比熊泪痕美容只能处理毛发外观，不能替代持续流泪原因评估；刺激性“去泪痕”产品不应贴近眼球反复使用。 |
| 0857 | source_verified_editorial + nutritionClaimCheck | 家庭投喂应按每日总量管理，主食、奖励和零食都计入总摄入；超重管理应结合体况和兽医设定目标，而不是只笼统“少喂”。 |

### C. 长期照护 / 感官与行动支持

| ID | 状态 | 核对结论 |
|---|---|---|
| 0901 | source_verified_editorial + sensorySupport | 失明猫搬家时固定食水、猫砂、休息区和家具布局可降低定向压力；持续不吃、不如厕或显著焦虑需医学评估。 |
| 0902 | source_verified_editorial + sensorySupport | 失聪猫可利用视觉、轻微振动等非惊吓提示；近期突然听力下降仍需排耳道、神经及其他医学原因。 |
| 0903 | source_verified_editorial + painMobilityContext | 三肢猫可有良好适应，但体重、防滑及剩余肢体/脊柱的长期负担值得监测；新跛行或活动下降需复查。 |
| 0904 | source_verified_editorial + procedureTrainingRequired | 长期限制活动必须先有明确医学目的和期限；环境丰富化不能擅自突破医生设定的活动限制，笼内应满足基本舒适和排泄需要。 |
| 0908 | source_verified_editorial + painMobilityContext | 低入口、稳定、防滑猫砂盆有助行动受限猫；进出、转身、下蹲困难也可能提示疼痛/神经或其他疾病，不能只归因猫砂盆偏好。 |
| 0909 | source_verified_editorial + recoveryContext | 恢复期互动应短、低强度并允许宠物自主退出；活动下降伴食欲、疼痛或精神恶化时应复诊，而不是只增加刺激。 |
| 0910 | source_verified_editorial + medicationContent | 慢病交接表应明确药物、食物、关键观察、返院条件与紧急联系人；代照护者不得因漏服担心而自行加倍。 |
| 0912 | source_verified_editorial + sensorySupport | 失明犬家庭环境宜保持布局稳定、防滑并隔离楼梯/尖锐危险；突然视力下降仍必须先评估原因。 |
| 0913 | source_verified_editorial + sensorySupport | 失聪犬外出应强化可靠牵引和视觉提示，不在不安全区域脱绳；近期听力变化需医学评估。 |
| 0918 | source_verified_editorial + procedureTrainingRequired + medicationContent | 喂食、按处方给药和简单记录可标准化交接；辅助排尿、管饲、复杂伤口等操作必须先由专业人员现场培训并确认照护者掌握。 |

### D. 主人观察 / 家庭记录工具

| ID | 状态 | 核对结论 |
|---|---|---|
| 0985 | source_verified_editorial + trendTracking | 家庭体重应尽量固定秤、时间和条件，关注趋势而非一次小波动；持续明显变化尤其伴食欲异常时应纳入医学评估。 |
| 0986 | source_verified_editorial + nutritionClaimCheck | 克重记录通常比“几勺”更稳定，尤其适合减重、慢病和食欲监测；不同食物密度使容量法误差更大。 |
| 0987 | source_verified_editorial + nutritionClaimCheck | 家庭共享零食总量/记录能减少重复投喂；训练奖励和餐桌食物也属于总能量摄入。 |
| 0990 | source_verified_editorial + diagnosticContextRequired | 固定角度、光线、距离的照片适合比较皮肤趋势，但不能单独判定病因或治疗成功；日期和同期用药/洗护需一并记录。 |
| 0993 | source_verified_editorial + medicationContent | 药物按在用/停用/过期分区并保留原包装有助减少误用；旧处方药不能因症状相似自动再次使用。 |
| 0994 | source_verified_editorial + emergencyPreparedness | 所有可能单独照护宠物的人都应掌握常用医院、夜间急诊、关键病史/用药和“何时不等待主人”的规则。 |
| 0995 | source_verified_editorial + identificationContext | 芯片存在不等于登记联系方式有效；搬家/换号后需同时核对实体牌和实际登记机构记录，具体更新流程以当地登记系统为准。 |
| 0997 | source_verified_editorial + evidenceClaimCheck | 健康视频可信度应看适用范围、证据来源和就医边界；涉及药物、剂量或治疗决定时应优先专业指南/官方信息并与主治兽医核对。 |
| 0998 | source_verified_editorial + toxicologyContext + evidenceClaimCheck | 偏方传播前至少核对成分、物种差异、潜在毒性和延误治疗风险；“个案有效”不能证明普遍安全有效。 |
| 0999 | source_verified_editorial + evidenceClaimCheck | 研究结果应用到个体前需核对研究对象、疾病阶段、样本量、干预与结局；单篇研究或新闻稿不能直接转化为个体治疗承诺。 |

## 四、本批安全边界

- 新增/沿用：`householdSafetyBoundary`、`toxicologyContext`、`pawSafetyBoundary`、`behaviorSafetyBoundary`、`thermalInjuryRisk`、`painMobilityContext`、`sensorySupport`、`recoveryContext`、`trendTracking`、`emergencyPreparedness`、`identificationContext`、`evidenceClaimCheck`。
- 药物、毒物和产品暴露不写统一剂量/等待时间；按具体成分、标签、暴露量和兽医判断。
- 品种健康不把“品种倾向”写成个体诊断。
- 家庭记录工具用于趋势和沟通，不替代诊断。
- 所有40题仍为 `medical_review_pending`。

## 五、本批结论

- 40/40：`source_verified_editorial`
- `needs_edit`：0
- `Medical Approved`：0
- `publish_ready`：0
- 当前不生成公开URL、不部署、不解除noindex。

下一步继续日本宠物药官方核验专项，并清理仍未进入来源核对的剩余P0/P1与结构尾项。