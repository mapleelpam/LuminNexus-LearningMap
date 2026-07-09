#!/usr/bin/env python3
"""LearningMap frontmatter 規範檢查。

規範（77 檔已對齊的狀態，見 CLAUDE.md「Frontmatter Template」）：
  - 必填：title, type, status, created, updated, version, project, tags, audience, summary
  - author 必填，例外：外部轉錄文件以 source 記出處者可免
  - type ∈ {guide, reference, outline, topic, spec, overview, policy}
  - status ∈ {active, stable, deprecated}（同 .stillflow.yaml valid_status）
  - created / updated 為 YYYY-MM-DD，且 updated >= created
  - tags / audience 為非空列表

用法：
  python3 scripts/check_frontmatter.py --all          # 檢查所有教材
  python3 scripts/check_frontmatter.py <file.md>...   # 檢查指定檔案（不受目錄範圍限制）
  python3 scripts/check_frontmatter.py --hook         # Claude Code PostToolUse hook 模式
                                                      # （stdin 收 JSON，取 tool_input.file_path）
"""
import datetime
import json
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    # hook 模式：環境缺 pyyaml 時靜默放行，不要用 traceback 噪音干擾編輯流程
    if "--hook" in sys.argv:
        sys.exit(0)
    print("需要 pyyaml：uv pip install pyyaml", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
SCAN_DIRS = ["general", "roles", "tools", "data-sources", "projects"]
VALID_TYPE = {"guide", "reference", "outline", "topic", "spec", "overview", "policy"}
VALID_STATUS = {"active", "stable", "deprecated"}
REQUIRED = ["title", "type", "status", "created", "updated", "version", "project", "tags", "audience", "summary"]


def as_date(v):
    if isinstance(v, datetime.date):
        return v
    if isinstance(v, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", v):
        return datetime.date.fromisoformat(v)
    return None


def check_file(path: Path):
    errors = []
    try:
        raw = path.read_text(encoding="utf-8")
    except OSError as e:
        return [f"讀取失敗：{e}"]

    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", raw, re.S)
    if not m:
        return ["缺少 frontmatter（檔案開頭需有 --- 包起來的 YAML 區塊）"]
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError as e:
        return [f"frontmatter YAML 解析失敗：{e}"]
    if not isinstance(fm, dict):
        return ["frontmatter 不是有效的欄位對照（YAML mapping）"]

    for k in REQUIRED:
        if k not in fm or fm[k] in (None, "", []):
            errors.append(f"缺少必填欄位：{k}")
    if "author" not in fm and "source" not in fm:
        errors.append("缺少 author（外部轉錄文件可改以 source 記出處）")

    if fm.get("type") and fm["type"] not in VALID_TYPE:
        errors.append(f"type「{fm['type']}」不在允許值域：{', '.join(sorted(VALID_TYPE))}")
    if fm.get("status") and fm["status"] not in VALID_STATUS:
        errors.append(f"status「{fm['status']}」不在允許值域：{', '.join(sorted(VALID_STATUS))}")

    created, updated = as_date(fm.get("created")), as_date(fm.get("updated"))
    if fm.get("created") is not None and created is None:
        errors.append("created 不是 YYYY-MM-DD 格式")
    if fm.get("updated") is not None and updated is None:
        errors.append("updated 不是 YYYY-MM-DD 格式")
    if created and updated and updated < created:
        errors.append(f"updated（{updated}）早於 created（{created}）")

    for k in ("tags", "audience"):
        if k in fm and fm[k] and not isinstance(fm[k], list):
            errors.append(f"{k} 應為列表（- item 格式）")
    return errors


def in_scope(path: Path) -> bool:
    try:
        rel = path.resolve().relative_to(ROOT)
    except ValueError:
        return False
    return path.suffix == ".md" and rel.parts and rel.parts[0] in SCAN_DIRS


def report(results):
    bad = {p: errs for p, errs in results.items() if errs}
    for p, errs in bad.items():
        for e in errs:
            print(f"{p}: {e}", file=sys.stderr)
    return len(bad)


def main():
    args = sys.argv[1:]
    if "--hook" in args:
        try:
            payload = json.load(sys.stdin)
        except json.JSONDecodeError:
            sys.exit(0)
        fp = (payload.get("tool_input") or {}).get("file_path", "")
        if not fp:
            sys.exit(0)
        path = Path(fp)
        if not in_scope(path) or not path.exists():
            sys.exit(0)
        errs = check_file(path)
        if errs:
            print(f"frontmatter 不符合規範（scripts/check_frontmatter.py）：", file=sys.stderr)
            for e in errs:
                print(f"  - {e}", file=sys.stderr)
            print("請修正 frontmatter 後再繼續（規範見 CLAUDE.md「Frontmatter Template」）。", file=sys.stderr)
            sys.exit(2)  # PostToolUse：stderr 回饋給 Claude
        sys.exit(0)

    if "--all" in args:
        targets = [p for d in SCAN_DIRS for p in sorted((ROOT / d).rglob("*.md"))]
    else:
        targets = [Path(a) for a in args if not a.startswith("-")]
        if not targets:
            print(__doc__)
            sys.exit(1)

    results = {p: check_file(p) for p in targets}
    bad = report(results)
    print(f"檢查 {len(targets)} 檔，{bad} 檔不符合規範" + ("" if bad else " ✓"))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
