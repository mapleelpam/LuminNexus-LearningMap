---
title: "Know Your Unknowns：許願之後，瓶頸是你"
type: topic
status: active
created: 2026-07-06
updated: 2026-07-06
version: "1.0"
project: LearningMap
author: maple
tags:
  - unknowns
  - delegation
  - verification
  - ai-agent
audience:
  - all
summary: |
  實務層第一篇，接續範式轉移篇。方法論來自 Claude Code 團隊
  Thariq Shihipar（2026-07-03）：你的願望是地圖，任務是疆域，
  差距就是你的未知。四象限框架＋三階段技巧，整合進本系列的
  投影、re-entry 與假湧現概念。
---

# Know Your Unknowns：許願之後，瓶頸是你

---

## 0. 新瓶頸

[範式轉移篇](./paradigm-shift-task-to-wish.md)講到：我們從描述任務走到許願。這篇接著講許願範式的第一個實務問題——**當模型不再是瓶頸，瓶頸就是你**。

你許的願是一張**地圖**；任務的實際需求是**疆域**。地圖不等於疆域——**兩者的差距，就是你的未知（unknowns）**。Agent 會忠實地按你的地圖走：地圖上缺的那條河，它不會替你發現，它會直接淹進去。

本篇方法論來自 Claude Code 團隊的 Thariq Shihipar（2026-07-03 發表，[技巧範例集](https://thariqs.github.io/html-effectiveness/unknowns/index.html)），我們把它整合進本系列的概念框架。

---

## 1. 四象限：你的未知長什麼樣

| 象限 | 定義 | 在願望裡的位置 |
|------|------|----------------|
| **Known knowns**<br/>已知的已知 | 你明確知道、也寫進去的 | 願望本體：意圖、邊界、驗收 |
| **Known unknowns**<br/>已知的未知 | 你知道自己還沒想清楚的 | 標出來，讓 agent 幫你收斂 |
| **Unknown knowns**<br/>未知的已知 | 你覺得太理所當然而**沒寫**的——看到時認得出，但不會主動說 | 最陰險：團隊慣例、domain 常識、「大家都知道」 |
| **Unknown unknowns**<br/>未知的未知 | 你完全沒考慮過的 | 最危險：在實作深處才浮現 |

下面兩列值得用我們自己的語言再說一次：

- **Unknown knowns 是沒有 re-enter 的 state**（[context 篇](./compute-state-context.md)）：它活在你腦子裡,你以為對方知道——但沒有進 context 的東西,對 agent 而言**不存在**。你跟 agent 之間大多數的「它怎麼會這樣做」，都是這一格。
- **Unknown unknowns 是你的 null space**（[同構與投影篇](./isomorphism-projection.md)）：你不加權的東西你就看不見，而且是結構性的看不見。所以**靠自己反省找不到它**——下面所有技巧的本質，都是**借另一個視角來照自己的盲區**。

---

## 2. 三階段技巧

### 實作前：便宜地發現盲點

動手之前的每一分鐘，都是最便宜的除錯時間。

1. **盲點掃描（blindspot pass）**——委派前先問一句：
   > 「在你動手之前，先列出這個任務裡我可能沒想到的風險、縫隙、和你需要假設的事。」

   六十秒，把一部分 unknown unknowns 變成 known unknowns。

2. **反向訪談（reverse interview）**——把提問權交出去：
   > 「不要直接開始。請你逐題訪談我，一次一個問題，優先問**答案會改變架構**的問題，最後彙整成一張決策表。」

   這是把你的 unknown knowns **逼出來**的機器——它問到你覺得「這還用問？」的那一刻，就是一條理所當然的常識剛剛完成 re-entry。

3. **多方案發散**——同一個需求，要 3-4 個**差異化**的方案比較，而不是一個方案的三種微調。呼應 [tension 篇](./tension-value-perspective.md)：讓多個視角先被看見，再做決定。

4. **拋棄式原型**——規格寫三段，不如假原型點三下。可以點的模擬品會把「你想像的」和「你要的」之間的落差直接演給你看。

5. **可調整計畫**——實作計畫按「**多容易改**」排序：資料模型、對外介面這種一旦定了就難改的先釘死；UI 文案這種隨時能改的放最後。把確定性花在昂貴的地方。

### 實作中：留下決策的痕跡

6. **實作筆記（implementation-notes.md）**——要求 agent 把每個**偏離計畫的決策**記下來：遇到了什麼邊界情況、選了哪個保守方案、為什麼。

   這是把 agent 的 unknown 變回你的 known 的唯一通道——決策是 state，[不寫下來就會隨著這輪對話一起消失](./compute-state-context.md)。

### 實作後：驗證你以為的理解

7. **說服文件**——合併前，讓 agent 彙整原型、規格與實作筆記，寫一份**預先回答審查者疑慮**的說明。寫不出來的段落，就是還沒收斂的 unknown。

8. **合併前測驗（quiz）**——最後一關反過來考**你**：
   > 「根據這次的變更，出六題測驗考我。我答對才合併。」

   這是對「多巴胺驗收」的直接防禦：agent 做完了、你**感覺**懂了——quiz 量的是你是不是**真的**懂了。答不出來就不要合併；你合併的不是程式碼，是你對它的理解。這正是 [emergence 篇](./emergence-data-compute.md)假湧現三問的委派版：你的理解也是一個湧現出來的模式，**必須經過驗證才算數**。

---

## 3. 特異性與模糊度的平衡

Thariq 的核心原則：**過度具體與過度模糊都是病**。

- 太具體 → 模型僵化執行你的劣質計畫（舊範式的病，見[範式轉移篇](./paradigm-shift-task-to-wish.md) §1）
- 太模糊 → 得到通用但無用的平均答案

願望的解析度要落在中間：**意圖與邊界清楚，實作路徑留白**。而本篇的技巧就是校準工具——盲點掃描與反向訪談告訴你哪裡太模糊（agent 一直追問的地方），實作筆記告訴你哪裡太具體（agent 一直想偏離你計畫的地方，往往是你的計畫錯了）。

> 每一次訪談、每一份筆記、每一場 quiz，都是**便宜地**發現盲點的方式——比在生產環境發現便宜一千倍。

---

## 4. 接回我們的框架

| Thariq 的語言 | 本系列的語言 |
|---------------|--------------|
| 地圖 vs 疆域 | 投影 vs 物件（[第四篇](./isomorphism-projection.md)）——你的願望是任務的一次投影 |
| Unknown knowns | 沒有 re-enter 的 state（[第二篇](./compute-state-context.md)） |
| 盲點 | Null space：結構性的看不見（[第四篇](./isomorphism-projection.md)） |
| 合併前 quiz | 假湧現三問的委派版（[第一篇](./emergence-data-compute.md) §6） |
| 訪談與筆記 | 張力的可見化：先讓兩邊都被看見再決定（[第三篇](./tension-value-perspective.md)） |

---

## 5. 守則

1. **委派前 60 秒盲點掃描**：成本最低的一問，養成反射。
2. **重要的任務，讓 agent 先問你再動手**：它問到你不耐煩的地方，就是你的 unknown knowns 所在。
3. **筆記是 state**：偏離計畫的決策不寫下來，等於沒發生。
4. **答不出 quiz 就不要合併**：你驗收的不是產出，是你對產出的理解。

---

## 出處

- Thariq Shihipar（Anthropic Claude Code 團隊），〈Know Your Unknowns〉，X 長文，2026-07-03
- 技巧範例集：https://thariqs.github.io/html-effectiveness/unknowns/index.html

## 相關文檔

- [paradigm-shift-task-to-wish.md](./paradigm-shift-task-to-wish.md) - 前篇：範式轉移——本篇是它 §4「許願 ≠ 免驗收」的展開
- [clarification-wish-and-plan.md](./clarification-wish-and-plan.md) - 姊妹篇：把反向訪談/盲點掃描升級成「澄清」階段的框架；本篇是它的工具箱
- [emergence-data-compute.md](./emergence-data-compute.md) - 假湧現三問：quiz 的概念根源
- [compute-state-context.md](./compute-state-context.md) - re-entry：unknown knowns 為什麼陰險
- [isomorphism-projection.md](./isomorphism-projection.md) - null space：為什麼靠自己反省找不到盲區
- [agent-work-forms.md](./agent-work-forms.md) - 續篇：把單次委派規模化成 loop 時的形態選擇

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2026-07-06 | maple | 初版建立 |

---

**文檔結束**
