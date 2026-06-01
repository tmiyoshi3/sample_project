---
name: 10-current-e2e-generation
description: "Phase 10 - 現行画面に対してpassするE2Eテストを作成する"
disable-model-invocation: true
---

# 10-current-e2e-generation: 現行E2Eテスト作成

## 目的

Gherkinシナリオから、現行画面に対してpassするPlaywright E2Eテストを作成する。現行仕様を実行可能なテストとして固定する。画面要素の取得処理を adapter / selector に分離し、移行後画面用のadapterを後で追加できる構造にする。

## 担当Phase

Phase 10: 現行E2Eテスト作成

---

## 入力ファイル

- CLAUDE.md
- spec/gherkin/F-XX/F-XX-YY-ZZZ.feature（対象大分類）
- spec/ui/F-XX-YY.html（対象中分類）
- spec/api/F-XX-YY.yml（対象中分類）
- spec/test-data.md
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）
- 既存画面（Chrome DevTools MCP / Playwright MCP でアクセス）

## 出力ファイル

- tests/e2e/features/F-XX/F-XX-YY-ZZZ.feature（Gherkinのコピー or リンク）
- tests/e2e/steps/（Step定義）
- tests/e2e/adapters/current/F-XX/F-XX-YY-ZZZ.adapter.ts
- tests/e2e/assertions/F-XX/F-XX-YY-ZZZ.assertions.ts
- tests/e2e/fixtures/（テストデータ・ユーザー定義）
- tests/e2e/playwright.config.ts
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- tests/e2e/（新規作成・更新）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- spec/features.md
- spec/ui/F-XX-YY.html（仕様変更はしない。差分発見時は未確認事項として記録）
- spec/api/F-XX-YY.yml
- spec/usecases/F-XX-YY.md
- spec/source-inventory.md
- spec/architecture.md
- spec/gherkin/F-XX/（Gherkinの変更は09-gherkin-generationの責務）
- 他の担当者の中分類のファイル

---

## 推奨ディレクトリ構成

```
tests/e2e/
  features/
    F-XX/
      F-XX-YY-ZZZ.feature    # Gherkinシナリオ
  steps/
    common.steps.ts           # 共通Step定義（ログイン、ナビゲーションなど）
    F-XX-YY-ZZZ.steps.ts      # 機能固有Step定義
  adapters/
    types.ts                  # adapter のインターフェース定義
    current/
      F-XX/
        F-XX-YY-ZZZ.adapter.ts  # 現行画面用 adapter
    migrated/
      F-XX/
        F-XX-YY-ZZZ.adapter.ts  # 移行後画面用 adapter（後で作成）
  assertions/
    F-XX/
      F-XX-YY-ZZZ.assertions.ts  # 共通アサーション
  fixtures/
    users.ts                  # テストユーザー定義
    test-data.ts              # テストデータ定義
  helpers/
    setup.ts                  # データ初期化ヘルパー
    teardown.ts               # データクリーンアップヘルパー
  playwright.config.ts        # Playwright設定
```

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: テスト基盤の構築（初回のみ）

初回実行時のみ、以下を作成する:

1. `tests/e2e/playwright.config.ts` — Playwright設定
2. `tests/e2e/fixtures/users.ts` — テストユーザー定義（spec/test-data.md に基づく）
3. `tests/e2e/helpers/setup.ts` — データ初期化ヘルパー
4. `tests/e2e/adapters/types.ts` — adapter のインターフェース定義

### Step 2: adapter の設計

adapter は画面要素の取得処理を抽象化する。

```typescript
// adapters/types.ts
export interface LoginPageAdapter {
  navigateToLogin(): Promise<void>;
  fillUsername(username: string): Promise<void>;
  fillPassword(password: string): Promise<void>;
  clickLoginButton(): Promise<void>;
  getErrorMessage(): Promise<string>;
  isLoggedIn(): Promise<boolean>;
}
```

```typescript
// adapters/current/F-XX/F-XX-YY-ZZZ.adapter.ts
import { Page } from '@playwright/test';
import { LoginPageAdapter } from '../../types';

export class CurrentLoginPageAdapter implements LoginPageAdapter {
  constructor(private page: Page) {}

  async navigateToLogin(): Promise<void> {
    await this.page.goto('/login');
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.fill('#username', username);
  }
  // ...
}
```

### Step 3: アサーションの作成

アサーションは adapter に依存しない形で記述する:

```typescript
// assertions/F-XX/F-XX-YY-ZZZ.assertions.ts
import { expect } from '@playwright/test';
import { LoginPageAdapter } from '../../adapters/types';

export async function assertLoginSuccess(adapter: LoginPageAdapter): Promise<void> {
  expect(await adapter.isLoggedIn()).toBe(true);
}
```

### Step 4: Step定義の作成

Gherkin の各Step を実装する:

```typescript
// steps/F-XX-YY-ZZZ.steps.ts
import { Given, When, Then } from '...';
import { CurrentLoginPageAdapter } from '../adapters/current/F-XX/F-XX-YY-ZZZ.adapter';

Given('ログイン画面にアクセスする', async function () {
  const adapter = new CurrentLoginPageAdapter(this.page);
  await adapter.navigateToLogin();
});
```

### Step 5: テスト実行と修正

1. テストを実行する。
2. 失敗した場合:
   - **仕様の問題**: spec/ui/F-XX-YY.html との差分を未確認事項として記録する。仕様を勝手に変えない。
   - **adapter の問題**: selector / locator を修正する。
   - **テストデータの問題**: spec/test-data.md との整合を確認する。
3. すべてのシナリオがpassするまで修正を繰り返す。

### Step 6: テスト結果の記録

```markdown
## テスト結果サマリー

- 対象シナリオ数: 4
- PASS: 3 / FAIL: 1 / SKIP: 0
- FAIL シナリオ: 権限なしアクセス（仕様と現行画面に差分あり。未確認事項として記録）

※シナリオ別の詳細は regression-report/F-XX-YY.md に記載される（13-regression-comparison 実施時）
```

### Step 7: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `current-e2e-passed` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・テスト結果・残作業・次skill）。
3. 成果サマリーを出力する（pass/fail数）。
4. 次skill（`11-migrated-implementation`）を報告する。

---

## 完了条件

- [ ] 対象機能IDのE2Eテストが作成されている
- [ ] 現行環境に対してすべてのシナリオがpassしている
- [ ] シナリオとアサーションが画面実装から分離されている
- [ ] adapter / selector により、現行画面と移行後画面の差分を吸収できる構造になっている
- [ ] adapter のインターフェースが定義されている
- [ ] 仕様と現行画面の差分が見つかった場合は、未確認事項として記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `current-e2e-passed` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## Playwright実行方法

```bash
npx playwright test tests/e2e/features/F-XX/F-XX-YY-ZZZ.feature
```

### デバッグ時
```bash
npx playwright test tests/e2e/features/F-XX/F-XX-YY-ZZZ.feature --headed --debug
```

---

## 制約

- 現行画面に対してpassすることを優先する。
- テスト失敗時に仕様を勝手に変えない。
- 仕様と現行画面が異なる場合は差分として記録する。
- Gherkinの変更が必要な場合は、09-gherkin-generation に戻す。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
