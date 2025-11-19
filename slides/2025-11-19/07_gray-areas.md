## 边界模糊的案例

### 案例 1: SQL 查询字符串

```python
query = "SELECT * FROM users WHERE age > 18"
```

**问**：这是 Code 还是 Data？

- 从 Python 看：是**字符串数据**
- 从数据库看：是**可执行代码**

**答案**：取决于上下文！⚠️ 安全提示：永远不要直接拼接用户输入到 SQL

---

## 边界模糊的案例

### 案例 2: 用户主题设置

```json
{
  "user_id": 123,
  "theme": "dark",
  "language": "zh-TW"
}
```

**问**：这是 Configuration 还是 Data？

- 从应用角度：是 **Configuration** (控制 UI 行为)
- 从数据库角度：是 **User Data** (用户的属性)

**答案**：两者都对！看你在讨论什么层面

---

## 边界模糊的案例

### 案例 3: 读取配置文件

```python
def get_db_config():
    with open("config.json") as f:
        return json.load(f)
```

**问**：这是 Stateless 还是 Stateful？

- **Stateless 视角**：没有修改任何状态
- **Stateful 视角**：依赖外部文件系统 (外部状态)

**答案**：严格来说是 **Stateful**，但如果配置文件不变，行为类似 Stateless
