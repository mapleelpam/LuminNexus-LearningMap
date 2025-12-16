# LuminNexus Learning Map - 專案架構設計 v2 (精簡版)

## 設計原則

1. **簡潔實用**: 只保留核心必要的結構
2. **易於維護**: 減少複雜度，專注內容本身
3. **未來可擴展**: 預留擴展空間但不過度設計
4. **靜態網站友善**: 適合轉換成網頁但不綁定特定框架

---

## 核心專案結構

```
LuminNexus-LearningMap/
├── README.md                      # 專案說明
├── STRUCTURE.md                   # 架構文件
│
├── docs/                          # 學習內容（核心）
│   ├── general/                   # 通用能力
│   │   ├── README.md             # 通用能力總覽
│   │   ├── product-business.md   # 1. 產品與業務理解
│   │   ├── data-engineering.md   # 2. 資料工程基礎
│   │   ├── software-engineering.md  # 3. 軟體工程實踐
│   │   ├── testing-qa.md         # 4. 測試與品質保證
│   │   ├── ai-assisted-dev.md    # 5. AI 輔助開發
│   │   ├── web-technologies.md   # 6. 網頁技術與資料蒐集
│   │   ├── data-analysis.md      # 7. 資料分析與視覺化
│   │   ├── systems-architecture.md  # 8. 系統思維與架構
│   │   ├── collaboration.md      # 9. 協作與溝通
│   │   └── security.md           # 10. 安全性與最佳實踐
│   │
│   ├── roles/                     # 角色特定學習路徑
│   │   ├── README.md             # 角色總覽
│   │   ├── test-business-analyst.md    # Test & Business Analysis
│   │   └── crawler-engineer.md         # Crawler Engineer
│   │
│   └── learning-paths/            # 學習路徑規劃
│       ├── README.md             # 學習路徑總覽
│       ├── foundation-track.md   # 基礎階段 (1-8週)
│       ├── advanced-track.md     # 進階階段 (3-5月)
│       └── assessment.md         # 能力驗證與自我評估
│
├── images/                        # 圖片資源
│   └── diagrams/                 # 圖表、架構圖
│
└── archive/                       # 歷史文檔
    └── 20251110_initial_draft.md

```

---

## 詳細說明

### `docs/general/` - 通用能力模組

**設計思路**: 每個主題一個檔案，保持簡潔

- **README.md**: 通用能力的總覽與導航
- **10個主題檔案**: 對應 General Learning Map 的 10 大領域
  - 每個檔案包含該領域的完整內容
  - 使用 Markdown heading 組織子主題
  - 適當的錨點連結方便跳轉

**範例結構** (`product-business.md`):
```markdown
# 產品與業務理解

## 1.1 產品核心價值
內容...

## 1.2 營養補充品產業知識
內容...

## 1.3 分類法設計思維
內容...

## 1.4 資料品質意識
內容...
```

---

### `docs/roles/` - 角色特定學習路徑

**設計思路**: 每個角色一個檔案，描述該角色的專屬技能與學習路徑

- **README.md**: 角色對照、選擇指南
- **test-business-analyst.md**: 包含
  - 角色職責說明
  - 需要的通用能力（連結到 general/）
  - 角色專屬技能
  - 推薦學習順序
  - 實作專案建議

- **crawler-engineer.md**: 同上結構

**為什麼不細分子資料夾？**
- 角色內容不會太多，單一檔案更易閱讀
- 減少檔案跳轉，提升使用體驗
- 如果未來內容變多，再考慮拆分

---

### `docs/learning-paths/` - 學習路徑規劃

**設計思路**: 提供結構化的學習計畫

- **foundation-track.md**:
  - 第 1-8 週的學習計畫
  - 每週學習目標、活動、驗證方式

- **advanced-track.md**:
  - 第 3-5 個月的進階學習
  - 專業技能深化路徑

- **assessment.md**:
  - 自我評估檢查表
  - 能力驗證標準
  - 實務評估任務

---

### `images/` - 圖片資源

**設計思路**: 集中管理所有圖片

- 使用描述性檔名：`learning-path-overview.png`
- 子資料夾分類（如有需要）：`diagrams/`, `screenshots/`
- Markdown 中引用：`![描述](../images/diagrams/xxx.png)`

**為什麼不放在 `public/` 或 `assets/`？**
- 目前不確定用什麼網頁框架，先保持中立
- 單純的 `images/` 更直觀
- 未來轉換框架時，調整路徑即可

---

### `archive/` - 歷史文檔

**設計思路**: 保留重要的歷史版本

- 使用日期前綴：`YYYYMMDD_description.md`
- 避免刪除，以便追溯演進
- 不會出現在網頁導航中

---

## 檔案命名規範

### Markdown 檔案
- 小寫字母 + 連字符：`data-engineering.md`
- 簡短描述性：`test-business-analyst.md`
- 避免空格和特殊字元

### 圖片檔案
- 描述性命名：`architecture-overview.png`
- 小寫字母 + 連字符
- 必要時加日期前綴：`20251110-data-flow.png`

---

## 內容組織原則

### 1. 扁平優於巢狀
- 盡量減少目錄層級（最多 3 層）
- 單一檔案可以較長，優於多個短檔案跳轉

### 2. 使用 Markdown 錨點
```markdown
[跳到 AI 代理](#51-ai-代理-subagent-架構)
```
而非拆成多個檔案

### 3. 交叉引用使用相對路徑
```markdown
詳見 [通用能力 - Git](../general/software-engineering.md#31-版本控制-git)
```

### 4. Front Matter（可選）
如未來使用靜態網站生成器，可加入元數據：
```yaml
---
title: 產品與業務理解
category: 通用能力
order: 1
---
```

---

## 未來網頁化考量

### 目前架構的優勢
1. **框架中立**: 不綁定任何特定工具
2. **純 Markdown**: 易於版本控制、協作
3. **結構清晰**: 符合靜態網站生成器的預期結構

### 可搭配的網頁框架（未來）

**選項 1: VitePress**
```javascript
// .vitepress/config.js
export default {
  title: 'LuminNexus Learning Map',
  themeConfig: {
    sidebar: {
      '/docs/general/': [...],
      '/docs/roles/': [...],
    }
  }
}
```

**選項 2: Docusaurus**
```javascript
// docusaurus.config.js
module.exports = {
  title: 'LuminNexus Learning Map',
  sidebar: {
    general: [...],
    roles: [...],
  }
}
```

**選項 3: MkDocs**
```yaml
# mkdocs.yml
nav:
  - 通用能力:
    - docs/general/README.md
    - 產品與業務: docs/general/product-business.md
```

**共通點**: 都能直接使用 `docs/` 結構，只需加入配置檔

---

## 遷移計畫

### 現有檔案處理
```
目前:
- General_Learning_Map.md
- 20251110_General_Learning_Map.md
- testing_learning_map.md

建議:
1. 將 General_Learning_Map.md 拆分到 docs/general/ 的 10 個檔案
2. 原始檔案移到 archive/
3. testing_learning_map.md 決定去留
```

### 實作步驟
1. [ ] 建立目錄結構
2. [ ] 撰寫各個 README.md（導航用）
3. [ ] 拆分 General Learning Map 到 10 個主題檔案
4. [ ] 建立角色特定學習路徑（2個檔案）
5. [ ] 建立學習路徑規劃（3個檔案）
6. [ ] 移動歷史檔案到 archive/
7. [ ] 撰寫專案 README.md

---

## 維護策略

### 內容更新
- 直接編輯對應的 Markdown 檔案
- Commit message 遵循規範
- 重大變更記錄在 CHANGELOG.md（如有需要）

### 版本管理
- 使用 Git tags: `v1.0.0`, `v1.1.0`
- 重大改版保留舊版到 `archive/`

### 協作流程
- Pull Request 提交變更
- 至少一人 Review
- 合併到 main branch

---

## 優勢總結

| 特點 | 說明 |
|------|------|
| **簡潔** | 只有 3 個核心目錄，易於理解 |
| **扁平** | 避免過深的巢狀結構 |
| **可讀** | 單一檔案完整內容，減少跳轉 |
| **可維護** | 檔案數量適中，容易管理 |
| **可擴展** | 需要時可新增子資料夾，不過度設計 |
| **框架中立** | 不綁定特定網頁工具 |

---

## 與 v1 版本對比

| 項目 | v1 (過度設計) | v2 (精簡版) |
|------|--------------|------------|
| 通用能力 | 10 個資料夾，每個有多個檔案 | 10 個檔案 |
| 範例程式碼 | 獨立 `examples/` 目錄 | 不需要（連結到實際專案） |
| 資源清單 | 獨立 `resources/` 目錄 | 整合在各主題檔案中 |
| 模板 | 獨立 `templates/` 目錄 | 不需要 |
| 網頁配置 | 提前設定 `.vitepress/` | 未來再加 |
| 評估測驗 | 獨立複雜結構 | 整合在 `assessment.md` |

**結論**: v2 減少約 70% 的目錄和檔案數量，更專注於內容本身。

---

**版本**: 2.0
**日期**: 2025-11-10
**設計者**: Learning Team
