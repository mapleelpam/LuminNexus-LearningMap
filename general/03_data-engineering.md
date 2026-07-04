---
title: "資料工程基礎 (Data Engineering Fundamentals)"
type: topic
status: active
created: 2025-11-11
project: LearningMap
author: maple
tags:
  - data-engineering
  - json
  - etl
  - database
audience:
  - all
summary: |
  資料格式（JSON/CSV）、資料庫基礎、ETL 流程與資料充實技術。
---

# 資料工程基礎 (Data Engineering Fundamentals)

---

## 概述

本文涵蓋資料格式、資料庫基礎，以及資料處理的核心流程（ETL 與資料充實）。

**學習目標**:
- 理解常見資料格式及其使用場景
- 掌握 JSON Schema 的資料驗證概念
- 理解 ETL 流程與資料充實（Enrich）技術

---

## 目錄

- [1. 資料結構與格式](#1-資料結構與格式)
  - [1.1 JSON](#11-json)
  - [1.2 JSON Schema](#12-json-schema)
  - [1.3 CSV](#13-csv)
  - [1.4 XML/YAML 簡介](#14-xmlyaml-簡介)
- [2. 資料庫基礎](#2-資料庫基礎)
  - [2.1 關聯式資料庫核心概念](#21-關聯式資料庫核心概念)
  - [2.2 正規化 vs 非正規化](#22-正規化-vs-非正規化)
  - [2.3 NoSQL 簡介](#23-nosql-簡介)
- [3. 資料處理流程](#3-資料處理流程)
  - [3.1 ETL (Extract, Transform, Load)](#31-etl-extract-transform-load)
  - [3.2 Enrich (資料充實)](#32-enrich-資料充實)
  - [3.3 在 LuminNexus 的應用](#33-在-luminnexus-的應用)
- [4. 常見問題](#4-常見問題)

---

## 1. 資料結構與格式

### 1.1 JSON

**基本語法**
```json
{
  "name": "Vitamin C",
  "dosage": 1000,
  "unit": "mg",
  "vegan": true
}
```

**何時使用？**
- API 請求與回應
- 配置檔案
- 結構化資料儲存

**最佳實踐**
- 使用一致的命名規範
- 避免過度巢狀（不超過 3-4 層）
- 使用 JSON Schema 驗證

---

### 1.2 JSON Schema

**什麼是 JSON Schema？**
- 描述 JSON 資料結構的規範
- 用於資料驗證、文檔生成、測試案例設計

**Schema 範例**
```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string", "minLength": 1},
    "dosage": {"type": "number", "minimum": 0},
    "unit": {"type": "string", "enum": ["mg", "g", "mcg"]}
  },
  "required": ["name", "dosage", "unit"]
}
```

**使用場景**
- API 規格定義
- 輸入資料驗證
- 自動生成測試案例

**在 LuminNexus 的應用**
- MDFO Query 的結構驗證
- API 請求/回應的格式檢查
- 參考文件：`spec/Canonical_Query_Schema.md`

---

### 1.3 CSV

**優點與缺點**
- ✅ 簡單易懂、Excel 支援
- ❌ 不支援複雜結構、編碼問題

**使用時機**
- ✅ 簡單表格資料
- ✅ 與非技術人員協作
- ❌ 複雜資料結構（用 JSON）

**常見問題處理**
```python
# 問題：欄位中包含逗號
"Product Name","Price"
"Vitamin C, 1000mg","25.99"  # 需要用引號包住

# 問題：編碼錯誤
import pandas as pd
df = pd.read_csv('data.csv', encoding='utf-8')
```

---

### 1.4 XML/YAML 簡介

**XML (Extensible Markup Language)**
- 標記式語言，適合文件型資料
- 用於：設定檔、Web Services (SOAP)

**YAML (YAML Ain't Markup Language)**
- 人類友善的資料序列化格式
- 用於：配置檔 (Docker Compose, Kubernetes, CI/CD)

**選擇建議**
- 🏆 API 資料交換：JSON
- 📊 表格資料：CSV
- ⚙️ 配置檔：YAML
- 📄 文件型資料：XML

---

## 2. 資料庫基礎

> 📚 此章節作為補充資料，不深入實作細節

### 2.1 關聯式資料庫核心概念

**核心元素**
- **表格 (Table)**: 資料的容器
- **主鍵 (Primary Key)**: 唯一識別每一筆資料
- **外鍵 (Foreign Key)**: 連結不同表格的關聯
- **索引 (Index)**: 加速查詢的資料結構

**基本 SQL 操作**
```sql
-- SELECT: 查詢資料
SELECT name, dosage FROM products WHERE category = 'Vitamin';

-- WHERE: 篩選條件
SELECT * FROM products WHERE price > 20;

-- JOIN: 連結多個表格
SELECT p.name, c.category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- GROUP BY: 分組統計
SELECT category, COUNT(*) as product_count
FROM products
GROUP BY category;
```

**JOIN 類型**
```
INNER JOIN: 只返回兩邊都有的資料
LEFT JOIN:  返回左表全部 + 右表匹配的
RIGHT JOIN: 返回右表全部 + 左表匹配的
FULL JOIN:  返回兩邊全部資料
```

---

### 2.2 正規化 vs 非正規化

**正規化 (Normalization)**
- 目的：消除資料冗餘、避免更新異常
- 方法：將資料拆分成多個表格，用外鍵關聯
- 優點：節省空間、維護一致性
- 缺點：查詢需要多次 JOIN，效能較慢

**非正規化 (Denormalization)**
- 目的：提升查詢效能
- 方法：保留部分冗餘資料，減少 JOIN
- 優點：查詢快速
- 缺點：更新複雜、資料可能不一致

**權衡考量**

| 情境 | 建議 |
|------|------|
| 寫入頻繁、查詢簡單 | 正規化 |
| 讀取頻繁、查詢複雜 | 適度非正規化 |
| 資料一致性要求高 | 正規化 |
| 效能要求高 | 非正規化 + 快取 |

---

### 2.3 NoSQL 簡介

**什麼是 NoSQL？**
- Not Only SQL
- 非關聯式資料庫
- 適合大規模、高併發、彈性結構的資料

**常見類型**

1. **Document Database** (文件型)
   - 例：MongoDB, CouchDB
   - 儲存 JSON-like 文件
   - 適合：CMS, 產品目錄

2. **Key-Value Store** (鍵值對)
   - 例：Redis, DynamoDB
   - 超快速讀寫
   - 適合：快取、Session 儲存

3. **Graph Database** (圖形資料庫)
   - 例：Neo4j, ArangoDB
   - 儲存節點與關係
   - 適合：社交網路、知識圖譜

**何時使用 NoSQL？**
- ✅ 資料結構彈性（Schema-less）
- ✅ 需要水平擴展（Horizontal Scaling）
- ✅ 高併發讀寫
- ✅ 非結構化/半結構化資料
- ❌ 需要複雜的關聯查詢（用 SQL）
- ❌ 強 ACID 交易需求（用 SQL）

---

## 3. 資料處理流程

### 3.1 ETL (Extract, Transform, Load)

**什麼是 ETL？**

ETL 是資料工程的核心流程，將資料從來源系統搬移到目標系統的過程。

**流程圖**
```mermaid
graph LR
    A[來源系統] -->|Extract<br/>提取| B[資料管道]
    B -->|Transform<br/>轉換| C[資料管道]
    C -->|Load<br/>載入| D[目標系統]

    style A fill:#e1f5ff
    style D fill:#e7f7e7
    style B fill:#fff4e1
    style C fill:#fff4e1
```

#### **E - Extract (提取)**

從來源系統讀取資料

**常見來源**：
- 🌐 Web API
- 🗄️ 資料庫
- 📄 檔案 (CSV, JSON, XML)
- 🕷️ 網頁爬蟲

**範例**：
```python
# 從 API 提取資料
import requests
response = requests.get('https://api.example.com/products')
raw_data = response.json()

# 從 CSV 提取資料
import pandas as pd
df = pd.read_csv('products.csv')
```

---

#### **T - Transform (轉換)**

資料清洗、格式轉換、業務邏輯處理

**常見轉換操作**：
- 🧹 **資料清洗**: 移除重複、處理缺失值
- 🔄 **格式轉換**: 日期格式、單位轉換
- 🏷️ **資料標註**: 分類、標籤化
- 🧮 **計算欄位**: 衍生新欄位
- 🔗 **資料整合**: 合併多個來源

**範例**：
```python
# 清洗資料
df = df.drop_duplicates()  # 移除重複
df['price'] = df['price'].fillna(0)  # 填補缺失值

# 格式轉換
df['date'] = pd.to_datetime(df['date'])  # 轉換日期
df['dosage_mg'] = df['dosage_g'] * 1000  # 單位轉換

# 資料標註
df['price_level'] = df['price'].apply(
    lambda x: 'high' if x > 50 else 'low'
)
```

---

#### **L - Load (載入)**

將處理後的資料寫入目標系統

**常見目標**：
- 🗄️ 資料倉儲 (Data Warehouse)
- 🗃️ 資料庫 (MySQL, PostgreSQL)
- 📊 分析平台 (BigQuery, Redshift)
- 📁 檔案系統

**範例**：
```python
# 載入到資料庫
from sqlalchemy import create_engine
engine = create_engine('postgresql://user:pass@localhost/db')
df.to_sql('products', engine, if_exists='append')

# 載入到 CSV
df.to_csv('cleaned_products.csv', index=False)
```

---

#### **ETL vs ELT 的差異**

**ETL**: Extract → Transform → Load
- 先轉換，再載入
- 適合：資料量小、目標系統效能有限
- 工具：Talend, Informatica, Apache Airflow

**ELT**: Extract → Load → Transform
- 先載入，在目標系統內轉換
- 適合：雲端資料倉儲（運算能力強）
- 工具：dbt, BigQuery, Snowflake

---

### 3.2 Enrich (資料充實)

**什麼是資料充實？**

為現有資料補充額外資訊，提升資料的完整性與價值。

**流程圖**
```mermaid
graph LR
    A[原始資料] --> B[充實處理]
    C[外部資料源] --> B
    D[規則引擎] --> B
    B --> E[增強資料]

    style A fill:#e1f5ff
    style E fill:#e7f7e7
    style B fill:#fff4e1
```

---

#### **充實來源**

1. **外部 API**
   - 地理編碼服務（地址 → 經緯度）
   - 產品資訊 API（條碼 → 產品詳情）
   - 分類服務（文字 → 類別標籤）

2. **參考資料表 (Reference Tables)**
   - 產品分類對照表
   - 成分資料庫
   - 品牌資訊表

3. **計算欄位**
   - 衍生指標（例：BMI = 體重 / 身高²）
   - 統計值（平均、總和、排名）

4. **規則引擎 (Business Rules)**
   - 自動分類邏輯
   - 資料驗證規則
   - 標籤生成規則

---

#### **使用場景**

**場景 1: 產品分類自動標註**
```python
# 原始資料
product = {
    "name": "Nature Made Vitamin D3 2000 IU",
    "category": None  # 缺失
}

# 充實：根據產品名稱自動分類
def enrich_category(product_name):
    if 'Vitamin D' in product_name:
        return 'Vitamins'
    elif 'Protein' in product_name:
        return 'Sports Nutrition'
    # ...

product['category'] = enrich_category(product['name'])
# 結果: {"name": "...", "category": "Vitamins"}
```

**場景 2: 補充缺失的屬性資訊**
```python
# 原始資料（只有品牌 ID）
product = {
    "name": "Vitamin C",
    "brand_id": 123,
    "brand_name": None  # 缺失
}

# 充實：從品牌資料表查詢
brands = {123: "Nature Made", 456: "NOW Foods"}
product['brand_name'] = brands.get(product['brand_id'])
# 結果: {"...", "brand_name": "Nature Made"}
```

**場景 3: 關聯多個資料源**
```python
# 來源 A：產品基本資料
product_data = {"id": 1, "name": "Vitamin C"}

# 來源 B：價格資訊
price_data = {"product_id": 1, "price": 19.99}

# 來源 C：庫存資訊
stock_data = {"product_id": 1, "stock": 50}

# 充實：合併多個來源
enriched = {
    **product_data,
    "price": price_data["price"],
    "stock": stock_data["stock"]
}
```

---

#### **資料充實 vs 資料清洗**

| 特性 | 資料清洗 (Cleaning) | 資料充實 (Enriching) |
|------|---------------------|----------------------|
| **目的** | 修正錯誤、標準化 | 增加新資訊 |
| **操作** | 移除、替換、格式化 | 補充、關聯、計算 |
| **範例** | 移除重複、修正拼寫 | 新增分類、補充屬性 |
| **資料量** | 維持或減少 | 增加 |

---

### 3.3 在 LuminNexus 的應用

**LuminNexus 資料流程圖**

```mermaid
graph TD
    A[Shopify 商品頁面] -->|Extract| B[Crawler 爬蟲]
    B -->|Raw HTML/JSON| C[資料提取]
    C -->|Transform| D[資料清洗]
    D -->|Enrich| E[分類標註]
    E -->|Load| F[PostgreSQL]
    F --> G[Smart Insight Engine]
    G --> H[API 查詢介面]

    I[成分資料庫] -.->|Enrich| E
    J[分類規則] -.->|Enrich| E

    style A fill:#e1f5ff
    style F fill:#e7f7e7
    style G fill:#ffe7e7
```

---

**實際範例：營養補充品資料處理**

1. **Extract (提取)**
   - Crawler 從 Shopify 抓取產品 HTML
   - 提取：產品名稱、價格、描述、圖片

2. **Transform (轉換)**
   - 清洗 HTML 標籤
   - 單位標準化（1000mg → 1g）
   - 移除重複產品
   - 格式化日期

3. **Enrich (充實)**
   - 根據產品名稱自動分類（Vitamin, Mineral, Protein...）
   - 從成分資料庫補充功效資訊
   - 計算性價比 (price per serving)
   - 標註劑型 (capsule, tablet, powder)

4. **Load (載入)**
   - 存入 PostgreSQL
   - 建立索引（加速查詢）
   - 更新 Smart Insight Engine 的快取

---

**資料充實範例**
```python
# 原始爬蟲資料
raw_product = {
    "title": "Nature Made Vitamin D3 2000 IU Softgels",
    "price": "$12.99",
    "serving_size": "100 count"
}

# 經過 ETL + Enrich
enriched_product = {
    "title": "Nature Made Vitamin D3 2000 IU Softgels",
    "price": 12.99,              # 轉換為數字
    "currency": "USD",            # 充實
    "serving_size": 100,          # 轉換為數字
    "dosage": 2000,               # 從標題提取
    "dosage_unit": "IU",          # 從標題提取
    "form": "Softgel",            # 從標題提取
    "category": "Vitamins",       # 充實（自動分類）
    "sub_category": "Vitamin D",  # 充實
    "brand": "Nature Made",       # 提取
    "price_per_serving": 0.1299,  # 計算欄位
    "created_at": "2025-11-11T00:00:00Z"  # 充實
}
```

---

## 4. 常見問題

**Q1: JSON 和 CSV 該如何選擇？**

A:
- 資料有巢狀結構 → JSON
- 簡單的表格資料 → CSV
- 需要與非技術人員協作 → CSV
- API 資料交換 → JSON

---

**Q2: 什麼時候需要使用 JSON Schema？**

A:
- ✅ API 規格定義時
- ✅ 自動生成測試案例
- ✅ 資料驗證需求
- ✅ 多團隊協作，需要統一規範

---

**Q3: ETL 和 Enrich 有什麼差異？**

A:
- **ETL**: 資料搬移的**完整流程** (提取 → 轉換 → 載入)
- **Enrich**: **轉換階段內**的一種操作（補充額外資訊）
- Enrich 通常是 Transform 步驟的一部分

---

**Q4: 資料清洗和資料充實的順序？**

A:
```
1. 資料提取 (Extract)
2. 資料清洗 (Clean) - 先清洗！
3. 資料充實 (Enrich) - 在乾淨的資料上充實
4. 資料載入 (Load)
```
先清洗再充實，避免在髒資料上浪費計算資源。

---

## 延伸閱讀

### 內部資源
- [Crawler Engineer 學習路徑](../roles/crawler-engineer.md)
- [資料來源與關聯欄位指南](../data-sources/data-sources-guide.md)
- 軟體工程實踐、測試與品質保證（規劃中，尚未成文）

### 外部資源
- [JSON Schema 官方文檔](https://json-schema.org/)
- [SQL 教學 - W3Schools](https://www.w3schools.com/sql/)
- [Pandas 資料清洗指南](https://pandas.pydata.org/docs/user_guide/missing_data.html)

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-11-11 | 初始版本，包含資料格式、資料庫基礎、ETL 與 Enrich 流程 | Learning Team |

---

**本文檔版本**: 1.0
**最後更新**: 2025-11-11
**維護者**: LuminNexus Learning Team
