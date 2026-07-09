---
description: 建置 Learning Map 網站並開啟本地預覽
---

執行 `bash scripts/serve-site.sh` 建置並預覽 Learning Map 網站。

完成後回報：教材篇數、dist 大小、預覽網址（腳本輸出裡都有）。

若失敗，依訊息診斷：
- 缺 pyyaml → `uv pip install pyyaml`
- 埠被占用 → 改 `PORT=8080 bash scripts/serve-site.sh` 並回報新網址
- build.py 輸出 ⚠ 警告（config 引用不存在的檔案）→ 如實轉告使用者，不要自行修改 config
