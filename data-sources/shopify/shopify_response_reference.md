# Shopify Response Reference

## 文件資訊
- **建立日期**: 2025-12-08
- **版本**: 1.0
- **用途**: Shopify API 響應格式完整參考 (products.json, handle.json, JSON-LD)
- **相關文件**: [shopify_crawler_guide.md](./shopify_crawler_guide.md) - 爬蟲技術指南

---

## 目錄
1. [products.json 格式](#1-productsjson-格式)
2. [handle.json 格式](#2-handlejson-格式)
3. [collections/handle/products.json 格式](#3-collectionshandleproductsjson-格式)
4. [JSON-LD 結構化資料格式](#4-json-ld-結構化資料格式)
5. [欄位詳細說明](#5-欄位詳細說明)
6. [資料類型與驗證](#6-資料類型與驗證)

---

## 1. products.json 格式

### 1.1 端點

```
GET https://{domain}/products.json
GET https://{domain}/products.json?limit=250&page=1
```

### 1.2 完整響應結構

```json
{
  "products": [
    {
      "id": 1234567890123456789,
      "title": "Example Product Title",
      "handle": "example-product-title",
      "body_html": "<p>Full HTML description of the product.</p>\n<ul>\n<li>Feature 1</li>\n<li>Feature 2</li>\n</ul>",
      "published_at": "2023-06-15T10:30:00-04:00",
      "created_at": "2023-06-01T09:00:00-04:00",
      "updated_at": "2024-12-07T14:22:00-05:00",
      "vendor": "Brand Name",
      "product_type": "Supplements",
      "tags": [
        "protein",
        "whey",
        "fitness",
        "supplement"
      ],
      "variants": [
        {
          "id": 9876543210987654321,
          "title": "1 lb / Vanilla",
          "option1": "1 lb",
          "option2": "Vanilla",
          "option3": null,
          "sku": "PROT-1LB-VAN",
          "requires_shipping": true,
          "taxable": true,
          "featured_image": {
            "id": 11111111111111111,
            "product_id": 1234567890123456789,
            "position": 2,
            "created_at": "2023-06-01T09:05:00-04:00",
            "updated_at": "2023-06-01T09:05:00-04:00",
            "width": 1000,
            "height": 1000,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/variant-image.jpg?v=1685621100",
            "variant_ids": [
              9876543210987654321
            ]
          },
          "available": true,
          "name": "Example Product Title - 1 lb / Vanilla",
          "public_title": "1 lb / Vanilla",
          "options": [
            "1 lb",
            "Vanilla"
          ],
          "price": "29.99",
          "weight": 453,
          "compare_at_price": "39.99",
          "inventory_management": "shopify",
          "barcode": "012345678901",
          "featured_media": {
            "alt": "Variant image alt text",
            "id": 22222222222222222,
            "position": 2,
            "preview_image": {
              "aspect_ratio": 1.0,
              "height": 1000,
              "width": 1000,
              "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/variant-image.jpg?v=1685621100"
            }
          },
          "requires_selling_plan": false,
          "selling_plan_allocations": [],
          "quantity_rule": {
            "min": 1,
            "max": null,
            "increment": 1
          }
        },
        {
          "id": 9876543210987654322,
          "title": "2 lb / Vanilla",
          "option1": "2 lb",
          "option2": "Vanilla",
          "option3": null,
          "sku": "PROT-2LB-VAN",
          "requires_shipping": true,
          "taxable": true,
          "featured_image": null,
          "available": true,
          "name": "Example Product Title - 2 lb / Vanilla",
          "public_title": "2 lb / Vanilla",
          "options": [
            "2 lb",
            "Vanilla"
          ],
          "price": "49.99",
          "weight": 907,
          "compare_at_price": "64.99",
          "inventory_management": "shopify",
          "barcode": "012345678902",
          "featured_media": {
            "alt": null,
            "id": 22222222222222222,
            "position": 2,
            "preview_image": {
              "aspect_ratio": 1.0,
              "height": 1000,
              "width": 1000,
              "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/variant-image.jpg?v=1685621100"
            }
          },
          "requires_selling_plan": false,
          "selling_plan_allocations": [],
          "quantity_rule": {
            "min": 1,
            "max": null,
            "increment": 1
          }
        },
        {
          "id": 9876543210987654323,
          "title": "1 lb / Chocolate",
          "option1": "1 lb",
          "option2": "Chocolate",
          "option3": null,
          "sku": "PROT-1LB-CHO",
          "requires_shipping": true,
          "taxable": true,
          "featured_image": {
            "id": 11111111111111112,
            "product_id": 1234567890123456789,
            "position": 3,
            "created_at": "2023-06-01T09:06:00-04:00",
            "updated_at": "2023-06-01T09:06:00-04:00",
            "width": 1000,
            "height": 1000,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-variant.jpg?v=1685621160",
            "variant_ids": [
              9876543210987654323
            ]
          },
          "available": false,
          "name": "Example Product Title - 1 lb / Chocolate",
          "public_title": "1 lb / Chocolate",
          "options": [
            "1 lb",
            "Chocolate"
          ],
          "price": "29.99",
          "weight": 453,
          "compare_at_price": null,
          "inventory_management": "shopify",
          "barcode": null,
          "featured_media": {
            "alt": "Chocolate flavor",
            "id": 22222222222222223,
            "position": 3,
            "preview_image": {
              "aspect_ratio": 1.0,
              "height": 1000,
              "width": 1000,
              "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-variant.jpg?v=1685621160"
            }
          },
          "requires_selling_plan": false,
          "selling_plan_allocations": [],
          "quantity_rule": {
            "min": 1,
            "max": 10,
            "increment": 1
          }
        }
      ],
      "options": [
        {
          "id": 1111111111111111111,
          "product_id": 1234567890123456789,
          "name": "Size",
          "position": 1,
          "values": [
            "1 lb",
            "2 lb",
            "5 lb"
          ]
        },
        {
          "id": 2222222222222222222,
          "product_id": 1234567890123456789,
          "name": "Flavor",
          "position": 2,
          "values": [
            "Vanilla",
            "Chocolate",
            "Strawberry",
            "Unflavored"
          ]
        }
      ],
      "images": [
        {
          "id": 33333333333333333,
          "product_id": 1234567890123456789,
          "position": 1,
          "created_at": "2023-06-01T09:00:00-04:00",
          "updated_at": "2023-06-01T09:00:00-04:00",
          "alt": "Main product image",
          "width": 2048,
          "height": 2048,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/main-product-image.jpg?v=1685620800",
          "variant_ids": []
        },
        {
          "id": 11111111111111111,
          "product_id": 1234567890123456789,
          "position": 2,
          "created_at": "2023-06-01T09:05:00-04:00",
          "updated_at": "2023-06-01T09:05:00-04:00",
          "alt": "Vanilla variant",
          "width": 1000,
          "height": 1000,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/variant-image.jpg?v=1685621100",
          "variant_ids": [
            9876543210987654321,
            9876543210987654322
          ]
        },
        {
          "id": 11111111111111112,
          "product_id": 1234567890123456789,
          "position": 3,
          "created_at": "2023-06-01T09:06:00-04:00",
          "updated_at": "2023-06-01T09:06:00-04:00",
          "alt": "Chocolate flavor",
          "width": 1000,
          "height": 1000,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-variant.jpg?v=1685621160",
          "variant_ids": [
            9876543210987654323
          ]
        },
        {
          "id": 44444444444444444,
          "product_id": 1234567890123456789,
          "position": 4,
          "created_at": "2023-06-01T09:07:00-04:00",
          "updated_at": "2023-06-01T09:07:00-04:00",
          "alt": "Nutrition facts label",
          "width": 800,
          "height": 1200,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/nutrition-label.jpg?v=1685621220",
          "variant_ids": []
        }
      ],
      "image": {
        "id": 33333333333333333,
        "product_id": 1234567890123456789,
        "position": 1,
        "created_at": "2023-06-01T09:00:00-04:00",
        "updated_at": "2023-06-01T09:00:00-04:00",
        "alt": "Main product image",
        "width": 2048,
        "height": 2048,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/main-product-image.jpg?v=1685620800",
        "variant_ids": []
      }
    }
  ]
}
```

### 1.3 最小化範例（僅必要欄位）

```json
{
  "products": [
    {
      "id": 1234567890123456789,
      "title": "Simple Product",
      "handle": "simple-product",
      "body_html": "<p>Product description.</p>",
      "published_at": "2023-06-15T10:30:00-04:00",
      "created_at": "2023-06-01T09:00:00-04:00",
      "updated_at": "2024-12-07T14:22:00-05:00",
      "vendor": "Brand",
      "product_type": "Supplements",
      "tags": ["tag1", "tag2"],
      "variants": [
        {
          "id": 9876543210987654321,
          "title": "Default Title",
          "price": "19.99",
          "sku": "SKU-001",
          "available": true
        }
      ],
      "options": [
        {
          "name": "Title",
          "values": ["Default Title"]
        }
      ],
      "images": [
        {
          "id": 33333333333333333,
          "src": "https://cdn.shopify.com/s/files/1/.../image.jpg"
        }
      ],
      "image": {
        "id": 33333333333333333,
        "src": "https://cdn.shopify.com/s/files/1/.../image.jpg"
      }
    }
  ]
}
```

---

## 2. handle.json 格式

### 2.1 端點

```
GET https://{domain}/products/{handle}.json
```

**範例**:
```
GET https://example.com/products/whey-protein-powder.json
```

### 2.2 完整響應結構

**重要**: 注意 key 是 `"product"` (單數)，不是 `"products"` (複數)

```json
{
  "product": {
    "id": 1234567890123456789,
    "title": "Whey Protein Powder",
    "handle": "whey-protein-powder",
    "body_html": "<h2>Product Overview</h2>\n<p>High-quality whey protein powder for muscle building and recovery.</p>\n<h3>Key Features</h3>\n<ul>\n<li>25g protein per serving</li>\n<li>5g BCAAs</li>\n<li>Low carb, low fat</li>\n<li>Mixes easily</li>\n</ul>\n<h3>Ingredients</h3>\n<p>Whey Protein Concentrate, Natural Flavors, Stevia Extract.</p>",
    "published_at": "2023-01-15T08:00:00-05:00",
    "created_at": "2023-01-10T14:30:00-05:00",
    "updated_at": "2024-12-05T10:15:00-05:00",
    "vendor": "NutriCo",
    "product_type": "Protein Supplements",
    "tags": [
      "protein",
      "whey",
      "supplement",
      "muscle-building",
      "post-workout",
      "gluten-free"
    ],
    "variants": [
      {
        "id": 9876543210987654321,
        "title": "1 lb / Vanilla",
        "option1": "1 lb",
        "option2": "Vanilla",
        "option3": null,
        "sku": "WPP-1LB-VAN",
        "requires_shipping": true,
        "taxable": true,
        "featured_image": {
          "id": 11111111111111111,
          "product_id": 1234567890123456789,
          "position": 2,
          "created_at": "2023-01-10T14:35:00-05:00",
          "updated_at": "2023-01-10T14:35:00-05:00",
          "width": 1024,
          "height": 1024,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-1lb.jpg?v=1673373300",
          "variant_ids": [9876543210987654321]
        },
        "available": true,
        "name": "Whey Protein Powder - 1 lb / Vanilla",
        "public_title": "1 lb / Vanilla",
        "options": ["1 lb", "Vanilla"],
        "price": "24.99",
        "weight": 453,
        "compare_at_price": "29.99",
        "inventory_management": "shopify",
        "barcode": "850012345601",
        "featured_media": {
          "alt": "1 lb Vanilla Whey Protein",
          "id": 22222222222222221,
          "position": 2,
          "preview_image": {
            "aspect_ratio": 1.0,
            "height": 1024,
            "width": 1024,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-1lb.jpg?v=1673373300"
          }
        },
        "requires_selling_plan": false,
        "selling_plan_allocations": [],
        "quantity_rule": {
          "min": 1,
          "max": null,
          "increment": 1
        }
      },
      {
        "id": 9876543210987654322,
        "title": "2 lb / Vanilla",
        "option1": "2 lb",
        "option2": "Vanilla",
        "option3": null,
        "sku": "WPP-2LB-VAN",
        "requires_shipping": true,
        "taxable": true,
        "featured_image": {
          "id": 11111111111111112,
          "product_id": 1234567890123456789,
          "position": 3,
          "created_at": "2023-01-10T14:36:00-05:00",
          "updated_at": "2023-01-10T14:36:00-05:00",
          "width": 1024,
          "height": 1024,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-2lb.jpg?v=1673373360",
          "variant_ids": [9876543210987654322]
        },
        "available": true,
        "name": "Whey Protein Powder - 2 lb / Vanilla",
        "public_title": "2 lb / Vanilla",
        "options": ["2 lb", "Vanilla"],
        "price": "44.99",
        "weight": 907,
        "compare_at_price": "54.99",
        "inventory_management": "shopify",
        "barcode": "850012345602",
        "featured_media": {
          "alt": "2 lb Vanilla Whey Protein",
          "id": 22222222222222222,
          "position": 3,
          "preview_image": {
            "aspect_ratio": 1.0,
            "height": 1024,
            "width": 1024,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-2lb.jpg?v=1673373360"
          }
        },
        "requires_selling_plan": false,
        "selling_plan_allocations": [],
        "quantity_rule": {
          "min": 1,
          "max": null,
          "increment": 1
        }
      },
      {
        "id": 9876543210987654323,
        "title": "5 lb / Vanilla",
        "option1": "5 lb",
        "option2": "Vanilla",
        "option3": null,
        "sku": "WPP-5LB-VAN",
        "requires_shipping": true,
        "taxable": true,
        "featured_image": {
          "id": 11111111111111113,
          "product_id": 1234567890123456789,
          "position": 4,
          "created_at": "2023-01-10T14:37:00-05:00",
          "updated_at": "2023-01-10T14:37:00-05:00",
          "width": 1024,
          "height": 1024,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-5lb.jpg?v=1673373420",
          "variant_ids": [9876543210987654323]
        },
        "available": true,
        "name": "Whey Protein Powder - 5 lb / Vanilla",
        "public_title": "5 lb / Vanilla",
        "options": ["5 lb", "Vanilla"],
        "price": "89.99",
        "weight": 2268,
        "compare_at_price": "109.99",
        "inventory_management": "shopify",
        "barcode": "850012345603",
        "featured_media": {
          "alt": "5 lb Vanilla Whey Protein",
          "id": 22222222222222223,
          "position": 4,
          "preview_image": {
            "aspect_ratio": 1.0,
            "height": 1024,
            "width": 1024,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-5lb.jpg?v=1673373420"
          }
        },
        "requires_selling_plan": false,
        "selling_plan_allocations": [],
        "quantity_rule": {
          "min": 1,
          "max": 5,
          "increment": 1
        }
      },
      {
        "id": 9876543210987654324,
        "title": "1 lb / Chocolate",
        "option1": "1 lb",
        "option2": "Chocolate",
        "option3": null,
        "sku": "WPP-1LB-CHO",
        "requires_shipping": true,
        "taxable": true,
        "featured_image": {
          "id": 11111111111111114,
          "product_id": 1234567890123456789,
          "position": 5,
          "created_at": "2023-01-10T14:38:00-05:00",
          "updated_at": "2023-01-10T14:38:00-05:00",
          "width": 1024,
          "height": 1024,
          "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-1lb.jpg?v=1673373480",
          "variant_ids": [9876543210987654324]
        },
        "available": false,
        "name": "Whey Protein Powder - 1 lb / Chocolate",
        "public_title": "1 lb / Chocolate",
        "options": ["1 lb", "Chocolate"],
        "price": "24.99",
        "weight": 453,
        "compare_at_price": null,
        "inventory_management": "shopify",
        "barcode": "850012345604",
        "featured_media": {
          "alt": "1 lb Chocolate Whey Protein (Out of Stock)",
          "id": 22222222222222224,
          "position": 5,
          "preview_image": {
            "aspect_ratio": 1.0,
            "height": 1024,
            "width": 1024,
            "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-1lb.jpg?v=1673373480"
          }
        },
        "requires_selling_plan": false,
        "selling_plan_allocations": [],
        "quantity_rule": {
          "min": 1,
          "max": null,
          "increment": 1
        }
      }
    ],
    "options": [
      {
        "id": 1111111111111111111,
        "product_id": 1234567890123456789,
        "name": "Size",
        "position": 1,
        "values": ["1 lb", "2 lb", "5 lb"]
      },
      {
        "id": 2222222222222222222,
        "product_id": 1234567890123456789,
        "name": "Flavor",
        "position": 2,
        "values": ["Vanilla", "Chocolate", "Strawberry", "Unflavored"]
      }
    ],
    "images": [
      {
        "id": 33333333333333333,
        "product_id": 1234567890123456789,
        "position": 1,
        "created_at": "2023-01-10T14:30:00-05:00",
        "updated_at": "2023-01-10T14:30:00-05:00",
        "alt": "Whey Protein Powder main image",
        "width": 2000,
        "height": 2000,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/main-image.jpg?v=1673373000",
        "variant_ids": []
      },
      {
        "id": 11111111111111111,
        "product_id": 1234567890123456789,
        "position": 2,
        "created_at": "2023-01-10T14:35:00-05:00",
        "updated_at": "2023-01-10T14:35:00-05:00",
        "alt": "1 lb Vanilla Whey Protein",
        "width": 1024,
        "height": 1024,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-1lb.jpg?v=1673373300",
        "variant_ids": [9876543210987654321]
      },
      {
        "id": 11111111111111112,
        "product_id": 1234567890123456789,
        "position": 3,
        "created_at": "2023-01-10T14:36:00-05:00",
        "updated_at": "2023-01-10T14:36:00-05:00",
        "alt": "2 lb Vanilla Whey Protein",
        "width": 1024,
        "height": 1024,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-2lb.jpg?v=1673373360",
        "variant_ids": [9876543210987654322]
      },
      {
        "id": 11111111111111113,
        "product_id": 1234567890123456789,
        "position": 4,
        "created_at": "2023-01-10T14:37:00-05:00",
        "updated_at": "2023-01-10T14:37:00-05:00",
        "alt": "5 lb Vanilla Whey Protein",
        "width": 1024,
        "height": 1024,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/vanilla-5lb.jpg?v=1673373420",
        "variant_ids": [9876543210987654323]
      },
      {
        "id": 11111111111111114,
        "product_id": 1234567890123456789,
        "position": 5,
        "created_at": "2023-01-10T14:38:00-05:00",
        "updated_at": "2023-01-10T14:38:00-05:00",
        "alt": "1 lb Chocolate Whey Protein (Out of Stock)",
        "width": 1024,
        "height": 1024,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/chocolate-1lb.jpg?v=1673373480",
        "variant_ids": [9876543210987654324]
      },
      {
        "id": 44444444444444444,
        "product_id": 1234567890123456789,
        "position": 6,
        "created_at": "2023-01-10T14:40:00-05:00",
        "updated_at": "2023-01-10T14:40:00-05:00",
        "alt": "Supplement Facts Label",
        "width": 800,
        "height": 1200,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/supplement-facts.jpg?v=1673373600",
        "variant_ids": []
      },
      {
        "id": 55555555555555555,
        "product_id": 1234567890123456789,
        "position": 7,
        "created_at": "2023-01-10T14:41:00-05:00",
        "updated_at": "2023-01-10T14:41:00-05:00",
        "alt": "Serving size information",
        "width": 800,
        "height": 600,
        "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/serving-info.jpg?v=1673373660",
        "variant_ids": []
      }
    ],
    "image": {
      "id": 33333333333333333,
      "product_id": 1234567890123456789,
      "position": 1,
      "created_at": "2023-01-10T14:30:00-05:00",
      "updated_at": "2023-01-10T14:30:00-05:00",
      "alt": "Whey Protein Powder main image",
      "width": 2000,
      "height": 2000,
      "src": "https://cdn.shopify.com/s/files/1/0123/4567/8901/products/main-image.jpg?v=1673373000",
      "variant_ids": []
    }
  }
}
```

### 2.3 關鍵差異

| 特性 | products.json | handle.json |
|------|--------------|-------------|
| 根 Key | `"products"` (複數, array) | `"product"` (單數, object) |
| 回傳數量 | 多個產品 (分頁) | 單一產品 |
| 需要參數 | limit, page | handle (URL 路徑) |
| 用途 | 批量獲取 | 特定產品詳情 |

---

## 3. collections/handle/products.json 格式

### 3.1 端點

```
GET https://{domain}/collections/{collection_handle}/products.json
GET https://{domain}/collections/{collection_handle}/products.json?limit=250&page=1
```

**範例**:
```
GET https://example.com/collections/supplements/products.json?limit=250
GET https://example.com/collections/protein-powders/products.json?page=2
```

### 3.2 響應結構

響應格式與 `/products.json` **完全相同**，但僅包含該 collection 中的產品：

```json
{
  "products": [
    {
      "id": 1234567890123456789,
      "title": "Product in Collection",
      "handle": "product-in-collection",
      // ... 其他欄位與 products.json 相同
    }
  ]
}
```

### 3.3 常見 Collection Handles

```bash
# 常見的 collection 路徑
/collections/all/products.json              # 所有產品
/collections/supplements/products.json      # 補充品分類
/collections/protein/products.json          # 蛋白質分類
/collections/vitamins/products.json         # 維他命分類
/collections/sale/products.json             # 特價商品
/collections/new-arrivals/products.json     # 新品
/collections/best-sellers/products.json     # 暢銷品
```

---

## 4. JSON-LD 結構化資料格式

### 4.1 什麼是 JSON-LD?

**JSON-LD** (JavaScript Object Notation for Linked Data) 是一種結構化資料格式，用於提供產品資訊給搜尋引擎（如 Google）。它遵循 **schema.org** 標準，幫助搜尋引擎理解頁面內容。

**位置**: JSON-LD 嵌入在產品頁面的 HTML 中，通常在 `<script type="application/ld+json">` 標籤內。

**用途**:
- SEO 優化
- Google 搜尋的豐富結果 (Rich Results)
- 顯示產品評分、價格、庫存狀態

### 5.2 如何獲取 JSON-LD

#### 方法 1: 從產品頁面 HTML 提取

```python
import requests
import re
import json

def extract_jsonld_from_product_page(domain: str, handle: str) -> dict:
    """從產品頁面提取 JSON-LD 資料"""
    url = f"https://{domain}/products/{handle}"
    response = requests.get(url, timeout=30)
    html = response.text

    # 查找 JSON-LD script 標籤
    pattern = r'<script type="application/ld\+json">(.*?)</script>'
    matches = re.findall(pattern, html, re.DOTALL)

    jsonld_data = []
    for match in matches:
        try:
            data = json.loads(match.strip())
            jsonld_data.append(data)
        except json.JSONDecodeError:
            continue

    return jsonld_data

# 使用範例
jsonld_list = extract_jsonld_from_product_page("example.com", "whey-protein")
for data in jsonld_list:
    if data.get('@type') in ['Product', 'ProductGroup']:
        print(json.dumps(data, indent=2))
```

### 5.3 單一產品的 JSON-LD 格式

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Whey Protein Powder",
  "image": [
    "https://cdn.shopify.com/s/files/1/.../main-image.jpg",
    "https://cdn.shopify.com/s/files/1/.../image-2.jpg"
  ],
  "description": "High-quality whey protein powder for muscle building and recovery.",
  "sku": "WPP-1LB-VAN",
  "mpn": "12345",
  "brand": {
    "@type": "Brand",
    "name": "NutriCo"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/whey-protein",
    "priceCurrency": "USD",
    "price": "24.99",
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "NutriCo Store"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "89"
  }
}
```

### 5.4 多變體產品的 JSON-LD 格式 (ProductGroup)

當產品有多個變體時，Shopify 使用 **ProductGroup** 結構：

```json
{
  "@context": "https://schema.org/",
  "@type": "ProductGroup",
  "name": "Whey Protein Powder",
  "description": "High-quality whey protein powder for muscle building and recovery.",
  "url": "https://example.com/products/whey-protein",
  "brand": {
    "@type": "Brand",
    "name": "NutriCo"
  },
  "image": [
    "https://cdn.shopify.com/s/files/1/.../main-image.jpg"
  ],
  "hasVariant": [
    {
      "@type": "Product",
      "name": "Whey Protein Powder - 1 lb / Vanilla",
      "sku": "WPP-1LB-VAN",
      "gtin13": "8500123456017",
      "image": "https://cdn.shopify.com/s/files/1/.../vanilla-1lb.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/products/whey-protein?variant=9876543210987654321",
        "priceCurrency": "USD",
        "price": "24.99",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "NutriCo Store"
        }
      }
    },
    {
      "@type": "Product",
      "name": "Whey Protein Powder - 2 lb / Vanilla",
      "sku": "WPP-2LB-VAN",
      "gtin13": "8500123456024",
      "image": "https://cdn.shopify.com/s/files/1/.../vanilla-2lb.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/products/whey-protein?variant=9876543210987654322",
        "priceCurrency": "USD",
        "price": "44.99",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "NutriCo Store"
        }
      }
    },
    {
      "@type": "Product",
      "name": "Whey Protein Powder - 1 lb / Chocolate",
      "sku": "WPP-1LB-CHO",
      "gtin13": "8500123456048",
      "image": "https://cdn.shopify.com/s/files/1/.../chocolate-1lb.jpg",
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/products/whey-protein?variant=9876543210987654324",
        "priceCurrency": "USD",
        "price": "24.99",
        "availability": "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "NutriCo Store"
        }
      }
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "89"
  }
}
```

### 5.5 JSON-LD 關鍵欄位說明

#### @context
- **固定值**: `"https://schema.org/"`
- **說明**: 定義 schema 詞彙標準

#### @type
- **可能值**: `"Product"`, `"ProductGroup"`
- **說明**:
  - `Product`: 單一產品或無變體產品
  - `ProductGroup`: 有多個變體的產品

#### name
- **類型**: String
- **說明**: 產品名稱

#### image
- **類型**: String 或 Array of Strings
- **說明**: 產品圖片 URL
- **格式**: 完整的 CDN URL

#### sku
- **類型**: String
- **說明**: 庫存單位編號

#### mpn
- **類型**: String
- **說明**: 製造商零件編號 (Manufacturer Part Number)

#### gtin13
- **類型**: String
- **說明**: 全球貿易項目編號 (GTIN-13, EAN-13)
- **格式**: 13位數字

#### brand
- **類型**: Object
- **結構**:
  ```json
  {
    "@type": "Brand",
    "name": "Brand Name"
  }
  ```

#### offers
- **類型**: Object
- **說明**: 產品報價資訊
- **關鍵子欄位**:
  - `priceCurrency`: 幣別代碼 (ISO 4217)
  - `price`: 價格（字串格式）
  - `availability`: 庫存狀態 URL
  - `url`: 產品 URL

#### availability 可能值

| Schema.org URL | 含義 |
|---------------|------|
| `https://schema.org/InStock` | 有庫存 |
| `https://schema.org/OutOfStock` | 缺貨 |
| `https://schema.org/PreOrder` | 預購 |
| `https://schema.org/Discontinued` | 停產 |
| `https://schema.org/LimitedAvailability` | 庫存有限 |

#### aggregateRating
- **類型**: Object
- **說明**: 產品評分統計
- **結構**:
  ```json
  {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "89"
  }
  ```

#### hasVariant (僅 ProductGroup)
- **類型**: Array of Objects
- **說明**: 產品變體列表
- **每個變體**: 完整的 `Product` 結構

### 5.6 Shopify 內建生成方式

Shopify 主題使用 Liquid 的 `structured_data` filter 自動生成 JSON-LD：

```liquid
<script type="application/ld+json">
  {{ product | structured_data }}
</script>
```

**注意**: 如果主題已使用此 filter，手動添加 JSON-LD 會造成重複。

### 5.7 JSON-LD vs products.json 差異

| 特性 | JSON-LD | products.json |
|------|---------|--------------|
| **位置** | 嵌入 HTML 中 | 獨立 API 端點 |
| **格式** | Schema.org 標準 | Shopify 內部格式 |
| **用途** | SEO, 搜尋引擎 | 程式化數據獲取 |
| **變體** | hasVariant 陣列 | variants 陣列 |
| **價格** | offers.price | variants[].price |
| **庫存** | offers.availability | variants[].available |
| **圖片** | image 陣列 | images 陣列 |
| **獲取方式** | 解析 HTML | HTTP GET JSON |

### 5.8 提取 JSON-LD 的完整範例

```python
import requests
import re
import json
from bs4 import BeautifulSoup

class ShopifyJSONLDExtractor:
    """Shopify JSON-LD 提取器"""

    def __init__(self, domain: str):
        self.domain = domain

    def fetch_product_page(self, handle: str) -> str:
        """獲取產品頁面 HTML"""
        url = f"https://{self.domain}/products/{handle}"
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.text

    def extract_all_jsonld(self, html: str) -> list:
        """提取頁面中所有 JSON-LD 資料"""
        soup = BeautifulSoup(html, 'html.parser')
        scripts = soup.find_all('script', type='application/ld+json')

        jsonld_list = []
        for script in scripts:
            try:
                data = json.loads(script.string)
                jsonld_list.append(data)
            except json.JSONDecodeError:
                continue

        return jsonld_list

    def extract_product_jsonld(self, handle: str) -> dict:
        """提取產品的 JSON-LD 資料"""
        html = self.fetch_product_page(handle)
        jsonld_list = self.extract_all_jsonld(html)

        # 找到 Product 或 ProductGroup 類型
        for data in jsonld_list:
            if data.get('@type') in ['Product', 'ProductGroup']:
                return data

        return None

    def get_variants_from_jsonld(self, jsonld: dict) -> list:
        """從 JSON-LD 提取變體資訊"""
        if jsonld.get('@type') == 'Product':
            # 單一產品
            return [{
                'name': jsonld.get('name'),
                'sku': jsonld.get('sku'),
                'price': jsonld.get('offers', {}).get('price'),
                'currency': jsonld.get('offers', {}).get('priceCurrency'),
                'availability': jsonld.get('offers', {}).get('availability')
            }]

        elif jsonld.get('@type') == 'ProductGroup':
            # 多變體產品
            variants = []
            for variant_data in jsonld.get('hasVariant', []):
                variants.append({
                    'name': variant_data.get('name'),
                    'sku': variant_data.get('sku'),
                    'gtin': variant_data.get('gtin13'),
                    'price': variant_data.get('offers', {}).get('price'),
                    'currency': variant_data.get('offers', {}).get('priceCurrency'),
                    'availability': variant_data.get('offers', {}).get('availability'),
                    'url': variant_data.get('offers', {}).get('url')
                })
            return variants

        return []

    def compare_jsonld_with_api(self, handle: str) -> dict:
        """比較 JSON-LD 與 products.json API 的差異"""
        # 獲取 JSON-LD
        jsonld = self.extract_product_jsonld(handle)

        # 獲取 products.json
        api_url = f"https://{self.domain}/products/{handle}.json"
        api_response = requests.get(api_url, timeout=30)
        api_data = api_response.json()['product']

        # 比較
        jsonld_variants = self.get_variants_from_jsonld(jsonld)
        api_variants = api_data.get('variants', [])

        return {
            'jsonld_variant_count': len(jsonld_variants),
            'api_variant_count': len(api_variants),
            'jsonld_variants': jsonld_variants,
            'api_variants': [{
                'id': v['id'],
                'sku': v.get('sku'),
                'price': v.get('price'),
                'available': v.get('available')
            } for v in api_variants]
        }

# 使用範例
extractor = ShopifyJSONLDExtractor("example.com")

# 提取 JSON-LD
jsonld_data = extractor.extract_product_jsonld("whey-protein")
print(json.dumps(jsonld_data, indent=2))

# 提取變體資訊
variants = extractor.get_variants_from_jsonld(jsonld_data)
for variant in variants:
    print(f"SKU: {variant['sku']}, Price: {variant['price']}")

# 比較 JSON-LD 與 API
comparison = extractor.compare_jsonld_with_api("whey-protein")
print(json.dumps(comparison, indent=2))
```

### 5.9 JSON-LD 的優勢

1. **SEO 優化**: Google 推薦使用 JSON-LD 格式
2. **豐富搜尋結果**: 支援產品評分、價格、庫存等資訊顯示
3. **標準化格式**: 遵循 Schema.org 國際標準
4. **搜尋引擎友好**: 更容易被搜尋引擎索引和理解

### 5.10 注意事項

⚠️ **重要提醒**:
- JSON-LD 資料**嵌入在 HTML 中**，需要解析 HTML 才能獲取
- 與 `products.json` API 是**不同的資料來源**
- JSON-LD 可能包含額外的 SEO 優化資訊（如評分、GTIN）
- 某些主題可能自訂 JSON-LD 結構，與標準格式略有不同
- 如果主題未使用 `structured_data` filter，可能沒有 JSON-LD

---

## 5. 欄位詳細說明

### 5.1 產品層級欄位

#### id
- **類型**: Integer (大數字)
- **範例**: `1234567890123456789`
- **說明**: 產品的唯一識別碼，在整個 Shopify 系統中唯一
- **特性**: 不可變，即使產品更新也不會改變

#### title
- **類型**: String
- **範例**: `"Whey Protein Powder"`
- **說明**: 產品的顯示標題
- **最大長度**: 255 字元

#### handle
- **類型**: String
- **範例**: `"whey-protein-powder"`
- **說明**: URL 友好的產品識別碼 (slug)
- **格式**: 小寫字母、數字、連字號，不含空格
- **用途**: 用於構建產品 URL: `/products/{handle}`

#### body_html
- **類型**: String (HTML)
- **範例**: `"<p>Product description</p><ul><li>Feature 1</li></ul>"`
- **說明**: 產品描述，支援 HTML 格式
- **可能為空**: `null` 或 `""`

#### published_at
- **類型**: String (ISO 8601 日期時間)
- **範例**: `"2023-06-15T10:30:00-04:00"`
- **說明**: 產品發布時間
- **null 表示**: 產品未發布（草稿狀態）

#### created_at
- **類型**: String (ISO 8601 日期時間)
- **範例**: `"2023-06-01T09:00:00-04:00"`
- **說明**: 產品創建時間

#### updated_at
- **類型**: String (ISO 8601 日期時間)
- **範例**: `"2024-12-07T14:22:00-05:00"`
- **說明**: 產品最後更新時間
- **用途**: 追蹤產品變更

#### vendor
- **類型**: String
- **範例**: `"NutriCo"`, `"Brand Name"`
- **說明**: 產品供應商/品牌名稱
- **可能為空**: `""`

#### product_type
- **類型**: String
- **範例**: `"Supplements"`, `"Protein Powder"`, `"Vitamins"`
- **說明**: 產品類型/分類
- **可能為空**: `""`

#### tags
- **類型**: Array of Strings
- **範例**: `["protein", "whey", "supplement", "gluten-free"]`
- **說明**: 產品標籤，用於分類和搜尋
- **可能為空**: `[]`

### 5.2 變體層級欄位 (variants)

#### id
- **類型**: Integer (大數字)
- **範例**: `9876543210987654321`
- **說明**: 變體的唯一識別碼

#### title
- **類型**: String
- **範例**: `"1 lb / Vanilla"`, `"Default Title"`
- **說明**: 變體的完整標題（組合所有選項）

#### option1, option2, option3
- **類型**: String 或 null
- **範例**:
  - `option1: "1 lb"`
  - `option2: "Vanilla"`
  - `option3: null`
- **說明**: 變體選項值（最多3個）
- **null 表示**: 該選項未使用

#### sku
- **類型**: String
- **範例**: `"WPP-1LB-VAN"`, `"SKU-12345"`
- **說明**: 庫存單位編號（Stock Keeping Unit）
- **可能為空**: `null` 或 `""`

#### price
- **類型**: String (非數字!)
- **範例**: `"29.99"`, `"1299.00"`
- **說明**: 當前售價
- **格式**: 小數點後通常2位
- **注意**: 儲存為字串，需要轉換為 float

#### compare_at_price
- **類型**: String 或 null
- **範例**: `"39.99"`, `null`
- **說明**: 對比價格/原價（用於顯示折扣）
- **null 表示**: 無對比價格

#### available
- **類型**: Boolean
- **範例**: `true`, `false`
- **說明**: 變體是否可購買
- **false 原因**: 缺貨、未發布、庫存管理設定

#### weight
- **類型**: Integer
- **範例**: `453`, `907`, `2268`
- **說明**: 重量（單位由 weight_unit 決定）
- **預設單位**: 克 (grams)

#### weight_unit
- **類型**: String
- **範例**: `"g"`, `"kg"`, `"lb"`, `"oz"`
- **說明**: 重量單位
- **可能值**: `"g"`, `"kg"`, `"oz"`, `"lb"`

#### inventory_management
- **類型**: String 或 null
- **範例**: `"shopify"`, `null`
- **說明**: 庫存管理系統
- **null 表示**: 不追蹤庫存

#### inventory_quantity
- **類型**: Integer
- **範例**: `100`, `0`, `-5`
- **說明**: 當前庫存數量
- **注意**: 僅在 Admin API 中可用，Ajax API 中通常不顯示

#### barcode
- **類型**: String 或 null
- **範例**: `"850012345601"`, `"012345678901"`, `null`
- **說明**: 產品條碼 (UPC, EAN, ISBN 等)

#### requires_shipping
- **類型**: Boolean
- **範例**: `true`, `false`
- **說明**: 是否需要運送
- **false 用途**: 數位商品、服務

#### taxable
- **類型**: Boolean
- **範例**: `true`, `false`
- **說明**: 是否需要課稅

#### featured_image
- **類型**: Object 或 null
- **說明**: 變體專屬圖片
- **null 表示**: 使用產品主圖

#### name
- **類型**: String
- **範例**: `"Whey Protein Powder - 1 lb / Vanilla"`
- **說明**: 完整變體名稱（產品名 + 變體標題）

#### public_title
- **類型**: String 或 null
- **範例**: `"1 lb / Vanilla"`, `null`
- **說明**: 公開顯示的變體標題
- **null 表示**: 使用 "Default Title"

#### options
- **類型**: Array of Strings
- **範例**: `["1 lb", "Vanilla"]`
- **說明**: 變體選項值的陣列形式

#### quantity_rule
- **類型**: Object
- **結構**:
  ```json
  {
    "min": 1,
    "max": 10,
    "increment": 1
  }
  ```
- **說明**: 購買數量規則
  - `min`: 最小購買數量
  - `max`: 最大購買數量 (null = 無限制)
  - `increment`: 數量增量

#### requires_selling_plan
- **類型**: Boolean
- **範例**: `false`, `true`
- **說明**: 是否需要訂閱計劃才能購買

#### selling_plan_allocations
- **類型**: Array
- **範例**: `[]`
- **說明**: 訂閱計劃配置（通常為空）

### 5.3 選項欄位 (options)

```json
{
  "id": 1111111111111111111,
  "product_id": 1234567890123456789,
  "name": "Size",
  "position": 1,
  "values": ["1 lb", "2 lb", "5 lb"]
}
```

#### id
- **類型**: Integer
- **說明**: 選項的唯一識別碼

#### product_id
- **類型**: Integer
- **說明**: 關聯的產品 ID

#### name
- **類型**: String
- **範例**: `"Size"`, `"Color"`, `"Flavor"`
- **說明**: 選項名稱

#### position
- **類型**: Integer
- **範例**: `1`, `2`, `3`
- **說明**: 選項顯示順序
- **範圍**: 1-3

#### values
- **類型**: Array of Strings
- **範例**: `["Small", "Medium", "Large"]`
- **說明**: 該選項的所有可能值

### 5.4 圖片欄位 (images)

```json
{
  "id": 33333333333333333,
  "product_id": 1234567890123456789,
  "position": 1,
  "created_at": "2023-06-01T09:00:00-04:00",
  "updated_at": "2023-06-01T09:00:00-04:00",
  "alt": "Main product image",
  "width": 2048,
  "height": 2048,
  "src": "https://cdn.shopify.com/s/files/1/.../image.jpg?v=1685620800",
  "variant_ids": [9876543210987654321, 9876543210987654322]
}
```

#### id
- **類型**: Integer
- **說明**: 圖片的唯一識別碼

#### product_id
- **類型**: Integer
- **說明**: 關聯的產品 ID

#### position
- **類型**: Integer
- **範例**: `1`, `2`, `3`
- **說明**: 圖片顯示順序

#### alt
- **類型**: String 或 null
- **範例**: `"Main product image"`, `null`
- **說明**: 圖片替代文字 (SEO, 無障礙)

#### width
- **類型**: Integer
- **範例**: `2048`, `1024`, `800`
- **說明**: 圖片寬度（像素）

#### height
- **類型**: Integer
- **範例**: `2048`, `1024`, `600`
- **說明**: 圖片高度（像素）

#### src
- **類型**: String (URL)
- **範例**: `"https://cdn.shopify.com/s/files/1/0123/4567/8901/products/image.jpg?v=1685620800"`
- **說明**: 圖片 CDN URL
- **格式**: 通常包含版本參數 `?v=timestamp`

#### variant_ids
- **類型**: Array of Integers
- **範例**: `[]`, `[9876543210987654321]`, `[123, 456, 789]`
- **說明**: 關聯的變體 ID 列表
- **空陣列**: 產品通用圖片（不綁定特定變體）
- **有值**: 變體專屬圖片

### 5.5 主圖欄位 (image)

```json
{
  "id": 33333333333333333,
  "product_id": 1234567890123456789,
  "position": 1,
  "created_at": "2023-06-01T09:00:00-04:00",
  "updated_at": "2023-06-01T09:00:00-04:00",
  "alt": "Main product image",
  "width": 2048,
  "height": 2048,
  "src": "https://cdn.shopify.com/s/files/1/.../image.jpg?v=1685620800",
  "variant_ids": []
}
```

**說明**:
- 產品的主要圖片（通常是 `images` 陣列中 `position: 1` 的圖片）
- 結構與 `images` 陣列中的單個圖片相同
- 用於快速獲取主圖，無需遍歷 `images` 陣列

---

## 5. 資料類型與驗證

### 5.1 資料類型對照

| 欄位 | JSON 類型 | Python 類型 | 注意事項 |
|------|----------|------------|---------|
| id | Number | int | 大整數 (19位數字) |
| title | String | str | 最大255字元 |
| handle | String | str | 小寫、連字號格式 |
| body_html | String/null | str/None | HTML內容 |
| price | String | str | **不是數字!** 需轉換 |
| compare_at_price | String/null | str/None | 需轉換 |
| available | Boolean | bool | true/false |
| weight | Number | int | 整數 |
| tags | Array | list | 字串列表 |
| variant_ids | Array | list | 整數列表 |
| options | Array | list | 物件列表 |

### 5.2 必要欄位檢查

```python
def validate_product(product: dict) -> bool:
    """驗證產品必要欄位"""
    required_fields = ['id', 'title', 'handle', 'variants']

    for field in required_fields:
        if field not in product:
            return False

    # 檢查 variants 不為空
    if not product['variants']:
        return False

    return True

def validate_variant(variant: dict) -> bool:
    """驗證變體必要欄位"""
    required_fields = ['id', 'title', 'price']

    for field in required_fields:
        if field not in variant:
            return False

    # 檢查 price 格式
    try:
        float(variant['price'])
    except (ValueError, TypeError):
        return False

    return True
```

### 5.3 價格處理

```python
def parse_price(price_str: str) -> float:
    """安全地解析價格字串"""
    if not price_str:
        return 0.0

    try:
        return float(price_str)
    except (ValueError, TypeError):
        return 0.0

def format_price(price: float, currency: str = 'USD') -> str:
    """格式化價格顯示"""
    symbols = {'USD': '$', 'EUR': '€', 'GBP': '£'}
    symbol = symbols.get(currency, '$')
    return f"{symbol}{price:.2f}"

# 使用範例
variant_price = parse_price(variant['price'])  # "29.99" -> 29.99
display_price = format_price(variant_price, 'USD')  # 29.99 -> "$29.99"
```

### 5.4 日期時間處理

```python
from datetime import datetime

def parse_shopify_datetime(dt_str: str) -> datetime:
    """解析 Shopify ISO 8601 日期時間"""
    if not dt_str:
        return None

    # Shopify 格式: "2023-06-15T10:30:00-04:00"
    return datetime.fromisoformat(dt_str)

def is_recently_updated(product: dict, days: int = 7) -> bool:
    """檢查產品是否最近更新過"""
    if 'updated_at' not in product:
        return False

    updated_at = parse_shopify_datetime(product['updated_at'])
    if not updated_at:
        return False

    now = datetime.now(updated_at.tzinfo)
    delta = now - updated_at

    return delta.days <= days

# 使用範例
if is_recently_updated(product, days=7):
    print("產品在過去7天內有更新")
```

### 5.5 圖片 URL 處理

```python
import re

def extract_image_urls(product: dict) -> list:
    """提取所有圖片 URL"""
    urls = []

    # 主圖
    if product.get('image') and product['image'].get('src'):
        urls.append(product['image']['src'])

    # 所有圖片
    for img in product.get('images', []):
        if img.get('src'):
            urls.append(img['src'])

    # 去重
    return list(set(urls))

def resize_shopify_image(url: str, size: str = '1024x1024') -> str:
    """調整 Shopify 圖片尺寸"""
    # 在副檔名前插入尺寸
    pattern = r'(\.[a-z]{3,4})(\?|$)'
    replacement = rf'_{size}\1\2'
    return re.sub(pattern, replacement, url, count=1)

def get_image_variant_mapping(product: dict) -> dict:
    """建立圖片與變體的對應關係"""
    mapping = {}

    for img in product.get('images', []):
        img_id = img.get('id')
        variant_ids = img.get('variant_ids', [])

        if img_id:
            mapping[img_id] = {
                'src': img.get('src'),
                'variant_ids': variant_ids,
                'is_general': len(variant_ids) == 0
            }

    return mapping

# 使用範例
urls = extract_image_urls(product)
resized_url = resize_shopify_image(urls[0], '480x480')
mapping = get_image_variant_mapping(product)
```

### 5.6 變體選項處理

```python
def extract_variant_options(product: dict) -> dict:
    """提取變體選項結構"""
    options_structure = {}

    for opt in product.get('options', []):
        options_structure[opt['name']] = {
            'position': opt['position'],
            'values': opt['values']
        }

    return options_structure

def get_variant_option_combination(variant: dict) -> dict:
    """獲取變體的選項組合"""
    combination = {}

    if variant.get('option1'):
        combination['option1'] = variant['option1']
    if variant.get('option2'):
        combination['option2'] = variant['option2']
    if variant.get('option3'):
        combination['option3'] = variant['option3']

    return combination

def find_variant_by_options(product: dict, option1: str = None,
                           option2: str = None, option3: str = None) -> dict:
    """根據選項查找變體"""
    for variant in product.get('variants', []):
        if (option1 is None or variant.get('option1') == option1) and \
           (option2 is None or variant.get('option2') == option2) and \
           (option3 is None or variant.get('option3') == option3):
            return variant

    return None

# 使用範例
options = extract_variant_options(product)
# {'Size': {'position': 1, 'values': ['1 lb', '2 lb']},
#  'Flavor': {'position': 2, 'values': ['Vanilla', 'Chocolate']}}

variant = find_variant_by_options(product, option1='1 lb', option2='Vanilla')
```

---

## 附錄: 完整提取範例

```python
import requests
import json
from typing import Dict, List

class ShopifyProductParser:
    """Shopify 產品資料解析器"""

    def __init__(self, domain: str):
        self.domain = domain

    def fetch_products(self, limit: int = 250, page: int = 1) -> Dict:
        """獲取產品列表"""
        url = f"https://{self.domain}/products.json?limit={limit}&page={page}"
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()

    def fetch_product_by_handle(self, handle: str) -> Dict:
        """獲取單一產品"""
        url = f"https://{self.domain}/products/{handle}.json"
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()

    def extract_product_summary(self, product: dict) -> dict:
        """提取產品摘要資訊"""
        return {
            'id': product['id'],
            'title': product['title'],
            'handle': product['handle'],
            'vendor': product.get('vendor', ''),
            'product_type': product.get('product_type', ''),
            'tags': product.get('tags', []),
            'published_at': product.get('published_at'),
            'updated_at': product.get('updated_at'),
            'variants_count': len(product.get('variants', [])),
            'images_count': len(product.get('images', [])),
            'has_compare_price': any(
                v.get('compare_at_price') for v in product.get('variants', [])
            ),
            'price_range': self.get_price_range(product),
            'available_variants': sum(
                1 for v in product.get('variants', []) if v.get('available')
            )
        }

    def get_price_range(self, product: dict) -> dict:
        """獲取價格範圍"""
        prices = [float(v['price']) for v in product.get('variants', [])
                 if v.get('price')]

        if not prices:
            return {'min': 0, 'max': 0}

        return {
            'min': min(prices),
            'max': max(prices)
        }

    def extract_all_skus(self, product: dict) -> List[str]:
        """提取所有 SKU"""
        return [v.get('sku', '') for v in product.get('variants', [])
                if v.get('sku')]

    def extract_all_barcodes(self, product: dict) -> List[str]:
        """提取所有條碼"""
        return [v.get('barcode', '') for v in product.get('variants', [])
                if v.get('barcode')]

# 使用範例
parser = ShopifyProductParser("example.com")

# 獲取產品列表
data = parser.fetch_products(limit=250, page=1)
for product in data['products']:
    summary = parser.extract_product_summary(product)
    print(json.dumps(summary, indent=2))

# 獲取單一產品
product_data = parser.fetch_product_by_handle("whey-protein-powder")
product = product_data['product']
print(f"SKUs: {parser.extract_all_skus(product)}")
print(f"Barcodes: {parser.extract_all_barcodes(product)}")
```

---

**文件版本**: 1.0
**最後更新**: 2025-12-08
**相關文件**: [shopify_crawler_guide.md](./shopify_crawler_guide.md)
