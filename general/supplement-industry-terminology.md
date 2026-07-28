---
title: "保健食品產業術語：看懂這個產業在講什麼"
type: reference
status: active
created: 2026-07-28
updated: 2026-07-28
version: "0.7"
project: LearningMap
author: Dustin
tags:
  - terminology
  - supplement
  - domain
  - onboarding
audience:
  - all
summary: |
  保健食品產業域詞的白話對照入口，給第一週看報告、看 dashboard 就撞到一堆
  陌生名詞的新人。涵蓋標籤結構、成分角色、品牌化標記、市場切法、voice 指標、
  資料來源縮寫，以及六個最容易算錯的數字陷阱。各系統的正式定義不搬運，只做
  白話對照與指路。⚠️ v0.x 草稿：詞彙盤點尚未完成，部分內容為實務歸納而非
  正式定義，引用前請看文末的「內容出處分層」表。
---

# 保健食品產業術語：看懂這個產業在講什麼

> ⚠️ **這是草稿，不是定稿**（目前版本見 frontmatter）。兩件事請先知道：
>
> 1. **詞彙範圍還沒盤點完** —— 還缺 issue #5 要求的「反向來源」（實際問 testing / BA 同事第一週哪些詞看不懂）。所以**這份清單必然還漏著詞**。你讀的時候如果撞到本文沒解釋的名詞，請直接回報——那正是本文最需要的輸入。
> 2. **各條的可信度不一樣** —— 有的有正式定義背書（✅）、有的已對照法規原文或認證機構官方頁查證（📖，正文附連結）、有的純屬實務歸納未經查證（⚠️）。哪條是哪級，見文末〈**內容出處分層**〉那張表。**要當定義引用前，先查那張表。**

---

## 📋 文檔目的

你第一週會遇到這種句子：

> 「joint_health 這個 market 的 MVM dependency 偏高，排掉之後 KSM-66 的 penetration 才看得出來；不過 Official 通路那批 voice 是 0，別當成沒人買。」

每個字都認得，合起來完全不知道在說什麼。這不是你的問題——**這句話裡有六個詞是這個產業（或這套系統）的專有講法**，而它們的解釋散落在五、六份不同文件裡。

本文把這些詞集中翻成白話，讓你看得懂會議、看得懂報告。它**不是**權威定義書：每個詞的正式定義都住在各自的系統裡（見文末指路），本文只負責讓你第一次遇到時不卡住。

> **怎麼讀**：先看下面「一句話總結」的 8 個詞，那是不懂就會看不下去的最小集合。其餘章節用到再回來查。

---

## 🎯 一句話總結

| 術語 | 白話 |
|------|------|
| **Supplement Facts** | 產品標籤上那塊法規規定要標的成分表 |
| **dosage form（劑型）** | 這東西長什麼樣：膠囊、錠劑、軟糖、粉末 |
| **MVM** | 綜合維他命。成分多到會污染幾乎所有統計，分析時常要排掉 |
| **BI / BT / BP** | 三種「被品牌化」的東西：成分本身 / 製程技術 / 產地來源 |
| **market（功能市場）** | 依**消費者想解決什麼問題**切出來的市場，如關節健康、壓力情緒 |
| **category（品類）** | 依**含哪個成分**切出來的分類，如薑黃、南非醉茄 |
| **voice** | 消費者注意力的代理指標，實際上是評論數加總 |
| **penetration（滲透率）** | 某個東西在它「有資格出現」的產品裡，實際出現的比例 |

---

## 1. 先看懂一張產品標籤

所有資料最終都來自一張貼在瓶子上的標籤。標籤分兩塊，**這兩塊的意義完全不同**，但新人很容易混為一談。

| 詞 | 白話 | 為什麼重要 |
|---|---|---|
| **Supplement Facts** | 法規強制標示的成分表，列出每份含哪些活性成分、各多少 mg | 我們資料庫裡絕大多數成分分析都來自這一塊 |
| **Other Ingredients** | 這塊**不在**上表裡的東西：膠囊殼、賦形劑、色素、抗結塊劑 | 名字叫「其他」，但它決定了素食者能不能吃、會不會有過敏原 |
| **serving size（每份用量）** | 「一份」是幾顆。可能是 1 顆，也可能是 3 顆 | 比較劑量時**一定要看**——A 牌一顆 500mg、B 牌一份 500mg 但一份 3 顆，兩者差三倍 |
| **dosage form（劑型）** | 膠囊 / 錠劑 / 軟膠囊 / 軟糖 / 粉末 / 液體 | 同樣的成分做成軟糖和做成膠囊，是兩種生意 |

> ⚠️ **最常見的第一週錯誤**：把 Other Ingredients 當成「不重要的雜項」。它是**載體**，不是雜項——一個宣稱純素的產品，破功通常破在這一欄的明膠膠囊。

---

## 2. 成分不是平等的：六種角色

同一個成分，放在不同配方裡扮演的角色完全不同。這是這個產業最重要、也最不直覺的一個概念——**看懂它，你才看得懂為什麼兩個「都含薑黃」的產品是完全不同的東西**。

| 角色 | 白話 | 例子 |
|---|---|---|
| **hero（主角成分）** | 消費者買這罐就是為了它，名字通常印在瓶身最大 | 一罐「薑黃膠囊」裡的薑黃 |
| **credential（背書成分）** | 品牌放它是為了**證明配方有科學根據**，不見得放足量 | 複方裡加一點有臨床試驗的品牌原料 |
| **destination（目的地成分）** | 消費者**指名要找它**才買這罐——與 credential 正好相反 | 認明 KSM-66 才買的消費者 |
| **enabler（增效成分）** | 不針對特定功效，負責提升**其他成分**的吸收率 | 黑胡椒萃取物（提高薑黃吸收） |
| **supporting（輔助成分）** | 跟主角同一個方向，幫忙加強 | 關節配方裡陪著葡萄糖胺的 MSM |
| **passenger（乘客成分）** | 存在感極低，就是配方師順手加的 | 複方裡那個誰也說不出為什麼在的成分 |

**credential 與 destination 的對立最值得記**：前者是「**品牌**拿這個成分來背書自己」，後者是「**消費者**主動來找這個成分」。同一個原料在 A 品牌是 credential、在 B 品牌是 destination，商業意義天差地遠。

> 🔀 **注意兩條軸是正交的**：上表的 enabler 例子「黑胡椒萃取物」，它的品牌化版本 BioPerine® 是第 3 節的 BI 代表例。**「在配方裡扮演什麼角色」和「有沒有被品牌化」是互不相干的兩件事**——同一個成分兩邊都要看。

配套的兩個詞：

- **clinical dose（臨床劑量）**：經臨床試驗驗證的有效劑量。
- **below-clinical dose（低於臨床劑量）**：明顯低於上者的**象徵性添加**——目的是讓標籤上多一個成分名，不是讓它起作用。這在複方產品裡非常普遍，不是弊端指控，是產業常態，但寫報告時必須點出來。

還有一組描述「配方有多複雜」的機械分類：

| 詞 | 定義 |
|---|---|
| **simple** | 成分數 ≤ 5 |
| **moderate** | 成分數 6–20 |
| **complex** | 成分數 21+ |

由此衍生兩個常用指標：**standalone rate**（成分數 ≤5 的產品在該品類的佔比，衡量一個成分被「當主角賣」的程度）、**identity dilution（身份稀釋）**（一個品牌原料被丟進 complex 產品裡，在標籤上被其他二十個成分淹沒）。

---

## 3. 三種「被品牌化」的標記：BI / BT / BP

一般成分（薑黃、南非醉茄）沒有商標，誰都能用。但產業裡有一整套**被註冊成商標的東西**，它們是原料商的生意核心。分三種：

| 縮寫 | 全稱 | 品牌化的是什麼 | 例子 |
|---|---|---|---|
| **BI** | Branded Ingredient | **成分本身**——特定萃取規格、特定產地的原料 | BioPerine®（黑胡椒萃取）、KSM-66（南非醉茄） |
| **BT** | Branded Technology | **製程或遞送技術** | Phytosome®、liposomal、chelation、sustained-release |
| **BP** | Branded Provenance | **來源、產地或栽培方式** | Albion®、Organic India® |

> ⚠️ **命名沿革陷阱**：BI 以前叫 **PI（Proprietary Ingredient）**，舊文件、舊欄位名、舊報告裡到處都是 PI。**兩者指同一件事**，看到 `pi_landscape`、`pi_gap`、`PI penetration` 不要以為是另一個概念。

相對於這三種標記，**generic（通用配方）** 指的是完全不含任何 BI 的產品。

還會遇到 **owner（原料商 / 品牌擁有者）** 與 **strain（菌株）** 兩個詞——前者是擁有某個 BI 的公司（注意它跟**產品品牌**是兩件事），後者是益生菌專有的層級概念。兩者的正規化規則見下方指路。

> 📌 三型商標的正式定義、schema 版本與實際筆數，以及 owner / strain 的正規化，見 [eidos.md](../projects/alchemymind/eidos.md)——**本節只做白話對照，不是定義書**。

---

## 4. 認證標章：兩種完全不同的東西

標籤上那一排標章，dashboard 上是 `Certification` 這個維度。新人最容易犯的錯是**把它們當成同一類東西**——實際上分兩種，回答的是完全不同的問題。

### 品質驗證標章：「這罐裡面真的是它說的東西嗎？」

| 標章 | 誰給的 | 驗什麼 |
|---|---|---|
| **USP Verified** | [United States Pharmacopeia（美國藥典）](https://www.usp.org/verification-services/verified-mark) | 成分與標示相符（含**宣稱效價與含量**）、不含**有害含量**的指定污染物（重金屬、微生物、農藥等） |
| **NSF Certified** | NSF International | 內容物與標示相符、污染物無不安全含量；[**NSF Certified for Sport**](https://www.nsfsport.com/our-mark.php) 另外檢驗 **290 種**運動禁藥 |
| **GMP / cGMP** | 稽核機構依 FDA 規範（[21 CFR Part 111](https://www.govinfo.gov/content/pkg/CFR-2023-title21-vol2/xml/CFR-2023-title21-vol2-part111.xml)）查廠 | 製造流程、品管、紀錄是否合規 |

> ⚠️ **USP / NSF 與 GMP 是不同性質**：USP / NSF 是**第三方獨立驗證**某批產品達標並掛標章；GMP 稽核的是**製造商有沒有一套合規的品管與檢驗流程**。
>
> 常見的簡化說法是「GMP 查工廠不查產品」，但**這不完全準確**——21 CFR Part 111 也強制廠商對成分與成品做鑑別、純度、組成、污染物檢驗。差別在那是**廠商自檢**，不是第三方替你確認。所以 GMP 合規**不等於**某罐產品的含量被獨立驗證過。

> 📌 **USP Verified 的邊界**：USP 官方對這個標章的表述是「**what's on the label is what's in the bottle**」（標示寫什麼、瓶裡就是什麼）——**驗證範圍到此為止**。它處理的是「這罐東西是不是它說的東西」，不是「這個成分對你有沒有效」，也不涵蓋藥物交互作用或禁忌症。看到標章不等於看到療效背書。

### 消費者訴求標章：「這罐符合我的價值選擇嗎？」

| 標章 | 誰定的 | 意思 |
|---|---|---|
| **USDA Organic** | **政府法規**（[7 CFR Part 205](https://www.govinfo.gov/content/pkg/CFR-2023-title7-vol3/xml/CFR-2023-title7-vol3-part205.xml)，美國農業部） | 原料依有機農法生產 |
| **Non-GMO** | **民間非營利**（[Non-GMO Project](https://www.nongmoproject.org/butterfly-label/)） | 依循迴避基改原料的驗證流程 |
| **Vegan / 純素** | **民間非營利**（如 [Vegan Action 的 Certified Vegan](https://vegan.org/certification)） | 兩個條件缺一不可：**不含動物來源成分或副產品**、且**未經動物實驗**——成分那半**膠囊殼是最常破功的地方**（明膠來自動物，需改用植物性 HPMC） |

> ⚠️ **這三個標章的權威等級不一樣**：USDA Organic 是**政府法規標準**，Non-GMO 與 Vegan 是**民間第三方驗證**。混在同一排標章裡看起來對等，法規地位完全不同。
>
> 而且 Non-GMO Project 官方自己澄清：這個標章**不等於「保證不含 GMO」**——受檢測與污染風險限制，做不到法律或科學上站得住腳的 GMO-free 宣稱，它保證的是「依循了迴避 GMO 的最佳實踐流程」。

**兩者的差別很重要**：品質驗證標章回答「**這罐是不是它說的東西**」，消費者訴求標章回答「**合不合我的價值觀**」。一罐有機非基改的產品，**完全可能沒有做過任何含量驗證**；反過來也成立。

> ⚠️ 注意**兩種標章都不回答「有沒有效」**。整排標章沒有一個是療效背書——功效宣稱受法規管制，那是下一節的事。

---

## 5. 法規環境：為什麼所有宣稱都寫得那麼含糊

看多了產品文案你會發現一件怪事：所有產品都在講「支持」「幫助維持」「有助於」，沒有一個敢說「治好」。**這不是廠商在打混，是法規畫的線。**

### structure-function claim（結構功能宣稱）

美國把膳食補充劑歸類為**食品**而非藥品（依據 1994 年的 DSHEA 法案，[21 U.S.C. §321(ff)](https://www.law.cornell.edu/uscode/text/21/321)），因此：

| 可以說 | 不可以說 |
|---|---|
| 「支持關節健康」 | 「治療關節炎」 |
| 「幫助維持正常免疫功能」 | 「預防流感」 |
| 「有助於入睡」 | 「治療失眠」 |

左欄叫 **structure-function claim**——描述成分對身體**結構或功能**的作用。右欄叫 **disease claim**（疾病宣稱，定義見 [21 CFR 101.93(g)](https://www.law.cornell.edu/cfr/text/21/101.93)），一旦跨線，產品在法規上就變成「未核准的新藥」，違反 [21 U.S.C. §355(a)](https://www.law.cornell.edu/uscode/text/21/355)。

> 💡 **「有助於入睡」vs「治療失眠」為什麼是這條線最典型的例子**：依 [21 CFR 101.93(g)](https://www.law.cornell.edu/cfr/text/21/101.93) 的判準，宣稱落在「疾病的**診斷、緩解、治療、治癒或預防**」（原文 *diagnose, mitigate, treat, cure, or prevent*）就是 disease claim。失眠（insomnia）是可診斷的病症，「治療失眠」直接落入該範圍。**分界不在用詞客氣不客氣，在於指涉的對象是不是一個病。**
>
> ⚠️ 至於「偶發性難以入睡（occasional sleeplessness）」被視為**非疾病的日常狀態**、因而「有助於入睡」仍屬結構功能宣稱——這個定位出自 **FDA 的規則制定說明與指引**，**不在 101.93 的法條文字裡**。引用時請注意這兩者層級不同。

配套規則：打了 structure-function claim 的產品，標籤必須附上免責聲明（[21 CFR 101.93(c)](https://www.law.cornell.edu/cfr/text/21/101.93)，**逐字規定、不得自行改寫**）——

> "This statement has not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
>
> 「本聲明未經 FDA 評估。本產品非為診斷、治療、治癒或預防任何疾病之用。」

（多重宣稱時開頭改為 "These statements..."）

### 這件事為什麼跟你的工作有關

1. **它決定了整批宣稱資料的形狀** —— 我們資料庫裡的功效宣稱之所以全是「支持 / 促進 / 維持」這種模糊句型，源頭就是這條線。看到宣稱寫得含糊，那是合規，不是資料品質問題。
2. **上市前多半不需要 FDA 核准** —— 補充劑不像藥品要做上市前審查。所以「這個成分有沒有效」跟「這罐能不能賣」是兩件事，市場上同時存在證據充分與證據薄弱的產品。

   ⚠️ **一個例外：NDI（New Dietary Ingredient，新膳食成分）**。1994-10-15 之後才引入市場的成分，業者必須在上市前至少 **75 天**向 FDA 提交安全性通報（[21 U.S.C. §350b](https://www.law.cornell.edu/uscode/text/21/350b)）。這是「**通報**」不是「核准」——FDA 不發許可證，但仍是一道上市前程序。所以「補充劑完全不需上市前審查」這個說法對舊成分成立、對新成分不成立。
3. **它解釋了 BI 存在的商業理由** —— 既然不能宣稱療效、又不需審查，品牌要證明自己「有科學根據」，最省事的辦法就是採用有臨床試驗的品牌原料（第 3 節的 BI）。這正是 credential ingredient（第 2 節）的由來。

---

## 6. 市場是怎麼被切的

這裡有一組**日常可以互換、但本專案嚴格區分**的詞。這是最容易誤會的一組：

| 詞 | 依什麼切 | 一個產品可以屬於幾個 |
|---|---|---|
| **market（功能市場）** | 消費者**想解決什麼問題**（benefit-defined） | 多個 |
| **category（品類）** | **含哪個成分**（ingredient-defined） | 只要含該成分就算 |

例：一罐「薑黃 + 葡萄糖胺」複方，在 category 上屬於薑黃**也**屬於葡萄糖胺；在 market 上可能同時出現在關節健康與發炎控制。

- **functional market（功能市場）** = 上表的 market，只是講法不同。專案目前有 **24 個**。
- **demand cluster（需求分群）**：把 24 個 market 按消費者需求語意再往上收成幾個高階群組。

---

## 7. voice：把「消費者注意力」變成一個數字

**voice** 是這套系統最常出現的指標，也是最容易被誤解的。

> **voice = Amazon 評論數 + iHerb 評分數**
>
> 原始公式：`COALESCE(amazon_review_count, 0) + COALESCE(iherb_rating_count, 0)`（出處：TheJournalism `specs/terms.yaml` 的 `voice.formula`）

它是消費者注意力的**代理指標**——概念上接近「討論度」，但資料上就是評論數加總。

> 🔍 **為什麼兩邊不對稱（review count vs rating count）？** 這不是筆誤。資料庫的 `Products` 表裡，Amazon 側同時有 `amazon_review_count` 與 `amazon_rating_count` 兩個欄位，iHerb 側**只有** `iherb_rating_count`。公式在 Amazon 取了評論數、iHerb 只能取評分數——**兩個平台的資料粒度本來就不同**，加總是實務上的折衷，不是嚴格同質相加。

**它不是**：不是銷售額、不是市佔率、不是媒體聲量（share of voice）、不是質性回饋（voice of customer）。

⚠️ **一定要記的一件事**：品牌官網（Official 通路）的產品 **voice 永遠是 0**——不是沒人買，是**那個通路根本沒有評論資料**。把 0 讀成「乏人問津」是新人最常犯的錯。

由 voice 衍生的兩個指標，差別要分清：

| 指標 | 算法 | 白話 |
|---|---|---|
| **voice density（聲量密度）** | voice 佔比 ÷ 產品數佔比 | **相對值**。>1 = 用比較少的產品拿到超額注意力 |
| **VPP（Voice Per Product）** | voice 總量 ÷ 產品數 | **絕對值**。平均每個產品帶來多少評論 |

---

## 8. penetration：一個成分鋪得多廣

**penetration（滲透率）** 指某個 BI 在「有資格含它的產品」裡實際出現的比例（<10% 低、10–20% 中、>20% 高）。

⚠️ 講 penetration **一定要講分母**——「有資格出現」的範圍怎麼定，數字就跟著變。同一個成分換一個母體，可以從「低滲透」變成「高滲透」。

**pi_gap** 則是滲透率與 voice 佔比的落差：一個成分**鋪得廣**（penetration 高）不代表**被討論得多**（voice 佔比高），兩者的差距正是商業機會或警訊所在。

> 📌 penetration 屬於 BI 家族（第 3 節），不是 voice 家族——只是計算 pi_gap 時要跟 voice 佔比放在一起看。

---

## 9. MVM 與 macronutrient：為什麼分析常常要「排掉」

**MVM = Multi-Vitamin/Mineral（綜合維他命）**。

它不是一種普通產品，是**統計的污染源**：一罐綜合維他命動輒含三、四十種成分，於是幾乎每個成分的「滲透率」都被它灌水。所以你會常看到分析加了排除條件、參數名叫 `exclude_mvm` 之類的東西——**那不是在隱藏資料，是在還原真實的成分採用率**。

衍生詞 **MVM dependency（MVM 依賴度）**：某個市場有多少比例是靠綜合維他命撐起來的。這個數字高，代表該市場的成分分析要特別小心。

同理還有 **macronutrient（巨量營養素）**——蛋白質、脂肪、碳水這類，相對於 vitamin / mineral 這些微量營養素。分析功能性成分時通常也會排掉。

### 先把三組成分講清楚

「排除 vitamin / mineral」這條規則常出現，但前提是你知道它們各是什麼：

| 分組 | 是什麼 | 為什麼分析時常被排除 |
|---|---|---|
| **vitamin（維生素）** | 身體無法自行合成、必須攝取的有機化合物（A、B 群、C、D、E、K…） | **幾乎每罐都有**。留著會淹沒真正的差異——就像分析餐廳特色時把「有提供水」也算進去 |
| **mineral（礦物質）** | 身體需要的無機元素（鈣、鎂、鋅、鐵…） | 同上；且綜合產品往往一次含十幾種 |
| **functional ingredient（功能性成分）** | **排除上面兩組之後**的成分：草本萃取、益生菌、胺基酸、特殊化合物 | 這才是品牌之間真正拉開差距的地方 |

換句話說，**functional ingredient 是一個「減法定義」**——它不是一類有共同性質的東西，而是「扣掉基礎營養素後剩下的」。所以看到這個詞，要先確認扣掉的是哪些。

> 🔀 **同形異義提醒**：**macro** 這個字在我們的文件裡至少有四個意思。**本文脈絡只指「巨量營養素 macronutrient」**；程式的「巨集」、經濟學的「總體」是另外的意思，而「巨觀 / 微觀層次」那一義在 [emergence-data-compute.md](./emergence-data-compute.md) 有完整討論。看到 macro 先確認脈絡。

---

## 10. 資料是從哪裡來的：一堆縮寫

看 dashboard 或跟資料團隊講話時會撞到這些：

| 縮寫 | 是什麼 |
|---|---|
| **DSLD** | 美國 NIH 膳食補充劑辦公室（ODS）維護的補充劑標籤資料庫。擷取狀態見 [dsld-crawler.md](../projects/atlasvault/dsld-crawler.md) |
| **LanguaL** | 一套國際食品描述的分類編碼系統，DSLD 用它來標劑型 |
| **facet（面向）** | LanguaL 用來切分類的**軸**——同一個產品可以同時被好幾個 facet 描述，彼此不衝突。DSLD 的劑型就標在 **Facet A**。發音近 /ˈfæsɪt/（「花-sit」，不是「法-sei」） |
| **UNII** | FDA 給每個成分的唯一識別碼，用來跨系統對齊「這兩個名字是不是同一個成分」 |
| **ASIN** | Amazon 的商品編號 |
| **UPC** | 商品條碼，實體零售的通用識別碼 |

另外，我們的產品 ID 開頭那個字母就是資料來源：

- `A_` = Amazon（透過 Keepa）
- `I_` = iHerb
- `T_` = 品牌官網
- `S_` = 品牌的 Shopify 商店
- `D_` = DSLD（保留欄位，目前未啟用）

---

## 11. ⚠️ 六個數字陷阱

這節是**踩過才會痛**的部分。以下每一條都是實際發生過的誤讀。

| # | 陷阱 | 正確理解 |
|---|---|---|
| 1 | **價格看起來多了 100 倍** | 資料庫裡價格單位是 **cents（分）**，不是元。而且要分清 per package / per serving / per unit——講價格必須標明基準 |
| 2 | **「覆蓋率」到底在覆蓋什麼** | 專案裡有**兩種**覆蓋率：`data coverage`（某欄位有資料的產品比例）和 `scope coverage`（某實體涵蓋幾個市場/品類）。所以規定**不准裸寫「覆蓋率」**，一定要講完整名稱 |
| 3 | **兩張表的百分比加不起來** | `voice_pct` / `product_pct` 的**分母依 view 而異**。同一個欄位名，在不同分析裡母體可能不同——跨表比較前先確認分母 |
| 4 | **產品數看起來比實際多** | `listing_count` 是**資料庫紀錄數**，跨來源不去重。同一罐產品在 Amazon 和 iHerb 各有一筆，就是 2 |
| 5 | **把資料來源當成通路策略** | `source_type`（技術上從哪抓的）≠ `channel_type`（商業上的通路角色）。兩者是正交的兩軸，不能互推 |
| 6 | **voice 是 0 = 沒人買** | 見第 7 節。Official 通路 by construction 就是 0 |

---

## 12. 中文對應建議

| 英文 | 建議中文 | 備註 |
|---|---|---|
| voice | 聲量 | 不要譯成「聲音」 |
| voice density | 聲量密度 | 相對值 |
| penetration | 滲透率 | 首次提及必須講清楚分母 |
| dosage form | 劑型 | — |
| Branded Ingredient (BI) | 品牌原料 | 舊稱 PI / 專利成分 |
| Branded Technology (BT) | 品牌化技術 | — |
| Branded Provenance (BP) | 品牌化產地 | — |
| market | 功能市場 | 依需求切 |
| category | 品類 | 依成分切 |
| hero ingredient | 主角成分 | — |
| clinical dose | 臨床劑量 | — |
| MVM | 綜合維他命 | — |
| certification | 認證標章 | 第 4 節。不要譯成「證書」——它指標籤上那排標記 |
| structure-function claim | 結構功能宣稱 | **法規用語，勿自創譯法**。與下一列是法規上界線分明的對立詞 |
| disease claim | 疾病宣稱 | **法規用語，勿自創譯法**。跨線即「未核准新藥」，見第 5 節 |

---

## 🔗 相關文檔

本文只做白話入口，**正式定義都在各系統自己的文件裡**，需要精確定義時請往下走：

- `LuminNexus-AlchemyMind-TheJournalism/specs/terms.yaml` —— 48 個術語的正式定義、公式、閾值與使用限制（**最權威的來源**）。⚠️ 需 TheJournalism repo 存取權，有權限者用 `uv run journalism terms <name>` 查詢；**沒有權限請直接問工程團隊**，不要照著指令打
- [../projects/prismavision/thejournalism.md](../projects/prismavision/thejournalism.md) —— 資料詮釋層系統導覽，「🔑 關鍵概念」有 16 個詞的情境內解釋
- [../projects/alchemymind/eidos.md](../projects/alchemymind/eidos.md) —— 品牌原料與菌株的正規化
- [../data-sources/dsld/dsld_database_guide.md](../data-sources/dsld/dsld_database_guide.md) —— DSLD 資料庫與 LanguaL 劑型編碼
- [../data-sources/data-sources-guide.md](../data-sources/data-sources-guide.md) —— 各資料來源與關聯欄位
- [../roles/testing/01_product-understanding.md](../roles/testing/01_product-understanding.md) —— 測試角色的產品理解（本文補的正是它「資料維度」那節沒展開的產業語意）
- [ai-data-terminology.md](./ai-data-terminology.md) —— AI / 資料術語（infer / derive / reasoning）
- [../data-sources/dsld/json_structure_reference.md](../data-sources/dsld/json_structure_reference.md) —— DSLD 的 LanguaL Facets 逐項對照（第 10 節 facet 的實際欄位）
- **（待補）** 分類體系術語文 —— taxonomy / facet / set / realm / macro 等**當通用邏輯概念用**的詞。本文只收了 facet 在 LanguaL 脈絡下的產業義（第 10 節），泛用義待該文收錄

---

## 📝 文檔維護

### ⚠️ 草稿聲明

**本文尚未完成 issue #5 要求的完整盤點。** 目前收錄的詞來自兩個來源：

1. `specs/terms.yaml` 的 48 個正式術語（已篩掉屬於報告方法論、非產業詞的部分）
2. LearningMap 全庫的缺口實查（哪些詞只有裸用、沒有解釋）

**還沒做的是 issue 明列的反向來源**——直接問 testing / BA 同事「第一週哪些詞看不懂」、翻 Slack 提問紀錄。issue #5 特別警告：*寫的人（工程 / AI 背景）覺得理所當然的詞，正是非技術新人卡住的地方*。所以這份清單**必然還漏著我已經內化、卻沒意識到要解釋的詞**。定稿前必須補這一輪。

### 內容出處分層

本文混合了三種來源，可信度不同。**下游要把某一條當定義引用之前，先查這張表。**

| 標記 | 意思 |
|---|---|
| ✅ **SSOT** | 站內／`terms.yaml` 有正式定義背書，可安全引用（但仍以原始出處為準） |
| 📖 **外部權威** | 站內無出處，但已對照**法規原文或認證機構官方頁**查證，正文附連結可自行核對 |
| ⚠️ **歸納** | 實務歸納或產業常識，**查無權威出處、未經查證** |

| 內容 | 出處 | 分層 |
|---|---|---|
| 六種成分角色（**定義**） | `terms.yaml` `ingredient_role` 六條 | ✅ SSOT |
| 六種成分角色（**我舉的例子**：黑胡椒萃取、關節配方 MSM 等） | 無——`terms.yaml` 該六條沒有 `examples` 欄位 | ⚠️ 歸納 |
| voice 公式 | `terms.yaml` `voice.formula` + TheJournalism CLAUDE.md | ✅ SSOT |
| Official 通路 voice = 0 | `terms.yaml` `voice.caveats` | ✅ SSOT |
| voice density / VPP | `terms.yaml` | ✅ SSOT |
| penetration 閾值（<10% / 10–20% / >20%） | `terms.yaml` `penetration.thresholds` | ✅ SSOT |
| standalone rate、identity dilution、clinical dose | `terms.yaml` `formulation` 類 | ✅ SSOT |
| complexity tiers（≤5 / 6–20 / 21+） | `terms.yaml` `complexity_tiers` | ✅ SSOT |
| demand cluster | `terms.yaml`（出處 issue #152） | ✅ SSOT |
| market vs category 的定義 | `terms.yaml` `scope` 類 | ✅ SSOT |
| BI 舊稱 PI 的沿革 | TheJournalism CLAUDE.md | ✅ SSOT |
| BI / BT / BP 的例子 | eidos.md | ✅ SSOT |
| 產品 ID prefix（`A_`/`I_`/`T_`/`S_`/`D_`） | TheJournalism CLAUDE.md（**非** `terms.yaml`） | ✅ SSOT |
| 第 11 節六個數字陷阱（全六條） | `terms.yaml` 各條的 `usage` / `caveats` | ✅ SSOT |
| **第 1 節標籤結構**（Supplement Facts / Other Ingredients / serving size） | 無站內出處 | ⚠️ 歸納 |
| **第 4 節認證標章**（USP / NSF / GMP / USDA Organic / Non-GMO / Vegan） | v0.5 逐項查證、**v0.6 全數獨立複驗並取得官方頁原文**：USP `verified-mark` 頁、NSF Certified for Sport 官方頁、21 CFR Part 111（§111.75 原文）、7 CFR Part 205、Non-GMO Project 官方頁、Vegan Action 認證頁——連結見正文 | 📖 外部權威 |
| **第 5 節法規環境**（DSHEA、structure-function / disease claim、FDA 免責聲明、NDI） | v0.5 逐項查證：21 U.S.C. §321(ff)、21 CFR 101.93、21 U.S.C. §355(a)、21 U.S.C. §350b——連結見正文。免責聲明英文原文已核對法規逐字用語。**v0.6 重寫「入睡 vs 失眠」callout**，改以 101.93(g) 判準為據（原為二手摘要）；v0.6 複驗時另更正判準動詞漏譯（cure／治癒），並標明「偶發性難以入睡屬非疾病」出自 FDA 指引而非法條本文 | 📖 外部權威 |
| **第 9 節 vitamin / mineral 的定義與「為什麼排除」** | `functional_ingredient` 定義有，但分組說明與理由是白話推論 | ⚠️ 歸納 |
| **第 10 節縮寫解釋**（LanguaL / UNII / ASIN / UPC 各是什麼） | 無站內出處（DSLD 一條已於 v0.2 更正並改為指路） | ⚠️ 歸納 |
| **第 12 節中文對應建議**（整張表） | `terms.yaml` 只有英文 `display`；中文譯法為本文提案 | ⚠️ 歸納，待團隊確認 |

> 🔧 **複驗這批連結時的注意事項（v0.6 記）**：`usp.org`、`nongmoproject.org`、`vegan.org` 掛在 Cloudflare 後面，**用 curl 帶偽造 User-Agent（如 `-A "Mozilla/5.0"`）會被判定為機器人而回 403**；**不帶** UA 反而正常回 200。曾因此誤判這幾個來源「無法驗證」而差點刪掉有官方依據的內容。複驗指令：`curl -sL -o out.html -w "%{http_code}" <url>`。

> 📌 **⚠️ 那批的處理原則**：優先找到權威出處（法規原文、認證機構官網、產業標準文件）補進來，升級為 📖；找不到就降級為「僅供理解、不可引用」。v0.2 的 DSLD 條目原本誤標為「FDA 的資料庫」（實為 NIH ODS 維護），就是這一層出錯的實例——**這張表存在的理由**。
>
> **這套流程已驗證有效**：v0.5 把第 4、5 節從 ⚠️ 升級為 📖 的過程中，查證抓出三個原本寫錯或漏掉的地方（GMP「只查工廠不查產品」過度簡化、Non-GMO 未標明是民間非營利而非政府標準、法規節漏了 NDI 上市前通報的例外）。**⚠️ 那批不是「大概沒問題只是沒出處」，是真的會有錯。**

> 🔗 **關於外部連結的選擇**：`fda.gov` 與 `ecfr.gov` 對自動化查證有防護、無法直接核對，因此法規條文改連 **Cornell Law School LII**（`law.cornell.edu`，美國法典與 CFR 的逐字重製站），CFR 全文改連 **govinfo.gov**（美國政府出版局官方版，為 2023 年版快照）。兩者都是法規原文而非二手整理，但**引用到正式文件時請回查 eCFR 的現行版**。

### 待評估：哪些 term 值得配圖

issue #2 / #5 都提議「或許所有 term 都可以有視覺化的教學」，逐 term 評估。初步判斷：

| Term | 建議畫法 | 優先 |
|---|---|---|
| 六種成分角色 | 一張配方剖面圖，標出各成分位置 | 高 |
| market vs category | 兩種切法的對照（同一批產品、兩種分群） | 高 |
| voice density vs VPP | 相對 vs 絕對的並排小圖 | 中 |
| Supplement Facts / Other Ingredients | 一張標註過的標籤照 | 高 |
| BI / BT / BP | 三層標記示意 | 中 |

> 形態注意：若真要做互動 HTML，必須**同時有 md 入口**——SPA 的索引與搜尋只認 `.md`，單獨的 HTML 在站內是連不到的孤兒（見 issue #4 的教訓）。

### 其他待辦

- [ ] 完成反向來源盤點（問人 + 翻 Slack）
- [ ] 與 issue #2 的分類體系術語文互相指路（macro、set、realm、facet 的「另一義見 X」）
- [x] ~~確認與 `general/00_outline.md` 已登記的「1.2 營養補充品產業知識」的關係~~ → outline v2.16 加指路 blockquote（當時標明認證標準與法規環境尚未收錄）；v0.4 補上第 4、5 節後，outline v2.17 已解除該註記，兩邊現已對齊
- [ ] 每個詞加上「首次出現在哪份報告 / 哪個 dashboard」的實例連結
- [x] ~~第 3 節 BI/BT/BP 瘦身~~ → v0.3 完成：例子欄對齊 eidos 正式例子、owner/strain 併成一行指路、節末加 SSOT 指路；PI → BI 沿革保留（eidos 沒有，本文獨有）
- [x] ~~**標註出處分層**~~ → v0.4 完成：新增〈內容出處分層〉表，逐條標 ✅ SSOT / ⚠️ 歸納
- [x] ~~**確認 voice 公式**~~ → v0.4 完成：確認為 `terms.yaml` `voice.formula` 原文，**不對稱非筆誤**（`Products` 表 Amazon 側有 review_count 與 rating_count 兩欄，iHerb 側只有 rating_count），已補出處註記與不對稱說明
- [x] ~~**決定草稿聲明位置**~~ → v0.4 完成：警語前移至標題正下方（含「撞到沒解釋的詞請回報」的邀請），frontmatter `summary` 亦加註；**維持上站**——撤下會讓 outline 1.2 的指路斷掉，且拿不到最需要的讀者回饋
- [x] ~~**補漏收詞**（certification / NSF / USP / GMP / vitamin / mineral / 法規環境）~~ → v0.4 完成：新增第 4 節（認證標章，區分品質驗證 vs 消費者訴求）、第 5 節（法規環境，structure-function claim）、第 9 節 vitamin / mineral 正面定義
- [ ] **補第二批漏收詞**（v0.4 確認需要、尚未動工）：
  - `proprietary blend`（專有配方）—— **優先度最高**：只標複方總量不標各成分含量，所有劑量分析遇到它就斷線；全庫僅 `theweaver.md` 一處裸用
  - `HHI`（市場集中度）—— 全庫僅一處，且是被當 L0/L1/L2 的舉例用；`terms.yaml` 有現成 5 級閾值
  - `brand archetype` / `competitive position`（Kotler 四分）—— 全庫零出現，且屬商業概念非統計
  - `hero formula` —— 與 hero ingredient 差一個層級（成分角色 vs 整罐產品定位），補一行即可
- [x] ~~**反向來源第一筆（2026-07-28）**：會議上聽到同事口語使用 **facet**（誤讀近似「法-sei」）~~ → v0.7 部分處理：實查確認全庫 8 處裸用零解釋（`dsld_database_guide:258`、`json_structure_reference:1085-1087`、`therefinery` 5 處）。**第 10 節已補 facet 的 LanguaL 產業義 + 發音**，接住 DSLD 那叢；`DosageFormFacets` 同義順帶解決。**泛用邏輯義仍歸 issue #2 未解**
- [ ] **第 4、5 節新詞的中文譯法待團隊確認**：v0.7 已把 `certification` / `structure-function claim` / `disease claim` 收進第 12 節，但後兩者是法規用語，譯法應找法務或有合規經驗的人確認過再定稿

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 0.1 | 2026-07-28 | Dustin | 初稿：標籤結構、成分六角色、BI/BT/BP、market vs category、voice 家族、MVM/macronutrient、資料來源縮寫、六個數字陷阱、中文對應。盤點未完成，反向來源待補 |
| 0.2 | 2026-07-28 | Dustin | penetration 獨立成第 6 節（原埋在 voice 節末，且它屬 BI 家族非 voice 家族），章節重編號 6–9 → 7–10；DSLD 改正為 NIH/ODS（原誤標 FDA）並將擷取狀態改為指路 dsld-crawler；macro 同形異義改指 emergence-data-compute（原指 issue 編號，新人無法追）；terms.yaml 標明需 repo 權限；ai-data-terminology 補成可點連結。BI/BT/BP 瘦身與出處分層列入待辦 |
| 0.3 | 2026-07-28 | Dustin | 第 3 節 BI/BT/BP 瘦身：例子欄對齊 eidos 的正式例子（BioPerine®／Phytosome®／Albion®，原例子站內查無且與 SSOT 平行維護必然漂移）、owner 與 strain 兩段併成一行指路、節末加「本節只做白話對照不是定義書」的 SSOT 指路；第 2 節加「配方角色 vs 是否品牌化」兩軸正交的提醒（因 BioPerine® 現同時出現於第 2、3 節） |
| 0.4 | 2026-07-28 | Dustin | 三件事：①〈內容出處分層〉表落地，逐條標 SSOT / 歸納（v0.2 誤標 DSLD 為 FDA 即此層出錯的實例）；② 草稿警語前移至標題正下方並加註 frontmatter summary，維持上站不撤下；③ 補 outline 1.2 欠的兩塊——新增第 4 節認證標章（品質驗證 USP/NSF/GMP vs 消費者訴求 Organic/Non-GMO/Vegan 的分野）、第 5 節法規環境（DSHEA、structure-function claim vs disease claim、FDA 免責聲明），第 9 節補 vitamin/mineral 正面定義與「functional ingredient 是減法定義」。章節重編號 5–10 → 7–12；voice 公式補出處與不對稱說明 |
| 0.5 | 2026-07-28 | Dustin | 第 4、5 節外部權威查證並補連結，出處分層加第三級 📖 外部權威（原本 ✅／⚠️ 兩級把「有法規原文可查」與「純屬歸納」混為一談）。查證同時修正三處：① GMP「查的是工廠不是產品」過度簡化——21 CFR Part 111 也強制廠商自檢成分與成品，差別在非第三方獨立驗證；② Non-GMO Project 與 Vegan 補標「民間非營利」以與政府法規的 USDA Organic 區隔，並加註官方自陳「不等於保證不含 GMO」；③ 第 5 節補漏掉的 NDI 例外（21 U.S.C. §350b，新成分仍須上市前 75 天通報），原文「上市前不需要 FDA 核准」對舊成分成立、對新成分不成立。另補 FDA 免責聲明英文法定原文與「有助於入睡 vs 治療失眠」的分界說明；USP Verified 加註不評估安全性與功效 |
| 0.6 | 2026-07-28 | Dustin | 第 4、5 節的外部來源**全數獨立複驗**，並據官方原文修正五處：① USP 連結改指 `verified-mark` 頁（官方逐條列出標章保證什麼），「驗什麼」欄改用官方用語「宣稱效價與含量」「有害含量的指定污染物」，移除官網未載明的「可崩解吸收」；② USP 邊界改成從官方表述 "what's on the label is what's in the bottle" 推導其**範圍界線**，不再宣稱「USP 不評估功效」（官網查無此明文）；③ NSF「290 種以上」改為官方數字「290 種」（原文為 "any of 290 substances"，無「以上」）；④ Certified Vegan 補上漏掉的第二個條件「未經動物實驗」（官方定義為不含動物成分／副產品**且**未經動物實驗）；⑤ 「有助於入睡 vs 治療失眠」改掛 21 CFR 101.93(g) 的判準（分界在指涉對象是不是可診斷的病），不再依賴無法取得的 FDA guide。另修一處內部矛盾：節末原寫「品質驗證標章回答『有沒有效、安不安全』」與 USP 邊界說明衝突，改為「這罐是不是它說的東西」並加註兩種標章都不回答療效。出處分層表記錄 Cloudflare 誤判 403 的複驗陷阱 |
| 0.7 | 2026-07-28 | Dustin | 三項收尾：① `CLAUDE.md` / `STRUCTURE.md` 的 general 樹補上本檔、`chart-type-gallery`、`atomization-context-isolation`（三份都缺，而 CLAUDE.md 的「Check Before Create」政策正是靠這棵樹）；② 第 12 節收 `certification`、`structure-function claim`、`disease claim`——後兩者是法規上界線分明的對立詞，各譯各的有合規風險；③ 第 10 節補 **facet**（LanguaL 的分類軸、DSLD 標在 Facet A、附發音），接住全庫 8 處裸用中最大的一叢，並在相關文檔補 `json_structure_reference.md` 的 LanguaL Facets 對照、把原本只指 issue #2 的那條改寫成說明產業義與泛用義的分工 |
