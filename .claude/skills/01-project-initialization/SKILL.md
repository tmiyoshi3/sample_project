---
name: 01-project-initialization
description: "Phase 0 - 既存システム情報と移行後アーキテクチャをCLAUDE.mdに記録する"
disable-model-invocation: true
---

# 01-project-initialization: プロジェクト初期化

## 目的

マイグレーション対象の既存システム情報と、移行後アーキテクチャをCLAUDE.mdに記録し、作業基盤を構築する。

## 担当Phase

Phase 0: プロジェクト初期化

---

## 入力ファイル

- 既存の CLAUDE.md（存在する場合）

## 出力ファイル

- CLAUDE.md
- spec/worklog/index.md

## 更新してよいファイル

- CLAUDE.md
- spec/worklog/index.md

## 更新してはいけないファイル

- 既存ソースコード
- その他のspec/*ファイル（この段階では存在しないはず）

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md が存在するか確認する。存在する場合は内容を読む。
2. spec/ ディレクトリが存在するか確認する。

### Step 1: 情報収集

ユーザーに以下を確認する。不足情報がある場合は推測せず質問する。

#### 既存システム情報
- 対象ソース一式のフォルダパス
- トップページまたはログインページのURL
- ログインに必要なユーザー名（`.env.local` に保存）
- ログインに必要なパスワード（`.env.local` に保存）
- 利用可能なロールやユーザー種別
- 実行環境の起動方法
- DB接続情報（`.env.local` に保存）
- 外部サービスの有無
- バッチ・ジョブ・非同期処理の有無

#### マイグレーション後のアーキテクチャ
- FE フレームワーク
- BE フレームワーク / 言語
- DB
- コンテナ / インフラ
- テストフレームワーク
- API仕様形式

### Step 2: `.env.local` の作成

認証情報やDB接続情報は `.env.local` に保存する。CLAUDE.md には直接記載しない。

```
# .env.local
EXISTING_LOGIN_USER=xxx
EXISTING_LOGIN_PASSWORD=xxx
EXISTING_DB_HOST=xxx
EXISTING_DB_PORT=xxx
EXISTING_DB_NAME=xxx
EXISTING_DB_USER=xxx
EXISTING_DB_PASSWORD=xxx
```

`.gitignore` に `.env.local` が含まれていることを確認する。

### Step 3: CLAUDE.md の更新

CLAUDE.md に以下のセクションを追加する:

```markdown
## Migration Project

### Existing System
- Source path: <ソースパス>
- Top URL: <URL>
- Login user: see .env.local
- Login password: see .env.local
- Roles: <ロール一覧>
- Startup command: <起動コマンド>
- DB: see .env.local
- External services: <外部サービスの有無>
- Batch/Job: <バッチ処理の有無>
- Notes: <備考>

### Target Architecture
- FE: <フレームワーク>
- BE: <言語/フレームワーク>
- DB: <DB>
- Container: <コンテナ>
- Test: <テストフレームワーク>
- API Spec: <API仕様形式>
```

### Step 4: spec ディレクトリの作成

```
mkdir -p spec/traceability
mkdir -p spec/worklog
mkdir -p spec/ui
mkdir -p spec/api
mkdir -p spec/usecases
mkdir -p spec/gherkin
mkdir -p spec/regression-report
mkdir -p screenshots
mkdir -p tests/e2e
```

### Step 5: spec/worklog/index.md の初期化

最初の作業ログエントリを記録する。

### Step 6: 終了処理

1. spec/worklog/index.md を更新する（実施内容・更新ファイル・残作業・次skill）。
2. 成果サマリーを出力する。
3. 次skill（`02-feature-inventory`）を報告する。

---

## 完了条件

- [ ] CLAUDE.md が作成または更新されている
- [ ] 既存システムへのアクセス方法が記録されている
- [ ] 移行後アーキテクチャが記録されている
- [ ] 機密情報が CLAUDE.md に直接保存されていない
- [ ] `.env.local` に機密情報が保存されている
- [ ] `.gitignore` に `.env.local` が含まれている
- [ ] spec/worklog/index.md に初期エントリが記録されている
- [ ] 次に実行すべきskillが spec/worklog/index.md に記録されている

---

## 制約

- 機密情報は `.env.local` に保存し、CLAUDE.md に直接記載しない。
- 他phaseの成果物変更・対象外の作業は行わない。
