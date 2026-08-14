---
title: "為 Agent 重寫 CLI：當工具的第一使用者不是人"
type: topic
status: active
created: 2026-08-14
updated: 2026-08-14
version: "1.0"
project: LearningMap
author: Dustin
tags:
  - cli
  - mcp
  - agent
  - tool-design
  - api
audience:
  - all
summary: |
  過去的 CLI 為人類高手設計（簡寫、flag、憑經驗除錯），現在第一個讀它的
  往往是 agent。本篇分兩半：前半拆解「MCP vs CLI」這場爭論——兩份受控實測
  都顯示正確率相當，真正的問題不是選哪一邊，而是「工具定義不該預載進
  context」；後半是 Agent-First 的設計慣例（JSON payload、schema 自省、
  field mask、dry-run、輸入硬化），並誠實說明它們還不是任何標準。
---

# 為 Agent 重寫 CLI：當工具的第一使用者不是人

---

## 📋 文檔目的

你會在兩種場合撞到這篇的主題：

**場合一**：有人在群裡轉一篇文章，標題是「大家都在拋棄 MCP，改用 CLI」，配上一個嚇人的數字。你不知道該不該信。

**場合二**：你要做一支工具給團隊用，而你知道用它的不只是人——Claude Code、Cursor、某個排程 agent 都會呼叫它。你不確定該為誰設計。

這篇回答這兩件事。前半（§1–§2）是**判斷**，所有角色都用得上；後半（§3–§5）是**設計**，主要給要動手做工具的人。

> 📌 **前置**：本篇假設你讀過 [prompt-context-harness-engineering.md](./prompt-context-harness-engineering.md)——尤其「工具說明也佔白板空間」這件事。那是本篇整場爭論的起點。

---

## 🎯 一句話總結

> **這不是「選 MCP 還是選 CLI」，而是「工具定義不該預載進 context」。**
> 三條主流路線（延後載入、寫程式呼叫、放在檔案系統上按需讀）解的都是同一個問題。

---

## 1. 先更新一張表

[progressive-disclosure.md](./progressive-disclosure.md) §104 有一張 Skills vs MCP 的對照表，是本 repo 已經寫過的部分。那張表拍的是 **2025 年底的快照**，其中三格在 2026 年變了——不是它寫錯，是被寫的東西自己動了。

| 那張表寫 | 2026 年的狀況 |
|---|---|
| MCP「初始化時**全部載入**」 | Claude Code **預設開啟 tool search，MCP 工具一律延後載入**。「全部預載」現在是可以關掉的行為，不是協定的宿命 |
| MCP 的 token 效率「較低」 | 開啟 tool search 後，官方量測是 8.7K vs 77K（**降幅約 85%**） |
| MCP「執行速度較快、Skills 較慢」 | **看任務複雜度**。簡單任務 MCP 確實少一次探索；但複雜任務上，實測出現 MCP 用 71 次工具呼叫、skill 只用 7 次的情形（見 §2.2） |

> ⚠️ 坊間常寫「當工具定義超過 context 的 10% 才觸發 tool search」——**那是非預設模式的行為**（要明確設定才生效）。預設是一律延後載入。這條很多二手文章寫反了。

**其餘幾格仍然成立**：分發方式（本地檔案 vs 遠端 server）、複雜度（一個資料夾 vs 要跑一個 server）、以及「大量能力模組 vs 少量固定工具」的適用場景判斷，都沒有被推翻。

---

## 2. 這不是路線之爭

### 2.1 那個爭論是怎麼來的

論據本身是真的：**MCP 的常見用法會在 agent 決定要用任何工具之前，就把全部工具的名稱、描述與完整 JSON schema 灌進 context。**

Anthropic 自己的官方數字（2025-11-24）：

> 一組典型的多 server 設定（GitHub、Slack、Sentry、Grafana、Splunk）——**58 個工具、約 55K token**，在 Claude 開始做任何事之前就消耗掉了。

同一份還給了兩個數字：**Jira 單獨約 17K token**、觀察到的最壞情況 **134K token**。

而 CLI 這一端，呼叫成本大約就是命令字串本身（數十到數百 token），因為模型在預訓練時就已經知道 `git`、`gh`、`jq` 怎麼用——**不需要有人在白板上重新解釋一遍**。

> ⚠️ **三個流傳很廣、但查不到出處的數字，請不要引用**：
> - 「GitHub MCP server 單獨吃掉 55,000 token」——**這是張冠李戴**。55K 是上面那**五台 server 的總和**。一份 2026-07 的獨立量測實測 GitHub MCP 只有 **3,546 token**
> - 「MCP 吃掉 72% 的 context window」——任何一手來源都查不到，只出現在二手部落格
> - 「MCP 比 CLI 貴 35 倍」——同上，無可信依據
>
> 引用任何 MCP 的 token 數字時，**必須同時標明：哪些 server、開了哪些 toolset、什麼時間量的、用什麼 tokenizer**。這些數字彼此差一個數量級，混用等於沒說。

### 2.2 但兩份受控實測都說「差不多」

這是整場爭論裡最少被引用、卻最該知道的部分。

**實測一**（2025-08）：同一個工具做成 MCP 版與 CLI 版，跑同一批任務。

| | 成功率 | 耗時 | 花費 |
|---|---|---|---|
| MCP 版 | 100% | 51 分 | $19.45 |
| CLI 版 | 100% | 66 分 | $19.95 |

**MCP 版反而快 23%、還便宜一點。** 作者的結論是：**協定只是管線，真正決定成敗的是工具設計得好不好。**

**實測二**（2026-05，500 次試驗、25 個 GitHub 任務、分四個難度層）：

- **正確率幾乎相同**：skill 0.826 / 0.833、MCP 0.834——而完全不給工具的 baseline 是 0.845
- **差距出現在最難那一層的成本與延遲**：同一個代表性任務，MCP 用 **71 次工具呼叫、8 分鐘、$2**；skill 用 **7 次呼叫、不到 1 分鐘、$0.19**
- **工具遵循度**：skill 超過 99% 照規定用工具；MCP 在第 4 層只有 0.33，經常因為 API 組不起來而退回去用 bash

**綜合判讀**：token 成本的差距是真的、可觀、有一手佐證；**但「MCP 導致任務失敗」缺乏證據**。差別在成本、延遲與紀律，不在能不能做完。

### 2.3 「拋棄 MCP」是敘事，不是事實

同一段時間，MCP 的 SDK 月下載量從 **9,700 萬**（2025-12）成長到**接近 5 億**（2026-07），並完成了推出以來最大規模的規格改版（協定轉為無狀態）、進入 Linux Foundation 旗下基金會，OpenAI、Google、Microsoft、AWS 共同參與。

**「MCP 死了」與「MCP 下載成長 5 倍」可以同時為真**——前者講的是 coding agent 圈的偏好，後者講的是整體生態。這兩件事被混為一談，就產生了那個標題。

而且在 2026-08，**Agent Plugins 把 Skills 與 MCP 封裝進同一個 manifest**（一個目錄，含 `plugin.json`、選配的 `skills/` 與 `mcp.json`）。**制度上已經正式否定了「二選一」這個框架。**

### 2.4 真正的問題，和三種解法

把三條路線放在一起看，會發現它們在解同一個問題：

```
問題：工具定義不該預載進 context

解法一：延後載入      →  要用到才把定義搬上白板（tool search）
解法二：寫程式呼叫    →  模型寫程式碼去操作工具，而不是逐個呼叫
解法三：放在檔案系統  →  工具就是檔案，模型自己去讀（skills / CLI）
```

三條路線的官方量測：

| 路線 | 效果 | 來源日期 |
|---|---|---|
| 延後載入 | 77K → 8.7K token（-85%） | 2025-11 |
| 寫程式呼叫 | 43,588 → 27,297 token（-37%） | 2025-11 |
| 工具即檔案 | 150,000 → 2,000 token（-98.7%，範例情境） | 2025-11 |
| 極端版：只曝露兩個工具，模型寫 JS 在沙箱執行 | 2,500+ 端點從 117 萬 → **約 1,000 token**，且**不隨 API 規模成長** | 2026-02 |

> 最後一列值得多看一眼：它的 footprint **不隨 API 變大而變大**。這是質的差別——前三種是把成本壓低，這一種是把成本跟規模脫鉤。
> （同一案例第三方分析給出較保守的 81%，情境不同，引用時建議並陳。）

### 2.5 所以判準是什麼

不是「哪個比較先進」，而是三個問題：

| 問 | 偏 CLI / skills | 偏 MCP |
|---|---|---|
| **工具跑在哪裡？** | 本地、有 shell | 遠端服務、沒有 shell 可用 |
| **怎麼認證？** | 本機憑證就夠 | 需要 OAuth、多租戶、可由公司集中撤銷 |
| **誰要用？** | 一個人、一套環境 | 一個團隊跨多種 AI 客戶端，設定一次到處可用 |

**還有一個常被漏掉的維度：可稽核性。** 一位長期公開討論這個主題的工程師在 2026-07 這樣寫（他先前才公開唱衰過 MCP，後來因無狀態規格改版而回頭）：

> 給 agent 一個能上網的 shell 環境是充滿風險的……**MCP 工具比較容易稽核與控制**，而且簡單到小模型也能合理驅動它們。

**這句話把爭論從「省多少 token」轉到「出事的時候你查不查得出來」**——對企業而言後者往往更重要。

換個角度看同一件事：**MCP 的工具是一份有 schema 的清單，CLI 是一個開放的執行環境。** 前者你列得出「它能做什麼」，後者只能列出「它不能做什麼」——而後者永遠列不完。這個差別在出事之後才會顯現。

---

## 3. Agent-First 設計：三個原則

前面是選擇既有工具。這一節開始是**你要自己做工具**時的事。

核心的認知轉變只有一句：

> **過去的 CLI 為人類高手設計**——簡寫、flag、憑經驗除錯、看 `--help` 猜用法。
> **現在第一個讀它的往往是 agent**，而 agent 的長處與短處跟人完全不同。

### 3.1 用 JSON payload，別讓它拼 flag

人類討厭在終端機打 JSON，所以傳統 CLI 把參數拆成一堆 flag。但對 agent 來說這是**倒退**：

```bash
# Human-First：agent 得把腦中完整的意圖，拆解成一串零碎的 flag
tool create --title "Q1 檢討" --timezone "America/Denver" --attendee a@x.com --attendee b@x.com --recurring weekly --until 2026-12-31

# Agent-First：直接收下完整結構
tool create --json '{"title": "Q1 檢討", "timezone": "America/Denver", ...}'
```

**原因是拆解會掉東西。** agent 腦中本來就有一個完整的結構化意圖，逼它壓成一維的 flag 序列，是多一次翻譯——而每次翻譯都可能損耗。JSON 對 agent 而言更像一份完整的企劃書。

### 3.2 讓工具能自我說明（schema introspection）

當 agent 不確定參數怎麼填，它需要的不是一個網頁連結，是**機器可讀的規格**。

```bash
# 不要：叫 agent 去讀文件網頁
# 要：讓它問工具本人
mytool describe create --json
# → {"parameters": {...}, "required": [...], "scopes": [...], "version": "2.1"}
```

**這一條直接對付幻覺**：agent 猜參數名的時候，猜出來的東西往往「看起來很合理」——`--user-id` 還是 `--userId`？`created_after` 還是 `since`？讓它查得到，就不用猜。

### 3.3 錯誤訊息要能導向下一步

agent 犯錯時，如果你只回 `Error: invalid input`，它只能亂試。

```
❌ Error: invalid request
✅ invalid params: JSON key must be a string at line 1 column 2
```

第二種它讀得懂、改得動。更完整的做法是把錯誤本身也結構化：

```json
{"error": "validation_failed", "code": 3, "remediation": "field 'timezone' must be an IANA name, e.g. Asia/Taipei"}
```

**`remediation` 那一欄是關鍵**——它把「錯了」變成「這樣改」。

---

## 4. 進階：把 agent 當成不完全可信的操作者

上面三條是讓 agent 用得順。這一節是**保護系統與 context**。

### 4.1 Field mask：回應也佔白板

一支 API 回傳三千行 JSON，agent 只需要其中兩個欄位——那 2,998 行全部進了白板，把後面的思考空間吃掉。

```bash
mytool list --fields id,name        # 只給我這兩欄
mytool list --output ndjson         # 一行一筆，方便分頁與串流
```

這是 [prompt-context-harness-engineering.md](./prompt-context-harness-engineering.md) §2.3 那句「最小的高訊噪比 token 集合」在工具設計側的落地。

### 4.2 Dry run：先說你要做什麼，再做

```bash
mytool delete --id 42 --dry-run
# → 驗證請求、印出「會發生什麼」的結構化摘要、乾淨退出，不做任何變更
```

**為什麼對 agent 特別重要**：人下錯指令通常是手滑，agent 下錯指令是**腦補出一個看起來很合理的參數**——而合理的錯誤比明顯的錯誤危險得多。

### 4.3 輸入硬化：把 agent 當成不可信的輸入源

一位 Google 工程師在 2026-03 寫下這條原則的最好版本：

> **Agents hallucinate. Build like it.**
> （agent 會產生幻覺，照這個前提來蓋。）

具體要擋什麼：控制字元、路徑穿越（`../`）、內嵌的 query 參數、URL 編碼殘留。**用防禦 Web 輸入的規格去防禦 agent 的輸入**——不是因為 agent 有惡意，是因為它可能誠懇地送出一個它自己編出來的資源 ID。

還有一個更隱蔽的方向：**回應消毒**。API 回傳的資料裡可能夾帶著別人寫的文字（issue 內容、使用者留言），而那些文字會被 agent 當成指令讀。這條屬於 prompt injection 的範圍。

### 4.4 確定性的 exit code 與確認協定

互動式的 `Are you sure? [y/N]` 在非 TTY 環境會直接壞掉——而 agent 呼叫工具時幾乎都是非 TTY。一份 2026-06 的設計文提出的替代方案很值得抄：

```
exit 0  成功
exit 1  一般錯誤
exit 2  認證錯誤
exit 3  輸入驗證錯誤
exit 4  需要確認   ← 關鍵
```

`exit 4` 搭配一個結構化回應：

```json
{"changes": ["刪除 42 筆記錄", "撤銷 3 把金鑰"], "confirmCommand": "mytool delete --id 42 --confirm-token abc123"}
```

**流程是**：agent 把 `changes` 秀給人看 → 人同意 → agent 執行那一模一樣的 `confirmCommand`。

**人留在迴路裡，但不需要坐在終端機前面按 y。**

### 4.5 契約凍結

工具一旦被 agent 使用，它的指令名、flag、輸出欄位就成了契約：

> 可以加新指令，但**不要移除舊的**；可以加新 flag，但**不要改既有 flag 的意義**。

理由跟對人不一樣：人看到指令消失會去查文件，agent 會拿著它訓練時學到的舊用法一直撞牆。

---

## 5. 一個完整的個案，與自家對照

### 5.1 現成的範本

2026-05 有一家公司完整重寫了自己的 CLI，六項改造剛好把上面所有原則走了一遍：

| 改造 | 對應本篇 |
|---|---|
| `describe` 指令回傳**帶版本號**的完整 schema JSON | §3.2 |
| `--output json\|ndjson` 全面化 | §4.1 |
| 所有會改動資料的指令一律支援 `--dry-run` | §4.2 |
| 加入控制字元驗證 | §4.3 |
| **以 OAuth PKCE 短期 token 取代 admin API key** | ← 見下 |
| 出貨時附上 `AGENTS.md` 與 `CLAUDE.md` | §3.2 的延伸 |

**第五項特別值得注意**：它正面回應了 §2.5 那個「CLI 缺乏 MCP 那種授權機制」的批評——用短期 token 取代長期全權金鑰。**這說明 CLI 那一側的授權弱點是可以補的，不是結構性的。**

另外也有廠商採取「同一支 CLI 兩種輸出人格」的做法：**Agent Mode 輸出機器可讀格式，Human Mode 輸出給人看的格式**。這比另外做一支工具便宜得多。

### 5.2 自家對照：我們的 MCP Server

我們自己就有一個 MCP server——[Smart Insight Engine MCP](../projects/prismavision/mcp.md)，把查詢引擎的能力開放給 AI agent，走 stdio transport，輸入是 MDFO 查詢格式。

拿本篇的三個判準（§2.5）去對它：

| 問 | 我們的情況 |
|---|---|
| 工具跑在哪裡 | 查詢引擎在後端服務，不是本地 shell 跑得動的東西 → **偏 MCP** |
| 怎麼認證 | 環境變數配置，服務層級 |
| 誰要用 | 要開放給不特定的 AI 客戶端 → **偏 MCP** |

**所以那個選擇是對的**——它不是「因為 MCP 比較潮」，是因為那三個問題的答案都指向同一邊。

反過來說，如果哪天要做的是「在本機掃教材庫、檢查 frontmatter、列出斷鏈」這類工具，答案就會落到另一邊——那正是 `scripts/` 底下那些東西存在的形式。

---

## 6. 誠實聲明：這些還不是標準

**① 沒有任何標準組織在做 Agent-First CLI 規格。** 管 AGENTS.md、MCP、Agent Skills 的那個基金會**不含 CLI 設計規範**。本篇整理的是分散的廠商實作加上幾篇個人工程師文章形成的**事實慣例**，不是 RFC。

**② Anthropic 從未發表過「CLI-first 設計」的官方論述。** 掃過整個官方工程部落格索引，2026 年沒有以 CLI 或 Bash 為題的文章。若有人說「Anthropic 主張 CLI-first」，那是從產品行為（Claude Code 大量依賴 Bash）與「工具即檔案」的論述**推論**出來的，不能宣稱有官方立場。

**③ 有些具體寫法查不到出處。** 例如 `--describe` 這個 flag 名稱，任何一手來源都找不到；實際存在的形式是 `describe`、`tools details --json`、`schema <method>` 等各家不同的寫法。**本篇寫 `describe` 是取其意，不是取其名。**

**④ 那些「早就 agent 友善」的老工具，多半是巧合。** `gh`、`kubectl`、`gcloud` 被列進 agent 友善清單，是因為它們早就有 `--json` / `-o json`，**不是為 agent 新增的功能**。

---

## 7. 對新人的實務守則

1. **看到「拋棄 X」的標題先查兩件事**：那個數字的出處，以及同期的採用趨勢。這場爭論裡至少有三個廣傳的數字是錯的或查無出處。
2. **不要問「哪個比較好」，問三個問題**：跑在哪裡、怎麼認證、誰要用（§2.5）。
3. **要做工具的話，先問「誰會讀它」**：如果 agent 會讀，`--json`、`describe`、`--dry-run` 這三樣是最低成本、最高回報的三件事。
4. **回應的大小也是設計決策**：預設回傳三千行 JSON 的工具，等於在替使用者花掉 context 預算。
5. **把 agent 的輸入當成外部輸入來驗**：它不是惡意的，但它會誠懇地編出一個不存在的 ID。
6. **引用數字要連組態一起引**：哪些 server、哪些 toolset、什麼時間、什麼 tokenizer——少一項，那個數字就不能拿來比較。

---

## 出處與時效

本篇引用的來源與日期：

- Anthropic〈Code execution with MCP〉，2025-11-04——「把工具呈現為檔案系統上的程式碼，讓模型按需讀取定義」；150,000 → 2,000 token
- Anthropic〈Advanced tool use〉，2025-11-24——五台 server ≈ 55K token、Jira ≈ 17K、最壞 134K；tool search 降幅 85%
- Anthropic Tool Search / MCP 官方文件——工具超過 30–50 個後選擇準確度下降；Claude Code 預設開啟 tool search
- Mario Zechner，2025-08-15——MCP 與 CLI 同工具對照實測（成功率均 100%，MCP 快 23%）
- Cloudflare〈Code Mode MCP server〉，2026-02-20——2,500+ 端點 117 萬 → 約 1,000 token
- Justin Poehnelt〈You Need to Rewrite Your CLI for AI Agents〉，2026-03-04——「Agents hallucinate. Build like it.」與七項建議
- Arize，2026-05-01——500 次試驗的 MCP vs skills 對照評測（廠商研究，方法論公開）
- Algolia 工程部落格，2026-05-07——為 agent 重寫 CLI 的完整個案
- Arcjet〈Designing a CLI for AI agents〉，2026-06-02——exit code 規約與確認協定
- MCP 官方規格與公告，2026-07-28——協定無狀態化；SDK 下載量

> ⚠️ **時效警告**：這一節的變動速度非常快——本篇寫作當週還有新的規格與封裝形式發布。**任何具體數字引用前請回查來源現行版本**，尤其 token 量測（會隨 toolset 組態與 tokenizer 改變）與「誰支援什麼」的敘述。§6 的四條誠實聲明也可能隨標準化進度而失效。

---

## 相關文檔

- [prompt-context-harness-engineering.md](./prompt-context-harness-engineering.md) - 前置：工具說明也佔白板空間；本篇是那個框架在工具設計側的展開
- [progressive-disclosure.md](./progressive-disclosure.md) - §104 的 Skills vs MCP 對照表；本篇 §1 更新其中三格
- [contextops-discipline.md](./contextops-discipline.md) - context pipeline 治理；field mask 是它在回應側的一種手段
- [atomization-context-isolation.md](./atomization-context-isolation.md) - 邊界上該讓多少 context 通過
- [claude-agent-skill.md](./claude-agent-skill.md) - Skills 與 Sub-agent 的選擇
- [../projects/prismavision/mcp.md](../projects/prismavision/mcp.md) - 自家 MCP Server：§5.2 的對照對象
- [../tools/ai-tools.md](../tools/ai-tools.md) - 各家 AI CLI 工具參考

---

## 📝 文檔維護

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2026-08-14 | Dustin | 初版建立。§1 更新 progressive-disclosure §104 對照表的三格；§2 以兩份受控實測拆解「MCP vs CLI」爭論，收斂到「工具定義不該預載進 context」與三個決策維度；§3–§4 Agent-First 設計原則與防護；§5 完整個案與自家 MCP Server 對照；§6 誠實聲明（無標準、無官方論述、部分寫法查無出處） |

---

**文檔結束**
