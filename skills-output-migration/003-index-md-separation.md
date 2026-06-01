---
status: done
completed: 2026-05-24
note: 手動実施済み
---

# Output Migration Step 003: worklog/index.md からの詳細ログ分離

## 背景

`spec/worklog/index.md` は「サマリーテーブル（1行/大分類）」として設計されていたが、07-architecture-designの実行時に、実施内容・更新ファイル・設計判断の要約・未確認事項などの詳細ログがindex.mdに直接記載されていた。これによりindex.mdが数百行に膨れ、サマリーとしての機能を失っていた。

## 修正方針

- `spec/worklog/cross-cutting.md` を新規作成する
- index.mdに記載されている詳細ログ（07-architecture-design、08-test-data-designの記録）をcross-cutting.mdに移動する
- index.mdにはサマリーテーブルのみを残す

## 対象ファイル

- `spec/worklog/index.md`（既存・修正）
- `spec/worklog/cross-cutting.md`（新規作成）

## 修正手順

### Step 1: cross-cutting.md の作成

`spec/worklog/cross-cutting.md` を新規作成する。

```markdown
# 作業ログ: 横断的関心事
```

### Step 2: index.md から詳細ログを移動

`spec/worklog/index.md` を開き、サマリーテーブル以外の内容（07-architecture-designや08-test-data-designの実施記録）を探す。

**移動対象の例（index.mdから削除してcross-cutting.mdに移動する内容）:**
```markdown
## 2026-05-22 14:30

### 対象skill
07-architecture-design

### 実施内容
- FE/BE/DB/テストの設計方針を策定
- 共通コンポーネント候補を整理
...

### 更新ファイル
- spec/architecture.md
...

### 設計判断の要約
...

### 未確認事項
...

### 次に実行すべきskill
...
```

これらのエントリをindex.mdから切り取り、`spec/worklog/cross-cutting.md` に貼り付ける。

### Step 3: index.md をサマリーテーブルのみにする

修正後の `spec/worklog/index.md` は以下の形式のみとする:

```markdown
# 作業ログ サマリー

| 大分類 | 最終更新 | 現在phase | 対象機能ID | 次skill | 担当者 |
|---|---|---|---|---|---|
| F-01 | 2026-05-22 14:30 | Phase 13 | F-01-01-001 | 完了 | 担当者A |
| F-02 | 2026-05-22 15:00 | Phase 10 | F-02-01-001 | 11-migrated-implementation | 担当者B |
| ... | ... | ... | ... | ... | ... |
```

## 注意事項

- サマリーテーブルの行は削除しない。テーブル以外の詳細エントリのみを移動する
- cross-cutting.mdに移動する際、元の日時・内容はそのまま保持する
- 移動後、cross-cutting.mdの「更新ファイル」セクションも Step 002 のルールに従ってカテゴリ別件数サマリーに変換する（Step 002が適用済みの場合。未適用なら移動のみでよい）

## 完了報告

修正完了後、以下の形式で報告すること:

### 修正したファイル一覧

例:
```
- spec/worklog/index.md — 詳細ログ5件を削除、サマリーテーブルのみ残存
- spec/worklog/cross-cutting.md — 新規作成、index.mdから移動した5件を記載
```

### 未修正のファイル
修正対象だが未修正のファイルがあれば、ファイル名とその理由を記載する。

### 確認チェックリスト
- [ ] `spec/worklog/index.md` がサマリーテーブルのみになっていること
- [ ] `spec/worklog/cross-cutting.md` が作成されていること
- [ ] index.mdにあった詳細ログが全てcross-cutting.mdに移動されていること
- [ ] 情報の欠落がないこと
