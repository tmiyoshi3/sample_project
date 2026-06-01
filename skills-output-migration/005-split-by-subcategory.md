---
status: done
completed: 2026-05-24
note: "F-01→2分割, F-02→1-2分割, F-12→3分割, 計32新規ファイル作成・17旧ファイル削除"
---

# Output Migration Step 005: 大分類（F-XX）ファイルを中分類（F-XX-YY）に分割

## 背景

skills 04-13 のループ実行スコープを中分類（F-XX-YY）単位に変更した。これに伴い、成果物ファイルも中分類単位に分割する。既存の大分類単位ファイル（F-01, F-02, F-12 が完了済み）を中分類単位に分割し、新しいスキル定義と整合させる。

## 修正方針

各 `F-XX` ファイルを、含まれる機能IDの中分類（YY部分）でグルーピングし、`F-XX-YY` ファイルに分割する。

## 対象ファイル種別

以下の6種類のファイルを分割する:

| 種別 | 分割前 | 分割後 |
|---|---|---|
| UI仕様 | `spec/ui/F-XX.html` | `spec/ui/F-XX-YY.html` |
| API仕様 | `spec/api/F-XX.yml` | `spec/api/F-XX-YY.yml` |
| ユースケース | `spec/usecases/F-XX.md` | `spec/usecases/F-XX-YY.md` |
| 作業ログ | `spec/worklog/F-XX.md` | `spec/worklog/F-XX-YY.md` |
| トレーサビリティ | `spec/traceability/F-XX.md` | `spec/traceability/F-XX-YY.md` |
| リグレッション比較 | `spec/regression-report/F-XX.md` | `spec/regression-report/F-XX-YY.md` |

## 対象大分類

完了済みの大分類のみ対象:
- F-01（認証）
- F-02（ダッシュボード）
- F-12（共通機能）

各大分類内の中分類は `spec/features.md` から特定する。

## 修正手順

### Step 1: 中分類の特定

`spec/features.md` を読み、各大分類に含まれる中分類（F-XX-YY-000 のラベルID）を一覧化する。

例:
```
F-01:
  F-01-01（ログイン画面）
  F-01-02（パスワードリセット画面）
F-02:
  F-02-01（ダッシュボード）
  F-02-02（...）
```

### Step 2: UI仕様（spec/ui/F-XX.html）の分割

1. `spec/ui/F-XX.html` を読む
2. HTML内の各機能セクション（`## F-XX-YY-ZZZ` や `id="F-XX-YY-ZZZ"` で区切られる）を中分類（YY部分）でグルーピングする
3. 共通ヘッダー（`<html>`, `<head>`, CSS定義、ページタイトル等）は各分割ファイルにコピーする
4. タイトルを `F-XX <大分類名>` から `F-XX-YY <中分類名>` に変更する
5. 各中分類のファイル `spec/ui/F-XX-YY.html` として保存する
6. 元の `spec/ui/F-XX.html` を削除する

### Step 3: API仕様（spec/api/F-XX.yml）の分割

1. `spec/api/F-XX.yml` を読む
2. OpenAPIの `paths` セクション内の各エンドポイントを、関連する機能ID（`x-feature-id` や機能IDへのコメント参照）から中分類を判定する
3. 共通部分（`openapi`, `info`, `servers`, `components/schemas` 等）は各分割ファイルにコピーする
4. 未使用の `components/schemas` は各ファイルから除去する（参照されているもののみ残す）
5. `info.title` を `F-XX <大分類名>` から `F-XX-YY <中分類名>` に変更する
6. 各中分類のファイル `spec/api/F-XX-YY.yml` として保存する
7. 元の `spec/api/F-XX.yml` を削除する

### Step 4: ユースケース（spec/usecases/F-XX.md）の分割

1. `spec/usecases/F-XX.md` を読む
2. 各ユースケース（`## UC-XXX` セクション）の関連機能IDから中分類を判定する
3. ヘッダー部分は各分割ファイルにコピーする
4. タイトルを `F-XX-YY <中分類名>` に変更する
5. UC番号は変更しない（通し番号を維持）
6. 各中分類のファイル `spec/usecases/F-XX-YY.md` として保存する
7. 元の `spec/usecases/F-XX.md` を削除する

### Step 5: 作業ログ（spec/worklog/F-XX.md）の分割

1. `spec/worklog/F-XX.md` を読む
2. 各日付エントリ（`## YYYY-MM-DD HH:MM`）の `### 対象機能ID` から中分類を判定する
3. タイトルを `# 作業ログ: F-XX-YY <中分類名>` に変更する
4. 中分類ごとにエントリを振り分ける
5. エントリの順番は日付順を維持する
6. 各中分類のファイル `spec/worklog/F-XX-YY.md` として保存する
7. 元の `spec/worklog/F-XX.md` を削除する
8. `spec/worklog/index.md` のサマリーテーブルを更新する（大分類行を中分類行に分割）

### Step 6: トレーサビリティ（spec/traceability/F-XX.md）の分割

1. `spec/traceability/F-XX.md` を読む
2. テーブルの各行の機能ID（F-XX-YY-ZZZ）から中分類を判定する
3. タイトルを `# トレーサビリティ: F-XX-YY <中分類名>` に変更する
4. テーブルヘッダーから `中分類` 列を削除する（ファイル単位で中分類が確定しているため不要）
5. 各中分類のファイル `spec/traceability/F-XX-YY.md` として保存する
6. 元の `spec/traceability/F-XX.md` を削除する
7. `spec/traceability/index.md` のサマリーテーブルを更新する（大分類行を中分類行に分割）

### Step 7: リグレッション比較（spec/regression-report/F-XX.md）の分割

1. `spec/regression-report/F-XX.md` を読む
2. 各セクション（機能IDごとの比較結果）から中分類を判定する
3. タイトルを `F-XX-YY <中分類名>` に変更する
4. 各中分類のファイル `spec/regression-report/F-XX-YY.md` として保存する
5. 元の `spec/regression-report/F-XX.md` を削除する

## 注意事項

- 分割前に `spec/features.md` で中分類の一覧を確認すること
- 中分類が1つしかない大分類（例: F-12 が F-12-01 のみ）でも、一貫性のため F-XX-YY 形式にリネームする
- 分割時にデータの欠落がないよう、分割前後の行数やセクション数を確認する
- `spec/worklog/index.md` と `spec/traceability/index.md` のサマリーテーブルは中分類単位の行に更新する
- 元の F-XX ファイルは分割完了後に削除する

## 完了報告

修正完了後、以下の形式で報告すること:

### 分割結果

大分類ごとに、分割先の中分類ファイルを一覧する。

例:
```
F-01:
  - spec/ui/F-01-01.html, spec/ui/F-01-02.html
  - spec/api/F-01-01.yml, spec/api/F-01-02.yml
  - spec/usecases/F-01-01.md, spec/usecases/F-01-02.md
  - spec/worklog/F-01-01.md, spec/worklog/F-01-02.md
  - spec/traceability/F-01-01.md, spec/traceability/F-01-02.md
  - spec/regression-report/F-01-01.md, spec/regression-report/F-01-02.md
```

### 削除したファイル
分割完了後に削除した F-XX ファイルの一覧。

### 確認チェックリスト
- [ ] 各分割ファイルにヘッダー情報が正しくコピーされていること
- [ ] 分割前のセクション数と分割後の合計セクション数が一致すること
- [ ] `spec/worklog/index.md` のサマリーテーブルが中分類単位に更新されていること
- [ ] `spec/traceability/index.md` のサマリーテーブルが中分類単位に更新されていること
- [ ] 元の F-XX ファイルが削除されていること
