# LuminNexus 專案文檔

**版本**: 1.0
**更新日期**: 2025-12-09
**維護團隊**: Architecture Team

---

## 📋 文檔導航

本目錄包含 LuminNexus 生態系統所有內部專案的文檔,組織為三層架構。

### 🎯 從這裡開始

1. **系統架構全景** → [00_architecture-overview.md](00_architecture-overview.md)
   - 理解 LuminNexus 的三層架構
   - 各子系統的職責與定位

2. **資料流與串連** → [01_data-flow.md](01_data-flow.md) ⭐ **重點**
   - 完整的資料循環流程
   - 系統間的資料傳遞與介面
   - 實際案例:一個產品的完整旅程

3. **文檔撰寫規範** → [DOCUMENTATION_POLICY.md](DOCUMENTATION_POLICY.md)
   - 供各團隊撰寫文檔使用
   - 統一的格式與風格指南

---

## 📁 專案文檔結構

```
projects/
├── 00_architecture-overview.md    # 系統架構全景
├── 01_data-flow.md                # 資料流與串連 ⭐
├── DOCUMENTATION_POLICY.md        # 文檔撰寫規範
│
├── atlasvault/                    # Layer 1: 資料蒐集與 ETL
│   ├── 00_overview.md
│   ├── vault.md
│   ├── theforge.md
│   ├── dsld-crawler.md
│   ├── iherb-crawler.md
│   └── dsldxkeepa.md
│
├── alchemymind/                   # Layer 2: 資料處理與分析
│   ├── 00_overview.md
│   ├── theweaver.md
│   ├── therefinery.md
│   ├── theargus.md
│   └── shared.md
│
└── prismavision/                  # Layer 3: 使用者介面與引擎
    ├── 00_overview.md
    ├── smart-insight-engine/      # 查詢引擎 (完整學習路徑)
    │   ├── 00_overview.md
    │   ├── 01_mdof-fundamentals.md
    │   ├── 02_query-design.md
    │   └── 03_test-case-design.md
    ├── next.md
    └── mcp.md
```

---

## 🏗️ 三層架構速覽

### Layer 1: AtlasVault - 資料蒐集與 ETL
- **Vault**: 中央資料庫 (Single Source of Truth)
- **Crawlers**: DSLD, iHerb, Keepa 爬蟲
- **TheForge**: ETL 層 (Pure ETL + Unified Forge)

**詳細文檔**: [atlasvault/00_overview.md](atlasvault/00_overview.md)

### Layer 2: AlchemyMind - 資料處理與分析
- **TheRefinery**: 資料精煉、品質檢查
- **TheWeaver**: LLM 分析生成 (10 Knowledge Realms)
- **TheArgus**: 異常檢測與驗證

**詳細文檔**: [alchemymind/00_overview.md](alchemymind/00_overview.md)

### Layer 3: PrismaVision - 使用者介面與引擎
- **SmartInsightEngine**: MDOF 查詢引擎
- **PrismaVision-Next**: 前端介面
- **MCP**: 協議介面

**詳細文檔**: [prismavision/00_overview.md](prismavision/00_overview.md)

---

## 🔄 資料流簡圖

```
External Sources
    ↓
AtlasVault (Crawlers → Vault → TheForge)
    ↓
AlchemyMind (TheRefinery → TheWeaver → TheArgus)
    ↓ (Analysis results sync back to Vault)
    ↓
PrismaVision (SmartInsightEngine → Next/MCP → End Users)
```

**完整說明**: [01_data-flow.md](01_data-flow.md)

---

## 🎓 角色導向學習路徑

### 新進工程師 (所有角色)
1. [00_architecture-overview.md](00_architecture-overview.md) - 理解三層架構
2. [01_data-flow.md](01_data-flow.md) - 理解資料流
3. 你的 Layer 對應的 `00_overview.md`

### 測試工程師
1. 理解整體架構
2. 深入學習 [prismavision/smart-insight-engine/](prismavision/smart-insight-engine/) (3-5天)
3. 學習測試案例設計

### 資料工程師
1. 理解整體架構
2. 深入學習 [atlasvault/theforge.md](atlasvault/theforge.md)
3. 理解 ETL 流程與資料格式

### 資料科學家 / AI 工程師
1. 理解整體架構
2. 深入學習 [alchemymind/theweaver.md](alchemymind/theweaver.md)
3. 理解 LLM 分析與 Knowledge Realms

### 前端工程師
1. 理解整體架構
2. 深入學習 [prismavision/smart-insight-engine/](prismavision/smart-insight-engine/) (理解 API)
3. 學習 [prismavision/next.md](prismavision/next.md)

### 架構師 / PM
1. [00_architecture-overview.md](00_architecture-overview.md)
2. [01_data-flow.md](01_data-flow.md)
3. 所有 Layer 的 `00_overview.md`

---

## 📊 文檔狀態

### ✅ 已完成
- [x] 00_architecture-overview.md - 系統架構全景
- [x] 01_data-flow.md - 資料流與串連
- [x] DOCUMENTATION_POLICY.md - 文檔撰寫規範
- [x] prismavision/smart-insight-engine/ - 完整學習路徑 (4個文檔)

### 🚧 待各團隊補充 (Skeleton 已建立)
- [ ] atlasvault/vault.md
- [ ] atlasvault/theforge.md
- [ ] atlasvault/dsld-crawler.md
- [ ] atlasvault/iherb-crawler.md
- [ ] atlasvault/dsldxkeepa.md
- [ ] alchemymind/theweaver.md
- [ ] alchemymind/therefinery.md
- [ ] alchemymind/theargus.md
- [ ] alchemymind/shared.md
- [ ] prismavision/next.md
- [ ] prismavision/mcp.md

---

## 🤝 各團隊職責

### AtlasVault Team
- 維護 `atlasvault/` 目錄下的所有文檔
- 補充 TheForge, Crawlers, Vault 的詳細說明
- 參考現有專案的 README 與 CLAUDE.md

### AlchemyMind Team
- 維護 `alchemymind/` 目錄下的所有文檔
- 補充 TheWeaver, TheRefinery, TheArgus 的詳細說明
- 特別說明 10 個 Knowledge Realms

### PrismaVision Team
- 維護 `prismavision/` 目錄下的所有文檔
- SmartInsightEngine 已有完整文檔,需整合
- 補充 Next 與 MCP 的詳細說明

### Architecture Team
- 維護核心文檔 (00_, 01_, DOCUMENTATION_POLICY)
- 審核各團隊提交的文檔
- 整合與發布

---

## 📝 文檔撰寫流程

### 1. 撰寫階段 (各 Team)
1. 閱讀 [DOCUMENTATION_POLICY.md](DOCUMENTATION_POLICY.md)
2. 找到你負責的 skeleton 文檔
3. 依照規範補充詳細內容
4. 團隊內部 review

### 2. 提交階段
1. 將文檔放置到指定位置
2. 更新對應的 `00_overview.md`
3. 通知 Architecture Team

### 3. 審核與整合 (Architecture Team)
1. 檢查格式與內容
2. 提出修改建議
3. 整合並更新跨文檔連結
4. 發布通知

---

## 🔗 相關資源

### Learning Map 其他文檔
- [../general/](../general/) - 通用技能學習路徑
- [../roles/](../roles/) - 角色特定學習路徑
- [../tools/](../tools/) - 工具文檔 (如 Speckit)

### 外部專案連結
- `LuminNexus-AtlasVault-TheForge/`
- `LuminNexus-AlchemyMind-TheWeaver/`
- `LuminNexus-PrismaVision-SmartInsightEngine/`
- (其他專案...)

---

## ❓ 常見問題

### Q1: 我是新人,應該從哪裡開始?
**A**: 按順序閱讀:
1. [00_architecture-overview.md](00_architecture-overview.md)
2. [01_data-flow.md](01_data-flow.md)
3. 你的角色對應的 Layer 文檔

### Q2: 我要撰寫文檔,有範本嗎?
**A**: 有! 參考 [DOCUMENTATION_POLICY.md](DOCUMENTATION_POLICY.md) 的範本章節,或直接參考現有的 skeleton 文檔。

### Q3: 如何知道哪些文檔已完成?
**A**: 參考本文檔的「文檔狀態」章節。

### Q4: 文檔應該多詳細?
**A**:
- **Overview**: 1-2 頁,高層級
- **詳細文檔**: 5-15 頁,完整說明
- 原則:讀者應能從文檔中獨立完成任務

---

## 📞 聯絡方式

- **Slack Channel**: #learning-map-docs
- **負責人**: Architecture Team Lead
- **問題回報**: 直接在 Slack 提問

---

## 📝 維護資訊

### 版本歷史

| 版本 | 日期 | 作者 | 變更說明 |
|------|------|------|----------|
| 1.0 | 2025-12-09 | Architecture Team | 初版建立,專案文檔架構完成 |

### 下一步
- [ ] 各團隊補充 skeleton 文檔
- [ ] 整合現有專案的 README
- [ ] 新增 API 文檔連結
- [ ] 新增效能基準測試結果

---

**文檔結束**

歡迎貢獻! 讓我們一起完善 LuminNexus 的文檔體系。
