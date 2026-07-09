#!/usr/bin/env python3
"""LearningMap SPA 建置腳本。

掃描內容資料夾、解析 frontmatter，組出 dist/：
  dist/
    index.html, assets/          ← SPA 外殼（site/ 複製）
    general/, roles/, ...        ← 內容原檔（md + 圖片等資產）
    data.json                    ← 導覽樹 + 文件中繼資料 + 策展設定
    search.json                  ← 全文搜尋索引（純文字，惰性載入）

用法：python3 site/build.py   （輸出至 site/dist/）
"""
import json
import re
import shutil
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"
DIST = SITE / "dist"

SEARCH_TEXT_CAP = 60_000  # 每篇文件進索引的字元上限


def parse_frontmatter(text: str):
    if not text.startswith("---"):
        return {}, text
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?", text, re.S)
    if not m:
        return {}, text
    try:
        fm = yaml.safe_load(m.group(1)) or {}
        if not isinstance(fm, dict):
            fm = {}
    except yaml.YAMLError:
        fm = {}
    return fm, text[m.end():]


def first_h1(body: str):
    m = re.search(r"^#\s+(.+)$", body, re.M)
    return m.group(1).strip() if m else None


def strip_markdown(body: str) -> str:
    """粗略去除 markdown 語法，供全文搜尋。"""
    text = re.sub(r"```.*?```", " ", body, flags=re.S)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"^[#>\-\*\|\s]+", "", text, flags=re.M)
    text = re.sub(r"[*_~]{1,3}([^*_~]+)[*_~]{1,3}", r"\1", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()[:SEARCH_TEXT_CAP]


def natural_key(name: str):
    """00_ 前綴優先，其餘照字母排。"""
    m = re.match(r"^(\d+)", name)
    return (0, int(m.group(1)), name) if m else (1, 0, name)


def scan_dir_tree(base: Path, rel_dir: str, docs: dict, dir_labels: dict, hidden: set):
    """遞迴掃描資料夾，回傳導覽樹節點（hidden 中的檔案不入導覽，仍可搜尋）。"""
    node = {"dir": rel_dir, "label": dir_labels.get(Path(rel_dir).name, Path(rel_dir).name), "files": [], "children": []}
    entries = sorted(base.iterdir(), key=lambda p: natural_key(p.name))
    for p in entries:
        if p.name.startswith("."):
            continue
        rel = f"{rel_dir}/{p.name}" if rel_dir else p.name
        if p.is_dir():
            child = scan_dir_tree(p, rel, docs, dir_labels, hidden)
            if child["files"] or child["children"]:
                node["children"].append(child)
        elif p.suffix == ".md" and rel not in hidden:
            node["files"].append(rel)
    return node


def main():
    config = json.loads((SITE / "config.json").read_text(encoding="utf-8"))
    content_dirs = config["contentDirs"]
    dir_labels = config.get("dirLabels", {})

    docs = {}          # path -> metadata
    search_index = {}  # path -> plaintext
    warnings = []

    for d in content_dirs:
        for p in sorted((ROOT / d).rglob("*.md")):
            rel = p.relative_to(ROOT).as_posix()
            raw = p.read_text(encoding="utf-8")
            fm, body = parse_frontmatter(raw)
            title = fm.get("title") or first_h1(body) or p.stem
            if not fm:
                warnings.append(f"無 frontmatter：{rel}")
            docs[rel] = {
                "title": str(title),
                "type": fm.get("type", ""),
                "status": fm.get("status", ""),
                "author": fm.get("author", ""),
                "version": str(fm.get("version") or ""),
                "updated": str(fm.get("updated") or ""),
                "tags": fm.get("tags") or [],
                "summary": str(fm.get("summary", "")).strip(),
            }
            search_index[rel] = strip_markdown(body)

    # 檢查策展設定引用的檔案都存在
    def check(path, where):
        if path and path not in docs:
            warnings.append(f"config 引用不存在的檔案（{where}）：{path}")

    check(config.get("generalOutline"), "generalOutline")
    for t in config["generalTracks"]:
        for f in t["files"]:
            check(f, f"generalTracks/{t['title']}")
    for r in config["roles"]:
        check(r.get("outline"), f"roles/{r['id']}")
        check(r.get("doc"), f"roles/{r['id']}")
        for day in r.get("days", []):
            for topic in day["topics"]:
                check(topic["file"], f"roles/{r['id']}/{day['label']}")
        for f in r.get("deep", {}).get("files", []):
            check(f, f"roles/{r['id']}/deep")

    # 參考資料庫導覽樹
    hidden = set(config.get("hideFromNav", []))
    ref_trees = {}
    for sec in config["refSections"]:
        tree = scan_dir_tree(ROOT / sec["dir"], sec["dir"], docs, dir_labels, hidden)
        # 頂層子資料夾依 config 指定順序排列（未列入者排最後）
        order = sec.get("order")
        if order:
            rank = {name: i for i, name in enumerate(order)}
            tree["children"].sort(key=lambda c: rank.get(Path(c["dir"]).name, len(order)))
        ref_trees[sec["id"]] = tree

    # 組 dist
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)
    shutil.copy2(SITE / "index.html", DIST / "index.html")
    shutil.copytree(SITE / "assets", DIST / "assets")
    for d in content_dirs:
        shutil.copytree(ROOT / d, DIST / d, ignore=shutil.ignore_patterns(".*"))
    # 未被任何教材引用的大型資產不入 dist
    for rel in config.get("excludeFromDist", []):
        target = DIST / rel
        if target.exists():
            target.unlink()

    # 資產版本戳：內容變更時 URL 跟著變，瀏覽器不會拿到舊快取
    import hashlib
    stamp = hashlib.md5(
        (SITE / "assets/app.js").read_bytes() + (SITE / "assets/style.css").read_bytes()
    ).hexdigest()[:8]
    idx = (DIST / "index.html").read_text(encoding="utf-8")
    idx = idx.replace('assets/style.css', f'assets/style.css?v={stamp}')
    idx = idx.replace('assets/app.js', f'assets/app.js?v={stamp}')
    (DIST / "index.html").write_text(idx, encoding="utf-8")

    data = {
        "config": config,
        "docs": docs,
        "refTrees": ref_trees,
    }
    (DIST / "data.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    (DIST / "search.json").write_text(json.dumps(search_index, ensure_ascii=False), encoding="utf-8")
    (DIST / ".nojekyll").write_text("")

    print(f"✓ {len(docs)} 篇文件，dist → {DIST}")
    size_mb = sum(f.stat().st_size for f in DIST.rglob('*') if f.is_file()) / 1e6
    print(f"✓ dist 總大小 {size_mb:.1f} MB")
    for w in warnings:
        print(f"⚠ {w}", file=sys.stderr)


if __name__ == "__main__":
    main()
