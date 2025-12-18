---
title: "外部服務參考"
type: reference
status: active
created: 2025-12-16
project: LearningMap
author: yijou14
tags:
  - external-services
  - keepa
  - oxylabs
  - crawler
audience:
  - crawler-engineer
  - all
summary: |
  爬蟲、代理、資料蒐集與網頁解析服務參考，涵蓋 Keepa、Apollo.io、
  Oxylabs、Jina AI、MarkItDown 等。
---

# 外部服務參考

爬蟲、代理、資料蒐集與網頁解析服務。

---

## 資料蒐集服務

### Keepa

> 📖 [官方網站](https://keepa.com/)
> [API 文檔](https://keepa.com/#!discuss/t/product-query-request/187)
> [Python Library](https://keepaapi.readthedocs.io/)

Amazon 產品價格追蹤與歷史資料服務，涵蓋超過 25 億筆 Amazon 產品。

**主要功能**：
- 價格歷史圖表與追蹤
- 透過 UPC/ASIN 查詢產品
- 銷售排名、評分、Buy Box 資訊
- Best Sellers、Deals 查詢

**API 特點**：
- RESTful API，JSON 格式回傳
- 支援 11 個 Amazon 區域（US、GB、DE、JP 等）
- 需付費訂閱取得 API Key

**注意事項**：
- Keepa 只記錄價格變動點，需自行補齊中間日期
- 一個 UPC 可能對應多個 ASIN

---

### Apollo.io

> 📖 [官方文檔](https://docs.apollo.io/)

B2B 資料平台，擁有 2.1 億筆聯絡人資料。

**主要功能**：
- People API - 搜尋聯絡人
- Enrichment API - 補充資料
- Company Search - 公司資訊查詢

**用途**：
- 銷售線索開發
- 聯絡人資料補充
- 公司背景調查

---

## 代理與反爬蟲服務

### Oxylabs

> 📖 [官方網站](https://oxylabs.io/)
> [開發者文檔](https://developers.oxylabs.io/)

代理服務商，擁有超過 1.77 億個 IP，幫助繞過反爬蟲機制。

**主要產品**：
- **Residential Proxies** - 住宅 IP 代理
- **Datacenter Proxies** - 資料中心代理
- **Web Unblocker** - 自動處理反爬蟲機制

**用途**：
- 大規模網頁爬蟲
- 電商價格監控
- 地區限制內容存取

---

## 網頁解析服務

### Jina AI

> 📖 [官方網站](https://jina.ai/)
> [GitHub MCP](https://github.com/jina-ai/mcp-server-jina)

網頁解析與搜尋服務，將網頁轉換為 LLM 可讀格式。

**主要功能**：
- **Reader API** - `r.jina.ai/{url}` 將網頁轉為 Markdown
- **Search API** - `s.jina.ai/{query}` 搜尋並回傳結構化結果
- **MCP Server** - 整合到 AI Agent 工作流程

**用途**：
- 為 LLM 準備網頁內容
- 自動化資料擷取
- RAG 應用的資料來源

---

## 文件轉換工具

### MarkItDown

> 📖 [GitHub](https://github.com/microsoft/markitdown)
> [Python 教學](https://realpython.com/python-markitdown/)

Microsoft 開源的文件轉 Markdown 工具，專為 LLM 資料處理設計。

**支援格式**：
- Office 文件：Word (.docx)、Excel (.xlsx/.xls)、PowerPoint (.pptx)
- PDF、HTML、圖片 (JPG/PNG)、音訊 (WAV/MP3)
- ZIP 壓縮檔

**特色**：
- 保留文件結構（標題、列表、表格、連結）
- Token 效率高，適合 LLM 輸入
- MIT 授權，可商用
- 支援 MCP Server 整合

**安裝**：
```bash
pip install 'markitdown[all]'
```

**用途**：
- LLM 資料前處理
- RAG 系統文件攝取
- 文件遷移至 Markdown 系統

**限制**：
- PDF 需先 OCR 才能處理
- PDF 格式（標題、列表）可能遺失
