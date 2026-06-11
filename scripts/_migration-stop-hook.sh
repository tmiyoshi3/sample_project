#!/bin/bash
set -euo pipefail

cat > /dev/null

FLAG_FILE="$CLAUDE_PROJECT_DIR/.claude-auto-migrate"
TMUX_SESSION="claude-migration"

if [ ! -f "$FLAG_FILE" ]; then
  exit 0
fi

if ! tmux has-session -t "$TMUX_SESSION" 2>/dev/null; then
  exit 0
fi

# hook 完了後に /exit を送信して claude を終了させる
(sleep 3 && tmux send-keys -t "$TMUX_SESSION" "/exit" Enter) &
disown

exit 0
