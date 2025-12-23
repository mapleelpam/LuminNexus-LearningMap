---
title: "Claude Code Agent 能力擴展：Skill 與 Sub-agent"
type: reference
status: active
created: 2025-12-23
author: maple
tags:
  - claude-code
  - agent-skills
  - sub-agent
  - anthropic
audience:
  - engineer
  - all
summary: |
  Claude Code 的兩種能力擴展模式：Agent Skills（能力模組）與 Sub-agent（任務委派），
  包含官方文檔、使用建議與選擇指南。
---

# Claude Code Agent 能力擴展：Skill 與 Sub-agent

---

## 概述

Claude Code 提供兩種主要的能力擴展模式：

| 模式 | 本質 | 核心問題 |
|------|------|----------|
| **Agent Skills** | 能力模組 | 「Claude 能做什麼？」 |
| **Sub-agent** | 任務委派 | 「如何分配工作？」 |

兩者互補，共同構成 Claude Code 的擴展生態系統。

---

## Agent Skills

Agent Skills 是預定義的專業能力模組，讓 Claude 具備特定領域的知識和工作流程。

### 官方文檔

| 文檔名稱 | 網址 |
|---------|------|
| Agent Skills Overview | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview |
| Agent Skills Quickstart | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/quickstart |
| Skill Authoring Best Practices | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices |
| Using Skills with the API | https://docs.claude.com/en/docs/build-with-claude/skills-guide |
| Skills in Agent SDK | https://platform.claude.com/docs/en/agent-sdk/skills |

### 官方 GitHub 倉庫

> https://github.com/anthropics/skills

#### Creative & Design

| Skill | 功能 |
|-------|------|
| `algorithmic-art` | 使用 p5.js 創建生成藝術 |
| `canvas-design` | 設計視覺藝術 |
| `slack-gif-creator` | 創建 Slack 動態 GIF |

#### Development & Technical

| Skill | 功能 |
|-------|------|
| `artifacts-builder` | 構建 React/Tailwind artifacts |
| `mcp-builder` | 創建 MCP servers |
| `webapp-testing` | 使用 Playwright 測試 web 應用 |

#### Document Skills

| Skill | 功能 |
|-------|------|
| `docx` | Word 文件處理 |
| `pdf` | PDF 操作 |
| `pptx` | PowerPoint 處理 |
| `xlsx` | Excel 處理 |

#### Meta Skills

| Skill | 功能 |
|-------|------|
| `skill-creator` | 創建 Skills 的指南 |
| `template-skill` | 基本模板 |

### 使用方式

在 Claude Code 中使用 `@` 符號呼叫：

```
@skill_name [指令或問題]
```

### Context 載入機制

Skills 採用 **Progressive Disclosure** 策略載入 context：
- Level 1：Metadata（始終載入）
- Level 2：Instructions（觸發時載入）
- Level 3+：Resources（按需載入）

詳見 [Progressive Disclosure](./progressive-disclosure.md)

---

## Sub-agent

Sub-agent 是 Claude Code 的任務委派機制，可將複雜任務分配給獨立的子代理處理。

### 官方文檔

> https://docs.anthropic.com/en/docs/claude-code/sub-agents

### 運作機制

每個 Sub-agent 有**獨立的 Context Window**，完成後只回傳摘要：

```
主對話 (context A)
    ↓ 啟動
Sub-agent (獨立 context B)
    ↓ 完成
主對話 (context A + 結果摘要)
```

### 常用 Sub-agent 類型

| 類型 | 用途 |
|------|------|
| `Explore` | 快速探索 codebase（唯讀） |
| `Plan` | 設計實作計畫 |
| `general-purpose` | 複雜多步驟任務 |

### 使用建議與考量

來自 Anthropic 員工 Cal Rueb 的公開訪談觀察：

> "Models are not that good at delegating right now... 模型目前不太擅長委派任務"
>
> "Otherwise I'm a little skeptical; sometimes it feels like overengineering（過度工程化）"

#### Sub-agent 有效的場景

| 場景 | 說明 |
|------|------|
| **Context Window 管理** | 讓 sub-agent 做研究，只回傳結果，保護主對話 context |
| **Deep Research** | 多個 sub-agent 並行搜索，最後彙總報告 |
| **大量檔案探索** | 探索 codebase 時避免污染主對話 |

#### 主要考量

1. **Context 保護**：Sub-agent 對於保護主對話的 context window 非常有用
2. **需要明確指示**：目前模型不太擅長自動委派任務，你可能需要明確指示它使用 sub-agent
3. **短期解決方案**：部分觀點認為這是用來繞過當前 context window 限制的過渡方案

---

## Skill vs Sub-agent 比較

| 特性 | Skill | Sub-agent |
|------|-------|-----------|
| **本質** | 能力模組（做什麼） | 任務委派（怎麼做） |
| **Context 策略** | Progressive Disclosure 漸進載入 | 獨立 Context Window |
| **觸發方式** | `@skill_name` 或任務自動觸發 | 明確指示或自動判斷 |
| **結果處理** | 載入指令到主 context | 只回傳摘要結果 |
| **適用場景** | 專業知識、特定工作流程 | 大量研究、並行任務 |
| **Token 成本** | 漸進增加（按需載入） | 獨立計算（不影響主對話） |
| **持久性** | 可重複使用 | 任務完成即結束 |

### 選擇指南

```
你需要什麼？
    │
    ├─ 專業能力（PDF 處理、測試、藝術創作）
    │   └─→ 使用 Skill
    │
    ├─ 大量探索/研究（不想污染主對話 context）
    │   └─→ 使用 Sub-agent (Explore)
    │
    ├─ 複雜多步驟任務（需要獨立處理）
    │   └─→ 使用 Sub-agent (general-purpose)
    │
    └─ 兩者可以組合使用
        └─→ Sub-agent 內部可以使用 Skill
```

### 組合使用範例

```
主對話
    │
    ├─ 啟動 Sub-agent (Explore)
    │   └─ 探索 codebase，回傳結構摘要
    │
    ├─ 根據摘要，使用 @webapp-testing Skill
    │   └─ 執行測試工作流程
    │
    └─ 啟動 Sub-agent (general-purpose)
        └─ 並行處理多個修復任務
```

---

## 延伸資源

### 官方資源

| 資源 | 網址 |
|------|------|
| Engineering Blog | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills |
| Skills Cookbook | https://github.com/anthropics/claude-cookbooks/tree/main/skills |
| Agent Skills 開放標準 | https://agentskills.io |

### 相關文件

- [Progressive Disclosure](./progressive-disclosure.md) - Skill 的 Context 載入策略
- [Claude Code Tips](./claude-code-tips.md) - CLI 操作技巧

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-12-23 | 初始版本 | maple |
