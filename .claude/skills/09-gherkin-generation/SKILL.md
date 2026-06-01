---
name: 09-gherkin-generation
description: "Phase 9 - 機能IDごとにGherkinシナリオを作成する"
disable-model-invocation: true
---

# 09-gherkin-generation: Gherkinシナリオ作成

## 目的

機能IDごとにGherkinシナリオを作成する。正常系だけでなく、バリデーション・エラー・権限・状態変化を含む網羅的なシナリオを記述する。Gherkinは現行・移行後で共通利用できる内容にする。

## 担当Phase

Phase 9: Gherkinシナリオ作成

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/ui/F-XX-YY.html（対象中分類）
- spec/usecases/F-XX-YY.md（対象中分類）
- spec/api/F-XX-YY.yml（対象中分類）
- spec/test-data.md
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 出力ファイル

- spec/gherkin/F-XX/F-XX-YY-ZZZ.feature（機能IDごと）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- spec/gherkin/F-XX/（自分の担当大分類のみ）（新規作成・更新）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- spec/features.md
- spec/ui/F-XX-YY.html
- spec/api/F-XX-YY.yml
- spec/usecases/F-XX-YY.md
- spec/source-inventory.md
- spec/architecture.md
- spec/test-data.md
- tests/e2e/
- 他の担当者の中分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: シナリオの洗い出し

対象機能IDについて、以下の観点でシナリオを洗い出す:

#### 正常系
- 基本操作（CRUD）
- 一覧表示
- 詳細表示
- 新規作成
- 編集
- 削除

#### 入力バリデーション
- 必須項目未入力
- 型不正（文字列に数値のみのフィールドなど）
- 文字数制限超過
- 範囲外の値
- フォーマット不正

#### エラー
- API呼び出し失敗
- ネットワークエラー
- サーバーエラー

#### 権限
- 権限ありのロールでの操作
- 権限なしのロールでの操作
- 未認証でのアクセス

#### データ状態
- データ0件の場合
- データ1件の場合
- 大量データの場合
- 検索結果0件の場合

#### ページング・ソート
- ページング操作
- ソート操作
- 検索条件の組み合わせ

#### 状態変化
- 操作前後のデータ状態変化
- 画面状態変化

### Step 2: Gherkin記述

各シナリオをGherkin形式で記述する:

```gherkin
# language: ja

@F-XX-YY-ZZZ
Feature: <機能名>
  <WHAT: この機能が何をするものか>

  Background:
    Given テスト用ユーザー "<ロール>" でログインしている
    And テストデータが初期化されている

  # --- 正常系 ---

  @正常系
  Scenario: <正常系シナリオ名>
    Given <事前条件>
    When <操作>
    Then <期待結果>

  # --- 入力バリデーション ---

  @バリデーション
  Scenario Outline: <バリデーションシナリオ名>
    Given <事前条件>
    When "<フィールド>" に "<値>" を入力する
    And 送信ボタンをクリックする
    Then "<エラーメッセージ>" が表示される

    Examples:
      | フィールド | 値 | エラーメッセージ |
      | ... | ... | ... |

  # --- 権限 ---

  @権限
  Scenario: 権限なしユーザーは操作できない
    Given テスト用ユーザー "一般ユーザー" でログインしている
    When <操作>
    Then <権限エラーの結果>

  # --- エラー ---

  @エラー
  Scenario: <エラーシナリオ名>
    Given <事前条件>
    When <操作>
    Then <エラー時の結果>

  # --- データ状態 ---

  @データ状態
  Scenario: データが0件の場合
    Given データが存在しない
    When <画面にアクセス>
    Then <0件時の表示>
```

### Step 3: Gherkinの品質チェック

以下を確認する:
- [ ] 仕様にない期待結果を追加していないか
- [ ] 画面実装に依存する記述（CSSクラス名、ID等）がないか
- [ ] 現行・移行後で共通利用できる抽象度か
- [ ] テストデータの前提が spec/test-data.md と整合しているか
- [ ] 不明な期待結果が未確認事項になっているか

### Step 4: ファイル保存

`spec/gherkin/F-XX/F-XX-YY-ZZZ.feature` として保存する。

機能IDが複数のfeatureファイルに分かれる場合:
- `spec/gherkin/F-XX/F-XX-YY-ZZZ_list.feature`
- `spec/gherkin/F-XX/F-XX-YY-ZZZ_create.feature`
- `spec/gherkin/F-XX/F-XX-YY-ZZZ_edit.feature`

### Step 5: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `gherkin-created` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する（シナリオ数・カバー観点）。
4. 次skill（`10-current-e2e-generation`）を報告する。

---

## Gherkin記述のルール

### 現行・移行後共通化のためのルール

1. **画面要素の参照は抽象的に記述する**
   - NG: `#login-button` をクリックする
   - OK: ログインボタンをクリックする

2. **URLは記述しない**（adapter / step定義で吸収する）
   - NG: `/login` にアクセスする
   - OK: ログイン画面にアクセスする

3. **操作結果は業務的に記述する**
   - NG: `div.success-message` が表示される
   - OK: 成功メッセージが表示される

4. **テストデータは spec/test-data.md に定義されたものを使う**

### 網羅性のルール

1. 正常系は最低1シナリオ。
2. 入力バリデーションは Scenario Outline で主要パターンをカバーする。
3. 権限制御がある機能は、権限あり/なしの両方を含める。
4. データ状態（0件、1件、複数件）をカバーする。
5. 不明な期待結果は記載しない。未確認事項にする。

---

## 完了条件

- [ ] 対象機能IDに対応するGherkinファイルが作成されている
- [ ] 正常系シナリオが含まれている
- [ ] 入力バリデーションシナリオが含まれている
- [ ] 権限制御シナリオが含まれている（権限制御がある場合）
- [ ] データ状態バリエーションが含まれている
- [ ] 仕様にない期待結果が含まれていない
- [ ] 現行・移行後で共通利用できる抽象度になっている
- [ ] 未確認事項が記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `gherkin-created` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## 制約

- 仕様にない期待結果を勝手に追加しない。
- Gherkinは現行・移行後で共通利用できる内容にする（画面実装依存を避ける）。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
