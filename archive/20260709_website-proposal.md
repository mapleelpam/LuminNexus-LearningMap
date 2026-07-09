# LearningMap 網站化方案討論

> **後續定案記錄（2026-07-09）**
> - 網域：使用自有網域 prisma.vision，子網域定為 **learningmap.prisma.vision**
> - 實作方向：未採用本文推薦的 MkDocs Material，使用者選擇**自建 SPA**（實作於 repo 的 `site/`）
> - UI 設計：見 archive/20260709_website-ui-design.md 與 20260709_website-ui-prototype.html

## 現況盤點（決定方案的關鍵事實）

| 事實 | 對選型的影響 |
|------|-------------|
| 105 個 md 檔（排除 archive） | 需要自動導覽，不能手工維護側欄 |
| 57 個檔案用 Mermaid（含 mindmap） | 框架必須支援 Mermaid，且要能用較新版本（mindmap 需 v9.3+） |
| 458 個檔案間相對連結（`../tools/xxx.md` 格式） | 框架必須自動把 `.md` 連結轉成頁面連結 |
| frontmatter 已有 title/type/status/tags | 可直接餵給網站當標題與標籤，不用改內容 |
| repo 是 GitHub public | GitHub Pages 免費、CI 自動部署，零維護成本 |
| 內容全繁體中文 | 站內搜尋必須支援中文分詞 |
| 使用者最近在用 Obsidian 開這個 repo | Quartz（Obsidian 風格）是候選之一 |
| 需排除 archive/、slides/ 產出物 | 需要 exclude 設定 |

## 四個候選方案

### 1. MkDocs Material（推薦）
- **技術棧**：Python — 團隊已用 uv 管 Python，維護門檻最低
- **中文搜尋**：內建，裝 jieba 後有正式中文分詞，四個方案中最好
- **Mermaid**：mkdocs-mermaid2 plugin 可指定 mermaid 版本（解 mindmap 問題）
- **相對連結**：`.md` 相對連結原生自動轉換，458 個連結不用動
- **導覽**：awesome-pages / literate-nav plugin 依資料夾自動生成，`NN_` 前綴天然排序
- **frontmatter**：`title` 直接當頁面標題，`tags` 有官方 tags plugin，多餘欄位（status/author）自動忽略
- **風險**：外觀是「文件站」風格，客製化空間比 Vite 系小

### 2. VitePress
- **技術棧**：Node/Vue，團隊沒有 Node 慣性 → 多一套工具鏈
- **中文搜尋**：內建 minisearch，中文效果普通（無分詞）
- **Mermaid**：需第三方 plugin（vitepress-plugin-mermaid）
- **導覽**：側欄需寫 config 或自寫生成腳本
- **優點**：最快、最美、客製自由度高
- **風險**：105 檔的 sidebar 自動化要自己寫；中文搜尋要另外處理

### 3. Docusaurus
- **技術棧**：Node/React，最重
- **優點**：版本化文件、i18n、外掛生態最大
- **風險**：對「新人閱讀教材」場景明顯 overkill；學習地圖不需要版本化

### 4. Quartz 4（Obsidian 風格）
- **技術棧**：Node/TypeScript
- **優點**：graph view、backlinks、wikilink 支援 —— 和你最近在試的 Obsidian 心智模型一致
- **中文搜尋**：flexsearch，中文支援普通
- **風險**：repo 幾乎沒用 wikilink（只有 1 個未 commit 的檔案），458 個連結是標準相對連結，Quartz 的賣點用不上；graph view 對「照學習路徑走」的新人反而是干擾

## 推薦：MkDocs Material + GitHub Pages

理由收斂成三點：
1. **維護成本貼近零**：Python 工具鏈（uv 直接裝）、頁面自動生成、GitHub Actions push 即部署
2. **內容一個字都不用改**：相對連結、frontmatter、Mermaid 全部原生或 plugin 吃得下
3. **中文搜尋最好**：這是「新人查資料」的核心體驗，其他三個都要妥協

### 部署流程（一次設定，之後全自動）

```
push 到 main → GitHub Actions → mkdocs build → GitHub Pages
新人只需要一個網址
```

### 設定工作量估計
- mkdocs.yml + requirements + GitHub Actions workflow：約 1 小時
- 首頁（角色分流：新人選角色 → 對應學習路徑）：視需求
- 不需要改任何既有教材內容

## 需要你決定的三件事

1. **公開性**：repo 已是 public，GitHub Pages 網站也會是公開的。教材內容提到內部產品（Smart Insight Engine、Heimdallr 等），這些內容公開上網 OK 嗎？如果不 OK：改 private repo + Cloudflare Pages access control，或內部主機自架。
2. **導覽哲學**：側欄照資料夾結構自動生成（省事），還是照「學習路徑」手工編排（Day 1-5 順序，體驗較好但要維護 nav）？折衷：資料夾自動 + 首頁放角色分流入口。
3. **首頁設計**：要不要做一個「選你的角色」的入口頁（Testing / Crawler / PM / UI-UX），點進去直接到該角色的 00_outline？
