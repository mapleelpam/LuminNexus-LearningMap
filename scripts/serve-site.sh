#!/usr/bin/env bash
# 建置 Learning Map 網站並啟動本地預覽（重複執行安全：伺服器已在跑就沿用）
# 用法：bash scripts/serve-site.sh   （可用 PORT=8080 覆蓋預設埠）
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-8619}"
URL="http://localhost:$PORT"

cd "$ROOT"

if ! python3 -c "import yaml" 2>/dev/null; then
  echo "缺少 pyyaml，請先安裝：uv pip install pyyaml（或 pip install pyyaml）" >&2
  exit 1
fi

python3 site/build.py

# dist 是就地重建，既有伺服器直接供應新內容，不需重啟
if curl -sf -o /dev/null --max-time 2 "$URL/data.json"; then
  echo "沿用既有伺服器：$URL"
else
  nohup python3 -m http.server "$PORT" -d "$ROOT/site/dist" >/dev/null 2>&1 &
  sleep 1
  if curl -sf -o /dev/null --max-time 2 "$URL/data.json"; then
    echo "預覽伺服器已啟動：$URL"
  else
    echo "伺服器啟動失敗（埠 $PORT 可能被其他程式占用），可改用：PORT=8080 bash scripts/serve-site.sh" >&2
    exit 1
  fi
fi

xdg-open "$URL" >/dev/null 2>&1 || echo "請手動開啟 $URL"
