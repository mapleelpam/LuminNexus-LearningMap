# Keepa Product Object 實戰備忘錄 v2.0

> **文件目的**：完整解釋 Keepa API Product Object 的結構、欄位意義、使用場景，特別是 `csv` 和 `stats.current` 的對應關係。
>
> **⚠️ 重要聲明**：
> - 本文件僅說明 Product Object 的資料結構和欄位意義
> - **API 使用方法、參數說明、查詢範例等請參考官方文檔**：
>   - 🔗 [Keepa API 官方文檔](https://keepa.com/#!api)
>   - 🔗 [keepa Python API 文檔](https://keepaapi.readthedocs.io/)
>   - 🔗 [Keepa API 討論區](https://keepa.com/#!discuss)
> - 本文件不涵蓋 API 呼叫方法、Token 管理、錯誤處理等實作細節
>
> **重要更新（v2.0）**：
> - ✅ 新增完整 csv[0-33] 欄位說明表
> - ✅ 新增 stats.current[0-33] 對應關係說明
> - ✅ 驗證實際專案檔案的資料結構
> - ✅ 補充資料格式細節（二元組 vs 三元組）
> - ✅ 新增特殊值說明（-1, -2 等）
>
> **資料來源**：
> - [Keepa 官方 Product Object 文檔](https://keepa.com/#!discuss/t/product-object/116)
> - [Keepa 官方 Statistics Object 文檔](https://keepa.com/#!discuss/t/statistics-object/281)
> - [keepa Python API GitHub](https://github.com/akaszynski/keepa)
> - [keepa Python API Documentation](https://keepaapi.readthedocs.io/)
> - 實際專案 vault 資料驗證

---

## API 使用指南

### 官方資源連結

本文件專注於解釋 **Product Object 的資料結構**。如需了解 **API 使用方法**，請參考以下官方資源：

#### 1. Keepa 官方文檔
- **主要 API 文檔**：https://keepa.com/#!api
  - API 端點說明
  - 請求格式與參數
  - Token 計費規則
  - 速率限制說明

- **討論區 (Community Forum)**：https://keepa.com/#!discuss
  - Product Object 定義：https://keepa.com/#!discuss/t/product-object/116
  - Statistics Object 定義：https://keepa.com/#!discuss/t/statistics-object/281
  - Request 參數說明：https://keepa.com/#!discuss/t/request-products/110

#### 2. Python API 包裝器
- **keepa Python 套件**：
  - GitHub: https://github.com/akaszynski/keepa
  - 文檔: https://keepaapi.readthedocs.io/
  - PyPI: https://pypi.org/project/keepa/

- **快速開始**：
  ```python
  import keepa

  # 初始化 API (需要 API key)
  api = keepa.Keepa('YOUR_API_KEY_HERE')

  # 查詢產品 (基本用法請參考官方文檔)
  products = api.query('B0XXXXXXXX',
                       rating=True,   # 包含評分/評論數
                       buybox=True,   # 包含 Buy Box 資料
                       stats=365)     # 包含統計資料
  ```

#### 3. 其他有用資源
- **API Token 管理**：https://keepa.com/#!api (登入後可查看 token 使用量)
- **定價方案**：https://keepa.com/#!api (查看各方案的 token 額度)
- **狀態頁面**：https://keepaapi.statuspage.io/ (API 服務狀態監控)

### 本文件涵蓋範圍

- ✅ Product Object 所有欄位的意義和格式
- ✅ csv[0-33] 和 stats.current[0-33] 的完整對照
- ✅ 特殊值（-1, -2 等）的意義
- ✅ 資料解析範例（Python）
- ✅ 常見陷阱與解決方案

### 本文件不涵蓋

- ❌ API 呼叫方法（請參考官方文檔）
- ❌ Token 計費規則（請參考官方文檔）
- ❌ 速率限制處理（請參考官方文檔）
- ❌ 錯誤處理與重試機制（請參考官方文檔）
- ❌ 進階查詢參數說明（請參考官方文檔）

---

## 目錄

1. [Product Object 整體結構](#1-product-object-整體結構)
2. [產品識別 & 基本時間欄位](#2-產品識別--基本時間欄位)
3. [圖片 & 類別 / 變體結構](#3-圖片--類別--變體結構)
4. [條碼 & 品牌 / 製造商等基本屬性](#4-條碼--品牌--製造商等基本屬性)
5. [尺寸 & 重量](#5-尺寸--重量)
6. [可用性、年齡限制、Prime 等旗標](#6-可用性年齡限制prime-等旗標)
7. [FBA & 佣金 / eBay / 其他平台](#7-fba--佣金--ebay--其他平台)
8. [促銷 / Coupon / Subscribe & Save](#8-促銷--coupon--subscribe--save)
9. [銷量 / 銷售排名相關欄位](#9-銷量--銷售排名相關欄位)
10. [租賃（主要是美國教科書等）](#10-租賃主要是美國教科書等)
11. [Offers / Buy Box / Seller 相關欄位](#11-offers--buy-box--seller-相關欄位)
12. [**CSV 歷史資料：完整 Index 0-33 說明表**](#12-csv-歷史資料完整-index-0-33-說明表)
13. [**Statistics Object 與 current 陣列**](#13-statistics-object-與-current-陣列)
14. [其它小細節 & 實作注意事項](#14-其它小細節--實作注意事項)

---

## 1. Product Object 整體結構

### 簡化 JSON 結構（概念版）

```jsonc
{
  "productType": 0,
  "asin": "B00XXXXXXX",
  "domainId": 1,
  "title": "Product title",
  "trackingSince": 2711319,
  "listedSince": 2711319,
  "lastUpdate": 2711319,
  "lastRatingUpdate": 2711319,
  "lastPriceChange": 2711319,
  "lastEbayUpdate": 2711319,
  "imagesCSV": "51InzcaVqrL.jpg,...",
  "rootCategory": 562066,
  "categories": [569604],
  "categoryTree": [ { "catId": 562066, "name": "..." }, ... ],
  "parentAsin": null,
  "variationCSV": "B00AAAAAAA,B00BBBBBBB,...",
  "frequentlyBoughtTogether": ["B00AAAAAAA","B00BBBBBBB"],
  "eanList": ["8806088624952"],
  "upcList": ["045496590086"],
  "manufacturer": "Canon",
  "brand": "Canon",
  "productGroup": "Camera",
  "partNumber": "...",
  "binding": "...",
  "numberOfItems": 1,
  "numberOfPages": 514,
  "publicationDate": 20150409,
  "releaseDate": 20150409,
  "contributors": [["Name","Role"], ...],
  "languages": [["English"], ["English","Original Language"]],
  "model": "...",
  "color": "Black",
  "size": "S",
  "edition": "Standard",
  "format": "AC-3",
  "features": ["...","..."],
  "description": "...",
  "packageHeight": 123,
  "packageLength": 456,
  "packageWidth": 789,
  "packageWeight": 1234,
  "packageQuantity": 1,
  "itemHeight": 100,
  "itemLength": 200,
  "itemWidth": 50,
  "itemWeight": 800,
  "availabilityAmazon": 0,
  "availabilityAmazonDelay": [keepaTime, delay, ...],
  "ebayListingIds": [1234567890],
  "isAdultProduct": false,
  "launchpad": false,
  "audienceRating": "PG-13",
  "newPriceIsMAP": false,
  "isEligibleForTradeIn": false,
  "isEligibleForSuperSaverShipping": true,
  "fbaFees": {...},
  "referralFeePercent": 1500,
  "variations": [ { ... }, ... ],
  "coupon": [discountValue, type, ...],
  "promotions": [ { ...Promotion Object... }, ... ],
  "stats": { ...Statistics Object... },
  "salesRankReference": 562066,
  "salesRankReferenceHistory": [catId1, catId2, ...],
  "salesRanks": {
    "281052": [keepaTime, rank, ...],
    ...
  },
  "lastSoldUpdate": 2711319,
  "monthlySold": 1000,
  "rentalDetails": "text...",
  "rentalSellerId": "A2L77EE7U53NWQ",
  "rentalPrices": { ... },
  "offers": [ ...Marketplace Offer Object... ],
  "liveOffersOrder": [3,5,2,...],
  "buyBoxSellerIdHistory": [keepaTime, sellerId, ...],
  "buyBoxUsedHistory": [keepaTime, sellerId, condition, isFBA, ...],
  "isRedirectASIN": false,
  "isSNS": false,
  "offersSuccessful": true,
  "csv": [ [...],[...],... ]   // 價格 & 評價等的歷史（34 個陣列）
}
```

### Keepa Time 轉換公式

所有時間戳使用 **Keepa Time minutes**（從 2011-01-01 起算的分鐘數）：

```python
# Keepa Time → Unix milliseconds
unix_millis = (keepa_minutes + 21564000) * 60000

# Unix milliseconds → Keepa Time
keepa_minutes = (unix_millis / 60000) - 21564000

# Python datetime 轉換範例
from datetime import datetime, timedelta

def keepa_to_datetime(keepa_minutes):
    """Convert Keepa Time to Python datetime"""
    unix_millis = (keepa_minutes + 21564000) * 60000
    return datetime.utcfromtimestamp(unix_millis / 1000)

def datetime_to_keepa(dt):
    """Convert Python datetime to Keepa Time"""
    unix_millis = dt.timestamp() * 1000
    return int((unix_millis / 60000) - 21564000)
```

---

## 2. 產品識別 & 基本時間欄位

> 這些欄位幾乎一定會有，不需要特別參數。

| 欄位                 | 型別                   | 說明                                                                                                                                                                               |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productType`      | Integer              | **最重要的 gate 欄位**，決定這個 ASIN 可用哪些資料。<br>0=一般商品(完全可用)<br>1=downloadable（沒有第三方價格）<br>2=Kindle/電子書（價格/排名受限）<br>3=access restricted（通常 MAP）<br>4=invalid/廢止 ASIN<br>5=VARIATION_PARENT（父 ASIN） |
| `asin`             | String               | 產品 ASIN                                                                                                                                                                          |
| `domainId`         | Integer              | Amazon 地區：<br>1=com, 2=co.uk, 3=de, 4=fr, 5=co.jp, 6=ca, 8=it, 9=es, 10=in, 11=com.mx 等                                                                                          |
| `trackingSince`    | Integer (Keepa Time) | Keepa 開始追蹤這個 ASIN 的時間。可以拿來算追蹤天數。                                                                                                                                                  |
| `listedSince`      | Integer              | 產品首次在 Amazon 上架時間（只有部分 ASIN 有；沒有時為 0 或 -1）                                                                                                                                       |
| `lastUpdate`       | Integer              | Product Object 最後一次整體更新時間                                                                                                                                                        |
| `lastRatingUpdate` | Integer              | 評分/評論數最後更新時間（對 review 相關欄位很重要）                                                                                                                                                   |
| `lastPriceChange`  | Integer              | 任一 price type 最後一次變動時間                                                                                                                                                           |
| `lastEbayUpdate`   | Integer              | eBay 價格最後更新時間；如果找不到對應 eBay 產品會是負值                                                                                                                                                |

---

## 3. 圖片 & 類別 / 變體結構

### 3.1 圖片與分類

| 欄位             | 型別           | 說明                                                                                                                                           |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `imagesCSV`    | String (逗號串) | 產品所有 Amazon 圖片檔名的 CSV（`51InzcaVqrL.jpg,...`）<br>完整 URL 通常是 `https://images-na.ssl-images-amazon.com/images/I/<imageName>`<br>有可能是 URL-encoded<br>若無則 `null` |
| `rootCategory` | Long         | 產品所在分類樹的 root 類別節點 ID。未知時為 0 或特殊 max long                                                                                                     |
| `categories`   | Long[]       | 列出產品掛載的所有 Amazon category node IDs（可能多個）。可能為空陣列                                                                                               |
| `categoryTree` | Object[]     | 有順序的類別路徑陣列，每個物件 `{ catId: Long, name: String }`<br>通常由 root 到 leaf，方便畫樹或做 breadcrumb                                                           |

### 3.2 變體 & 關聯 ASIN

| 欄位                         | 型別       | 說明                                                                      |
| -------------------------- | -------- | ----------------------------------------------------------------------- |
| `parentAsin`               | String   | 若此 ASIN 為變體商品，這裡是父 ASIN；沒有變體則為 `null`                                    |
| `variationCSV`             | String   | 最多 1800 個變體 ASIN 的 CSV<br>要拿到**即時資料**需要在 request 裡加 `offers` 參數，Keepa 會更新 |
| `variations`               | Object[] | 詳細變體資訊（顏色、尺寸等屬性 + 部分價錢/可用性）<br>只有某些情況會回傳（特別是 productType 5, parent ASIN）   |
| `frequentlyBoughtTogether` | String[] | 「Frequently bought together」的 1–2 個 ASIN<br>需要 `offers` 更新             |

---

## 4. 條碼 & 品牌 / 製造商等基本屬性

| 欄位                | 型別         | 說明                                                         |
| ----------------- | ---------- | ---------------------------------------------------------- |
| `upcList`         | String[]   | 指派給此商品的所有 UPC，index 0 是 primary UPC。沒有則 `null`            |
| `eanList`         | String[]   | 所有 EAN，index 0 是 primary EAN。沒有則 `null`                   |
| `manufacturer`    | String     | 製造商名稱                                                      |
| `brand`           | String     | 品牌名稱（Amazon 頁面顯示的 brand，不是「有品牌 page 才算」那種）                |
| `productGroup`    | String     | 粗分類（例如 Electronics, Camera 等），跟 `category` 不同，是 Amazon metadata 上的 group |
| `partNumber`      | String     | 製造商料號                                                      |
| `model`           | String     | 型號                                                         |
| `binding`         | String     | 書籍的裝訂類型、或對非書類通常是產品類別描述                                     |
| `numberOfItems`   | Integer    | 此 listing 內含的件數（如 pack of 3）。無時為 -1                        |
| `numberOfPages`   | Integer    | 書籍頁數，非書籍會是 -1                                              |
| `publicationDate` | Integer    | 出版日期，用 YYYY / YYYYMM / YYYYMMDD 三種格式之一。例如 20150409         |
| `releaseDate`     | Integer    | 發售日期，格式同上                                                  |
| `contributors`    | String[][] | 貢獻者資料，例如 `[["J. K. Rowling", "Author"], ["Someone", "Editor"]]` |
| `languages`       | String[][] | 語言列表，如 `[["English"], ["English", "Original Language"]]`      |
| `color`           | String     | 顏色                                                         |
| `size`            | String     | 尺寸文字                                                       |
| `edition`         | String     | 版本，例如"1st Edition"、"Standard"                              |
| `format`          | String     | 格式，常見於影音／書籍，例如 "AC-3"、"Blu-ray"                            |
| `features`        | String[]   | Bullet points（產品賣點列表）                                      |
| `description`     | String     | 產品描述全文                                                     |

---

## 5. 尺寸 & 重量

尺寸 / 重量多半是 **最小單位整數**，不同 domain 的單位不同（例如 mm / g）。實務上通常需要靠測試幾個樣本來推單位。

| 欄位                                                 | 說明          |
| -------------------------------------------------- | ----------- |
| `packageHeight` `packageLength` `packageWidth`     | 包裝尺寸        |
| `packageWeight`                                    | 包裝重量        |
| `packageQuantity`                                  | 包裝內含套數      |
| `itemHeight` `itemLength` `itemWidth` `itemWeight` | 單一商品本體尺寸與重量 |

**注意**：官方文件沒有直接說單位，只說「最小單位整數」，常見作法是對照 Amazon 前端顯示的尺寸推算。

---

## 6. 可用性、年齡限制、Prime 等旗標

| 欄位                                | 型別        | 說明                                                   |
| --------------------------------- | --------- | ---------------------------------------------------- |
| `availabilityAmazon`              | Integer   | Amazon 自營庫存狀態：<br>-1=無報價、0=有庫存、1=預購、2=未知、3=缺貨、4=延遲 |
| `availabilityAmazonDelay`         | Integer[] | [time, delay, time, delay, …]<br>delay 通常表示出貨等待時間的變化歷史 |
| `isAdultProduct`                  | Boolean   | 是否為成人商品                                              |
| `launchpad`                       | Boolean   | 是否屬於 Amazon Launchpad 計畫                             |
| `audienceRating`                  | String    | 觀眾分級（PG-13 等），適用於影音內容                                |
| `newPriceIsMAP`                   | Boolean   | 新品價是否受 Minimum Advertised Price (MAP) 限制            |
| `isEligibleForTradeIn`            | Boolean   | 是否可參加 trade-in                                       |
| `isEligibleForSuperSaverShipping` | Boolean   | 是否符合 Super Saver / 免費運送門檻                            |

**使用建議**：這些欄位適合用來篩除異常商品（如成人產品、MAP 限制商品等）。

---

## 7. FBA & 佣金 / eBay / 其他平台

| 欄位                   | 型別      | 說明                                                                  |
| -------------------- | ------- | ------------------------------------------------------------------- |
| `fbaFees`            | Object  | FBA 相關費用資訊（fulfillment fee 等）<br>結構有多個子欄位，如 `pickAndPackFee`, `storageFee` 等 |
| `referralFeePercent` | Integer | Amazon 介紹費％，以整數百分之一（basis points）表示<br>例如 1500 = 15%                |
| `ebayListingIds`     | Long[]  | 若 Keepa 有對應 eBay listing，這裡會列出 IDs<br>可配合 eBay 價格 csv[28]/csv[29] 使用 |

---

## 8. 促銷 / Coupon / Subscribe & Save

| 欄位           | 型別                 | 說明                                                                   |
| ------------ | ------------------ | -------------------------------------------------------------------- |
| `coupon`     | Integer[]          | 當前 coupon 情況，例如折扣金額、百分比等<br>具體 encoding 需參照官方 doc<br>通常配合 `stats` 或 `csv` 看價格差 |
| `promotions` | Promotion Object[] | 更多促銷資訊（類型、條件、期限等）                                                    |
| `isSNS`      | Boolean            | 此商品的 buy box 是否可以 Subscribe & Save（定期購買）<br>需要 `offers` 相關參數才會出現      |

---

## 9. 銷量 / 銷售排名相關欄位

> 這一區對「銷量估計、ranking 熱門度」分析很重要。

| 欄位                          | 型別      | 說明                                                                          |
| --------------------------- | ------- | --------------------------------------------------------------------------- |
| `salesRanks`                | Object  | key = categoryId<br>value = `[keepaTime, rank, ...]` 的歷史陣列<br>可以有多個 category rank |
| `salesRankReference`        | Long    | 主要參考的 sales rank 類別 ID（例如最重要的 category）                                    |
| `salesRankReferenceHistory` | Long[]  | 主要參考 rank 所屬 category 的變化歷史                                                |
| `lastSoldUpdate`            | Integer | `monthlySold` 上次更新時間                                                        |
| `monthlySold`               | Integer | 過去 1 個月內的購買次數<br>直接來自 Amazon 搜尋結果頁上的「過去一個月有 XXX 人購買」<br>**不是模型估計**<br>多數 ASIN 會是 undefined |

---

## 10. 租賃（主要是美國教科書等）

| 欄位               | 型別     | 說明                                                                |
| ---------------- | ------ | ----------------------------------------------------------------- |
| `rentalDetails`  | String | 租書說明文字（租期、延長費、買斷價…）<br>需要 `offers` / `rental` 參數                  |
| `rentalSellerId` | String | 提供 rental buy box 的 sellerId                                      |
| `rentalPrices`   | Object | 租賃價資訊：<br>initialPrice, shortExtnPrice, longExtnPrice, fullPrice 等 |

---

## 11. Offers / Buy Box / Seller 相關欄位

> **重要**：這些只有在 product request 裡使用 `offers` 或 `buybox` 參數時才會有值。

| 欄位                      | 型別                                           | 說明                                                                     |
| ----------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| `offers`                | Marketplace Offer Object[]                   | 具體每個 listing（條件、新舊、FBA/FBM、價格、運費、sellerId 等）                           |
| `liveOffersOrder`       | Integer[]                                    | 對應 `offers` 陣列 index 的排序<br>代表 Amazon offers page 上目前的顯示順序              |
| `buyBoxSellerIdHistory` | [keepaTime, sellerId, ...]                   | 買盒擁有者 sellerId 的歷史<br>如果無人獲得 buy box 用 -1<br>庫存無、未識別則 -2              |
| `buyBoxUsedHistory`     | [keepaTime, sellerId, condition, isFBA, ...] | **中古** buy box 的歷史<br>condition 用 2/3/4/5 表示「像新/非常好/良好/可」<br>`isFBA` 1/0 表示是否 FBA |
| `isRedirectASIN`        | Boolean                                      | 此 ASIN 是否會被 Amazon 301 重導到其他 ASIN<br>（例如某顏色下架轉到其他顏色）                   |
| `offersSuccessful`      | Boolean                                      | 這次請求是否成功抓到新的 offers 資料<br>如果商品本身就沒有 offers 通常會是 `false`                |

---

## 12. CSV 歷史資料：完整 Index 0-33 說明表

### CSV 陣列概述

`csv` 是 Product Object 中最重要的**歷史資料陣列**，包含 34 個子陣列（index 0-33），每個子陣列記錄特定價格類型或統計資料的時間序列。

**重要特性**：
- **預設開啟**：`history=True`（預設）才有 `csv`
- **資料格式**：大部分是二元組 `[time, value, time, value, ...]`
- **運費欄位**：部分是三元組 `[time, price, shipping, time, price, shipping, ...]`
- **缺值表示**：價格 `-1` 表示該時間點無此價格
- **評分/評論**：`csv[16]` 和 `csv[17]` 需要 `rating=True` 參數

### 完整 CSV Index 對照表（0-33）

| Index | 常數名稱                            | 描述                                 | 格式          | 單位                | 備註                                   |
| ----- | ------------------------------- | ---------------------------------- | ----------- | ----------------- | ------------------------------------ |
| 0     | `AMAZON`                        | Amazon 自營價格歷史                      | 二元組         | 美分（cents）         | 值為 -1 表示無 Amazon 自營價格                |
| 1     | `NEW`                           | Marketplace 新品最低價歷史               | 二元組         | 美分                | 第三方賣家新品最低價格                          |
| 2     | `USED`                          | Marketplace 二手最低價歷史               | 二元組         | 美分                | 第三方賣家二手最低價格                          |
| 3     | `SALES`                         | Sales Rank 銷售排名歷史                  | 二元組         | 排名數字              | 不是所有產品都有，variation 子產品通常沒有獨立排名      |
| 4     | `LISTPRICE`                     | List Price / MSRP 建議售價歷史           | 二元組         | 美分                | 製造商建議零售價，不代表實際可購買價格                  |
| 5     | `COLLECTIBLE`                   | 收藏品價格歷史                            | 二元組         | 美分                | 收藏品類別的最低價格                           |
| 6     | `REFURBISHED`                   | 翻新品價格歷史                            | 二元組         | 美分                | 官方或第三方翻新品的最低價格                       |
| 7     | `NEW_FBM_SHIPPING`              | 新品 FBM（賣家出貨）含運費最低價                | **三元組**     | 美分                | 格式：[time, price, shipping, ...]      |
| 8     | `LIGHTNING_DEAL`                | 限時閃電特價歷史                           | 二元組         | 美分                | Lightning Deal 特價活動價格               |
| 9     | `WAREHOUSE`                     | Amazon Warehouse（倉庫折扣品）價格歷史       | 二元組         | 美分                | Amazon Outlet / Warehouse Deals      |
| 10    | `NEW_FBA`                       | 新品 FBA 最低價歷史（不含 Amazon 自營）        | 二元組         | 美分                | 第三方賣家使用 FBA 的最低新品價                   |
| 11    | `COUNT_NEW`                     | 新品 offers 數量歷史                     | 二元組         | 數量                | 該時間點有多少個新品 listing                   |
| 12    | `COUNT_USED`                    | 二手品 offers 數量歷史                    | 二元組         | 數量                | 該時間點有多少個二手品 listing                  |
| 13    | `COUNT_REFURBISHED`             | 翻新品 offers 數量歷史                    | 二元組         | 數量                | 該時間點有多少個翻新品 listing                  |
| 14    | `COUNT_COLLECTIBLE`             | 收藏品 offers 數量歷史                    | 二元組         | 數量                | 該時間點有多少個收藏品 listing                  |
| 15    | `EXTRA_INFO_UPDATES`            | Offers 相關資料更新時間點標記                 | 二元組         | 時間戳 + offers 數量   | 標記 shipping/rating/review 等資料的更新時間   |
| **16** | **`RATING`** ⭐                  | **產品評分歷史**                         | 二元組         | **0-50 整數**       | **需 rating=True**，45 = 4.5 星        |
| **17** | **`COUNT_REVIEWS`** ⭐           | **產品評論數歷史**                        | 二元組         | **評論數量**          | **需 rating=True**                    |
| 18    | `BUY_BOX_SHIPPING`              | 新品 Buy Box 價格（含運費）歷史              | **三元組**     | 美分                | 無 buy box 時價格為 -1                    |
| 19    | `USED_NEW_SHIPPING`             | 二手品「Like New」含運費價格歷史              | **三元組**     | 美分                | 幾乎全新品質                               |
| 20    | `USED_VERY_GOOD_SHIPPING`       | 二手品「Very Good」含運費價格歷史             | **三元組**     | 美分                | 非常好品質                                |
| 21    | `USED_GOOD_SHIPPING`            | 二手品「Good」含運費價格歷史                  | **三元組**     | 美分                | 良好品質                                 |
| 22    | `USED_ACCEPTABLE_SHIPPING`      | 二手品「Acceptable」含運費價格歷史            | **三元組**     | 美分                | 可接受品質                                |
| 23    | `COLLECTIBLE_NEW_SHIPPING`      | 收藏品「Like New」含運費價格歷史              | **三元組**     | 美分                | -                                    |
| 24    | `COLLECTIBLE_VERY_GOOD_SHIPPING` | 收藏品「Very Good」含運費價格歷史             | **三元組**     | 美分                | -                                    |
| 25    | `COLLECTIBLE_GOOD_SHIPPING`     | 收藏品「Good」含運費價格歷史                  | **三元組**     | 美分                | -                                    |
| 26    | `COLLECTIBLE_ACCEPTABLE_SHIPPING` | 收藏品「Acceptable」含運費價格歷史            | **三元組**     | 美分                | -                                    |
| 27    | `REFURBISHED_SHIPPING`          | 翻新品含運費價格歷史                         | **三元組**     | 美分                | -                                    |
| 28    | `EBAY_NEW_SHIPPING`             | eBay 新品含運費最低價歷史                    | **三元組**     | 美分                | 需要 Keepa 找到對應的 eBay listing          |
| 29    | `EBAY_USED_SHIPPING`            | eBay 二手品含運費最低價歷史                   | **三元組**     | 美分                | 需要 Keepa 找到對應的 eBay listing          |
| 30    | `TRADE_IN`                      | Amazon Trade-In 回收價格歷史             | 二元組         | 美分                | Amazon 回收計畫的收購價                      |
| 31    | `RENTAL`                        | 租賃價格歷史                             | 二元組         | 美分                | 主要用於教科書租賃                            |
| 32    | `BUY_BOX_USED_SHIPPING`         | 二手品 Buy Box 含運費價格歷史               | **三元組**     | 美分                | -                                    |
| 33    | `PRIME_EXCL`                    | Prime 專屬新品最低價歷史                    | 二元組         | 美分                | 只有 Prime 會員才能購買的商品價格                 |

### 資料格式說明

#### 二元組格式（大部分欄位）
```python
csv[0] = [keepaTime1, price1, keepaTime2, price2, keepaTime3, price3, ...]

# 解析範例
times = csv[0][::2]  # 取偶數位置（時間）
values = csv[0][1::2]  # 取奇數位置（價格/值）
```

#### 三元組格式（含運費欄位）
```python
csv[18] = [keepaTime1, price1, shipping1, keepaTime2, price2, shipping2, ...]

# 解析範例
times = csv[18][::3]      # 每3個取第0個（時間）
prices = csv[18][1::3]    # 每3個取第1個（價格）
shipping = csv[18][2::3]  # 每3個取第2個（運費）
```

### 使用範例

```python
import matplotlib.pyplot as plt
from datetime import datetime

# 解析 Amazon 價格歷史
amazon_history = product['csv'][0]
if amazon_history:
    times = [keepa_to_datetime(t) for t in amazon_history[::2]]
    prices = [p/100 for p in amazon_history[1::2]]  # 轉成美元

    plt.plot(times, prices)
    plt.title('Amazon Price History')
    plt.ylabel('Price (USD)')
    plt.show()

# 解析評分和評論數歷史（需要 rating=True）
if product['csv'][16] is not None:
    rating_history = product['csv'][16]
    times = [keepa_to_datetime(t) for t in rating_history[::2]]
    ratings = [r/10 for r in rating_history[1::2]]  # 轉成 5.0 scale

    plt.plot(times, ratings)
    plt.title('Rating History')
    plt.ylabel('Rating (stars)')
    plt.ylim(0, 5)
    plt.show()

# 解析 Buy Box 價格含運費（三元組）
if product['csv'][18] is not None:
    buybox_history = product['csv'][18]
    times = [keepa_to_datetime(t) for t in buybox_history[::3]]
    prices = [p/100 for p in buybox_history[1::3]]
    shipping = [s/100 for s in buybox_history[2::3]]
    total = [p+s for p, s in zip(prices, shipping)]

    plt.plot(times, total)
    plt.title('Buy Box Total Price (Price + Shipping)')
    plt.ylabel('Price (USD)')
    plt.show()
```

---

## 13. Statistics Object 與 current 陣列

### Stats Object 概述

`stats` 是 Product Object 裡的一個子物件，**只有在 request 加了 `stats` 參數才會有**（例如 `stats=90` 或 `stats=365`）。

**主要欄位**：
- `current`: Integer[] – **目前值**（價格 / 排名 / 評分 / 評論數…）
- `avg`, `avg30`, `avg90`, `avg180`: Integer[] – 不同期間加權平均
- `atIntervalStart`: Integer[] – stats 期間開始時的值
- `min`, `max`: Integer[][] – 歷史最低 / 最高（含發生時間）
- `minInInterval`, `maxInInterval`: 在 stats 期間內的極值
- `outOfStockPercentageInInterval`, `outOfStockPercentage30`, `outOfStockPercentage90`: 缺貨百分比
- `salesRankDrops30/90/180`: 排名向下跳動次數（可估銷量）
- `totalOfferCount`: 所有條件合計的 offers 數
- 一堆 `buyBox*` 欄位：現在 buy box 價格 / 運費 / 是否 FBA / 是否 Amazon / Prime 限定 等
- `retrievedOfferCount`, `isAddonItem`, `sellerIdsLowestFBA`, `sellerIdsLowestFBM`, `offerCountFBA`, `offerCountFBM` 等

### ⭐ 關鍵重點：stats.current 與 csv 的 Index 對應關係

**所有 `stats.current` / `stats.avg*` 等陣列的 index 定義完全沿用 `csv` 的 Price Type index**。

也就是說：
- `stats.current[0]` = Amazon 當前價格 = `csv[0]` 的最新值
- `stats.current[1]` = Marketplace 新品當前最低價 = `csv[1]` 的最新值
- …
- `stats.current[16]` = 當前 rating (0-50) = `csv[16]` 的最新值 ⭐
- `stats.current[17]` = 當前 review 數 = `csv[17]` 的最新值 ⭐

### stats.current 完整對照表（0-33）

| Index | 欄位名稱                              | 說明                                   | 單位          | 對應 csv       |
| ----- | --------------------------------- | ------------------------------------ | ----------- | ------------ |
| 0     | `current[0]`                      | Amazon 自營當前價格                        | 美分          | `csv[0]`     |
| 1     | `current[1]`                      | Marketplace 新品當前最低價                  | 美分          | `csv[1]`     |
| 2     | `current[2]`                      | Marketplace 二手當前最低價                  | 美分          | `csv[2]`     |
| 3     | `current[3]`                      | 當前銷售排名                               | 排名數字        | `csv[3]`     |
| 4     | `current[4]`                      | 當前建議售價                               | 美分          | `csv[4]`     |
| 5     | `current[5]`                      | 收藏品當前價格                              | 美分          | `csv[5]`     |
| 6     | `current[6]`                      | 翻新品當前價格                              | 美分          | `csv[6]`     |
| 7     | `current[7]`                      | 新品 FBM 含運費當前最低價                      | 美分          | `csv[7]`     |
| 8     | `current[8]`                      | 當前限時特價                               | 美分          | `csv[8]`     |
| 9     | `current[9]`                      | Amazon Warehouse 當前價格                | 美分          | `csv[9]`     |
| 10    | `current[10]`                     | 新品 FBA 當前最低價（不含 Amazon 自營）           | 美分          | `csv[10]`    |
| 11    | `current[11]`                     | 當前新品 offers 數量                       | 數量          | `csv[11]`    |
| 12    | `current[12]`                     | 當前二手品 offers 數量                      | 數量          | `csv[12]`    |
| 13    | `current[13]`                     | 當前翻新品 offers 數量                      | 數量          | `csv[13]`    |
| 14    | `current[14]`                     | 當前收藏品 offers 數量                      | 數量          | `csv[14]`    |
| 15    | `current[15]`                     | Offers 資料更新標記                        | 時間戳 + 數量    | `csv[15]`    |
| **16** | **`current[16]`** ⭐               | **當前產品評分**                           | **0-50 整數** | **`csv[16]`** |
| **17** | **`current[17]`** ⭐               | **當前產品評論數**                          | **評論數量**    | **`csv[17]`** |
| 18    | `current[18]`                     | 當前 Buy Box 價格含運費                     | 美分          | `csv[18]`    |
| 19    | `current[19]`                     | 二手「Like New」當前價格含運費                  | 美分          | `csv[19]`    |
| 20    | `current[20]`                     | 二手「Very Good」當前價格含運費                 | 美分          | `csv[20]`    |
| 21    | `current[21]`                     | 二手「Good」當前價格含運費                      | 美分          | `csv[21]`    |
| 22    | `current[22]`                     | 二手「Acceptable」當前價格含運費                | 美分          | `csv[22]`    |
| 23    | `current[23]`                     | 收藏品「Like New」當前價格含運費                 | 美分          | `csv[23]`    |
| 24    | `current[24]`                     | 收藏品「Very Good」當前價格含運費                | 美分          | `csv[24]`    |
| 25    | `current[25]`                     | 收藏品「Good」當前價格含運費                     | 美分          | `csv[25]`    |
| 26    | `current[26]`                     | 收藏品「Acceptable」當前價格含運費               | 美分          | `csv[26]`    |
| 27    | `current[27]`                     | 翻新品當前價格含運費                           | 美分          | `csv[27]`    |
| 28    | `current[28]`                     | eBay 新品當前價格含運費                       | 美分          | `csv[28]`    |
| 29    | `current[29]`                     | eBay 二手當前價格含運費                       | 美分          | `csv[29]`    |
| 30    | `current[30]`                     | 當前 Trade-In 回收價                      | 美分          | `csv[30]`    |
| 31    | `current[31]`                     | 當前租賃價格                               | 美分          | `csv[31]`    |
| 32    | `current[32]`                     | 二手 Buy Box 當前價格含運費                   | 美分          | `csv[32]`    |
| 33    | `current[33]`                     | Prime 專屬當前價格                         | 美分          | `csv[33]`    |

### 使用範例

```python
# 方式 1：使用 stats.current 取得當前值（需要 stats 參數）
if 'stats' in product and 'current' in product['stats']:
    current = product['stats']['current']

    # 當前評分和評論數
    current_rating = current[16] / 10 if current[16] != -1 else None  # 轉成 5.0 scale
    current_reviews = current[17] if current[17] != -1 else 0

    # 當前 Amazon 自營價格
    amazon_price = current[0] / 100 if current[0] != -1 else None  # 轉成美元

    # 當前銷售排名
    sales_rank = current[3] if current[3] != -1 else None

    print(f"評分: {current_rating} 星 ({current_reviews} 評論)")
    print(f"Amazon 價格: ${amazon_price:.2f}")
    print(f"銷售排名: #{sales_rank}")

# 方式 2：使用 csv 最後一個值（不需要 stats 參數）
if product['csv'][16] is not None and len(product['csv'][16]) > 0:
    rating_history = product['csv'][16]
    current_rating = rating_history[-1] / 10  # 最後一個值

    review_history = product['csv'][17]
    current_reviews = review_history[-1]

# 方式 3：使用 stats.avg 取得平均值
if 'stats' in product:
    avg_90_days = product['stats'].get('avg90', [])
    if len(avg_90_days) > 0:
        avg_amazon_price = avg_90_days[0] / 100  # 過去 90 天平均 Amazon 價格
        avg_rating = avg_90_days[16] / 10  # 過去 90 天平均評分
```

---

## 14. 其它小細節 & 實作注意事項

### 1. 缺值表示方式

- **多數價格欄位**：缺貨 / 無值時是 `-1`
- **日期欄位**（`publicationDate`, `releaseDate`）：未知時是 `-1`
- **Flag-type 欄位**：`null` 或 `false`（要看個別定義）

### 2. Keepa Time 轉換 & 對齊

- 所有時間（stats、csv、salesRanks、buyBoxHistory 等）都用 Keepa minutes
- Flask / pandas pipeline 建議統一先轉成 UTC datetime 再處理

```python
from datetime import datetime, timedelta

def keepa_to_datetime(keepa_minutes):
    """Convert Keepa Time to Python datetime"""
    unix_millis = (keepa_minutes + 21564000) * 60000
    return datetime.utcfromtimestamp(unix_millis / 1000)

def datetime_to_keepa(dt):
    """Convert Python datetime to Keepa Time"""
    unix_millis = dt.timestamp() * 1000
    return int((unix_millis / 60000) - 21564000)
```

### 3. `productType` 的實務意義

- **`productType=5`（VARIATION_PARENT）**：通常沒有直接可售價；你會在這裡看到 `variations` / `variationCSV` 用來指向子 ASIN
- **`productType` 非 0 / 5 時**：很多 price / salesRank / stats 欄位會缺或非常有限
- **抓 supplement 的時候**：通常可以直接丟掉 type 2,3,4

### 4. API 參數的 Token 成本

| 參數                | Token 成本 | 說明                                     | 實際使用                 |
| ----------------- | -------- | -------------------------------------- | -------------------- |
| 基本查詢              | 1        | 基本產品資訊                                 | -                    |
| `history=True`    | 0        | 預設開啟，包含 `csv` 歷史資料                     | 預設                   |
| `rating=True`     | 2        | 包含 rating / reviews 歷史（csv[16]/csv[17]） | stage2_keepa_fetcher |
| `offers>0`        | varies   | 依據 offers 數量，通常 +1-3 tokens            | -                    |
| `buybox=True`     | 2        | 包含 buy box 歷史與統計                       | stage2_keepa_fetcher |
| `stats=N`         | 0        | 統計資料（N 天），不額外消耗 token                  | stage2_keepa_fetcher |

**專案實際使用組合（stage2_keepa_fetcher.py）**：
```python
# 完整查詢：3 tokens/query
products = api.query(upc_list,
                     buybox=True,      # +2 tokens
                     stats=365,        # 0 tokens
                     rating=True)      # +2 tokens (但 buybox 已包含)
# 總共：1 (基本) + 2 (buybox + rating) = 3 tokens
```

### 5. Review / Rating 的常見用法

#### 當下評分 & 評論數

```python
# 方法 1：使用 stats.current（需要 stats 參數）
current_rating = product['stats']['current'][16] / 10  # 轉成 5.0 scale
current_reviews = product['stats']['current'][17]

# 方法 2：使用 csv 最後一個值（需要 rating=True）
if product['csv'][16] is not None:
    rating_array = product['csv'][16]
    current_rating = rating_array[-1] / 10  # 最後一個值
```

#### 歷史走勢（例如看評價爆量成長）

```python
import matplotlib.pyplot as plt

# 拆解 csv[16] 和 csv[17]
rating_history = product['csv'][16]  # [time1, value1, time2, value2, ...]
review_history = product['csv'][17]

# 轉換成 (time, value) pairs
rating_times = [keepa_to_datetime(t) for t in rating_history[::2]]
rating_values = [v/10 for v in rating_history[1::2]]

review_times = [keepa_to_datetime(t) for t in review_history[::2]]
review_counts = review_history[1::2]

# 繪圖
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 8))

ax1.plot(rating_times, rating_values)
ax1.set_ylabel('Rating (stars)')
ax1.set_title('Rating History')

ax2.plot(review_times, review_counts)
ax2.set_ylabel('Review Count')
ax2.set_title('Review Count History')

plt.tight_layout()
plt.show()
```

#### 檢查資料新鮮度

```python
from datetime import datetime, timedelta

def is_rating_fresh(product, days=30):
    """檢查評價資料是否在過去 N 天內更新"""
    last_rating_update = product.get('lastRatingUpdate')
    if not last_rating_update:
        return False

    update_time = keepa_to_datetime(last_rating_update)
    now = datetime.utcnow()
    return (now - update_time) < timedelta(days=days)
```

### 6. 常見陷阱與解決方案

#### 陷阱 1：NaN vs -1 vs None

```python
import numpy as np

def safe_price_check(price_value):
    """安全檢查價格值"""
    if price_value is None:
        return False
    if isinstance(price_value, float) and np.isnan(price_value):
        return False
    if price_value == -1:
        return False
    return True
```

#### 陷阱 2：Variation Parent 沒有價格

```python
def filter_sellable_products(products):
    """過濾出可售商品（排除 parent ASIN）"""
    return [p for p in products
            if p.get('productType', -1) not in [4, 5]]  # 排除 invalid 和 parent
```

#### 陷阱 3：Review 數據可能為空

```python
def get_review_stats(product):
    """安全提取評論統計"""
    stats = {}

    # 檢查 stats 是否存在
    if 'stats' in product and 'current' in product['stats']:
        current = product['stats']['current']
        stats['rating'] = current[16] / 10 if current[16] != -1 else None
        stats['review_count'] = current[17] if current[17] != -1 else 0

    # 檢查 csv 是否存在
    elif 'csv' in product:
        if product['csv'][16] is not None and len(product['csv'][16]) > 0:
            stats['rating'] = product['csv'][16][-1] / 10
        if product['csv'][17] is not None and len(product['csv'][17]) > 0:
            stats['review_count'] = product['csv'][17][-1]

    return stats
```

#### 陷阱 4：三元組解析錯誤

```python
def parse_shipping_history(csv_array):
    """正確解析含運費的歷史資料（三元組格式）"""
    if csv_array is None or len(csv_array) == 0:
        return [], [], []

    # 確保資料長度是 3 的倍數
    if len(csv_array) % 3 != 0:
        print(f"警告：資料長度 {len(csv_array)} 不是 3 的倍數")
        return [], [], []

    times = csv_array[::3]      # 每3個取第0個
    prices = csv_array[1::3]    # 每3個取第1個
    shipping = csv_array[2::3]  # 每3個取第2個

    return times, prices, shipping

# 使用範例
times, prices, shipping = parse_shipping_history(product['csv'][18])
for t, p, s in zip(times, prices, shipping):
    dt = keepa_to_datetime(t)
    total = (p + s) / 100  # 轉成美元
    print(f"{dt}: ${total:.2f} (price: ${p/100:.2f}, shipping: ${s/100:.2f})")
```

### 7. 專案實際資料驗證結果

根據對實際 vault 資料的分析（2025-12-05）：

**CSV 陣列使用情況**（基於 by_asin/20250912 樣本）：
- ✅ **常見非空欄位**：csv[0-4], csv[11-12], csv[28-29]
- ❌ **常見空欄位**：csv[5-10], csv[13-33]（大部分產品沒有這些資料）
- ⚠️ **評分/評論**：csv[16]/csv[17] 在樣本中為空（可能該批次查詢時未使用 `rating=True`）

**Stats Object**：
- 在 20250912 和 20251118 批次中**未發現 stats 欄位**
- 推論：這兩批查詢可能未使用 `stats=365` 參數
- 建議：後續查詢時確保加上 `stats=365` 以取得統計資料

**實際檔案結構**：
```json
{
  "csv": [
    [時間, 價格, ...],      // csv[0]: AMAZON
    [時間, 價格, ...],      // csv[1]: NEW
    [時間, 價格, ...],      // csv[2]: USED
    [時間, 排名, ...],      // csv[3]: SALES
    [時間, 價格, ...],      // csv[4]: LISTPRICE
    null,                  // csv[5-10]: 通常為空
    [時間, 數量, ...],      // csv[11]: COUNT_NEW
    [時間, 數量, ...],      // csv[12]: COUNT_USED
    null,                  // csv[13-17]: 在該批次為空
    ...                    // csv[18-33]: 大部分為空
  ]
}
```

---

## 參考資料

### 官方文檔（必讀）

#### Keepa 官方資源
1. **[Keepa API 主頁](https://keepa.com/#!api)** ⭐
   - API 使用說明、Token 計費、速率限制
   - 需登入後查看完整文檔

2. **[Product Object 定義](https://keepa.com/#!discuss/t/product-object/116)** ⭐
   - 所有欄位的官方定義
   - 本文件的主要參考來源

3. **[Statistics Object 定義](https://keepa.com/#!discuss/t/statistics-object/281)**
   - stats 物件的完整說明
   - current, avg, min, max 等欄位

4. **[Request Products 參數說明](https://keepa.com/#!discuss/t/request-products/110)**
   - 查詢參數詳細說明
   - rating, buybox, stats, offers 等參數用法

5. **[Keepa 討論區](https://keepa.com/#!discuss)**
   - 社群問答
   - 最新功能更新

#### Python API 包裝器
6. **[keepa Python API GitHub](https://github.com/akaszynski/keepa)** ⭐
   - 原始碼和範例
   - Issue 追蹤

7. **[keepa Python API 文檔](https://keepaapi.readthedocs.io/)** ⭐
   - 完整 API 使用說明
   - [Product Query 方法](https://keepaapi.readthedocs.io/en/latest/product_query.html)
   - [API Methods 說明](https://keepaapi.readthedocs.io/en/latest/api_methods.html)

8. **[PyPI - keepa 套件](https://pypi.org/project/keepa/)**
   - 安裝說明和版本歷史

#### 其他資源
9. **[Keepa API 狀態頁面](https://keepaapi.statuspage.io/)**
   - 即時服務狀態監控
   - 歷史 downtime 記錄

10. **專案實際資料驗證**
    - vault/keepa/by_asin/20250912 (63,484 產品)
    - vault/keepa/by_upc/20251118 (96,893 UPC)

### 相關工具與第三方資源

- **[Amazon MWS API](https://developer.amazonservices.com/)** - Amazon 官方 API（需賣家帳號）
- **[Rainforest API](https://www.rainforestapi.com/)** - 另一個 Amazon 資料 API
- **[Jungle Scout](https://www.junglescout.com/)** - Amazon 產品研究工具

### 重要提醒

> **⚠️ API 使用方法請務必參考官方文檔**
>
> 本文件僅解釋 Product Object 的資料結構，不涵蓋：
> - API 呼叫方法和參數
> - Token 管理和計費規則
> - 錯誤處理和重試機制
> - 速率限制處理
>
> 以上內容請參考：
> - 🔗 https://keepa.com/#!api
> - 🔗 https://keepaapi.readthedocs.io/

---

## 附錄：快速查詢表

### 常用 Index 速查

| 用途               | csv Index | stats.current Index | 說明                 |
| ---------------- | --------- | ------------------- | ------------------ |
| Amazon 自營價格      | csv[0]    | current[0]          | 美分，-1 表示無         |
| 新品最低價            | csv[1]    | current[1]          | 第三方賣家新品            |
| 二手最低價            | csv[2]    | current[2]          | 第三方賣家二手            |
| 銷售排名             | csv[3]    | current[3]          | 排名數字               |
| **評分** ⭐         | csv[16]   | current[16]         | 0-50，需 rating=True |
| **評論數** ⭐        | csv[17]   | current[17]         | 數量，需 rating=True   |
| Buy Box 價格（含運費） | csv[18]   | current[18]         | 三元組格式              |

### 必要 API 參數組合

| 目標                | 參數組合                             | Token 成本 |
| ----------------- | -------------------------------- | -------- |
| 基本價格歷史            | 無（預設 history=True）                | 1        |
| 評分和評論數            | `rating=True`                    | +2       |
| Buy Box 資料        | `buybox=True`                    | +2       |
| 統計資料              | `stats=365`                      | 0        |
| **完整查詢**（專案使用）    | `buybox=True, stats=365, rating=True` | 3        |

---

**文件版本**：v2.0
**最後更新**：2025-12-05
**維護者**：LuminNexus-AtlasVault-DSLD Keepa 團隊
**變更記錄**：
- v2.0 (2025-12-05): 新增完整 csv[0-33] 和 stats.current[0-33] 對照表，補充實際資料驗證結果
- v1.0 (2025-12-05): 初版，基於用戶提供的日文文檔整理

---

## 附錄 B：特殊值說明（-1, -2 等）

### 價格欄位的 -1 值

**出現位置**：所有價格相關欄位（csv[0-33], stats.current[0-33]）

**意義**：
- `-1` = 該時間點**無此價格**
  - Amazon 自營無報價
  - 無第三方賣家
  - 無 Buy Box
  - 該類型商品不存在（如無二手品、無翻新品）

**範例**：
```python
# csv[0]: Amazon 自營價格歷史
amazon_history = product['csv'][0]
# [time1, -1, time2, 1999, time3, -1, ...]
# time1: Amazon 無報價（-1）
# time2: Amazon 價格 $19.99 (1999 cents)
# time3: Amazon 又無報價（-1）
```

**使用建議**：
```python
# 檢查當前價格是否有效
if product['stats']['current'][0] != -1:
    amazon_price = product['stats']['current'][0] / 100
    print(f"Amazon 價格: ${amazon_price:.2f}")
else:
    print("Amazon 目前無報價")
```

---

### buyBoxSellerIdHistory 的特殊值

**出現位置**：`buyBoxSellerIdHistory` 欄位

**格式**：`[keepaTime, sellerId, keepaTime, sellerId, ...]`

**特殊值意義**：
- **-1**：該時間點**無人獲得 Buy Box**
  - 可能原因：
    - 商品缺貨
    - 價格不符 Amazon 演算法要求
    - 所有賣家被暫時排除
  
- **-2**：該時間點**庫存無或賣家未識別**
  - 可能原因：
    - 商品完全下架
    - Keepa 無法辨識賣家 ID
    - 資料收集失敗

**範例**：
```python
buybox_history = product['buyBoxSellerIdHistory']
# [time1, "A1234567890", time2, -1, time3, -2, time4, "A9876543210", ...]

# 解析
for i in range(0, len(buybox_history), 2):
    time = buybox_history[i]
    seller_id = buybox_history[i+1]
    
    if isinstance(seller_id, str):
        print(f"{keepa_to_datetime(time)}: 賣家 {seller_id} 獲得 Buy Box")
    elif seller_id == -1:
        print(f"{keepa_to_datetime(time)}: 無人獲得 Buy Box")
    elif seller_id == -2:
        print(f"{keepa_to_datetime(time)}: 庫存無或賣家未識別")
```

**實務應用**：
```python
def analyze_buybox_competition(product):
    """分析 Buy Box 競爭情況"""
    history = product.get('buyBoxSellerIdHistory', [])
    if not history:
        return None
    
    stats = {
        'total_changes': len(history) // 2,
        'unique_sellers': set(),
        'no_buybox_count': 0,
        'unknown_count': 0
    }
    
    for i in range(1, len(history), 2):
        seller = history[i]
        if isinstance(seller, str):
            stats['unique_sellers'].add(seller)
        elif seller == -1:
            stats['no_buybox_count'] += 1
        elif seller == -2:
            stats['unknown_count'] += 1
    
    stats['unique_sellers'] = len(stats['unique_sellers'])
    stats['no_buybox_rate'] = stats['no_buybox_count'] / stats['total_changes']
    
    return stats

# 使用
stats = analyze_buybox_competition(product)
print(f"Buy Box 賣家數: {stats['unique_sellers']}")
print(f"無 Buy Box 比例: {stats['no_buybox_rate']:.1%}")
```

---

### availabilityAmazon 的特殊值

**出現位置**：`availabilityAmazon` 欄位

**完整值定義**：
- **-1**：Amazon 無報價（最常見的「無貨」狀態）
- **0**：有庫存，可立即購買
- **1**：預購（Pre-order）
- **2**：未知狀態
- **3**：缺貨（Out of Stock）
- **4**：延遲出貨（Delayed）

**使用範例**：
```python
availability_map = {
    -1: "無報價",
    0: "有庫存",
    1: "預購",
    2: "未知",
    3: "缺貨",
    4: "延遲出貨"
}

availability = product.get('availabilityAmazon', -1)
status = availability_map.get(availability, "未定義")
print(f"Amazon 可用性: {status}")

# 判斷是否可購買
def is_available_for_purchase(product):
    """判斷產品是否可購買"""
    availability = product.get('availabilityAmazon', -1)
    return availability in [0, 1, 4]  # 有庫存、預購、延遲出貨都算可購買
```

---

### 日期欄位的 -1 值

**出現位置**：`publicationDate`, `releaseDate`, `listedSince`

**意義**：
- `-1` = 日期未知或不適用
- `0` = 日期未知（部分欄位使用）

**範例**：
```python
pub_date = product.get('publicationDate', -1)
if pub_date > 0:
    # 解析日期（YYYYMMDD 或 YYYYMM 或 YYYY）
    date_str = str(pub_date)
    if len(date_str) == 8:  # YYYYMMDD
        year, month, day = date_str[:4], date_str[4:6], date_str[6:8]
        print(f"出版日期: {year}-{month}-{day}")
    elif len(date_str) == 6:  # YYYYMM
        year, month = date_str[:4], date_str[4:6]
        print(f"出版日期: {year}-{month}")
    else:  # YYYY
        print(f"出版年份: {date_str}")
else:
    print("出版日期未知")
```

---

### 數值欄位的 -1 值

**出現位置**：`numberOfItems`, `numberOfPages` 等

**意義**：
- `-1` = 該屬性不適用或未知
- 例如：非書籍商品的 `numberOfPages` 為 -1

**範例**：
```python
num_pages = product.get('numberOfPages', -1)
if num_pages > 0:
    print(f"頁數: {num_pages}")
else:
    print("非書籍商品或頁數未知")

num_items = product.get('numberOfItems', -1)
if num_items > 0:
    print(f"包裝數量: {num_items} 件")
else:
    print("單件商品或數量未知")
```

---

### condition 值定義（buyBoxUsedHistory）

**出現位置**：`buyBoxUsedHistory` 欄位

**格式**：`[keepaTime, sellerId, condition, isFBA, ...]`

**condition 值定義**：
- **2**：Like New（幾乎全新）
- **3**：Very Good（非常好）
- **4**：Good（良好）
- **5**：Acceptable（可接受）

**範例**：
```python
condition_map = {
    2: "Like New",
    3: "Very Good",
    4: "Good",
    5: "Acceptable"
}

used_history = product.get('buyBoxUsedHistory', [])
# [time1, sellerId1, 3, 1, time2, sellerId2, 4, 0, ...]

for i in range(0, len(used_history), 4):
    time = used_history[i]
    seller = used_history[i+1]
    condition = used_history[i+2]
    is_fba = used_history[i+3]
    
    condition_str = condition_map.get(condition, "Unknown")
    fba_str = "FBA" if is_fba == 1 else "FBM"
    
    print(f"{keepa_to_datetime(time)}: {seller} ({condition_str}, {fba_str})")
```

---

### 總結：特殊值快速查詢表

| 欄位類型                | 特殊值   | 意義                      | 常見欄位範例                                           |
| ------------------- | ----- | ----------------------- | ------------------------------------------------ |
| **價格欄位**            | `-1`  | 無此價格                    | csv[0-33], stats.current[0-33]                   |
| **Buy Box Seller** | `-1`  | 無人獲得 Buy Box            | buyBoxSellerIdHistory                            |
| **Buy Box Seller** | `-2`  | 庫存無或賣家未識別               | buyBoxSellerIdHistory                            |
| **Amazon 可用性**      | `-1`  | 無報價                     | availabilityAmazon                               |
| **Amazon 可用性**      | `0`   | 有庫存                     | availabilityAmazon                               |
| **Amazon 可用性**      | `1-4` | 預購/未知/缺貨/延遲出貨          | availabilityAmazon                               |
| **日期欄位**            | `-1`  | 日期未知                    | publicationDate, releaseDate, listedSince        |
| **數值欄位**            | `-1`  | 不適用或未知                  | numberOfItems, numberOfPages                     |
| **二手品 condition**   | `2-5` | Like New / Very Good / Good / Acceptable | buyBoxUsedHistory                                |
| **FBA 標記**          | `0`   | FBM（賣家出貨）              | buyBoxUsedHistory[i+3]                           |
| **FBA 標記**          | `1`   | FBA（Amazon 物流）         | buyBoxUsedHistory[i+3]                           |

---

**附錄 B 完成**
**最後更新**：2025-12-05

