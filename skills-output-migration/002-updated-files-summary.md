---
status: done
completed: 2026-05-24
note: 手動実施済み
---

# Output Migration Step 002: 更新ファイルをカテゴリ別件数サマリーに変換

## 背景

各phaseの終了時にワークログへ記録される「更新ファイル」セクションが、ファイルパスを1行1ファイルで列挙していた。skill 11のように30ファイル以上を更新するphaseでは、更新ファイル一覧だけで30行以上になり、1機能あたり8-10フェーズを経るため合計100行以上を占めることがあった。ファイルの全リストはgit diffやgit logでいつでも取得できるため、ワークログに全件列挙する必要がなかった。

## 修正方針

更新ファイルは**カテゴリ別の件数サマリー**を基本とし、新規作成や重要な設計判断を含むファイルのみ個別パスで記載する。

## 対象ファイル

全ての `spec/worklog/F-XX.md`

## 修正手順

各ワークログエントリの「更新ファイル」セクションを探す。

**修正前:**
```markdown
### 更新ファイル
- app/controllers/auth.controller.ts
- app/services/auth.service.ts
- app/repositories/user.repository.ts
- app/dto/login.dto.ts
- app/dto/register.dto.ts
- app/middleware/auth.guard.ts
- app/middleware/jwt.strategy.ts
- frontend/src/pages/Login.tsx
- frontend/src/pages/Register.tsx
- frontend/src/components/AuthForm.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/api/auth.ts
- tests/e2e/adapters/migrated/F-01/F-01-01-001.adapter.ts
- spec/traceability/F-01.md
- spec/worklog/F-01.md
```

**修正後:**
```markdown
### 更新ファイル
BE: 7件 / FE: 5件 / E2E adapters: 1件 / spec: 2件

特記ファイル:
- app/middleware/auth.guard.ts（新規作成: 認証ガード）
```

### カテゴリの分類基準

| カテゴリ | 対象 |
|---|---|
| BE | バックエンド実装（controllers, services, repositories, dto, middleware, migrations 等） |
| FE | フロントエンド実装（pages, components, hooks, api, stores 等） |
| E2E | テスト関連（adapters, assertions, steps, features, fixtures 等） |
| spec | 仕様書（ui, api, usecases, gherkin, traceability, worklog, regression-report 等） |
| screenshots | スクリーンショット |
| config | 設定ファイル（playwright.config.ts, package.json 等） |

## 注意事項

- 既存の更新ファイルリストからカテゴリ別に件数を数えて変換する
- 「特記ファイル」には、新規作成されたファイルや、重要な設計判断が反映されたファイルのみ記載する。通常の更新ファイルは件数に含めるだけでよい
- 全てのphaseのエントリを修正する（量が多い場合は、行数の多いエントリから優先的に修正してもよい）

## 完了報告

修正完了後、以下の形式で報告すること:

### 修正したファイル一覧
ファイルごとに、修正箇所数を記載する。

例:
```
- spec/worklog/F-01.md — 更新ファイル8箇所をカテゴリ別件数に変換
- spec/worklog/F-02.md — 更新ファイル6箇所をカテゴリ別件数に変換
```

### 未修正のファイル
修正対象だが未修正のファイルがあれば、ファイル名とその理由を記載する。

### 確認チェックリスト
- [ ] 各 `spec/worklog/F-XX.md` の更新ファイルがカテゴリ別件数サマリーになっていること
- [ ] 件数が元のファイルリストの数と一致すること
