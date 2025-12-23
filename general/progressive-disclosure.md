---
title: "Progressive Disclosure：Agent Context 載入策略"
type: reference
status: active
created: 2025-12-23
author: maple
tags:
  - progressive-disclosure
  - context-engineering
  - agent-skills
  - anthropic
audience:
  - engineer
  - architect
summary: |
  Progressive Disclosure 是 Anthropic Agent Skills 的核心設計原理，
  讓 AI Agent 按需漸進載入 context，有效管理 token 預算。
---

# Progressive Disclosure：Agent Context 載入策略

---

## 概述

**Progressive Disclosure**（漸進式揭露）是 Anthropic 在 Agent Skills 架構中採用的核心設計原理。其核心理念是：**讓 AI Agent 只在需要時才載入相關的 context，而非一次性載入所有資訊**。

這個概念解決了 LLM 應用中的關鍵挑戰：如何在有限的 context window 中，有效地提供 agent 所需的知識和指令。

---

## 核心官方文檔

| 文件名稱 | 網址 | 說明 |
|---------|------|------|
| **Equipping agents for the real world with Agent Skills** | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | 首次詳細定義 progressive disclosure |
| **Effective context engineering for AI agents** | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Context Engineering 完整指南 |
| **Agent Skills Overview** | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview | 官方 docs，詳述三層架構 |

---

## 三層架構

Progressive Disclosure 採用三層漸進式載入架構：

```
┌─────────────────────────────────────────────────────────────┐
│ Level 1: Metadata（始終載入）                                │
│ - 只載入 name 和 description（~100 tokens per skill）        │
│ - 載入到 system prompt                                       │
│ - 讓 Claude 知道有哪些 skill 可用                            │
└─────────────────────────────────────────────────────────────┘
                              ↓ 當任務相關時觸發
┌─────────────────────────────────────────────────────────────┐
│ Level 2: Instructions（觸發時載入）                          │
│ - 完整 SKILL.md 內容                                         │
│ - Claude 透過 bash 讀取檔案到 context                        │
│ - 核心指令和工作流程                                         │
└─────────────────────────────────────────────────────────────┘
                              ↓ 按需存取
┌─────────────────────────────────────────────────────────────┐
│ Level 3+: Resources（按需載入）                              │
│ - 額外的 .md 文件（如 FORMS.md, REFERENCE.md）               │
│ - 腳本（Python, Shell 等）                                   │
│ - 資料檔案、模板                                             │
│ - 腳本執行時不載入代碼本身，只返回輸出結果                    │
└─────────────────────────────────────────────────────────────┘
```

### 各層級詳解

| Level | 內容 | Token 成本 | 載入時機 |
|-------|------|-----------|----------|
| **1. Metadata** | name + description | ~100 tokens/skill | 始終載入 |
| **2. Instructions** | 完整 SKILL.md | 數百~數千 tokens | 任務觸發時 |
| **3+ Resources** | 額外文件、腳本、資料 | 視內容而定 | 按需存取 |

---

## 設計理念

來自 Anthropic Engineering Blog 的關鍵引述：

> **"Progressive disclosure is the core design principle that makes Agent Skills flexible and scalable. Like a well-organized manual that starts with a table of contents, then specific chapters, and finally a detailed appendix, skills let Claude load information only as needed."**
>
> — Anthropic Engineering Blog, *Equipping agents for the real world with Agent Skills*

> **"Letting agents navigate and retrieve data autonomously also enables progressive disclosure—in other words, allows agents to incrementally discover relevant context through exploration. Each interaction yields context that informs the next decision."**
>
> — Anthropic Engineering Blog, *Effective context engineering for AI agents*

### 核心優勢

1. **Token 效率**：只載入當前任務需要的 context
2. **擴展性**：可以擁有大量 skills 而不會壓垮 context window
3. **動態發現**：Agent 可以根據任務自主探索和載入相關資源
4. **模組化**：每個 skill 獨立封裝，易於維護和分發

---

## Progressive Disclosure vs MCP

| 特性 | Progressive Disclosure (Skills) | MCP |
|------|--------------------------------|-----|
| **Context 載入方式** | 按需漸進載入 | 初始化時全部載入 |
| **Token 效率** | 高（只載入需要的） | 較低（全部載入） |
| **工具發現** | 動態發現 | 預先定義 |
| **複雜度** | 低（只需 Markdown 文件夾） | 較高（需要 server） |
| **分發方式** | 本地文件/ZIP | 遠端 server 連接 |
| **執行速度** | 較慢（需要探索） | 較快（已載入） |
| **適用場景** | 大量 skills、複雜工作流 | 少量固定工具、即時響應 |

### 選擇指南

- **選擇 Skills + Progressive Disclosure**：當你有大量專業能力模組，且不需要每次都全部使用
- **選擇 MCP**：當你需要少量固定的外部工具整合，且要求低延遲

---

## 實作範例

### Skill 資料夾結構

```
my-skill/
├── SKILL.md           # Level 2: 核心指令（觸發時載入）
├── REFERENCE.md       # Level 3: 參考資料（按需載入）
├── FORMS.md           # Level 3: 表單模板（按需載入）
└── scripts/
    └── process.py     # Level 3: 腳本（執行時只返回輸出）
```

### Metadata 範例（Level 1）

```yaml
name: "data-analysis"
description: "Analyze datasets, generate visualizations, and provide statistical insights"
```

這約 100 tokens 的 metadata 始終存在於 system prompt，讓 Claude 知道這個 skill 存在。

### SKILL.md 範例（Level 2）

```markdown
# Data Analysis Skill

## When to Use
- User asks to analyze data files (CSV, JSON, Excel)
- User wants statistical summaries or visualizations

## Workflow
1. Read the data file
2. Understand the structure
3. Perform requested analysis
4. Generate visualizations if needed

## Available Resources
- `REFERENCE.md` - Statistical methods reference
- `scripts/analyze.py` - Data processing utilities
```

---

## 與 ContextOps 的關係

Progressive Disclosure 可以視為 **ContextOps** 在 Agent 層面的具體實踐：

| 層面 | 方法論 | 關注點 |
|------|--------|--------|
| 企業/系統 | ContextOps | RAG pipeline、embeddings、retrieval |
| Agent/工具 | Progressive Disclosure | Skill loading、token budget、動態發現 |

兩者共同目標：**在有限的 context 中，提供最相關的資訊給 LLM**。

---

## 延伸資源

### Context Engineering 相關

| 資源 | 網址 |
|------|------|
| Effective context engineering for AI agents | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| Claude Code: Best practices for agentic coding | https://www.anthropic.com/engineering/claude-code-best-practices |

### 技術實作

| 資源 | 網址 |
|------|------|
| Agent Skills Cookbook | https://github.com/anthropics/claude-cookbooks/tree/main/skills |
| Agent Skills GitHub Repo | https://github.com/anthropics/skills |
| Agent Skills 開放標準 | https://agentskills.io |

---

## 相關文件

- [ContextOps: The Hidden Discipline](./contextops-discipline.md) - 企業層面的 Context 治理
- [Claude Code Tips](./claude-code-tips.md) - Claude Code CLI 實務操作

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-12-23 | 初始版本 | maple |
