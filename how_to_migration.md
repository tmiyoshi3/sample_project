# マイグレーションskill群の使い方

## 概要

このskill群は、既存システムを機能ID単位で分解し、仕様化・API仕様化・ユースケース化・テスト化・実装・検証を段階的に進めるためのものです。

AIが大きな単位で雑にマイグレーションすることを防ぎ、再現性の高いマイグレーション作業を実現します。

---

## skill一覧

| Skill | Phase | 責務 |
|---|---|---|
| code-migration | 共通 | 次ステップを自動判定して実行（推奨） |
| 01-project-initialization | Phase 0 | プロジェクト初期化・CLAUDE.md作成 |
| 02-feature-inventory | Phase 1 | 画面探索・機能ID採番 |
| 03-source-structure-discovery | Phase 2 | ソースコード構造解析 |
| 04-ui-specification | Phase 3/5 | UI仕様記載 |
| 05-api-specification | Phase 4 | API仕様作成（OpenAPI形式） |
| 06-usecase-extraction | Phase 6 | ユースケース抽出 |
| 07-architecture-design | Phase 7/11 | 移行後アーキテクチャ設計 |
| 08-test-data-design | Phase 8 | テストデータ設計 |
| 09-gherkin-generation | Phase 9 | Gherkinシナリオ作成 |
| 10-current-e2e-generation | Phase 10 | 現行E2Eテスト作成 |
| 11-migrated-implementation | Phase 12 | 移行後実装 |
| 12-visual-comparison | Phase 13 | 視覚照合 |
| 13-regression-comparison | Phase 14 | リグレッション比較 |

## skillの呼び出し方

### 推奨: `/code-migration` で自動進行

通常は `/code-migration` を実行するだけで、worklog から次に実行すべきスキルと対象機能IDを自動判定して実行します。

```
/code-migration
```

中分類を指定して実行することもできます（並列作業時に担当を明示する場合）:

```
/code-migration F-03-02
```

### 個別スキルの直接指定

やり直しや特定の作業を行いたい場合は、個別にスキルを指定できます:

```
/04-ui-specification F-01-01-001 のUI仕様を記載してください
```

機能IDを指定するskillでは、コマンドに続けて対象機能IDを伝えてください。

---

## 前提条件

- Claude Code がインストールされていること
- Chrome DevTools MCP または Playwright MCP が利用可能であること
- 既存システムが起動できる環境があること
- 既存システムのソースコードにアクセスできること

---

## はじめかた

### Step 1: プロジェクト初期化

最初に `/01-project-initialization` を実行します。

```
/01-project-initialization
```

AIから以下の情報を聞かれるので回答してください:

- 既存システムのソースコードのフォルダパス
- トップページまたはログインページのURL
- ログインユーザー名・パスワード
- 利用可能なロール・ユーザー種別
- 実行環境の起動方法
- DB接続情報
- 外部サービスの有無
- バッチ・ジョブの有無
- 移行後のアーキテクチャ（FE/BE/DB/コンテナ/テスト/API仕様形式）

実行後、以下が作成されます:

- `CLAUDE.md` にプロジェクト情報が記録される
- `.env.local` に認証情報が保存される
- `spec/worklog/index.md` に作業ログが記録される

### Step 2: 機能インベントリ作成

```
/02-feature-inventory
```

AIがブラウザ（Playwright MCP / Chrome DevTools MCP）で既存システムを探索し、画面・コンポーネント・操作を一覧化します。各項目に機能ID（F-01-01-001, F-01-01-002, ...）が採番されます。

機能IDのフォーマットは `F-XX-YY-ZZZ` です:
- `XX` — 大分類（機能グループ）
- `YY` — 中分類（サブカテゴリ）
- `ZZZ` — 小分類（個別機能）

実行後、以下が作成されます:

- `spec/features.md` — 機能インベントリ
- `spec/traceability/F-XX.md` — トレーサビリティマトリクス（大分類ごと）
- `spec/traceability/index.md` — トレーサビリティ全体インデックス
- `screenshots/F-XX/` — スクリーンショット（大分類ごと）

### Step 3: ソース構造解析

```
/03-source-structure-discovery
```

既存ソースコードを読み、ルーティング・コンポーネント・API・Controller・Service・Repository・認証・認可・バッチなどを一覧化します。画面から見えない処理も発見します。

### Step 4以降: 機能IDごとの段階的作業

ここからは中分類（F-XX-YY）単位でスコープし、機能ID単位で作業します。1回の実行で1つの機能IDを対象にしてください。

**推奨:** `/code-migration` を実行すれば、次にやるべきスキルと機能IDを自動判定して実行します。

個別にスキルを指定する場合:

```
/04-ui-specification F-01-01-001 のUI仕様を記載してください
/05-api-specification F-01-01-001 のAPI仕様を作成してください
/06-usecase-extraction F-01-01-001 のユースケースを抽出してください
/07-architecture-design F-01-01-001 の知見を踏まえてアーキテクチャを更新してください
/08-test-data-design F-01-01-001 のテストデータを設計してください
/09-gherkin-generation F-01-01-001 のGherkinシナリオを作成してください
/10-current-e2e-generation F-01-01-001 の現行E2Eテストを作成してください
/11-migrated-implementation F-01-01-001 の移行後実装をしてください
/12-visual-comparison F-01-01-001 の視覚照合をしてください
/13-regression-comparison F-01-01-001 のリグレッション比較をしてください
```

アーキテクチャ設計（`/07-architecture-design`）とテストデータ設計（`/08-test-data-design`）は、機能ごとのループに組み込まれています。初回は骨格を作成し、2回目以降は既存設計をレビューして差分更新します。レビューの結果、変更不要であれば「レビュー済み・変更なし」として記録します。毎回必ず実行してください。

---

## 全体の流れ

`/code-migration` を繰り返し実行するだけで、以下のフローが自動的に進行します。

```
/01-project-initialization          ← 最初に1回
    ↓
/02-feature-inventory               ← 最初に1回
    ↓
/03-source-structure-discovery      ← 最初に1回
    ↓
┌───────────────────────────────────────────────────────────┐
│ 中分類（F-XX-YY）ごとにループ                               │
│                                                           │
│  機能IDごとに 04→13 を通しで回す:                           │
│                                                           │
│  /04-ui-specification        ← 現行仕様の抽出              │
│      ↓                                                    │
│  /05-api-specification                                    │
│      ↓                                                    │
│  /06-usecase-extraction                                   │
│      ↓                                                    │
│  /07-architecture-design     ← 差分更新（初回は骨格作成、   │
│      ↓                         2回目以降はレビュー）        │
│  /08-test-data-design        ← 差分更新（同上）             │
│      ↓                                                    │
│  /09-gherkin-generation      ← テスト・実装                 │
│      ↓                                                    │
│  /10-current-e2e-generation                               │
│      ↓                                                    │
│  /11-migrated-implementation                              │
│      ↓                                                    │
│  /12-visual-comparison       ← 視覚照合                    │
│      ↓                                                    │
│  /13-regression-comparison                                │
│      ↓                                                    │
│  中分類内に未処理の機能IDあり → 次の機能IDの 04 へ           │
│  中分類内の全機能ID done → 次の中分類の最初の機能IDの 04 へ  │
└───────────────────────────────────────────────────────────┘
```

---

## 並列作業

複数人で作業する場合、大分類（F-XX）単位、場合によっては中分類（F-XX-YY）単位で作業を分担できます。各担当者は自分が担当する大分類のファイルのみを編集するため、ファイルの競合が発生しません。

### 並列作業の前提

並列作業を開始する前に、以下の共通基盤skillを完了させてください:

1. `/01-project-initialization` — プロジェクト初期化
2. `/02-feature-inventory` — 機能インベントリ作成
3. `/03-source-structure-discovery` — ソース構造解析

これらは全員が共有する基盤情報であり、並列作業前に1回だけ実行します。

`/07-architecture-design` と `/08-test-data-design` は機能IDごとのループに含まれます。並列作業時は、最初に1つの機能IDでループを通して07/08の骨格を作成してから、他の担当者が並列作業を開始することを推奨します。

### 並列作業の進め方

共通基盤が完了したら、各担当者は自分の大分類について独立して以下のループを実行します:

```
担当者A（F-01）:  04→05→06→07→08→09→10→11→12→13 を F-01 の機能IDに対して繰り返す
担当者B（F-02）:  04→05→06→07→08→09→10→11→12→13 を F-02 の機能IDに対して繰り返す
担当者C（F-03）:  04→05→06→07→08→09→10→11→12→13 を F-03 の機能IDに対して繰り返す
```

07/08は差分更新ですが、毎回必ず実行してください。既存設計をレビューし、変更不要であれば「レビュー済み・変更なし」としてworklogに記録します。07/08で `spec/architecture.md` や `spec/test-data.md` を更新する場合は共有ファイルのため、チームメンバーで合意を取ってください。

### 大分類の担当割り当て

担当の割り当ては `spec/features.md` に記録します。

### 共有ファイルの変更

以下のファイルは全担当者で共有されるため、変更が必要な場合はチームメンバー全員で合意を取ってから変更してください:

- `CLAUDE.md`
- `spec/architecture.md`
- `spec/test-data.md`
- `tests/e2e/steps/` 内の共通ステップ定義
- `tests/e2e/fixtures/` 内の共通フィクスチャ

### ファイルの分類と並列作業時の扱い

| 分類 | ファイル | 並列作業時の扱い |
|---|---|---|
| 共有・変更少 | CLAUDE.md, spec/features.md, spec/architecture.md, spec/test-data.md, spec/source-inventory.md | 初期化時に作成。以降は変更少。変更時は合意が必要 |
| 共有index | spec/traceability/index.md, spec/worklog/index.md | 各担当者が自分の担当分のサマリー行のみ更新 |
| 共有ログ | spec/worklog/cross-cutting.md | 横断的関心事の作業ログ（07/08の初回骨格作成時など） |
| 中分類単位 | spec/traceability/F-XX-YY.md, spec/worklog/F-XX-YY.md, spec/ui/F-XX-YY.html, spec/api/F-XX-YY.yml, spec/usecases/F-XX-YY.md, spec/regression-report/F-XX-YY.md | 担当者が自分の中分類のファイルのみ更新。競合しない |
| 機能ID単位 | spec/gherkin/F-XX/, tests/e2e/, screenshots/F-XX/ | 担当者が自分の大分類配下のみ更新。競合しない |

### ファイル競合が起きない理由

中分類（F-XX-YY）ごとにファイルが分かれているため、各担当者が編集するファイルが重複しません:

- `spec/traceability/F-01-01.md` と `spec/traceability/F-02-01.md` は別ファイル
- `spec/worklog/F-01-01.md` と `spec/worklog/F-02-01.md` は別ファイル
- `spec/ui/F-01-01.html` と `spec/ui/F-02-01.html` は別ファイル
- `spec/gherkin/F-01/` と `spec/gherkin/F-02/` は別ディレクトリ
- `screenshots/F-01/` と `screenshots/F-02/` は別ディレクトリ

---

## 作業の途中再開

会話が長くなったり、別の日に再開する場合は、`/code-migration` を実行してください。worklog から次に実行すべきスキルと対象機能IDを自動判定します。

各skillは会話履歴に依存せず、以下のファイルから現在位置を復元します:

- `CLAUDE.md` — プロジェクトの目的・前提
- `spec/worklog/F-XX-YY.md` — 前回の作業内容・次に実行すべきskill・対象機能ID（中分類ごと）
- `spec/worklog/index.md` — 作業ログ全体インデックス
- `spec/traceability/F-XX-YY.md` — 各機能IDのステータス（中分類ごと）
- `spec/traceability/index.md` — トレーサビリティ全体インデックス

迷ったら `/code-migration` を実行するか、`spec/worklog/F-XX-YY.md`（自分の担当中分類）を見てください。最後のエントリに「次に実行すべきskill」と「対象機能ID」が書いてあります。

---

## 生成される成果物

```
CLAUDE.md                        ← プロジェクト前提・ルール
.env.local                       ← 認証情報（Git管理外）
spec/
  features.md                    ← 機能インベントリ（担当者割り当て含む）
  source-inventory.md            ← ソース構造一覧
  architecture.md                ← 移行後アーキテクチャ設計
  test-data.md                   ← テストデータ設計
  traceability/
    index.md                     ← トレーサビリティ全体インデックス
    F-01-01.md                   ← トレーサビリティマトリクス（中分類 F-01-01）
    F-01-02.md                   ← トレーサビリティマトリクス（中分類 F-01-02）
    F-02-01.md                   ← トレーサビリティマトリクス（中分類 F-02-01）
  worklog/
    index.md                     ← 作業ログ全体インデックス
    cross-cutting.md             ← 横断的関心事の作業ログ
    F-01-01.md                   ← 作業ログ（中分類 F-01-01）
    F-01-02.md                   ← 作業ログ（中分類 F-01-02）
    F-02-01.md                   ← 作業ログ（中分類 F-02-01）
  ui/
    F-01-01.html                 ← UI/機能仕様（中分類 F-01-01）
    F-01-02.html                 ← UI/機能仕様（中分類 F-01-02）
    F-02-01.html                 ← UI/機能仕様（中分類 F-02-01）
  api/
    F-01-01.yml                  ← API仕様（中分類 F-01-01、OpenAPI形式）
    F-01-02.yml                  ← API仕様（中分類 F-01-02、OpenAPI形式）
    F-02-01.yml                  ← API仕様（中分類 F-02-01、OpenAPI形式）
  usecases/
    F-01-01.md                   ← ユースケース一覧（中分類 F-01-01）
    F-01-02.md                   ← ユースケース一覧（中分類 F-01-02）
    F-02-01.md                   ← ユースケース一覧（中分類 F-02-01）
  regression-report/
    F-01-01.md                   ← リグレッション比較レポート（中分類 F-01-01）
    F-01-02.md                   ← リグレッション比較レポート（中分類 F-01-02）
    F-02-01.md                   ← リグレッション比較レポート（中分類 F-02-01）
  gherkin/
    F-01/
      F-01-01-001.feature        ← Gherkinシナリオ（機能ID単位）
      F-01-01-002.feature
    F-02/
      F-02-01-001.feature
screenshots/
  F-01/                          ← スクリーンショット（大分類01）
  F-02/                          ← スクリーンショット（大分類02）
tests/e2e/
  features/
    F-01/
      F-01-01-001.feature
    F-02/
      F-02-01-001.feature
  steps/
    common.steps.ts              ← 共通Step定義
    F-01/
      F-01-01-001.steps.ts
    F-02/
  adapters/
    types.ts                     ← adapterインターフェース（共有）
    current/
      F-01/
        F-01-01-001.adapter.ts
      F-02/
    migrated/
      F-01/
        F-01-01-001.adapter.ts
      F-02/
  assertions/
    F-01/
      F-01-01-001.assertions.ts
    F-02/
  fixtures/
    users.ts                     ← テストユーザー定義（共有）
    test-data.ts                 ← テストデータ定義（共有）
  playwright.config.ts
```

---

## 機能IDのステータス遷移

各機能IDは `spec/traceability/F-XX-YY.md`（対象の中分類ファイル）で以下のステータスを持ちます:

```
discovered          ← 02-feature-inventory で発見
    ↓
specified           ← 04-ui-specification で仕様記載
    ↓
api-confirmed       ← 05-api-specification でAPI確認
    ↓
source-confirmed    ← 03-source-structure-discovery でソース確認
    ↓
usecase-linked      ← 06-usecase-extraction でユースケース紐付け
    ↓
test-data-designed  ← 08-test-data-design でテストデータ設計
    ↓
gherkin-created     ← 09-gherkin-generation でGherkin作成
    ↓
current-e2e-created ← 10-current-e2e-generation でE2Eテスト作成
    ↓
current-e2e-passed  ← 10-current-e2e-generation で現行E2Eテストpass
    ↓
migrated-implemented ← 11-migrated-implementation で移行後実装完了
    ↓
migrated-e2e-passed ← 11-migrated-implementation で移行後E2Eテストpass
    ↓
visual-checked      ← 12-visual-comparison で視覚照合完了
    ↓
regression-checked  ← 13-regression-comparison でリグレッション比較完了
    ↓
done                ← 差分なし or 意図的変更のみ
```

---

## 重要なルール

### やるべきこと

- 1回の作業では1つの機能IDのみを対象にする
- すべての仕様に根拠（画面操作/スクリーンショット/Network/ソースコード/DB/設定/推測）を記録する
- 不明点は「未確認事項」として記録する
- 推測にはconfidence（High/Medium/Low）を付ける
- 各skill終了時に `spec/worklog/F-XX.md` と `spec/traceability/F-XX.md` を更新する

### やってはいけないこと

- 一度に大量の機能を処理する
- 対象外の機能をついでに更新する
- 不明な仕様を推測で確定する
- テストを通すために仕様を勝手に変更する
- 実装を簡単にするために現行仕様を勝手に捨てる
- 既存ソースコードを変更する

---

## リグレッション比較で差分が出たら

差分は以下に分類されます:

| 分類 | 意味 | 対応 |
|---|---|---|
| 意図的変更 | 設計判断で変更した | 理由を記録して受容 |
| 移植漏れの可能性 | 仕様の見落とし | `/11-migrated-implementation` に戻って修正（`/code-migration` が自動判定） |
| 仕様不明 | 現行仕様が不明 | `/04-ui-specification` か `/05-api-specification` に戻って調査 |
| テスト不備 | テストが不十分 | `/09-gherkin-generation` か `/10-current-e2e-generation` に戻って補強 |
| 現行バグの可能性 | 現行にバグがある可能性 | 断定せず記録する |

---

## よくある質問

### Q: どの機能IDから始めればよい？

小さくて独立した機能（例: ログイン、一覧表示）から始めてください。最初の数機能で作業フローに慣れてから、複雑な機能に進むのがおすすめです。

### Q: 途中で仕様の間違いに気づいたら？

該当phaseのskillに戻ってください。例えばUI仕様の間違いなら `/04-ui-specification` に戻り、対象機能IDを指定して修正します。

### Q: 複数の機能IDを同時に進めてよい？

原則として1つずつ進めてください。ただし、密接に関連する小さな機能グループ（例: 一覧表示+検索+ページング）は明示的にグループ化して一緒に進めることもできます。

### Q: 共通ルールを確認したいときは？

`/00-migration-core` を実行すると、全skill共通のルール・前提・フォーマットを確認できます。

### Q: 次に何をすべきかわからないときは？

`/code-migration` を実行してください。worklog から次に実行すべきスキルと対象機能IDを自動判定します。

### Q: 作業の進捗を確認したいときは？

`spec/traceability/F-XX-YY.md` を見てください。各機能IDのステータスが一覧で確認できます。全体の概要は `spec/traceability/index.md` で確認できます。

### Q: 並列作業で作業をどう分担する？

`spec/features.md` で大分類（F-XX）単位に担当者を割り当てます。各担当者は自分の大分類に属する機能IDのみを対象に作業を進めます。`/code-migration F-XX-YY` で担当中分類を指定して実行できます。

### Q: 並列作業を始める前に何をすべき？

共通基盤となるskill（01, 02, 03）を先に完了させてください。その後、最初の1機能でループを一巡させて07/08の骨格を作ってから、他の担当者が並列作業を開始することを推奨します。

### Q: 共有ファイルを変更したい場合は？

`CLAUDE.md`、`spec/architecture.md`、`spec/test-data.md`、共通ステップ定義、共通フィクスチャなどの共有ファイルを変更する場合は、チームメンバー全員で合意を取ってから変更してください。

---

## フォーマットリファレンス

### spec/worklog/index.md（全体サマリー）

```markdown
# 作業ログ サマリー

| 中分類 | 最終更新 | 現在phase | 対象機能ID | 次skill | 担当者 |
|---|---|---|---|---|---|
| F-01-01 | 2026-05-22 14:30 | Phase 3 | F-01-01-001 | 05-api-specification | 担当者A |
| F-01-02 | 2026-05-22 15:00 | Phase 1 | - | 04-ui-specification | 担当者A |
```

index.md にはサマリーテーブルの行の追加・更新のみを行う。詳細ログは以下に記載する:
- 機能ID単位の作業: `spec/worklog/F-XX-YY.md`
- 横断的関心事（07/08 の初回骨格作成など）: `spec/worklog/cross-cutting.md`

### spec/worklog/F-XX-YY.md（中分類単位の作業ログ）

```markdown
# 作業ログ: F-XX-YY <中分類名>

## 2026-05-22 14:30

### 対象skill
04-ui-specification

### 対象フェーズ
Phase 3: UI仕様記載

### 対象中分類
F-01-01（ログイン画面）

### 対象機能ID
F-01-01-001

### 実施内容
- ...

### 更新ファイル
BE: 0件 / FE: 0件 / E2E: 0件 / spec: 2件 / screenshots: 1件

特記ファイル:
- spec/ui/F-01-01.html（新規作成）

### 判断理由
- ...

### 根拠
- 画面操作: ログイン画面にアクセスし、フォーム要素を確認
- スクリーンショット: screenshots/F-01/F-01-01-001_login_initial.png

### confidence
High

### 未確認事項
- ...

### 次に実行すべきskill
- next skill: 05-api-specification
- current 中分類: F-01-01（ログイン画面）
- next target feature ID: F-01-01-001
- 中分類進捗: 0/5 機能ID done（この機能IDは specified）
- reason: UI仕様記載完了、次は関連APIの仕様確認
```

### spec/traceability/index.md（全体サマリー）

```markdown
# トレーサビリティ サマリー

| 大分類 | 大分類名 | 担当者 | discovered | specified | api-confirmed | gherkin-created | current-e2e-passed | migrated-e2e-passed | done | 合計 |
|---|---|---|---|---|---|---|---|---|---|---|
| F-01 | 認証 | 担当者A | 2 | 3 | 1 | 0 | 0 | 0 | 0 | 6 |
```

### spec/traceability/F-XX-YY.md（中分類単位の詳細）

```markdown
# トレーサビリティ: F-XX-YY <中分類名>

| 機能ID | 小分類 | 画面 | 操作 | API | ユースケース | 現行ソース | 現行E2E | 移行後ソース | 移行後E2E | ステータス | 未確認事項 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F-01-01-001 | ユーザー名入力 | /login | 入力 | - | UC-001 | src/... | tests/... | app/... | tests/... | specified | - |
```

---

## Skills更新時の出力物マイグレーション

skill群（`.claude/skills/`）のテンプレートやルールを変更した場合、既にマイグレーション作業が進行中のブランチでは旧フォーマットの出力物が残る。skills更新のたびに、既存出力物への影響を確認し、必要に応じて過去の出力物を新フォーマットに合わせて更新する。

### フロー

```
1. Skills更新（mainブランチ）
   ↓
2. 影響分析: 既存出力物に影響するか判断
   ↓
3. 影響ありの場合: 出力物マイグレーション指示書を作成
   ↓
4. 作業ブランチにmainをマージしてskillsを更新
   ↓
5. 指示書に従い既存出力物を修正
   ↓
6. 修正結果の報告・確認
```

### Step 1: Skills更新

mainブランチでskillファイルを修正し、コミットする。

変更内容を明確にするため、コミットメッセージに以下を含める:
- 何を変更したか（テンプレート、ルール、手順など）
- なぜ変更したか（肥大化、重複、不整合など）

### Step 2: 影響分析

以下の観点で、既存出力物への影響を判断する。

| 変更内容 | 影響あり | 影響なし |
|---|---|---|
| テンプレートのフォーマット変更 | 既存ファイルが旧フォーマットで残る | - |
| 新しいファイルの追加 | 既存の情報を移動する必要がある | 新規作成のみで既存に影響しない |
| ルール・制約の追加 | 既存ファイルがルールに違反している | 既存ファイルは既に準拠している |
| 手順の順序変更・説明文修正 | - | 出力物のフォーマットに影響しない |

影響の大きさ:

| レベル | 説明 | 対応 |
|---|---|---|
| 大 | 全ワークログ・レポートに影響 | 指示書を作成し全ファイルを修正 |
| 中 | 特定phaseの出力物のみ影響 | 指示書を作成し該当ファイルのみ修正 |
| 小 | 今後の出力のみ影響、既存は許容可能 | 指示書不要。以降のskill実行で自然に切り替わる |

**影響なし or 小の場合はStep 3〜6をスキップしてよい。**

### Step 3: 出力物マイグレーション指示書の作成

`skills-output-migration/` 配下にステップファイルを作成する。

#### ファイル構成

```
skills-output-migration/
  001-xxx.md             ← ステップ1の修正指示（frontmatter に status フィールド）
  002-xxx.md             ← ステップ2の修正指示（frontmatter に status フィールド）
  ...
```

- 番号はグローバル通番（skills更新をまたいで連番で増えていく）
- 1つの修正項目につき1ファイル（複数の修正がある場合は複数ファイル）
- ステータスは各ファイルの frontmatter で管理する（`status: pending / done / skipped`）

#### ステップファイルの構造

各ファイルは frontmatter と本文で構成する:

```yaml
---
status: pending    # pending / done / skipped
completed:         # 完了日（YYYY-MM-DD）
note:              # 備考
---
```

本文は以下の4点を必ず含め、自己完結型にする:

1. **背景** — なぜこの変更が必要か（具体的な構造的問題を説明する）
2. **修正方針** — どういう方向に直すか（1〜2行の要約）
3. **修正手順** — 修正前/修正後の具体例を含む。抽象的な説明だけだと解釈がブレる
4. **完了報告テンプレート** — 修正したファイル一覧、未修正ファイル、確認チェックリスト

### Step 4: 作業ブランチへのskills取り込み

```bash
git checkout <作業ブランチ>
git merge main
```

これにより、以降のskill実行は新フォーマットで出力されるようになる。

### Step 5: 既存出力物の修正

作業ブランチで `/skills-output-migration` スキルを実行する:

```
/skills-output-migration
```

1回の実行で1ステップが処理される。未適用ステップがなくなるまで繰り返し実行する。`/code-migration` を使用すると、出力物マイグレーションが自動的に優先実行される。

各ステップの実行後、修正結果の報告（修正ファイル一覧、未修正ファイル、確認チェックリスト）が出力される。漏れや不備があれば指摘して再修正を依頼する。

ステータスは各ステップファイルの frontmatter で追跡される。手動でスキップしたい場合は frontmatter の `status` を `skipped` に変更し、`note` に理由を記入する。
