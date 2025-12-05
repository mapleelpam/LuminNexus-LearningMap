# 工具與資源指南

本文件整理專案中可能用到的 AI 工具與資料蒐集服務，供快速參考。

Author: Hu, Yu-Shin

---

## 一、AI Coding Agent

在本地開發環境中使用的 AI 輔助編程工具。

| 工具                  | 說明                      | 設定方式                                                                                          | 官方文件                                                                                                                                                               |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor**      | 基於 VS Code 的 AI 編輯器 | •`.cursor/rules` 或 `.cursorrules` 設定規則<br />• 可裝 Mermaid Chart、Office Viewer 等擴充 | •[cursor.com](https://cursor.com/)<br />• [Rules 文件](https://docs.cursor.com/context/rules)<br />• [awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) |
| **Codex CLI**   | OpenAI 終端機 AI 助手     | •`~/.codex/config.toml` 設定檔<br />• Execpolicy 設定執行權限                                 | •[developers.openai.com/codex/cli](https://developers.openai.com/codex/cli/)<br />• [CLI Reference](https://developers.openai.com/codex/cli/reference/)                    |
| **Claude Code** | Anthropic 終端機 AI 助手  | •`CLAUDE.md` 專案說明檔<br />• `.claude/commands/` 自訂指令<br />• 支援 MCP 擴充           | •[docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code/overview)<br />• [GitHub](https://github.com/anthropics/claude-code)                      |

---

## 二、AI API

直接呼叫 API 進行任務處理。

| 服務                 | 官方文件                                              |
| -------------------- | ----------------------------------------------------- |
| **Claude API** | [docs.anthropic.com](https://docs.anthropic.com/)        |
| **OpenAI API** | [platform.openai.com](https://platform.openai.com/docs/) |

### 常用功能與模型比較

| 功能                         | 說明                     | Claude API                                                                                                                                              | OpenAI API                                                                                                               |
| ---------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Web Search**         | 讓模型即時搜尋網路       | •[Web Search Tool](https://docs.anthropic.com/en/docs/build-with-claude/tool-use/web-search-tool)<br />• $10/1k searches<br />• 支援 domain allow/block | •[Web Search](https://platform.openai.com/docs/guides/tools-web-search)<br />• 支援 tool_choice 強制搜尋                  |
| **Batch API**          | 大量非同步處理，50% 折扣 | •[Message Batches](https://docs.anthropic.com/en/docs/build-with-claude/message-batches)<br />• 上限 10k requests                                        | •[Batch API](https://platform.openai.com/docs/guides/batch)                                                                |
| **Structured Outputs** | 確保輸出符合 JSON Schema | • 透過 tool_use 實現                                                                                                                                   | •[Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)<br />• `response_format: json_schema` |

---

## 三、資料蒐集工具

爬蟲、代理與網頁解析服務。

| 服務                | 用途                                   | 主要功能                                                                                      | 官方文件                                                                                      |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Apollo.io** | B2B 資料平台，2.1 億聯絡人             | • People API 搜尋聯絡人<br />• Enrichment API 補充資料                                      | •[docs.apollo.io](https://docs.apollo.io/)                                                      |
| **Oxylabs**   | 代理服務，幫忙繞過反爬蟲機制，177M+ IP | • Residential/Datacenter Proxies<br />• Web Unblocker 處理反爬                              | •[oxylabs.io](https://oxylabs.io/)<br />• [developers.oxylabs.io](https://developers.oxylabs.io/) |
| **Jina AI**   | 網頁解析與搜尋                         | • Reader API `r.jina.ai/{url}`<br />• Search API `s.jina.ai/{query}`<br />• MCP Server | •[jina.ai](https://jina.ai/)<br />• [GitHub MCP](https://github.com/jina-ai/MCP)                  |
