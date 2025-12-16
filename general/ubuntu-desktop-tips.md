# Ubuntu GNOME Desktop Tips

**版本**: 1.1
**更新日期**: 2025-12-16
**適用角色**: 所有團隊成員

---

## 概述

本文件收集 Ubuntu GNOME 桌面環境的實用技巧，幫助團隊成員更有效地使用桌面環境進行開發工作。

---

## 1. Byobu - Terminal Session 管理

### 什麼是 Byobu

- 基於 tmux/screen 的 terminal multiplexer
- 讓 terminal session 在背景持續運行
- 即使關閉 terminal 視窗，程式仍繼續執行

### 為什麼需要 Byobu

| 問題情境 | Byobu 解決方案 |
|---------|---------------|
| Terminal 應用程式當掉 | Session 仍在背景運行，重新 attach 即可 |
| 意外關閉 terminal 視窗 | 程式不會中斷 |
| SSH 連線斷開 | 遠端工作不會丟失 |
| 需要同時監控多個程序 | 多視窗、多分割畫面 |

### 安裝

```bash
sudo apt install byobu
```

### 基本使用

```bash
# 啟動 byobu
byobu

# 離開但保持 session 運行 (detach)
# 按 F6 或 Ctrl+A, D

# 重新連接 (attach)
byobu attach
# 或
byobu
```

### 常用快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `F2` | 新增視窗 |
| `F3` | 切換到上一個視窗 |
| `F4` | 切換到下一個視窗 |
| `F6` | Detach (離開但保持運行) |
| `F7` | 進入捲動/複製模式 |
| `Shift+F2` | 水平分割畫面 |
| `Ctrl+F2` | 垂直分割畫面 |
| `Shift+F3/F4` | 在分割畫面間切換 |
| `Shift+F5` | 關閉所有分割，回到單一畫面 |

### 地雷與注意事項

1. **巢狀 Byobu 問題**
   - 在 byobu 內再開 byobu 會造成快捷鍵衝突
   - 解決：使用 `Ctrl+A, A` 傳送指令給內層

2. **顏色顯示問題**
   - 某些程式在 byobu 內顏色可能異常
   - 解決：確認 `TERM` 環境變數設定正確

3. **複製貼上**
   - byobu 內的複製貼上與一般 terminal 不同
   - 使用 `Shift+滑鼠選取` 可以使用系統剪貼簿

4. **Session 累積**
   - 忘記關閉的 session 會累積
   - 定期用 `byobu list-sessions` 檢查並清理

### 實用場景

```bash
# 場景 1: 長時間執行的任務
byobu
npm run build  # 即使關閉視窗也會繼續執行

# 場景 2: 同時監控多個服務
byobu
# F2 新增視窗跑 backend
# F2 新增視窗跑 frontend
# F2 新增視窗看 logs
# F3/F4 切換查看
```

---

## 2. Terminator - 分割式 Terminal

### 什麼是 Terminator

- GNOME based 的 terminal emulator
- 可在單一視窗內切割多個 terminal 面板
- 比原生 GNOME Terminal 更強大的分割功能

### Terminator vs Byobu

| 特性 | Terminator | Byobu |
|------|------------|-------|
| 類型 | Terminal 應用程式 (GUI) | Terminal multiplexer (CLI) |
| 分割方式 | 視窗內分割面板 | Session 內分割 |
| 關閉視窗後 | 程式終止 | 程式繼續運行 (detach) |
| 適用場景 | 本地開發，同時看多個輸出 | 遠端/長時間任務 |
| 可組合使用 | 可以在 Terminator 內開 Byobu |  |

### 安裝

```bash
sudo apt install terminator
```

### 常用快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `Ctrl+Shift+O` | 水平分割 (上下) |
| `Ctrl+Shift+E` | 垂直分割 (左右) |
| `Ctrl+Shift+W` | 關閉目前面板 |
| `Ctrl+Shift+Q` | 關閉整個視窗 |
| `Alt + 方向鍵` | 在面板間切換 |
| `Ctrl+Shift+方向鍵` | 調整面板大小 |
| `Ctrl+Shift+X` | 最大化/還原目前面板 |
| `Ctrl+Shift+T` | 新增 Tab |
| `Ctrl+Page Up/Down` | 切換 Tab |

### 實用場景

```
┌─────────────────────────────────────┐
│  backend server    │  frontend dev  │
│  npm run server    │  npm run dev   │
├────────────────────┴────────────────┤
│              logs / git status      │
└─────────────────────────────────────┘
```

### 與 Byobu 搭配使用

- **本地開發**: 用 Terminator 分割畫面
- **遠端/長任務**: 在 Terminator 的面板內開 Byobu
- 這樣既有 GUI 的便利分割，又有 session 保護

---

## 3. GNOME 視窗管理快捷鍵

### 視窗分割 (Tiling)

| 快捷鍵 | 功能 |
|--------|------|
| `Super + ←` | 視窗佔螢幕左半邊 |
| `Super + →` | 視窗佔螢幕右半邊 |
| `Super + ↑` | 視窗最大化 |
| `Super + ↓` | 還原視窗大小 / 最小化 |

### 工作區 (Workspace)

| 快捷鍵 | 功能 |
|--------|------|
| `Super + Page Up` | 切換到上一個工作區 |
| `Super + Page Down` | 切換到下一個工作區 |
| `Shift + Super + Page Up` | 將視窗移到上一個工作區 |
| `Shift + Super + Page Down` | 將視窗移到下一個工作區 |

### 視窗切換

| 快捷鍵 | 功能 |
|--------|------|
| `Alt + Tab` | 切換應用程式 |
| `Alt + ~` | 切換同一應用程式的不同視窗 |
| `Super` | 開啟 Activities 概覽 |

### 螢幕截圖

| 快捷鍵 | 功能 |
|--------|------|
| `Print Screen` | 截取整個螢幕 |
| `Shift + Print Screen` | 截取選取區域 |
| `Alt + Print Screen` | 截取目前視窗 |

---

## 4. 多螢幕設定

### 透過 Settings 設定

1. 開啟 `Settings` → `Displays`
2. 拖曳調整螢幕位置
3. 設定主螢幕 (Primary Display)
4. 調整解析度和縮放比例

### 常見問題

- **螢幕位置不對**：在 Displays 設定中拖曳調整相對位置
- **縮放模糊**：嘗試 100% 或 200% 整數倍縮放
- **外接螢幕不顯示**：檢查連接線，嘗試重新插拔

---

## 5. 其他實用技巧

> 此章節將持續補充

### 待補充項目

- (後續討論加入)

---

## 相關連結

- [Unix/Linux 基礎](./02_unix-linux-basics.md) - 命令列基礎知識

---

## 版本歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2025-12-16 | 初始版本，包含 Byobu、GNOME 快捷鍵、多螢幕設定章節 | Learning Team |
| 1.1 | 2025-12-16 | 新增 Terminator 分割式 Terminal 章節 | Learning Team |
