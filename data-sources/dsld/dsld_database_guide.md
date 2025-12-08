# DSLD 資料庫快速指南

## 文件資訊
- **建立日期**: 2025-12-08
- **版本**: 1.0
- **用途**: DSLD 資料庫概述、存取方式、基礎概念

---

## 目錄

1. [什麼是 DSLD](#1-什麼是-dsld)
2. [資料存取方式](#2-資料存取方式)
3. [資料庫規模與統計](#3-資料庫規模與統計)
4. [核心資料類型](#4-核心資料類型)
5. [標準化系統](#5-標準化系統)
6. [資料品質特徵](#6-資料品質特徵)
7. [常見使用場景](#7-常見使用場景)
8. [參考資源](#8-參考資源)

---

## 1. 什麼是 DSLD

### 基本資訊

**DSLD (Dietary Supplement Label Database)** 是由美國國家衛生研究院 (NIH) 轄下的膳食補充品辦公室 (Office of Dietary Supplements, ODS) 維護的公開資料庫。

**核心功能**：
- 收錄在美國市場銷售的膳食補充品標籤完整資訊
- 提供產品成分、劑量、法規聲明等詳細資料
- 支援消費者、研究人員、產業界查詢使用

**資料來源**：
- 全國人口調查（NHANES）報告的產品
- 廠商自願提交的產品標籤
- **注意**：參與為自願性質，非法規要求

### 重要里程碑

| 時間 | 事件 |
|------|------|
| 1970s | FDA 創建 LanguaL 食品描述標準 |
| 2012 | DSLD 資料庫正式上線 |
| 2014 | 第一次重大更新 |
| 2017 | 第二次重大更新 |
| 2021 | 第三次重大更新（轉換為 JavaScript 架構，新增 API） |
| 2025-02 | 資料庫暫時下線 |
| 2025-04 | 資料庫恢復上線 |

---

## 2. 資料存取方式

### 2.1 官方網站查詢

**主要入口**：
- **DSLD 首頁**: [https://dsld.od.nih.gov/](https://dsld.od.nih.gov/)
- **ODS 資料庫頁面**: [https://ods.od.nih.gov/Research/Dietary_Supplement_Label_Database.aspx](https://ods.od.nih.gov/Research/Dietary_Supplement_Label_Database.aspx)

**查詢功能**：
- 依產品名稱、品牌、成分搜尋
- 依劑型、目標族群篩選
- 依健康宣稱類型過濾

### 2.2 API 存取

#### API 端點
```
https://api.ods.od.nih.gov/dsld/v8/
https://dsldapi.od.nih.gov/
```

#### API 指南
- **官方文件**: [https://dsld.od.nih.gov/api-guide](https://dsld.od.nih.gov/api-guide)

#### 主要功能
- 透過 `dsldId` 取得特定產品
- 依名稱、品牌、劑型、宣稱類型搜尋
- 支援分頁查詢
- 可下載 JSON 格式資料

#### API 版本資訊
- 當前版本：v8（截至 2023-11）
- 版本號：9.2.0

### 2.3 資料下載

#### JSON 格式
- **完整資料庫**：可下載全部產品的 JSON 檔案
- **客製化搜尋**：可匯出特定搜尋結果為 JSON

#### 檔案格式選項
使用者可選擇以下格式下載：
- JSON
- CSV
- Excel

### 2.4 URL 格式規範

#### 產品頁面 URL
```
https://dsld.od.nih.gov/dsld/labelDetails.jsp?id={dsldId}
```

**範例**：
```
https://dsld.od.nih.gov/dsld/labelDetails.jsp?id=10098
```

#### PDF 標籤 URL
```
https://api.ods.od.nih.gov/dsld/s3/pdf/{id}.pdf
```

**範例**：
```
https://api.ods.od.nih.gov/dsld/s3/pdf/10098.pdf
```

**注意**：
- 並非所有產品都有 PDF 檔案
- JSON 中 `pdf` 欄位可能為空字串 `""`

#### 產品圖片 URL
```
# Thumbnail 欄位格式（具體 URL 格式需視實際資料）
```

**注意**：
- 部分產品的 `thumbnail` 欄位為空字串
- 圖片可能儲存在 Amazon S3 或 CDN

---

## 3. 資料庫規模與統計

### 整體規模（截至 2025-07-24）

| 項目 | 數量 |
|------|------|
| **產品總數** | 211,782 |
| **成分記錄** | 2,782,855 |
| **獨特成分名稱** | 85,798 |
| **法規聲明** | 3,179,552 |
| **品牌數量** | 6,002 |
| **UNII 覆蓋** | 1,127,363 (40.5%) |

### 產品類型分布（Top 5）

| LanguaL 代碼 | 類型 | 產品數 | 百分比 |
|-------------|------|--------|--------|
| A1325 | 其他組合配方 | 75,559 | 35.7% |
| A1306 | 植物性補充品 | 54,710 | 25.8% |
| A1309 | 非營養/非植物 | 24,960 | 11.8% |
| A1302 | 維生素類 | 12,196 | 5.8% |
| A1317 | 植物性含營養素 | 11,553 | 5.5% |

### 劑型分布（Top 5）

| LanguaL 代碼 | 劑型 | 產品數 | 百分比 |
|-------------|------|--------|--------|
| E0159 | 膠囊 | 78,500 | 37.1% |
| E0162 | 粉末 | 36,075 | 17.0% |
| E0155 | 片劑 | 33,401 | 15.8% |
| E0165 | 液體 | 31,963 | 15.1% |
| E0161 | 軟膠囊 | 19,723 | 9.3% |

---

## 4. 核心資料類型

### 4.1 產品基本資訊

每個產品包含：
- **識別資訊**：DSLD ID、UPC 條碼、產品名稱、品牌
- **包裝資訊**：容器規格、淨含量、建議用量
- **分類資訊**：產品類型、物理形態、目標族群
- **時間資訊**：錄入日期、最後修改日期、上市狀態

### 4.2 成分資訊（最重要）

每個成分包含：
- **基本資料**：成分名稱、分類（維生素/礦物質/植物性/其他）
- **標準化代碼**：UNII 代碼（FDA 唯一成分識別碼）
- **含量資訊**：數量、單位、每日建議攝取量百分比
- **化學形式**：成分的具體化學型態或來源
- **巢狀結構**：支援複合成分的層級關係

### 4.3 法規與聲明

包含超過 20 種聲明類型：
- **FDA 法規聲明**：產品識別、免責聲明
- **配方聲明**：含有/不含特定成分、認證標章
- **使用說明**：建議用法、劑量
- **警告資訊**：兒童警告、過敏原、特殊病況注意
- **儲存條件**：溫度、濕度要求

### 4.4 製造商資訊

- 公司名稱、地址、聯絡方式
- 製造商、經銷商、品牌所有者等角色標記

### 4.5 產品關係

識別相同產品的不同版本：
- 同產品不同包裝尺寸
- 同產品不同標籤圖片
- 配方版本差異

---

## 5. 標準化系統

### 5.1 UNII (Unique Ingredient Identifier)

**維護單位**：FDA
**格式**：10 位字母數字（9 位隨機 + 1 位檢查碼）

**範例**：
- Vitamin C = `PQ6CK8PD0R`
- Magnesium = `I38ZP9992A`
- Iron = `E1UOL152H7`

**DSLD 覆蓋率**：
- 40.5% 成分記錄有 UNII 代碼
- 1,791 個獨特 UNII 代碼

**用途**：
- 避免同一成分的不同名稱造成混淆
- 便於跨資料庫整合
- 支援成分標準化與正規化

### 5.2 LanguaL™ (Lingua Alimentaria)

**性質**：國際多語言食品描述標準
**維護單位**：歐洲 LanguaL 技術委員會
**起源**：1970年代末由美國 FDA 創建

#### 在 DSLD 的應用

| Facet | 名稱 | DSLD 欄位 | 覆蓋率 | 代碼數 |
|-------|------|----------|--------|--------|
| **A-series** | Product Type | productType | 100% | 11 |
| **E-series** | Physical State | physicalState | 100% | 10 |
| **P-series** | Health Claims | claims | 部分 | 5+ |
| **P-series** | User Groups | userGroups | 100% | 4+ |

**優勢**：
- 提供國際標準化的產品描述
- 支援多語言查詢
- 便於跨資料庫比較

---

## 6. 資料品質特徵

### 6.1 優勢

✅ **高覆蓋率**：211,782 個產品標籤
✅ **標準化分類**：使用 LanguaL 國際標準
✅ **完整性**：包含標籤所有可見資訊
✅ **可追溯性**：每個產品有錄入與更新記錄
✅ **API 支援**：提供程式化存取介面

### 6.2 限制

❌ **自願參與**：非所有市售產品都在資料庫中
❌ **時效性**：產品資訊可能與市場現況有差異
❌ **UNII 不完整**：僅 40.5% 成分有 UNII 代碼
❌ **地理資訊**：67% 產品的 country 欄位為空白

### 6.3 特殊注意事項

#### UPC 相關問題

**UPC 前綴的正確理解**（2025-09-14 修正）：
- ❌ **錯誤認知**：前綴 7,8 代表中國/印度製造
- ✅ **正確理解**：前綴 0-9 代表產品類型（標準UPC、藥品、優惠券等）
- **結論**：DSLD 是北美市場導向資料庫，所有 UPC 來自美國/加拿大 GS1 系統

**通用 UPC 問題**（2025-10-20 發現）：
- 部分廠商對不同產品使用相同 UPC
- 進行去重分析時需注意識別
- 主要案例：Hawaii Pharm、Herbadiet、Banyan Botanicals

#### 成分變體問題

**案例**：單一成分名 "Magnesium" 對應 4,078 個不同 ingredientId

**原因**：
- 不同化學形式（氧化鎂、檸檬酸鎂等）
- 不同劑量與濃度
- 不同來源與製造商
- 資料輸入差異

**解決方式**：建議使用 UNII 代碼進行成分標準化

---

## 7. 常見使用場景

### 7.1 消費者用途

- 查詢特定產品的完整成分資訊
- 比較不同品牌同類產品的配方差異
- 確認產品是否含有特定過敏原
- 檢視產品的法規聲明與警告事項

### 7.2 研究與分析

- **成分趨勢分析**：分析市場上流行的成分組合
- **品牌市場分析**：研究主要品牌的產品組合策略
- **法規合規性研究**：分析產品標籤的法規遵循情況
- **營養素標準化**：基於 UNII 進行成分標準化與正規化
- **劑型研發**：分析不同劑型的市場分布與趨勢

### 7.3 產業應用

- **產品開發參考**：了解市場上現有產品的配方設計
- **競品分析**：比較競爭對手的產品特性
- **法規合規**：參考標準化的法規聲明格式
- **市場定位**：分析目標族群與產品定位

---

## 8. 參考資源

### 官方資源

- [DSLD 首頁](https://dsld.od.nih.gov/)
- [Office of Dietary Supplements - DSLD](https://ods.od.nih.gov/Research/Dietary_Supplement_Label_Database.aspx)
- [DSLD API 指南](https://dsld.od.nih.gov/api-guide)
- [DSLD API 端點](https://api.ods.od.nih.gov/dsld/v8/)
- [ODS 資料庫總覽](https://ods.od.nih.gov/Research/databases.aspx)

### 標準與規範

- [LanguaL International Framework](https://www.langual.org/)
- [FoodOn and LanguaL](https://foodon.org/design/foodon-and-langual/)
- [FDA UNII Search](https://precision.fda.gov/uniisearch)

### 相關資源

- [Modernizing DSLD](https://www.abtglobal.com/projects/modernizing-nihs-dietary-supplement-label-database-dsld)
- [CHPA DSLD 資訊](https://www.chpa.org/public-policy-regulatory/voluntary-codes-guidelines/dietary-supplement-label-database-dsld)

### 學術文獻

- [The Dietary Supplement Label Database: Recent Developments and Applications](https://pmc.ncbi.nlm.nih.gov/articles/PMC6597011/)
- [Modernization of the NIH DSLD](https://www.sciencedirect.com/science/article/abs/pii/S0889157521002581)
- [STRIPED Dietary Supplement Label Explorer](https://www.sciencedirect.com/science/article/abs/pii/S0022316625000884)

---

**文件版本**: 1.0
**最後更新**: 2025-12-08
**適用資料**: DSLD 2025-07-24 版本
