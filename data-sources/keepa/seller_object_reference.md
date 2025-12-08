# Keepa Seller Object 實戰備忘錄 v1.0

> **文件目的**：完整解釋 Keepa API Seller Object 的結構、欄位意義、使用場景，特別是評分系統、Buy Box 統計、分類/品牌統計的關係。
>
> **⚠️ 重要聲明**：
> - 本文件僅說明 Seller Object 的資料結構和欄位意義
> - **API 使用方法、參數說明、查詢範例等請參考官方文檔**：
>   - 🔗 [Keepa API 官方文檔](https://keepa.com/#!api)
>   - 🔗 [Seller Query 官方說明](https://keepa.com/#!discuss/t/seller-information/1164)
>   - 🔗 [keepa Python API 文檔](https://keepaapi.readthedocs.io/)
> - 本文件不涵蓋 API 呼叫方法、Token 管理、錯誤處理等實作細節
>
> **關鍵發現**：
> - ✅ Amazon Seller Feedback 採用**三選一制度**（Positive=50 / Neutral=30 / Negative=10）
> - ✅ `currentRating` = `positiveRating` 最新值（正面評價百分比）
> - ✅ `csv[0]` = Seller rating 時間序列，`csv[1]` = Review count 時間序列
> - ✅ `recentFeedback` 固定回傳最新 5 筆評論
> - ✅ `sellerCategoryStatistics` 僅包含 **root category**（如 Health & Household）
>
> **資料來源**：
> - [Keepa 官方 Seller Object 文檔](https://keepa.com/#!discuss/t/seller-information/1164)
> - [keepa Python API Documentation](https://keepaapi.readthedocs.io/)
> - 實際專案 vault 資料驗證（392 sellers, ~120MB）

---

## 目錄

1. [Seller Object 整體結構](#1-seller-object-整體結構)
2. [賣家識別 & 基本資訊](#2-賣家識別--基本資訊)
3. [評分系統與歷史（Rating System）](#3-評分系統與歷史rating-system)
4. [Buy Box 統計](#4-buy-box-統計)
5. [CSV 歷史資料](#5-csv-歷史資料)
6. [近期評論（Recent Feedback）](#6-近期評論recent-feedback)
7. [分類統計（Category Statistics）](#7-分類統計category-statistics)
8. [品牌統計（Brand Statistics）](#8-品牌統計brand-statistics)
9. [店面產品數統計（totalStorefrontAsins & asinList）](#9-店面產品數統計)
10. [特殊值說明](#10-特殊值說明)
11. [實務應用範例](#11-實務應用範例)

---

## API 使用指南

### 官方資源連結

本文件專注於解釋 **Seller Object 的資料結構**。如需了解 **API 使用方法**，請參考以下官方資源：

#### Keepa 官方文檔
- **Seller Information**：https://keepa.com/#!discuss/t/seller-information/1164
  - Seller Object 定義
  - seller_query() 方法說明
  - storefront 參數用法

- **主要 API 文檔**：https://keepa.com/#!api
  - API 端點說明
  - Token 計費規則（seller_query: 8 tokens without storefront, 35 tokens with storefront）

#### Python API 使用
```python
import keepa

api = keepa.Keepa('YOUR_API_KEY_HERE')

# 查詢 seller profile（不含 storefront）
# 消耗：8 tokens/seller
sellers = api.seller_query(['A2L77EE7U53NWQ'], storefront=False)

# 查詢 seller profile + storefront ASIN 列表
# 消耗：35 tokens/seller
sellers = api.seller_query(['A2L77EE7U53NWQ'], storefront=True)
```

**重要**：
- `storefront=False`（預設）：僅回傳 seller profile（27 個欄位），消耗 8 tokens
- `storefront=True`：額外回傳該賣家店面的**完整 ASIN 列表**（可能數千個 ASIN），消耗 35 tokens

**storefront 參數的影響**：
- 當 `storefront=True` 時，回傳的 Seller Object 會**新增一個欄位**：
  - `asinList` (Array): 賣家店面所有產品的 ASIN 列表
  - 範例：`["B00ABC123", "B00DEF456", ...]`（可能數百到數萬個 ASIN）
- 當 `storefront=False` 時，僅回傳基本 27 個欄位，**不含** `asinList`
- `totalStorefrontAsins` 欄位在兩種模式都存在，但僅記錄**歷史數量變化**，不包含實際 ASIN

**使用建議**：
- 若只需賣家統計資料（評分、分類、品牌等），使用 `storefront=False` 節省 tokens
- 若需要取得賣家所有產品進行分析，使用 `storefront=True`（但要注意 token 消耗）

---

## 1. Seller Object 整體結構

### 簡化 JSON 結構（概念版）

```jsonc
{
  "A2L77EE7U53NWQ": {  // Key = Seller ID
    // 基本資訊
    "sellerId": "A2L77EE7U53NWQ",
    "sellerName": "Amazon.com",
    "businessName": "Amazon.com Services LLC",
    "address": ["410 Terry Ave N", "Seattle", "WA", "98109-5210", "US"],
    "domainId": 1,

    // 時間戳
    "trackedSince": "2011-01-01 00:00:00",
    "lastUpdate": "2025-11-27 03:20:00",
    "lastRatingUpdate": 7829000,

    // 當前評分（Amazon 三選一制度：Positive=50/Neutral=30/Negative=10）
    "currentRating": 95,              // 目前正面評價百分比（0-100）
    "currentRatingCount": 500000,     // 目前總評論數
    "ratingsLast30Days": 5000,        // 過去 30 天新增評論數

    // 評分分類歷史（時間序列陣列）
    "positiveRating": [time1, 95, time2, 94, ...],
    "neutralRating": [time1, 3, time2, 4, ...],
    "negativeRating": [time1, 2, time2, 2, ...],
    "ratingCount": [time1, 480000, time2, 490000, ...],

    // CSV 時間序列（更詳細的歷史）
    "csv": [
      [time1, rating1, time2, rating2, ...],  // csv[0]: Rating history
      [time1, count1, time2, count2, ...]     // csv[1]: Review count history
    ],

    // 近期 5 筆評論
    "recentFeedback": [
      {
        "date": 7374240,
        "feedback": "Great seller!",
        "isStriked": false,
        "rating": 50  // 50=Positive, 30=Neutral, 10=Negative
      },
      ...
    ],

    // Buy Box 統計
    "buyBoxNewOwnershipRate": 85,          // 新品 Buy Box 勝率（%）
    "buyBoxUsedOwnershipRate": 0,          // 二手品 Buy Box 勝率（%）
    "avgBuyBoxCompetitors": 2.5,           // 平均競爭者數

    // 分類統計（僅 root category）
    "sellerCategoryStatistics": [
      {
        "catId": 3760901,                   // Health & Household
        "productCount": 150,
        "productCountWithAmazonOffer": 50,
        "avg30SalesRank": 12500
      },
      ...
    ],

    // 品牌統計
    "sellerBrandStatistics": [
      {
        "brand": "Nature's Way",
        "productCount": 80,
        "productCountWithAmazonOffer": 20,
        "avg30SalesRank": 8500
      },
      ...
    ],

    // 店面統計
    "totalStorefrontAsins": [time, count, time, count, ...],

    // 店面 ASIN 列表（僅當 storefront=True 時存在）
    "asinList": ["B00ABC123", "B00DEF456", ...],  // 可能數千到數萬個 ASIN

    // 特殊標記
    "hasFBA": true,
    "isScammer": false,
    "shipsFromChina": false
  }
}
```

### Keepa Time 轉換

與 Product Object 相同：
```python
# Keepa Time → Unix milliseconds
unix_millis = (keepa_minutes + 21564000) * 60000

# Python datetime 轉換
from datetime import datetime

def keepa_to_datetime(keepa_minutes):
    unix_millis = (keepa_minutes + 21564000) * 60000
    return datetime.utcfromtimestamp(unix_millis / 1000)
```

---

## 2. 賣家識別 & 基本資訊

| 欄位             | 型別     | 說明                                                    |
| -------------- | ------ | ----------------------------------------------------- |
| `sellerId`     | String | Amazon 賣家 ID（唯一識別碼）                                   |
| `sellerName`   | String | 賣家名稱（店面顯示名稱）                                          |
| `businessName` | String | 企業正式名稱（可能與 sellerName 不同）                             |
| `address`      | List   | 賣家地址陣列：`[street, city, state, zip, country]`<br>可能為空陣列 |
| `domainId`     | Integer | Amazon 地區：1=com, 2=co.uk, 3=de 等                      |

### 時間戳欄位

| 欄位                 | 型別                  | 說明                                 |
| ------------------ | ------------------- | ---------------------------------- |
| `trackedSince`     | String (ISO format) | Keepa 開始追蹤此賣家的時間<br>格式：YYYY-MM-DD HH:MM:SS |
| `lastUpdate`       | String (ISO format) | Seller Object 最後更新時間              |
| `lastRatingUpdate` | Integer (Keepa Time) | 評分最後更新時間（Keepa minutes）           |

### 特殊標記

| 欄位               | 型別      | 說明                                        |
| ---------------- | ------- | ----------------------------------------- |
| `hasFBA`         | Boolean | 是否使用 Amazon FBA（Fulfillment by Amazon）   |
| `isScammer`      | Boolean | 是否被標記為詐騙賣家（Keepa 內部標記）                  |
| `shipsFromChina` | Boolean | 是否從中國出貨<br>**注意**：此欄位準確性依賴 Keepa 的啟發式判斷 |

---

## 3. 評分系統與歷史（Rating System）

### ⭐ Amazon Seller Feedback 三選一制度

**重要概念**：Amazon 賣家評分採用**三選一制度**，而非常見的五星制。

**三個選項**：
- **Positive** (正面評價) = 50
- **Neutral** (中立評價) = 30
- **Negative** (負面評價) = 10

**計算方式**：
```
Positive Rate (%) = (Positive 數量 / 總評論數) × 100
```

### 當前評分欄位

| 欄位                   | 型別      | 說明                                              |
| -------------------- | ------- | ----------------------------------------------- |
| `currentRating`      | Integer | **目前正面評價百分比**（0-100）<br>等於 `positiveRating` 的最新值 |
| `currentRatingCount` | Integer | 目前總評論數                                          |
| `ratingsLast30Days`  | Integer | 過去 30 天新增的評論數                                    |

### 評分分類歷史（時間序列陣列）

所有陣列格式：`[keepaTime, value, keepaTime, value, ...]`

| 欄位               | 型別         | 說明                                   |
| ---------------- | ---------- | ------------------------------------ |
| `positiveRating` | Integer[]  | 正面評價百分比歷史（0-100）<br>**注意**：值為列表或數字（Keepa API bug） |
| `neutralRating`  | Integer[]  | 中立評價百分比歷史（0-100）                    |
| `negativeRating` | Integer[]  | 負面評價百分比歷史（0-100）                    |
| `ratingCount`    | Integer[]  | 總評論數歷史                               |

**重要發現**：部分 Keepa API 回傳值為 **list** 而非 **scalar**，需要類型檢查：
```python
# 錯誤寫法（假設是 scalar）
current_rating = seller['currentRating']

# 正確寫法（檢查型別）
current_rating = seller['currentRating']
if isinstance(current_rating, list):
    current_rating = current_rating[-1]  # 取最後一個值
```

### 使用範例

```python
# 取得當前評分
current_rating = seller['currentRating']
if isinstance(current_rating, list):
    current_rating = current_rating[-1]

current_count = seller['currentRatingCount']
if isinstance(current_count, list):
    current_count = current_count[-1]

print(f"當前評分: {current_rating}% ({current_count} 評論)")

# 計算評分品質
if current_rating >= 95:
    quality = "優秀"
elif current_rating >= 90:
    quality = "良好"
elif current_rating >= 85:
    quality = "普通"
else:
    quality = "需注意"

print(f"評分品質: {quality}")

# 檢查活躍度
if seller['ratingsLast30Days'] >= 50:
    print("高活躍度賣家")
```

---

## 4. Buy Box 統計

| 欄位                        | 型別    | 說明                                                 |
| ------------------------- | ----- | -------------------------------------------------- |
| `buyBoxNewOwnershipRate`  | Integer/List | 新品 Buy Box 勝率（0-100）<br>表示該賣家獲得新品 Buy Box 的百分比     |
| `buyBoxUsedOwnershipRate` | Integer/List | 二手品 Buy Box 勝率（0-100）<br>表示該賣家獲得二手品 Buy Box 的百分比  |
| `avgBuyBoxCompetitors`    | Float/List   | 平均競爭者數<br>該賣家產品的 Buy Box 平均有幾個競爭者                |

**注意**：這些欄位可能是 **list** 或 **scalar**，需要類型檢查。

### 使用範例

```python
def get_buybox_stats(seller):
    """安全提取 Buy Box 統計"""
    stats = {}

    # 處理可能是 list 的欄位
    for key in ['buyBoxNewOwnershipRate', 'buyBoxUsedOwnershipRate', 'avgBuyBoxCompetitors']:
        value = seller.get(key)
        if isinstance(value, list) and len(value) > 0:
            stats[key] = value[-1]  # 取最後一個值
        else:
            stats[key] = value

    return stats

# 使用
stats = get_buybox_stats(seller)
print(f"新品 Buy Box 勝率: {stats['buyBoxNewOwnershipRate']}%")
print(f"平均競爭者: {stats['avgBuyBoxCompetitors']:.1f} 個")
```

---

## 5. CSV 歷史資料

### CSV 陣列結構

Seller Object 的 `csv` 包含 **2 個子陣列**：

| Index | 名稱                  | 格式  | 說明                                      |
| ----- | ------------------- | --- | --------------------------------------- |
| 0     | **Rating History**  | 二元組 | `[time, rating, time, rating, ...]`    |
| 1     | **Review Count History** | 二元組 | `[time, count, time, count, ...]`      |

**格式**：`[keepaTime, value, keepaTime, value, ...]`

### csv[0]: Rating History（評分歷史）

- **值範圍**：0-100（正面評價百分比）
- **用途**：繪製評分走勢圖、分析評分波動

```python
rating_history = seller['csv'][0]
times = [keepa_to_datetime(t) for t in rating_history[::2]]
ratings = rating_history[1::2]

import matplotlib.pyplot as plt
plt.plot(times, ratings)
plt.title('Seller Rating History')
plt.ylabel('Positive Rating (%)')
plt.ylim(0, 100)
plt.show()
```

### csv[1]: Review Count History（評論數歷史）

- **值範圍**：0 到數百萬（評論數）
- **用途**：分析評論增長速度、識別評論爆量時期

```python
review_history = seller['csv'][1]
times = [keepa_to_datetime(t) for t in review_history[::2]]
counts = review_history[1::2]

# 計算評論增長速度
growth_rate = (counts[-1] - counts[0]) / len(counts)
print(f"平均評論增長速度: {growth_rate:.1f} 評論/更新")
```

### 與其他欄位的關係

```
csv[0] 最後一個值 ≈ currentRating
csv[1] 最後一個值 ≈ currentRatingCount
```

**注意**：可能有輕微差異，因為更新時間不同。

---

## 6. 近期評論（Recent Feedback）

### recentFeedback 結構

**格式**：固定回傳 **最新 5 筆評論**（可能少於 5 筆）

```python
"recentFeedback": [
  {
    "date": 7374240,           # Keepa Time (minutes)
    "feedback": "Great!",      # 評論文字
    "isStriked": false,        # 是否被劃除（賣家申訴成功）
    "rating": 50               # 50=Positive, 30=Neutral, 10=Negative
  },
  ...
]
```

### 欄位說明

| 欄位         | 型別      | 說明                                                         |
| ---------- | ------- | ---------------------------------------------------------- |
| `date`     | Integer | 評論日期（Keepa Time minutes）                                   |
| `feedback` | String  | 評論文字內容                                                     |
| `isStriked` | Boolean | 是否被劃除<br>`true` = 賣家申訴成功，評論被劃線標記<br>`false` = 正常評論        |
| `rating`   | Integer | 評價類型：<br>**50** = Positive（正面）<br>**30** = Neutral（中立）<br>**10** = Negative（負面） |

### 使用範例

```python
def analyze_recent_feedback(seller):
    """分析最近 5 筆評論"""
    feedback_list = seller.get('recentFeedback', [])

    stats = {
        'total': len(feedback_list),
        'positive': 0,
        'neutral': 0,
        'negative': 0,
        'striked': 0
    }

    for fb in feedback_list:
        if fb['isStriked']:
            stats['striked'] += 1

        if fb['rating'] == 50:
            stats['positive'] += 1
        elif fb['rating'] == 30:
            stats['neutral'] += 1
        elif fb['rating'] == 10:
            stats['negative'] += 1

    return stats

# 使用
stats = analyze_recent_feedback(seller)
print(f"最近 5 筆評論: {stats['positive']} 正面, {stats['neutral']} 中立, {stats['negative']} 負面")
print(f"被劃除評論: {stats['striked']} 筆")
```

---

## 7. 分類統計（Category Statistics）

### ⚠️ 重要限制：僅包含 Root Category

`sellerCategoryStatistics` **僅包含 root category**，不包含子分類。

**常見 Root Categories**：
- 3760901: Health & Household
- 16310101: Grocery & Gourmet Food
- 3760911: Beauty & Personal Care

### sellerCategoryStatistics 結構

```python
"sellerCategoryStatistics": [
  {
    "catId": 3760901,                   # Category ID (root only)
    "productCount": 150,                # 該分類的產品數
    "productCountWithAmazonOffer": 50,  # 有 Amazon 競爭的產品數
    "avg30SalesRank": 12500             # 過去 30 天平均銷售排名
  },
  ...
]
```

### 欄位說明

| 欄位                              | 型別      | 說明                                   |
| ------------------------------- | ------- | ------------------------------------ |
| `catId`                         | Integer | Amazon 分類 ID（**僅 root category**）   |
| `productCount`                  | Integer | 該賣家在此分類的產品數量                         |
| `productCountWithAmazonOffer`   | Integer | 有 Amazon 自營競爭的產品數量                   |
| `avg30SalesRank`                | Integer | 過去 30 天該分類產品的平均銷售排名<br>**值越小 = 銷量越好** |

### 使用範例

```python
def calculate_supplement_ratio(seller):
    """計算營養保健品占比（啟發式演算法）"""
    category_stats = seller.get('sellerCategoryStatistics', [])

    # 定義 supplement 相關分類（root category only）
    supplement_categories = {
        3760901,     # Health & Household
        16310101,    # Grocery & Gourmet Food
        3760911,     # Beauty & Personal Care
        165796011    # Health & Personal Care
    }

    total_products = 0
    supplement_products = 0

    for stat in category_stats:
        cat_id = stat['catId']
        count = stat['productCount']

        total_products += count

        if cat_id in supplement_categories:
            supplement_products += count

    if total_products == 0:
        return 0.0

    return supplement_products / total_products

# 使用
ratio = calculate_supplement_ratio(seller)
print(f"營養保健品占比: {ratio:.1%}")
```

---

## 8. 品牌統計（Brand Statistics）

### sellerBrandStatistics 結構

```python
"sellerBrandStatistics": [
  {
    "brand": "Nature's Way",           # 品牌名稱
    "productCount": 80,                # 該品牌的產品數
    "productCountWithAmazonOffer": 20, # 有 Amazon 競爭的產品數
    "avg30SalesRank": 8500             # 過去 30 天平均銷售排名
  },
  ...
]
```

### 欄位說明

| 欄位                              | 型別      | 說明                             |
| ------------------------------- | ------- | ------------------------------ |
| `brand`                         | String  | 品牌名稱                           |
| `productCount`                  | Integer | 該賣家銷售此品牌的產品數量                  |
| `productCountWithAmazonOffer`   | Integer | 有 Amazon 自營競爭的產品數量             |
| `avg30SalesRank`                | Integer | 過去 30 天該品牌產品的平均銷售排名<br>值越小 = 銷量越好 |

### 使用範例

```python
def get_top_brands(seller, top_n=5):
    """取得賣家的 Top N 品牌"""
    brand_stats = seller.get('sellerBrandStatistics', [])

    # 依產品數排序
    sorted_brands = sorted(brand_stats,
                          key=lambda x: x['productCount'],
                          reverse=True)

    return sorted_brands[:top_n]

# 使用
top_brands = get_top_brands(seller, top_n=5)
for i, brand in enumerate(top_brands, 1):
    print(f"{i}. {brand['brand']}: {brand['productCount']} 產品")
    print(f"   平均排名: {brand['avg30SalesRank']}")
```

---

## 9. 店面產品數統計

### 兩種店面資料欄位

| 欄位                   | 格式           | 條件                      | 說明                        |
| -------------------- | ------------ | ----------------------- | ------------------------- |
| `totalStorefrontAsins` | 時間序列陣列       | 永遠存在                    | 產品數量歷史變化（不含實際 ASIN）       |
| `asinList`           | String Array | 僅當 `storefront=True` 時存在 | 店面所有產品的完整 ASIN 列表（當前快照）   |

### totalStorefrontAsins 結構

**格式**：時間序列陣列 `[keepaTime, count, keepaTime, count, ...]`

```python
"totalStorefrontAsins": [
  7764786, 2,      # 時間點 7764786: 2 個產品
  7829000, 150,    # 時間點 7829000: 150 個產品
  ...
]
```

**用途**：
- 追蹤賣家店面產品數量變化
- 識別賣家擴張或縮減規模
- 分析產品上架/下架趨勢

### asinList 欄位（storefront=True 專用）

**格式**：String Array `["B00ABC123", "B00DEF456", ...]`

```python
"asinList": [
  "B00ABC123",
  "B00DEF456",
  "B00GHI789",
  ...
]
```

**特性**：
- 僅當 API 呼叫時使用 `storefront=True` 才會存在此欄位
- 包含賣家店面**當前時刻**的所有產品 ASIN
- 可能數百到數萬個 ASIN（取決於賣家規模）
- **不含歷史資料**，僅為快照（與 totalStorefrontAsins 的時間序列不同）

**Token 成本**：
- `storefront=False`（無 asinList）：8 tokens
- `storefront=True`（含 asinList）：35 tokens

**用途**：
- 取得賣家所有產品進行批次分析
- 建立賣家產品目錄
- 與產品資料庫交叉比對（如 DSLD 資料庫）
- 分析賣家產品組合和品牌分佈

### 使用範例

```python
def analyze_storefront_growth(seller):
    """分析店面產品數增長趨勢"""
    storefront_history = seller.get('totalStorefrontAsins', [])

    if len(storefront_history) < 4:  # 至少需要 2 個時間點
        return None

    times = storefront_history[::2]
    counts = storefront_history[1::2]

    # 計算增長率
    initial_count = counts[0]
    current_count = counts[-1]
    growth_rate = (current_count - initial_count) / initial_count * 100

    # 計算平均增長速度
    time_span_days = (times[-1] - times[0]) * 60 / (60 * 24)  # Keepa minutes to days
    avg_daily_growth = (current_count - initial_count) / time_span_days

    return {
        'initial': initial_count,
        'current': current_count,
        'growth_rate': growth_rate,
        'avg_daily_growth': avg_daily_growth
    }

# 使用
growth = analyze_storefront_growth(seller)
if growth:
    print(f"初始產品數: {growth['initial']}")
    print(f"當前產品數: {growth['current']}")
    print(f"增長率: {growth['growth_rate']:.1f}%")
    print(f"平均每日增長: {growth['avg_daily_growth']:.1f} 產品")
```

---

## 10. 特殊值說明

### None 值

大部分欄位在缺少資料時為 `None`：
- `address`: 可能為空陣列 `[]`
- `businessName`: 可能為 `None`
- `sellerCategoryStatistics`: 可能為空陣列 `[]`
- `sellerBrandStatistics`: 可能為空陣列 `[]`

### List vs Scalar 問題

**Keepa API 類型不一致問題**：部分欄位可能回傳 **list** 而非 **scalar**。

**受影響欄位**：
- `totalStorefrontAsins`
- `currentRating`
- `currentRatingCount`
- `negativeRating`
- `buyBoxNewOwnershipRate`
- `buyBoxUsedOwnershipRate`
- `avgBuyBoxCompetitors`
- `ratingsLast30Days`

**安全處理方式**：
```python
def safe_get_value(data, key, default=0):
    """安全取得可能是 list 的值"""
    value = data.get(key, default)

    if isinstance(value, list):
        if len(value) > 0:
            return value[-1]  # 取最後一個值（最新）
        else:
            return default

    return value if value is not None else default

# 使用
current_rating = safe_get_value(seller, 'currentRating')
current_count = safe_get_value(seller, 'currentRatingCount')
```

---

## 11. 實務應用範例

### 範例 1：賣家品質評分系統

```python
def calculate_seller_quality_score(seller):
    """計算賣家品質評分（0-100）"""
    score = 0

    # 1. 評分品質（40 分）
    rating = safe_get_value(seller, 'currentRating')
    if rating >= 95:
        score += 40
    elif rating >= 90:
        score += 30
    elif rating >= 85:
        score += 20
    else:
        score += 10

    # 2. 評論數量（20 分）
    rating_count = safe_get_value(seller, 'currentRatingCount')
    if rating_count >= 10000:
        score += 20
    elif rating_count >= 5000:
        score += 15
    elif rating_count >= 1000:
        score += 10
    else:
        score += 5

    # 3. 活躍度（20 分）
    recent_ratings = safe_get_value(seller, 'ratingsLast30Days')
    if recent_ratings >= 50:
        score += 20
    elif recent_ratings >= 20:
        score += 15
    elif recent_ratings >= 10:
        score += 10
    else:
        score += 5

    # 4. FBA 使用（10 分）
    if seller.get('hasFBA'):
        score += 10

    # 5. 非詐騙且非中國出貨（10 分）
    if not seller.get('isScammer') and not seller.get('shipsFromChina'):
        score += 10

    return score

# 使用
score = calculate_seller_quality_score(seller)
print(f"賣家品質評分: {score}/100")
```

### 範例 2：識別 Supplement 專業賣家

```python
def is_supplement_specialist(seller, min_ratio=0.8, min_products=100):
    """判斷是否為營養保健品專業賣家"""
    # 計算 supplement 占比
    category_stats = seller.get('sellerCategoryStatistics', [])

    supplement_categories = {3760901, 16310101, 3760911}
    total = sum(stat['productCount'] for stat in category_stats)
    supplement = sum(stat['productCount'] for stat in category_stats
                    if stat['catId'] in supplement_categories)

    if total == 0:
        return False

    ratio = supplement / total

    # 檢查產品數
    storefront = seller.get('totalStorefrontAsins', [])
    if storefront:
        current_products = storefront[-1]
    else:
        current_products = 0

    # 判斷
    return ratio >= min_ratio and current_products >= min_products

# 使用
if is_supplement_specialist(seller):
    print("✅ 營養保健品專業賣家")
else:
    print("❌ 非專業賣家")
```

### 範例 3：競爭力分析

```python
def analyze_competitiveness(seller):
    """分析賣家競爭力"""
    analysis = {}

    # Buy Box 勝率
    bb_new = safe_get_value(seller, 'buyBoxNewOwnershipRate')
    bb_used = safe_get_value(seller, 'buyBoxUsedOwnershipRate')

    analysis['buybox_strength'] = {
        'new_rate': bb_new,
        'used_rate': bb_used,
        'overall': (bb_new + bb_used) / 2
    }

    # 平均競爭者數
    avg_competitors = safe_get_value(seller, 'avgBuyBoxCompetitors')
    analysis['competition_level'] = avg_competitors

    # Amazon 競爭壓力
    category_stats = seller.get('sellerCategoryStatistics', [])
    total_products = sum(s['productCount'] for s in category_stats)
    amazon_competition = sum(s['productCountWithAmazonOffer'] for s in category_stats)

    if total_products > 0:
        analysis['amazon_competition_rate'] = amazon_competition / total_products
    else:
        analysis['amazon_competition_rate'] = 0

    # 評估競爭力
    if bb_new >= 80 and avg_competitors <= 3:
        analysis['competitiveness'] = 'High'
    elif bb_new >= 50 and avg_competitors <= 5:
        analysis['competitiveness'] = 'Medium'
    else:
        analysis['competitiveness'] = 'Low'

    return analysis

# 使用
comp = analyze_competitiveness(seller)
print(f"Buy Box 勝率: {comp['buybox_strength']['new_rate']}%")
print(f"平均競爭者: {comp['competition_level']:.1f}")
print(f"Amazon 競爭率: {comp['amazon_competition_rate']:.1%}")
print(f"競爭力評級: {comp['competitiveness']}")
```

---

## 參考資料

### 官方文檔（必讀）

#### Keepa 官方資源
1. **[Keepa API 主頁](https://keepa.com/#!api)** ⭐
   - API 使用說明、Token 計費、速率限制
   - Seller Query: 8 tokens (without storefront), 35 tokens (with storefront)

2. **[Seller Information](https://keepa.com/#!discuss/t/seller-information/1164)** ⭐
   - Seller Object 完整定義
   - 本文件的主要參考來源

3. **[Keepa 討論區](https://keepa.com/#!discuss)**
   - 社群問答
   - 最新功能更新

#### Python API 包裝器
4. **[keepa Python API GitHub](https://github.com/akaszynski/keepa)** ⭐
   - 原始碼和範例
   - Issue 追蹤

5. **[keepa Python API 文檔](https://keepaapi.readthedocs.io/)** ⭐
   - 完整 API 使用說明
   - seller_query() 方法文檔

6. **[PyPI - keepa 套件](https://pypi.org/project/keepa/)**
   - 安裝說明和版本歷史

#### 其他資源
7. **[Keepa API 狀態頁面](https://keepaapi.statuspage.io/)**
   - 即時服務狀態監控

8. **專案實際資料驗證**
   - vault/keepa/seller/profile/20251127 (392 sellers, ~120MB)
   - 完整測試：5 sellers 查詢成功（16 秒，40 tokens，100% 成功率）

### 重要提醒

> **⚠️ API 使用方法請務必參考官方文檔**
>
> 本文件僅解釋 Seller Object 的資料結構，不涵蓋：
> - API 呼叫方法和參數
> - Token 管理和計費規則
> - 錯誤處理和重試機制
> - 速率限制處理
>
> 以上內容請參考：
> - 🔗 https://keepa.com/#!api
> - 🔗 https://keepa.com/#!discuss/t/seller-information/1164
> - 🔗 https://keepaapi.readthedocs.io/

---

## 快速查詢表

### 評分系統

| 類型       | 值  | 說明      |
| -------- | -- | ------- |
| Positive | 50 | 正面評價    |
| Neutral  | 30 | 中立評價    |
| Negative | 10 | 負面評價    |

### 評分品質指標

| 正面評價百分比    | 品質等級 |
| ---------- | ---- |
| ≥ 95%      | 優秀   |
| 90% - 95%  | 良好   |
| 85% - 90%  | 普通   |
| < 85%      | 需注意  |

### 常見 Root Categories

| Category ID | 名稱                             |
| ----------- | ------------------------------ |
| 3760901     | Health & Household             |
| 16310101    | Grocery & Gourmet Food         |
| 3760911     | Beauty & Personal Care         |
| 165796011   | Health & Personal Care         |

### Token 成本 & Storefront 參數

| 查詢類型              | storefront 參數 | Token 成本 | 回傳 asinList |
| ----------------- | ------------- | -------- | ----------- |
| seller_query (基本)  | False（預設）    | 8        | ❌           |
| seller_query (完整)  | True          | 35       | ✅（可能數千到數萬個）|

**建議**：
- 僅需統計資料 → `storefront=False`（節省 27 tokens）
- 需要產品列表 → `storefront=True`（取得完整 ASIN list）

---

**文件版本**：v1.0
**建立日期**：2025-12-05
**維護者**：LuminNexus-AtlasVault-DSLD Keepa 團隊
**相關文件**：
- [Keepa Product Object 參考文件](./keepa_product_object_reference_v2.md)
- [Seller Analysis Stage 2 實作](../docs/asin_enrichment/20251128_stage2_seller_filtering_and_storefront_query.md)
