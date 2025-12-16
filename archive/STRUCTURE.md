# LuminNexus Learning Map - 專案架構設計

## 設計理念

1. **內容與展示分離**: Markdown 內容獨立於網頁框架
2. **模組化**: 每個學習領域獨立成模組
3. **可擴展性**: 易於新增角色、主題、資源
4. **靜態網站友善**: 適合使用 VitePress, Docusaurus, MkDocs 等工具
5. **版本控制**: 支援文檔版本追蹤

---

## 專案結構

```
LuminNexus-LearningMap/
├── README.md                           # 專案首頁說明
├── STRUCTURE.md                        # 本檔案：架構設計文件
├── CHANGELOG.md                        # 版本變更記錄
│
├── docs/                               # 核心學習內容（Markdown）
│   ├── index.md                        # 學習地圖首頁
│   │
│   ├── general/                        # 通用核心能力
│   │   ├── index.md                    # 通用能力總覽
│   │   ├── 01-product-business/        # 產品與業務理解
│   │   │   ├── index.md
│   │   │   ├── product-value.md
│   │   │   ├── domain-knowledge.md
│   │   │   ├── taxonomy-design.md
│   │   │   └── data-quality.md
│   │   │
│   │   ├── 02-data-engineering/        # 資料工程基礎
│   │   │   ├── index.md
│   │   │   ├── data-formats.md
│   │   │   ├── database-fundamentals.md
│   │   │   └── data-quality.md
│   │   │
│   │   ├── 03-software-engineering/    # 軟體工程實踐
│   │   │   ├── index.md
│   │   │   ├── git-version-control.md
│   │   │   ├── documentation-driven.md
│   │   │   └── api-design.md
│   │   │
│   │   ├── 04-testing-qa/              # 測試與品質保證
│   │   │   ├── index.md
│   │   │   ├── testing-methodology.md
│   │   │   ├── test-driven-development.md
│   │   │   ├── automation.md
│   │   │   └── bug-management.md
│   │   │
│   │   ├── 05-ai-assisted-dev/         # AI 輔助開發
│   │   │   ├── index.md
│   │   │   ├── ai-agents.md
│   │   │   ├── building-agents.md
│   │   │   ├── prompt-engineering.md
│   │   │   └── code-review.md
│   │   │
│   │   ├── 06-web-technologies/        # 網頁技術與資料蒐集
│   │   │   ├── index.md
│   │   │   ├── web-fundamentals.md
│   │   │   ├── http-protocol.md
│   │   │   └── web-scraping.md
│   │   │
│   │   ├── 07-data-analysis/           # 資料分析與視覺化
│   │   │   ├── index.md
│   │   │   ├── statistical-thinking.md
│   │   │   ├── visualization.md
│   │   │   └── data-storytelling.md
│   │   │
│   │   ├── 08-systems-architecture/    # 系統思維與架構
│   │   │   ├── index.md
│   │   │   ├── architecture-patterns.md
│   │   │   ├── separation-concerns.md
│   │   │   └── scalability.md
│   │   │
│   │   ├── 09-collaboration/           # 協作與溝通
│   │   │   ├── index.md
│   │   │   ├── technical-communication.md
│   │   │   ├── code-review-culture.md
│   │   │   └── critical-thinking.md
│   │   │
│   │   └── 10-security-best-practices/ # 安全性與最佳實踐
│   │       ├── index.md
│   │       ├── common-vulnerabilities.md
│   │       ├── secure-coding.md
│   │       └── code-quality.md
│   │
│   ├── roles/                          # 角色特定學習路徑
│   │   ├── index.md                    # 角色總覽
│   │   │
│   │   ├── test-business-analyst/      # Test & Business Analysis
│   │   │   ├── index.md
│   │   │   ├── role-overview.md
│   │   │   ├── learning-path.md
│   │   │   ├── technical-skills/
│   │   │   │   ├── query-design.md
│   │   │   │   ├── test-case-design.md
│   │   │   │   └── business-analysis.md
│   │   │   └── projects/               # 實作專案
│   │   │       └── project-01.md
│   │   │
│   │   └── crawler-engineer/           # Crawler Engineer
│   │       ├── index.md
│   │       ├── role-overview.md
│   │       ├── learning-path.md
│   │       ├── technical-skills/
│   │       │   ├── python-advanced.md
│   │       │   ├── web-scraping-advanced.md
│   │       │   ├── data-pipeline.md
│   │       │   └── performance-optimization.md
│   │       └── projects/               # 實作專案
│   │           └── project-01.md
│   │
│   ├── learning-paths/                 # 學習路徑規劃
│   │   ├── index.md
│   │   ├── foundation-track.md         # 基礎階段 (1-8週)
│   │   ├── advanced-track.md           # 進階階段 (3-5月)
│   │   └── competency-validation.md    # 能力驗證
│   │
│   ├── resources/                      # 學習資源
│   │   ├── index.md
│   │   ├── books.md                    # 推薦書籍
│   │   ├── courses.md                  # 線上課程
│   │   ├── tools.md                    # 開發工具
│   │   ├── references.md               # 參考文獻
│   │   └── glossary.md                 # 術語表
│   │
│   └── assessments/                    # 評估與測驗
│       ├── index.md
│       ├── self-assessment.md          # 自我評估檢查表
│       ├── quizzes/                    # 測驗題目
│       │   ├── general-knowledge.md
│       │   ├── data-engineering.md
│       │   └── testing-qa.md
│       └── projects/                   # 評估專案
│           ├── project-01-data-quality.md
│           ├── project-02-api-design.md
│           └── project-03-test-suite.md
│
├── examples/                           # 範例程式碼與案例
│   ├── README.md
│   ├── data-samples/                   # 範例資料集
│   │   ├── products.json
│   │   ├── products.csv
│   │   └── schema.sql
│   ├── code-samples/                   # 程式碼範例
│   │   ├── python/
│   │   │   ├── data-validation.py
│   │   │   ├── web-scraper.py
│   │   │   └── api-client.py
│   │   └── sql/
│   │       ├── queries.sql
│   │       └── schema.sql
│   ├── test-cases/                     # 測試案例範例
│   │   ├── api-test-cases.json
│   │   └── data-validation-tests.json
│   └── ai-agents/                      # AI 代理範例
│       ├── test-designer-agent.md
│       ├── code-reviewer-agent.md
│       └── data-analyst-agent.md
│
├── templates/                          # 文檔模板
│   ├── README.md
│   ├── learning-module-template.md     # 學習模組模板
│   ├── role-specific-template.md       # 角色特定模板
│   ├── project-template.md             # 專案模板
│   └── adr-template.md                 # 架構決策記錄模板
│
├── .vitepress/                         # VitePress 配置（網頁框架）
│   ├── config.js                       # VitePress 主配置
│   ├── theme/                          # 自訂主題
│   │   ├── index.js
│   │   └── custom.css
│   └── components/                     # 自訂組件
│       ├── LearningPathDiagram.vue
│       ├── ProgressTracker.vue
│       └── QuizComponent.vue
│
├── public/                             # 靜態資源（圖片、PDF等）
│   ├── images/
│   │   ├── diagrams/                   # 架構圖、流程圖
│   │   ├── screenshots/                # 截圖
│   │   └── icons/                      # 圖標
│   ├── downloads/                      # 可下載資源
│   │   ├── cheatsheets/                # 速查表
│   │   └── guides/                     # 指南PDF
│   └── assets/                         # 其他靜態資源
│
├── scripts/                            # 自動化腳本
│   ├── generate-index.js               # 自動生成索引
│   ├── validate-links.js               # 驗證文檔連結
│   └── build-site.sh                   # 建置網站腳本
│
├── archive/                            # 歷史文檔存檔
│   └── 20251110_General_Learning_Map.md
│
├── .github/                            # GitHub 配置
│   └── workflows/
│       ├── deploy.yml                  # 自動部署到 GitHub Pages
│       └── validate.yml                # 文檔驗證 CI
│
├── package.json                        # Node.js 依賴（VitePress）
├── .gitignore                          # Git 忽略規則
└── LICENSE                             # 授權文件
```

---

## 檔案命名規範

### Markdown 檔案
- 使用小寫字母與連字符：`data-quality.md`
- 避免空格和特殊字元
- 日期前綴格式：`YYYYMMDD_filename.md`（用於歷史文檔）

### 目錄命名
- 使用小寫字母與連字符
- 數字前綴用於排序：`01-product-business/`

### 圖片檔案
- 描述性命名：`architecture-diagram-overview.png`
- 使用日期前綴（如需版本控制）：`20251110-data-flow.png`

---

## 內容組織原則

### 1. 模組化設計
每個學習主題為獨立模組，包含：
- `index.md`: 模組總覽與目錄
- 子主題檔案：具體內容
- 相關範例和資源連結

### 2. 階層結構
```
領域 (Domain) → 主題 (Topic) → 子主題 (Subtopic)
例：general/05-ai-assisted-dev/prompt-engineering.md
```

### 3. 交叉引用
使用相對路徑連結：
```markdown
詳見 [Git 版本控制](../03-software-engineering/git-version-control.md)
```

### 4. 元數據（Front Matter）
每個 Markdown 檔案包含元數據：
```yaml
---
title: Prompt Engineering
description: 學習如何撰寫有效的 AI Prompt
category: AI 輔助開發
difficulty: intermediate
duration: 2 hours
tags: [ai, prompt, gpt]
---
```

---

## 網頁框架建議

### 選項 1: VitePress（推薦）
**優點**:
- Vue 生態系統
- 快速、現代化
- 內建搜尋、主題
- Markdown 擴展支援

**適用情境**: 技術文檔、學習平台

### 選項 2: Docusaurus
**優點**:
- React 生態系統
- 版本控制內建
- i18n 支援
- MDX 支援（可嵌入 React 組件）

**適用情境**: 多版本文檔、國際化需求

### 選項 3: MkDocs Material
**優點**:
- Python 生態系統
- Material Design
- 搜尋強大
- 純 Markdown

**適用情境**: 簡單、快速建置

---

## 互動功能規劃

### 學習路徑追蹤
- [ ] 進度追蹤器（完成度百分比）
- [ ] 書籤功能
- [ ] 學習筆記（localStorage）

### 測驗與評估
- [ ] 互動式測驗（選擇題、填空）
- [ ] 即時回饋
- [ ] 成績記錄

### 社群功能（未來）
- [ ] 討論區連結
- [ ] 學習心得分享
- [ ] Q&A 區域

---

## 維護與更新

### 版本管理
- 使用 Git tags 標記版本：`v1.0.0`
- `CHANGELOG.md` 記錄變更
- 歷史版本移至 `archive/`

### 內容審查
- 每季度審查一次內容
- 更新過時的技術資訊
- 收集使用者回饋

### 貢獻指南
- 建立 `CONTRIBUTING.md`
- Pull Request 模板
- Issue 模板

---

## 部署策略

### GitHub Pages（推薦）
```bash
# 自動部署流程
1. Push to main branch
2. GitHub Actions 觸發
3. 建置靜態網站
4. 部署到 gh-pages branch
```

### 替代方案
- Vercel
- Netlify
- Cloudflare Pages

---

## 下一步行動

1. [ ] 建立基礎目錄結構
2. [ ] 將現有 `General_Learning_Map.md` 拆分到模組
3. [ ] 建立角色特定學習路徑
4. [ ] 設定 VitePress 配置
5. [ ] 撰寫 README.md
6. [ ] 建立範例內容
7. [ ] 設定 CI/CD 自動部署

---

**最後更新**: 2025-11-10
**維護者**: Learning Team
