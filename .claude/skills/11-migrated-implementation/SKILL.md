---
name: 11-migrated-implementation
description: "Phase 12 - 機能ID単位で移行後の実装を行う"
disable-model-invocation: true
---

# 11-migrated-implementation: 移行後実装

## 目的

機能ID単位で移行後の実装を行う。仕様・API・ユースケース・Gherkin・現行E2Eを確認してから実装し、現行と同じE2Eシナリオ・同じアサーションを移行後環境でpassさせる。

## 担当Phase

Phase 12: 移行後実装

---

## 入力ファイル

- CLAUDE.md
- spec/architecture.md
- spec/features.md
- spec/ui/F-XX-YY.html（対象中分類）
- spec/api/F-XX-YY.yml（対象中分類）
- spec/usecases/F-XX-YY.md（対象中分類）
- spec/gherkin/F-XX/F-XX-YY-ZZZ.feature（対象大分類）
- spec/test-data.md
- tests/e2e/（現行E2Eテスト一式）
- tests/e2e/adapters/types.ts（adapter インターフェース）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 出力ファイル

- 移行後ソースコード（FE / BE / DB migration）
- tests/e2e/adapters/migrated/F-XX/F-XX-YY-ZZZ.adapter.ts
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- 移行後ソースコード（新規作成・更新）
- tests/e2e/adapters/migrated/F-XX/（新規作成・更新）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード（読み取り専用）
- spec/features.md
- spec/ui/F-XX-YY.html（仕様変更はしない）
- spec/api/F-XX-YY.yml（仕様変更はしない）
- spec/usecases/F-XX-YY.md
- spec/source-inventory.md
- spec/architecture.md（設計変更は07-architecture-designの責務）
- spec/gherkin/F-XX/（Gherkin変更は09-gherkin-generationの責務）
- tests/e2e/adapters/current/F-XX/（現行adapter は変更しない）
- tests/e2e/assertions/F-XX/（アサーション変更は要検討）
- tests/e2e/features/F-XX/（Gherkin変更は09の責務）
- 他の担当者の大分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: 実装計画

対象機能IDについて、以下を整理する:

- 実装する画面コンポーネント
- 実装するAPI（BE側）
- 必要なDB migration
- 使用する共通コンポーネント（spec/architecture.md 参照）
- 使用する共通処理（spec/architecture.md 参照）

### Step 1a: コード品質ツールセットアップ（初回のみ）

`migrated/migrated-backend/pom.xml` に Spotless plugin が未定義の場合のみ実施する。既に定義済みの場合はスキップする。

#### BE: Spotless Maven Plugin

`migrated/migrated-backend/pom.xml` の `<plugins>` 内に以下を追加する:

```xml
<plugin>
    <groupId>com.diffplug.spotless</groupId>
    <artifactId>spotless-maven-plugin</artifactId>
    <version>2.43.0</version>
    <configuration>
        <java>
            <palantirJavaFormat>
                <version>2.50.0</version>
                <style>PALANTIR</style>
            </palantirJavaFormat>
            <importOrder>
                <order>com.proquip,,jakarta,java,javax</order>
            </importOrder>
            <removeUnusedImports/>
            <trimTrailingWhitespace/>
            <endWithNewline/>
        </java>
    </configuration>
</plugin>
```

追加後、既存コードにフォーマットを適用する:
```bash
cd migrated/migrated-backend && mvn spotless:apply
```

#### FE: ESLint + Prettier

`migrated/migrated-frontend/` に以下をセットアップする:

1. `package.json` に devDependencies 追加:
   - `eslint`: `8.57.1`
   - `@angular-eslint/builder`: `18.4.3`
   - `@angular-eslint/eslint-plugin`: `18.4.3`
   - `@angular-eslint/eslint-plugin-template`: `18.4.3`
   - `@angular-eslint/schematics`: `18.4.3`
   - `@angular-eslint/template-parser`: `18.4.3`
   - `@typescript-eslint/eslint-plugin`: `7.18.0`
   - `@typescript-eslint/parser`: `7.18.0`
   - `prettier`: `3.3.3`
   - `eslint-config-prettier`: `9.1.0`
   - `eslint-plugin-prettier`: `5.2.1`
2. `package.json` に scripts 追加: `lint`, `lint:fix`, `format`, `format:check`
3. `.eslintrc.json` 作成（spec/architecture.md の方針に従う）
4. `.prettierrc` 作成（singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2）
5. `.prettierignore` 作成（dist/, node_modules/, .angular/）
6. `angular.json` に lint target 追加（@angular-eslint/builder:lint）
7. `npm install` 実行
8. 既存コードにフォーマットを適用:
```bash
cd migrated/migrated-frontend && npx prettier --write "src/**/*.{ts,html,css}" && npx ng lint --fix
```

### Step 2: BE実装

spec/architecture.md の方針に従い、以下を実装する:

1. DB migration（必要な場合）
2. Entity / Model
3. Repository / DAO
4. Service
5. Controller / Handler
6. バリデーション
7. エラーハンドリング
8. 認証・認可

spec/api/F-XX-YY.yml に記載されたAPIと一致するように実装する。

### Step 2a: BE コードフォーマット

BE実装完了後、Spotless でコードを自動フォーマットする:

```bash
cd migrated/migrated-backend && mvn spotless:apply
```

フォーマットの結果、変更が発生した場合は確認する。Spotless がエラーを返した場合はコードを修正する。

### Step 3: FE実装

spec/architecture.md の方針に従い、以下を実装する:

1. 共通コンポーネントの確認・作成（spec/architecture.md の共通コンポーネント候補を参照し、対象画面で必要なものが未作成なら先に作成する。共通コンポーネントを使用して画面を構築し、プレーンHTMLで独自実装しない）
2. ルーティング
3. 画面コンポーネント
4. フォーム
5. API client呼び出し
6. 状態管理
7. バリデーション（FE側）
8. エラーハンドリング（FE側）

spec/ui/F-XX-YY.html に記載されたUI仕様と一致するように実装する。

### Step 3a: FE Lint & フォーマット

FE実装完了後、Prettier と ESLint で自動フォーマット・lint修正を行う:

```bash
cd migrated/migrated-frontend && npx prettier --write "src/**/*.{ts,html,css}" && npx ng lint --fix
```

lint:fix で自動修正できないエラーがある場合は手動で修正する。

### Step 4: migrated adapter の作成

```typescript
// tests/e2e/adapters/migrated/F-XX/F-XX-YY-ZZZ.adapter.ts
import { Page } from '@playwright/test';
import { XxxPageAdapter } from '../../types';

export class MigratedXxxPageAdapter implements XxxPageAdapter {
  constructor(private page: Page) {}

  async navigateTo(): Promise<void> {
    // 移行後のURLに合わせる
    await this.page.goto('/new-path/xxx');
  }

  async fillField(value: string): Promise<void> {
    // 移行後の画面要素に合わせる
    await this.page.fill('[data-testid="xxx-field"]', value);
  }
  // ...
}
```

### Step 5: E2Eテスト実行（移行後環境）

**5-0: Lint検証（E2E実行前）**

E2Eテスト実行前に、lint チェックを実行し、コード品質を確認する:

```bash
# BE
cd migrated/migrated-backend && mvn spotless:check

# FE
cd migrated/migrated-frontend && npx ng lint && npx prettier --check "src/**/*.{ts,html,css}"
```

lint エラーがある場合は修正してから E2E テストに進む。

**5-1以降:**

1. 移行後環境を起動する。
2. テスト設定を移行後環境・migrated adapter に切り替える。
3. テストを実行する。
4. 失敗した場合:
   - **実装の問題**: 実装を修正する。
   - **adapter の問題**: migrated adapter を修正する。
   - **仕様の差分**: 仕様変更が必要な場合は差分として記録する。仕様を勝手に変更しない。
5. すべてのシナリオがpassするまで修正を繰り返す。

### Step 6: テスト結果の記録

```markdown
## 移行後E2Eテスト結果サマリー

- 対象シナリオ数: 3
- 現行: 3 pass / 0 fail
- 移行後: 2 pass / 1 fail
- 差分: 1件（意図的変更: 1）

※シナリオ別の詳細比較は regression-report/F-XX-YY.md に記載される（13-regression-comparison 実施時）
```

### Step 7: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `migrated-e2e-passed` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・テスト結果・差分・残作業・次skill）。
3. 成果サマリーを出力する（pass/fail数・差分件数）。
4. 次skill（`12-visual-comparison`）を報告する。

---

## 完了条件

- [ ] 対象機能IDの移行後実装（FE/BE）が完了している
- [ ] DB migrationが必要な場合は作成されている
- [ ] migrated adapter が実装されている
- [ ] 現行と同じE2Eシナリオ・アサーションがpassしている
- [ ] Spotless check が pass している（BE）
- [ ] ESLint + Prettier check が pass している（FE）
- [ ] 仕様との差分がある場合は記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `migrated-e2e-passed` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## 制約

- 大きな一括変換を行わない。
- テストを通すために仕様を勝手に変更しない。
- 実装を簡単にするために現行仕様を勝手に捨てない。
- 現行との差分が出た場合は差分として記録する。
- 現行adapter は変更しない。
- Gherkin / アサーションの変更は原則行わない。必要な場合は09に戻す。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
