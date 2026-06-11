#!/usr/bin/env bash
set -euo pipefail

# === 設定 ===
MAX_ITERATIONS=${MAX_ITERATIONS:-20}
TMUX_SESSION="claude-migration"
PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
FLAG_FILE="${PROJECT_DIR}/.claude-auto-migrate"
COOLDOWN=${COOLDOWN:-3}

# === 引数パース ===
TARGET=""

for arg in "$@"; do
  case "$arg" in
    --help|-h)
      cat <<'USAGE'
Usage: run-migration-loop.sh [OPTIONS] [F-XX-YY]

tmux セッション内で /code-migration を自動連続実行する。
各ステップ完了時にセッションを自動クリア（プロセス再起動）し、
新しいセッションで次ステップを実行する。

ユーザーは tmux にアタッチして経過を観察し、permission に応答できる。

Options:
  -h, --help     このヘルプを表示

Arguments:
  F-XX-YY        対象の中分類を指定（省略時は自動判定）

Environment Variables:
  MAX_ITERATIONS=20    最大ループ回数
  COOLDOWN=3           ステップ間のクールダウン（秒）

操作方法:
  tmux attach -t claude-migration   # アタッチして観察・操作
  rm .claude-auto-migrate           # 現在のステップ完了後に停止
  tmux 内で Ctrl+C                  # 即時停止

詳細: scripts/MIGRATION-LOOP.md を参照
USAGE
      exit 0
      ;;
    F-*)
      TARGET="$arg"
      ;;
    *)
      echo "Error: 不明な引数 '$arg'" >&2
      echo "Usage: $0 [-h] [F-XX-YY]" >&2
      exit 1
      ;;
  esac
done

# === 前提条件チェック ===
if ! command -v claude &>/dev/null; then
  echo "Error: claude コマンドが見つかりません" >&2
  exit 1
fi

if ! command -v tmux &>/dev/null; then
  echo "Error: tmux コマンドが見つかりません（brew install tmux）" >&2
  exit 1
fi

if [ ! -d "$PROJECT_DIR/.claude/skills/code-migration" ]; then
  echo "Error: code-migration スキルが見つかりません" >&2
  exit 1
fi

if tmux has-session -t "$TMUX_SESSION" 2>/dev/null; then
  echo "Error: tmux セッション '$TMUX_SESSION' が既に存在します" >&2
  echo "  アタッチ: tmux attach -t $TMUX_SESSION" >&2
  echo "  終了:     tmux kill-session -t $TMUX_SESSION" >&2
  exit 1
fi

if [ -f "$FLAG_FILE" ]; then
  echo "Error: フラグファイルが既に存在します: $FLAG_FILE" >&2
  echo "  前回のループが正常終了しなかった可能性があります" >&2
  echo "  確認してから: rm $FLAG_FILE" >&2
  exit 1
fi

# === フラグファイル作成 ===
echo "$TARGET" > "$FLAG_FILE"

# === tmux セッション内で実行するループスクリプト ===
PROMPT="/code-migration"
if [ -n "$TARGET" ]; then
  PROMPT="/code-migration $TARGET"
fi

LOOP_SCRIPT_FILE=$(mktemp "${TMPDIR:-/tmp}/migration-loop.XXXXXX.sh")
cat > "$LOOP_SCRIPT_FILE" <<EOF
#!/usr/bin/env bash
set -euo pipefail

FLAG_FILE="$FLAG_FILE"
MAX_ITERATIONS=$MAX_ITERATIONS
COOLDOWN=$COOLDOWN
PROMPT="$PROMPT"
PROJECT_DIR="$PROJECT_DIR"
SCRIPT_FILE="$LOOP_SCRIPT_FILE"

cd "\$PROJECT_DIR"

iteration=0

cleanup() {
  rm -f "\$FLAG_FILE"
  rm -f "\$SCRIPT_FILE"
  echo ""
  echo "=========================================="
  echo " マイグレーションループ終了"
  echo " 完了ステップ数: \$iteration"
  echo "=========================================="
  echo ""
  echo "このウィンドウを閉じるには: exit または Ctrl+D"
}
trap cleanup EXIT

echo "=========================================="
echo " code-migration 連続実行"
echo " プロンプト: \$PROMPT"
echo " 最大ステップ: \$MAX_ITERATIONS"
echo "=========================================="
echo ""
echo "停止方法:"
echo "  - 現在のステップ完了後に停止: rm \$FLAG_FILE"
echo "  - 即時停止: Ctrl+C"
echo ""

while [ -f "\$FLAG_FILE" ]; do
  iteration=\$((iteration + 1))

  if [ "\$iteration" -gt "\$MAX_ITERATIONS" ]; then
    echo ""
    echo "[WARN] 最大ステップ数 (\$MAX_ITERATIONS) に達しました"
    break
  fi

  echo ""
  echo "=========================================="
  echo " ステップ \$iteration / \$MAX_ITERATIONS"
  echo " \$(date '+%Y-%m-%d %H:%M:%S')"
  echo "=========================================="
  echo ""

  claude "\$PROMPT" || true

  if [ ! -f "\$FLAG_FILE" ]; then
    echo ""
    echo "[INFO] フラグファイルが削除されました。停止します。"
    break
  fi

  echo ""
  echo "[INFO] \${COOLDOWN}秒後に次のステップを開始します..."
  sleep "\$COOLDOWN"
done
EOF
chmod +x "$LOOP_SCRIPT_FILE"

# === tmux セッション作成 ===
tmux new-session -d -s "$TMUX_SESSION" -c "$PROJECT_DIR" "bash $LOOP_SCRIPT_FILE"

echo "=========================================="
echo " マイグレーションループを開始しました"
echo "=========================================="
echo ""
echo "  tmux セッション: $TMUX_SESSION"
echo "  プロンプト:       $PROMPT"
echo "  最大ステップ:     $MAX_ITERATIONS"
echo ""
echo "操作:"
echo "  アタッチ:    tmux attach -t $TMUX_SESSION"
echo "  停止(安全):  rm $FLAG_FILE"
echo "  停止(強制):  tmux kill-session -t $TMUX_SESSION"
echo ""
