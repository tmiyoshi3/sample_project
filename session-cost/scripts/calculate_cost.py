#!/usr/bin/env python3
"""Claude Codeセッションのトークン使用量とコストを集計するスクリプト."""

import argparse
import json
import os
import glob
import sys
from datetime import datetime, timezone
from collections import defaultdict

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PRICING_FILE = os.path.join(SCRIPT_DIR, "pricing.json")

DEFAULT_PRICING = {
    "display": "Unknown",
    "input": 15.0,
    "output": 75.0,
    "cache_write": 18.75,
    "cache_read": 1.875,
}


def load_pricing():
    try:
        with open(PRICING_FILE) as f:
            data = json.load(f)
        return data.get("models", {}), data.get("last_updated", "不明")
    except (IOError, json.JSONDecodeError):
        return {}, "不明"


def get_pricing(model_id, model_pricing):
    if model_id in model_pricing:
        return model_pricing[model_id], False
    for key, pricing in model_pricing.items():
        if model_id.startswith(key.rsplit("-", 1)[0]):
            return pricing, False
    return {**DEFAULT_PRICING, "display": model_id}, True


def cwd_to_project_dir(cwd):
    return cwd.replace("/", "-").replace("_", "-")


def find_project_dir(cwd):
    claude_dir = os.path.expanduser("~/.claude/projects")
    project_dir_name = cwd_to_project_dir(cwd)
    project_path = os.path.join(claude_dir, project_dir_name)
    if os.path.isdir(project_path):
        return project_path
    candidates = glob.glob(os.path.join(claude_dir, project_dir_name + "*"))
    dirs = [c for c in candidates if os.path.isdir(c)]
    if len(dirs) == 1:
        return dirs[0]
    if len(dirs) > 1:
        print(f"Warning: Multiple project dirs found for {cwd}, using {dirs[0]}", file=sys.stderr)
        return dirs[0]
    return None


def load_sessions_metadata(cwd):
    sessions_dir = os.path.expanduser("~/.claude/sessions")
    sessions = {}
    if not os.path.isdir(sessions_dir):
        return sessions
    for f in glob.glob(os.path.join(sessions_dir, "*.json")):
        try:
            with open(f) as fh:
                data = json.load(fh)
            if data.get("cwd") == cwd:
                sid = data.get("sessionId")
                if sid:
                    sessions[sid] = {
                        "pid": data.get("pid"),
                        "startedAt": data.get("startedAt"),
                        "procStart": data.get("procStart", ""),
                        "version": data.get("version", ""),
                    }
        except (json.JSONDecodeError, IOError):
            pass
    return sessions


def parse_transcript(filepath, since_dt=None):
    results_by_model = defaultdict(lambda: {
        "input_tokens": 0,
        "output_tokens": 0,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "api_calls": 0,
    })
    first_ts = None
    last_ts = None

    with open(filepath) as fh:
        for line in fh:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue

            ts_str = obj.get("timestamp")
            if ts_str:
                try:
                    ts = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
                    if first_ts is None or ts < first_ts:
                        first_ts = ts
                    if last_ts is None or ts > last_ts:
                        last_ts = ts
                except ValueError:
                    pass

            msg = obj.get("message", {})
            if not isinstance(msg, dict):
                continue
            usage = msg.get("usage")
            if not usage:
                continue

            if since_dt and ts_str:
                try:
                    entry_ts = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
                    if entry_ts < since_dt:
                        continue
                except ValueError:
                    pass

            model = msg.get("model", "unknown")
            if model.startswith("<") or model == "unknown":
                continue
            r = results_by_model[model]
            r["input_tokens"] += usage.get("input_tokens", 0)
            r["output_tokens"] += usage.get("output_tokens", 0)
            r["cache_creation_input_tokens"] += usage.get("cache_creation_input_tokens", 0)
            r["cache_read_input_tokens"] += usage.get("cache_read_input_tokens", 0)
            r["api_calls"] += 1

    return dict(results_by_model), first_ts, last_ts


def calc_cost(tokens, pricing):
    m = 1_000_000
    return {
        "input_cost": (tokens["input_tokens"] / m) * pricing["input"],
        "output_cost": (tokens["output_tokens"] / m) * pricing["output"],
        "cache_write_cost": (tokens["cache_creation_input_tokens"] / m) * pricing["cache_write"],
        "cache_read_cost": (tokens["cache_read_input_tokens"] / m) * pricing["cache_read"],
    }


def format_number(n):
    return f"{n:,}"


def format_cost(c):
    return f"${c:,.2f}"


def format_ts(dt):
    if dt is None:
        return "?"
    local = dt.astimezone()
    return local.strftime("%Y-%m-%d %H:%M")


def main():
    parser = argparse.ArgumentParser(description="Claude Codeセッションコスト集計")
    parser.add_argument("--cwd", default=os.getcwd(), help="プロジェクトのCWDパス")
    parser.add_argument("--since", help="この時刻以降を集計 (ISO形式: 2026-06-03T14:00:00+09:00)")
    parser.add_argument("--format", choices=["text", "json"], default="text", help="出力形式")
    args = parser.parse_args()

    model_pricing, last_updated = load_pricing()

    since_dt = None
    if args.since:
        try:
            since_dt = datetime.fromisoformat(args.since)
            if since_dt.tzinfo is None:
                import time
                offset = time.timezone if time.daylight == 0 else time.altzone
                local_tz = timezone(offset=__import__('datetime').timedelta(seconds=-offset))
                since_dt = since_dt.replace(tzinfo=local_tz)
        except ValueError:
            print(f"Error: Invalid datetime format: {args.since}", file=sys.stderr)
            sys.exit(1)

    project_dir = find_project_dir(args.cwd)
    if not project_dir:
        print(f"Error: Project directory not found for {args.cwd}", file=sys.stderr)
        sys.exit(1)

    sessions_meta = load_sessions_metadata(args.cwd)
    jsonl_files = sorted(glob.glob(os.path.join(project_dir, "*.jsonl")))

    if not jsonl_files:
        print("セッションデータが見つかりませんでした。")
        sys.exit(0)

    all_sessions = []
    grand_total_by_model = defaultdict(lambda: {
        "input_tokens": 0,
        "output_tokens": 0,
        "cache_creation_input_tokens": 0,
        "cache_read_input_tokens": 0,
        "api_calls": 0,
    })
    unknown_models = {}

    for jf in jsonl_files:
        session_id = os.path.basename(jf).replace(".jsonl", "")
        by_model, first_ts, last_ts = parse_transcript(jf, since_dt)

        total_calls = sum(r["api_calls"] for r in by_model.values())
        if total_calls == 0:
            continue

        session_meta = sessions_meta.get(session_id, {})
        session_info = {
            "session_id": session_id,
            "short_id": session_id[:8],
            "first_ts": first_ts,
            "last_ts": last_ts,
            "proc_start": session_meta.get("procStart", ""),
            "by_model": by_model,
            "total_calls": total_calls,
        }

        total_cost = 0
        for model_id, tokens in by_model.items():
            pricing, is_unknown = get_pricing(model_id, model_pricing)
            if is_unknown:
                unknown_models[model_id] = pricing
            costs = calc_cost(tokens, pricing)
            total_cost += sum(costs.values())
            for k in grand_total_by_model[model_id]:
                grand_total_by_model[model_id][k] += tokens[k]

        session_info["total_cost"] = total_cost
        all_sessions.append(session_info)

    if not all_sessions:
        since_str = f" ({args.since} 以降)" if args.since else ""
        print(f"該当するセッションデータがありませんでした{since_str}。")
        sys.exit(0)

    if args.format == "json":
        output = {
            "sessions": [],
            "totals_by_model": {},
            "grand_total_cost": 0,
            "last_updated": last_updated,
            "unknown_models": list(unknown_models.keys()),
        }
        for s in all_sessions:
            session_out = {
                "session_id": s["session_id"],
                "first_ts": s["first_ts"].isoformat() if s["first_ts"] else None,
                "last_ts": s["last_ts"].isoformat() if s["last_ts"] else None,
                "total_calls": s["total_calls"],
                "total_cost": s["total_cost"],
                "by_model": {},
            }
            for model_id, tokens in s["by_model"].items():
                pricing, _ = get_pricing(model_id, model_pricing)
                costs = calc_cost(tokens, pricing)
                session_out["by_model"][model_id] = {**tokens, **costs}
            output["sessions"].append(session_out)

        for model_id, tokens in grand_total_by_model.items():
            pricing, _ = get_pricing(model_id, model_pricing)
            costs = calc_cost(tokens, pricing)
            output["totals_by_model"][model_id] = {**tokens, **costs}
            output["grand_total_cost"] += sum(costs.values())

        print(json.dumps(output, indent=2, ensure_ascii=False, default=str))
        return

    # Text output
    grand_total_calls = sum(s["total_calls"] for s in all_sessions)
    grand_total_cost = sum(s["total_cost"] for s in all_sessions)

    since_label = ""
    if since_dt:
        since_label = f"（{format_ts(since_dt)} 以降）"

    print(f"## コスト概算{since_label}\n")

    # Session summary table
    print("### セッション別")
    print(f"| セッション | 期間 | API呼び出し | コスト |")
    print(f"|---|---|---|---|")
    for s in all_sessions:
        period = f"{format_ts(s['first_ts'])} ~ {format_ts(s['last_ts'])}"
        model_displays = []
        for m in s["by_model"].keys():
            p, _ = get_pricing(m, model_pricing)
            model_displays.append(p["display"])
        label = f"{s['short_id']}… ({', '.join(model_displays)})"
        print(f"| {label} | {period} | {s['total_calls']}回 | {format_cost(s['total_cost'])} |")
    print(f"| **合計** | | **{grand_total_calls}回** | **{format_cost(grand_total_cost)}** |")

    # Per-model breakdown
    print(f"\n### モデル別内訳\n")
    for model_id in sorted(grand_total_by_model.keys()):
        tokens = grand_total_by_model[model_id]
        pricing, is_unknown = get_pricing(model_id, model_pricing)
        costs = calc_cost(tokens, pricing)
        model_total = sum(costs.values())

        unknown_mark = " ⚠️" if is_unknown else ""
        print(f"#### {pricing['display']} (`{model_id}`){unknown_mark}")
        print(f"| 項目 | トークン数 | コスト |")
        print(f"|---|---|---|")
        print(f"| 入力 | {format_number(tokens['input_tokens'])} | {format_cost(costs['input_cost'])} |")
        print(f"| キャッシュ書き込み | {format_number(tokens['cache_creation_input_tokens'])} | {format_cost(costs['cache_write_cost'])} |")
        print(f"| キャッシュ読み取り | {format_number(tokens['cache_read_input_tokens'])} | {format_cost(costs['cache_read_cost'])} |")
        print(f"| 出力 | {format_number(tokens['output_tokens'])} | {format_cost(costs['output_cost'])} |")
        print(f"| **小計** | | **{format_cost(model_total)}** |")
        print()

    # Pricing note
    models_used = sorted(grand_total_by_model.keys())
    pricing_notes = []
    for m in models_used:
        p, _ = get_pricing(m, model_pricing)
        pricing_notes.append(
            f"{p['display']}（入力${p['input']}/M、出力${p['output']}/M、"
            f"キャッシュ書込${p['cache_write']}/M、キャッシュ読取${p['cache_read']}/M）"
        )
    print("---")
    print(f"料金: {'; '.join(pricing_notes)}で計算。")
    print("サブエージェント（Explore/Plan等）の分も含まれています。")
    print("Max Planの場合はAPI直接課金ではないため、実際の請求とは異なります。")
    print(f"料金テーブル最終更新: {last_updated}")

    # Warnings
    if unknown_models:
        print(f"\n⚠️ **警告: 未登録モデルを検出**")
        print(f"以下のモデルは `pricing.json` に登録されていないため、最も高額なOpus料金で仮計算しています。")
        print(f"実際のコストとは異なる可能性があります。")
        print()
        for model_id in sorted(unknown_models.keys()):
            print(f"- `{model_id}`")
        print()
        print(f"`pricing.json` にこれらのモデルの正しい料金を追加してください。")


if __name__ == "__main__":
    main()
