---
name: code-migration
description: "マイグレーションの次ステップを自動判定して実行する"
---

# code-migration: 次ステップ自動実行

worklog と出力物マイグレーションのステータスを読み取り、次に実行すべきスキルを自動判定して実行する。

---

## 判定ロジック

以下の優先順で判定する。

### Priority 1: 出力物マイグレーション

`skills-output-migration/XXX-*.md` を番号順に読み、frontmatter `status: pending` のステップがあれば、そのステップを実行する（`/skills-output-migration` と同じ手順）。

### Priority 2: 通常のマイグレーションスキル

`spec/worklog/index.md` を読み、次に実行すべきスキルを判定する。

---

## 実行手順

### Step 1: 出力物マイグレーションの確認

`skills-output-migration/` ディレクトリの `XXX-*.md` ファイルを番号順にすべて読み、frontmatter の `status` を確認する。

- `status: pending` のステップが見つかった場合:
  - 「出力物マイグレーション: XXX-xxx.md を実行します」と報告する。
  - そのステップファイルの指示に従い実行する（skills-output-migration/SKILL.md の Step 2〜5 と同じ手順）。
  - **ここで終了。Priority 2 には進まない。**
- 全ステップが `done` or `skipped` の場合: Priority 2 へ進む。

### Step 2: worklog/index.md の確認

`spec/worklog/index.md` を読む。

- ファイルが存在しない場合:
  - `spec/features.md` が存在するか確認する。
    - 存在しない → 「`/01-project-initialization` を実行してください」と案内して終了。
    - 存在する → `spec/source-inventory.md` が存在するか確認する。
      - 存在しない → 「`/03-source-structure-discovery` を実行してください」と案内して終了。
      - 存在する → Step 3 へ（worklog/index.md がないが基盤は完了している状態）。

### Step 3: 次スキルの特定

`spec/worklog/index.md` のテーブルから対象行を選択する:

```
| 中分類 | 最終更新 | 現在phase | 対象機能ID | 次skill | 担当者 |
```

- ユーザーが引数で中分類を指定している場合（例: `/code-migration F-03-02`）→ その中分類の行を使用。
- 指定がない場合 → `最終更新` が最も新しい行を使用。
- テーブルが空、または `次skill` 列が全て空の場合:
  - `spec/traceability/index.md` を読み、`discovered` 以上で `done` 未満の中分類を探す。
  - 見つかった → その中分類の最初の機能IDに対して `04-ui-specification` を判定結果とする。
  - 見つからない → 「全ての機能IDが完了しています」と報告して終了。

### Step 4: 判定結果の報告

以下の情報をユーザーに報告する:

```
次のステップ: /XX-skill-name
対象: F-XX-YY-ZZZ
中分類: F-XX-YY
中分類進捗: X/Y done
根拠: worklog/index.md の次skill列
```

### Step 5: スキルの実行

判定したスキルの SKILL.md を読み込み、そのスキルの実行手順に従って作業を実行する。

---

## 引数

| 引数 | 必須 | 説明 |
|---|---|---|
| 中分類（F-XX-YY） | 任意 | 対象とする中分類を指定。並列作業時に担当を明示する場合に使用 |

---

## スキル間の依存関係

```
01-project-initialization      → 最初に1回
    ↓
02-feature-inventory           → 最初に1回
    ↓
03-source-structure-discovery   → 最初に1回
    ↓
┌───────────────────────────────────────────────────────────┐
│ 中分類（F-XX-YY）ごとにループ                               │
│                                                           │
│  機能IDごとに 04→13 を通しで回す:                           │
│                                                           │
│  04-ui-specification        ← 機能ID単位                   │
│      ↓                                                    │
│  05-api-specification       ← 機能ID単位                   │
│      ↓                                                    │
│  06-usecase-extraction      ← 機能ID単位                   │
│      ↓                                                    │
│  07-architecture-design     ← 差分更新                     │
│      ↓                                                    │
│  08-test-data-design        ← 差分更新                     │
│      ↓                                                    │
│  09-gherkin-generation      ← 機能ID単位                   │
│      ↓                                                    │
│  10-current-e2e-generation  ← 機能ID単位                   │
│      ↓                                                    │
│  11-migrated-implementation ← 機能ID単位                   │
│      ↓                                                    │
│  12-visual-comparison       ← 機能ID単位                   │
│      ↓                                                    │
│  13-regression-comparison   ← 機能ID単位                   │
│      ↓                                                    │
│  中分類内に未処理の機能IDあり → 次の機能IDの 04 へ           │
│  中分類内の全機能ID done → 次の中分類の最初の機能IDの 04 へ  │
└───────────────────────────────────────────────────────────┘
```

### 13-regression-comparison の結果による分岐

| 条件 | 次のステータス | 次のスキル |
|---|---|---|
| 差分なし | `done` | 中分類内に残りあり → 次の機能IDの `04` / 全完了 → 次の中分類の `04` |
| 移植漏れあり | `regression-checked` | `11-migrated-implementation`（同じ機能ID） |
| 仕様不明あり | `regression-checked` | `04-ui-specification` or `05-api-specification`（同じ機能ID） |
| テスト不備あり | `regression-checked` | `09-gherkin-generation` or `10-current-e2e-generation`（同じ機能ID） |
