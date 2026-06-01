---
name: 02-feature-inventory
description: "Phase 1 - 画面を探索し機能IDを採番して機能インベントリを作成する"
disable-model-invocation: true
---

# 02-feature-inventory: 機能インベントリ作成

## 目的

既存システムの画面を探索し、画面・コンポーネント・操作を大分類・中分類・小分類に分解して機能IDを採番する。詳細仕様は確定せず、機能の存在を漏れなく発見することに集中する。

## 担当Phase

Phase 1: 機能インベントリ作成

---

## 機能ID採番ルール

```
F-XX-YY-ZZZ

XX  : 大分類番号（01〜99）
YY  : 中分類番号（大分類内で一意、01〜99）
ZZZ : 小分類番号（大分類+中分類内で一意、001〜999）
```

- `F-XX-00-000` は大分類そのものを指すラベルID
- `F-XX-YY-000` は中分類そのものを指すラベルID
- 小分類は `001` から採番する
- 並列作業時は、担当する大分類の範囲内でのみ採番する

---

## 入力ファイル

- CLAUDE.md
- 既存システムURL（CLAUDE.md に記載）
- ログイン情報（.env.local に記載）

## 出力ファイル

- spec/features.md（大分類一覧 + 機能インベントリ）
- spec/ui/F-XX.html（初期エントリのみ、大分類単位）
- spec/traceability/index.md
- spec/traceability/F-XX.md（大分類単位）
- spec/worklog/index.md
- spec/worklog/F-XX.md（大分類単位）
- screenshots/F-XX/

## 参照すべきファイル

- CLAUDE.md
- spec/worklog/F-XX.md（前回作業の確認）

## 更新してよいファイル

- spec/features.md
- spec/ui/F-XX.html（自分の担当大分類のみ）
- spec/traceability/index.md（自分の大分類行のみ）
- spec/traceability/F-XX.md（自分の担当大分類のみ）
- spec/worklog/index.md（自分の大分類行のみ）
- spec/worklog/F-XX.md（自分の担当大分類のみ）
- screenshots/F-XX/（自分の担当大分類のみ）

## 更新してはいけないファイル

- CLAUDE.md（このskillでは原則更新しない）
- 既存ソースコード
- spec/api/F-XX.yml
- spec/usecases/F-XX.md
- spec/architecture.md
- tests/e2e/
- 他の担当者の大分類のファイル

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX.md を読み、ステータスを確認する。
4. 対象範囲とスコープを確認する。

### Step 1: 既存システムにアクセス

Chrome DevTools MCP または Playwright MCP を使って既存システムにアクセスする。

1. トップページまたはログインページにアクセスする。
2. ログインする（.env.local の情報を使用）。
3. ログイン後の画面のスクリーンショットを撮る。

### Step 2: 画面一覧の作成と大分類の決定

ナビゲーション、メニュー、リンクを辿って画面を探索する。

各画面について:
1. URLを記録する。
2. スクリーンショットを撮る（`screenshots/F-XX/` に保存）。
3. 画面名を記録する。
4. 大分類を決める（業務領域、主要機能単位）。
5. 大分類番号（XX）を採番する。

### Step 3: 大分類一覧テーブルの作成

`spec/features.md` の冒頭に大分類一覧テーブルを作成する:

```markdown
# 機能インベントリ

## 大分類一覧

| 大分類番号 | 大分類名 | 画面数 | 担当者 | ステータス |
|---|---|---|---|---|
| F-01 | 認証 | 2 | - | discovered |
| F-02 | 注文管理 | 3 | - | discovered |
| F-03 | 商品管理 | 2 | - | discovered |
```

並列作業を開始する前に、この大分類一覧で担当割り当てを合意する。

### Step 4: コンポーネント分解と中分類の決定

各画面（大分類内）を中分類に分解する:
- ヘッダー、フッター、サイドバー
- フォーム
- 一覧テーブル
- 検索条件
- モーダル
- タブ
- その他の領域

中分類番号（YY）を大分類内で採番する。

### Step 5: 操作・項目の列挙と小分類の決定

各コンポーネントの小分類を列挙する:
- 表示項目
- 入力項目
- ボタン
- リンク
- 操作（クリック、入力、選択、ドラッグ&ドロップなど）
- 状態変化

小分類番号（ZZZ）を大分類+中分類内で採番する。

### Step 6: spec/features.md への記録

```markdown
## F-01: 認証

### F-01-01: ログイン画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-01-01-001 | ユーザー名入力 | 入力項目 | ログインID入力 | /login | discovered |
| F-01-01-002 | パスワード入力 | 入力項目 | パスワード入力 | /login | discovered |
| F-01-01-003 | ログインボタン | ボタン | ログイン実行 | /login | discovered |
| F-01-01-004 | エラーメッセージ | 表示項目 | 認証エラー表示 | /login | discovered |

### F-01-02: パスワードリセット画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-01-02-001 | メールアドレス入力 | 入力項目 | リセット用メール入力 | /reset-password | discovered |
| F-01-02-002 | リセットボタン | ボタン | リセットメール送信 | /reset-password | discovered |

## F-02: 注文管理

### F-02-01: 注文一覧

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-02-01-001 | 検索フォーム | フォーム | 注文検索 | /orders | discovered |
| F-02-01-002 | 一覧テーブル | テーブル | 注文一覧表示 | /orders | discovered |
| F-02-01-003 | ページング | ナビゲーション | ページ切り替え | /orders | discovered |
```

### Step 7: spec/traceability/F-XX.md の作成

発見した機能IDをトレーサビリティマトリクスに追加する。ステータスはすべて `discovered` にする。

大分類ごとにファイルを分ける:
- `spec/traceability/F-01.md` — 認証
- `spec/traceability/F-02.md` — 注文管理

### Step 8: spec/traceability/index.md の作成・更新

全大分類のステータスサマリーを更新する。

### Step 9: スクリーンショットの整理

`screenshots/F-XX/` に大分類ごとにディレクトリを分けて保存する。

ファイル名規則: `F-XX-YY-ZZZ_<画面名>_<条件>.png`

例:
- `screenshots/F-01/F-01-01-001_login_initial.png`
- `screenshots/F-02/F-02-01-001_orders_list.png`

### Step 10: ディレクトリ構造の作成

発見した大分類ごとに必要なディレクトリを作成する:

```bash
mkdir -p spec/traceability
mkdir -p spec/worklog
mkdir -p spec/ui
mkdir -p spec/api
mkdir -p spec/usecases
mkdir -p spec/gherkin/F-01
mkdir -p spec/gherkin/F-02
mkdir -p spec/regression-report
mkdir -p screenshots/F-01
mkdir -p screenshots/F-02
```

### Step 11: 終了処理

1. spec/traceability/F-XX.md と spec/traceability/index.md を更新する。
2. spec/worklog/F-XX.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する（発見した大分類数・中分類数・機能ID数）。
4. 次skill（`03-source-structure-discovery`）を報告する。

---

## 完了条件

- [ ] 発見した画面が一覧化されている
- [ ] 大分類一覧テーブルが作成されている
- [ ] 各画面の主要コンポーネントが中分類として一覧化されている
- [ ] 各コンポーネントの表示領域・入力・操作が小分類として列挙されている
- [ ] 各項目に機能ID（F-XX-YY-ZZZ形式）が採番されている
- [ ] 不明点が未確認事項として記録されている
- [ ] spec/features.md が作成されている
- [ ] spec/traceability/F-XX.md が大分類ごとに作成されている
- [ ] spec/traceability/index.md が作成されている
- [ ] spec/worklog/F-XX.md が更新されている
- [ ] スクリーンショットが screenshots/F-XX/ に保存されている
- [ ] 大分類ごとのディレクトリ構造が作成されている

---

## Playwright MCP / Chrome DevTools MCPの使い方

### 画面探索時
1. `navigate_page` でURLにアクセスする。
2. `take_screenshot` でスクリーンショットを撮る。
3. `click` でリンク・ボタンをクリックして画面遷移を確認する。
4. `fill` / `fill_form` でフォーム入力を確認する。

### スクリーンショット保存時
- ファイル名規則: `screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_<条件>.png`
- 条件例: `initial`, `after-login`, `error`, `empty-list`

---

## 制約

- 詳細仕様を無理に確定しない。
- 画面から見えない処理を推測で埋めない。
- 他の担当者の大分類に機能IDを追加しない。
- 他phaseの成果物変更・対象外の作業は行わない。
