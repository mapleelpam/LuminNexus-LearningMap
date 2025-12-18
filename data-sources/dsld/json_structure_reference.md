---
title: "DSLD JSON Structure Reference"
type: reference
status: active
created: 2025-12-08
version: "1.0"
project: LearningMap
author: leana
tags:
  - dsld
  - json
  - schema
  - api
audience:
  - crawler-engineer
  - all
summary: |
  DSLD JSON 資料格式完整技術參考，涵蓋頂層欄位、嵌套物件、
  成分資料結構、LanguaL 標準欄位等。
---

# DSLD JSON Structure Reference
**完整 JSON 欄位結構說明**

---

## 目錄

1. [JSON 結構總覽](#1-json-結構總覽)
2. [頂層欄位](#2-頂層欄位)
3. [嵌套物件與陣列](#3-嵌套物件與陣列)
4. [成分資料結構](#4-成分資料結構)
5. [LanguaL 標準欄位](#5-langual-標準欄位)
6. [欄位值域說明](#6-欄位值域說明)

---

## 1. JSON 結構總覽

### 基本結構

每個 DSLD 產品以單一 JSON 檔案儲存，包含以下主要區塊：

```json
{
  "src": "String",
  "id": Integer,
  "nhanesId": "String",
  "bundleName": "String",
  "fullName": "String",
  "brandName": "String",
  "brandIpSymbol": "String",
  "upcSku": "String",
  "productVersionCode": "String",
  "pdf": "String",
  "thumbnail": "String",
  "servingsPerContainer": "String",
  "hasOuterCarton": Boolean,
  "percentDvFootnote": "String",
  "labelRelationships": Array,
  "contacts": Array,
  "netContents": Array,
  "physicalState": Object,
  "servingSizes": Array,
  "targetGroups": Array,
  "productType": Object,
  "statements": Array,
  "claims": Array,
  "events": Array,
  "userGroups": Array,
  "ingredientRows": Array
}
```

### 完整範例（簡化）

```json
{
  "src": "01-raw/2025-05-21/data/label_435.json",
  "id": 10098,
  "fullName": "Uni-Joint Formula",
  "brandName": "Douglas Laboratories",
  "brandIpSymbol": "®",
  "upcSku": "3 10539 01900 9",
  "servingsPerContainer": "30",
  "physicalState": {
    "langualCode": "E0159",
    "langualCodeDescription": "Capsule"
  },
  "productType": {
    "langualCode": "A1325",
    "langualCodeDescription": "Other Combinations"
  }
}
```

---

## 2. 頂層欄位

### 2.1 識別與來源欄位

#### `src` (String)
**說明**：JSON 檔案在 DSLD 系統中的來源路徑

**格式**：
```
"01-raw/YYYY-MM-DD/data/label_XXXXX.json"
```

**範例**：
```json
"src": "01-raw/2025-05-21/data/label_435.json"
```

---

#### `id` (Integer)
**說明**：DSLD 產品唯一識別碼

**特性**：
- 全域唯一
- 主鍵
- 不可變

**範例**：
```json
"id": 10098
```

**範圍**：1 ~ 400,000+

---

#### `nhanesId` (String)
**說明**：NHANES (National Health and Nutrition Examination Survey) 調查編號

**範例**：
```json
"nhanesId": ""
```

**注意**：大部分產品此欄位為空字串

---

#### `bundleName` (String)
**說明**：套裝產品的組合名稱

**範例**：
```json
"bundleName": "AM/PM Pack"
```

**使用情境**：用於多件組合販售的產品

---

### 2.2 產品基本資訊

#### `fullName` (String)
**說明**：產品完整名稱

**範例**：
```json
"fullName": "Uni-Joint Formula"
```

**特性**：
- 必填欄位
- 可能包含規格資訊（如劑量、數量）

---

#### `brandName` (String)
**說明**：品牌名稱

**範例**：
```json
"brandName": "Douglas Laboratories"
```

**注意**：可能為 `null`

---

#### `brandIpSymbol` (String)
**說明**：品牌智慧財產權符號

**可能值**：
- `"®"` - 註冊商標
- `"™"` - 商標
- `"©"` - 版權
- `""` - 無符號

**範例**：
```json
"brandIpSymbol": "®"
```

---

#### `upcSku` (String)
**說明**：UPC (Universal Product Code) 或 SKU 條碼

**格式**：空格分隔的數字群組

**範例**：
```json
"upcSku": "3 10539 01900 9"
```

**注意**：
- 82.1% 產品有 UPC
- 部分使用 Amazon ASIN（X 開頭）
- 前綴 0-9 代表產品類型，非產地

---

#### `productVersionCode` (String)
**說明**：產品版本或配方代碼

**範例**：
```json
"productVersionCode": "Formula #82891"
```

**用途**：追蹤同一產品的不同配方版本

---

#### `pdf` (String)
**說明**：產品標籤 PDF 檔案的 URL

**格式**：
```
https://api.ods.od.nih.gov/dsld/s3/pdf/{id}.pdf
```

**範例**：
```json
"pdf": "https://api.ods.od.nih.gov/dsld/s3/pdf/10098.pdf"
```

**注意**：可能為空字串 `""`

---

#### `thumbnail` (String)
**說明**：產品縮圖 URL

**範例**：
```json
"thumbnail": ""
```

**注意**：可能為空字串

---

### 2.3 容器與包裝

#### `servingsPerContainer` (String)
**說明**：每容器的服用次數

**範例**：
```json
"servingsPerContainer": "30"
```

**注意**：
- 儲存為字串
- 可能為 `null` 或 `"Not Reported"`

---

#### `hasOuterCarton` (Boolean)
**說明**：是否有外包裝紙盒

**範例**：
```json
"hasOuterCarton": false
```

---

#### `percentDvFootnote` (String)
**說明**：Daily Value (DV) 百分比的腳註說明

**可能值**：
- `"Not Present"` - 無 DV 資訊
- `"* Percent Daily Values are based on a 2,000 calorie diet"`
- 其他客製化文字

**範例**：
```json
"percentDvFootnote": "Not Present"
```

---

## 3. 嵌套物件與陣列

### 3.1 labelRelationships (Array)

**說明**：產品間的關係，用於識別同一產品的不同版本或包裝

#### 結構
```json
{
  "type": "String",
  "labelId": Integer
}
```

#### 範例
```json
"labelRelationships": [
  {
    "type": "Package size difference, same product",
    "labelId": 5101
  },
  {
    "type": "Image difference, same product",
    "labelId": 10099
  }
]
```

#### type 可能值
- `"Package size difference, same product"`
- `"Image difference, same product"`
- `"Formulation difference"`
- `"Version update"`

---

### 3.2 contacts (Array)

**說明**：製造商、經銷商、或其他聯絡資訊

#### 第一層結構
```json
{
  "contactId": Integer,
  "text": "String",
  "types": Array[String],
  "contactDetails": Object
}
```

#### contactDetails 子物件
```json
{
  "src": "String",
  "id": Integer,
  "name": "String",
  "streetAddress": "String",
  "city": "String",
  "state": "String",
  "country": "String",
  "zipCode": "String",
  "phoneNumber": "String",
  "email": "String",
  "webAddress": "String"
}
```

#### 完整範例
```json
"contacts": [
  {
    "contactId": 2647,
    "text": "Manufactured by",
    "types": ["Manufacturer"],
    "contactDetails": {
      "id": 2647,
      "name": "Douglas Laboratories",
      "streetAddress": "",
      "city": "Pittsburgh",
      "state": "PA",
      "country": "",
      "zipCode": "15205",
      "phoneNumber": "",
      "email": "",
      "webAddress": "www.douglaslabs.com"
    }
  }
]
```

#### types 可能值
- `"Manufacturer"` - 製造商
- `"Distributor"` - 經銷商
- `"Brand Owner"` - 品牌所有者
- `"Contact"` - 一般聯絡人

---

### 3.3 netContents (Array)

**說明**：產品淨含量資訊

#### 結構
```json
{
  "order": Integer,
  "quantity": Number,
  "unit": "String",
  "display": "String"
}
```

#### 範例
```json
"netContents": [
  {
    "order": 1,
    "quantity": 30,
    "unit": "Capsule(s)",
    "display": "30 Capsule(s)"
  }
]
```

#### unit 常見值
**固體劑型**：
- `"Capsule(s)"`
- `"Tablet(s)"`
- `"Softgel(s)"`
- `"Gummies"`

**粉末**：
- `"g"`
- `"oz"`
- `"Scoop(s)"`

**液體**：
- `"mL"`
- `"fl oz"`
- `"Bottle(s)"`

---

### 3.4 physicalState (Object)

**說明**：產品的物理形態，使用 LanguaL E-series 分類

#### 結構
```json
{
  "langualCode": "String",
  "langualCodeDescription": "String"
}
```

#### 範例
```json
"physicalState": {
  "langualCode": "E0159",
  "langualCodeDescription": "Capsule"
}
```

#### langualCode 可能值（E-series）

| 代碼 | 描述 |
|------|------|
| E0159 | Capsule |
| E0162 | Powder |
| E0155 | Tablet |
| E0165 | Liquid |
| E0161 | Softgel |
| E0164 | Gummy |
| E0151 | Chewable Tablet |
| E0166 | Lozenge |
| E0167 | Gel |
| E0160 | Semi-Solid |

---

### 3.5 servingSizes (Array)

**說明**：建議服用量資訊

#### 結構
```json
{
  "order": Integer,
  "minQuantity": Number,
  "maxQuantity": Number,
  "minDailyServings": Integer,
  "maxDailyServings": Integer,
  "unit": "String",
  "inSFB": Boolean
}
```

#### 範例
```json
"servingSizes": [
  {
    "order": 1,
    "minQuantity": 1,
    "maxQuantity": 1,
    "minDailyServings": 1,
    "maxDailyServings": 1,
    "unit": "Capsule(s)",
    "inSFB": true
  }
]
```

#### inSFB 說明
- `true` - 此服用量資訊顯示在 Supplement Facts 框內
- `false` - 此服用量資訊位於其他位置

---

### 3.6 targetGroups (Array)

**說明**：產品的目標使用族群

#### 資料型別
字串陣列

#### 範例
```json
"targetGroups": [
  "Adult (18 - 50 Years)",
  "Dairy Free",
  "Sugar Free"
]
```

#### 常見值

**年齡群組**：
- `"Adult (18 - 50 Years)"`
- `"Adult (51 and Older)"`
- `"Children (4 - 18 Years)"`
- `"Infants (0 - 12 Months)"`

**生理狀態**：
- `"Pregnant Women"`
- `"Lactating Women"`

**飲食偏好**：
- `"Vegetarian"`
- `"Vegan"`

**過敏原標示**：
- `"Gluten Free"`
- `"Dairy Free"`
- `"Sugar Free"`
- `"Soy Free"`

---

### 3.7 productType (Object)

**說明**：產品類型分類，使用 LanguaL A-series

#### 結構
```json
{
  "langualCode": "String",
  "langualCodeDescription": "String"
}
```

#### 範例
```json
"productType": {
  "langualCode": "A1325",
  "langualCodeDescription": "Other Combinations"
}
```

#### langualCode 可能值（A-series）

| 代碼 | 描述 |
|------|------|
| A1325 | Other Combinations |
| A1306 | Botanical or Herbal |
| A1309 | Non-nutrient/non-botanical |
| A1302 | Vitamins |
| A1317 | Botanical with Nutrient(s) |
| A1303 | Minerals |
| A1304 | Amino Acids |
| A1316 | Vitamins and Minerals |
| A1314 | Probiotics |
| A1318 | Minerals with Nutrient(s) |
| A1305 | Fatty Acids |

---

### 3.8 statements (Array)

**說明**：產品標籤上的各類聲明、警告、使用說明

#### 結構
```json
{
  "type": "String",
  "notes": "String"
}
```

#### 範例
```json
"statements": [
  {
    "type": "FDA Statement of Identity",
    "notes": "A Dietary Supplement"
  },
  {
    "type": "Formulation re: Does NOT Contain",
    "notes": "This product contains NO yeast, wheat gluten, soy protein, milk/dairy, corn, sodium, sugar, starch, artificial coloring, preservatives or flavoring."
  },
  {
    "type": "Suggested/Recommended/Usage/Directions",
    "notes": "As a dietary supplement, adults take 1 capsule daily or as directed by physician."
  }
]
```

#### type 主要分類

**FDA 法規聲明**：
- `"FDA Statement of Identity"`
- `"FDA Disclaimer"`

**配方相關**：
- `"Formulation re: Contains"`
- `"Formulation re: Does NOT Contain"`
- `"Formulation re: Made with"`
- `"Formulation re: Free of/from"`
- `"Formulation re: Certifications"`

**使用說明**：
- `"Suggested/Recommended/Usage/Directions"`

**警告**：
- `"Precautions re: All Other"`
- `"Precautions re: Children"`
- `"Precautions re: Allergies"`
- `"Precautions re: Pregnancy/Nursing"`
- `"Precautions re: Medical Conditions"`

**儲存**：
- `"Storage"`

**其他**：
- `"General Statements: All Other Content"`
- `"General: Product/Version Code"`
- `"Tamper Evidence"`

---

### 3.9 claims (Array)

**說明**：產品的健康宣稱，使用 LanguaL P-series 分類

#### 結構
```json
{
  "langualCode": "String",
  "langualCodeDescription": "String"
}
```

#### 範例
```json
"claims": [
  {
    "langualCode": "P0115",
    "langualCodeDescription": "All Other"
  }
]
```

#### langualCode 可能值（P-series）

| 代碼 | 描述 |
|------|------|
| P0115 | All Other |
| P0265 | Structure/Function Claims |
| P0065 | Nutrient Content Claims |
| P0066 | Health Claims |
| P0067 | Qualified Health Claims |

---

### 3.10 events (Array)

**說明**：產品相關的事件記錄

#### 結構
```json
{
  "date": "String (YYYY-MM-DD)",
  "type": "String"
}
```

#### 範例
```json
"events": [
  {
    "date": "2012-06-25",
    "type": "Date entered into DSLD"
  }
]
```

#### type 可能值
- `"Date entered into DSLD"`
- `"Date last modified"`
- `"Date taken off market"`
- `"Date added to market"`

---

### 3.11 userGroups (Array)

**說明**：每日建議攝取量 (DV) 的目標族群定義

#### 結構
```json
{
  "dailyValueTargetGroupName": "String",
  "langualCode": "String",
  "langualCodeDescription": "String"
}
```

#### 範例
```json
"userGroups": [
  {
    "dailyValueTargetGroupName": "Adults and children 4 or more years of age",
    "langualCode": "P0250",
    "langualCodeDescription": "Adults and Children 4 years and above"
  }
]
```

#### 常見族群

| 族群名稱 | LanguaL 代碼 |
|----------|-------------|
| Adults and children 4 or more years of age | P0250 |
| Children 1-3 years | P0192 |
| Pregnant and Lactating Women | P0253 |
| Infants 0-12 months | P0191 |

---

## 4. 成分資料結構

### 4.1 ingredientRows (Array)

**說明**：產品的主要成分列表，支援巢狀結構

#### 第一層結構
```json
{
  "order": Integer,
  "ingredientId": Integer,
  "description": "String",
  "notes": "String",
  "quantity": Array,
  "nestedRows": Array,
  "name": "String",
  "category": "String",
  "ingredientGroup": "String",
  "uniiCode": "String",
  "alternateNames": Array,
  "forms": Array
}
```

#### 欄位說明

##### `order` (Integer)
成分在列表中的順序

**範例**：
```json
"order": 1
```

---

##### `ingredientId` (Integer)
DSLD 內部成分識別碼

**範例**：
```json
"ingredientId": 25924
```

**特性**：
- 非唯一（同一成分名可有多個 ID）
- 範圍：3,644 - 361,995

---

##### `name` (String)
成分名稱

**範例**：
```json
"name": "Glucosamine Sulfate"
```

---

##### `category` (String)
成分分類

**可能值**：
- `"vitamin"` - 維生素
- `"mineral"` - 礦物質
- `"botanical"` - 植物性成分
- `"non-nutrient/non-botanical"` - 非營養/非植物性
- `"amino acid"` - 胺基酸
- `"fatty acid"` - 脂肪酸
- `"probiotic"` - 益生菌
- `"enzyme"` - 酵素
- `"animal part or source"` - 動物來源

**範例**：
```json
"category": "non-nutrient/non-botanical"
```

---

##### `ingredientGroup` (String)
成分群組名稱

**範例**：
```json
"ingredientGroup": "Glucosamine Sulfate"
```

**注意**：通常與 `name` 相同

---

##### `uniiCode` (String)
FDA Unique Ingredient Identifier

**格式**：10 位字母數字（9位隨機 + 1位檢查碼）

**範例**：
```json
"uniiCode": "PQ6CK8PD0R"
```

**注意**：可能為 `null`

**常見營養素 UNII**：

| 成分 | UNII 代碼 |
|------|----------|
| Vitamin C | PQ6CK8PD0R |
| Magnesium | I38ZP9992A |
| Iron | E1UOL152H7 |
| Vitamin B12 | P6YC3EG204 |
| Folic Acid | 935E97BOY8 |

---

##### `description` (String)
成分的額外描述或說明

**範例**：
```json
"description": "as beta-carotene"
```

**注意**：經常為 `null`

---

##### `notes` (String)
成分相關註記，通常包含來源或形式資訊

**範例**：
```json
"notes": "Glucosamine Sulfate (Form: from Crab, and Shrimp)"
```

---

##### `alternateNames` (Array)
成分的別名列表

**範例**：
```json
"alternateNames": ["Ascorbic Acid", "L-Ascorbic Acid"]
```

---

### 4.2 quantity 子陣列

**說明**：成分的含量資訊

#### 結構
```json
{
  "servingSizeOrder": Integer,
  "servingSizeQuantity": Number,
  "operator": "String",
  "quantity": Number,
  "unit": "String",
  "dailyValueTargetGroup": Array,
  "servingSizeUnit": "String"
}
```

#### 完整範例
```json
"quantity": [
  {
    "servingSizeOrder": 1,
    "servingSizeQuantity": 1,
    "operator": "=",
    "quantity": 250,
    "unit": "mg",
    "dailyValueTargetGroup": [
      {
        "name": "Adults and children 4 or more years of age",
        "operator": null,
        "percent": null,
        "footnote": "Daily Value not established"
      }
    ],
    "servingSizeUnit": "Capsule(s)"
  }
]
```

#### operator 可能值
- `"="` - 等於
- `"<"` - 小於
- `">"` - 大於
- `null` - 無運算符

#### unit 常見值

**重量**：
- `"mg"` - 毫克
- `"mcg"` - 微克
- `"g"` - 克
- `"kg"` - 公斤

**國際單位**：
- `"IU"` - International Units

**菌落**：
- `"CFU"` - Colony Forming Units

**能量**：
- `"kcal"` - 千卡
- `"cal"` - 卡路里

**體積**：
- `"mL"` - 毫升
- `"L"` - 公升

**酵素活性**：
- `"USP units"`
- `"FCC units"`

#### dailyValueTargetGroup 結構
```json
{
  "name": "String",
  "operator": "String",
  "percent": Number,
  "footnote": "String"
}
```

**常見 footnote**：
- `"Daily Value not established"`
- `"*"` - 參考標準 DV 腳註

---

### 4.3 nestedRows 子陣列

**說明**：巢狀成分，用於複合成分的層級結構

#### 結構
與 `ingredientRows` 相同，支援遞迴巢狀

#### 用途
- 顯示複合成分的組成
- 表達成分間的包含關係
- 支援多層級巢狀

#### 範例場景
```
產品：含多種鎂形式的產品
- Magnesium (level 1, 主成分)
  - Magnesium Oxide (level 2, 子成分)
  - Magnesium Citrate (level 2, 子成分)
  - Magnesium Glycinate (level 2, 子成分)
```

---

### 4.4 forms 子陣列

**說明**：成分的化學形式或來源形式

#### 結構
```json
{
  "order": Integer,
  "ingredientId": Integer,
  "prefix": "String",
  "percent": Number,
  "name": "String",
  "category": "String",
  "ingredientGroup": "String",
  "uniiCode": "String"
}
```

#### 完整範例
```json
"forms": [
  {
    "order": 1,
    "ingredientId": 36697,
    "prefix": "from",
    "percent": null,
    "name": "Crab",
    "category": "animal part or source",
    "ingredientGroup": "Crab",
    "uniiCode": null
  },
  {
    "order": 2,
    "ingredientId": 36701,
    "prefix": "and",
    "percent": null,
    "name": "Shrimp",
    "category": "animal part or source",
    "ingredientGroup": "Shrimp",
    "uniiCode": null
  }
]
```

#### prefix 可能值
- `"from"` - 來自
- `"as"` - 作為
- `"and"` - 和
- `"with"` - 含有
- `null` - 無前綴

#### 用途
- 標示成分的化學形式（如 "Magnesium as Magnesium Oxide"）
- 標示成分來源（如 "Glucosamine from Crab and Shrimp"）

---

## 5. LanguaL 標準欄位

### 5.1 LanguaL™ 系統概述

**全名**：Langua aLimentaria（食品語言）
**起源**：1970年代末由美國 FDA 創建
**維護**：歐洲 LanguaL 技術委員會（自1996年）

### 5.2 DSLD 中的 LanguaL Facets

| Facet | 名稱 | DSLD 欄位 | 代碼數 |
|-------|------|----------|--------|
| **A** | Product Type | productType | 11 |
| **E** | Physical State | physicalState | 10 |
| **P** | Health Claims | claims | 5+ |
| **P** | User Groups | userGroups | 4+ |

### 5.3 A-series：Product Type

**完整代碼列表**：

| langualCode | langualCodeDescription |
|------------|------------------------|
| A1325 | Other Combinations |
| A1306 | Botanical or Herbal |
| A1309 | Non-nutrient/non-botanical |
| A1302 | Vitamins |
| A1317 | Botanical with Nutrient(s) |
| A1303 | Minerals |
| A1304 | Amino Acids |
| A1316 | Vitamins and Minerals |
| A1314 | Probiotics |
| A1318 | Minerals with Nutrient(s) |
| A1305 | Fatty Acids |

### 5.4 E-series：Physical State

**完整代碼列表**：

| langualCode | langualCodeDescription |
|------------|------------------------|
| E0159 | Capsule |
| E0162 | Powder |
| E0155 | Tablet |
| E0165 | Liquid |
| E0161 | Softgel |
| E0164 | Gummy |
| E0151 | Chewable Tablet |
| E0166 | Lozenge |
| E0167 | Gel |
| E0160 | Semi-Solid |

### 5.5 P-series：Health Claims

**代碼列表**：

| langualCode | langualCodeDescription |
|------------|------------------------|
| P0115 | All Other |
| P0265 | Structure/Function Claims |
| P0065 | Nutrient Content Claims |
| P0066 | Health Claims |
| P0067 | Qualified Health Claims |

### 5.6 P-series：User Groups

**代碼列表**：

| langualCode | langualCodeDescription |
|------------|------------------------|
| P0250 | Adults and Children 4 years and above |
| P0192 | Children 1-3 years |
| P0253 | Pregnant and Lactating Women |
| P0191 | Infants 0-12 months |

---

## 6. 欄位值域說明

### 6.1 Null vs Empty String

#### Null 值欄位
以下欄位可能為 `null`：
- `uniiCode`
- `description`
- `notes`
- `ingredientId`
- `percent` (in forms)
- `operator` (in quantity)

#### Empty String 欄位
以下欄位可能為空字串 `""`：
- `pdf`
- `thumbnail`
- `nhanesId`
- `bundleName`
- `productVersionCode`
- `streetAddress`
- `country`

### 6.2 資料型別注意事項

#### 字串表示的數字
- `servingsPerContainer`：儲存為字串，但表示數字

#### 數字型別
- `id`, `contactId`, `ingredientId`：Integer
- `quantity`, `percent`：Number（可為浮點數）

#### 布林型別
- `hasOuterCarton`：Boolean
- `inSFB`：Boolean

#### 日期格式
- `date` (in events)：字串格式 `"YYYY-MM-DD"`

---

## 參考資源

### 官方資源
- [DSLD API 端點](https://api.ods.od.nih.gov/dsld/v8/)
- [DSLD API 指南](https://dsld.od.nih.gov/api-guide)
- [LanguaL 官方網站](https://www.langual.org/)

### 相關文件
- `dsld_database_guide.md` - DSLD 資料庫快速指南

---

**文件版本**: 1.0
**最後更新**: 2025-12-08
**JSON Schema 版本**: DSLD 2025-07-24
