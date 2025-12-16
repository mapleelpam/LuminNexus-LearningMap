# Claude Code CLI Tips

**版本**: 1.3
**更新日期**: 2025-12-16
**適用角色**: 所有團隊成員

---

## 概述

本文件收集 Claude Code CLI 的實用技巧，幫助團隊成員更有效地使用 AI 輔助開發工具。

---

## 1. Memory 記憶管理 (`#memory`)

> 📖 官方文檔：[Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)

- 跨 conversation 保留的個人記憶
- 使用 `#` 開頭快速新增，或 `/memory` 開啟編輯器
- 適合：個人偏好、coding style、常用指令

**Memory vs CLAUDE.md**：
| | Memory | CLAUDE.md |
|---|--------|-----------|
| 範圍 | 個人（跨專案） | 專案（團隊共享） |
| 版本控制 | 不在 git | 可 commit |

---

## 2. Skill 技能系統 (`@skill_name`)

> 📖 官方文檔：[Agent Skills](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills/overview)

- 預定義的專門能力模組
- 可以快速啟用特定領域的專業知識
- 透過 `@` 符號呼叫

### 使用方式

```
@skill_name [指令或問題]
```

### 常用 Skill 類型

- (待補充具體的 skill 列表)

### 最佳實踐

- 了解每個 skill 的專長領域
- 選擇最適合當前任務的 skill
- 可以組合多個 skill 完成複雜任務

---

## 3. Compact Conversation 與 Context 管理

> 📖 官方文檔：[Common workflows](https://docs.anthropic.com/en/docs/claude-code/common-workflows)

### 什麼是 Context Lost

- Claude Code 有 context window 限制
- conversation 過長時，早期內容可能被壓縮或遺失
- 重要的 decision 可能因此丟失

### 常見風險情境

- 長時間的 coding session
- 多次來回討論後的實作
- 跨多個檔案的大型重構

### 預防策略

1. **及時總結重要決定**
   - 在做出重要決定後，請 Claude 總結
   - 將決定寫入文檔或 comment

2. **使用 TodoWrite 記錄**
   - 將關鍵決定轉為 todo items
   - 提供 conversation context 的錨點

3. **分段處理大型任務**
   - 將大任務拆成小段
   - 每段完成後做 checkpoint

4. **善用 Memory**
   - 將跨 session 需要記住的內容存入 memory

### 警示信號

- Claude 開始重複問已經討論過的問題
- 實作方向與先前討論不一致
- Claude 建議的方案與已決定的不同

---

## 4. TodoWrite 與 Decision 對齊

> 📖 官方文檔：[Claude Code overview](https://docs.anthropic.com/en/docs/claude-code/overview)

### 為什麼需要對齊

- Conversation 中的討論和決定容易被遺忘
- TodoWrite 提供結構化的任務追蹤
- 幫助 Claude 記住當前的執行脈絡

### 最佳實踐

1. **討論後立即建立 Todo**
   - 決定做什麼後，馬上寫入 todo
   - 包含具體的執行細節

2. **Todo 內容要具體**
   - 不只寫「實作功能 X」
   - 而是「實作功能 X，使用方案 A，因為 [原因]」

3. **保留決策脈絡**
   - 在 todo 中註明為什麼選擇這個方案
   - 記錄排除的替代方案

4. **即時更新狀態**
   - 開始執行時標記 in_progress
   - 完成後立即標記 completed

### 範例

```
// 較差的 todo
- 實作登入功能

// 較好的 todo
- 實作登入功能：使用 JWT token，存於 httpOnly cookie（已討論排除 localStorage 方案因安全考量）
```

---

## 5. 快捷鍵

> 📖 官方文檔：[Interactive mode](https://docs.anthropic.com/en/docs/claude-code/interactive-mode)

| 快捷鍵 | 功能 |
|--------|------|
| `Esc` | 中斷 Claude 目前的回應 |
| `Esc Esc` | 連按兩次，回退到前一個對話狀態 (rewind) |
| `Shift+Tab` | 切換 auto-accept 模式 |

---

## 6. SDD/TDD 工作流程

### 與 Claude Code 結合的 SDD 流程

1. **撰寫 Spec**
   - 先與 Claude 討論規格
   - 確認後寫入 spec 文檔

2. **Review Spec**
   - 請 Claude 審查 spec 完整性
   - 確認邊界條件和錯誤處理

3. **生成測試**
   - 使用 Speckit 或手動請 Claude 生成測試
   - 確保測試覆蓋 spec 的所有要求

4. **實作**
   - 依據 spec 和測試實作功能
   - Claude 可以協助實作

### 與 Claude Code 結合的 TDD 流程

1. **定義測試案例**
   - 先請 Claude 根據需求列出測試案例
   - 確認 happy path 和 edge cases

2. **撰寫失敗的測試 (Red)**
   - 請 Claude 撰寫測試程式碼
   - 確認測試會失敗

3. **實作功能 (Green)**
   - 請 Claude 實作最小程式碼通過測試

4. **重構 (Refactor)**
   - 請 Claude 審查並建議重構

### 相關連結

- [SDD 規格驅動開發](./00_outline.md#35-規格驅動開發-spec-driven-development-sdd)
- [TDD 測試驅動開發](./00_outline.md#45-測試驅動開發-test-driven-development-tdd)
- [Speckit 工具文檔](../tools/speckit.md)

---

## 7. Slash Commands

> 📖 官方文檔：[Slash commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands)

以 `/` 開頭的內建指令。常用：

| 指令 | 功能 |
|------|------|
| `/init` | 初始化專案，自動生成 CLAUDE.md |
| `/clear` | 清除對話歷史 |
| `/compact` | 壓縮對話，釋放 context |
| `/resume` | 恢復上次對話 |
| `/rewind` | 回退到前一狀態 |
| `/model` | 切換模型 |
| `/cost` | 查看 token 用量 |

### 自訂 Commands

在 `.claude/commands/` 放置 `.md` 檔案即可建立自訂指令。

---

## 8. CLAUDE.md 專案指引檔

> 📖 官方文檔：[Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)（含 CLAUDE.md 說明）

專案層級的指引檔，放在專案根目錄，Claude 會自動讀取。

**適合放入**：專案架構、技術棧、開發規範、常用指令、注意事項

**多層級載入**：
```
~/CLAUDE.md                    # 使用者全域
~/projects/my-app/CLAUDE.md    # 專案層級（優先）
```

---

## 9. Subagent 多代理模式

> 📖 官方文檔：[Subagents](https://docs.anthropic.com/en/docs/claude-code/sub-agents)

子代理處理複雜任務，可並行執行。

### 獨立 Context Window

每個 Subagent 有獨立 context，完成後只回傳摘要：

```
主對話 (context A)
    ↓ 啟動
Subagent (獨立 context B)
    ↓ 完成
主對話 (context A + 結果摘要)
```

### 常用類型

| 類型 | 用途 |
|------|------|
| `Explore` | 快速探索 codebase（唯讀） |
| `Plan` | 設計實作計畫 |
| `general-purpose` | 複雜多步驟任務 |

---

## 10. 其他技巧

> 此章節將持續補充

### 待補充項目

- (後續討論加入)

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.3 | 2025-12-16 | 補充原有章節的官方文檔連結 | Learning Team |
| 1.2 | 2025-12-16 | 精簡內容，新增官方文檔連結 | Learning Team |
| 1.1 | 2025-12-16 | 新增：Slash Commands、CLAUDE.md、Subagent 章節；完善快捷鍵表格 | Learning Team |
| 1.0 | 2025-12-16 | 初始版本，包含 memory、skill、context 管理、TodoWrite、快捷鍵、SDD/TDD 章節 | Learning Team |
