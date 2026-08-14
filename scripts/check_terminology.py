#!/usr/bin/env python3
"""術語一致性檢查——正典由術語文自己宣告，本腳本不硬編任何譯法。

規則來源：general/*-terminology.md 文末的中譯對照表
    | facet | 分面 | 依國教院《圖書館學與資訊科學大辭典》 |
    | voice | 聲量 | 不要譯成「聲音」 |

兩條檢查：
  [禁譯] 說明欄寫了「不要譯成「X」」/「譯成「X」易生歧義」→ 全 repo 不得出現 X
          （零假陽性，違反即錯）
  [漂移] 文中出現 `English（中文）` 而該中文與正典無共同詞根 → 提示
          （有假陽性，僅警告，不影響 exit code）

用法：
    python3 scripts/check_terminology.py            # 掃 .stillflow.yaml 的 scan_paths
    python3 scripts/check_terminology.py <檔案...>  # 只掃指定檔
    python3 scripts/check_terminology.py --strict   # 讓 [漂移] 也影響 exit code
"""
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCAN = ["general", "tools", "data-sources", "roles", "projects"]
SKIP_DIRS = {"archive", "slides", "site", ".git"}

# 中譯表的一列：| en | zh | 說明 |
ROW = re.compile(r"^\|\s*([A-Za-z][A-Za-z \-/]{1,28}?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*$")
# 說明欄裡的禁譯宣告
FORBID = re.compile(r"(?:不要譯成|不譯為|勿譯成|譯成)\s*[「『\"]([^」』\"]+)[」』\"]")
# 正文裡的 English（中文） 對照。限 2-5 字，否則括號裡多半是說明句而非譯名
PAIR = re.compile(r"([A-Za-z][A-Za-z \-_]{2,28})\s*[（(]\s*([一-鿿]{2,5})\s*[）)]")
# 括號內含這些字代表它是說明句，不是譯名
NOT_A_GLOSS = ("問題", "什麼", "怎", "哪", "這", "那", "依", "按", "把", "某", "純", "建", "個")
# 該行在「談論譯法規則」而非使用譯法
META = ("不譯", "不要譯", "勿譯", "易生歧義", "不得譯")


def load_glossary():
    """從所有 *-terminology.md 讀出 {en: (canonical_zh, [forbidden_zh])}。"""
    g = {}
    for f in sorted((ROOT / "general").glob("*-terminology.md")):
        for line in f.read_text(encoding="utf-8").split("\n"):
            m = ROW.match(line)
            if not m:
                continue
            en, zh, note = m.group(1).strip().lower(), m.group(2).strip(), m.group(3)
            if en in ("英文", "term", "詞", "---") or set(zh) <= set("-: "):
                continue
            zh_clean = re.sub(r"[（(].*?[）)]", "", zh).strip()
            g.setdefault(en, (zh_clean, []))
            g[en][1].extend(FORBID.findall(note))
    return g


def targets(argv):
    if argv:
        return [pathlib.Path(a) for a in argv if a.endswith(".md")]
    out = []
    for d in SCAN:
        for p in (ROOT / d).rglob("*.md"):
            if not (set(p.relative_to(ROOT).parts) & SKIP_DIRS):
                out.append(p)
    return sorted(out)


def hook_mode():
    """PostToolUse：只檢查剛編輯的那一檔，且只擋 [禁譯]（漂移僅供人工複查）。"""
    import json
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)
    fp = (payload.get("tool_input") or {}).get("file_path", "")
    if not fp or not fp.endswith(".md"):
        sys.exit(0)
    path = pathlib.Path(fp)
    if not path.exists():
        sys.exit(0)
    try:
        path.relative_to(ROOT)
    except ValueError:
        sys.exit(0)
    if set(path.relative_to(ROOT).parts) & SKIP_DIRS:
        sys.exit(0)
    errs = scan([path], load_glossary())[0]
    if errs:
        print("術語違反正典（scripts/check_terminology.py）：", file=sys.stderr)
        for e in errs:
            print(f"  - {e}", file=sys.stderr)
        print("正典由 general/*-terminology.md 的中譯表宣告，請改用正典譯法。", file=sys.stderr)
        sys.exit(2)
    sys.exit(0)


def scan(files, gloss):
    """回傳 (禁譯違反, 疑似漂移)。"""
    forbidden = {}   # 禁譯詞 -> (英文, 正典)
    for en, (zh, bads) in gloss.items():
        for b in bads:
            forbidden[b] = (en, zh)

    errors, warns = [], []
    for f in files:
        rel = f.relative_to(ROOT) if f.is_absolute() else f
        try:
            lines = f.read_text(encoding="utf-8").split("\n")
        except OSError:
            continue
        is_glossary = f.name.endswith("-terminology.md")
        for i, line in enumerate(lines, 1):
            # 談論譯法規則的行（術語表本身、引用該規則的教材）不算違反
            if any(k in line for k in META):
                continue
            for bad, (en, good) in forbidden.items():
                if bad in line and (en in line.lower() or is_glossary):
                    errors.append(f"{rel}:{i}  [禁譯] {en} 不得譯為「{bad}」，正典為「{good}」\n      {line.strip()[:90]}")
            for m in PAIR.finditer(line):
                en, zh = m.group(1).strip().lower().rstrip("s"), m.group(2)
                if any(w in zh for w in NOT_A_GLOSS):
                    continue
                if en in gloss:
                    good = gloss[en][0]
                    if good and zh != good and good not in zh and zh not in good:
                        warns.append(f"{rel}:{i}  [漂移] {en}（{zh}）— 正典為「{good}」")
    return errors, warns


def main():
    if "--hook" in sys.argv:
        hook_mode()
    strict = "--strict" in sys.argv
    files = targets([a for a in sys.argv[1:] if not a.startswith("--")])
    gloss = load_glossary()
    if not gloss:
        print("找不到中譯表，檢查 general/*-terminology.md", file=sys.stderr)
        return 2

    errors, warns = scan(files, gloss)
    for e in errors:
        print("✗ " + e)
    for w in warns:
        print("· " + w)
    print(f"\n掃 {len(files)} 檔、{len(gloss)} 條正典："
          f"禁譯違反 {len(errors)}、疑似漂移 {len(warns)}")
    return 1 if errors or (strict and warns) else 0


if __name__ == "__main__":
    sys.exit(main())
