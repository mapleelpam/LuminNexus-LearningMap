## 实际例子：Code vs Data

```python
# Code: 计算折扣的逻辑
def calculate_discount(amount):
    if amount > 1000:
        return amount * 0.1
    return 0

# Data: 具体的订单金额
order_amount = 1500  # 这是数据
discount = calculate_discount(order_amount)  # 这是代码执行
```

**关键**：代码定义规则，数据是被处理的对象

---

## 实际例子：Configuration vs Data

```python
# Configuration: 控制程序行为
API_URL = os.getenv("API_URL", "https://api.example.com")
MAX_RETRIES = int(os.getenv("MAX_RETRIES", "3"))

# Data: 用户输入
user_query = "SELECT * FROM products"  # 这是数据

# 使用 config 控制行为
response = requests.get(API_URL, params={"q": user_query},
                        timeout=MAX_RETRIES * 10)
```

**关键**：配置影响程序怎么运行，数据是程序处理的内容

---

## 实际例子：Stateless vs Stateful

```python
# ✅ Stateless: 相同输入 → 相同输出
def add(a, b):
    return a + b

add(2, 3)  # 永远是 5

# ❌ Stateful: 依赖外部状态
counter = 0
def increment():
    global counter
    counter += 1
    return counter

increment()  # 第一次返回 1
increment()  # 第二次返回 2 (不同的结果！)
```

**关键**：Stateless 函数只看输入，Stateful 函数还看"外部状态"
