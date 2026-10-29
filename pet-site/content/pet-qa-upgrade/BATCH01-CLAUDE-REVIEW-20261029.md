# PET-QA-UPGRADE｜官网现有40篇问答第1批10篇｜2026-10-29

## 执行范围及不变量

**目标**：Founder 10/29优先级调整及Claude在PR #41的指示：先对日宠通**已收录在官网的40篇**进行逐篇加深，而非继续新增私库589篇。基于`main`原生产数组`pet-site/api/pet.js`的**首10条现有问答**，逐个对应原标题和Slug。升级稿放`pet-site/content/pet-qa-upgrade/<slug>.md`，独立Draft，不修改原生产问答、不改URL、sitemap、robots、INDEX_APPROVED、Vercel配置或索引权限，避免未经执业兽医审查就改变已公开页面。

**状态**：10篇均为`editorial_draft`、`medical_review=pending_licensed_veterinarian/Hold`、`publish_ready=false`、`founder_release_approval=false`。日本宠物医生/药剂师审核尚未发生，不能称“专业审核通过”或自动合并/部署。境外来源用于一般兽医知识，不代表日本产品或服务官方批准。

**格式**：读者版文件仅有标题、单句直接回答、四段自然中文正文和固定安全声明；内部ID/Slug、GEO、证据及审核状态**只存本交接文件**，不与拟公开正文混写。真实发布前须建立明确的`body`字段与渲染过滤、比对HTTP输出无内部字段泄漏；目前Draft目录完全不被生产renderer读取。

## 每篇一一对应及逐主张来源（S级风险优先）

| 序号 | 原站Slug | 内容核心与证据对应 | 医学/编辑待核 |
|---|---|---|---|
| 01 | `cat-dandruff` | 猫皮屑不等于洗澡少；不能梳理、疼痛、寄生虫、皮肤病可参与。PDSA [Dandruff in Cats](https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/symptoms/dandruff-in-cats)（皮屑及舔毛能力）；Merck [Feline Dermatitis](https://www.merckvetmanual.com/cat-owners/skin-disorders-of-cats/dermatitis-and-dermatologic-problems-in-cats)（皮肤炎症征象） | **P1**：持续皮屑伴拒食、渗液的就医分流；洗澡频次不可绝对化 |
| 02 | `cat-belly-hair-loss` | 腹部对称脱毛可因舔毛，但不能等同心理原因。Merck [Feline Alopecia](https://www.merckvetmanual.com/cat-owners/skin-disorders-of-cats/hair-loss-alopecia-in-cats)；Cornell [Cats That Lick Too Much](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/cats-lick-too-much)；Merck [Feline Atopic Skin Syndrome](https://www.merckvetmanual.com/integumentary-system/atopic-skin-conditions-in-dogs-and-cats/feline-atopic-skin-syndrome) | **P1**：尿闭急症与皮肤行为问题区别，排尿困难不是普通皮肤护理 |
| 03 | `cat-ear-thinning` | 稳定毛稀与新发生的脱毛区别；抓耳/甩头/异常耳垢提示检查。VCA [Ear Mites](https://vcahospitals.com/know-your-pet/ear-mites-otodectes-in-cats-and-dogs)；Cornell [Ear Mites](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/ear-mites-tiny-critters-can-pose-major-threat) | **P2**：正常毛稀的解剖部位及左右差异需兽医确认；不得仅凭耳垢颜色确诊 |
| 04 | `cat-tail-greasy` | 尾根油腻/黑头与皮脂腺增生及感染可能性；VCA [Stud Tail](https://vcahospitals.com/know-your-pet/stud-tail-tail-gland-hyperplasia-in-cats) | **P1**：避免刺激性清洁和挤黑头；严重肿痛需兽医评估 |
| 05 | `cat-chin-blackheads` | 猫下巴粉刺可涉及毛囊角化；换光滑食盆仅辅助。VCA [Chin Acne in Cats](https://vcahospitals.com/know-your-pet/chin-acne-in-cats) | **P2**：不要将塑料食盆关联写成已确立的唯一因果；感染与其他病变需鉴别 |
| 06 | `dog-dandruff-itching` | 痒/皮屑需检查感染、寄生虫、过敏；药浴可有适应证，不能绝对反对洗澡。AAHA [Allergic Skin Disease Guidelines](https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-%20diseases-in-dogs-and-cats-guidelines/)；ICADA [Updated CAD Treatment Guidelines](https://onlinelibrary.wiley.com/doi/10.1111/vde.70128) | **P1**：旧站“频繁洗澡反而变差”需纠偏：兽医指导的药浴可能规律进行；医生定频率 |
| 07 | `dog-symmetrical-hair-loss` | 对称脱毛是形态线索，不等于库欣病/甲减；先按症状与皮肤检查再决定内分泌化验。Merck [Dog Alopecia](https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/hair-loss-alopecia-in-dogs)；Merck [Dermatological Problems](https://www.merckvetmanual.com/integumentary-system/integumentary-system-introduction/dermatological-problems-in-animals) | **P1**：不要让读者自行根据一次化验确诊或调激素 |
| 08 | `dog-licking-paws` | 趾间皮肤/细菌酵母/寄生虫/外伤先排查，再讨论行为。AAHA [Canine Dermatology Algorithm](https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-diseases-in-dogs-and-cats-guidelines/figure-1-diagnosing-allergic-skin-disease-in-the-canine-patient/) | **P2**：草籽和爪垫异物为常见鉴别非单因；跛行与剧痛应加急 |
| 09 | `dog-seasonal-itch` | 季节性与瘙痒部位、既往驱虫、治疗响应一并记录；AAHA [Guidelines](https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-%20diseases-in-dogs-and-cats-guidelines/)与[诊断流程](https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-diseases-in-dogs-and-cats-guidelines/figure-1-diagnosing-allergic-skin-disease-in-the-canine-patient/) | **P2**：季节性不是花粉过敏的独立确诊依据 |
| 10 | `dog-elimination-diet-snacks` | 试验期间零食/有味药品可能干扰，改善后通常需兽医判断是否复食挑战。AAHA [Canine Diet Trial & Challenge](https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-diseases-in-dogs-and-cats-guidelines/figure-1-diagnosing-allergic-skin-disease-in-the-canine-patient/)；AAHA [Owner Food Allergy Guide](https://www.aaha.org/resources/why-is-my-dog-itchy/) | **P1**：严守试验期间其他入口，药物不得自行停止；试验周期由医生定 |

## 内容质控自检

- 10篇**按main原始条目顺序**，无新增slug与URL，原标题保持一致；
- 每篇直接回答一个用户问题；四段内容围绕“问题、可能原因与边界、主人要记录的事项、何时就医”，完整保留原始搜索意图；
- 内容不写药物剂量/处方，不虚构病例、医生姓名、诊疗效果或日本批准日期，不承诺治愈；不导购或引导非医疗购买；
- 读者正文不出现 `GEO关键词`、`编辑状态`、`Medical Approved`、`noindex` 等内部标记；关键词仅放本交接文件。关键词建议：宠物皮肤病、猫皮屑、猫脱毛、猫耳病、猫下巴粉刺、狗皮肤过敏、犬对称脱毛、狗舔脚、犬季节性瘙痒、排除饮食试验；
- 当前审计只是**编辑级原始资料核对**，不代表每句均已由合资格兽医终审。阅读本文献源不能替代日本监管核验或个体化诊断。

## Claude审核包（需分别回填）

**Claude-2 医学编辑复审**：核对10篇逐主张来源支持程度、犬猫物种边界、急症时效、禁忌性自我处置、皮肤外用药/药浴的措辞。重点：02、06、07、10。

**Claude-3 技术复审**：检查Draft与生产Renderer完全隔离，当前新增文件不被路由读取；未来批准后映射到原40条`articles`，只替换目标slug的answer/body，保留原TITLE、Slug、URL和既有索引策略，防止内部审核字段泄漏；不得在当前PR直接做生产切换。

**真正的日本宠物执业兽医审签**：逐篇审批记录及签字/可核验身份，不得以Claude或药剂师审阅替代。

- Claude-2 结论：**未回填**
- Claude-3 结论：**未回填**
- 重要风险发现：**待审核填写（有/无＋一句）**
- 日本宠物执业兽医 Medical Approved：**0/10**
- Founder发布批准：**无**
- PR归属：**Draft / No Merge / No Deployment / No Publish**
