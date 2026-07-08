---
title: "澄清：許願與計畫的一體兩面"
type: topic
status: active
created: 2026-07-08
version: "1.0"
project: LearningMap
author: maple
tags:
  - clarification
  - planning
  - wish
  - unknowns
audience:
  - all
summary: |
  實務層的鉸鏈。範式轉移喊「別把步驟寫細」，容易被誤讀成「別計畫」。
  真相是：計畫沒消失，它換了作者——從你獨自寫步驟，變成你和 agent
  共同澄清。unknown 越高，澄清越是一個 loop；而它有停止點，
  澄清到「停止條件存在、blast radius 界定」就收手，不是澄清到每步釘死。
---

# 澄清：許願與計畫的一體兩面

---

## 0. 一個被範式轉移挖出來的洞

[paradigm-shift-task-to-wish](./paradigm-shift-task-to-wish.md) 為了打破舊範式，喊了一句「別把步驟寫細，許願就好」。這句話對，但留下一個容易誤讀的洞：**許願 = 不計畫嗎？**

不是。這一篇補上那個洞。它接在許願([paradigm-shift](./paradigm-shift-task-to-wish.md))與驗收([know-your-unknowns](./know-your-unknowns.md))之間——是把兩者接起來的**鉸鏈**。

---

## 1. 許願與計畫是同一個物件的兩端

- **願望 = what / why**（目的地）
- **計畫 = how**（路線）

它們不是兩件事，是**同一個東西從兩端看**。你說清楚「要去哪、為什麼」，路線多半就浮現了——反過來，一條好路線也反推得出目的地。

當你的 **unknown 低**時，願望→計畫是 trivial 的：你許願，模型把路線填好（這就是 paradigm-shift 說「別寫步驟」成立的前提——路線不值得你寫，模型補得比你好）。

但當你的 **unknown 高**時，事情翻轉：**你兩端都寫不出來**。你不知道目的地的真實邊界（unknown knowns），也不知道路線上的坑（unknown unknowns）。這時候「先許願、後驗收」中間會塌一塊——那塊就是**澄清**。

---

## 2. 計畫沒消失，它換了作者

這是全篇最重要的一句話：

> **舊範式：你獨自寫步驟（工單）。**
> **新範式：你和 agent 共同澄清那個願望，直到它可承諾。**

計畫從來沒有離開，離開的是「**由你一個人執筆**」。範式轉移搬走的不是計畫，是**計畫的作者身分**——從獨作變成合作。

為什麼一定要合作、不能你自己想清楚再開工？因為[你照不到自己的盲區](./isomorphism-projection.md)——unknown unknowns 是你的 null space，結構性地看不見。**靠自省補不齊計畫**，只能靠另一個視角：

- **agent 的反向提問**挖出你的 unknown knowns（你覺得理所當然、沒寫下來的東西）
- **探索**（讓 agent 先勘一遍地形）撞出 unknown unknowns

所以 unknown 越高，澄清越不是「你寫一份更好的 spec」，而是一個 **loop**：問→答→再問，**計畫從對話裡長出來**，不是你腦裡預先存在、只是還沒打字。（技巧細節見 [know-your-unknowns](./know-your-unknowns.md) 的反向訪談與盲點掃描——那篇是工具箱，這篇是把它升級成一個**階段**的框架。）

---

## 3. 澄清有停止點——這是最容易做錯的地方

澄清會上癮，而過頭剛好踩回你想逃離的坑：

> **澄清過頭 = 你又把每一步釘死 = 退回舊範式的工單**，把模型銬在你的劣質路線上。

所以澄清不是「問到什麼都確定」，是問到**兩個條件成立就收手**：

1. **停止條件存在了**——「怎樣算完成」講得出來、且便宜可驗。
2. **blast radius 界定了**——「能碰什麼、不能碰什麼」釘死了。

到這兩點，願望就**可承諾**了，剩下的 how 交給模型。你會發現這兩個條件，正是[許願的四部分](./paradigm-shift-task-to-wish.md)裡的**驗收**與**邊界**——澄清做的事，就是把願望裡這兩格從模糊填到可承諾。

而且——**澄清的終點，就是形態選擇的起點**。一旦停止條件存在、blast radius 界定，你就能回答 [agent-work-forms](./agent-work-forms.md) 的兩個問題（可機器驗收嗎？飄掉炸多大？），決定這個願望該 pairing、委派、還是自主 loop。

---

## 4. 它就是 plan mode 的概念版

現行工具已經把這件事做成了流程：Claude Code 的 **research → plan → approve → execute**——先探索、產出計畫、你批准、才執行。這不是多此一舉的儀式，是把「澄清是一個階段、計畫要共同產出、承諾前要有人審」寫進了工具。

> 用工具的 plan mode 時，記得你在做的不是「等它給計畫」，是**在澄清 loop 裡當出題與把關的那一方**——它問、你答、你補它沒問到的，計畫才對。

---

## 5. 對新人的實務守則

1. **unknown 低就直接許願，unknown 高先澄清**：先判斷你對這件事的無知程度，再決定要不要進澄清 loop。
2. **讓 agent 問你，別急著給完整 spec**：反向提問挖的是你自己看不見的盲區；你一次寫死的 spec 只覆蓋你看得見的部分。
3. **澄清到「可承諾」就收手**：停止條件存在 + blast radius 界定 = 夠了。再往下釘每一步，你就變回工單。
4. **計畫是共同產物，不是你的獨白**：它從對話長出來——這也代表那份計畫要留下來（是 state，別讓它隨對話蒸發）。

---

## 相關文檔

- [paradigm-shift-task-to-wish.md](./paradigm-shift-task-to-wish.md) - 前置：這篇補的正是它「別寫步驟」挖出的洞
- [know-your-unknowns.md](./know-your-unknowns.md) - 工具箱：澄清 loop 用的反向訪談、盲點掃描
- [agent-work-forms.md](./agent-work-forms.md) - 後續：澄清的終點（可承諾）就是形態選擇的起點
- [isomorphism-projection.md](./isomorphism-projection.md) - null space：為什麼靠自省補不齊計畫

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2026-07-08 | maple | 初版建立 |

---

**文檔結束**
