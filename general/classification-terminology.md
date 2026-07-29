---
title: "分類體系術語：taxonomy / facet / canonical / realm"
type: reference
status: active
created: 2026-07-28
updated: 2026-07-29
version: "0.2"
project: LearningMap
author: Dustin
tags:
  - terminology
  - taxonomy
  - classification
  - data-modeling
audience:
  - all
summary: |
  跨系統分類體系術語的白話對照入口。這批詞（taxonomy、facet、canonical、slug、
  alias、realm、kind、predicate、cohort、macro）不屬於任何產業，卻貫穿我們所有
  repo——新人問「facet 是什麼、跟 taxonomy 什麼關係」目前要跨三個 repo 拼答案。
  各系統的 SSOT 不搬運，只做白話對照與指路。⚠️ v0.x 草稿：盤點未完成，set
  一節因 SSOT 在無法存取的 repo 而暫掛，引用前請看文末的「內容出處分層」表。
---

# 分類體系術語：taxonomy / facet / canonical / realm

> ⚠️ **這是草稿，不是定稿**（目前版本見 frontmatter）。三件事請先知道：
>
> 1. **詞彙範圍還沒盤點完** —— 缺 issue #2 要求的「反向來源」（實際問新人哪些詞卡住）。撞到本文沒解釋的詞請直接回報。
> 2. **`set`（判準集）一節暫掛** —— 它的正式定義在 Carboniferous repo，目前無法存取。本文只給白話指路。
> 3. **不是每一條都有正式定義背書** —— 見文末〈**內容出處分層**〉表，引用前先查。

---

## 📋 文檔目的

這批詞看起來各不相干，其實在回答**同一組問題**：

> 一大堆東西擺在面前，**怎麼分類、怎麼命名、怎麼確認兩個名字指的是同一個東西**。

它們不屬於保健食品產業——換成汽車零件、換成書店庫存，同一套詞照樣成立。這也是它們跟[產業術語](./supplement-industry-terminology.md)的分界線：**「這個詞搬到別的產業還講得通嗎？」通 → 在本文；不通 → 在產業術語文。**

### 一個貫穿全文的真實案例

我們資料庫裡有一堆這樣的東西：

```
Lion's Mane  ·  lions mane  ·  Lions Mane  ·  Hericium erinaceus  ·  猴頭菇
```

它們是同一種菇。但因為成分名稱從未正規化，**同一個成分在資料庫裡碎成約 90 種寫法**（TheJournalism issue #357），於是「猴頭菇市場有多大」這個問題，答案直接錯了。

從「發現它碎了」到「把它收攏」，一路上要用的詞就是本文這批。

> **怎麼讀**：第 1 節（taxonomy vs facet）是本文核心，其餘用到再查。

---

## 1. 兩種分類法：taxonomy 與 facet

這是本文最重要的一節，也是全庫缺口最大的一塊。

### 先看 taxonomy（分類法）

**一棵樹。每個東西掛在樹上的一個位置。**

```
SupplementFact
├─ Vitamins
│   ├─ Vitamin C
│   └─ Vitamin D
├─ Minerals
│   ├─ Calcium
│   └─ Zinc
└─ Probiotics
```

特性是**階層、有父子關係、互斥**——往下鑽一條路徑，最後停在一個節點。站內完整教材見 [`smart-insight-engine/01_mdof-fundamentals.md`](../projects/prismavision/smart-insight-engine/01_mdof-fundamentals.md) §3.2。

我們自己的實例：Eidos 的 `Company → Brand → Sub-brand` 就是一棵三層的樹（`specs/ENTITY_CLASSIFICATION_POLICY.md` §2.1）。

### 再看 facet（分面）

**一個 facet = 一個問題。** 這個問題對每個東西都問得出答案，而且**它的答案推導不出別的問題的答案**。

如果你讀過[產業術語文第 4 節](./supplement-industry-terminology.md)，你已經看過 facet 了——那節說「品質驗證標章回答『**這罐是不是它說的東西**』，消費者訴求標章回答『**合不合我的價值觀**』，**一罐有機非基改的產品完全可能沒做過任何含量驗證**」。那就是兩個 facet：兩個獨立的問題，互相推導不出對方。

> 💡 那節還補了第三個觀察：**兩種標章都不回答「有沒有效」**。這正是 facet 思維的日常用法——先問「這批分類軸各自回答什麼」，才看得出**它們共同答不出什麼**。

Eidos 的規範文件裡，那張表的欄位標題直接就是這個意思（`specs/DogTag/VERTICAL_SEGMENT_GUIDE.md`）：

> `| Facet | Question it answers | What it does NOT answer |`

### 最好的比喻：電商的篩選側欄

你在購物網站左邊看到的那條側欄：

```
劑型      □ 膠囊  □ 錠劑  □ 粉末  □ 軟糖
飲食適性  □ 素食  □ 非基改  □ 無麩質
認證      □ USP  □ NSF  □ USDA Organic
適用對象  □ 成人  □ 兒童  □ 孕哺
```

**每個粗體標題是一個 facet，底下的勾選項是它的值。**

這個比喻好在它自帶正確的運作規則：

- 同一組裡勾兩個 → **OR**（膠囊**或**錠劑都給我）
- 跨組各勾一個 → **AND**（要是膠囊**而且**要素食）

我們的程式碼一字不差就是這樣寫的（Eidos `dogtag_spa/src/lib/workbench-filters.ts`）：

> AND across axes; OR within an axis (standard facet semantics).

而且這不只是比喻——**我們的資料裡就有真的電商 facet**：Vitaway 這個品牌，是靠爬波蘭電商 Allegro 側欄的「marka（品牌）」那一格才發現的（Eidos `profiles/brands/vitaway.md`）。

> ⚠️ **不要用「尺」來理解 facet。** 尺（scale）暗示有刻度、有大小順序，但 facet 的答案通常沒有——軟膠囊不比膠囊「大」，孕婦不比成人「高」。站內文件明確反對過這個比喻：[`isomorphic-tension.html`](./isomorphic-tension.html) 的「**predicate 是 facet 不是 scale**」，理由是「每個成員本身就是一個維度，彼此不可通約」。

### 為什麼需要 facet：30 vs 2,200

DSLD 用 LanguaL 標準標了四個 facet，以下是[站內文件](../data-sources/dsld/dsld_database_guide.md)記載的代碼數：

| Facet | 問的問題 | 代碼數 |
|---|---|---|
| A-series | 這是哪類產品？ | 11 |
| E-series | 這是什麼物理型態？ | 10 |
| P-series（Claims） | 標了哪種宣稱？ | 5+ |
| P-series（User Groups） | 給誰吃的？ | 4+ |

> ⚠️ 這些是[站內文件](../data-sources/dsld/dsld_database_guide.md)記載的數字，**P-series 兩列原文就標 `+`，是下界**（實際代碼更多，見上一節 Facet A 的例子）。下面的算術請當**量級示意**，不是精確計數。

- **當成 facet**：11 + 10 + 5 + 4 = **約 30 個標籤**
- **當成一棵樹**：11 × 10 × 5 × 4 = **約 2,200 個葉節點**

每多問一個問題（「有機嗎？」），facet 加 2 個標籤，樹要 ×2 變成約 4,400 個節點。**數字會變，量級不會——加法 vs 乘法的差距才是重點。**

**而且樹逼你決定「先問哪一題」，那個順序是武斷的。** 一罐有機薑黃素軟膠囊，成人用，標了結構功能宣稱——用 facet 記就是四個獨立座標；用樹記，你得先決定是「產品類型 > 劑型 > 對象」還是「劑型 > 產品類型 > 對象」。一旦決定，「按劑型看市場」這件事就永久變貴（得掃遍上層所有分支的子樹）。

### 最嚴重的問題：樹會逼資料說謊

這是真的踩過的坑（Eidos `specs/DogTag/VERTICAL_SEGMENT_GUIDE.md` §2）。一罐**外用鎂噴霧**，四個問題的答案是：

| 問題（facet） | 答案 | 為什麼 |
|---|---|---|
| 貨架身份 | 保健食品 | 消費者在保健食品貨架上買它 |
| 法規身份 | 化妝品 | 外用不是口服，標示面板走化妝品規範 |
| 我們收不收 | 不收 | 我們只收可食用的 |
| 通路角色 | DTC | 它有可爬的官方賣場 |

文件的原話是：

> **All four facets disagree, and all four are correct.** Encoding any of these as a function of another loses information.

四個答案彼此矛盾，四個都對。這罐東西**在樹上沒有位置**——放進「保健食品」會誤導法規判讀，放進「化妝品」會弄丟它的貨架身份。

而真正的災難是同一份文件記下的後續：寵物保健品沒地方放，有人就把它標成「不在我們範圍內」，**只為了讓它從爬蟲清單消失**。文件的評語是——

> this **lies about identity** to win a crawl filter

**為了一個暫時的操作需求，把一個永久的身份事實改成假的。** 這是格子不夠時，人一定會做的事。

### 關鍵：兩者不對立

最容易誤會、也最值得記住的一點：

> **facet 決定「你問幾個問題」；taxonomy 決定「單一問題的答案怎麼組織」。**
> **一個 facet 內部，完全可以是一棵樹。**

DSLD 的 Facet A 就是這樣——代碼**前綴本身帶著階層**：`A1xxx` = 補充品配方，`A0xxx` = 食品配方（見 TheJournalism `specs/sdd_market_product_type_class.md`）。

> ⚠️ 站內 [dsld guide](../data-sources/dsld/dsld_database_guide.md) 列的 11 個 A-series 代碼**全部是 `A1xxx`**，看不到這個階層——那份清單是 DSLD dump 的子集，不是全集（實查 `distiller.db` 有 56 個相異 A-series 代碼，`A1` 前綴 315,935 筆、`A0` 前綴 26,728 筆）。**看到「完整列表」四個字，先確認它完整的是哪個範圍。**

TheJournalism 的 `product_type_class` 參數做的正是「**在 Facet A 這一個問題內部，往上退一層看**」，四個值 `all` / `supplement` / `food` / `classified`。所以當有人說「`product_type_class` 是 LanguaL Facet A lens」，完整意思是：**Facet A** 是那個問題，**lens（鏡頭）** 是在這個問題內部選一個解析度。

| | taxonomy（樹） | facet（多問題） |
|---|---|---|
| 結構 | 一條路徑 | 一組座標 |
| 一個東西能有幾個位置 | **一個** | **每個 facet 各一個答案** |
| 問「所有軟膠囊」 | 掃遍全樹 | 讀那一欄 |
| 新增一個問題 | 整棵樹重建 | 加一欄，其他不動 |
| 答案有大小順序嗎 | 上下層＝包含關係 | 通常沒有 |

---

## 2. 同一個東西的多個名字：canonical / slug / alias

回到猴頭菇。你發現資料庫裡有 90 種寫法，接下來要收攏它們——這一組就是收攏的工具。

| 詞 | 白話 |
|---|---|
| **canonical（正典 / 正規形式）** | 一群同義寫法裡，**被選為官方代表的那一個** |
| **alias（別名）** | 「這些寫法都指向同一個 canonical」的對照表 |
| **slug** | 給機器用的**乾淨識別字串**：全小寫、空格改連字號、去掉標點 |

套用到猴頭菇：

```
alias:      Lion's Mane / lions mane / Hericium erinaceus / 猴頭菇
canonical:  Lion's Mane          ← 選定的官方代表
slug:       lions-mane           ← 給網址、檔名、程式用的形式
```

我們系統裡的規模（實際筆數）：`BrandAliases` 24,273 筆、`BrandedIngredientAliases` 9,625 筆；TheJournalism 另有 `CanonicalProduct` 表處理「同一罐產品在不同通路各有一筆紀錄」。

**slug 是 Eidos 裡出現密度最高的詞**（約 9,962 處）——因為每個實體都需要一個穩定、不會因為顯示名稱改動而失效的識別字串。你看到的 `joint_health`、`brand_slug` 都是 slug。

> 💡 **為什麼要分成三個詞？** canonical 是**選擇**（哪個當代表）、alias 是**對照**（哪些算同一個）、slug 是**格式**（怎麼寫成機器友善的樣子）。三件事分開，任何一件改變都不影響另外兩件——顯示名稱可以改，slug 不動，舊網址就不會壞。

---

## 3. 分層與歸群：realm / kind

| 詞 | 白話 | 實例 |
|---|---|---|
| **realm（領域）** | 一個**獨立的分析維度**，自帶一套 schema 和自己的 taxonomy | TheWeaver 的 `edible`、`health effect` 等 Knowledge Realm |
| **kind（種類）** | 同一層裡的類型標記 | Eidos 的 `brand` / `domain` / `mark` / `strain` |

`kind` 的實例很好懂：Eidos 的每個實體都有一個 kind，而**每個 kind 各自暴露不同的 facet**——`brand` 這個 kind 有「狀態 / 信心度」等欄位，`strain`（菌株）則有「屬 / 管轄地區」。同一個系統裡，不同種類的東西問的問題本來就不一樣。

> 🔍 **一個「查了才知道不是術語」的實例——`family`**
>
> 初稿曾把 `family（族）` 收成第三列，理由是它在 Eidos 出現上萬次，看起來像個沒被定義的重要概念。實查後發現：11,813 次出現裡有 **9,855 次在 `profiles/`**，而且全是英文散文——`family farm`、`family-owned since 1962`、`the founding family's involvement`。`specs/` 只有 14 次，都在註解的修辭裡。**沒有任何 schema key 或 enum 叫 family。**
>
> 這條留在這裡是因為它示範了一個判準：**高詞頻不等於術語**。判斷一個詞該不該收，要看它有沒有出現在 schema、enum、欄位名或規範文件的定義位置，而不是 grep 出來幾筆。

> ⚠️ **realm 是這批詞裡最危險的一個。** [`theweaver.md`](../projects/alchemymind/theweaver.md) 定義的 **Knowledge Realm** = 「LLM 分析產品的一個特定維度」，這是 AlchemyMind 的專屬語意；而 Carboniferous vocab 層的 realm 是**另一個意思**。**兩個定義互相不知道對方存在**——比 macro 的多義更貼近日常工作，因為兩邊都是我們自己的系統。遇到 realm，先問「誰的 realm」。

---

## 4. 條件與集合：predicate / set

| 詞 | 白話 | 狀態 |
|---|---|---|
| **predicate（謂詞 / 判準）** | 一個**可以判定真假的條件**：「含維生素 D 嗎？」 | 白話定義見下 |
| **set（判準集）** | 一組 predicate 組合起來圈出的**集合**，可做交集、聯集、差集 | ⚠️ **暫掛，見下** |

這一組是把「分類」從固定的樹，變成**可組合的查詢**——不再問「它掛在哪個節點」，而問「符合這些條件的東西有哪些」。

回到第 1 節的側欄比喻：**每勾一個框，就是加一個 predicate；勾完之後畫面上剩下的那批東西，就是一個 set。**

> 🚧 **`set` 的正式定義暫掛**：它的 SSOT 在 Carboniferous repo 的集合代數討論文件，撰稿時無法存取。本節只給白話直覺，**正式的判準 / 格 / realm 代數定義待補**。需要精確定義請直接問該 repo 的維護者。

---

## 5. 聚合與比較：cohort / dimension 階層

| 詞 | 白話 | 實例 |
|---|---|---|
| **cohort（同群）** | 因為**共享某個特徵**而被放在一起比較的一群 | dashboard 上的 KSM-66 sibling-cohort（同一個原料商旗下的兄弟品牌原料） |
| **dimension（維度）階層** | 查詢時「按什麼分組」，而分組本身可以有層級 | MDFO 查詢結構裡的 **D** |

cohort 跟 set 的差別：set 是**用條件圈出來的**（符合這些條件的都算），cohort 是**因為要比較才放在一起的**（這幾個彼此可比，所以擺一起看）。

---

## 6. macro：一個字四個意思

同一個希臘字根 μακρός（長、大），四個意思共用一個字：

| 意思 | 脈絡 | 歸屬 |
|---|---|---|
| **巨集 / 宏** | 程式：一個名字展開成一串指令 | 本文 |
| **巨觀 / 微觀層次** | 湧現、粗粒化 coarse-graining | 本文 |
| 總體 / 個體 | 經濟學 | 順帶提及 |
| **巨量營養素 macronutrient** | 營養學 | → [產業術語文](./supplement-industry-terminology.md) 第 9 節 |

**共同的根**：一個上層的名字，代表下層的一大堆。

**但教學價值在前兩者的差別**：

- **巨集的展開是確定且可逆的** —— 展開回去一模一樣，沒有資訊損失
- **粗粒化是有損且多對一的** —— 從「溫度」回不去每顆粒子的位置

> 📌 **這一義站內已經教過了，只是沒用這個名字**：[`emergence-data-compute.md`](./emergence-data-compute.md) §2.1「描述螞蟻的語言，跟描述蟻丘的語言，是兩套語言」就是 micro vs macro；[`no-one-is-home.md`](./no-one-is-home.md) 整篇是跨層級的分析陷阱；[`isomorphism-projection.md`](./isomorphism-projection.md) 的投影失真與 null space 是粗粒化有損性的代數版。**本節只負責安上名字，概念請讀那三篇。**

---

## 7. 命名衝突速查：L0/L1/L2 vs Layer 1/2/3

這兩組數字長得像，指的完全是兩件事：

| 講法 | 指什麼 |
|---|---|
| **Layer 1 / 2 / 3** | LuminNexus **生態系**的三大層：AtlasVault / AlchemyMind / PrismaVision |
| **L0 / L1 / L2** | TheJournalism **系統內部**的三層：Extract / Report / Narrate |

TheJournalism 整體位於生態系的 **Layer 3**，其內部再分 L0 / L1 / L2。

> 完整的稱呼約定見 [`thejournalism.md`](../projects/prismavision/thejournalism.md) 的「🗞️ 三層架構」節——本文只做收攏參照，不重述。

---

## 8. 中文對應建議

| 英文 | 建議中文 | 備註 |
|---|---|---|
| taxonomy | 分類法 | 一棵樹 |
| facet | 分面 | 一個問題／一條篩選軸 |
| canonical | 正典 / 正規形式 | 官方代表寫法 |
| alias | 別名 | 對照表 |
| slug | slug（不譯） | 譯成「短代碼」易生歧義 |
| realm | 領域 | ⚠️ 先問「誰的 realm」 |
| kind | 種類 | — |
| predicate | 謂詞 / 判準 | 可判真假的條件 |
| set | 判準集 | 定義暫掛 |
| cohort | 同群 | 為了比較而放在一起 |
| dimension | 維度 | MDFO 的 D |

---

## 🔗 相關文檔

本文只做白話入口，**正式定義都在各系統自己的文件裡**：

- [supplement-industry-terminology.md](./supplement-industry-terminology.md) —— 姊妹作：保健食品**產業域詞**（MVM、BI/BT/BP、voice…）。分界線：能搬到別的產業的在本文，不能的在那篇
- [ai-data-terminology.md](./ai-data-terminology.md) —— 家族第三份：AI / 資料術語（infer / derive / reasoning）
- [`smart-insight-engine/01_mdof-fundamentals.md`](../projects/prismavision/smart-insight-engine/01_mdof-fundamentals.md) §3.2 —— **taxonomy 的完整教材**（含階層圖），本文只講它跟 facet 的差別
- [`tools/google-product-category-intro.md`](../tools/google-product-category-intro.md) —— 一個真實世界 taxonomy 的完整案例
- [`projects/alchemymind/theweaver.md`](../projects/alchemymind/theweaver.md) —— Knowledge Realm 的正式定義
- [`projects/alchemymind/therefinery.md`](../projects/alchemymind/therefinery.md) —— `DosageFormFacets` 的四維劑型分類
- [`data-sources/dsld/dsld_database_guide.md`](../data-sources/dsld/dsld_database_guide.md) —— LanguaL Facet 對照表（含覆蓋率與代碼數）
- [`data-sources/dsld/json_structure_reference.md`](../data-sources/dsld/json_structure_reference.md) §5.2 —— **A/E/P 四個 facet 的完整代碼值列表**（目前全庫最能反推出 facet 概念的地方）
- [`emergence-data-compute.md`](./emergence-data-compute.md) · [`no-one-is-home.md`](./no-one-is-home.md) · [`isomorphism-projection.md`](./isomorphism-projection.md) —— macro / micro 那一義的完整討論
- **（無法存取）** Carboniferous `docs/20260722_set_algebra_discussion.md` —— `set` 的 SSOT
- **（英文，埋在 schema 規範裡）** Eidos `specs/DogTag/VERTICAL_SEGMENT_GUIDE.md` §2 —— 全庫最完整的 facet 正交性說明，含反例與後果分析

---

## 📝 文檔維護

### ⚠️ 草稿聲明

**本文尚未完成 issue #2 要求的完整盤點。** 目前收錄的詞來自三個來源：

1. issue #2 列出的候選清單（issue 自己聲明那只是起點，不是範圍）
2. Eidos / TheJournalism 兩個 repo 的實查詞頻（見下）
3. LearningMap 全庫的缺口實查

**還沒做的是反向來源**——實際問新人哪些詞卡住、翻 Slack 提問紀錄。

### 內容出處分層

| 標記 | 意思 |
|---|---|
| ✅ **SSOT** | 有正式定義或第一手程式碼／規範背書 |
| ⚠️ **歸納** | 白話推論或跨系統歸納，**未經該系統維護者確認** |
| 🚧 **暫掛** | SSOT 無法存取 |

| 內容 | 出處 | 分層 |
|---|---|---|
| taxonomy 的定義與階層實例 | `mdof-fundamentals.md` §3.2；Eidos `ENTITY_CLASSIFICATION_POLICY.md` | ✅ SSOT |
| facet = 一個問題 / 正交性 | Eidos `specs/DogTag/VERTICAL_SEGMENT_GUIDE.md` §2 | ✅ SSOT |
| facet 的 AND/OR 語意 | Eidos `dogtag_spa/src/lib/workbench-filters.ts` | ✅ SSOT |
| 外用鎂噴霧四軸矛盾、寵物 "lies about identity" | 同上 §2（本文為中譯改寫） | ✅ SSOT |
| 「facet 不是 scale」 | `isomorphic-tension.html` | ✅ SSOT |
| DSLD 四個 facet 的存在與 A/E 代碼數（11 / 10） | `dsld_database_guide.md` | ✅ SSOT |
| **P-series 代碼數（5 / 4）** | 同上，但**來源原文標 `5+` / `4+`**，是下界非確數 | ⚠️ 歸納 |
| `A1xxx`=補充品 / `A0xxx`=食品、`product_type_class` 四值 | TheJournalism `specs/sdd_market_product_type_class.md` | ✅ SSOT |
| **30 vs 2,200 的算式** | 依上表代碼數推算 | ⚠️ 歸納（算術正確，但「樹要 2,200 節點」是本文的論證方式） |
| **電商側欄比喻** | 本文提出 | ⚠️ 歸納 |
| canonical / alias 的規模數字 | TheJournalism DB 實際筆數 | ✅ SSOT |
| **canonical / slug / alias 三者的分工說明** | 本文歸納 | ⚠️ 歸納 |
| Knowledge Realm 定義 | `theweaver.md` | ✅ SSOT |
| **realm 跨系統同形異義** | 本文歸納（Carboniferous 側未能查證） | ⚠️ 歸納 |
| kind 的實例（brand/domain/mark/strain） | Eidos `scripts/spa_build_data.py` | ✅ SSOT |
| **`family` 不是術語的結論** | 實查 Eidos：11,813 次出現有 9,855 次在 `profiles/` 的英文散文，`specs/` 無 schema key | ✅ SSOT（negative finding） |
| **predicate 白話定義** | 本文歸納 | ⚠️ 歸納 |
| `set` | Carboniferous（無法存取） | 🚧 暫掛 |
| **cohort 與 set 的差別** | 本文歸納 | ⚠️ 歸納 |
| macro 四義與可逆／有損對比 | issue #2 的查證 + 站內三篇湧現教材 | ✅ SSOT |
| L0/L1/L2 vs Layer 1/2/3 | `thejournalism.md` | ✅ SSOT |
| `facet` = **分面** | 國教院《圖書館學與資訊科學大辭典》「分面式分類法」（faceted classification 的台灣官方學術譯名）；另見 zh.wikipedia「分面搜索」、ggplot2「分面」。**v0.2 定案，全庫統一** | ✅ SSOT（外部權威） |
| **中文對應建議（facet 以外的整張表）** | 本文提案 | ⚠️ 歸納，待團隊確認 |

### 待評估：哪些 term 值得配圖

issue #2 提議「或許所有 term 都可以有視覺化的教學」，逐 term 評估：

| Term | 建議畫法 | 優先 |
|---|---|---|
| taxonomy vs facet | 同一批產品的兩種切法並排（樹 vs 座標表） | 高 |
| facet 的 AND/OR | 一張電商側欄截圖式示意 | 高 |
| canonical / slug / alias | 猴頭菇 90 種寫法收攏成一個 canonical 的漏斗圖 | 高 |
| macro 的可逆 vs 有損 | 巨集展開↔還原、粗粒化單向箭頭的對照 | 中 |
| realm 的同形異義 | 兩個系統各自的 realm 疊圖 | 中 |

> 形態注意：若做互動 HTML，必須**同時有 md 入口**——SPA 的索引與搜尋只認 `.md`（見 issue #4 的教訓）。

### 待辦

- [ ] **完成反向來源盤點**（問新人 + 翻 Slack）
- [ ] **補 `set` 一節** —— 需 Carboniferous `docs/20260722_set_algebra_discussion.md` 的存取權
- [x] ~~**確認 `family` 的定義**~~ → v0.2 查結：**Eidos 沒有這個術語**。高詞頻來自 `profiles/` 的英文散文（family farm / family-owned），`specs/` 無 schema key。已從 §3 表格移除，改寫成「高詞頻不等於術語」的判準示例
- [ ] **向 Carboniferous 維護者確認 realm 的第二個語意**，補完同形異義那條
- [ ] **與產業術語文互指**：該篇第 4 節結尾加 forward reference（讀者在認證標章上已體驗過 facet，只差沒安名字）、第 10 節補 LanguaL Facet A 實例
- [ ] **考慮把 Eidos `VERTICAL_SEGMENT_GUIDE.md` §2 整段中譯** —— 目前是英文且埋在 schema 規範裡，LearningMap 讀者找不到
- [ ] **回報一個資料錯誤**：TheJournalism `data/highlights/market/eye_health/general.factlist.json` 的 `F-G904` 把 `product_type` 寫成「Facet C」，實為 Facet A（DSLD 無 C-series）

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 0.1 | 2026-07-28 | Dustin | 初稿（issue #2）：taxonomy vs facet（核心，含 30 vs 2,200 論證與「樹會逼資料說謊」的實例）、canonical/slug/alias、realm/kind/family、predicate、cohort/dimension、macro 四義、L0-L2 命名衝突、中文對應。`set` 因 SSOT 在無法存取的 repo 而暫掛。facet 一節放棄「多把尺」比喻改用電商側欄（站內文件明確反對 scale 類比），主實例採 DSLD LanguaL（值完整可驗）而非 DosageFormFacets（站內記載殘缺） |
| 0.2 | 2026-07-29 | Dustin | 查證修正六處：① §1 引產業術語文第 4 節的引文更正——原引「品質驗證標章回答『有沒有效』」是該文 v0.6 **刻意修掉**的說法，現行原文為「這罐是不是它說的東西」，並順勢補上「兩種標章都不回答有沒有效」作為 facet 思維的延伸；② Facet A 的 `A0xxx` 例子——站內 dsld guide 那 11 個代碼**全是 `A1xxx`**，改為以 TheJournalism sdd 文件為據，並加註「完整列表要問完整的是哪個範圍」（實查 distiller.db 有 56 個相異代碼）；③ 30 vs 2,200 的算式——來源原文標 `5+`／`4+` 是下界非確數，改為量級示意，出處分層拆出 P-series 一列降為 ⚠️；④ `family` 從 §3 表格移除——實查 Eidos 11,813 次出現有 9,855 次在 `profiles/` 的英文散文、`specs/` 無 schema key，改寫成「高詞頻不等於術語」的判準示例；⑤ 補上 CLAUDE.md／STRUCTURE.md／00_outline.md 三處登錄與姊妹作的反向連結 |
