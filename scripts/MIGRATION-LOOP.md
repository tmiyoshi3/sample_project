# code-migration 連続実行 (Migration Loop)

`/code-migration` スキルを、セッションを自動クリアしながら連続実行する仕組み。

## アーキテクチャ

```
┌─ ターミナル ──────────────────────────────────────────────┐
│ ./scripts/run-migration-loop.sh F-04-02                   │
│  ├── フラグファイル作成 (.claude-auto-migrate)              │
│  ├── tmux セッション "claude-migration" 作成               │
│  └── ループスクリプトを tmux 内で実行                       │
└───────────────────────────────────────────────────────────┘
         │
         ▼
┌─ tmux session "claude-migration" ─────────────────────────┐
│                                                            │
│  ┌─ ループスクリプト ─────────────────────────────────┐    │
│  │  while .claude-auto-migrate が存在する:             │    │
│  │                                                     │    │
│  │    ┌─ claude "/code-migration F-04-02" ──────┐     │    │
│  │    │ ① claude 起動（新セッション）             │     │    │
│  │    │ ② skill 実行（ファイル読み書き、           │     │    │
│  │    │    ブラウザ操作、テスト実行 etc）          │     │    │
│  │    │ ③ ユーザーが permission に応答できる       │     │    │
│  │    │ ④ skill 完了 → Stop hook 発火             │     │    │
│  │    │ ⑤ Stop hook が /exit を送信（1秒後）      │     │    │
│  │    │ ⑥ claude プロセス終了                     │     │    │
│  │    └───────────────────────────────────────────┘     │    │
│  │                                                     │    │
│  │    sleep 3（クールダウン）                            │    │
│  │    → ループ先頭に戻り新セッション起動               │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                            │
│  ユーザーは tmux attach でこの画面を見ながら操作できる       │
└────────────────────────────────────────────────────────────┘
```

### コンポーネント

| ファイル | 役割 |
|---------|------|
| `scripts/run-migration-loop.sh` | ランチャー。tmux セッションを作り、ループを開始する |
| `scripts/_migration-stop-hook.sh` | Stop hook。ステップ完了時に `/exit` を tmux 経由で送信し、claude を終了させる |
| `.claude/settings.local.json` | Stop hook の登録先。既存の say hook と並列で動作する |
| `.claude-auto-migrate` | フラグファイル。このファイルが存在する間ループが続く |

### セッションクリアの仕組み

各ステップで `claude` プロセスが **終了→再起動** されるため、真のセッションクリアが実現される。前ステップのコンテキストは一切残らない。

```
Step 1: claude プロセスA → skill 実行 → Stop hook → /exit → プロセスA 終了
        ↓ (3秒クールダウン)
Step 2: claude プロセスB → skill 実行 → Stop hook → /exit → プロセスB 終了
        ↓
Step 3: claude プロセスC → ...
```

## 初回セットアップ（最初に1回だけ）

このツールは tmux 内で `claude` CLI を直接実行する。
VSCode 拡張の認証とは別に、CLI 用の認証が必要。

```bash
# ターミナル（VSCode のターミナルでも可）で実行
claude auth login
```

ブラウザが開くので、ログインして認証を完了する。
「Authentication successful」と表示されれば OK。

## 使い方

### 準備
settings.local.jsonなどにStop Hookでセッションを終了させるためのシェルを実行
```json
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash $CLAUDE_PROJECT_DIR/scripts/_migration-stop-hook.sh"
          }
        ]
      }
    ],
```

### 基本操作

```bash
# 1. ループ開始
./scripts/run-migration-loop.sh

# 2. tmux にアタッチして観察
tmux attach -t claude-migration

# 3. permission が表示されたら通常どおり応答

# 4. 停止したくなったら（別ターミナルから）
rm .claude-auto-migrate
```

### 中分類を指定

```bash
./scripts/run-migration-loop.sh F-04-02
```

### 最大ステップ数を変更

```bash
MAX_ITERATIONS=5 ./scripts/run-migration-loop.sh
```

### クールダウン時間を変更

```bash
COOLDOWN=10 ./scripts/run-migration-loop.sh
```

## 停止方法

| 方法 | 動作 |
|------|------|
| `rm .claude-auto-migrate` | 現在のステップが完了してから停止（安全） |
| tmux 内で `Ctrl+C` | 実行中のステップを即座に中断してループ終了 |
| `tmux kill-session -t claude-migration` | tmux セッションごと強制終了 |

## Stop hook の動作

`_migration-stop-hook.sh` は以下の条件を**全て**満たす場合にのみ動作する:

1. `.claude-auto-migrate` フラグファイルが存在する
2. tmux セッション `claude-migration` が存在する

条件を満たさない場合は `exit 0` で即終了（何もしない）。通常の対話セッションには一切影響しない。

## トラブルシューティング

### 認証エラー (401 Invalid authentication credentials)

tmux 内の claude が `Please run /login` と表示される場合、CLI の認証ができていない。

```bash
# 1. ループを停止
rm .claude-auto-migrate
tmux kill-session -t claude-migration

# 2. CLI を認証（ブラウザが開く）
claude auth login

# 3. ループを再開
./scripts/run-migration-loop.sh F-04-02
```

VSCode 拡張経由の認証と CLI の認証は別物なので、初回は必ずこの手順が必要。

### tmux セッションが既に存在すると表示される

```bash
# セッションの状態を確認
tmux list-sessions

# 不要なら削除
tmux kill-session -t claude-migration
```

### フラグファイルが残っている

前回のループが正常終了しなかった場合に発生する。

```bash
rm .claude-auto-migrate
```

### Stop hook が動作しない

Hook は Claude Code 起動時に読み込まれるため、`settings.local.json` を変更した場合は claude を再起動する必要がある。

```bash
# 現在のセッションで hook が認識されているか確認
# claude 内で /hooks を実行

# 新しいセッションで確認する場合
tmux kill-session -t claude-migration
./scripts/run-migration-loop.sh
```

### claude が /exit で終了しない

Stop hook の `sleep 1` が短すぎる可能性がある。`_migration-stop-hook.sh` 内の `sleep 1` を `sleep 2` に変更してみる。

## 環境変数一覧

| 変数 | デフォルト | 説明 |
|------|-----------|------|
| `MAX_ITERATIONS` | 20 | 最大ループ回数 |
| `COOLDOWN` | 3 | ステップ間のクールダウン（秒） |
