---
title: "LuminNexus 生態系願景快照（2026-05）"
type: reference
status: active
created: 2026-07-24
updated: 2026-07-24
version: "1.0"
project: LearningMap
author: leana
tags:
  - luminnexus
  - vision
  - snapshot
  - narrative
related:
  - ../00_architecture-overview.md
audience:
  - all
summary: |
  2026-05 的 LuminNexus 生態系願景敘事（互動 HTML）入口。
  這份簡報用「三個 house」講故事，與教材的三層架構模型不同——
  本文說明差異在哪、什麼情況適合看它、什麼情況該回頭看架構文檔。
---

# LuminNexus 生態系願景快照（2026-05）

---

> ⚠️ **先讀這段再點進去**
>
> 這是一份 **2026 年 5 月的願景敘事**，不是架構教材。它用詩性的語言講 LuminNexus 想成為什麼（"An intelligence mesh"、三個 house、五件作品），**它的單位劃分與教材教的三層架構不一樣**。
>
> 想知道系統實際怎麼分層、資料怎麼流，請看 [00_architecture-overview.md](../00_architecture-overview.md)，不要以本快照為準。

## 這份快照在講什麼

一頁式互動簡報，分三幕：生態系自我介紹 → 三個 house 各自的職責與作品 → 資料如何從「未被標記」流到「被說出來」（Gather → Name → Refine → Witness → Speak）。

**它的價值在語彙與意圖**：每個系統的一句話定位寫得很漂亮（Eidos「the naming of essences」、TheArgus「the hundred-eyed witness」、TheJournalism「the voice that speaks of the work」），適合在對外簡報、品牌溝通、或想快速感受「這整套東西想幹嘛」的時候看。

## 與教材架構的差異（重要）

| | 本快照（2026-05） | 教材的架構模型 |
|---|---|---|
| 主要單位 | **三個 house**：AtlasVault / ApolloResearch / AlchemyMind | **三層**：AtlasVault（Layer 1）/ AlchemyMind（Layer 2）/ PrismaVision（Layer 3） |
| PrismaVision | 未出現 | Layer 3，使用者介面與引擎層 |
| TheJournalism | 歸在 AlchemyMind 底下 | 歸在 [PrismaVision Layer 3](thejournalism.md)（資料消費側） |
| ApolloResearch | 列為一個 house | 不在教材的三層模型內 |

差異的原因是**時點**：這份快照寫於 2026 年 5 月，之後架構敘事持續演進（例如 TheJournalism 於 2026-07 改列 Layer 3）。快照不隨之更新——它記錄的是那個時間點的想法，這正是它作為快照的意義。

**因此**：拿它當靈感與語彙來源可以，拿它當「系統現在長什麼樣」的依據不行。

## 開啟

📄 **[luminnexus-overview.html](luminnexus-overview.html)** — 互動簡報，自包含單檔，於新分頁開啟

（原檔由 maple 於 2026-05-22 加入本 repo；本文為 2026-07-24 補上的入口與差異說明。）

## 相關文檔

- [../00_architecture-overview.md](../00_architecture-overview.md) - **系統架構全景（以此為準）**
- [../01_data-flow.md](../01_data-flow.md) - 資料流與系統串連
- [00_overview.md](00_overview.md) - PrismaVision 層概覽
- [thejournalism.md](thejournalism.md) - TheJournalism（快照中歸 AlchemyMind，現歸 Layer 3）

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2026-07-24 | leana | 初版：為孤兒 HTML 補站內入口，並標示其架構敘事與教材的差異 |

### 維護原則

本文是**快照的入口**，不是快照的維護。HTML 內容維持 2026-05 原狀不修改；若日後架構敘事再演進，更新本文的「差異」表即可。

---

**文檔結束**
