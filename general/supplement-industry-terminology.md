---
title: "保健食品產業術語：看懂這個產業在講什麼"
type: reference
status: active
created: 2026-07-28
updated: 2026-07-28
version: "0.2"
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
  白話對照與指路。
---

# 保健食品產業術語：看懂這個產業在講什麼

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
| **BI** | Branded Ingredient | **成分本身**——特定萃取規格、特定產地的原料 | KSM-66（南非醉茄）、Sensoril |
| **BT** | Branded Technology | **製程或遞送技術** | phytosome®、liposomal、chelation、sustained-release |
| **BP** | Branded Provenance | **來源、產地或栽培方式** | Organic India®、特定產地認證標章 |

> ⚠️ **命名沿革陷阱**：BI 以前叫 **PI（Proprietary Ingredient）**，舊文件、舊欄位名、舊報告裡到處都是 PI。**兩者指同一件事**，看到 `pi_landscape`、`pi_gap`、`PI penetration` 不要以為是另一個概念。

相對於這三種標記，**generic（通用配方）** 指的是完全不含任何 BI 的產品。

其他跟「誰擁有什麼」有關的詞：

- **owner（原料商 / 品牌擁有者）**：擁有某個 BI 的公司。例：Sabinsa 擁有 KSM-66。注意 owner 跟**產品品牌**是兩件事——NOW 是產品品牌，Sabinsa 是原料商。
- **strain（菌株）**：益生菌專有的概念。同一個菌種底下不同菌株的效果不能互相套用，標示到菌株層級才有意義。

---

## 4. 市場是怎麼被切的

這裡有一組**日常可以互換、但本專案嚴格區分**的詞。這是最容易誤會的一組：

| 詞 | 依什麼切 | 一個產品可以屬於幾個 |
|---|---|---|
| **market（功能市場）** | 消費者**想解決什麼問題**（benefit-defined） | 多個 |
| **category（品類）** | **含哪個成分**（ingredient-defined） | 只要含該成分就算 |

例：一罐「薑黃 + 葡萄糖胺」複方，在 category 上屬於薑黃**也**屬於葡萄糖胺；在 market 上可能同時出現在關節健康與發炎控制。

- **functional market（功能市場）** = 上表的 market，只是講法不同。專案目前有 **24 個**。
- **demand cluster（需求分群）**：把 24 個 market 按消費者需求語意再往上收成幾個高階群組。

---

## 5. voice：把「消費者注意力」變成一個數字

**voice** 是這套系統最常出現的指標，也是最容易被誤解的。

> **voice = Amazon 評論數 + iHerb 評分數**

它是消費者注意力的**代理指標**——概念上接近「討論度」，但資料上就是評論數加總。

**它不是**：不是銷售額、不是市佔率、不是媒體聲量（share of voice）、不是質性回饋（voice of customer）。

⚠️ **一定要記的一件事**：品牌官網（Official 通路）的產品 **voice 永遠是 0**——不是沒人買，是**那個通路根本沒有評論資料**。把 0 讀成「乏人問津」是新人最常犯的錯。

由 voice 衍生的兩個指標，差別要分清：

| 指標 | 算法 | 白話 |
|---|---|---|
| **voice density（聲量密度）** | voice 佔比 ÷ 產品數佔比 | **相對值**。>1 = 用比較少的產品拿到超額注意力 |
| **VPP（Voice Per Product）** | voice 總量 ÷ 產品數 | **絕對值**。平均每個產品帶來多少評論 |

---

## 6. penetration：一個成分鋪得多廣

**penetration（滲透率）** 指某個 BI 在「有資格含它的產品」裡實際出現的比例（<10% 低、10–20% 中、>20% 高）。

⚠️ 講 penetration **一定要講分母**——「有資格出現」的範圍怎麼定，數字就跟著變。同一個成分換一個母體，可以從「低滲透」變成「高滲透」。

**pi_gap** 則是滲透率與 voice 佔比的落差：一個成分**鋪得廣**（penetration 高）不代表**被討論得多**（voice 佔比高），兩者的差距正是商業機會或警訊所在。

> 📌 penetration 屬於 BI 家族（第 3 節），不是 voice 家族——只是計算 pi_gap 時要跟 voice 佔比放在一起看。

---

## 7. MVM 與 macronutrient：為什麼分析常常要「排掉」

**MVM = Multi-Vitamin/Mineral（綜合維他命）**。

它不是一種普通產品，是**統計的污染源**：一罐綜合維他命動輒含三、四十種成分，於是幾乎每個成分的「滲透率」都被它灌水。所以你會常看到分析加了排除條件、參數名叫 `exclude_mvm` 之類的東西——**那不是在隱藏資料，是在還原真實的成分採用率**。

衍生詞 **MVM dependency（MVM 依賴度）**：某個市場有多少比例是靠綜合維他命撐起來的。這個數字高，代表該市場的成分分析要特別小心。

同理還有 **macronutrient（巨量營養素）**——蛋白質、脂肪、碳水這類，相對於 vitamin / mineral 這些微量營養素。分析功能性成分時通常也會排掉。

反過來，**functional ingredient（功能性成分）**就是「排除 vitamin、mineral 之後的成分」。

> 🔀 **同形異義提醒**：**macro** 這個字在我們的文件裡至少有四個意思。**本文脈絡只指「巨量營養素 macronutrient」**；程式的「巨集」、經濟學的「總體」是另外的意思，而「巨觀 / 微觀層次」那一義在 [emergence-data-compute.md](./emergence-data-compute.md) 有完整討論。看到 macro 先確認脈絡。

---

## 8. 資料是從哪裡來的：一堆縮寫

看 dashboard 或跟資料團隊講話時會撞到這些：

| 縮寫 | 是什麼 |
|---|---|
| **DSLD** | 美國 NIH 膳食補充劑辦公室（ODS）維護的補充劑標籤資料庫。擷取狀態見 [dsld-crawler.md](../projects/atlasvault/dsld-crawler.md) |
| **LanguaL** | 一套國際食品描述的分類編碼系統，DSLD 用它來標劑型 |
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

## 9. ⚠️ 六個數字陷阱

這節是**踩過才會痛**的部分。以下每一條都是實際發生過的誤讀。

| # | 陷阱 | 正確理解 |
|---|---|---|
| 1 | **價格看起來多了 100 倍** | 資料庫裡價格單位是 **cents（分）**，不是元。而且要分清 per package / per serving / per unit——講價格必須標明基準 |
| 2 | **「覆蓋率」到底在覆蓋什麼** | 專案裡有**兩種**覆蓋率：`data coverage`（某欄位有資料的產品比例）和 `scope coverage`（某實體涵蓋幾個市場/品類）。所以規定**不准裸寫「覆蓋率」**，一定要講完整名稱 |
| 3 | **兩張表的百分比加不起來** | `voice_pct` / `product_pct` 的**分母依 view 而異**。同一個欄位名，在不同分析裡母體可能不同——跨表比較前先確認分母 |
| 4 | **產品數看起來比實際多** | `listing_count` 是**資料庫紀錄數**，跨來源不去重。同一罐產品在 Amazon 和 iHerb 各有一筆，就是 2 |
| 5 | **把資料來源當成通路策略** | `source_type`（技術上從哪抓的）≠ `channel_type`（商業上的通路角色）。兩者是正交的兩軸，不能互推 |
| 6 | **voice 是 0 = 沒人買** | 見第 5 節。Official 通路 by construction 就是 0 |

---

## 10. 中文對應建議

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
- **（待補）** 分類體系術語文 —— taxonomy / facet / set / realm / macro 等邏輯概念詞，見 LearningMap issue #2

---

## 📝 文檔維護

### ⚠️ v0.1 草稿聲明

**本文尚未完成 issue #5 要求的完整盤點。** 目前收錄的詞來自兩個來源：

1. `specs/terms.yaml` 的 48 個正式術語（已篩掉屬於報告方法論、非產業詞的部分）
2. LearningMap 全庫的缺口實查（哪些詞只有裸用、沒有解釋）

**還沒做的是 issue 明列的反向來源**——直接問 testing / BA 同事「第一週哪些詞看不懂」、翻 Slack 提問紀錄。issue #5 特別警告：*寫的人（工程 / AI 背景）覺得理所當然的詞，正是非技術新人卡住的地方*。所以這份清單**必然還漏著我已經內化、卻沒意識到要解釋的詞**。定稿前必須補這一輪。

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
- [x] ~~確認與 `general/00_outline.md` 已登記的「1.2 營養補充品產業知識」的關係~~ → 已於 outline v2.16 加指路 blockquote，並標明認證標準與法規環境尚未收錄
- [ ] 每個詞加上「首次出現在哪份報告 / 哪個 dashboard」的實例連結
- [ ] **第 3 節 BI/BT/BP 瘦身**：例子欄改用 `eidos.md` 的正式例子（BioPerine® / Phytosome® / Albion®），owner、strain 兩條併成指路——現行例子（KSM-66、Sensoril、Organic India）站內查無，且與 SSOT 維護兩份平行清單必然漂移。PI → BI 沿革一條保留（eidos 沒有，本文獨有）
- [ ] **標註出處分層**：六種成分角色、VPP / standalone rate / identity dilution、demand cluster、simple/moderate/complex 閾值、penetration 閾值、產品 ID prefix、第 9 節欄位名——以上站內查無佐證，需逐條標成「terms.yaml 定義」或「實務歸納，待查證」
- [ ] **確認 voice 公式**：`:145` 寫「Amazon 評論數 + iHerb 評分數」，兩邊不對稱（review count vs rating count？）；`thejournalism.md` 只寫「市集通路的評論數」。若非 terms.yaml 原文，應退回 SSOT 說法
- [ ] **決定草稿聲明位置**：本文已上站（`site/config.json` 基礎核心分軌），但草稿聲明埋在文末——需前移到「📋 文檔目的」，或先從站上撤下
- [ ] **補漏收詞**：certification（Organic / Non-GMO / Vegan）、NSF / USP / GMP、vitamin / mineral 正面定義、法規環境——皆為 issue #5 已知候選或 outline 1.2 已列

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 0.1 | 2026-07-28 | Dustin | 初稿：標籤結構、成分六角色、BI/BT/BP、market vs category、voice 家族、MVM/macronutrient、資料來源縮寫、六個數字陷阱、中文對應。盤點未完成，反向來源待補 |
| 0.2 | 2026-07-28 | Dustin | penetration 獨立成第 6 節（原埋在 voice 節末，且它屬 BI 家族非 voice 家族），章節重編號 6–9 → 7–10；DSLD 改正為 NIH/ODS（原誤標 FDA）並將擷取狀態改為指路 dsld-crawler；macro 同形異義改指 emergence-data-compute（原指 issue 編號，新人無法追）；terms.yaml 標明需 repo 權限；ai-data-terminology 補成可點連結。BI/BT/BP 瘦身與出處分層列入待辦 |
