# Claude Code CLI Tips

**版本**: 1.0
**更新日期**: 2025-12-16
**適用角色**: 所有團隊成員

---

## 概述

本文件收集 Claude Code CLI 的實用技巧，幫助團隊成員更有效地使用 AI 輔助開發工具。

---

## 1. Memory 記憶管理 (`#memory`)

### 什麼是 Memory

- Claude Code 可以儲存中長期記憶
- 記憶會跨 conversation 保留
- 適合記錄專案規範、個人偏好、常用指令

### 使用方式

```
#memory add [要記住的內容]
```

### 適合記錄的內容

- 專案的 coding style 偏好
- 常用的 commit message 格式
- 團隊的命名規範
- 個人的工作習慣偏好

### 注意事項

- 避免記錄敏感資訊
- 定期檢視和清理過時的記憶
- 記憶內容要具體明確

---

## 2. Skill 技能系統 (`@skill_name`)

### 什麼是 Skill

- 預定義的專門能力模組
- 可以快速啟用特定領域的專業知識
- 透過 `@` 符號呼叫

### 使用方式

```
@skill_name [指令或問題]
```

### 常用 Skill 類型

- (待補充具體的 skill 列表)

### 最佳實踐

- 了解每個 skill 的專長領域
- 選擇最適合當前任務的 skill
- 可以組合多個 skill 完成複雜任務

---

## 3. Compact Conversation 與 Context 管理

### 什麼是 Context Lost

- Claude Code 有 context window 限制
- conversation 過長時，早期內容可能被壓縮或遺失
- 重要的 decision 可能因此丟失

### 常見風險情境

- 長時間的 coding session
- 多次來回討論後的實作
- 跨多個檔案的大型重構

### 預防策略

1. **及時總結重要決定**
   - 在做出重要決定後，請 Claude 總結
   - 將決定寫入文檔或 comment

2. **使用 TodoWrite 記錄**
   - 將關鍵決定轉為 todo items
   - 提供 conversation context 的錨點

3. **分段處理大型任務**
   - 將大任務拆成小段
   - 每段完成後做 checkpoint

4. **善用 Memory**
   - 將跨 session 需要記住的內容存入 memory

### 警示信號

- Claude 開始重複問已經討論過的問題
- 實作方向與先前討論不一致
- Claude 建議的方案與已決定的不同

---

## 4. TodoWrite 與 Decision 對齊

### 為什麼需要對齊

- Conversation 中的討論和決定容易被遺忘
- TodoWrite 提供結構化的任務追蹤
- 幫助 Claude 記住當前的執行脈絡

### 最佳實踐

1. **討論後立即建立 Todo**
   - 決定做什麼後，馬上寫入 todo
   - 包含具體的執行細節

2. **Todo 內容要具體**
   - 不只寫「實作功能 X」
   - 而是「實作功能 X，使用方案 A，因為 [原因]」

3. **保留決策脈絡**
   - 在 todo 中註明為什麼選擇這個方案
   - 記錄排除的替代方案

4. **即時更新狀態**
   - 開始執行時標記 in_progress
   - 完成後立即標記 completed

### 範例

```
// 較差的 todo
- 實作登入功能

// 較好的 todo
- 實作登入功能：使用 JWT token，存於 httpOnly cookie（已討論排除 localStorage 方案因安全考量）
```

---

## 5. 快捷鍵

### Ctrl+O - 開啟檔案/目錄

- 快速開啟專案中的檔案
- 支援模糊搜尋
- (待補充更多細節)

### Ctrl+T - (待補充)

- (待補充具體功能說明)

### 其他常用快捷鍵

- (待補充)

---

## 6. SDD/TDD 工作流程

### 與 Claude Code 結合的 SDD 流程

1. **撰寫 Spec**
   - 先與 Claude 討論規格
   - 確認後寫入 spec 文檔

2. **Review Spec**
   - 請 Claude 審查 spec 完整性
   - 確認邊界條件和錯誤處理

3. **生成測試**
   - 使用 Speckit 或手動請 Claude 生成測試
   - 確保測試覆蓋 spec 的所有要求

4. **實作**
   - 依據 spec 和測試實作功能
   - Claude 可以協助實作

### 與 Claude Code 結合的 TDD 流程

1. **定義測試案例**
   - 先請 Claude 根據需求列出測試案例
   - 確認 happy path 和 edge cases

2. **撰寫失敗的測試 (Red)**
   - 請 Claude 撰寫測試程式碼
   - 確認測試會失敗

3. **實作功能 (Green)**
   - 請 Claude 實作最小程式碼通過測試

4. **重構 (Refactor)**
   - 請 Claude 審查並建議重構

### 相關連結

- [SDD 規格驅動開發](./00_outline.md#35-規格驅動開發-spec-driven-development-sdd)
- [TDD 測試驅動開發](./00_outline.md#45-測試驅動開發-test-driven-development-tdd)
- [Speckit 工具文檔](../tools/speckit.md)

---

## 7. 其他技巧

> 此章節將持續補充

### 待補充項目

- (後續討論加入)

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-12-16 | 初始版本，包含 memory、skill、context 管理、TodoWrite、快捷鍵、SDD/TDD 章節 | Learning Team |
