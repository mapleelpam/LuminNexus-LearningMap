## 核心区别速查表

| 概念 | 本质 | 特征 | 例子 |
|------|------|------|------|
| **Code** | 逻辑和算法 | 描述"如何做" | 函数、类、方法 |
| **Data** | 信息和事实 | 描述"是什么" | 用户资料、订单记录 |
| **Config** | 控制参数 | 可变、环境特定 | API URL、数据库连接 |
| **Stateless** | 纯函数 | 无副作用、可预测 | `add(a, b)` |
| **Stateful** | 依赖外部状态 | 有副作用、结果可变 | 计数器、数据库查询 |

---

## 为什么要区分？

- **Code/Data 分离** → 更灵活、更安全 (防止注入攻击)
- **Configuration 外部化** → 不改代码就能调整行为
- **Stateless 设计** → 更容易测试、扩展、并行化

---

## Configuration 最佳实践：12-Factor

**来自 [12-Factor App](https://12factor.net/)**：

**原则**：配置与代码严格分离
- ❌ 硬编码在代码中
- ✅ 存储在环境变量或密管系统

**实践**：
```python
# ❌ 不好的做法
API_KEY = "sk-abc123..."
DB_PASSWORD = "mypassword"

# ✅ 好的做法
API_KEY = os.getenv("API_KEY")
DB_PASSWORD = os.getenv("DB_PASSWORD")
```

**密钥分类**：
- **Public**：可公开 (API endpoint URL)
- **Private**：团队内部 (内网 IP)
- **Secret**：需加密保护 (API keys, 密码)

**密钥轮替**：定期更换 Secret 类型的配置
