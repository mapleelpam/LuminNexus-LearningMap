# Google Product Category

Google 官方的商品分類標準，用於 Google Shopping 和 Merchant Center。

## 下載

- [完整列表（含 ID）](https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt) - 6000+ 分類
- [完整列表（不含 ID）](https://www.google.com/basepages/producttype/taxonomy.en-US.txt)
- 其他語言: `zh-TW`, `zh-CN`, `ja-JP` 等

## 使用方式

### 兩種格式

**完整路徑**（推薦）
```
Apparel & Accessories > Clothing > Dresses
```

**數字 ID**
```
2271
```

### 選最精確的類別

❌ `Apparel & Accessories`（太籠統）
✅ `Apparel & Accessories > Clothing > Dresses`（精確）

## 常見範例

| 商品 | 分類 |
|------|------|
| 手機殼 | Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Cases |
| 蛋白粉 | Food, Beverages & Tobacco > Food Items > Sports & Nutritional Supplements |
| 跑步鞋 | Apparel & Accessories > Shoes > Athletic Shoes |
| 瑜珈墊 | Sporting Goods > Exercise & Fitness > Yoga & Pilates > Yoga Mats |

## 特殊類別

部分類別需額外欄位：
- 服飾: `size`, `color`, `gender`, `age_group`
- 手機: `brand`, `model`
- 軟體: `operating_system`

## 應用

### Product Feed
```json
{
  "title": "Nike 女生跑鞋",
  "google_product_category": "Apparel & Accessories > Shoes > Athletic Shoes",
  "price": "3000 TWD"
}
```

### 對照其他分類系統

| 系統 | 用途 | 規模 |
|------|------|------|
| Google Product Category | Google Shopping | 6000+ |
| IAB Content Taxonomy | 廣告受眾定位 | 700+ |
| Facebook Product Catalog | FB/IG 購物 | 自定義 |

## 參考

- [官方說明](https://support.google.com/merchants/answer/6324436)
- [Feed 規格](https://support.google.com/merchants/answer/7052112)
