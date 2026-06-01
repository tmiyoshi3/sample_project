---
name: 12-visual-comparison
description: "Phase 13 - 移行後画面の視覚デザインを現行画面と照合し差異を修正する"
disable-model-invocation: true
---

# 12-visual-comparison: 視覚照合

## 目的

移行後画面のスクリーンショットを現行画面のスクリーンショットと比較し、視覚的な差異（レイアウト・配色・間隔・コンポーネント構成）を発見・修正する。修正後にE2Eテストを再実行し、機能的な正しさを維持していることを確認する。

## 担当Phase

Phase 13: 視覚照合

---

## 入力ファイル

- CLAUDE.md
- spec/architecture.md（共通コンポーネント一覧・デザイン方針）
- spec/ui/F-XX-YY.html（対象中分類）
- screenshots/F-XX/（現行画面のスクリーンショット）
- 移行後ソースコード（FE — テンプレート・スタイル）
- 現行FEソースコード（テンプレート・スタイル — 視覚デザインの参照用、読み取り専用）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 出力ファイル

- 移行後ソースコード（FE — テンプレート・スタイルの修正）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- 移行後ソースコード（FE — テンプレート・スタイルの修正）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 現行ソースコード（読み取り専用）
- spec/ui/F-XX-YY.html（仕様変更はしない）
- spec/api/F-XX-YY.yml（仕様変更はしない）
- spec/architecture.md（設計変更は07-architecture-designの責務）
- spec/gherkin/F-XX/（Gherkin変更は09-gherkin-generationの責務）
- tests/e2e/（adapter・Gherkin・アサーション）
- screenshots/F-XX/（現行スクリーンショットは変更しない）
- 他の担当者の大分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: 移行後画面のスクリーンショット撮影

Chrome DevTools MCP で移行後画面にアクセスし、screenshots/F-XX/ の現行スクリーンショットに対応する状態（initial, fullpage, 各操作状態等）のスクリーンショットを撮影する。

### Step 2: 視覚比較

現行スクリーンショットと移行後スクリーンショットを比較し、以下の観点で差異を洗い出す:

- レイアウト構造（要素の配置、並び順）
- 共通コンポーネントの使用（プレーンHTMLで独自実装していないか）
- 配色（ボタン色、背景色、テキスト色）
- 間隔・余白（padding, margin, gap）
- 角丸・影（border-radius, box-shadow）
- フォントサイズ・太さ

### Step 3: スタイル修正

差異がある場合、以下の順で修正する:

1. 共通コンポーネントのスタイル修正（現行ソースの該当コンポーネントのテンプレート・スタイルを読み、視覚デザインを合わせる）
2. 画面固有のスタイル修正（レイアウト構造、余白、画面固有のCSS）
3. 意図的な改善（技術的負債の解消等）による差異は修正せず、差異として記録する

### Step 3a: スタイル修正後のフォーマット

スタイル修正後、変更したファイルに対して Prettier と ESLint でフォーマット・lint修正を適用する:

```bash
cd migrated/migrated-frontend && npx prettier --write "src/**/*.{ts,html,css}" && npx ng lint --fix
```

lint:fix で自動修正できないエラーがある場合は手動で修正する。

### Step 4: E2Eテスト再実行

スタイル修正で機能が壊れていないことを確認するため、E2Eテストを再実行する。失敗した場合は修正する。

### Step 5: 結果の記録

worklog に以下を記録:

- 発見した視覚差異の一覧
- 修正内容
- 意図的な差異（修正しなかったもの）とその理由
- E2Eテスト結果（全pass確認）

### Step 6: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `visual-checked` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・視覚差異・E2E結果・残作業・次skill）。
3. 成果サマリーを出力する。
4. 次skill（`13-regression-comparison`）を報告する。

---

## 完了条件

- [ ] 移行後画面のスクリーンショットが現行画面と視覚的に一致している（意図的な改善を除く）
- [ ] 共通コンポーネントを使用して実装されている（プレーンHTMLで独自実装していない）
- [ ] 修正したファイルが Prettier + ESLint check を pass している
- [ ] E2Eテストが全passしている
- [ ] 視覚差異と修正内容がworklogに記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `visual-checked` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## 制約

- 機能の変更は行わない（スタイルの修正のみ）。
- E2Eテストのアサーション変更は行わない。
- 現行ソースコードは読み取り専用とし、変更しない。
- 現行スクリーンショットは変更しない。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
