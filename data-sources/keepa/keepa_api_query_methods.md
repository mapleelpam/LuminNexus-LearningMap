# Keepa API 查詢方法完整參考

**文件類型**: API 方法參考
**最後更新**: 2025-12-08
**適用專案**: LuminNexus-AtlasVault-Keepa

---

## 目錄

1. [API 速率配置](#api-速率配置)
2. [核心查詢方法](#核心查詢方法)
3. [Token 成本總覽](#token-成本總覽)
4. [成本優化策略](#成本優化策略)
5. [實務應用案例](#實務應用案例)
6. [參考資源](#參考資源)

---

## API 速率配置

### 專案速率設定

**AtlasVault-Keepa 配置**:
```json
{
  "api": {
    "rate_limit_per_minute": 60,
    "delay_between_requests_ms": 1000
  }
}
```

### 速率策略

- **Token 限制**: 60 tokens/minute（Keepa API 標準配額）
- **請求間隔**: 1 秒/request（建議值）
- **消耗策略**: 快速消耗 token，用完等待 refill
- **適用場景**: 大批量資料收集（數萬筆查詢）

### 速率計算範例

| 查詢類型 | Token/查詢 | 每分鐘查詢數 | 每小時查詢數 |
|---------|-----------|-------------|------------|
| 基礎 query | 1 | 60 | 3,600 |
| query (buybox) | 3 | 20 | 1,200 |
| seller_query (basic) | 8 | 7.5 | 450 |
| seller_query (storefront) | 35 | 1.7 | 102 |
| best_sellers_query | 50 | 1.2 | 72 |

---

## 核心查詢方法

### 1. query() - 產品查詢

**用途**: 查詢 Amazon 產品資訊（支援 ASIN、UPC、EAN、ISBN-13）

#### 基本語法

```python
import keepa

api = keepa.Keepa("YOUR_API_KEY")

# 單一產品查詢（ASIN）
products = api.query(
    'B00ABC123',
    domain='US'
)

# UPC 查詢
products = api.query(
    '012345678905',
    product_code_is_asin=False,
    domain='US'
)

# 批次查詢
asins = ['B00ABC123', 'B00ABC124', 'B00ABC125']
products = api.query(asins, domain='US')
```

#### 核心參數

| 參數 | 類型 | 預設值 | 說明 | Token 成本 |
|-----|------|-------|------|-----------|
| `items` | str/list | 必填 | ASIN、UPC、EAN 或 ISBN-13 | - |
| `domain` | str | 'US' | Amazon 市場代碼 | - |
| `product_code_is_asin` | bool | True | False 時為 UPC/EAN 查詢 | - |
| `buybox` | bool | False | 買家框歷史與統計 | **+2 tokens** |
| `stats` | int | None | 統計天數（如 365） | 0 tokens |
| `rating` | bool | False | 評分和評論數歷史 | 0 tokens |
| `offers` | int | None | 第三方賣家報價數量 | +1 token/20 offers |
| `update` | int | None | 強制更新資料（0~1） | 視情況 |
| `history` | bool | True | 包含價格歷史資料 | 0 tokens |
| `stock` | bool | False | 庫存狀態 | 0 tokens |
| `to_datetime` | bool | False | 時間戳轉換為 datetime | - |
| `wait` | bool | True | 自動處理速率限制 | - |

#### Token 成本計算

- **基礎查詢**: 1 token/產品
- **含 buybox**: 3 tokens/產品（1 基礎 + 2 buybox）
- **含 offers**: 1 + (offers_count / 20) tokens/產品
- **stats/rating/history/stock**: 不額外消耗 token

#### 回傳資料結構

> **參考文件**:
> - [product_object_reference.md](./product_object_reference.md) - 完整欄位說明
> - [官方文件](https://keepaapi.readthedocs.io/en/latest/product_query.html) - Keepa 官方參考

**關鍵欄位**（常用）:
- `asin`, `title`, `brand`, `manufacturer` - 基本資訊
- `csv[]` - 價格歷史陣列（csv[0]=AMAZON, csv[1]=NEW, csv[16]=RATING, csv[17]=COUNT_REVIEWS）
- `availabilityAmazon` - 當前 1P 狀態（-1=無報價, 0=有庫存, 1=預購, 3=缺貨）
- `buyBoxSellerIdHistory` - 買家框賣家歷史（buybox=True 時）
- `buyBoxStats` - 買家框統計（buybox=True 時）
- `stats` - 統計資料（stats=365 時）
- `variationCSV`, `variations` - 變體資訊
- `categoryTree` - 分類路徑

#### 專案應用範例

```python
# AtlasVault-Keepa Stage 2: UPC → ASIN 映射
products = api.query(
    upc_clean,
    product_code_is_asin=False,  # UPC 查詢
    domain='US',
    buybox=True,                 # 取得賣家歷史 (+2 tokens)
    stats=365,                   # 取得統計資料 (0 tokens)
    rating=True                  # 取得評論資料 (0 tokens)
)
# 總消耗: 3 tokens/UPC
```

---

### 2. product_finder() - 產品搜尋

**用途**: 根據條件搜尋產品 ASIN（品牌、評論數、價格等）

#### 基本語法

```python
# 搜尋特定品牌有評論的產品
product_parms = {
    'brand': 'NOW Foods',
    'current_COUNT_REVIEWS_gte': 1  # 至少 1 則評論
}

asins = api.product_finder(
    product_parms,
    domain='US',
    n_products=100  # 單次返回上限（1-100）
)
# 返回: ['B00ABC123', 'B00ABC124', ...]
```

#### 常用搜尋參數

| 參數 | 說明 | 範例 |
|-----|------|------|
| `brand` | 品牌名稱（完整匹配） | `'NOW Foods'` |
| `current_COUNT_REVIEWS_gte` | 累積評論數 >= | `1` |
| `current_COUNT_REVIEWS_lte` | 累積評論數 <= | `1000` |
| `avg180_COUNT_REVIEWS_gte` | 180 天平均評論數 >= | `10` |
| `current_AMAZON_gte` | Amazon 價格 >= | `1000` (cents) |
| `current_AMAZON_lte` | Amazon 價格 <= | `5000` |
| `current_RATING_gte` | 評分 >= | `40` (4.0 stars) |
| `rootCategory` | 根分類 ID | `3760901` |

#### 參數命名規則

- **前綴**:
  - `current_`: 當前值
  - `avg{N}_`: N 天平均值（7/30/90/180/365）
  - `min{N}_`: N 天最小值
  - `max{N}_`: N 天最大值
- **後綴**:
  - `_gte`: 大於等於（Greater Than or Equal）
  - `_lte`: 小於等於（Less Than or Equal）

#### Token 成本

- **固定成本**: 2 tokens/查詢（與返回結果數量無關）
- **適用場景**: 品牌級搜尋（一次獲得所有 ASIN）
- **優勢**: 比逐個查詢節省大量 token

#### 專案應用範例

```python
# Brand Review Finder: 過濾無評論產品（節省 29% tokens）
product_parms = {
    'brand': 'NOW Foods',
    'current_COUNT_REVIEWS_gte': 1
}

asins = api.product_finder(product_parms, domain='US', n_products=100)
# Token 消耗: 2 tokens（不論返回多少 ASIN）
```

---

### 3. best_sellers_query() - Best Sellers 查詢

**用途**: 取得特定分類的 Best Sellers ASIN 列表

#### 基本語法

```python
# 查詢特定分類的 Best Sellers
asins = api.best_sellers_query(
    '3760901',  # Category ID
    domain='US'
)
# 返回: ['B00ABC123', 'B00ABC124', ...] (通常 100 個)
```

#### Token 成本

- **實測成本**: **50 tokens/查詢**
  - ⚠️ 注意：遠高於文件標示的 1-5 tokens
  - 基於 AtlasVault-Keepa 專案實測數據（2025-11-14）
- **獨立於返回數量**: 不論返回多少 ASIN，固定消耗 50 tokens

#### 執行規模估算

```python
# 範例：查詢 131 個營養保健食品分類
categories = 131
token_cost = 131 * 50 = 6,550 tokens
execution_time = 6,550 / 60 ≈ 109 分鐘（約 1.8 小時）
```

#### 專案應用範例

```python
# AtlasVault-Keepa Best Sellers 模組
asins = api.best_sellers_query('3760901', domain='US')
# 實際成本: 50 tokens
# 結果: ~100 個 Best Seller ASIN
```

---

### 4. seller_query() - Seller 查詢

**用途**: 查詢 Seller Profile 和店面產品列表

#### 基本語法

```python
# 基本 Profile 查詢（不含 asinList）
seller = api.seller_query(
    'A2L77EE7U53NWQ',  # Seller ID
    domain='US',
    storefront=False,   # False: 只查 profile
    to_datetime=True,   # 時間戳轉換為 datetime
    wait=True           # 自動處理速率限制
)

# 店面查詢（含 asinList）
seller_full = api.seller_query(
    'A2L77EE7U53NWQ',
    domain='US',
    storefront=True,    # True: 包含 asinList
    to_datetime=True,
    wait=True
)
```

#### 參數說明

| 參數 | 類型 | 預設值 | 說明 |
|-----|------|-------|------|
| `seller_id` | str | 必填 | Seller ID（可逗號分隔批次，上限 100） |
| `domain` | str | 'US' | Amazon 市場 |
| `storefront` | bool | False | True 時包含店面產品列表 |
| `to_datetime` | bool | False | 轉換時間戳為 datetime 物件 |
| `wait` | bool | True | 自動處理 API 速率限制 |

#### Token 成本

| 模式 | Token 成本 | 說明 |
|-----|-----------|------|
| `storefront=False` | **8 tokens** | 僅基本 profile（27 個欄位） |
| `storefront=True` | **35 tokens** | 完整 profile + asinList |

#### 回傳資料結構

> **參考文件**:
> - [seller_object_reference.md](./seller_object_reference.md) - 完整欄位說明
> - [官方文件](https://keepaapi.readthedocs.io/en/stable/api_methods.html#seller-query) - Keepa 官方參考

**關鍵欄位分類**:
- **核心身份**: `sellerId`, `sellerName`, `businessName`, `address`
- **評價系統**: `currentRating`, `currentRatingCount`, `ratingsLast30Days`, `positiveRating[]`, `negativeRating[]`
- **店面統計**: `totalStorefrontAsins`, `asinList[]`（storefront=True 時）
- **分類統計**: `sellerCategoryStatistics[]`（包含 catId, productCount, avg30SalesRank）
- **競爭力指標**: `isScammer`, `hasFBA`, `shipsFromChina`, `buyBoxNewOwnershipRate`

#### 評價系統說明

Amazon Seller Feedback 採用**三選一制度**（非 5 星制）：

- **Positive (50)**: 正面評價
- **Neutral (30)**: 中立評價
- **Negative (10)**: 負面評價

**currentRating 計算**:
- `currentRating` = `positiveRating` 百分比（0-100）
- 例如: 94 = 94% 正面評價
- 星級轉換: `currentRating / 20`（94 → 4.7 stars）

#### 專案應用範例

```python
# Seller Analysis Stage 1: 基本 Profile 查詢
result = api.seller_query(
    seller_id,
    domain='US',
    storefront=False,  # 8 tokens
    to_datetime=True
)

# Seller Analysis Stage 2: 篩選後店面查詢
result = api.seller_query(
    seller_id,
    domain='US',
    storefront=True,   # 35 tokens
    wait=True
)
```

---

### 5. deals() - 促銷查詢

**用途**: 查找最近變動且符合條件的產品促銷

#### 基本語法

```python
# 查詢促銷產品
deal_parms = {
    'page': 0,
    'domainId': 1,              # US
    'isLowest': True,           # 當前為歷史最低價
    'isLowestOffer': True,      # 當前報價為最低
    'isOutOfStock': False       # 有庫存
}

deals = api.deals(deal_parms, domain='US')
# 返回: 最多 150 個產品
```

#### 常用參數

| 參數 | 說明 |
|-----|------|
| `isLowest` | 當前價格為歷史最低 |
| `isLowestOffer` | 當前報價為所有賣家最低 |
| `isOutOfStock` | 是否缺貨 |
| `isPrimeExclusive` | Prime 會員專屬 |
| `isSalesRankIncreasing` | 銷售排名上升中 |
| `rootCategory` | 指定根分類 |

#### Token 成本

- **成本**: 視返回產品數而定，類似 query() 方法
- **上限**: 單次最多返回 150 個產品

---

### 6. search_for_categories() - 分類搜尋

**用途**: 搜尋 Amazon 分類

#### 基本語法

```python
# 搜尋分類
categories = api.search_for_categories('Vitamins', domain='US')

for cat in categories:
    print(f"{cat['catId']}: {cat['name']} ({cat['productCount']:,} products)")
```

#### Token 成本

- **成本**: 極低（通常 < 1 token）
- **用途**: 分類探索、ID 查找

---

### 7. category_lookup() - 分類查找

**用途**: 根據 Category ID 取得完整分類樹路徑

#### 基本語法

```python
# 查找分類完整路徑
category = api.category_lookup(3760901, domain='US')

# 返回: 從根分類到目標分類的完整路徑
print(category['contextFreeName'])  # "Health & Household"
print(category['catIdPath'])        # [0, 3760901]
print(category['nameList'])         # ['All Departments', 'Health & Household']
```

#### Token 成本

- **成本**: 極低
- **快取**: 分類資訊變動少，建議本地快取

---

## Token 成本總覽

### 查詢方法成本對照表

| 方法 | Token 成本 | 說明 | 備註 |
|-----|-----------|------|------|
| `query()` | 1 | 基礎產品查詢 | - |
| `query(buybox=True)` | 3 | 產品查詢 + 買家框資料 | 專案標準配置 |
| `query(offers=20)` | 2 | 產品查詢 + 20 個第三方報價 | - |
| `product_finder()` | 2 | 品牌/條件搜尋 | 固定成本 |
| `best_sellers_query()` | **50** | Best Sellers 查詢 | 實測值 ⚠️ |
| `seller_query(storefront=False)` | 8 | Seller Profile | - |
| `seller_query(storefront=True)` | 35 | Seller Profile + ASIN List | - |
| `deals()` | 變動 | 依返回產品數 | - |
| `search_for_categories()` | < 1 | 分類搜尋 | - |
| `category_lookup()` | < 1 | 分類查找 | - |

---

## 成本優化策略

### 1. 使用 product_finder() 代替多次 query()

```python
# ❌ 差: 查詢 100 個品牌產品
for asin in asins:  # 假設 100 個 ASIN
    api.query(asin)  # 100 tokens

# ✅ 好: 使用 product_finder
api.product_finder({'brand': 'NOW Foods'})  # 2 tokens
```

**節省**: 98 tokens（98%）

### 2. 批次查詢優於單一查詢

```python
# ❌ 差: 逐個查詢
for asin in asins:
    api.query(asin)  # N tokens + N 次網路請求

# ✅ 好: 批次查詢
api.query(asins)  # N tokens + 1 次網路請求
```

**優勢**: Token 相同但執行更快

### 3. 善用 stats 參數取代多次查詢

```python
# ❌ 差: 分開查詢歷史和統計
products = api.query(asin, history=True)
stats = api.query(asin, stats=365)  # 2 tokens

# ✅ 好: 一次取得
products = api.query(asin, history=True, stats=365, rating=True)  # 1 token
```

**節省**: 1 token（50%）

### 4. 使用斷點續傳避免重複查詢

```python
import os

# 檢查檔案是否存在
if os.path.exists(f"vault/keepa/by_asin/20251118/{asin}.json"):
    continue  # 跳過已查詢的 ASIN

# 否則才查詢
products = api.query(asin)
```

**優勢**: 避免重複消耗 token

---

## 實務應用案例

### 案例 1: UPC → ASIN 映射（Stage 2）

**需求**: 將 168,255 個 UPC 映射為 Amazon ASIN

**實作**:
```python
products = api.query(
    upc_clean,
    product_code_is_asin=False,
    domain='US',
    buybox=True,
    stats=365,
    rating=True
)
```

**成本**:
- Token: 3 tokens/UPC × 168,255 = 504,765 tokens
- 時間: 504,765 ÷ 60 = 8,412 分鐘 ≈ 140 小時

**優化**: 使用 UPC 群組減少 49.1% 查詢次數

---

### 案例 2: Best Sellers ASIN 收集

**需求**: 收集營養保健食品分類的 Best Sellers ASIN

**Phase 0 - 取得 ASIN 列表**:
```python
asins = api.best_sellers_query('3760901', domain='US')
```

**Phase 0 成本**:
- 查詢 49 個分類 × 50 tokens = 2,450 tokens
- 取得 65,861 個 ASIN（去重後 55,139 個）

**Phase 1 - 查詢 ASIN 詳細資料**:
```python
products = api.query(asins, buybox=True, stats=365, rating=True)
```

**Phase 1 成本**:
- 55,139 ASIN × 3 tokens = 165,417 tokens
- 執行時間: 約 46 小時

---

### 案例 3: Seller 分析（兩階段策略）

**需求**: 篩選優質營養保健食品賣家

**Stage 1 - Profile 收集**:
```python
# 從 392 個 seller 收集基本 profile
result = api.seller_query(seller_id, storefront=False)
```

**Stage 1 成本**:
- 392 sellers × 8 tokens = 3,136 tokens
- 執行時間: 約 52 分鐘

**Stage 2 - 篩選後店面查詢**:
```python
# 篩選出 50 個優質 seller 後查詢店面
result = api.seller_query(seller_id, storefront=True)
```

**Stage 2 成本**:
- 50 sellers × 35 tokens = 1,750 tokens
- 執行時間: 約 29 分鐘

**總節省**: 相較於直接查詢 392 × 35 = 13,720 tokens，節省 9,834 tokens（72%）

---

### 案例 4: 品牌評論聚合

**需求**: 聚合 Top 50 品牌的產品評論資料

**Finder 階段**:
```python
product_parms = {
    'brand': 'NOW Foods',
    'current_COUNT_REVIEWS_gte': 1
}
asins = api.product_finder(product_parms, domain='US')
```

**Finder 成本**: 50 品牌 × 2 tokens = 100 tokens

**Query 階段**:
```python
products = api.query(asins, stats=365, rating=True)
```

**Query 成本**: 5,000 ASIN × 1 token = 5,000 tokens

**總成本**: 5,100 tokens（約 85 分鐘）

**優化效益**: 過濾無評論產品，節省 29% token

---

## 參考資源

### 官方文件

- **Keepa API Documentation**: https://keepa.com/#!api
- **Product Query Reference**: https://keepaapi.readthedocs.io/en/latest/product_query.html
- **API Methods Reference**: https://keepaapi.readthedocs.io/en/stable/api_methods.html
- **Python Keepa Library**: https://keepaapi.readthedocs.io/
- **GitHub Repository**: https://github.com/akaszynski/keepa

### Learning Map 相關文件

- [product_object_reference.md](./product_object_reference.md) - Product 物件完整欄位說明
- [seller_object_reference.md](./seller_object_reference.md) - Seller 物件完整欄位說明
- [amazon_concepts_guide.md](./amazon_concepts_guide.md) - Amazon 概念指南

### AtlasVault-Keepa 專案文件

- `docs/20250912_three_stage_programs_technical_guide.md` - Stage 1-3 技術指南
- `docs/20251114_bestsellers_query_plan.md` - Best Sellers 查詢計畫
- `docs/asin_enrichment/20251124_seller_asin_query_plan.md` - Seller Analysis 計畫
- `docs/20251007_finder_module_specification.md` - Finder 模組規格
- `docs/20251007_query_module_specification.md` - Query 模組規格
- `docs/asin_enrichment/20251124_seller_query_field_reference.md` - Seller Query 欄位參考

---

## 附錄

### Domain ID 對照表

| Domain ID | 國家 | 代碼 |
|-----------|-----|------|
| 1 | United States | US |
| 2 | United Kingdom | UK |
| 3 | Germany | DE |
| 4 | France | FR |
| 5 | Japan | JP |
| 6 | Canada | CA |
| 7 | Italy | IT |
| 8 | Spain | ES |
| 9 | India | IN |
| 10 | Mexico | MX |

### Keepa Time 轉換

**Keepa Time**: 從 2011-01-01 00:00:00 開始的分鐘數

```python
from datetime import datetime, timedelta

def keepa_time_to_datetime(keepa_time: int) -> datetime:
    """將 Keepa Time 轉換為 datetime"""
    base = datetime(2011, 1, 1)
    return base + timedelta(minutes=keepa_time)

def datetime_to_keepa_time(dt: datetime) -> int:
    """將 datetime 轉換為 Keepa Time"""
    base = datetime(2011, 1, 1)
    delta = dt - base
    return int(delta.total_seconds() / 60)
```

---

**最後更新**: 2025-12-08
**維護者**: LuminNexus Team
