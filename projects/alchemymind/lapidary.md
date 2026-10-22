---
title: "Lapidary - 把 copal 的宣稱切成 facet（查表、不經 LLM）"
type: spec
status: active
created: 2026-10-21
updated: 2026-10-23
version: "1.3"
project: LearningMap
author: maple
tags:
  - alchemymind
  - lapidary
  - copal
  - facet
  - taxonomy
  - layer-2
related:
  - 00_overview.md
  - amazoncopal.md
  - spiderweb.md
  - theweaver.md
  - thedistiller.md
  - ../../general/classification-terminology.md
audience:
  - all
summary: |
  Lapidary 把 AmazonCopal 已切好、屬於有限集合的 kind（口味、證照）用 yaml 對照表
  對到分類樹，產出 lapidary.db，純查表、不經 LLM。2026-10-21 起接手 SpiderWeb 的 flavor，
  2026-10-22 上線 certification（認證標章）與 certifier（認證機構）兩個 realm，三者自 TheDistiller
  v3.81.0 起都從 lapidary.db 讀（source 為 lapidary:<market>），由 TheTap 從 git 建置交接。
---

# Lapidary - 把 copal 的宣稱切成 facet（查表、不經 LLM）

---

## 📋 文檔目的

本文檔介紹 **Lapidary**，幫助新人理解：

- 為什麼口味（flavor）、證照（certification）與認證機構（certifier）不用 AI 判，改用查表
- 它從 AmazonCopal 讀什麼、交給 TheDistiller 什麼
- 它和 SpiderWeb、TheWeaver 的分工怎麼換手
- 它守的幾條設計原則，以及背後的理由

> **注意**：Lapidary 是 2026-10-21 才上線的新系統；flavor 自 TheDistiller v3.79.0 起切換，certification 與 certifier 自 v3.81.0（2026-10-22 部署）起進入 distiller.db。

> **完整技術文檔**：[Lapidary repo](https://github.com/mapleelpam/LuminNexus-AlchemyMind-Lapidary) 的 `CLAUDE.md`

---

## 🎯 系統職責

**一句話**：把 copal 已切好的、屬於有限集合的 kind，透過 yaml 對照表對到分類樹，寫成 `lapidary.db`。**純查表，不經 LLM。**

| 項目 | 說明 |
|------|------|
| **輸入** | AmazonCopal 的 `copal.amazon.db`、`copal.amazon.gb.db`、`copal.iherb.db`（只讀 `claims_all`，assay_spec v3.5） |
| **輸出** | `/opt/tap/lapidary.db`：一檔多表，市場放在 `source` 欄（keepa／keepa_gb／iherb） |
| **三個 realm** | flavor（22,858 列、216 個節點）、certification（60,578 列、100 個節點）、certifier（30,858 列、142 個節點） |
| **下游** | TheDistiller（v3.79.0 起必要輸入；v3.81.0 起三個 realm 全部接上） |

### 命名由來

AmazonCopal 用樹脂當比喻：copal 是還沒完全石化的琥珀，它把產品頁（PDP）讀成一句句宣稱（claims）。**Lapidary 是寶石切磨師**，把琥珀切出一個個切面（facet），例如口味、證照。

候選名還有 ThePalate（味覺），但它只對 flavor 有意義。certification 是真的存在的第二條線，名字要能涵蓋多條，所以選了 Lapidary。

### 為什麼不用 AI

AmazonCopal 已經把宣稱句正規化成標準命題（canonical proposition），同一個意思的說法變體很有限：

- flavor：22,921 列只對到 216 個節點
- certification：前 200 句不同的文字，就涵蓋 82% 的 claim

既然變體有限，查表就能做完，而且結果可重現、零成本。**對不上的句子代表 yaml 有缺口**，補別名（alias）或加葉節點（leaf），不叫模型去猜。

copal 另外六種 kind（benefit、attribute、warning、brand-fact、usage、generic-fact）不是有限集合，不會進 Lapidary，繼續由 TheWeaver 的 LLM 線處理。

---

## 🔄 在管線裡的位置

```mermaid
graph LR
    C[AmazonCopal<br/>copal.amazon / .gb / .iherb.db] -->|claims_all<br/>sensory-flavor、certification| L[Lapidary<br/>yaml 對照表查表]
    T[taxonomy/<br/>自 SpiderWeb 搬入] --> L
    L -->|git main| TT[TheTap<br/>每晚從 git 建置]
    TT --> DB[/opt/tap/<br/>lapidary.db/]
    DB -->|input/lapidary.db<br/>必要輸入，v3.79.0 起| D[TheDistiller]

    style L fill:#fff3e0
    style DB fill:#e3f2fd
```

**建置**：TheTap 從 Lapidary 的 git main 建置（`lapidary build --copal-dir input`），copal 的三份 db 由 TheTap 接進 `input/`，所以每份 `lapidary.db` 都對得到它讀的是哪一版 copal。

### 和 SpiderWeb、TheWeaver 的換手

| 系統 | flavor / certification 之前 | 之後 |
|------|------|------|
| TheWeaver | LLM analyzer 產生分類 | 不再是生產線（`scripts/flavor` 與 `flavors.yaml` 已刪，commit `e70663a`）；其他知識領域不受影響 |
| SpiderWeb | 保存結果、轉成 `spiderweb.db` | flavor 自 2026-10-21 凍結；Distiller 切換後移除 flavor 的來源與 forge 設定 |
| Lapidary | — | 接手；taxonomy 檔 2026-10-21 自 SpiderWeb 原樣搬入，FlavorCharacteristics 的 taxonomy id 主人改為 Lapidary |

---

## 📤 交接方式：lapidary.db

- **和 spiderweb.db 同表名、同欄位、同 CHECK**：`FlavorCharacteristics` + `FlavorCharacteristicsTaxonomy`、`Certification` + `CertificationTaxonomy`。所以 TheDistiller 讀這些表的程式（stage 10、11b、13b）**完全不用改，只改 attach 的檔案**。
- **`Certifier` + `CertifierTaxonomy` 是全新的表**：spiderweb.db 沒有，結構和其他 realm 表相同；和 Certification 用 `product_id` 對起來。TheDistiller v3.81.0 起也收進 distiller.db。
- **`source` 欄位**：TheDistiller v3.81.0 起，Flavor、Certification、Certifier 三個 realm 的 source 是 `lapidary:<market>`（之前是 `spiderweb:<market>`）。其餘 realm（HealthEffect 等）仍是 `spiderweb:<market>`。用 `source LIKE 'spiderweb:%'` 查這三張表，從這版起會查不到任何列。
- **單一 db，不分市場**：市場是一個欄位而不是一個檔，Distiller attach 一次就好。
- **`_metadata`**：`built_at`、`assay_spec`、每個 realm 的 `records`／`nodes`／`rejected`。
- **時間欄位是 build 時間**，不是 claim 的時間。舊線「分析產生時間」的語意已經不存在。

### 經過 TheTap

`lapidary.db` 由 **TheTap 每晚從 Lapidary 的 git main 建置**，再經 TheTap 的檢查上架到 `/opt/tap/`。TheDistiller 的 `input/lapidary.db` 由 TheTap 接線，是**必要輸入**：缺檔時 build 直接失敗。

設成必要而不是選用，是因為選用輸入缺席時只會產出空的口味表，所有檢查卻照樣通過，沒人會發現（[TheTap #14](https://github.com/mapleelpam/LuminNexus-AlchemyMind-TheTap/issues/14)）。

> 開發時也可以在本機跑 `uv run lapidary build -o /opt/tap/lapidary.db` 直接寫檔，但那只是開發機的捷徑；正式版一律以 TheTap 建置的為準。

### 切換紀錄（2026-10-21）

- `lapidary.db` 第一版（built_at `2026-10-21T14:35:01Z`）：FlavorCharacteristics 22,921 列、216 個節點，**和 spiderweb.db 的同一張表零差異**。
- TheDistiller **v3.79.0** 改從 `lapidary.db` 讀 Flavor，已 merge main。和 v3.78.0（從 spiderweb 讀）比對，FlavorCharacteristics 27,680 列兩個方向都零差異（[#88 回報](https://github.com/mapleelpam/LuminNexus-AlchemyMind-TheDistiller/issues/88#issuecomment-6319497187)）。
- TheTap 把 lapidary 接成 distiller 的必要輸入，2026-10-21 夜起 nightly 的 Flavor 讀 `lapidary.db`。

---

## 💡 設計原則

| 原則 | 理由 |
|------|------|
| **不加 LLM** | 這條線存在的理由。對不上 = yaml 有缺口，補 alias 或 leaf |
| **taxonomy_id 只增不改不重用** | 節點離開樹仍保留條目，新節點拿下一個號碼。id 是對 Distiller 和下游已發佈的契約，改了不可逆 |
| **零差異是重構的驗收標準** | build 先寫 `.new`，看過 diff 再替換；差異必須能用 yaml 的改動解釋 |
| **寧可失敗，不默默丟列** | yaml 對到樹裡沒有的路徑，build 直接報錯 |
| **一個 facet 一個函式** | 每個 facet 一個 `<realm>_rows()`，回傳固定 8 欄；build、coverage、diff、taxonomy 指令共用 |
| **三個檔一起 commit** | 改 `flavors.yaml` 後一定跑 taxonomy build → assign-ids，三個檔一起進 git；`*.db` 不進 git |

---

## 🏅 certification 與 certifier（2026-10-22 上線）

證照拆成兩棵互相獨立的樹：**certification 記「什麼標準」**（USDA Organic、Kosher、GMP…），**certifier 記「誰認證的」**（QAI、CCOF、NSF…）。兩者讀同一批 claim，用 `product_id` 對起來。

| realm | 列數 | 節點 | 說明 |
|------|------|------|------|
| certification | 60,578（keepa 50,656／keepa_gb 3,601／iherb 6,321） | 100 | 一句 claim 一列；taxonomy_id 1–100 沿用 spiderweb，新增 101、103–111（SQF、BRCGS、IFOS、Regenerative Organic 等） |
| certifier | 30,858（keepa 24,794／keepa_gb 701／iherb 5,225） | 142（131 個機構 + 10 組 + root） | 全新 realm，ids 1–142；一句點到幾個機構就幾列，`reason` 帶 `standard=<對應的標準>` |

### 為什麼要拆成兩棵樹

機構和標準是**多對多**：Ecocert 同時做 USDA、EU、COSMOS，QAI 也不只做 USDA。舊線把 10 個 organic 機構（CCOF、QAI、Oregon Tilth…）當成標準樹的葉節點，等於把多對多硬塞成一對一。

辯論（Claude × Codex）後由 maple 裁決：機構是和標準正交的一條軸，獨立成 certifier realm。認證的對象（工廠還是商品）由標準決定，不另開欄位：GMP 類 100% 是製程，organic／kosher 類幾乎都是商品。

### 和舊線的語意差異

- **只收第三方認證**：copal 的 certification 只收「certified by X」這類句子。舊線把 Vegan、Gluten-Free、Dairy Free 這類飲食屬性也當證照，新線拿掉了，它們屬於 dietary_adaptability。
- **不猜標準**：句子裡有 usda／nop 才歸 USDA Organic；只寫「certified organic by CCOF」的歸 Organic，機構記進 certifier。不靠「這家機構只做 NOP」的常識去推。
- **拿掉 11 個節點，id 保留**：102 和舊線以機構命名的 10 個 organic 節點（19 QAI、34 Oregon Tilth、56 CCOF…）離開 CertificationTaxonomy，但 id 留在 `ids.json` 不重用（「taxonomy_id 只增不改不重用」）。
- **沒有 DSLD 來源**：copal 沒有 DSLD。舊線 spiderweb.db 的 Certification 有 61,844 個 DSLD 產品不在 copal 裡，切換後這些產品就沒有 certification。
- **TheJournalism 的歷史排行不能直接比**：機構不再是 certification 樹上的節點，舊版的機構排行和新版對不上。

### 下游狀態

- TheDistiller **v3.81.0**（2026-10-22 17:46Z 部署）起，`distiller.db` 的 Certification、Certifier 來自 lapidary.db；通知見 [TheDistiller #90](https://github.com/mapleelpam/LuminNexus-AlchemyMind-TheDistiller/issues/90)，handover 見 TheDistiller repo 的 `docs/20261022_handover_lapidary_realms.md`。
- 在 distiller.db 裡，Certifier 和 Certification 只能用 `product_id` 對起來：哪個機構認證哪個標準沒有帶過去，一個產品有多個認證時配對無法還原。
- v3.80.x 的 Certification 是空表（SpiderWeb 已停供、Lapidary 還沒接），所以那幾版讀到 0 是正常的。

---

## 🐛 常見問題

### Q1: Lapidary 和 TheWeaver 的分界在哪？

看 copal 的 kind 是不是**有限集合**。口味、證照的說法有限，查表就能做完，歸 Lapidary；功效、屬性這類說法無限，需要理解語意，歸 TheWeaver 的 LLM 線。certifier 讀的仍是 certification 這個 kind，只是切出另一個 facet；除非 copal 新增有限集合的 kind，Lapidary 不會多出新的來源。

### Q2: 為什麼和 spiderweb.db 用一模一樣的表結構？

這樣 TheDistiller 只要換 attach 的檔案，程式一行都不用改，切換的風險最小，也能直接比對新舊兩份是否零差異。

### Q3: 這和分類術語裡的 kind、facet 有什麼關係？

Lapidary 就是「kind → 對照表 → facet」這條映射的機械實作：kind 是 copal 的分類（例如 sensory-flavor），對照表是 `flavors.yaml` 的 alias → 葉節點路徑，facet 是 realm 表裡帶 taxonomy_id 的一列。術語定義見[分類體系術語](../../general/classification-terminology.md)。

---

## 📚 相關文檔

### Learning Map 文檔
- [AmazonCopal](amazoncopal.md)：上游，產生 claims
- [SpiderWeb](spiderweb.md)、[TheWeaver](theweaver.md)：flavor / certification 的前任
- [TheDistiller](thedistiller.md)：下游
- [分類體系術語](../../general/classification-terminology.md)：kind、facet、taxonomy

### Lapidary 專案文檔
- `CLAUDE.md`：工作規則與設計原則
- `taxonomy/flavor/flavors.yaml`：flavor 對照表
- `docs/20261022_certifier_debate.md`：certifier 獨立成樹的辯論與裁決
- `docs/20261021_remaining_work.md` 末段：給下游的變動摘要

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 變更 |
|------|------|------|
| 1.0 | 2026-10-21 | 初版，依 Lapidary agent 提供的資料撰寫 |
| 1.1 | 2026-10-21 | flavor 切換完成：distiller v3.79.0 起必要輸入，TheTap 從 git 建置 |
| 1.2 | 2026-10-22 | certification、certifier 上線（Lapidary `a955b43`）；「進行中」段改為上線說明 |
| 1.3 | 2026-10-23 | TheDistiller v3.81.0 接上 Certification、Certifier；三個 realm 的 source 改為 `lapidary:<market>` |

### 系統依賴

**上游**：AmazonCopal（`copal.amazon.db`、`copal.amazon.gb.db`、`copal.iherb.db`）

**下游**：TheDistiller（`input/lapidary.db`，v3.79.0 起必要輸入；v3.81.0 起三個 realm 全接）

---

**文檔結束**
