---
name: skills-output-migration
description: "未適用のoutput migrationステップを1つ実行し、既存出力物を新フォーマットに変換する"
---

# skills-output-migration: 出力物マイグレーション

## 目的

skills更新に伴い、既存の出力物（ワークログ、regression-reportなど）を新しいフォーマットに変換する。各ステップファイルの frontmatter `status` フィールドで管理されている未適用ステップを1つずつ実行する。

---

## ファイル配置（重要）

このSKILL.mdは `.claude/skills/skills-output-migration/SKILL.md` に配置されているが、
マイグレーションのデータファイルは **プロジェクトルート直下** の `skills-output-migration/` ディレクトリにある。
混同しないこと。

```
<プロジェクトルート>/
├── .claude/skills/skills-output-migration/
│   └── SKILL.md                          ← このファイル（スキル定義のみ）
└── skills-output-migration/              ← データファイル（以下すべてここ）
    ├── 001-test-result-summary.md
    ├── 002-updated-files-summary.md
    └── ...
```

## 入力ファイル（プロジェクトルートからの相対パス）

- `skills-output-migration/XXX-*.md` — 各ステップの修正指示（frontmatter に `status` フィールドを持つ）

## 出力ファイル

- 各ステップの指示に従い修正される出力物（spec/worklog/, spec/regression-report/ 等）
- 完了したステップファイルの frontmatter（`status` を `done` に更新）

---

## ステータス管理

各ステップファイルの frontmatter でステータスを管理する。

```yaml
---
status: pending    # pending / done / skipped
completed:         # 完了日（YYYY-MM-DD）
note:              # 備考
---
```

### ブランチ運用ルール

- **main ブランチ**: ステップの定義のみ。新規ステップは常に `status: pending` で追加し、main 上では実行しない。
- **作業ブランチ**: マイグレーションの実行はここで行う。完了したステップの frontmatter を `done` に更新する。

この設計により、main での変更（新ファイル追加）とブランチでの変更（既存ファイルの frontmatter 更新）が
別々のファイルへの操作となり、rebase 時のコンフリクトを回避できる。

---

## 実行手順

### Step 1: ステータス確認

プロジェクトルートの `skills-output-migration/` ディレクトリにある `XXX-*.md` ファイルを番号順にすべて読み、frontmatter の `status` が `pending` の最初のステップを特定する。

- 全てのステップが `done` または `skipped` の場合:
  - 「未適用のoutput migrationステップはありません。」と報告して終了する。

### Step 2: 指示ファイルの読み込み

特定したステップの指示ファイル（`skills-output-migration/XXX-*.md`）の本文を読む。

### Step 3: 出力物の修正

指示ファイルの「修正手順」に従い、対象ファイルを修正する。

- 対象ファイルが存在しない場合（例: まだそのphaseに到達していない機能）はスキップし、備考に理由を記録する。
- 出力物が既にステップの変換後フォーマットになっている場合（過去のブランチで適用済みの内容が main にマージされている場合など）は、変更不要と判断する。
- 指示ファイルの「注意事項」に従うこと。

### Step 4: ステータス更新

該当ステップファイルの frontmatter を更新する:
- `status` を `done` に変更
- `completed` に完了日を記入（YYYY-MM-DD形式）
- 必要に応じて `note` に備考を記入

対象ファイルが1件も存在しなかった場合、または既に変換済みで変更不要だった場合は、`status` を `done` に変更し、`note` に理由を記入する（例: 「既に適用済み」）。

### Step 5: 完了報告

指示ファイルの「完了報告」セクションのテンプレートに従い、以下を報告する:
- 修正したファイル一覧（ファイル名と修正箇所数）
- 未修正のファイル（あれば理由付きで）
- 確認チェックリスト

---

## 制約

- 1回の実行で1ステップのみ実行する。複数ステップをまとめて実行しない。
- 出力物の内容（仕様、テスト結果の値など）は変更しない。フォーマットの変換のみを行う。
- 指示ファイルに記載されていない変更は行わない。

---

## 使い方

### 未適用ステップを1つ実行する

```
/skills-output-migration
```

### 全ての未適用ステップを順番に実行する

上記を繰り返し呼び出す。各実行で1ステップずつ消化される。

### 特定のステップをスキップしたい場合

該当ステップファイルの frontmatter `status` を手動で `skipped` に変更し、`note` に理由を記入する。
