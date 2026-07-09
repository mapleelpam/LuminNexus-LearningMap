---
title: "AI 工具參考"
type: reference
status: active
created: 2025-12-16
updated: 2025-12-16
version: "1.0"
project: LearningMap
author: yijou14
tags:
  - ai-tools
  - claude-code
  - gemini
  - coding-agent
audience:
  - all
summary: |
  AI Coding Agent（Claude Code、Gemini CLI、Codex CLI、Cursor）、
  研究工具（NotebookLM）與 AI API 快速參考。
---

# AI 工具參考

AI Coding Agent、研究工具與 API 快速參考。

---

## AI Coding Agent

在本地開發環境中使用的 AI 輔助編程工具，直接在終端機或編輯器中與 AI 互動。

### Claude Code

> 📖 [官方文檔](https://docs.anthropic.com/en/docs/claude-code/overview)
> [GitHub](https://github.com/anthropics/claude-code)

Anthropic 的終端機 AI 助手，專注於軟體工程任務。

**設定方式**：
- `CLAUDE.md` - 專案說明檔，Claude 自動讀取
- `.claude/commands/` - 自訂 slash commands
- 支援 MCP 擴充

**特色**：
- 強大的程式碼理解與生成能力
- 內建 TodoWrite 任務追蹤
- Subagent 多代理模式處理複雜任務

---

### Gemini CLI

> 📖 [官方文檔](https://developers.google.com/gemini-code-assist/docs/gemini-cli)
> [GitHub](https://github.com/google-gemini/gemini-cli)

Google 的開源終端機 AI 助手，免費使用 Gemini 2.5 Pro。

**設定方式**：
- `GEMINI.md` - 專案說明檔
- 支援 MCP Server 擴充
- VS Code companion 整合

**特色**：
- 免費額度：60 requests/min、1000 requests/day
- Gemini 3 Pro 支援（需訂閱）
- Checkpointing 儲存/恢復對話
- Sandboxing 安全執行環境

---

### Codex CLI

> 📖 [官方文檔](https://developers.openai.com/codex/cli/)
> [CLI Reference](https://developers.openai.com/codex/cli/reference/)

OpenAI 的終端機 AI 助手。

**設定方式**：
- `~/.codex/config.toml` - 設定檔
- Execpolicy 設定執行權限

---

### Cursor

> 📖 [官方網站](https://cursor.com/)
> [Rules 文件](https://docs.cursor.com/context/rules)

基於 VS Code 的 AI 編輯器，GUI 介面整合 AI 功能。

**設定方式**：
- `.cursor/rules` 或 `.cursorrules` - 設定規則
- 可安裝 Mermaid Chart、Office Viewer 等擴充

**資源**：
- [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) - 社群規則範例

---

## AI API

直接呼叫 API 進行任務處理，適合自動化流程與批次作業。

### Claude API

> 📖 [官方文檔](https://docs.anthropic.com/)

**常用功能**：
- **Web Search** - 即時搜尋網路，$10/1k searches（[文檔](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool)）
- **Batch API** - 大量非同步處理，50% 折扣，上限 10k requests（[文檔](https://docs.anthropic.com/en/docs/build-with-claude/message-batches)）
- **Structured Outputs** - 透過 tool_use 確保輸出符合 JSON Schema（[文檔](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)）

---

### OpenAI API

> 📖 [官方文檔](https://platform.openai.com/docs/)

**常用功能**：
- **Web Search** - 即時搜尋，支援 tool_choice 強制搜尋（[文檔](https://platform.openai.com/docs/guides/tools-web-search)）
- **Batch API** - 大量非同步處理，50% 折扣（[文檔](https://platform.openai.com/docs/guides/batch)）
- **Structured Outputs** - `response_format: json_schema`（[文檔](https://platform.openai.com/docs/guides/structured-outputs)）

---

### Gemini API

> 📖 [官方文檔](https://ai.google.dev/docs)

Google 的 AI API，與 Gemini CLI 使用相同模型。

---

## AI Canvas 協作介面

即時協作編輯的 AI 工作區，支援文件撰寫與程式碼開發。

### ChatGPT Canvas

> 📖 [官方介紹](https://openai.com/index/introducing-canvas/)
> [使用說明](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it)

OpenAI 的雙欄工作區，左側對話、右側即時編輯文件或程式碼。

**功能**：
- 直接編輯生成的文字或程式碼
- 選取特定段落請 AI 修改
- 程式碼 shortcuts：Review、Add logs、Fix bugs、Port to language
- 版本回溯
- 可執行 Python 程式碼
- 匯出與分享

---

### Gemini Canvas

> 📖 [官方介紹](https://gemini.google/overview/canvas/)
> [使用教學](https://www.magicslides.app/blog/how-to-use-gemini-canvas)

Google 的 AI 協作空間，支援 no-code 應用開發。

**功能**：
- 自然語言建立網頁、應用程式、遊戲
- Select and Ask：選取元素用自然語言修改
- 自動生成簡報（可匯出至 Google Slides）
- 支援 Gemini 3、1M token context window（Pro/Ultra）

---

## AI 研究工具

### NotebookLM

> 📖 [官方網站](https://notebooklm.google/)
> [Release Notes](https://support.google.com/notebooklm/answer/15731776)

Google 的 AI 研究助手，分析上傳的資料來源並生成多種格式輸出。

**支援來源**：
- PDF、Google Docs、Google Sheets
- 網頁 URL、YouTube 影片
- 圖片、.docx 檔案

**輸出格式**：
- **Audio Overview** - 生成 podcast 風格的語音摘要
- **簡報** - 自動生成 slide deck
- **資訊圖表** - 視覺化複雜資訊
- **報告** - 結構化文件

**功能**：
- **Deep Research** - 自動搜尋網路並生成研究報告
- 自訂 persona 調整回答風格
- 與 Gemini 整合，可在 Gemini 中引用 NotebookLM 筆記

**方案**：
- 免費：100 notebooks、50 sources/notebook、10 Deep Research/month
- Pro ($20/month)：500 notebooks、300 sources/notebook、20 Deep Research/day
