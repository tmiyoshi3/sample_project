---
name: 07-architecture-design
description: "Phase 7 - 移行後アーキテクチャの設計方針を定義する"
disable-model-invocation: true
---

# 07-architecture-design: アーキテクチャ設計

## 目的

移行後のアーキテクチャ設計方針を定義する。共通コンポーネント・共通処理を整理し、機能ごとの実装がバラバラにならないよう共通ルールを策定する。

## 担当Phase

Phase 7: アーキテクチャ基本設計（インクリメンタルに更新）

## 実施タイミング

機能IDごとのループ内で、04→05→07 の後、09 の前に毎回実施する。
ただし毎回フルで実施するのではなく、**差分更新**を行う。

- **初回**: 最初の機能IDの04→05→07完了後に骨格を作成する。この時点で確認済みの機能パターンに加え、一般的なソフトウェアエンジニアリングの知見（SOLID原則、レイヤードアーキテクチャ、認証/認可の定石、エラーハンドリングのベストプラクティス等）を踏まえて設計する。
- **2回目以降**: 新しい機能のUI仕様・API仕様・ユースケースを確認し、既存の設計方針で対応できるか判断する。新しいパターンが見つかれば追記・修正する。既存の設計が過剰・陳腐化している場合は簡素化・削除も行う。レビューの結果、変更不要と判断した場合は「レビュー済み・変更なし」として記録する。

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/ui/F-XX-YY.html（実施済みの中分類）
- spec/api/F-XX-YY.yml（実施済みの中分類）
- spec/usecases/F-XX-YY.md（実施済みの中分類）
- spec/source-inventory.md
- spec/architecture.md（2回目以降、既存の設計方針を確認）
- spec/traceability/index.md
- spec/worklog/index.md

## 出力ファイル

- spec/architecture.md
- spec/traceability/index.md
- spec/worklog/cross-cutting.md
- spec/worklog/index.md（サマリーテーブルの行更新のみ）

## 更新してよいファイル

- spec/architecture.md
- spec/traceability/index.md
- spec/worklog/cross-cutting.md
- spec/worklog/index.md（サマリーテーブルの行更新のみ）

## 更新してはいけないファイル

- CLAUDE.md（アーキテクチャ情報は spec/architecture.md に記載）
- 既存ソースコード
- spec/features.md
- spec/ui/F-XX-YY.html
- spec/api/F-XX-YY.yml
- spec/source-inventory.md
- spec/usecases/F-XX-YY.md
- tests/e2e/

---

## 実行手順

### Step 0: 事前確認・既存設計の確認

1. CLAUDE.md を読む。
2. spec/worklog/cross-cutting.md を読み、前回の作業状況を確認する。
3. spec/traceability/index.md を読み、ステータスを確認する。
4. 対象スコープを確認する。

2回目以降は spec/architecture.md を読み、現在の設計方針を確認する。今回の対象機能のUI仕様・API仕様・ユースケースに対して、以下の観点でレビューする:

- 既存の設計方針でカバーできない新しいパターンがあるか（追記・修正が必要）
- 既存の設計方針に、もはや不要・過剰・陳腐化した記述がないか（簡素化・削除が必要）
- 既存の設計判断が新しい知見により見直すべきものでないか（修正が必要）

レビューの結果、変更不要と判断した場合は「レビュー済み・変更なし」としてworklogに記録し、Step 4（spec/architecture.md の作成）以降に進む。

### Step 1: 現行システムのパターン分析

spec/ui/F-XX-YY.html、spec/api/F-XX-YY.yml、spec/source-inventory.md を確認し、以下のパターンを整理する（初回は実施済み機能から、2回目以降は新規機能の差分のみ）:

- 画面の種類（一覧、詳細、フォーム、ダッシュボードなど）
- 共通的なUIコンポーネント（テーブル、フォーム、モーダル、通知など）
- API呼び出しパターン（CRUD、検索、ページング、ファイルアップロードなど）
- 認証・認可パターン
- エラーハンドリングパターン
- バリデーションパターン

### Step 2: 移行後アーキテクチャの基本方針策定

CLAUDE.md の Target Architecture を基に、以下の設計方針を策定する。

**重要**: 設計はその時点で実施済みの機能の知見だけに基づくのではなく、一般的なソフトウェアエンジニアリングの観点も踏まえて行うこと。具体的には:
- SOLID原則・DRY・関心の分離
- レイヤードアーキテクチャ、Clean Architectureの考え方
- 認証・認可の定石（トークン管理、ガード、RBAC等）
- エラーハンドリングのベストプラクティス（グローバルエラーハンドラ、エラー境界等）
- バリデーションの多層防御（FE即時フィードバック＋BE権威的バリデーション）
- API設計の一般原則（RESTful設計、一貫したレスポンス形式、ページネーション等）
- テスタビリティを考慮した設計（DI、adapter パターン等）

まだ確認していない機能でも、一般的なWebアプリケーションで必要になるパターン（一覧/詳細/作成/編集/削除、検索/フィルタ、ファイルアップロード、通知、権限管理等）は予見できる範囲で設計に含めてよい。ただし、具体的な仕様が未確認であることを明記し、後続の機能で実態と合わなければ修正する前提とする。

#### フロントエンド
- ディレクトリ構成
- ルーティング方針
- 状態管理方針
- API client方針（共通HTTP client、interceptor、エラーハンドリング）
- フォーム管理方針
- バリデーション方針（FE側）
- 認証・認可方針（FE側）
- 共通コンポーネント方針

#### バックエンド
- レイヤ構成（Controller / Service / Repository）
- DTO / Entity の方針
- リクエストバリデーション方針
- エラーレスポンス方針
- 認証・認可方針（BE側）
- ログ方針
- DB migration方針
- 例外ハンドリング方針

#### テスト
- E2Eテスト方針
- adapter / selector 構成
- テストデータ方針
- CI/CD方針

### Step 3: 共通コンポーネント候補の整理

現行システムのパターン分析結果から、共通化すべきものを整理する:

```markdown
## 共通コンポーネント候補

### FE共通コンポーネント
| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |

### FE共通処理
| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |

### BE共通処理
| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |
```

### Step 4: spec/architecture.md の作成

```markdown
# 移行後アーキテクチャ設計

## 概要
- 移行元: ...
- 移行先: ...

## FE構成
### ディレクトリ構成
### ルーティング方針
### 状態管理方針
### API client方針
### フォーム管理方針
### バリデーション方針
### 認証・認可方針（FE側）
### 共通コンポーネント方針
### エラーハンドリング方針

## BE構成
### レイヤ構成
### DTO / Entity方針
### Repository方針
### Service方針
### Controller方針
### バリデーション方針
### エラーレスポンス方針
### 認証・認可方針（BE側）
### ログ方針

## DB
### migration方針
### スキーマ設計方針

## テスト
### E2Eテスト構成
### adapter / selector構成
### テストデータ方針

## 共通コンポーネント候補
### FE共通コンポーネント
### FE共通処理
### BE共通処理

## コード品質ツール
### BE: Spotless (Palantir Java Format)
- Plugin: spotless-maven-plugin 2.43.0 / Palantir 2.50.0
- Check: `mvn spotless:check`
- Apply: `mvn spotless:apply`
- 方針: 4-space indent、import自動整理、未使用import削除

### FE: ESLint + Prettier
- ESLint: 8.57.1 + @angular-eslint 18.4.3
- Prettier: 3.3.3
- Check: `npx ng lint` / `npx prettier --check "src/**/*.{ts,html,css}"`
- Fix: `npx ng lint --fix` / `npx prettier --write "src/**/*.{ts,html,css}"`
- 方針: singleQuote, trailingComma: all, printWidth: 100, 2-space indent

## 設計判断ログ
| 判断項目 | 選択肢 | 採用 | 理由 |
```

### Step 5: 終了処理

1. spec/traceability/index.md を更新する。
2. spec/worklog/cross-cutting.md を更新する（実施内容・更新ファイル・設計判断・残作業・次skill）。
3. spec/worklog/index.md のサマリーテーブル行を更新する。
4. 成果サマリーを出力する。
5. 次skill（`08-test-data-design`）を報告する。

---

## 完了条件

- [ ] 共通コンポーネント候補が整理されている
- [ ] 共通処理候補が整理されている
- [ ] FE構成の設計方針が記録されている
- [ ] BE構成の設計方針が記録されている
- [ ] DB migration方針が記録されている
- [ ] テスト方針が記録されている
- [ ] 認証・認可方針が記録されている
- [ ] エラーハンドリング方針が記録されている
- [ ] 設計判断とその理由が記録されている
- [ ] コード品質ツールの方針が spec/architecture.md に記載されている
- [ ] spec/architecture.md が作成されている
- [ ] spec/traceability/index.md が更新されている
- [ ] spec/worklog/cross-cutting.md が更新されている
- [ ] spec/worklog/index.md のサマリーテーブル行が更新されている

---

## 制約

- 設計方針が不明な場合は未確認事項として記録する。
- 移行後アーキテクチャの選定理由を記録する。
- 現行システムの制約に引きずられすぎない。
- 他phaseの成果物変更・対象外の作業は行わない。
