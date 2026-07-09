---
title: "與 Agent 協作的形態：Pairing、委派、自主 Loop"
type: topic
status: active
created: 2026-07-08
updated: 2026-07-08
version: "1.0"
project: LearningMap
author: maple
tags:
  - agent
  - workflow
  - loop
  - delegation
  - verification
audience:
  - all
summary: |
  實務層收頂。paradigm-shift 講「怎麼許願」、know-your-unknowns 講
  「怎麼驗收一次委派」，這篇講「當工作重複、規模化、自動化時，該站在哪」。
  一條軸貫穿三種形態（pairing / 委派 / 自主 loop）：你把多少 re-entry
  紀律交給機器；交得越多，停止條件與邊界越要在你離場前就建好。
---

# 與 Agent 協作的形態：Pairing、委派、自主 Loop

---

## 0. 這篇在哪裡

實務層到這裡有三塊,依序疊上去:

- [paradigm-shift-task-to-wish](./paradigm-shift-task-to-wish.md):範式換了,你的工作從描述任務變成**許願**(意圖 / 理由 / 邊界 / 驗收)。
- [know-your-unknowns](./know-your-unknowns.md):許願之後,怎麼**驗收一次委派**。
- **這篇**:當同一種願望要跑很多次、要規模化、要自動跑時,你該用**什麼形態**——以及每種形態要付出的紀律。

一句話定位:**loop 就是許願的工業化。** 把願望的第四部分(驗收)變成機器的**停止條件**,然後讓它 [re-entry](./compute-state-context.md) 到滿足為止。所有「與 agent 協作的形態」,差別只在一件事——

> **你把多少 re-entry 的紀律,交給機器。**
> 交得越多,停止條件與邊界就越要在你**離場之前**建好。因為你不在場,就沒有人在閘門上把關。

---

## 1. 一條軸,三種形態

把「你站在 re-entry 閘門的哪個位置」當軸,三種形態自然排開:

| 形態 | 誰觸發 | 什麼時候停 | 你站在哪 | 要付的紀律 |
|---|---|---|---|---|
| **Pairing**（結對） | 你,每一輪 | 你說停 | **你就是閘門**——每一輪都穿過你 | 幾乎不用預先建;靠你即時判斷 |
| **委派**（delegation） | 你,一次 | 你定的驗收條件 | 你**設好閘門**,事後檢查產出 | 驗收條件要寫清楚;產出要看證據 |
| **自主 Loop** | 事件 / 排程 | 機器自己判定的停止條件 | 你**不在場**——閘門必須先蓋好 | 停止條件 + 邊界要工程化,錯了無人接手 |

對應到現行工具(會過期,以概念為準):pairing ≈ turn-based(你提示、Claude 自己判斷做完);委派 ≈ goal-based(`/goal` 定成功標準)或 time-based(`/loop`、`/schedule` 定期跑);自主 ≈ proactive(事件觸發、無人介入)。

注意這不是「越自主越高級」。**形態要配任務,不是配野心。** 一次性的探索用 pairing 最省;會過期的工具教學別自動化;而要跨 13 個品類過夜批跑的報告,手動 pairing 是災難。

---

## 2. 怎麼選形態:不看大小,看兩件事

跟 [atomization 篇](./atomization-context-isolation.md)同一個毛病要避開——別問「這任務能不能自動化」(答案幾乎永遠能),要問兩個決定性的問題:

1. **停止條件存在嗎、而且便宜可查嗎?**
   - 有明確、機器可驗的「怎樣算完成」(Lighthouse ≥ 90、測試全綠、schema 通過)→ 可以委派或自主。
   - 停止條件需要人的品味才判得出(「這篇分析有沒有論點」)→ 留在 pairing,或把人審做成強制停點(見 §5)。

2. **飄掉的話,炸多大?(blast radius)**
   - 只動 `working/`、可整批重跑 → 大膽自主。
   - 能寫進 Vault、能對外發送、能改動別人依賴的東西 → **每升一級自主,就要多釘一層邊界**。

這兩問對應許願的兩個部分:第一問是**驗收**,第二問是**邊界**。形態選擇,其實就是決定「這兩部分要做到多硬」。

而這兩個部分,正是[澄清](./clarification-wish-and-plan.md)的產物——unknown 高的時候,停止條件與邊界你**一開始寫不出來**,得先跑一輪澄清 loop 把它們逼出來。**澄清的終點,就是形態選擇的起點**:願望澄清到可承諾,你才有東西回答上面兩問。

---

## 3. 兩條決定生死的紀律

入門文件會告訴你「設定明確的成功標準、先小規模試跑、監控用量」。都對,但沒講**為什麼**。你的概念系列剛好補上這兩個補丁——它們是自主程度越高、越致命的兩件事。

### 3.1 停止條件的品質 = 整個 loop 的生死

一個 loop 的停止條件太鬆,它會在「**看起來**達標」時停下——這就是[假湧現](./emergence-data-compute.md)跑在自動化尺度上:機器每一輪都報綠燈,但綠燈量的是它自己想量的東西。**goal-based loop 最危險的失敗模式,是它會很有信心地收斂到錯的地方。**

所以「先小規模試跑」真正在校準的,**不是任務,是評估器**。而評估器要雙向校準(呼應 atomization 篇的 Truth/Worth 與殺率):

- 停止條件太鬆 → loop 提早收工,交出平庸產物,還給你「全綠」的假信心。
- 停止條件太嚴 → loop 永遠停不下來,燒 token,或把**對的、但不尋常**的產出判為失敗。

一個好用的自檢:**如果這個 loop 現在飄向一個明顯錯誤的結果,我的停止條件會不會攔下它?** 攔不下,就別放它自主。

### 3.2 自主 = 沒有人在正門,所以正門必須先蓋好

Pairing 時你就是 re-entry 的[正門](./compute-state-context.md)——每一輪都經過你的眼睛。自主 loop 把這道門拆了,所以門必須**預先蓋成機器能守的形狀**:

- **能碰什麼要釘死**:自主 loop 若能寫你的 Vault([蛻殼](./emergence-data-compute.md)),它飄掉就是**污染你賭注的基質**。原始層只讀、產出只進 `working/`、對外動作要人審——這些不是潔癖,是你在沒有守門人時唯一的防線。
- **把後門封死**:自主 loop 特別容易從後門把 state 帶進計算(讀到上一輪自己的錯誤產出、當成事實再放大)。每一輪的輸入只能走正門(明確的、驗證過的來源),不准撿自己上一輪沒驗過的殘留。

一句話:**自主程度每升一級,你能容許的 blast radius 就要降一級。** 兩者反向綁死。

---

## 4. 好的 loop 會餵養下一個 loop

自主 loop 不該是「跑完就丟」。設計得好,它每一輪都留下**沉積物**,墊高下一輪的地板——這正是 [emergence 篇](./emergence-data-compute.md)的遞歸循環、也是 [atomization 篇的 L4](./atomization-context-isolation.md):輸出回存,成為下一輪的輸入。

差別只在:**回存的東西必須帶著 lineage 與驗證狀態**(哪一輪、哪個版本的 compute、驗過沒)。沒驗過的產出回存,下一輪會把它當地基——那不是沉積,是流沙。這條規則跟 [inferred 產物要標版本](./emergence-data-compute.md)是同一條。

---

## 5. 我們的三個實例

**① TheJournalism:13 品類過夜批跑** — 一個 scheduled proactive loop。沙漏的兩端(平行探索、平行驗證)適合放進 loop;**脖子(追問→選論點→寫作)是停止條件的所在**,它的品質檢查就是 §3.1 的評估器。這個 loop 划不划算,全看脖子那道 human gate 與對抗驗證夠不夠硬。

**② 跟 Leana 的 review→修訂** — 我們手動跑了一次 turn-based loop:我 review、她修、產出留在 repo。要半自動化它:把「重要文章 push 後,自動起一個 review agent 產出 review notes 進候選池」做成一個委派 loop,人(你或她)仍是合併前的閘門。**停止條件 = review notes 被作者採納或明確駁回**——這是需要人品味的停點,所以它是委派、不是全自主。

**③ Learning map 自我改進** — 你一直想要的機制,現在有了形狀:一個 scheduled loop,定期掃描新人的提問與卡點,產出「候選補丁」進一個池子(L4 沉積物);你或 Leana review 後合併。**新人的困惑就是 data**——現在它不再蒸發。這個 loop 的 blast radius 低(只產候選、不自動合併)、停止條件清楚(有沒有新卡點),是最適合先跑起來的一個。

---

## 6. 對新人的實務守則

1. **形態配任務,不配野心**:一次性探索用 pairing;會過期的東西別自動化;規模化、可機器驗收的才升到委派/自主。
2. **選形態問兩件事**:停止條件便宜可查嗎?飄掉炸多大?——不是「能不能自動化」。
3. **自主之前,先校準評估器**:小規模試跑校的是停止條件,不是任務。問自己「它飄向錯誤時,停止條件攔得下嗎」。
4. **自主程度 ↔ blast radius 反向綁死**:越沒人看,越要把「能碰什麼」釘死;Vault(蛻殼)永遠不給自主 loop 直接寫。
5. **回存要帶 lineage**:沒驗過的產出別當下一輪地基。
6. **讓 loop 留候選,不讓 loop 自動合併**:把「人審」留在最有價值的那個停點上。

---

## 回望:四個相位,同一個動作

*（這節是給走完整個實務層的人的獎賞;沒讀過其他篇可以直接跳過。）*

如果你把實務層四篇連起來看,會發現它們**不是四個技巧,是同一個動作投影到四個相位**:

| 相位 | 你交出的 how | 你守住的 what/why/gate |
|---|---|---|
| [許願](./paradigm-shift-task-to-wish.md) | 別寫步驟 | 意圖 / 理由 |
| [澄清](./clarification-wish-and-plan.md) | 別獨自預寫計畫 | 你守 what/why,計畫共同長出來 |
| [驗收](./know-your-unknowns.md) | 別宣稱你懂 | quiz 這道閘 |
| **形態（本篇）** | 別每輪自己做 | 停止條件 + blast radius |

同一個不變的動作:**把 how 交給一個夠強的過程,把 what / why / 邊界 / 驗收留給自己,並守住那道閘門。** 四篇的差別只在——**在哪個相位交、交給誰**。

這件事本身就是 [isomorphism-projection](./isomorphism-projection.md) 反身用在文件自己身上:實務層不是幾個發現,是**一個動作的幾次投影**。看穿了這個,你就不需要記四套規矩——記住那一個動作,四個相位自己會長出來。

---

## 出處與延伸

- Anthropic,〈Getting started with loops〉(Claude Code 團隊),四種 loop 類型的來源:https://claude.com/blog/getting-started-with-loops （工具語境會演進,本篇取其概念骨架,現行 `/loop`、`/goal`、`/schedule`、`/workflows` 指令細節以官方文件為準）

## 相關文檔

- [paradigm-shift-task-to-wish.md](./paradigm-shift-task-to-wish.md) - 前置:許願的四部分;loop 是它的工業化
- [clarification-wish-and-plan.md](./clarification-wish-and-plan.md) - 前置:澄清的終點（可承諾）就是形態選擇的起點
- [know-your-unknowns.md](./know-your-unknowns.md) - 前置:單次委派的驗收;本篇是它的規模化
- [compute-state-context.md](./compute-state-context.md) - re-entry、正門/後門:形態＝你站在閘門的哪裡
- [emergence-data-compute.md](./emergence-data-compute.md) - 假湧現(§3.1)、蛻殼與回存(§4)
- [atomization-context-isolation.md](./atomization-context-isolation.md) - 沙漏的脖子＝loop 的停止條件所在;L4 沉積物

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2026-07-08 | maple | 初版建立 |

---

**文檔結束**
