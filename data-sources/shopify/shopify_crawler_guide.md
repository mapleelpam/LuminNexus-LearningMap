---
title: "Shopify 爬蟲技術指南"
type: guide
status: active
created: 2025-12-08
version: "1.0"
project: LearningMap
author: leana
tags:
  - shopify
  - crawler
  - api
  - products-json
audience:
  - crawler-engineer
summary: |
  Shopify 網站識別方法、Products.json API 結構、分頁機制、
  錯誤處理與重試策略等爬蟲技術參考。
---

# Shopify 爬蟲技術指南

---

## 目錄
1. [Shopify 網站識別](#1-shopify-網站識別)
2. [Shopify Products.json API](#2-shopify-productsjson-api)
3. [API 結構與參數](#3-api-結構與參數)
4. [分頁機制](#4-分頁機制)
5. [Currency 參數與價格處理](#5-currency-參數與價格處理)
6. [錯誤處理與重試策略](#6-錯誤處理與重試策略)
7. [進階主題](#7-進階主題)
8. [參考資源](#8-參考資源)

---

## 1. Shopify 網站識別

### 1.1 快速檢測方法

#### 方法 1: 檢查頁面源碼
查看頁面源碼（Ctrl+U）並搜尋 `cdn.shopify.com`：

```html
<!-- 典型的 Shopify CDN 引用 -->
<link href="//cdn.shopify.com/s/files/1/..." rel="stylesheet">
<script src="//cdn.shopify.com/s/files/1/..." defer></script>
```

#### 方法 2: 檢查特定 URL 路徑
Shopify 網站具有特定的 URL 結構：

```bash
# Collections 路徑（Shopify 專屬）
https://example.com/collections/all

# 管理後台路徑
https://example.com/admin

# 產品 API 端點
https://example.com/products.json
```

#### 方法 3: 測試結帳流程
添加商品到購物車並檢查結帳 URL：

```bash
# Shopify 結帳 URL 格式
https://checkout.shopify.com/...
https://example.myshopify.com/cart
```

#### 方法 4: 檢查 robots.txt

Shopify 網站的 robots.txt 會包含特定的識別標記：

```bash
# URL
https://example.com/robots.txt

# 典型的 Shopify robots.txt 內容
# we use Shopify as our ecommerce platform

User-agent: *
Disallow: /a/downloads/-/*
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
Disallow: /collections/*sort_by*
Disallow: /*/collections/*sort_by*
Disallow: /collections/*+*
Disallow: /collections/*%2B*
Disallow: /collections/*%2b*
Disallow: /*/collections/*+*
Disallow: /*/collections/*%2B*
Disallow: /*/collections/*%2b*
Disallow: /blogs/*+*
Disallow: /blogs/*%2B*
Disallow: /blogs/*%2b*
Disallow: /*/blogs/*+*
Disallow: /*/blogs/*%2B*
Disallow: /*/blogs/*%2b*
Disallow: /*?*oseid=*
Disallow: /*preview_theme_id*
Disallow: /*preview_script_id*
Disallow: /policies/
Disallow: /*/*?*ls=*&ls=*
Disallow: /*/*?*ls%3D*%3Fls%3D*
Disallow: /*/*?*ls%3d*%3fls%3d*
Disallow: /search
Disallow: /apple-app-site-association

Sitemap: https://example.com/sitemap.xml
```

**關鍵識別標記**: `# we use Shopify as our ecommerce platform` 是所有 Shopify 網站 robots.txt 的標準註釋。

#### 方法 5: myshopify.com 子域名

```bash
# 原始 Shopify 域名格式
https://storename.myshopify.com
```

### 1.2 程式化檢測

```python
def is_shopify_store(domain: str) -> bool:
    """檢測網站是否為 Shopify 商店"""
    import requests

    # 方法 1: 檢查 products.json 端點
    try:
        response = requests.get(f"https://{domain}/products.json?limit=1", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if 'products' in data:
                return True
    except:
        pass

    # 方法 2: 檢查頁面源碼中的 cdn.shopify.com
    try:
        response = requests.get(f"https://{domain}", timeout=10)
        if 'cdn.shopify.com' in response.text:
            return True
    except:
        pass

    return False
```

---

## 2. Shopify Products.json API

### 2.1 API 概述

Shopify 提供無需身份驗證的公開產品 API：

```bash
# 基本產品 API
GET https://{store_domain}/products.json

# 特定產品（透過 handle）
GET https://{store_domain}/products/{handle}.json

# Collections 產品
GET https://{store_domain}/collections/{handle}/products.json
```

### 2.2 API 類型對比

| API 類型 | 端點 | 需要授權 | 用途 | 產品上限 |
|---------|------|---------|------|----------|
| **Storefront Ajax API** | `/products.json` | ❌ No | 公開爬取 | 250 variants/product |
| **REST Admin API** | `/admin/api/2025-10/products.json` | ✅ Yes | 後台管理 | 全部 variants |
| **GraphQL Storefront API** | `/api/2025-10/graphql.json` | ⚠️ Token | 前端應用 | 自訂查詢 |

**重要提示**:
- REST Admin API 自 2024-10-01 起成為 legacy API
- 2025-04-01 起，所有新公開應用必須使用 GraphQL Admin API
- 對於爬蟲用途，Storefront Ajax API (`/products.json`) 仍然是最佳選擇

### 2.3 API 版本

Shopify API 每年發布四次新版本：

```bash
# 2025 年版本
2025-01  # 2025年1月版
2025-04  # 2025年4月版
2025-07  # 2025年7月版
2025-10  # 2025年10月版

# Admin API 端點格式
/admin/api/{version}/products.json
```

---

## 3. API 結構與參數

### 3.1 基本 URL 結構

```bash
# 完整 URL 格式
https://{domain}/products.json?limit={limit}&page={page}

# 範例
https://example.com/products.json?limit=250&page=1
```

### 3.2 URL 參數

| 參數 | 類型 | 範圍 | 預設值 | 說明 |
|-----|------|------|--------|------|
| `limit` | Integer | 1-250 | 30 | 每頁產品數量 |
| `page` | Integer | ≥1 | 1 | 頁碼（從1開始） |

```python
def build_products_url(domain: str, page: int = 1, limit: int = 250) -> str:
    """構建產品 API URL"""
    if not (1 <= limit <= 250):
        raise ValueError(f"limit 必須在 1-250 範圍內")
    if page < 1:
        raise ValueError(f"page 必須大於 0")

    return f"https://{domain}/products.json?limit={limit}&page={page}"
```

### 3.3 響應結構（簡化版）

**📘 完整格式說明**: 請參閱 [shopify_response_reference.md](./shopify_response_reference.md) 取得完整的 JSON 格式、欄位說明、JSON-LD 結構等詳細資訊。

**基本結構**:

```json
{
  "products": [
    {
      "id": 1234567890,
      "title": "產品名稱",
      "handle": "product-handle",
      "body_html": "<p>產品描述HTML</p>",
      "vendor": "品牌/供應商",
      "product_type": "產品類型",
      "tags": ["tag1", "tag2"],
      "variants": [
        {
          "id": 9876543210,
          "title": "變體名稱",
          "sku": "SKU-12345",
          "price": "29.99",
          "available": true
        }
      ],
      "images": [
        {
          "id": 222222,
          "src": "https://cdn.shopify.com/s/files/1/.../image.jpg"
        }
      ]
    }
  ]
}
```

### 3.4 重要欄位說明

**產品層級**:
- `id`: 產品唯一識別碼
- `title`: 產品標題
- `handle`: URL 友好的識別碼（slug）
- `vendor`: 品牌名稱
- `product_type`: 產品分類
- `tags`: 產品標籤陣列

**變體層級**:
- `price`: 當前價格（字串格式）
- `compare_at_price`: 原價/對比價格
- `sku`: 庫存單位編號
- `available`: 是否可購買
- `inventory_quantity`: 庫存數量

**圖片**:
- `images`: 產品所有圖片陣列
- `src`: 圖片 CDN URL

---

## 4. 分頁機制

### 4.1 分頁限制

- **預設頁面大小**: 30 個產品
- **最大頁面大小**: 250 個產品
- **變體限制**: 每個產品最多 250 個變體

### 4.2 頁碼式分頁

```python
def fetch_all_products(domain: str, limit: int = 250):
    """獲取所有產品"""
    import requests
    import time

    all_products = []
    page = 1

    while True:
        url = f"https://{domain}/products.json?limit={limit}&page={page}"
        response = requests.get(url, timeout=30)

        if response.status_code != 200:
            break

        data = response.json()
        products = data.get('products', [])

        if not products:
            break

        all_products.extend(products)

        # 最後一頁判斷
        if len(products) < limit:
            break

        page += 1
        time.sleep(1)  # 速率限制

    return all_products
```

### 4.3 生成器模式（節省記憶體）

```python
def fetch_products_generator(domain: str, limit: int = 250):
    """使用生成器逐頁產出產品"""
    import requests
    import time

    page = 1

    while True:
        url = f"https://{domain}/products.json?limit={limit}&page={page}"

        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()

            data = response.json()
            products = data.get('products', [])

            if not products:
                break

            yield {
                'page': page,
                'products': products,
                'count': len(products)
            }

            if len(products) < limit:
                break

            page += 1
            time.sleep(1)

        except Exception as e:
            print(f"Error on page {page}: {e}")
            break

# 使用範例
for page_data in fetch_products_generator("example.com"):
    print(f"Page {page_data['page']}: {page_data['count']} products")
```

---

## 5. Currency 參數與價格處理

### 5.1 價格格式

產品價格在 JSON 中以**字串**格式回傳：

```json
{
  "variants": [
    {
      "price": "29.99",
      "compare_at_price": "39.99"
    }
  ]
}
```

### 5.2 Currency 參數說明

**Shopify 多幣別運作方式**:

#### 方式 1: 自動根據客戶會話 (Session-based)
`/products.json` 端點**自動返回客戶當前 presentment currency 的價格**：

```bash
# products.json 會自動根據客戶會話返回對應幣別
https://example.com/products.json

# 範例結果:
# - 如果客戶會話貨幣是 USD → 返回 USD 價格
# - 如果客戶會話貨幣是 EUR → 返回 EUR 價格
```

要檢查客戶的 presentment currency，可以使用 `/{locale}/cart.js` 端點的 `currency` 欄位。

#### 方式 2: URL 參數方式 (可行但需驗證)
根據部分實務經驗，有些商店支援透過 URL 參數指定幣別：

```bash
# 可能有效（取決於商店設定）
https://example.com/products.json?currency=USD
https://example.com/products.json?currency=EUR

# 或使用 locale 路徑
https://example.com/en-us/products.json  # 美國英文/USD
https://example.com/en-ca/products.json  # 加拿大英文/CAD
```

**注意**:
- 此功能需要商店啟用 **Shopify Payments** 和 **多幣別銷售**
- 每個國家/幣別需要在商店後台手動啟用
- 未啟用的幣別會自動回退到商店基礎幣別

### 5.3 多幣別設定需求

要使用多幣別功能，商店必須：

1. **使用 Shopify Payments**
2. **啟用 Markets 國際銷售工具**
3. **在後台啟用每個目標幣別**

未啟用的幣別查詢會回退到商店基礎幣別。

### 5.4 Admin API 多幣別查詢

透過 Admin API（需授權）可以獲取完整的多幣別定價資訊：

```json
// Admin API presentment_prices 格式
{
  "presentment_prices": [
    {
      "price": {"amount": "29.99", "currency_code": "USD"}
    },
    {
      "price": {"amount": "25.99", "currency_code": "EUR"}
    }
  ]
}
```

### 5.5 價格標準化

```python
import re

def normalize_price(price_str: str) -> float:
    """標準化價格格式"""
    # 移除貨幣符號和千分位逗號
    clean_price = re.sub(r'[^\d.]', '', price_str)
    return float(clean_price)

# 範例
price = normalize_price("$29.99")  # 29.99
price = normalize_price("€1,299.00")  # 1299.0
```

### 5.6 幣別檢測

```python
def detect_currency(price_str: str) -> str:
    """從價格字串檢測幣別"""
    currency_symbols = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '¥': 'JPY',
        'C$': 'CAD',
        'A$': 'AUD'
    }

    for symbol, code in currency_symbols.items():
        if symbol in price_str:
            return code

    return 'USD'  # 預設
```

---

## 6. 錯誤處理與重試策略

### 6.1 錯誤分類

#### 永久性錯誤（不應重試）

```python
PERMANENT_ERRORS = {
    404: 'Not Found',
    403: 'Forbidden',
    401: 'Unauthorized',
    410: 'Gone',
    # DNS 錯誤
    'dns_error': ['Name or service not known', 'getaddrinfo failed'],
    # SSL 錯誤
    'ssl_error': ['certificate verify failed']
}
```

#### 臨時性錯誤（值得重試）

```python
TEMPORARY_ERRORS = {
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    429: 'Too Many Requests',
    # 網路錯誤
    'timeout': ['timeout', 'timed out'],
    'connection': ['Connection reset', 'Connection refused']
}
```

### 6.2 重試策略

```python
import time
import random

def fetch_with_retry(url: str, max_retries: int = 3):
    """帶重試機制的請求"""
    import requests

    for attempt in range(1, max_retries + 1):
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            return response.json()

        except requests.exceptions.Timeout:
            if attempt < max_retries:
                wait = 2 ** attempt + random.uniform(0, 1)
                print(f"Timeout, retrying in {wait:.1f}s...")
                time.sleep(wait)
                continue
            raise

        except requests.exceptions.HTTPError as e:
            status_code = e.response.status_code

            # 永久性錯誤，不重試
            if status_code in [404, 403, 401, 410]:
                raise

            # 臨時性錯誤，重試
            if status_code in [429, 500, 502, 503, 504] and attempt < max_retries:
                wait = 2 ** attempt
                print(f"HTTP {status_code}, retrying in {wait}s...")
                time.sleep(wait)
                continue
            raise

        except Exception as e:
            print(f"Error: {e}")
            raise

    return None
```

### 6.3 速率限制

```python
class RateLimiter:
    """簡單的速率限制器"""

    def __init__(self, requests_per_second: float = 2.0):
        self.min_interval = 1.0 / requests_per_second
        self.last_request = 0

    def wait(self):
        """必要時等待"""
        import time
        now = time.time()
        elapsed = now - self.last_request

        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)

        self.last_request = time.time()

# 使用範例
limiter = RateLimiter(requests_per_second=2.0)

for page in range(1, 10):
    limiter.wait()
    response = fetch_page(domain, page)
```

**建議速率**: 每秒不超過 2 個請求

---

## 7. 進階主題

### 7.1 Handle.json - 單一產品

```bash
# 透過 handle 獲取單一產品
GET https://{domain}/products/{handle}.json

# 範例
GET https://example.com/products/creatine-monohydrate.json
```

**注意**: 響應格式的 key 是 `"product"`（單數），而非 `"products"`（複數）

```json
{
  "product": {
    "id": 1234567890,
    "title": "Creatine Monohydrate",
    "handle": "creatine-monohydrate",
    "variants": [...],
    "images": [...]
  }
}
```

### 7.2 Collections API

```bash
# 獲取特定 collection 的產品
GET https://{domain}/collections/{handle}/products.json?limit=250

# 範例
GET https://example.com/collections/supplements/products.json
```

### 7.3 Shopify CDN 圖片優化

Shopify 圖片 URL 支援動態調整大小：

```python
def optimize_image_url(url: str, size: str = '1024x1024') -> str:
    """優化 Shopify 圖片 URL

    可用尺寸:
    - pico: 16x16
    - icon: 32x32
    - thumb: 50x50
    - small: 100x100
    - compact: 160x160
    - medium: 240x240
    - large: 480x480
    - grande: 600x600
    - 1024x1024: 1024x1024
    - 2048x2048: 2048x2048
    """
    import re

    # 在副檔名前插入尺寸參數
    pattern = r'(\.[a-z]{3,4})(\?|$)'
    replacement = rf'_{size}\1\2'
    return re.sub(pattern, replacement, url, count=1)

# 範例
original = "https://cdn.shopify.com/s/files/1/.../product.jpg?v=123"
optimized = optimize_image_url(original, '480x480')
# 結果: https://cdn.shopify.com/s/files/1/.../product_480x480.jpg?v=123
```

### 7.4 域名重定向處理

某些 Shopify 商店可能有域名重定向：

```python
def check_redirect(domain: str) -> str:
    """檢查域名是否有重定向"""
    import requests

    try:
        response = requests.get(f"https://{domain}/", allow_redirects=True, timeout=10)

        # 檢查最終 URL
        from urllib.parse import urlparse
        final_domain = urlparse(response.url).netloc

        if final_domain != domain:
            print(f"Redirect detected: {domain} → {final_domain}")
            return final_domain

        return domain

    except Exception as e:
        print(f"Error checking redirect: {e}")
        return domain
```

---

## 8. 參考資源

### 8.1 官方文件

- **Shopify API 文件**: https://shopify.dev/docs/api
- **REST Admin API**: https://shopify.dev/docs/api/admin-rest
- **Storefront API**: https://shopify.dev/docs/api/storefront
- **API 速率限制**: https://shopify.dev/docs/api/usage/limits
- **分頁指南**: https://shopify.dev/docs/api/usage/pagination-rest

### 8.2 檢測工具

- **BuiltWith**: https://builtwith.com/
- **Wappalyzer**: https://www.wappalyzer.com/
- **WhatCMS**: https://whatcms.org/

### 8.3 社群資源

- **Shopify Community**: https://community.shopify.com/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/shopify

---

## 附錄: 常見問題

### Q1: 為什麼某些產品沒有出現？

**可能原因**:
1. 產品未發布 (`published_at: null`)
2. 產品狀態為 "draft"
3. 產品已刪除或歸檔

### Q2: 如何處理超過 250 個變體的產品？

**答**: 公開 API 最多只回傳 250 個變體。如需完整數據：
- 使用 Admin API（需授權）
- 解析產品頁面 HTML

### Q3: 價格多久更新一次？

**答**: 即時更新。當商店管理員修改時立即反映在 API 中。

### Q4: 如何判斷是否為最後一頁？

**答**: 當回傳的產品數量小於 `limit` 參數時，表示已到最後一頁。

---

**文件版本**: 1.0
**最後更新**: 2025-12-08
