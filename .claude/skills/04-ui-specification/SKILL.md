---
name: 04-ui-specification
description: "Phase 3/5 - 機能IDごとにUI仕様を詳細に記載する"
disable-model-invocation: true
---

# 04-ui-specification: UI仕様記載

## 目的

機能IDごとにUI仕様を詳細に記載する。画面操作・スクリーンショット・ソースコードを根拠として、表示項目・入力項目・操作・正常系・異常系・権限制御・状態変化を記録する。

## 担当Phase

Phase 3: 画面操作によるUI仕様記載
Phase 5: ソースコードによるUI仕様補完

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/source-inventory.md
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）
- 対象ソースコード（CLAUDE.md に記載のソースパス）
- 既存画面（Chrome DevTools MCP / Playwright MCP でアクセス）

## 出力ファイル

- spec/ui/F-XX-YY.html（対象中分類）
- spec/features.md（ステータス更新のみ）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）
- screenshots/F-XX/

## 更新してよいファイル

- spec/ui/F-XX-YY.html（自分の担当中分類のみ）
- spec/features.md（対象機能IDのステータス更新のみ）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）
- screenshots/F-XX/（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- spec/source-inventory.md
- spec/api/F-XX-YY.yml
- spec/usecases/F-XX-YY.md
- spec/architecture.md
- tests/e2e/
- 対象外機能IDの仕様
- 他の担当者の中分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: 画面操作による確認（Phase 3）

Chrome DevTools MCP または Playwright MCP を使用する。

1. 対象機能IDの画面にアクセスする。
2. スクリーンショットを撮る（初期状態）。
3. 表示項目を確認・記録する。
4. 入力項目を確認・記録する（型、必須/任意、制約）。
5. 操作を確認・記録する（ボタンクリック、フォーム送信など）。
6. 正常系の操作を試し、結果を記録する。
7. 異常系の操作を試し、結果を記録する（バリデーションエラーなど）。
8. 各状態のスクリーンショットを撮る。

### Step 2: ソースコードによる補完（Phase 5）

1. spec/source-inventory.md から対象機能IDに関連するソースファイルを特定する。
2. 画面からは読み取れない仕様を確認する:
   - バリデーションルールの詳細
   - 権限制御の条件
   - 状態遷移の条件
   - エラーハンドリングの詳細
   - データ取得元
   - 計算ロジック
3. 画面操作で確認した仕様と、ソースコードの仕様が一致するか確認する。
4. 差分がある場合は、両方を記録する。

### Step 3: spec/ui/F-XX-YY.html の作成・更新

対象機能IDについて、固定フォーマットで記載する:

```html
<div class="feature" id="F-XX-YY-ZZZ">
  <h2>F-XX-YY-ZZZ: <機能名></h2>

  <h3>基本情報</h3>
  <ul>
    <li>機能ID: F-XX-YY-ZZZ</li>
    <li>大分類: ...</li>
    <li>中分類: ...</li>
    <li>小分類: ...</li>
    <li>画面名: ...</li>
    <li>URL: ...</li>
    <li>対象ロール: ...</li>
    <li>関連ユースケース: （06-usecase-extractionで記載）</li>
    <li>ステータス: specified</li>
  </ul>

  <h3>画面イメージ</h3>
  <p style="font-size:14px; color:#555;">通常利用時の代表的な画面状態。この画面の全体像を把握したうえで、以降の詳細仕様を参照すること。</p>
  <div class="screenshot-item" style="margin-bottom:16px; border:1px solid #ddd; border-radius:4px; padding:12px;">
    <p style="margin:0 0 8px 0; font-size:12px; color:#888;">screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_initial.png</p>
    <img src="../../screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_initial.png" alt="F-XX-YY-ZZZ <画面名> 通常表示" style="max-width:100%; height:auto; border:1px solid #eee;">
  </div>

  <h3>WHAT</h3>
  <p>この画面、領域、操作が何をするものか。</p>

  <h3>WHY</h3>
  <p>この画面、領域、操作が何のために存在するか。</p>

  <h3>表示項目</h3>
  <table>
    <tr><th>項目名</th><th>表示条件</th><th>値の取得元</th><th>備考</th></tr>
    <tr><td>...</td><td>...</td><td>...</td><td>...</td></tr>
  </table>

  <h3>入力項目</h3>
  <table>
    <tr><th>項目名</th><th>型</th><th>必須/任意</th><th>入力制約</th><th>初期値</th><th>バリデーション</th><th>備考</th></tr>
    <tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
  </table>

  <h3>操作</h3>
  <table>
    <tr><th>操作名</th><th>トリガー</th><th>実行内容</th><th>正常時の結果</th><th>異常時の結果</th><th>状態変化</th></tr>
    <tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
  </table>

  <h3>正常系</h3>
  <p>...</p>

  <h3>異常系</h3>
  <p>...</p>

  <h3>権限制御</h3>
  <p>...</p>

  <h3>状態変化</h3>
  <p>...</p>

  <h3>関連API</h3>
  <table>
    <tr><th>API ID</th><th>method</th><th>path</th><th>request</th><th>response</th><th>error response</th><th>根拠</th></tr>
  </table>

  <h3>関連ソース</h3>
  <table>
    <tr><th>ファイルパス</th><th>関数/クラス/メソッド名</th><th>確認内容</th></tr>
  </table>

  <h3>状態別スクリーンショット</h3>
  <p style="font-size:14px; color:#555;">入力状態・エラー・権限差異など、操作や条件によって変化する画面状態を記録する。</p>
  <div class="screenshot-list">
    <div class="screenshot-item" style="margin-bottom:24px; border:1px solid #ddd; border-radius:4px; padding:12px;">
      <p style="margin:0 0 8px 0; font-size:14px; color:#555;">
        <strong>撮影条件:</strong> ... ／
        <strong>備考:</strong> ...
      </p>
      <p style="margin:0 0 8px 0; font-size:12px; color:#888;">screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_<条件>.png</p>
      <img src="../../screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_<条件>.png" alt="F-XX-YY-ZZZ <画面名> <条件>" style="max-width:100%; height:auto; border:1px solid #eee;">
    </div>
    <!-- 複数のスクリーンショットがある場合は screenshot-item を繰り返す -->
  </div>

  <h3>根拠</h3>
  <ul>
    <li>画面操作: ...</li>
    <li>スクリーンショット: ...</li>
    <li>Network通信: ...</li>
    <li>ソースコード: ...</li>
    <li>DB定義: ...</li>
    <li>設定ファイル: ...</li>
    <li>推測: ...</li>
  </ul>

  <h3>confidence</h3>
  <p>High / Medium / Low</p>

  <h3>未確認事項</h3>
  <ul>
    <li>...</li>
  </ul>
</div>
```

### Step 4: 根拠の明記

すべての仕様項目に根拠を付ける:

- 画面操作で確認 → 「画面操作」
- スクリーンショットで確認 → 「スクリーンショット: <ファイルパス>」
- ソースコードで確認 → 「ソースコード: <ファイルパス>:<行番号>」
- 推測 → 「推測: <理由>, confidence: High/Medium/Low」

画面操作で確認した仕様とソースコードで確認した仕様は必ず区別する。

### Step 5: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `specified` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する。
4. 次skill（`05-api-specification`）を報告する。

---

## 完了条件

- [ ] 対象機能IDのWHAT / WHYが記録されている
- [ ] 表示項目、入力項目、操作が記録されている
- [ ] 正常系、異常系の振る舞いが記録されている
- [ ] 権限制御が記録されている
- [ ] 状態変化が記録されている
- [ ] スクリーンショットが保存されている
- [ ] すべての仕様項目に根拠が付いている
- [ ] 画面操作由来とソースコード由来が区別されている
- [ ] confidenceが記録されている
- [ ] 未確認事項が記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `specified` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## Chrome DevTools MCP / Playwright MCP の使い方

### 画面確認
1. `navigate_page` で対象画面にアクセスする。
2. `take_screenshot` で状態を記録する。
3. `click` でボタン・リンクの動作を確認する。
4. `fill` / `fill_form` で入力項目を確認する。
5. `evaluate_script` でDOM状態を確認する。

### Network確認（API呼び出しの概要把握のみ）
1. `list_network_requests` でAPI呼び出しを概観する。
2. 詳細なAPI仕様作成は 05-api-specification の責務とする。

### スクリーンショット
- `screenshots/F-XX/F-XX-YY-ZZZ_<画面名>_<条件>.png`
- 条件例: `initial`, `filled`, `error`, `submitted`, `empty-list`, `role-admin`, `role-user`

---

## 制約

- API仕様の詳細作成は行わない（05-api-specificationの責務）。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
