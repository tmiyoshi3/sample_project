---
name: 05-api-specification
description: "Phase 4 - 機能IDごとにAPI仕様をOpenAPI形式で作成する"
disable-model-invocation: true
---

# 05-api-specification: API仕様作成

## 目的

機能IDごとに関連するAPIをNetwork通信とソースコードから確認し、OpenAPI形式で `spec/api/F-XX-YY.yml` に記録する。Network観測とソースコード確認の根拠を区別する。

## 担当Phase

Phase 4: API仕様作成

---

## 入力ファイル

- CLAUDE.md
- spec/features.md
- spec/ui/F-XX-YY.html（対象中分類）
- spec/source-inventory.md
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）
- 対象ソースコード（CLAUDE.md に記載のソースパス）
- 既存画面（Chrome DevTools MCP / Playwright MCP でアクセス）

## 出力ファイル

- spec/api/F-XX-YY.yml（対象中分類）
- spec/traceability/F-XX-YY.md（対象中分類）
- spec/worklog/F-XX-YY.md（対象中分類）

## 更新してよいファイル

- spec/api/F-XX-YY.yml（自分の担当中分類のみ）
- spec/traceability/F-XX-YY.md（自分の担当中分類のみ）
- spec/worklog/F-XX-YY.md（自分の担当中分類のみ）

## 更新してはいけないファイル

- CLAUDE.md
- 既存ソースコード
- spec/features.md（このskillではステータス更新のみ）
- spec/ui/F-XX-YY.html
- spec/source-inventory.md
- spec/usecases/F-XX-YY.md
- spec/architecture.md
- tests/e2e/
- 他の担当者の中分類のファイル

---

## 実行手順

### Step 0: 事前確認

1. CLAUDE.md を読む。
2. spec/worklog/F-XX-YY.md を読み、前回の作業状況を確認する。
3. spec/traceability/F-XX-YY.md を読み、ステータスを確認する。
4. 対象機能IDとスコープを確認する。

### Step 1: Network通信の観測

Chrome DevTools MCP を使用する。

1. 対象機能IDの画面にアクセスする。
2. Network記録を開始する（または `list_network_requests` で確認）。
3. 画面上の操作を実行する（一覧表示、フォーム送信、検索、ページング、ソートなど）。
4. 発生したAPI呼び出しを記録する:
   - method
   - path
   - request headers（Authorization, Cookie, CSRF token など）
   - request parameters / body
   - response status code
   - response body
   - response headers
5. エラー系の操作も試す:
   - バリデーションエラー
   - 認証切れ
   - 権限不足
   - 存在しないリソースへのアクセス

### Step 2: ソースコードからの補完

spec/source-inventory.md を参照し、対象APIのソースコードを確認する。

1. Controller / Handler のコードを読む。
2. Network観測では確認できなかった仕様を補完する:
   - すべてのリクエストパラメータ
   - すべてのバリデーションルール
   - エラーレスポンスの形式
   - ページングの仕様（最大件数、デフォルト値）
   - ソートの仕様
   - フィルタの仕様
   - 認証・認可の要件
   - レスポンスの全フィールド
3. Service層のビジネスロジックを確認する。
4. Repository層のDBアクセスを確認する。

### Step 3: spec/api/F-XX-YY.yml の作成・更新

OpenAPI 3.0 形式で記録する:

```yaml
openapi: "3.0.3"
info:
  title: "Existing System API"
  version: "1.0.0"
  description: "既存システムのAPI仕様（マイグレーション用）"

paths:
  /api/xxx:
    get:
      summary: "..."
      description: "..."
      operationId: "..."
      tags:
        - "F-XX-YY-ZZZ"
      x-feature-ids:
        - "F-XX-YY-ZZZ"
      x-evidence:
        network: "Network通信で確認"
        source: "ソースコード: <ファイルパス>:<行番号>"
      x-confidence: "High"
      x-unconfirmed:
        - "..."
      security:
        - bearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 0
          x-evidence: "Network通信"
      responses:
        "200":
          description: "成功"
          content:
            application/json:
              schema:
                type: object
                properties:
                  # ...
        "400":
          description: "バリデーションエラー"
          x-evidence: "ソースコード: <path>"
        "401":
          description: "認証エラー"
        "403":
          description: "認可エラー"
```

### Step 4: 根拠の明記

APIの各項目に根拠を付ける:

- Network通信で確認 → `x-evidence: "Network通信"`
- ソースコードで確認 → `x-evidence: "ソースコード: <path>:<line>"`
- 両方で確認 → `x-evidence: "Network通信 + ソースコード: <path>:<line>"`
- 推測 → `x-evidence: "推測: <理由>"`、`x-confidence: "Medium"`

### Step 5: 確認すべき観点

各APIについて、以下を確認する:

- [ ] method は正しいか
- [ ] path は正しいか（パスパラメータ含む）
- [ ] request parameters は網羅されているか
- [ ] request body のスキーマは正しいか
- [ ] response body のスキーマは正しいか
- [ ] エラーレスポンスの形式は確認されているか
- [ ] 認証方式は確認されているか（Cookie / Bearer / Basic）
- [ ] 認可条件は確認されているか
- [ ] バリデーションルールは確認されているか
- [ ] ページングの仕様は確認されているか
- [ ] ソートの仕様は確認されているか
- [ ] 検索/フィルタの仕様は確認されているか
- [ ] CSRF token の要否は確認されているか

### Step 6: 終了処理

1. spec/traceability/F-XX-YY.md のステータスを `api-confirmed` に更新する。
2. spec/worklog/F-XX-YY.md を更新する（実施内容・更新ファイル・残作業・次skill）。
3. 成果サマリーを出力する。
4. 次skill（`06-usecase-extraction`）を報告する。

---

## 完了条件

- [ ] 対象機能IDに関連するAPIがOpenAPI形式で記録されている
- [ ] request / response / error response が分かる範囲で記録されている
- [ ] Network観測とソースコード確認の根拠が区別されている
- [ ] 認証・認可の仕様が記録されている
- [ ] バリデーションルールが記録されている
- [ ] 不明な項目が未確認事項として記録されている
- [ ] spec/traceability/F-XX-YY.md でステータスが `api-confirmed` に更新されている
- [ ] spec/worklog/F-XX-YY.md が更新されている

---

## Chrome DevTools MCP の使い方

### Network観測
1. `navigate_page` で対象画面にアクセスする。
2. `list_network_requests` でAPI呼び出しを一覧する。
3. `get_network_request` で個別のリクエスト/レスポンス詳細を確認する。
4. `click` / `fill` / `fill_form` で画面操作を行い、API呼び出しを発生させる。

### 注意事項
- Cookie / Authorization header / CSRF token を確認する。
- レスポンスの全フィールドを記録する（省略しない）。
- エラー系の操作も試し、エラーレスポンスを記録する。

---

## 制約

- Networkで確認した内容とソースコードで補完した内容を区別する。
- OpenAPIに未確認事項がある場合は `x-unconfirmed` で明示する。
- 他phaseの成果物変更・対象外機能IDの作業は行わない。
