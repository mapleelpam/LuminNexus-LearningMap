---
title: "Amazon & Keepa 基礎概念完全指南"
type: guide
status: active
created: 2025-12-08
version: "1.2"
project: LearningMap
author: leana
tags:
  - amazon
  - keepa
  - asin
  - buy-box
  - ecommerce
audience:
  - crawler-engineer
  - all
summary: |
  Amazon 電商生態系統與 Keepa 價格追蹤核心概念，涵蓋 ASIN、Buy Box、
  1P/3P 銷售模式、FBA/FBM 履約方式、品牌與賣家關係等。
---

# Amazon & Keepa 基礎概念完全指南 v1.2

> **文件目的**：完整解釋 Amazon 電商生態系統和 Keepa 價格追蹤系統的核心概念，包括 ASIN、Buy Box、1P/3P、履約模式、價格類型、品牌與賣家關係等。
>
> **適用對象**：Amazon 賣家、市場分析師、數據工程師、電商研究者
>
> **關鍵主題**：
> - ✅ Amazon 產品識別系統（ASIN、UPC、EAN、Parent-Child 變體）
> - ✅ Buy Box 機制與競爭策略
> - ✅ 1P vs 3P 銷售模式
> - ✅ 履約方式（FBA、FBM、SFP）
> - ✅ 價格類型與掛單模式
> - ✅ Brand vs Seller 差異（含 Brand Store vs Seller Storefront）
> - ✅ Keepa 數據追蹤能力

---

## 目錄

1. [Amazon 產品識別系統](#1-amazon-產品識別系統)
2. [Buy Box（購物車按鈕）機制](#2-buy-box購物車按鈕機制)
3. [1P vs 3P：銷售模式差異](#3-1p-vs-3p銷售模式差異)
4. [履約方式：FBA、FBM、SFP](#4-履約方式fbafbmsfp)
5. [Amazon 價格類型詳解](#5-amazon-價格類型詳解)
6. [Brand vs Seller 差異](#6-brand-vs-seller-差異)
7. [Keepa 價格追蹤系統](#7-keepa-價格追蹤系統)
8. [實務應用場景](#8-實務應用場景)
9. [參考資料](#9-參考資料)

---

## 1. Amazon 產品識別系統

### 1.1 ASIN（Amazon Standard Identification Number）

**定義**：Amazon 標準識別碼，是 Amazon 平台上產品的唯一識別碼。

**格式**：
- 10 位字元的字母數字組合
- 範例：`B07FZ8S74R`、`B0000630MR`

**特性**：
- 每個產品在 Amazon 目錄中都有唯一的 ASIN
- **特殊案例**：書籍的 ASIN 等同於 ISBN（國際標準書號）
- ASIN 由 Amazon 在產品建立時自動分配
- 同一產品在不同 Amazon 地區（.com、.co.uk、.de）有不同的 ASIN

**用途**：
- 產品頁面 URL：`https://www.amazon.com/dp/{ASIN}`
- 快速搜尋特定產品
- API 查詢和數據追蹤
- 目錄管理和防止重複上架

### 1.2 Parent ASIN vs Child ASIN（變體關係）

#### 什麼是 Parent-Child 關係？

**定義**：Amazon 使用 Parent-Child ASIN 結構來組織同一產品的不同變體（尺寸、顏色、口味等）。

**核心概念**：
- **Parent ASIN**：「不可購買」的虛擬產品，作為所有變體的傘狀識別碼
- **Child ASIN**：實際可購買的產品變體，每個變體有獨立 ASIN

#### 產品頁面呈現

```
產品標題：Nature's Way Vitamin C
└─ Parent ASIN: B0PARENT1 （不可購買）
   ├─ Size: 60 Capsules  → Child ASIN: B0CHILD01 （可購買）
   ├─ Size: 100 Capsules → Child ASIN: B0CHILD02 （可購買）
   └─ Size: 250 Capsules → Child ASIN: B0CHILD03 （可購買）
```

**顧客看到的**：
- 搜尋結果顯示 **Parent ASIN**
- 點擊後在產品頁面選擇變體（Size、Color 等下拉選單）
- 選擇變體後，URL 變更為對應的 **Child ASIN**

#### 常見變體類型

| 變體類型 | 範例 | 產業 |
|---------|------|------|
| **Size** | 60/100/250 Capsules | 營養保健品 |
| **Color** | Black/White/Red | 服飾、3C |
| **Flavor** | Vanilla/Chocolate/Strawberry | 食品、保健品 |
| **Pack Size** | 1-Pack/2-Pack/6-Pack | 各類商品 |
| **Material** | Cotton/Polyester/Blend | 服飾、家居 |

#### Parent-Child 關係的優勢

**1️⃣ 評論共享**
- 所有 Child ASIN 的評論**合併顯示**
- 範例：100 Capsules 有 50 個評論，250 Capsules 有 30 個評論 → 產品頁面顯示 80 個評論
- 加速建立社會證明（Social Proof）

**2️⃣ 提升轉換率**
- 顧客可在單一頁面比較所有變體
- 減少跳出率，提升購買決策效率
- 改善整體顧客體驗

**3️⃣ SEO 優勢**
- 單一產品頁面集中流量
- 避免重複內容（duplicate content）
- 提升搜尋排名

**4️⃣ 庫存管理**
- 每個 Child ASIN 獨立管理庫存
- 一個變體缺貨不影響其他變體銷售

#### Keepa 如何處理變體

**Keepa Product Object 欄位**：

| 欄位 | 說明 |
|-----|------|
| `parentAsin` | 該產品的 Parent ASIN（如果是 Child） |
| `variationCSV` | 變體價格歷史（CSV 格式） |
| `variations` | 所有 Child ASIN 列表（如果是 Parent） |

**查詢策略**：
```python
# 查詢 Child ASIN
product = api.query('B0CHILD01')[0]
parent_asin = product.get('parentAsin')  # 取得 Parent ASIN

# 查詢 Parent ASIN（取得所有變體）
parent_product = api.query(parent_asin)[0]
all_children = parent_product.get('variations')  # 所有 Child ASIN 列表
```

**實務應用**：
- 分析整個產品家族的價格策略
- 比較不同變體的銷售表現
- 識別最暢銷的變體（透過 Sales Rank）

### 1.3 其他產品識別碼

| 識別碼類型 | 說明 | 範例 | 適用範圍 |
|---------|-----|------|---------|
| **UPC** | 通用產品代碼（北美） | 12 位數字 | 美國、加拿大 |
| **EAN** | 歐洲商品編碼 | 13 位數字 | 歐洲、全球 |
| **ISBN** | 國際標準書號 | 10 或 13 位 | 書籍專用 |
| **GTIN** | 全球貿易項目代碼 | 8/12/13/14 位 | 全球通用標準 |

**ASIN vs UPC/EAN**：
- UPC/EAN 是**製造商分配**的全球通用識別碼
- ASIN 是 **Amazon 內部**專用的識別碼
- 一個 UPC 可能對應**多個 ASIN**（不同賣家、不同包裝）
- Keepa API 支援透過 UPC 查詢對應的 ASIN

---

## 2. Buy Box（購物車按鈕）機制

### 2.1 什麼是 Buy Box？

**官方名稱**：Featured Offer（精選報價）

**位置**：
- 桌面版：產品頁面右側的白色框
- 手機版：產品頁面頂部

**內容**：
- "Add to Cart"（加入購物車）按鈕
- "Buy Now"（立即購買）按鈕
- 價格、運送資訊、賣家名稱

### 2.2 Buy Box 的重要性

**統計數據**：
- **83%** 的 Amazon 銷售透過 Buy Box 完成
- 未獲得 Buy Box 的賣家僅能爭奪剩餘 17% 的流量
- 消費者很少點擊「Other Sellers」查看其他賣家

**商業影響**：
- 獲得 Buy Box = 產品能見度和銷量大幅提升
- 失去 Buy Box = 銷售幾乎停滯
- Buy Box 會在多個賣家之間**輪換**（根據演算法）

### 2.3 Buy Box 演算法因素（2025 年）

Amazon 使用演算法決定哪個賣家獲得 Buy Box，考慮以下因素：

#### 1️⃣ **價格競爭力**
- ❌ 誤解：最低價一定贏
- ✅ 正確：Amazon 優先考慮**整體價值**（價格 + 運費 + 服務）
- 競爭價格需低於或等於主要零售商的價格

#### 2️⃣ **履約方式**
- **FBA**（Fulfillment by Amazon）：顯著優勢
- **SFP**（Seller Fulfilled Prime）：與 FBA 相當
- **FBM**（Fulfillment by Merchant）：需更具競爭力的價格

#### 3️⃣ **賣家績效指標**
- Order Defect Rate（訂單缺陷率）< 1%
- Late Shipment Rate（延遲出貨率）< 4%
- Cancellation Rate（取消率）< 2.5%
- On-time Delivery（準時送達率）> 97%

#### 4️⃣ **庫存可用性**
- 缺貨 = **立即失去 Buy Box**
- 必須維持充足庫存

#### 5️⃣ **帳戶健康度**
- Account Health Rating
- 客戶服務回應速度
- 退貨處理品質

### 2.4 Buy Box 輪換機制

- Buy Box 並非固定由單一賣家持有
- Amazon 會在符合資格的賣家之間**輪換**
- 輪換頻率取決於競爭激烈程度和價格變化
- Keepa 可追蹤 Buy Box 歷史（哪些賣家、何時持有）

---

## 3. 1P vs 3P：銷售模式差異

### 3.1 核心差異

| 特性 | 1P (First-Party) | 3P (Third-Party) |
|-----|-----------------|------------------|
| **定義** | Amazon 作為零售商，你是批發供應商 | 你是獨立賣家，直接銷售給消費者 |
| **交易對象** | 賣給 **Amazon** | 賣給 **顧客** |
| **平台** | Vendor Central | Seller Central |
| **所有權** | Amazon 擁有庫存 | 你擁有庫存 |
| **定價權** | **Amazon 控制** | **你控制** |
| **入場門檻** | 需 Amazon **邀請** | 任何人可註冊 |
| **市場占比** | ~39% | ~61% (2024 Q1) |

### 3.2 1P (First-Party) 詳解

**運作模式**：
1. Amazon 向你發送 **Purchase Order（採購訂單）**
2. 你將產品運送到 Amazon 倉庫
3. **所有權轉移**給 Amazon
4. Amazon 自行定價並銷售給消費者
5. 產品頁面顯示 "Ships from and sold by **Amazon.com**"

**優勢**：
- ✅ "Sold by Amazon" 標籤增加信任度
- ✅ 自動獲得 Prime 資格
- ✅ 更容易贏得 Buy Box
- ✅ 存取 Amazon Marketing Services (AMS)

**劣勢**：
- ❌ 失去定價控制權
- ❌ 利潤率較低（Amazon 壓低採購價）
- ❌ 需處理退貨和滯銷庫存（chargebacks）
- ❌ 付款週期較長（30-90 天）

### 3.3 3P (Third-Party) 詳解

**運作模式**：
1. 你在 Seller Central 建立產品清單
2. 你設定價格和庫存
3. 顧客下單後，你負責出貨（或使用 FBA）
4. 你保留所有權直到產品送達顧客
5. 產品頁面顯示 "Ships from and sold by **[Your Store Name]**"

**優勢**：
- ✅ 完全控制定價
- ✅ 更高利潤率
- ✅ 彈性選擇履約方式（FBA/FBM/SFP）
- ✅ 直接與顧客互動

**劣勢**：
- ❌ 需自行管理物流和客服
- ❌ Buy Box 競爭更激烈
- ❌ 需支付平台費用（referral fee 8-15%）
- ❌ 需建立信任度

### 3.4 混合模式（Hybrid 1P+3P）

許多品牌**同時使用兩種模式**：
- 透過 1P 供貨給 Amazon（主流商品）
- 透過 3P 銷售（利基商品、新品測試）
- 目的：最大化曝光和控制權平衡

---

## 4. 履約方式：FBA、FBM、SFP

### 4.1 FBA (Fulfillment by Amazon)

**定義**：由 Amazon 負責倉儲、揀貨、包裝、運送和客服。

**運作流程**：
1. 你將產品批量運送到 Amazon 倉庫
2. Amazon 儲存你的庫存
3. 顧客下單後，Amazon 處理所有後續流程
4. Amazon 處理退貨和客服問題

**優勢**：
- ✅ 自動獲得 **Prime** 標章（免費兩日送達）
- ✅ 更容易贏得 Buy Box
- ✅ Amazon 處理所有物流和客服
- ✅ 多渠道配送（可用於其他平台訂單）

**劣勢**：
- ❌ 高額費用（倉儲費 + 履約費）
- ❌ **2025 年費用上漲**：
  - 月倉儲費年增 20%
  - 長期倉儲費從 365 天降至 180 天開始收費
- ❌ 庫存控制受限
- ❌ 產品必須符合 Amazon 包裝標準

**2025 年統計**：
- **82%** 的美國 Amazon 賣家使用 FBA 作為主要履約方式

### 4.2 FBM (Fulfillment by Merchant)

**定義**：賣家自行負責倉儲、包裝、運送產品給顧客。

**運作流程**：
1. 你在自己的倉庫（或 3PL）儲存產品
2. 顧客下單後，你接收訂單通知
3. 你打包並運送產品
4. 你處理客服和退貨

**優勢**：
- ✅ 完全控制庫存和包裝
- ✅ 節省 FBA 履約費用
- ✅ 適合大件、易碎、客製化商品
- ✅ 無長期倉儲費壓力

**劣勢**：
- ❌ **無 Prime 標章**（除非使用 SFP）
- ❌ Buy Box 競爭力較弱
- ❌ 需自行處理所有物流
- ❌ 運送成本可能較高

**2025 年統計**：
- **34%** 的 Amazon 賣家使用 FBM（獨立或與 FBA 並用）

### 4.3 SFP (Seller Fulfilled Prime)

**定義**：賣家自行履約，但產品仍享有 **Prime** 標章。

**運作流程**：
1. 你在自己的倉庫儲存產品
2. 顧客下單後，你必須在 24 小時內處理
3. 你運送產品（必須達到 Prime 標準）
4. Amazon 監控你的績效指標

**嚴格要求**：
- ✅ **99%** 準時送達率
- ✅ **24 小時**內處理訂單
- ✅ 需要強大的物流系統和備援計畫

**優勢**：
- ✅ **Prime 標章**（增加轉換率）
- ✅ 節省 FBA 履約費（每件省 $2-$8）
- ✅ 保持庫存控制權

**劣勢**：
- ❌ 嚴格的績效要求
- ❌ 需要成熟的物流系統
- ❌ 不適合新手賣家

### 4.4 2025 年趨勢：混合履約策略

許多成功賣家採用**混合模式**：
- 熱銷商品 → FBA（快速配送）
- 大件商品 → 3PL 或 FBM（節省倉儲費）
- 高利潤商品 → SFP（保持 Prime 優勢）

---

## 5. Amazon 價格類型詳解

### 5.1 價格類型總覽

| 價格類型 | Keepa 欄位名稱 | 說明 | 用途 |
|---------|--------------|------|------|
| **Amazon 價格** | `AMAZON` | Amazon 自營價格（1P） | 識別 1P 產品 |
| **新品價格** | `NEW` | 最低新品 3P 賣家價格 | 市場競爭分析 |
| **二手價格** | `USED` | 最低二手賣家價格 | 二手市場追蹤 |
| **Buy Box 價格** | `BUY_BOX` | 當前 Buy Box 價格（含運費） | 實際購買價格 |
| **建議售價** | `LISTPRICE` | 製造商建議零售價（MSRP） | 折扣比較基準 |
| **翻新品價格** | `REFURBISHED` | 官方翻新產品價格 | 翻新市場分析 |
| **倉庫特價** | `WAREHOUSE` | Amazon Warehouse 價格 | 退貨/瑕疵品特價 |

### 5.2 各價格類型詳解

#### 5.2.1 AMAZON 價格（1P 價格）

**定義**：Amazon 自營（1P）的銷售價格

**特性**：
- 僅當 Amazon 作為賣家時存在
- 通常最具競爭力（Amazon 直接控制定價）
- Keepa 數據：值為 `-1` 表示 Amazon 當前無報價

**產品頁面顯示**：
```
Ships from and sold by Amazon.com
```

**Keepa 使用**：
- 追蹤 Amazon 是否進入/退出某產品市場
- 分析 Amazon 定價策略
- 識別 1P 產品（有 AMAZON 價格歷史）

#### 5.2.2 NEW 價格（新品市場價格）

**定義**：最低的新品 3P 賣家價格（**包含 Amazon**）

**重要說明**：
- Amazon 被視為市場的一部分
- 如果 Amazon 有最低新品價格，NEW 價格 = AMAZON 價格
- **不含運費**

**用途**：
- 追蹤市場最低價格趨勢
- 分析價格競爭激烈程度
- 設定自己的定價策略

#### 5.2.3 BUY_BOX 價格（購物車價格）

**定義**：當前贏得 Buy Box 的賣家價格

**特性**：
- **包含運費和手續費**
- 值為 `-1` 表示當前無人符合 Buy Box 資格
- 這是消費者點擊「Add to Cart」時看到的價格

**重要性**：
- 代表**實際購買價格**
- 追蹤 Buy Box 價格波動
- 分析誰在何時贏得 Buy Box

**Keepa 額外數據**：
- `buyBoxSellerIdHistory`：Buy Box 賣家歷史記錄
- `buyBoxStats`：Buy Box 統計（勝率、平均價格）

#### 5.2.4 LISTPRICE（建議售價）

**定義**：製造商建議零售價（MSRP）

**特性**：
- 顯示為**刪除線價格**（strike-through）
- 作為折扣比較的參考點
- 不代表實際可購買價格

**產品頁面顯示範例**：
```
List Price: $99.99
Price: $69.99
You Save: $30.00 (30%)
```

**用途**：
- 計算折扣百分比
- 消費者價值感知
- 促銷活動參考

### 5.3 價格歷史數據格式（Keepa）

#### 二元組格式（Binary Tuples）
多數價格欄位使用此格式：
```python
[keepa_time, price, keepa_time, price, ...]
```

範例：
```python
csv[0] = [7764786, 1999, 7829000, 2499, ...]
# 時間 7764786: $19.99
# 時間 7829000: $24.99
```

#### 三元組格式（Ternary Tuples）
部分欄位包含運費：
```python
[keepa_time, price, shipping, keepa_time, price, shipping, ...]
```

**注意事項**：
- 價格以**美分**為單位（1999 = $19.99）
- Keepa Time 是從 2011-01-01 開始的分鐘數
- `-1` 值表示該時間點無報價

---

## 6. Brand vs Seller 差異

### 6.1 核心概念差異

**⚠️ 最重要的理解**：Brand（品牌）和 Seller（賣家）是**完全不同的概念**，且 Brand **不一定是** Seller！

#### 關鍵區別

| 特性 | Brand（品牌） | Seller（賣家） |
|-----|-------------|--------------|
| **定義** | 產品的**品牌名稱**（智慧財產） | 銷售產品的**商家名稱**（交易主體） |
| **顯示位置** | 產品標題下方 | "Sold by" 欄位 |
| **點擊後** | 進入品牌商店頁面（Brand Store） | 進入賣家店面頁面（Seller Storefront） |
| **關聯性** | 與商標和產品線綁定 | 與 Amazon 帳戶綁定 |
| **數量** | 一個產品只有一個品牌 | 多個賣家可銷售同一產品 |
| **銷售行為** | ❌ 不一定實際銷售 | ✅ 必定進行銷售 |

#### 常見誤解

**❌ 錯誤認知**：
- "Nature's Way 是一個 Seller"
- "有 Brand Store 就代表該品牌在 Amazon 上銷售"
- "Brand 和 Seller 是一對一關係"

**✅ 正確理解**：
- Nature's Way 是一個 **Brand**（品牌名稱）
- Nature's Way 可能**沒有 Seller 帳戶**（不直接銷售）
- Nature's Way 產品由**多個授權經銷商** Seller 銷售
- 一個 Brand 可能有 0 個、1 個或多個 Seller

#### 產品頁面實例

```
產品標題：Nature's Way Vitamin C 1000mg, 100 Capsules
Brand: Nature's Way ← 點擊進入品牌商店
---
Price: $15.99
Sold by: Swanson Health Products ← 點擊進入賣家店面
Ships from: Amazon
```

**關鍵理解**：
- **Brand** = 產品製造商/品牌擁有者
- **Seller** = 在 Amazon 上銷售該產品的商家
- 同一品牌產品可由多個不同賣家銷售

### 6.2 Amazon Brand Registry（品牌註冊）

**目的**：保護品牌擁有者的智慧財產權和產品資訊控制。

#### 6.2.1 Brand Registry 要求

**必要條件**：
1. 在 **USPTO**（美國專利商標局）或其他國家註冊的**商標**
2. 有效的商標註冊號碼
3. 在 Amazon 上銷售該品牌產品

**處理時間和成本**：
- 商標註冊：數月至一年
- 費用：$250-$750 USD（視國家和商標類型）

#### 6.2.2 Brand Registry 權益

| 權益 | 說明 |
|-----|------|
| **A+ Content** | 增強產品描述（圖文並茂） |
| **Brand Store** | 建立專屬品牌商店頁面 |
| **Brand Analytics** | 存取詳細的品牌分析數據 |
| **侵權保護** | 防止未授權賣家銷售你的品牌 |
| **廣告工具** | 品牌專屬廣告選項 |
| **影片上傳** | 產品頁面嵌入影片 |

#### 6.2.3 Brand Registry 角色

| 角色 | 說明 | 權限 |
|-----|------|------|
| **Brand Representative** | 品牌代表（內部員工） | 完全控制權 |
| **Reseller** | 授權經銷商 | 有限編輯權限 |

### 6.3 Brand Store vs Seller Storefront（完全不同）

**核心差異**：Brand Store 和 Seller Storefront 是**兩個完全不同的系統**，容易混淆但功能差異巨大。

#### 比較表格

| 特性 | Seller Storefront | Brand Store |
|-----|------------------|-------------|
| **官方名稱** | Seller Profile Page | Amazon Brand Store |
| **誰可使用** | **所有賣家**（自動生成） | **僅 Brand Registry 會員** |
| **入場要求** | 無（開始銷售即有） | 需註冊商標 + Brand Registry |
| **費用** | 免費 | 免費（但需商標費用） |
| **自訂程度** | ❌ 極低（基本模板） | ✅ 極高（完全客製化） |
| **頁面類型** | 基本資料頁 | 迷你電商網站 |
| **競爭者廣告** | ✅ 會出現 | ❌ 無廣告干擾 |
| **分析工具** | ❌ 無 | ✅ Store Insights |
| **多媒體支援** | ❌ 無 | ✅ 圖片、影片、品牌故事 |
| **子頁面** | ❌ 無 | ✅ 可建立產品分類頁面 |
| **URL** | 通用格式 | ✅ 品牌專屬 URL |
| **訪問方式** | "Sold by [Seller]" 連結 | "Visit the [Brand] Store" 連結 |

#### Seller Storefront（賣家店面）詳解

**定義**：每個 Amazon 賣家的基本個人資料頁面。

**特性**：
- 自動為每個賣家帳戶生成
- 顯示賣家名稱、評分、政策
- 列出該賣家銷售的所有產品
- **可能出現競爭者廣告**

**產品頁面顯示**：
```
Price: $15.99
Sold by: Swanson Health Products ← 點擊進入 Seller Storefront
Ships from: Amazon
```

**頁面內容**（基本模板）**：
- 賣家名稱和評分
- 賣家政策（退貨、運送）
- 產品列表（所有該賣家的產品）
- 顧客評論

**限制**：
- ❌ 無法自訂版面配置
- ❌ 無法添加品牌故事或視覺內容
- ❌ 無詳細分析報告
- ❌ 競爭者可能在你的頁面投放廣告

#### Brand Store（品牌商店）詳解

**定義**：需要 Brand Registry 的高級品牌展示頁面，可完全客製化。

**特性**：
- 類似獨立電商網站的體驗
- 完全控制版面配置和視覺設計
- 可建立多個子頁面（產品分類、品牌故事等）
- **無競爭者廣告**

**產品頁面顯示**：
```
Brand: Nature's Way ← 點擊進入 Brand Store
Visit the Nature's Way Store
```

**頁面功能**：
- 🎨 **自訂版面**：圖片輪播、產品網格、影片嵌入
- 📖 **品牌故事**：關於我們、品牌歷史、價值觀
- 📂 **子頁面**：維生素類、草本類、特價專區等
- 📱 **移動優化**：自動適應手機和平板
- 📊 **Store Insights**：訪客數據、點擊率、轉換率
- 🎯 **廣告整合**：Sponsored Brand Ads 可導流至 Brand Store

**實際案例比較**：

**Seller Storefront**（基本賣家頁面）：
```
====================================
Swanson Health Products
⭐⭐⭐⭐⭐ 4.7 (120,000 ratings)

Shipping Policy | Return Policy

Products:
- Nature's Way Vitamin C
- NOW Foods Omega-3
- Solgar B-Complex
...
[可能有競爭者廣告]
====================================
```

**Brand Store**（品牌商店）：
```
====================================
[品牌 Banner 圖片：Nature's Way Logo + 森林背景]

"信賴自然，活出健康" - 品牌標語

[產品分類按鈕]
┌────────┬────────┬────────┐
│ 維生素  │ 草本類  │ 特價區  │
└────────┴────────┴────────┘

[熱銷商品輪播]
[品牌故事影片]
[新品推薦區]

無競爭者廣告！
====================================
```

#### 效能差異（2025 年數據）

**統計數據**：
- 定期更新 Brand Store 的品牌**營收提升 13%**（每位訪客）
- 從 Amazon 品牌廣告導流至 Brand Store 的流量**頁面瀏覽量增加 55%**

**轉換率影響**：
- Brand Store 提供更專業的品牌形象
- 無競爭者干擾，降低顧客流失
- 豐富的視覺內容提升購買信心

#### 如何選擇？

| 情境 | 推薦 |
|-----|------|
| 你是經銷商/零售商 | Seller Storefront（自動擁有） |
| 你是品牌擁有者 | **Brand Store**（強烈推薦） |
| 預算有限，無商標 | 先用 Seller Storefront |
| 重視品牌形象 | 投資商標註冊 → Brand Store |
| 多品牌經銷 | 每個品牌申請 Brand Store（如果擁有） |

#### ⚠️ 重要澄清：Brand Store ≠ Seller

**核心概念**：擁有 Brand Store **不代表**該品牌是一個 Seller（賣家）。

**為什麼會混淆？**
- Brand Store 是**品牌展示頁面**，由品牌擁有者建立
- Seller Storefront 是**賣家店面**，每個賣家帳戶自動擁有
- 一個品牌可能有 Brand Store，但**從不直接銷售**（僅授權經銷商銷售）

**實際案例**：

**案例 1：Nature's Way（品牌）**
```
✅ 有 Brand Store：
   https://www.amazon.com/stores/NaturesWay/page/xxx
   （展示所有 Nature's Way 產品）

❌ 但 Nature's Way 本身不是 Seller：
   產品頁面顯示：
   Brand: Nature's Way ← 點擊進入 Brand Store
   Sold by: Swanson Health Products ← 實際賣家是 Swanson
   Sold by: Vitamin World ← 或其他授權經銷商
   Sold by: Amazon.com ← 或 Amazon 1P
```

**案例 2：多賣家銷售同一品牌**
```
產品：Nature's Way Vitamin C 1000mg

Brand Store: Nature's Way Store（品牌官方展示頁）
   └─ 展示所有 Nature's Way 產品
   └─ 品牌故事、產品分類

實際賣家（可能有數十個）：
   ├─ Swanson Health Products (Seller)
   ├─ Vitamin World (Seller)
   ├─ iHerb (Seller)
   ├─ NOW Foods (Seller，跨品牌經銷商)
   └─ Amazon.com (1P Seller)

每個 Seller 都有自己的 Seller Storefront
```

**關鍵理解**：

| 概念 | 性質 | 所有者 | 銷售行為 |
|-----|------|--------|---------|
| **Brand** | 品牌識別 | 商標持有者 | ❌ 不一定銷售 |
| **Brand Store** | 品牌展示頁 | Brand Registry 會員 | ❌ 不進行交易 |
| **Seller** | 商家/賣家 | Amazon 帳戶持有者 | ✅ 實際銷售 |
| **Seller Storefront** | 賣家店面 | 每個 Seller | ✅ 列出賣家產品 |

**常見情境**：

**情境 1：品牌擁有者不直接銷售**
- Brand Store 存在：✅（展示品牌形象）
- Seller Storefront：❌（品牌本身無 Seller 帳戶）
- 銷售方式：透過授權經銷商（3P）或 Amazon（1P）

**情境 2：品牌擁有者也是賣家**
- Brand Store 存在：✅（品牌展示）
- Seller Storefront：✅（賣家店面）
- 兩者**完全獨立**，分別顯示不同內容

**情境 3：授權經銷商**
- 可能有 Brand Store：✅（如果獲得 Brand Registry 授權）
- Seller Storefront：✅（自動擁有）
- 可銷售多個品牌（每個品牌可能有獨立 Brand Store）

**實務影響**：

**對於數據分析**：
```python
# ❌ 錯誤假設
# 有 Brand Store → 該品牌一定是 Seller
# 看到 Brand Store → 可以查詢該品牌的 Seller Profile

# ✅ 正確理解
# Brand Store 僅為展示頁面
# 需要查詢實際銷售該品牌的 Seller ID
# 一個品牌可能有數十個 Seller 在銷售

# Keepa 查詢範例
product = api.query('B0ASIN123')[0]

# 品牌資訊
brand = product['brand']  # "Nature's Way"

# 當前 Buy Box 持有者（實際 Seller）
current_seller_id = product['buyBoxSellerIdHistory'][-1]

# 歷史上所有銷售過該產品的 Seller
all_sellers = set(product['buyBoxSellerIdHistory'][1::2])
print(f"品牌 {brand} 的產品由 {len(all_sellers)} 個不同 Seller 銷售過")
```

**總結**：
- **Brand**：產品的品牌名稱（智慧財產）
- **Brand Store**：品牌的展示頁面（行銷工具）
- **Seller**：實際銷售產品的商家（交易主體）
- **三者關係**：Brand Store 展示品牌 → 多個 Seller 可銷售該品牌產品

### 6.4 Brand Approval vs Brand Registry

**重要區別**：

| 概念 | Brand Approval | Brand Registry |
|-----|---------------|---------------|
| **定義** | 獲准銷售**他人品牌** | 註冊保護**自己的品牌** |
| **對象** | 經銷商、零售商 | 品牌擁有者 |
| **要求** | 品牌授權文件 | 註冊商標 |
| **時間** | 較快（數天到數週） | 較慢（需先註冊商標） |
| **成本** | 低（主要是授權協議） | 高（商標註冊費用） |

**實務案例**：
- **Brand Approval**：你想在 Amazon 銷售 "Nature's Way" 產品，需要獲得 Nature's Way 的授權
- **Brand Registry**：你是 "Nature's Way" 品牌擁有者，註冊保護你的品牌不被侵權

---

## 7. Keepa 價格追蹤系統

### 7.1 Keepa 核心功能

**Keepa** 是 Amazon 產品的**歷史數據追蹤平台**，提供價格、排名、庫存等多維度數據。

**主要用途**：
- 📊 價格歷史追蹤（超過 **50 億**個 Amazon 產品）
- 📈 銷售排名趨勢分析
- 🏆 Buy Box 歷史記錄
- 🔔 價格下降通知
- 🌍 跨 Amazon 地區比價

### 7.2 Keepa 追蹤的數據類型

#### 7.2.1 價格歷史（CSV 數據）

Keepa 將價格歷史儲存在 `csv` 陣列中，包含 **34 個指標**：

| CSV Index | 欄位名稱 | 說明 |
|-----------|---------|------|
| 0 | **AMAZON** | Amazon 自營價格 |
| 1 | **NEW** | 最低新品 3P 價格 |
| 2 | **USED** | 最低二手價格 |
| 3 | **SALES_RANK** | 銷售排名 |
| 4 | **LISTPRICE** | 建議售價（MSRP） |
| 5 | **COLLECTIBLE** | 收藏品價格 |
| 6 | **REFURBISHED** | 翻新品價格 |
| 7 | **NEW_FBM** | 新品 FBM 價格 |
| 8 | **WAREHOUSE** | Amazon Warehouse 價格 |
| 9 | **NEW_FBA** | 新品 FBA 價格（第三方） |
| 10 | **COUNT_NEW** | 新品賣家數量 |
| 11 | **COUNT_USED** | 二手賣家數量 |
| 12 | **COUNT_REFURBISHED** | 翻新賣家數量 |
| 13 | **COUNT_COLLECTIBLE** | 收藏賣家數量 |
| 14 | **EXTRA_INFO_UPDATES** | 額外資訊更新 |
| 15 | **RATING** | 評分（0-50，除以 10 = 5 星制） |
| 16 | **COUNT_REVIEWS** | 評論數量 |
| 17 | **BUY_BOX_SHIPPING** | Buy Box 運費 |
| 18 | **USED_NEW_SHIPPING** | 二手如新運費 |
| 19 | **USED_VERY_GOOD_SHIPPING** | 二手極佳運費 |
| 20 | **USED_GOOD_SHIPPING** | 二手良好運費 |
| 21 | **USED_ACCEPTABLE_SHIPPING** | 二手可接受運費 |
| 22 | **COLLECTIBLE_NEW_SHIPPING** | 收藏新品運費 |
| 23 | **COLLECTIBLE_VERY_GOOD_SHIPPING** | 收藏極佳運費 |
| 24 | **COLLECTIBLE_GOOD_SHIPPING** | 收藏良好運費 |
| 25 | **COLLECTIBLE_ACCEPTABLE_SHIPPING** | 收藏可接受運費 |
| 26 | **REFURBISHED_SHIPPING** | 翻新品運費 |
| 27 | **EBAY_NEW_SHIPPING** | eBay 新品運費 |
| 28 | **EBAY_USED_SHIPPING** | eBay 二手運費 |
| 29 | **TRADE_IN** | 以舊換新價格 |
| 30 | **RENT** | 租借價格 |
| 31 | **BUY_BOX_USED** | Buy Box 二手價格 |
| 32 | **LIGHTNING_DEAL** | 限時特賣價格 |
| 33 | **PRIME_EXCLUSIVE** | Prime 會員專屬價 |

#### 7.2.2 Buy Box 數據

Keepa 提供詳細的 Buy Box 追蹤：

| 欄位 | 說明 |
|-----|------|
| `buyBoxSellerIdHistory` | Buy Box 賣家 ID 歷史（時間序列） |
| `buyBoxStats` | Buy Box 統計資訊 |
| `buyBoxStats.avgPercentage` | 平均 Buy Box 勝率 |
| `buyBoxStats.avgPrice` | 平均 Buy Box 價格 |
| `buyBoxStats.lostPercentage` | 失去 Buy Box 的百分比 |

**賣家 ID 特殊值**：
- `-1`：無人持有 Buy Box
- `-2`：Amazon 持有 Buy Box（1P）

#### 7.2.3 產品狀態數據

| 欄位 | 說明 |
|-----|------|
| `availabilityAmazon` | Amazon 自營庫存狀態 |
| `hasReviews` | 是否有評論 |
| `isSNS` | 是否為 Subscribe & Save 商品 |
| `isAdult` | 是否為成人商品 |
| `isEligibleForPrime` | 是否符合 Prime 資格 |

**availabilityAmazon 值定義**：
- `-1`：無報價
- `0`：有庫存
- `1`：預購
- `2`：未知
- `3`：缺貨
- `4`：延遲出貨

### 7.3 Keepa API 使用

#### 7.3.1 基本查詢範例

```python
import keepa

# 初始化 API
api = keepa.Keepa('YOUR_API_KEY_HERE')

# 透過 UPC 查詢產品
products = api.query('012345678905', product_code_is_asin=False)

# 透過 ASIN 查詢產品（含完整歷史）
products = api.query(['B07FZ8S74R'],
                     buybox=True,      # +2 tokens
                     stats=365,        # 取得 365 天統計
                     rating=True)      # +2 tokens
```

#### 7.3.2 Token 消耗

| 查詢類型 | Token 成本 | 說明 |
|---------|-----------|------|
| 基本產品查詢 | 1 token | 僅基本欄位 |
| + `buybox=True` | +2 tokens | 含 Buy Box 歷史 |
| + `rating=True` | 0 tokens | 含評分/評論歷史 |
| + `stats=365` | 0 tokens | 含 365 天統計 |
| **總計（完整查詢）** | **3 tokens** | 推薦設定 |

**速率限制**：
- 預設：60 tokens/minute
- 建議間隔：1 秒/請求

#### 7.3.3 價格歷史數據提取

```python
# 取得產品物件
product = products[0]

# 提取新品價格歷史
new_price_history = product['csv'][1]  # csv[1] = NEW
times = new_price_history[::2]  # 偶數索引 = 時間
prices = new_price_history[1::2]  # 奇數索引 = 價格

# Keepa Time 轉換為日期
from datetime import datetime

def keepa_to_datetime(keepa_minutes):
    unix_millis = (keepa_minutes + 21564000) * 60000
    return datetime.utcfromtimestamp(unix_millis / 1000)

dates = [keepa_to_datetime(t) for t in times]
price_dollars = [p / 100 for p in prices]  # 轉換為美元

# 繪製價格趨勢
import matplotlib.pyplot as plt
plt.plot(dates, price_dollars)
plt.title('Price History')
plt.ylabel('Price ($)')
plt.xlabel('Date')
plt.show()
```

### 7.4 Keepa 實務應用

#### 應用場景 1：競爭對手價格監控

```python
# 監控競爭對手的最低價格
def monitor_competitors(asin, my_price):
    product = api.query(asin, buybox=True)[0]

    # 取得當前 Buy Box 價格
    buybox_price = product['stats']['current'][18]  # BUY_BOX_SHIPPING

    if buybox_price < my_price:
        print(f"警告：Buy Box 價格 ${buybox_price/100:.2f} 低於你的價格 ${my_price:.2f}")
        return True
    return False
```

#### 應用場景 2：識別 1P 產品

```python
def is_amazon_1p(product):
    """判斷產品是否為 Amazon 自營（1P）"""
    amazon_price_history = product['csv'][0]  # csv[0] = AMAZON

    # 檢查是否有 Amazon 價格歷史（不含 -1 值）
    has_amazon_price = any(p != -1 for p in amazon_price_history[1::2])

    return has_amazon_price
```

#### 應用場景 3：分析 Buy Box 競爭

```python
def analyze_buybox_competition(product):
    """分析 Buy Box 競爭狀況"""
    buybox_history = product['buyBoxSellerIdHistory']

    # 提取賣家 ID（排除 -1 和 -2）
    seller_ids = [sid for sid in buybox_history[1::2]
                  if sid not in [-1, -2]]

    unique_sellers = set(seller_ids)

    print(f"競爭賣家數量: {len(unique_sellers)}")
    print(f"Amazon 參與競爭: {-2 in buybox_history}")

    # 計算各賣家持有 Buy Box 的時間比例
    from collections import Counter
    seller_counts = Counter(seller_ids)

    for seller, count in seller_counts.most_common(5):
        percentage = count / len(seller_ids) * 100
        print(f"Seller {seller}: {percentage:.1f}%")
```

---

## 8. 實務應用場景

### 8.1 新賣家決策：選擇 FBA 還是 FBM？

**決策樹**：

```
你的產品是否...
├─ 小件、輕量、標準化？
│  └─ ✅ 選擇 FBA（利用 Prime 優勢）
│
├─ 大件、重量重、易碎？
│  └─ ✅ 選擇 FBM（節省履約費）
│
├─ 高利潤率（>40%）？
│  └─ ✅ 考慮 SFP（保持 Prime 優勢 + 省費用）
│
└─ 季節性商品？
   └─ ✅ 混合策略（旺季 FBA，淡季 FBM）
```

### 8.2 定價策略：如何贏得 Buy Box？

**步驟**：

1. **使用 Keepa 分析當前 Buy Box 持有者**
   ```python
   current_buybox_seller = product['buyBoxSellerIdHistory'][-1]
   current_buybox_price = product['csv'][18][-1]  # BUY_BOX
   ```

2. **檢查你的履約方式是否有競爭力**
   - FBA/SFP > FBM
   - 如果使用 FBM，需更低價格補償

3. **設定價格略低於當前 Buy Box 價格**
   ```python
   my_price = current_buybox_price * 0.98  # 降低 2%
   ```

4. **監控帳戶健康度**
   - Order Defect Rate < 1%
   - Late Shipment Rate < 4%
   - Cancellation Rate < 2.5%

5. **保持充足庫存**
   - 缺貨 = 立即失去 Buy Box

### 8.3 市場研究：識別有利可圖的產品

**Keepa 數據指標**：

| 指標 | 如何判斷 | 理想值 |
|-----|---------|--------|
| **銷售排名穩定** | `csv[3]`（SALES_RANK）波動小 | 排名 < 10,000（該類別） |
| **價格穩定** | `csv[1]`（NEW）波動 < 20% | 穩定價格帶 |
| **低競爭** | `COUNT_NEW` < 10 | 賣家數量少 |
| **有評論** | `COUNT_REVIEWS` > 100 | 證明市場需求 |
| **無 Amazon 競爭** | `csv[0]`（AMAZON）= -1 | Amazon 未參與 |

**查詢範例**：
```python
def is_profitable_opportunity(product):
    """判斷產品是否為有利可圖的機會"""

    # 1. 銷售排名良好
    sales_rank = product['csv'][3]
    avg_rank = sum(sales_rank[1::2]) / len(sales_rank[1::2])
    if avg_rank > 50000:
        return False

    # 2. 競爭者少
    seller_count = product['csv'][10][-1]  # COUNT_NEW
    if seller_count > 15:
        return False

    # 3. Amazon 未參與
    amazon_price = product['csv'][0][-1]  # AMAZON
    if amazon_price != -1:
        return False

    # 4. 價格穩定
    new_prices = product['csv'][1][1::2]
    price_volatility = (max(new_prices) - min(new_prices)) / min(new_prices)
    if price_volatility > 0.3:  # 30% 波動過大
        return False

    return True
```

### 8.4 品牌保護：監控未授權賣家

**問題**：你是品牌擁有者，發現未授權賣家銷售你的產品。

**解決方案（使用 Keepa）**：

1. **追蹤 Buy Box 歷史**
   ```python
   buybox_sellers = product['buyBoxSellerIdHistory'][1::2]
   unauthorized = [s for s in buybox_sellers if s not in authorized_seller_ids]
   ```

2. **向 Amazon 報告侵權**
   - 前往 Brand Registry 面板
   - 提交 "Report a Violation"
   - 提供證據（Keepa 截圖）

3. **設定自動監控**
   ```python
   # 每日檢查
   def daily_monitor(asin, authorized_sellers):
       product = api.query(asin, buybox=True)[0]
       current_seller = product['buyBoxSellerIdHistory'][-1]

       if current_seller not in authorized_sellers:
           send_alert(f"未授權賣家 {current_seller} 持有 Buy Box")
   ```

---

## 9. 參考資料

### 官方資源

#### Amazon 官方文檔
1. **[Amazon Sell Central](https://sell.amazon.com/)** ⭐
   - 賣家中心主頁
   - 費用計算器、政策文檔

2. **[Amazon Brand Registry](https://sell.amazon.com/brand-registry)** ⭐
   - 品牌註冊申請
   - 品牌保護工具

3. **[Understanding ASIN numbers](https://sell.amazon.com/blog/what-is-an-asin)** ⭐
   - Amazon 官方 ASIN 說明

4. **[Featured Offer (Buy Box) Guide](https://sell.amazon.com/blog/buy-box-featured-offer)** ⭐
   - Amazon 官方 Buy Box 說明

#### Keepa 官方資源
5. **[Keepa.com](https://keepa.com/)** ⭐
   - 主網站和價格追蹤器

6. **[Keepa API 文檔](https://keepa.com/#!api)** ⭐
   - 完整 API 參數說明
   - Token 計費規則

7. **[keepa Python API GitHub](https://github.com/akaszynski/keepa)** ⭐
   - 開源 Python 包裝器
   - 程式碼範例

8. **[keepa Python API 文檔](https://keepaapi.readthedocs.io/)** ⭐
   - 詳細 Python API 使用說明

### 延伸閱讀

#### Buy Box 策略
9. [Amazon Buy Box Guide 2025 - Repricer](https://www.repricer.com/blog/what-is-the-amazon-buy-box/)
10. [What is the Amazon Buy Box? - Threecolts](https://www.threecolts.com/blog/what-is-the-amazon-buy-box/)
11. [Amazon Buy Box Explained - StreetPricer](https://streetpricer.com/blog/what-is-amazon-buybox/)

#### 1P vs 3P 比較
12. [Amazon 1P vs 3P - Feedvisor](https://feedvisor.com/university/amazon-1p-vs-3p/)
13. [Amazon 1P vs 3P: Pros & Cons - Pattern](https://www.pattern.com/blog/amazon-1p-vs-3p-pros-and-cons)
14. [Amazon 1P vs 3P Strategic Guide 2025 - BigCommerce](https://www.bigcommerce.com/articles/b2b-ecommerce/amazon-1p-vs-3p/)

#### FBA vs FBM vs SFP
15. [FBA vs FBM 2025 Guide - AMZPrep](https://amzprep.com/fba-vs-fbm/)
16. [Amazon Fulfillment: FBA vs SFP vs FBM - Gomonta](https://gomonta.com/blog/amazon-the-difference-between-fba-sfp-and-fbm/)
17. [SFP vs FBA 2025 Calculator - Veyer](https://www.veyerlogistics.com/resources/sfp-vs-fba-the-2025-profitability-calculator-for-amazon-sellers/)

#### Brand Registry
18. [Amazon Brand Name vs Seller Name - MyAmazonGuy](https://myamazonguy.com/amazon-seller/brand-seller-display-name-amazon/)
19. [Amazon Brand Registry Complete Guide - Jungle Scout](https://www.junglescout.com/blog/amazon-brand-registry/)
20. [Brand Approval vs Brand Registry - Source Approach](https://www.sourceapproach.com/amazon-brand-registry-the-complete-guide/)

#### Keepa 使用指南
21. [How to Read a Keepa Graph - Seller Assistant](https://www.sellerassistant.app/blog/keepa-amazon)
22. [Complete Guide to Keepa - FastTrackFBA](https://fasttrackfba.com/blog/b/a-complete-guide-to-keepa-amazon-price-tracker)
23. [Keepa: Ultimate Amazon Price Tracker - BookzPro](https://bookzpro.com/keepa-the-ultimate-amazon-price-tracker-for-mastering-seller-strategies/)

#### Parent-Child ASIN & 變體關係
24. [Defining Amazon ASINs and Parent-Child Relationships - Feedvisor](https://feedvisor.com/university/asin/)
25. [Understanding Amazon ASINs: Parent/Child Relationships - Zquared](https://zquared.com/understanding-amazon-asins-parent-child-relationships-and-variations/)
26. [What is an ASIN? Parent vs Child - IntentWise](https://www.intentwise.com/blog/amazon-seller/what-is-an-asin-parent-child/)
27. [Understanding Parent vs Child ASINs - ChannelKey](https://channelkey.com/amazon-account-management/understanding-parent-vs-child-asins-on-amazon-best-practices-for-structuring-your-listings/)

#### Brand Store vs Seller Storefront
28. [Amazon Storefront vs Brand Store: 10 Key Differences - MyAmazonGuy](https://myamazonguy.com/amazon-storefront/amazon-storefront-vs-amazon-brand-store/)
29. [Amazon Storefront vs Brand Store Complete Guide - Sellexio](https://sellexio.com/amazon-storefront-vs-amazon-brand-store/)
30. [Amazon Storefront Guide 2025 - Seller Sprite](https://www.sellersprite.com/en/blog/amazon-storefront-guide-2025)

### 本專案相關文件

31. **[Keepa Product Object Reference](./product_object_reference.md)** ⭐
    - Keepa Product Object 完整欄位說明
    - CSV 數據格式詳解
    - `parentAsin` 和 `variations` 欄位使用

32. **[Keepa Seller Object Reference](./seller_object_reference.md)** ⭐
    - Keepa Seller Object 完整欄位說明
    - 賣家評分系統解析
    - `storefront` 參數詳解

---

## 快速查詢表

### 價格類型對照

| Keepa 欄位 | 產品頁面顯示 | 含運費 |
|-----------|------------|--------|
| AMAZON | "Sold by Amazon.com" | ❌ |
| NEW | "Other Sellers on Amazon" | ❌ |
| BUY_BOX | "Add to Cart" 價格 | ✅ |
| LISTPRICE | 刪除線價格 | ❌ |

### 履約方式比較

| 特性 | FBA | FBM | SFP |
|-----|-----|-----|-----|
| Prime 標章 | ✅ | ❌ | ✅ |
| Buy Box 優勢 | 高 | 低 | 高 |
| 費用 | 高 | 低 | 中 |
| 控制權 | 低 | 高 | 中 |

### 1P vs 3P 快速對比

| 項目 | 1P | 3P |
|-----|----|----|
| 交易對象 | Amazon | 顧客 |
| 定價權 | Amazon | 你 |
| 利潤率 | 低 | 高 |
| 入場門檻 | 邀請制 | 開放註冊 |

---

**文件版本**：v1.2
**建立日期**：2025-12-08
**最後更新**：2025-12-08（重要澄清：Brand Store ≠ Seller）
**維護者**：LuminNexus-AtlasVault-DSLD Keepa 團隊
**相關文件**：
- [Keepa Product Object 參考文件](./product_object_reference.md)
- [Keepa Seller Object 參考文件](./seller_object_reference.md)

**v1.2 更新內容**（最新）：
- ⚠️ **關鍵澄清**：在 6.1 和 6.3 節明確說明 Brand Store ≠ Seller
- ✅ 新增「常見誤解」章節（Brand vs Seller 概念釐清）
- ✅ 補充三種情境說明（品牌不銷售、品牌也是賣家、授權經銷商）
- ✅ 提供數據分析實務範例（避免錯誤假設）
- ✅ 總結四大核心概念關係（Brand、Brand Store、Seller、Seller Storefront）

**v1.1 更新內容**：
- ✅ 新增 1.2 節：Parent ASIN vs Child ASIN 完整說明
- ✅ 新增 6.3 節：Brand Store vs Seller Storefront 詳細比較
- ✅ 補充 Keepa 變體欄位使用（`parentAsin`, `variations`, `variationCSV`）
- ✅ 新增 7 個參考資料連結（Parent-Child & Brand Store）
