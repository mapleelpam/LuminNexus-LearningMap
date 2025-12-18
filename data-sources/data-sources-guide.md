---
title: "資料來源與關聯欄位指南"
type: guide
status: active
created: 2025-12-16
project: LearningMap
author: yijou14
tags:
  - data-sources
  - upc
  - asin
  - dsld
  - keepa
audience:
  - all
summary: |
  專案資料來源總覽與關鍵欄位說明，涵蓋 DSLD、iHerb、Keepa、品牌官網等，
  以及 UPC、ASIN、brandCode 等識別碼的使用方式。
---

# 資料來源與關聯欄位指南

本文件整理專案中可能用到的資料說明與注意事項，供日後使用參考。

---

## 一、資料來源總覽

| 來源               | 說明                                   |
| ------------------ | -------------------------------------- |
| **DSLD**     | 美國 NIH 營養補充品標籤資料庫          |
| **iHerb**    | 電商平台產品資訊                       |
| **Keepa**    | Amazon 產品資訊（價格、評分、描述）    |
| **品牌官網** | 分成 shopify 或 non-shopify 的網頁架構 |

### 查詢方式

| 來源                    | 查詢方式                                                        |
| ----------------------- | --------------------------------------------------------------- |
| **Amazon**        | `https://www.amazon.com/dp/{ASIN}`                            |
| **Keepa**         | 可輸入 UPC 或 ASIN 查詢                                         |
| **DSLD 產品標籤** | `https://api.ods.od.nih.gov/dsld/s3/pdf/{dsld_id}.pdf`        |
| **iHerb**         | `https://www.iherb.com/pr/{product_id}` 或 `/c/{brandCode}` |

---

## 二、關鍵欄位說明

### UPC（Universal Product Code）

- **意義**：通用商品條碼，12-13 位數字
- **用途**：跨平台產品比對的主要依據
- **格式差異**：使用須先標準化格式

  - DSLD：含空格（如 `0 74312 709074`）
  - iHerb：無空格（如 `074312709074`）
- **覆蓋狀況**：DSLD 大部分有、iHerb 幾乎都有
- **UPC 2-6 碼（Manufacturer Code）**：代表生產商/公司代碼，可用來判斷產品是否來自同一廠商

### ASIN（Amazon Standard Identification Number）

- **意義**：Amazon 產品唯一識別碼，10 位英數字
- **用途**：定位 Amazon 上的特定產品
- **取得方式**：透過 Keepa API 用 UPC 查詢

### brandCode（iHerb 專屬）

- **意義**：iHerb 平台的品牌代碼，3 個字母
- **用途**：品牌分類最可靠的依據
- **範例**：`NOW`、`GNC`、`SOL`
- **partNumber**：產品料號，格式 `XXX-NNNNN`（前綴即 brandCode），如 `NOW-01234`

### GTIN / EAN / SKU

- **GTIN**：全球貿易識別碼（Global Trade Item Number）
- **EAN**：歐洲商品碼（European Article Number）
- **SKU**：庫存單位（Stock Keeping Unit），各平台自訂
- **用途**：跨平台產品比對的輔助依據

### dsld_id（DSLD 專屬）

- **意義**：DSLD 資料庫的產品唯一識別碼
- **用途**：查詢產品標籤 PDF、關聯 DSLD 資料
- **每個產品必有**

---

## 三、資料關聯方式

```
              ┌─────────────────────────────────────┐
              │              UPC                    │
              │    （跨平台產品比對主要依據）        │
              └───────────┬─────────────────────────┘
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
   DSLD                iHerb              Keepa/Amazon
   產品                 產品                 產品
      │                   │                   │
      │                   │                   │
      ▼                   ▼                   ▼
  brandName           brandCode             ASIN
  UPC 2-6碼           brandName          價格/評分
```

### 跨平台資料串接

```
DSLD 產品 ──UPC──▶ iHerb 產品 ──brandCode──▶ 品牌
                        │
                       UPC
                        │
                        ▼
                Keepa ──▶ ASIN ──▶ Amazon 產品
```

### 判斷是否同一產品

- 優先用 UPC，但要注意 UPC 格式標準化
- 同 UPC 在 Amazon 可能有多個 ASIN

### 判斷是否同一品牌

- 優先用 iHerb 的 brandCode
- 其次用 UPC 2-6 碼 + 品牌名稱雙重驗證
- 不要只看 UPC 2-6 碼（同廠代工問題）

---

## 四、重要注意事項

### 1. 一個 UPC 可能對應多個 ASIN

- **原因**：

  - 不同口味/規格的變體
  - 不同包裝大小
  - 不同賣家的同產品
  - 新舊版本
- **處理方式**：根據銷售排名、評價數、Amazon Choice 等選擇最佳 ASIN

### 2. UPC 2-6 碼相同 ≠ 同品牌

- **原因**：同一廠商可能代工多個不同品牌
- **正確做法**：UPC 2-6 碼 + {品牌名稱 / domain / contact / image} 雙重驗證

### 3. DSLD 的 labelRelationships 有誤標

- **背景**：DSLD 標註「同產品不同包裝」的關聯
- **問題**：部分標註可疑，少數完全錯誤（不同品牌被標為同產品）
- **處理方式**：需額外驗證品牌名稱與成分相似度

### 4. 品牌官網常缺少 UPC/GTIN

- **現況**：許多中小品牌官網不提供標準化識別碼
- **影響**：難以自動與 Amazon/iHerb 產品比對

### 5. 品牌名稱不一致

- **常見情況**：

  - `Nature's Plus` vs `Natures Plus`（標點差異）
  - DSLD 有時把產品名填在品牌欄
  - 母子品牌關係模糊
- **處理方式**：標準化後比對（移除標點、轉小寫、等價詞替換）
- **等價詞替換**：

  - lab ↔ laboratory ↔ labs
  - corp ↔ corporation ↔ inc
  - nutra ↔ nutrition ↔ nutritional
  - company ↔ co

### 6. 產品資訊經常不完整

- **現況**：許多產品的資訊缺失或打錯字，比如產品描述、聯絡方式、商品名稱等皆可能有誤，不可完全相信
- **影響**：難以進行相同產品比對

### 7. Shopify vs Non-Shopify 官網差異

| 面向     | Shopify      | Non-Shopify          |
| -------- | ------------ | -------------------- |
| 結構     | 統一標準     | 各站不同             |
| 數據來源 | JSON-LD 為主 | 混合（HTML/JS/表格） |
| UPC/GTIN | 偶爾有       | 基本沒有             |
| 抓取難度 | 較容易       | 需 Selenium          |

- **重點**：品牌官網通常沒有 UPC/GTIN，應找 SKU 或 product_id 作為內部識別碼

---

Author: Hu, Yu-Shin
