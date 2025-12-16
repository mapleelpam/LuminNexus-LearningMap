# LuminNexus General Learning Map (通用學習地圖)

**Version**: 1.0
**Date**: 2025-11-10
**Status**: Reference Document

---

## 📋 文件說明

本文件為 LuminNexus 公司新進人員的**通用學習地圖**，涵蓋所有角色共同的基礎學習路徑。

**當前角色定義**:
- **Test & Business Analysis** - 數據分析與測試
- **Crawler Engineer** - 數據採集與爬蟲開發

---

## 🏗️ Learning Map 架構

```
                    【公司願景層】
                         |
                 【產品生態系統層】
                         |
        ┌────────────────┴────────────────┐
        |                                  |
   【數據採集線】                      【數據分析線】
   (AtlasVault)                       (PrismaVision)
        |                                  |
   Crawler Engineer                 Test & Business Analysis
```

---

## 📊 學習路徑總覽

| Level | 名稱 | 預計時間 | 適用對象 |
|-------|------|---------|---------|
| **Level 0** | 公司與業務認知 | 2-3 天 | 所有人 |
| **Level 1** | 技術基礎與工具鏈 | 1-2 週 | 所有人 |
| **Level 2** | 產品知識與核心概念 | 2-3 週 | 所有人 |
| **Level 3** | 角色專業技能 | 1-2 月 | 分流 |
| **Level 4** | 系統設計與架構 | 2-3 月 | 所有人 |
| **Level 5** | 技術領導與創新 | 6-12 月 | 所有人 |

**學習路徑視覺化**:
```
所有新人
   ↓
Level 0 (2-3d) → Level 1 (1-2w) → Level 2 (2-3w)
   ↓
   ├─ Crawler Engineer (Level 3)
   └─ Test & Business Analysis (Level 3)
   ↓
Level 4 (2-3m) → Level 5 (6-12m)
```

---

# Level 0: 公司與業務認知

**⏱ 預計時間**: 2-3 天
**🎯 學習目標**: 理解公司使命、產品定位、市場價值

## 學習項目

### A. 公司願景與產品生態系統
- [ ] 公司使命與願景
- [ ] 我們要解決什麼問題
- [ ] 產品矩陣理解
  - AtlasVault (數據採集)
  - PrismaVision (數據分析)
  - PatientGleamer (應用層)
- [ ] 數據流向與價值鏈
  - 數據採集 → 數據處理 → 數據分析 → 價值呈現

### B. 營養補充劑產業知識入門
- [ ] 產業背景與市場規模
- [ ] 產品分類系統
  - 維生素 (Vitamins)
  - 礦物質 (Minerals)
  - 益生菌與益生元 (Probiotics & Prebiotics)
  - 草本補充劑 (Herbal Supplements)
  - 蛋白質與運動營養
  - Omega-3 脂肪酸
- [ ] 產品屬性理解
  - DosageForm（劑型）: Capsule, Tablet, Powder, Gummy, Softgel, Liquid
  - Brand（品牌）
  - Price（價格）
  - Supplement Facts（營養成分表）
  - Certification（認證）: Vegan, Non-GMO, Organic, Gluten-Free
  - UsageContext（使用情境）: Adults, Children, Seniors, Pregnancy

### C. 角色理解與協作關係
- [ ] Test & Business Analysis 做什麼
  - 測試案例設計
  - 業務需求分析
  - 數據品質驗證
  - 文檔撰寫
- [ ] Crawler Engineer 做什麼
  - Web Scraper 開發
  - 反爬機制應對
  - 數據品質管理
  - 維護與監控
- [ ] 兩個角色如何協作

## 檢核點
- [ ] 能用 3 分鐘向家人解釋公司在做什麼
- [ ] 能列舉 5 種常見的補充劑類型
- [ ] 能畫出 AtlasVault → PrismaVision 的數據流向圖
- [ ] 能說明兩個角色的核心職責與協作方式

## 學習資源
- `LuminNexus-PrismaVision-SmartInsightEngine/README.md`
- `LuminNexus-AtlasVault-Shopify/CLAUDE.md`
- [NIH Office of Dietary Supplements](https://ods.od.nih.gov/)

---

# Level 1: 技術基礎與工具鏈

**⏱ 預計時間**: 1-2 週
**🎯 學習目標**: 掌握開發環境、版本控制、基本工具使用

## 學習項目

### A. 開發環境設置
- [ ] Python 環境管理
  - Python 3.8+ 安裝與驗證
  - Virtual Environment 使用
  - Editable mode 安裝 (`pip install -e .`)
- [ ] Git 版本控制基礎
  - Clone, Branch, Commit, Push, Pull
  - Commit message 規範
  - 分支策略（main, lucid, feature branches）
- [ ] 開發工具
  - VSCode / PyCharm 配置
  - SQLite 瀏覽工具
  - API 測試工具（Postman / curl）

### B. Python 核心能力
- [ ] 基礎語法與資料結構
  - List, Dict, Set, Tuple
  - List Comprehension
  - Type Hints（類型提示）
- [ ] 常用標準庫
  - `json` - JSON 處理
  - `sqlite3` - SQLite 操作
  - `pathlib` - 檔案路徑處理
  - `logging` - 日誌記錄
- [ ] 第三方套件
  - `requests` - HTTP 請求
  - `pytest` - 測試框架

### C. 數據庫基礎
- [ ] SQLite 基本操作
  - SELECT, WHERE, JOIN
  - GROUP BY, ORDER BY
  - COUNT, AVG, SUM
- [ ] Schema 理解
  - 表結構設計（Table Schema）
  - 主鍵與外鍵（Primary Key, Foreign Key）
  - 索引（Index）的作用
- [ ] 實際資料庫結構
  - `products_info.lucid.db`（當前主要資料庫）
  - `products_info.photon.db`（舊版資料庫）
  - 兩者的差異與使用場景

### D. Documentation 閱讀能力
- [ ] 如何閱讀 Markdown 文檔
- [ ] 如何查找專案中的技術文檔
  - `spec/` - API 規範（SSOT）
  - `docs/` - 歷史設計文檔
  - `CLAUDE.md` - 開發指南
  - `README.md` - 快速入門
- [ ] 如何使用 Claude Code
  - Slash commands
  - Agents（@agent-xxx）
  - 提問技巧

## 檢核點
- [ ] 成功設置 Python 虛擬環境並安裝依賴
- [ ] 執行基本 Git 操作（clone, commit, push, pull）
- [ ] 讀寫 JSON 檔案並處理數據
- [ ] 執行基本 SQL 查詢
- [ ] 理解專案文檔結構並能快速找到需要的資訊

## 學習資源
- [Python 官方教學](https://docs.python.org/3/tutorial/)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)
- [Pro Git Book](https://git-scm.com/book/zh-tw/v2)

---

# Level 2: 產品知識與核心概念

**⏱ 預計時間**: 2-3 週
**🎯 學習目標**: 深入理解兩條產品線的核心概念與工作方式

## 學習項目

### A. AtlasVault - 數據採集系統理解

#### 數據來源與採集策略
- [ ] 主要數據來源
  - Shopify 商店（800+ 個）
  - iHerb（單一零售商）
  - DSLD（政府資料庫）
- [ ] 採集方法
  - API 呼叫
  - Web Scraping
  - Proxy 服務（Oxylabs）

#### Shopify Crawler 核心概念
- [ ] 5-Stage Pipeline 理解
  - Stage 1: 產品資料採集
  - Stage 1.5: 品質檢測與修復
  - Stage 2: 變更偵測
  - Stage 3-5: (未來規劃)
- [ ] 數據品質管理
  - 價格異常偵測
  - 重複資料清理
  - 缺失資料補全
- [ ] 爬蟲挑戰
  - 反爬機制（Rate Limiting, Captcha, IP 封鎖）
  - 動態網頁（JavaScript 渲染）
  - 數據一致性保證

### B. PrismaVision - 數據分析引擎理解

#### Smart Insight Engine 核心概念
- [ ] **MDFO 查詢模型** (必須深入理解)
  - **M (Measure)**: 度量指標
    - RISC Measures: `product_count`, `avg_price`, `price_statistics`, `avg_amount`, `brand_count`
    - CISC Measures: `co_occurrence_analysis`, `supplement_fact_aggregation`
  - **D (Dimensions)**: 分組維度
    - 常用維度: `Brand`, `DosageForm`, `SupplementFact`, `HealthEffects`
    - 維度數量限制
  - **F (Filters)**: 過濾條件
    - `any` (OR 邏輯) vs `all` (AND 邏輯)
    - Cross-taxonomy 組合邏輯
  - **O (Options)**: 查詢選項
    - `limit`, `dimension_limits`, `knowledge_realms_combine`, `dimension_inclusion`, `bin_size`

#### CISC/RISC 架構
- [ ] CISC (Complex Instruction Set Computing)
  - 使用者友好的複雜指令
  - 自動注入維度
  - 內建業務邏輯
- [ ] RISC (Reduced Instruction Set Computing)
  - 引擎執行的原子操作
  - 簡單、明確
  - 高效執行
- [ ] 為什麼需要 CISC/RISC 分層

#### Query Pipeline（查詢流程）
- [ ] SchemaTranslator（轉換器）
- [ ] QueryValidator（驗證器）
- [ ] EngineRouter（路由器）
- [ ] Engine（執行引擎）
- [ ] ResponseFormatter（格式化器）

### C. 數據模型與 Schema 理解
- [ ] 產品數據結構
  - Products 表（產品主表）
  - SupplementFact 表（營養成分）
  - Taxonomy 表（分類階層）
- [ ] 階層式分類系統（Hierarchical Taxonomies）
  - 樹狀結構組織
  - Parent Node 與 Child Node
- [ ] Parent Node Semantics（父節點語義）
  - 遞迴展開（Recursive Expansion）
  - ANY vs ALL 的語義差異

### D. 測試與品質保證理念
- [ ] 為什麼需要測試
  - 確保查詢引擎的準確性
  - 防止回歸錯誤
  - 提供使用範例與文檔
- [ ] 測試案例的結構
- [ ] 測試分類
  - Measure Tests（度量測試）
  - Business Scenario Tests（業務場景測試）
  - Edge Case Tests（邊界案例測試）
- [ ] 執行測試（v3_test_case_runner.py）

## 檢核點
- [ ] 說明 5-Stage Pipeline 的目的與運作方式
- [ ] 解釋 MDFO 各字母代表什麼，並舉例說明
- [ ] 區分 CISC 和 RISC 的差異與使用場景
- [ ] 理解階層式分類系統的運作原理
- [ ] 解釋 Parent Node 的遞迴展開語義
- [ ] 閱讀並理解一個完整的測試案例
- [ ] 執行測試並解讀測試報告

## 學習資源
- `LuminNexus-AtlasVault-Shopify/CLAUDE.md`（完整閱讀）
- `spec/Canonical_Query_Schema.md`（核心文檔）
- `spec/Measure_Reference.md`
- `spec/arch/CISC_RISC_Architecture.md`
- `spec/arch/Query_Pipeline.md`
- `tests/testcase/` 目錄下的測試範例

---

# Level 3: 角色專業技能（進階）

**⏱ 預計時間**: 1-2 月
**🎯 學習目標**: 根據角色深化專業技能

**注意**: 此階段開始分流，請參閱對應的角色專屬文檔：
- **Test & Business Analysis**: 深入查詢設計、測試策略、業務分析
- **Crawler Engineer**: 深入 Web Scraping、API 設計、資料清洗

**通用能力要求**：
- [ ] Code Review 能力
- [ ] Debug 技巧
- [ ] Performance Optimization 意識
- [ ] Documentation 撰寫能力

**詳細內容見各角色專屬 Learning Map**

---

# Level 4: 系統設計與架構理解

**⏱ 預計時間**: 2-3 月
**🎯 學習目標**: 理解系統設計決策、架構權衡、設計模式

## 學習項目

### A. 軟體設計原則
- [ ] SOLID 原則
  - Single Responsibility Principle（單一職責原則）
  - Open/Closed Principle（開放封閉原則）
  - Liskov Substitution Principle（里氏替換原則）
  - Interface Segregation Principle（接口隔離原則）
  - Dependency Inversion Principle（依賴反轉原則）
- [ ] Design Patterns（設計模式）
  - Adapter Pattern（適配器模式）
  - Strategy Pattern（策略模式）
  - Factory Pattern（工廠模式）
  - Template Method Pattern（模板方法模式）
- [ ] Protocol-based Design（協議導向設計）
- [ ] Dependency Injection（依賴注入）

### B. 系統架構理解
- [ ] AtlasVault 的 Plugin-based Architecture
  - 設計理念
  - 架構圖
  - 優點與實作
- [ ] PrismaVision 的 Query Pipeline Architecture
  - Pipeline 各階段職責
  - 為什麼這樣設計
- [ ] 設計權衡（Trade-offs）
  - 反正規化 vs 正規化
  - App-side vs DB-side Processing

### C. 效能優化
- [ ] Database Indexing 策略
- [ ] Query Optimization（SQL 優化）
  - 使用 CTE
  - 避免 SELECT *
  - 使用 EXPLAIN 分析
- [ ] Caching 機制
  - 何時使用 Cache
  - Cache 策略（Time-based, Event-based, LRU）
- [ ] Batch Processing vs Real-time Processing

### D. 錯誤處理與可靠性
- [ ] Retry Strategy（重試策略）
  - Exponential Backoff（指數退避）
  - Jitter（隨機延遲）
- [ ] Error Classification（錯誤分類）
  - 可重試錯誤
  - 不可重試錯誤
- [ ] Graceful Degradation（優雅降級）
- [ ] Logging & Monitoring
  - 日誌層級
  - 日誌內容設計
  - 監控指標

### E. 數據完整性與品質
- [ ] Data Validation（資料驗證）
  - Schema Validation
  - Business Rule Validation
- [ ] Data Cleaning（資料清洗）
  - 去除重複
  - 標準化
  - 缺失值處理
- [ ] Data Versioning（資料版本管理）

## 檢核點
- [ ] 解釋 SOLID 原則並舉實際範例
- [ ] 畫出系統架構圖
- [ ] 分析一個設計決策的 Trade-offs
- [ ] 識別程式碼中的設計模式
- [ ] 設計合理的 Retry 策略
- [ ] 撰寫結構化的日誌
- [ ] 設計資料驗證與清洗邏輯

## 學習資源
- `spec/arch/` 目錄下的架構文檔
- 《Head First Design Patterns》
- 《Clean Architecture》 - Robert C. Martin
- 《Designing Data-Intensive Applications》 - Martin Kleppmann

---

# Level 5: 技術領導與創新

**⏱ 預計時間**: 6-12 月
**🎯 學習目標**: 獨立設計功能、技術決策、指導新人

## 學習項目

### A. Feature Design
- [ ] 需求分析與可行性評估
  - 理解需求
  - 技術可行性評估
- [ ] 技術方案設計與評審
  - 設計文檔結構
  - 方案比較
- [ ] API 設計與向後兼容
  - RESTful 設計
  - 版本控制
  - 向後兼容原則
- [ ] 設計文檔撰寫
  - 使用者導向
  - 層次分明
  - 保持更新
  - 可追溯

### B. Code Quality & Best Practices
- [ ] Code Review Leadership
  - Code Review 檢查清單
  - 如何給予建設性回饋
- [ ] Testing Strategy 制定
  - 測試金字塔（Unit/Integration/E2E）
  - 測試比例與策略
- [ ] Refactoring 策略
  - 何時需要重構
  - 重構步驟
- [ ] Technical Debt 管理
  - Technical Debt 定義與分類
  - 管理策略（記錄、償還、預防）

### C. 跨團隊協作
- [ ] 與 Product Manager 溝通需求
  - 釐清需求背景
  - 提出技術限制與替代方案
  - 給出時間估算與風險
- [ ] 與 Frontend 定義 API Contract
  - Endpoint 與方法
  - Request/Response Format
  - Error Codes
  - 協作流程
- [ ] 與 QA 設計測試策略
  - 定義測試範圍
  - 提供測試案例範本
  - 定義 Bug 優先級

### D. 技術創新
- [ ] 新技術調研與評估
  - 識別需求
  - 初步調研
  - 深入評估（優缺點、成本、風險）
- [ ] POC（概念驗證）設計與實作
  - 定義驗證目標
  - 時間盒限制
  - 實作 MVP
  - 評估結果
- [ ] 技術分享與知識傳承
  - Tech Talk（技術演講）
  - Code Walkthrough（程式碼導覽）
  - Documentation（文檔）
  - Pair Programming（結對編程）

## 檢核點
- [ ] 獨立設計並實作一個完整功能（從需求到上線）
- [ ] 撰寫清晰的技術設計文檔
- [ ] 進行有建設性的 Code Review
- [ ] 制定並執行測試策略
- [ ] 與 PM、Frontend、QA 有效溝通
- [ ] 進行技術調研並提出建議
- [ ] 指導新人完成開發任務
- [ ] 分享技術知識並推動團隊成長

## 學習資源
- 《The Manager's Path》 - Camille Fournier
- 《Staff Engineer》 - Will Larson
- 《System Design Interview》 - Alex Xu

---

# 附錄

## 術語表（Glossary）

| 中文 | 英文 | 說明 |
|------|------|------|
| 度量 | Measure | 要計算的指標（如 product_count） |
| 維度 | Dimension | 分組依據（如 Brand） |
| 過濾器 | Filter | 篩選條件 |
| 選項 | Option | 查詢控制參數 |
| 劑型 | DosageForm | 補充劑的形式（膠囊、錠劑等） |
| 營養成分 | Supplement Fact | 產品包含的營養素 |
| 分類階層 | Taxonomy | 樹狀分類結構 |
| 父節點 | Parent Node | 階層中的上層節點 |
| 子節點 | Child Node | 階層中的下層節點 |
| 遞迴展開 | Recursive Expansion | 父節點自動包含所有子節點 |
| 爬蟲 | Crawler / Spider | 自動採集網頁數據的程式 |
| 反爬 | Anti-Scraping | 防止爬蟲的機制 |
| 代理 | Proxy | 中繼伺服器，用於隱藏真實 IP |

---

## FAQ（常見問題）

**Q1: Level 0-5 一定要依序完成嗎？**
A: 建議依序完成 Level 0-2（通用基礎），之後可依角色跳至 Level 3。Level 4-5 可在工作中逐步達成。

**Q2: 學習時間只是預估，實際可能更久嗎？**
A: 是的。預估時間是平均值，實際時間因人而異。重要的是確實掌握每個階段的核心概念。

**Q3: 如何知道我已經準備好進入下一個 Level？**
A: 完成該 Level 的所有檢核點。建議與導師進行 1-on-1 討論確認。

**Q4: Level 3 的角色專屬內容在哪裡？**
A: 將於未來建立角色專屬文檔。

**Q5: 我在學習過程中遇到問題，應該問誰？**
A:
1. 先查閱相關文檔（README, CLAUDE.md, spec/）
2. 使用 Claude Code 提問（@agent-xxx）
3. 詢問你的導師（Mentor）
4. 在團隊 Slack 頻道提問

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-11-10 | 初始版本：Level 0-5 通用內容（精簡版） | LuminNexus Team |

---

**祝學習順利！Welcome to LuminNexus! 🚀**
