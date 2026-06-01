---
name: 13-regression-comparison
description: "Phase 14 - 現行と移行後のE2E結果を比較し差分を分類する"
disable-model-invocation: true
---

# 13-regression-comparison: リグレッション比較

## 目的

現行環境と移行後環境のE2E結果を比較し、差分を発見・分類・記録する。差分の解消判断は行うが、勝手に仕様変更として扱わない。

## 担当Phase

Phase 14: リグレッション比較

---

## 入力ファイル

- CLAUDE.md
- spec/ui/F-XX-YY.html（対象中分類）
- spec/api/F-XX-YY.yml（対象中分類）
- spec/usecases/F-XX-YY.md（対象中分類）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）
- tests/e2e/（テスト一式）
- E2Eテスト実行結果（現行環境・移行後環境）

## 出力ファイル

- spec/regression-report/F-XX-YY.md（対象中分類）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- spec/regression-report/F-XX-YY.md（自分の担当中分類のみ）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- 移行後ソースコード（修正は11-migrated-implementationの責務）
- spec/features.md
- spec/ui/F-XX-YY.html
- spec/api/F-XX-YY.yml
- spec/usecases/F-XX-YY.md
- spec/source-inventory.md
- spec/architecture.md
- spec/gherkin/F-XX/
- tests/e2e/
- 他の担当者の大分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: 現行環境でのE2E実行

1. 現行環境を起動する。
2. current adapter を使用してE2Eテストを実行する。
3. 結果を記録する。

### Step 2: 移行後環境でのE2E実行

1. 移行後環境を起動する。
2. migrated adapter を使用してE2Eテストを実行する。
3. 結果を記録する。

### Step 3: 結果比較

以下の観点で比較する:

#### 画面表示
- 表示項目の有無
- 表示内容の一致
- レイアウトの差異（重大なもののみ）

#### 入力項目
- 入力項目の有無
- バリデーションの動作
- 初期値の一致

#### 操作
- ボタン・リンクの動作
- フォーム送信の結果
- 状態変化の一致

#### API呼び出し
- リクエスト内容の一致
- レスポンス内容の一致
- ステータスコードの一致

#### エラー表示
- エラーメッセージの一致
- エラー表示位置
- エラー表示タイミング

#### 権限制御
- ロール別の表示/非表示の一致
- ロール別の操作可否の一致

### Step 4: 差分の分類

発見した差分を以下に分類する:

| 分類 | 説明 | アクション |
|---|---|---|
| **意図的変更** | 設計判断として意図的に変更したもの | 理由を記録し、受容 |
| **移植漏れの可能性** | 現行仕様を見落とした可能性 | 11-migrated-implementation に戻して修正 |
| **未確認** | まだ確認できていない | 追加確認が必要 |
| **仕様不明** | 現行仕様自体が不明 | 04-ui-specification または 05-api-specification に戻す |
| **テスト不備** | テストが不十分で判断できない | 09-gherkin-generation または 10-current-e2e-generation に戻す |
| **現行仕様のバグの可能性** | 現行実装にバグがある可能性 | 断定せず、可能性として記録 |

### Step 5: spec/regression-report/F-XX-YY.md の作成・更新

差分の有無に応じて、以下のテンプレートを使い分ける。差分ゼロの場合はTemplate A、差分ありの場合はTemplate Bを使用する。

#### Template A: 差分ゼロの場合

```markdown
# リグレッション比較レポート: F-XX-YY-ZZZ

## サマリー
- 対象シナリオ数: X
- 現行: X pass / 0 fail
- 移行後: X pass / 0 fail
- 差分: なし

## 結論
全シナリオで差分なし。移行後実装は現行仕様を正しく再現している。
```

#### Template B: 差分ありの場合

差分があるシナリオのみを差分一覧に記載する。差分なしのシナリオは省略する。

```markdown
# リグレッション比較レポート: F-XX-YY-ZZZ

## サマリー
- 対象シナリオ数: X
- 現行: X pass / Y fail
- 移行後: X pass / Z fail
- 差分: N件

## 差分一覧

| # | シナリオ | 差分内容 | 現行の挙動 | 移行後の挙動 | 分類 | 対応方針 | 対応先skill |
|---|---|---|---|---|---|---|---|
| 1 | ... | ... | ... | ... | 移植漏れの可能性 | 修正 | 11-migrated-implementation |
| 2 | ... | ... | ... | ... | 意図的変更 | 受容 | - |

## 意図的変更の理由

| # | 変更内容 | 理由 |
|---|---|---|
| 2 | ... | ... |

## 未確認事項

- ...

## 結論
- 差分総数: N件
- 意図的変更: X件
- 移植漏れの可能性: X件
- 仕様不明: X件
- テスト不備: X件
- 現行バグの可能性: X件
- 未確認: X件
```

### Step 6: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを更新する（差分なし/意図的変更のみ: `done`、差分あり: `regression-checked`）。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・差分サマリー・残作業・次skill）。
3. 成果サマリーを出力する（差分分類別件数）。
4. 次skillを判定して報告する:
   - 差分あり（移植漏れ）→ `11-migrated-implementation`
   - 差分あり（仕様不明）→ `04-ui-specification` or `05-api-specification`
   - 差分なし → 中分類内の次の機能ID or 次の中分類

---

## 完了条件

- [ ] 現行環境と移行後環境でE2Eテストが実行されている
- [ ] 差分が記録されている
- [ ] すべての差分に分類が付いている
- [ ] 意図的変更には理由が記録されている
- [ ] 移植漏れの可能性がある場合は対応先skillが記録されている
- [ ] 未確認事項が更新されている
- [ ] spec/regression-report/F-XX-YY.md が作成または更新されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `regression-checked` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## ステータス遷移の判断基準

| 条件 | 次ステータス | 次skill |
|---|---|---|
| 差分なし | `done` | 中分類内に残りあり→04（次の機能ID） / 中分類完了→04（次の中分類） / 大分類完了→完了 |
| 意図的変更のみ | `done` | 同上 |
| 移植漏れあり | `regression-checked`（差分あり） | 11（同じ機能ID） |
| 仕様不明あり | `regression-checked`（差分あり） | 04 or 05（同じ機能ID） |
| テスト不備あり | `regression-checked`（差分あり） | 09 or 10（同じ機能ID） |

---

## 制約

- 差分を見つけても、勝手に仕様変更として扱わない。
- 現行仕様のバグの可能性がある場合も、断定せず分類として記録する。
- 差分解消の実装はこのskillでは行わない。11-migrated-implementation に戻す。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
