# 移行後アーキテクチャ設計

最終更新: 2026-06-01（8回目更新: F-04-01 サプライヤー一覧画面の仕様確認による差分追記）
対象機能: F-01（認証）、F-02（ダッシュボード）、F-12（共通機能）、F-03-01（製品一覧画面）、F-03-02（製品詳細画面）、F-03-03（カテゴリ管理画面）、F-03-04（バンドル管理画面）、F-03-05（製品新規登録/編集画面）、F-04-01（サプライヤー一覧画面）の仕様確認済み + 全13大分類のソース構造解析結果

## 概要

- 移行元: Jakarta EE 10 / WildFly 30 / Angular 17 / Hibernate 6.4.9 / Flyway 10.15.0 / PostgreSQL 15.7 / Keycloak 22.0.5
- 移行先: Java 21 / Quarkus / Angular / PostgreSQL / Keycloak 26.6.2 / Podman Compose
- テスト: JUnit 5 + Playwright
- API仕様: OpenAPI

### スコープ外

- Keycloak管理画面のカスタマイズ（Keycloakデフォルトテーマを使用）
- ストアドプロシージャの移行（アプリケーション層に移行する）
- LegacyReportGenerator / OldDataMigrationHelper（移行対象外、廃止）

---

## FE構成

### ディレクトリ構成

```
migrated/frontend/
├── src/
│   ├── app/
│   │   ├── core/                          # シングルトンサービス・ガード・インターセプター
│   │   │   ├── auth/
│   │   │   │   ├── auth.guard.ts          # 認証ガード（keycloak-angular）
│   │   │   │   ├── role.guard.ts          # ロール別アクセス制御ガード
│   │   │   │   └── auth.service.ts        # 認証サービス（ログイン/ログアウト/ロール判定）
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts    # Bearerトークン自動付与
│   │   │   │   ├── error.interceptor.ts   # グローバルHTTPエラーハンドリング
│   │   │   │   └── loading.interceptor.ts # ローディング状態管理
│   │   │   ├── services/
│   │   │   │   ├── notification.service.ts # トースト通知管理
│   │   │   │   └── loading.service.ts     # ローディング状態サービス
│   │   │   └── layout/
│   │   │       ├── header.component.ts
│   │   │       ├── sidebar.component.ts
│   │   │       └── footer.component.ts
│   │   ├── shared/                        # 再利用可能なコンポーネント・パイプ・ディレクティブ
│   │   │   ├── components/
│   │   │   │   ├── data-table/            # 汎用テーブル（ソート・ページング内蔵）
│   │   │   │   ├── search-box/
│   │   │   │   ├── confirm-dialog/
│   │   │   │   ├── status-badge/
│   │   │   │   ├── loading-spinner/
│   │   │   │   ├── page-header/
│   │   │   │   ├── form-field/
│   │   │   │   ├── file-upload/
│   │   │   │   ├── notification-toast/
│   │   │   │   └── empty-state/
│   │   │   ├── pipes/
│   │   │   │   ├── japanese-date.pipe.ts
│   │   │   │   ├── currency-jp.pipe.ts
│   │   │   │   ├── truncate.pipe.ts
│   │   │   │   ├── status-label.pipe.ts
│   │   │   │   └── order-number.pipe.ts
│   │   │   ├── directives/
│   │   │   │   ├── has-role.directive.ts
│   │   │   │   ├── auto-focus.directive.ts
│   │   │   │   └── click-outside.directive.ts
│   │   │   ├── validators/
│   │   │   │   ├── custom-validators.ts   # skuFormat, maxAmount, requiredIf, dateRange
│   │   │   │   └── async-validators.ts    # asyncUniqueValidator（SKU重複チェック等）
│   │   │   ├── services/
│   │   │   │   └── api.service.ts         # HTTP基底サービス
│   │   │   └── models/                    # 共通型定義
│   │   │       ├── page-result.model.ts
│   │   │       ├── error-response.model.ts
│   │   │       └── common.model.ts
│   │   ├── features/                      # 機能別モジュール（遅延ロード）
│   │   │   ├── dashboard/                 # F-02
│   │   │   ├── products/                  # F-03
│   │   │   ├── suppliers/                 # F-04
│   │   │   ├── procurement/               # F-05
│   │   │   ├── inventory/                 # F-06
│   │   │   ├── warehouses/                # F-07
│   │   │   ├── pricing/                   # F-08
│   │   │   ├── reports/                   # F-09
│   │   │   ├── admin/                     # F-10
│   │   │   └── import-export/             # F-11
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── assets/
├── angular.json
├── package.json
└── tsconfig.json
```

各features/配下は以下の構成を基本とする:

```
features/{domain}/
├── {domain}.routes.ts           # ルーティング定義
├── services/
│   └── {domain}.service.ts      # ドメイン固有APIサービス
├── models/
│   └── {domain}.model.ts        # ドメイン固有型定義
├── {screen-name}/
│   ├── {screen-name}.component.ts
│   ├── {screen-name}.component.html
│   └── {screen-name}.component.scss
└── ...
```

### ルーティング方針

- Standalone Components + 遅延ロード（loadChildren）で機能単位に分割
- 現行のモジュール方式（NgModule）からStandalone Componentsに移行
- AuthGuardは全認証必要ルートに適用
- RoleGuardは管理者ルート（/admin/**）に追加適用
- ルートパス構造は現行と同一を維持（移行リスク低減）:
  - `/dashboard` → F-02
  - `/products/**` → F-03
  - `/suppliers/**` → F-04
  - `/procurement/**` → F-05
  - `/inventory/**` → F-06
  - `/warehouses/**` → F-07
  - `/pricing/**` → F-08
  - `/reports/**` → F-09
  - `/admin/**` → F-10
  - `/import-export` → F-11

### 状態管理方針

- Angular Signalsを基本とする（Angular 17+のSignals APIを活用）
- 軽量な状態はコンポーネントローカルで管理（signal / computed）
- 画面横断の状態（認証情報、通知、ローディング）はCoreサービスでSignalベースに管理
- NgRx等の外部状態管理ライブラリは不採用（アプリケーションの複雑度に対してオーバースペック）
- API取得データのキャッシュは行わない（現行同様、画面遷移のたびにAPI再取得）

### API client方針

共通HTTP clientサービス（ApiService）を基盤とし、機能別サービスがこれを利用する。

```
ApiService（shared/services/api.service.ts）
├── get<T>(path, params?) → Observable<T>
├── post<T>(path, body) → Observable<T>
├── put<T>(path, body) → Observable<T>
├── delete<T>(path) → Observable<T>
└── ベースURL: environment.apiUrl
```

- AuthInterceptor: Bearerトークン自動付与（/assets/, /realms/ を除く）
- ErrorInterceptor: グローバルエラーハンドリング
  - 401 → Keycloakログイン再トリガー
  - 403 → ダッシュボードにリダイレクト + 通知
  - 409 → 楽観ロックエラー通知
  - 422 → バリデーションエラー通知
  - 500 → サーバーエラー通知（現行のalert()からNotificationServiceに変更）
- LoadingInterceptor: アクティブリクエスト数カウント

### フォーム管理方針

- Reactive Formsを基本とする（FormGroup / FormControl / FormArray）
- Template-driven Formsは不使用（テスタビリティとバリデーション制御のため）
- 各フォームコンポーネントでFormGroupを定義
- 共通フォームフィールドコンポーネント（app-form-field）でラベル・エラーメッセージ表示を統一

### ウィザード（マルチステップフォーム）方針

F-03-05で確認: 製品新規登録画面は5ステップウィザード形式（基本情報→価格/在庫→仕様→画像/ドキュメント→確認）。ステップごとにバリデーションを実行し、合格時のみ次ステップに遷移する。

**標準パターン:**
- ステップ状態はコンポーネントローカルのSignalで管理（currentStep: signal(0), totalSteps: 5）
- ステップインジケーター: 現在ステップのハイライト + 完了ステップのチェックマーク
- ステップ間のデータ保持: 単一FormGroup内にステップごとのFormGroupをネストし、ステップ切替時もデータを保持
- ステップ遷移制御:
  - 「次へ →」: 現在ステップのFormGroupをmarkAllAsTouched()でバリデーション実行、合格時のみcurrentStep+1
  - 「← 前へ」: バリデーションなしでcurrentStep-1（入力値は保持）
  - ステップインジケーターのクリックによる直接ジャンプは不可（順次遷移のみ）
- 確認ステップ: 全入力内容を読み取り専用テーブルで表示。「登録する」ボタンで送信実行
- unsaved changesガード: CanDeactivateGuardでフォーム入力中の画面離脱を検出し確認ダイアログを表示する（現行は未実装、技術的負債を解消）
- 共通コンポーネント（app-wizard / app-step-indicator）でウィザードUIを統一:
  - Input: steps配列（{label: string, icon?: string}[]）、currentStep、completedSteps
  - Output: stepChange（ステップ変更通知）
  - ステップ内コンテンツは`<ng-template>`で遅延レンダリング

**ウィザード vs 単一ページフォームの選択基準:**

| 表示方式 | 適用条件 | 適用例 |
|---|---|---|
| ウィザード（マルチステップ） | 入力項目が多く複数セクションに分かれる新規作成画面。初回ユーザーのガイダンスが必要 | F-03-05（製品新規登録: 5ステップ） |
| 単一ページフォーム | 既存データの部分更新。ユーザーが更新対象セクションに直接アクセスしたい | F-03-05（製品編集: 1ページに全セクション表示） |

**適用箇所:** F-03-05（製品新規登録）。他の新規作成画面（サプライヤー、発注書等）でも入力項目が多い場合はウィザード化を検討

### 作成/編集フォーム共通化方針

F-03-05で確認: 製品の新規作成（product-create.component）と編集（product-edit.component）で、フォーム定義（FormGroup構造・バリデーター設定）の約90%が重複している。新規作成は5ステップウィザード、編集は単一ページフォームとUI構成が異なるため、コンポーネント自体の共通化は困難だが、内部ロジックの共有は可能。

**方針:**
- フォーム定義（FormGroupの構築・バリデーター設定）を共有サービス（ProductFormService等）に抽出する
- 各コンポーネントは共有サービスからFormGroupを取得し、自身のUI構成（ウィザード/単一ページ）で表示する
- 編集画面: 既存データのpatchValue()による初期値設定は編集コンポーネント固有の責務
- バリデーター: 作成/編集で同一のバリデーターを使用する。編集固有のバリデーション（例: SKU重複チェック時に自身を除外）はパラメータで制御
- 画像/ドキュメント管理: 作成時はdeferred（確認ステップ後に一括アップロード）、編集時はimmediate（即時API呼び出し）。この差異はコンポーネント側で制御する

**適用条件:**
- 同一ドメインの作成/編集でフォーム定義が70%以上重複する場合に適用
- UI構成が大きく異なる場合（ウィザード vs 単一ページ）でも、フォーム定義の共有は有効
- UI構成が同一の場合は、コンポーネント自体をmodeシグナルで切り替え（管理画面インラインCRUD方針を参照）

### バリデーション方針（FE側）

- Reactive Formsのバリデーター（Validators.required, pattern, min, max等）を使用
- カスタムバリデーター（custom-validators.ts）で業務ルールを実装:
  - skuFormat: SKUパターン検証（BEと同一パターンに統一: `[A-Z]{2,5}-[0-9]{4,8}`）
  - maxAmount: 金額上限
  - requiredIf: 条件付き必須
  - dateRange: 日付範囲整合性
- **FE/BE バリデーション整合性**: FEは即時フィードバック用（UX向上）、BEが権威的バリデーション。FEのみ通過してBEで拒否されるケースはエラー通知で対応
- **現行の技術的負債を解消**: SKUパターンをFE/BEで統一する
- **ステータスラベルの正規化（F-03-01で確認）**: DISCONTINUED のFE表示「廃番」とBE Enum定義「販売終了」が不一致。移行後は以下の方針で統一する:
  - BEのEnum定義に`getDisplayName()`メソッドを持たせ、APIレスポンスにdisplayNameフィールドを含める
  - FEのステータスラベル定義はBEのdisplayNameに準拠する（FE独自のラベル変換は廃止）
  - 全Enumステータス（ProductStatus, SupplierStatus, OrderStatus等）で統一適用

### 非同期フィールドバリデーション方針

F-03-05で確認: SKU入力時にGET /api/products/check-sku?sku={sku}でリアルタイム重複チェックを実行し、結果をインジケーター表示する（アイドル→チェック中→利用可能→重複エラー）。

**標準パターン:**
- AsyncValidator（Angular Reactive Forms）としてファクトリ関数で実装する
- debounceTime(300ms)を適用してAPI呼び出し頻度を抑制（一覧画面フィルタ方針と同一のデバウンス戦略）
- ステータスインジケーター: 4状態をSignalで管理
  - idle: 未入力/入力中（インジケーター非表示）
  - checking: API呼び出し中（スピナー表示）
  - available: 利用可能（✓ 緑表示）
  - duplicate: 重複あり（✗ 赤表示 + エラーメッセージ）
- 編集時の自己除外: 自身のIDをAsyncValidatorに渡し、check-sku APIのexcludeIdパラメータで自身のSKUを重複対象から除外する
- 共通ファクトリ（asyncUniqueValidator）でUI統一:
  - Input: checkFn（重複チェック関数）、debounceMs（デバウンス時間、デフォルト300ms）、excludeId（自己除外用ID）
  - Output: AsyncValidatorFn（FormControlに設定）
- ステータスインジケーターコンポーネント: FormControlのpending/valid/errorsを監視してUI状態を自動切替

**適用箇所:** F-03-05（SKU重複チェック）。他の一意性チェック（サプライヤーコード等）にも同パターンを適用

### 認証・認可方針（FE側）

- keycloak-angular（16.x以降）+ keycloak-js（26.x）を使用
- Keycloak 26.x（Quarkus版）に対応: `/auth/` プレフィックス廃止済み → URL は `/realms/proquip/...`
- PKCE: S256（現行と同一）
- onLoad: 'login-required'（現行と同一）
- アクセストークン有効期限: 5分（Keycloak設定）
- リフレッシュトークン: keycloak-angularが自動更新（minValidity設定）
- ロール判定: AuthService.hasRole() / AuthService.getRoles()
- UI表示制御:
  - *appHasRole ディレクティブ: DOM要素の表示/非表示をロールに基づいて制御
  - RoleGuard: ルートレベルのアクセス制御
  - **現行の技術的負債を解消**: 全リソースに適切なロール制御を実装
- **ロール別サイドバーメニュー表示制御**（F-12で確認: 現行は未実装、全ユーザーに全メニュー表示）:
  - menuItems配列にroles属性を追加し、AuthService.hasRole()でフィルタリング
  - 管理者設定（/admin）はADMINロールのみ表示
  - 参照系画面は全ロールに表示、作成系メニューはVIEWERに非表示
  - 遷移先のRoleGuardと表示制御を一致させる（二重防御）

### ユーザープロフィール表示方針

F-12で確認: 現行はKeycloak /account エンドポイントでプロフィール取得しているが、401エラーでフォールバック（「ゲスト」表示）。

- 移行後: keycloak-angular の KeycloakService.loadUserProfile() を使用
  - ユーザー名: `profile.lastName + " " + profile.firstName`（日本語姓名順）
  - ロール表示: `authService.getRoles()` の最初のロールを表示。ロール名は日本語ラベルに変換（ADMIN→システム管理者、MANAGER→部門管理者、BUYER→購買担当者、WAREHOUSE_STAFF→倉庫担当者、VIEWER→閲覧者）
  - **現行の技術的負債を解消**: /auth/realms/proquip/account の401エラーを解消（Keycloak 26.x対応の正しいプロファイル取得方法を使用）

### 共通コンポーネント方針

- 現行の10種の共通コンポーネントをStandalone Componentとして再実装
- Material Design等のUIライブラリは不採用（現行の独自スタイルを維持）
- 各コンポーネントはInputシグナル / OutputイベントでI/Fを定義
- テストはPlaywrightのPage Object内でセレクターを統一的に管理

### エラーハンドリング方針（FE側）

- グローバルエラーハンドリング: ErrorInterceptorで全HTTPエラーをキャッチ
- ビジネスエラー（422, 400）: 画面のフォームフィールドにインラインエラー表示、またはトースト通知
- 認証エラー（401）: Keycloakログインを再トリガー
- 認可エラー（403）: ダッシュボードにリダイレクト + 通知メッセージ
- サーバーエラー（500）: トースト通知「サーバーエラーが発生しました」
- ネットワークエラー: トースト通知「通信エラーが発生しました」
- **現行の技術的負債を解消**: alert()の使用をNotificationServiceに統一

### ポーリング・リアルタイムデータ方針

F-12で確認: 現行は通知未読件数をsetInterval（60秒）でポーリング取得している。

- **方針**: ポーリングを維持する（WebSocket/SSEは不採用）
- **理由**: 通知未読件数の更新頻度は低く（分単位で十分）、WebSocket/SSEの運用コスト（接続管理、再接続、ロードバランサ設定）に見合わない。将来的にリアルタイム性が必要になった場合はSSEを検討
- **実装ルール**:
  - ポーリングはRxJSの`timer`/`interval`オペレータを使用（setIntervalではなくObservableベースで管理）
  - コンポーネント破棄時にサブスクリプションを確実に解除（`takeUntilDestroyed`）
  - ポーリング間隔はenvironment設定で定義（デフォルト60秒）
  - エラー時はサイレントフォールバック（ユーザーに通知しない）
  - ポーリング対象が増えた場合は共通PollingServiceの導入を検討

### UI状態永続化方針

F-12で確認: サイドバー折りたたみ状態がブラウザリロードでリセットされる（永続化なし）。

- サイドバー折りたたみ状態: localStorageに保存（`proquip.sidebar.collapsed`）
- その他のUI状態（テーブルのページサイズ、フィルタ条件等）: 必要に応じてlocalStorageまたはクエリパラメータに保存
- ユーザー固有設定が必要な場合はバックエンドAPI（SystemConfiguration的なuser-preference）を検討するが、現時点ではスコープ外

### 一覧画面フィルタ方針

F-03-01で確認: 製品一覧画面はキーワード検索 + カテゴリ/メーカー/ステータスの3ドロップダウンフィルタ + 「フィルターをリセット」リンクの構成。この一覧+マルチフィルタパターンは F-04（サプライヤー）、F-05（購買依頼・発注書）、F-06（在庫）、F-08（価格）、F-10（ユーザー・部門）等でも繰り返し出現する。

**標準パターン:**
- フィルタ条件はコンポーネントローカルのSignalで管理（filterSignal: { keyword, categoryId, status, ... }）
- フィルタ変更のたびにpage=0にリセットしてAPI再呼び出し
- フィルタ適用中は「フィルターをリセット」リンクを表示し、クリックで全フィルタを初期値に戻す
- 複数フィルタはAND条件で組み合わせ（サーバーサイドで処理）
- ドロップダウンフィルタの選択肢:
  - **マスターデータ系（カテゴリ・メーカー・サプライヤー・部門等）**: 専用APIから取得（例: GET /api/categories, GET /api/master-data/manufacturers）。現行の「全製品取得→ユニーク抽出」パターン（技術的負債）は廃止する
  - **ステータス系**: Enumの選択肢をフロントエンドで定義。バックエンドのEnum定義と表示ラベルを統一する
  - **数値範囲系（F-04-01で確認: 最低評価フィルタ）**: 閾値指定（rating >= N）によるフィルタ。選択肢は固定値（指定なし/1以上/2以上/...）。移行後はサーバーサイドのWHERE句でフィルタする（例: `@QueryParam("minRating") Double minRating`）
- **デバウンス**: テキスト検索はdebounceTime(300ms)を適用し、API呼び出し頻度を抑制

### CSV/ファイルエクスポート方針

F-03-01で確認: 製品CSV出力ボタン（F-03-01-010）はクライアントサイドCSV生成（GET /api/products?size=10000で全件取得→BOM付CSV→Blobダウンロード）だが、バックエンドにも GET /api/products/export エンドポイントが別途存在（二重実装、技術的負債）。

**方針**: バックエンドCSVエクスポートに統一する。
- バックエンドで StreamingOutput によるCSV生成（メモリ効率、件数制限なし）
- Content-Disposition: attachment; filename="products_YYYY-MM-DD.csv"
- 文字コード: UTF-8 BOM付き（Excel互換）
- 現在のフィルタ条件をクエリパラメータとして受け取り、フィルタ適用済みデータをエクスポート
- フロントエンドはAPIを呼び出してBlobダウンロード（CSV生成ロジックをフロントに持たない）
- エクスポート対象のAPIパスは `GET /api/{resource}/export` で統一

**適用箇所**: F-03（製品CSV）、F-05（発注書CSV）、F-09（レポートCSV）、F-10（監査ログCSV）、F-11（エクスポート）

### 詳細画面タブ方針

F-03-02で確認: 製品詳細画面は7タブ構成（基本情報・仕様・画像・代替品・サプライヤー・ドキュメント・変更履歴）で、タブ切替はコンポーネントローカルのactiveTab変数で管理。このタブ付き詳細画面パターンはF-04-02（サプライヤー詳細: 基本情報・連絡先・製品・契約・評価履歴・認証の6タブ）、F-05-06（発注書詳細）、F-07-02（倉庫詳細）等でも繰り返し出現する。

**標準パターン:**
- タブ状態はコンポーネントローカルのSignalで管理（activeTab: signal(0)）
- URLハッシュフラグメントやクエリパラメータでのタブ永続化は不要（ブックマーク対象外）
- 共通タブパネルコンポーネント（app-tab-panel）でタブUIを統一:
  - Input: tabs配列（{label: string, icon?: string}[]）
  - Output: tabChange（選択されたインデックスを通知）
  - タブ内コンテンツは`<ng-template>`で遅延レンダリング（非アクティブタブのDOMを生成しない）
- ヘッダ領域（ページタイトル + ステータスバッジ + メタ情報 + アクションボタン）はタブ外に固定配置
- 各タブコンテンツは同一APIレスポンス内のデータを参照（追加API呼び出しが必要な場合はタブ選択時にlazy load）

**詳細画面の標準構成:**
```
page-header（タイトル + ステータスバッジ + アクションボタン群）
├── ← 一覧に戻る（btn-secondary）
├── 編集（btn-primary）
└── 削除（btn-danger + confirm-dialog）
tab-panel
├── 基本情報（デフォルト選択、タブインデックス0）
├── ドメイン固有タブ群
└── 変更履歴（最終タブ）
```

### 階層データ（ツリー）表示方針

F-03-03で確認: カテゴリ管理画面はフラットなAPIレスポンス（parentIdによる親子関係）をFE側でツリー構造に再構築し、展開/折りたたみ可能な階層ツリーとして表示する。この階層ツリーパターンはF-10（部門管理: department.parent_id）でも出現する。

**標準パターン:**
- APIレスポンスはフラットなリスト形式（各アイテムにparentIdを含む）。BE側でツリー構造を構築しない
- FE側でbuildTree()関数によりparentIdを使って階層ツリーを構築する（TreeNode型: {data, children, expanded, level}）
- 初期表示は全ノード展開状態（expanded=true）
- 展開/折りたたみはコンポーネントローカルstateで管理（Signal）
- インデントはlevelに応じたpadding-left（level * 28 + 16 px）
- 子カテゴリが存在するノードのみ展開/折りたたみアイコン（▼/▶）を表示
- 共通ツリーコンポーネント（app-tree-view）でツリーUIを統一:
  - Input: nodes配列（TreeNode<T>[]）、showActions（アクションボタン表示有無）
  - Output: nodeSelect、nodeExpand、nodeCollapse
  - Content projection: 各ノードのアクションボタン群（CRUD操作）はng-templateで差し込み
- ツリーデータの更新: CRUD操作後はAPIから全件再取得してツリーを再構築する（差分更新ではなくフルリロード）

### 管理画面（インラインCRUD）方針

F-03-03, F-03-04で確認: 単一画面内でCRUD操作を完結させる画面構成。一覧→詳細→編集の画面遷移パターン（F-03-01→F-03-02→F-03-05）とは異なる。マスターデータ管理系画面（F-10-05 マスターデータ管理等）でも出現する可能性がある。

**レイアウトバリエーション:**

| バリエーション | レイアウト | 適用例 | 選択基準 |
|---|---|---|---|
| 2カラム型 | 左: リスト/ツリー、右: フォームパネル（同時表示） | F-03-03（カテゴリ管理）、F-10（部門管理） | データ一覧を参照しながら編集したい場合。ツリー/テーブル等リスト部分が主コンテンツ |
| トグル型 | 一覧表示 ⇔ フォーム表示（排他切替） | F-03-04（バンドル管理） | フォームが大きい場合（子アイテム管理・価格計算等を含む）。一覧を見ながら編集する必要がない場合 |

**共通ルール:**
- 作成/編集でフォームを共用し、modeシグナル（'create' | 'edit'）で表示テキスト（タイトル、ボタンラベル）を切り替え
- 削除は確認ダイアログ（app-confirm-dialog）を経由
- 保存成功後: 成功バナー表示 + リスト/ツリーの全件再取得
- フォームパネルは操作開始時に表示、キャンセル/保存後に非表示

**2カラム型の追加ルール:**
- 編集対象の行はハイライト表示（背景色変更）

**トグル型の追加ルール:**
- editModeシグナル（null | 'create' | 'edit'）で一覧/フォームの表示を排他切替
- 一覧はeditMode===null時のみ表示

### カードリスト方針

F-03-04で確認: バンドル管理画面はデータテーブルではなくカード形式で一覧を表示する。各カードに名前・ステータスバッジ・説明・構成製品チップ・価格情報をリッチに表示する。

**テーブル vs カードの選択基準:**

| 表示方式 | 適用条件 | 適用例 |
|---|---|---|
| データテーブル（app-data-table） | 件数が多い（ページング必要）、列ベースの均一データ、ソート・検索・フィルタが必要 | F-03-01（製品一覧）、F-04（サプライヤー一覧）、F-05（購買依頼一覧） |
| カードリスト | 件数が少ない（ページング不要）、各アイテムの表示内容が構造的に異なる（子アイテムリスト・価格計算等を含む）、一覧自体がリッチな情報表示 | F-03-04（バンドル管理）、F-02（ダッシュボードKPIカード） |

**カードリストの標準構成:**
- カードはCSS Grid / Flexboxで配置
- 各カードにアクションボタン群（編集・削除）を配置
- ソートはAPI側で制御（JPQL ORDER BY）、FE側のインタラクティブソートは不要
- ページングなし（全件取得）。将来的にデータ量が増えた場合はデータテーブルへの移行を検討

### 比較選択・比較画面方針

F-04-01で確認: サプライヤー一覧画面で各行のチェックボックスで最大3件を選択し、比較ボタンから比較画面（/suppliers/compare?ids=1,5,10）に遷移してパフォーマンスレポートを横並び表示する。このN件選択→比較画面パターンはF-08-03（価格比較画面）でも出現する。

**標準パターン:**
- 一覧テーブルの各行にチェックボックスを配置し、選択状態をコンポーネントローカルのSignal配列で管理（selectedIds: signal<number[]>([])）
- 最大選択件数を制限する（maxCompareItems = 3）。上限到達時は残りのチェックボックスをdisabled化
- 比較ボタンのラベルに選択件数を反映（例:「比較 (2/3)」）。2件以上でenabled、1件以下でdisabled
- 比較画面への遷移: クエリパラメータでIDリストを渡す（`/suppliers/compare?ids=1,5,10`）。ルーティングは `queryParams: { ids: selectedIds.join(',') }`
- 比較画面: 専用の比較APIを呼び出し（`GET /api/{resource}/compare?{resource}Ids={ids}`）、結果をカラム配置で横並び表示する
- 比較ボタンはフィルタバーのアクションエリアに配置する（app-filter-barとの共存）

**選択UI:**
- チェックボックス列をテーブルの最左列に追加する（app-data-tableのselectable入力で制御）
- 選択/解除はチェックボックスのクリックのみ（行クリックは詳細遷移のため、選択と詳細遷移を分離）
- フィルタ適用中の選択状態: フィルタでテーブル行が変更されても選択状態を保持する（フィルタ解除時に選択済み行が再表示される）

**適用箇所:** F-04-01（サプライヤー比較）、F-08-03（価格比較）

### 星評価（スコアリング）表示方針

F-04-01で確認: サプライヤー一覧テーブルの評価列に星5つ + 数値（例: ☆☆☆☆☆ 0.0）を表示する。評価値はSupplierRatingの4項目（品質・納期・価格・サービス）のoverallScoreの平均値（0.0〜5.0）。このスコアリング表示パターンはF-04-02（サプライヤー詳細の評価タブ）、F-09-03（サプライヤー実績レポート）でも出現する。

**標準パターン:**
- 共通コンポーネント（app-star-rating）で星評価UIを統一:
  - Input: value（0.0〜5.0、小数対応）、maxStars（デフォルト5）、showValue（数値表示有無、デフォルトtrue）、size（'sm' | 'md' | 'lg'）
  - 表示: 塗りつぶし星（★）/ 半星（⯪）/ 空星（☆）で小数点を視覚的に表現
  - 読み取り専用表示のみ（入力用の星クリック操作は別途interactive modeで検討）
- 一覧テーブルでは size='sm' + showValue=true で使用
- 詳細画面の評価セクションでは size='md' + 4項目の内訳を個別表示

**適用箇所:** F-04-01（サプライヤー一覧の評価列）、F-04-02（サプライヤー詳細の評価タブ）、F-09-03（サプライヤー実績レポート）

### オートコンプリート（検索選択）方針

F-03-04で確認: バンドル構成製品の追加時に、製品検索テキストボックスに入力→ドロップダウンに候補表示→クリックで追加する操作パターン。現行はGET /api/products?page=0&size=100で先頭100件を事前取得し、クライアントサイドでフィルタしている（技術的負債: 101件目以降の製品を追加不可）。

**移行後の方針:**
- クライアントサイドの事前全件取得は廃止する。サーバーサイド検索API（keyword クエリパラメータ）を使用する
- 入力のたびにdebounceTime(300ms)を適用してAPI呼び出し（一覧画面フィルタ方針と同一のデバウンス戦略）
- ドロップダウン表示件数: 最大10件（API側でsize=10を指定）
- 既にFormArrayに追加済みの製品はドロップダウンから除外する（FE側フィルタ）
- 選択済み製品を再選択した場合: 数量を+1する（F-03-04の現行動作を維持）
- 共通コンポーネント（app-autocomplete）でUI統一:
  - Input: searchFn（検索関数）、displayFn（表示フォーマット関数）、placeholder
  - Output: itemSelected（選択された項目を通知）
  - 内部でdebounce・ドロップダウン表示/非表示・キーボードナビゲーションを処理

**適用箇所:** F-03-04（バンドル構成製品検索）、F-05（発注書の製品/サプライヤー選択）、F-06（在庫移動の製品選択）

### 派生フィールドの計算方針

F-03-04で確認: バンドル価格（定価合計・割引額・バンドル価格）がFE（リアルタイムプレビュー用）とBE（保存時の権威的計算）の両方で計算されている。FE: Math.floor、BE: RoundingMode.FLOOR（一致）。

**方針:**
- **FE計算（プレビュー用）**: フォーム入力中にリアルタイムで派生値を表示する場合、FEで計算する。ユーザーが保存前に結果を確認できるUXのために必要
- **BE計算（権威的）**: 保存時にBEで再計算し、BE側の計算結果をDBに保存する。FEの計算結果は参考値であり、BE側が正とする
- **端数処理の統一**: FE（Math.floor / Math.round）とBE（RoundingMode.FLOOR / HALF_UP）で同一の端数処理を使用する。不一致がある場合はBE側に合わせてFE側を修正する
- **許容範囲**: 単純な四則演算（合計、割引率適用等）であればFE/BE二重計算は許容する。複雑な業務ルール（税計算、段階的割引等）が絡む場合はBE計算のみとし、FEは保存後のAPIレスポンスで結果を表示する

### ファイル・画像表示方針

F-03-02で確認: 製品画像タブ（F-03-02-011）はグリッドレイアウトで画像表示、ドキュメントタブ（F-03-02-014）はファイルリスト+ダウンロードボタンの構成。

**画像表示:**
- 画像は静的ファイルパス（/images/products/...）でnginxから直接配信
- メイン画像のprimaryフラグでバッジ表示（app-status-badge流用）
- 画像読み込みエラー時: /assets/images/no-image.png にフォールバック（onerror handler）
- グリッドレイアウト（CSS Grid）で複数画像を並べて表示

**ドキュメントダウンロード:**
- ダウンロードは共通ユーティリティ（fileDownload）を使用（CSVエクスポートと同一ユーティリティ）
- 静的ファイルパス(/documents/products/...)の場合: anchor要素のdownload属性でダウンロード
- APIストリーミングの場合: Blobレスポンスをダウンロード（CSVエクスポート方針と同一）
- ファイルサイズ表示: formatFileSize パイプ（B → KB → MB → GB変換）

**適用箇所:** F-03-02（製品画像・ドキュメント）、F-11（インポート/エクスポート）

### ファイルアップロードワークフロー方針

F-03-05で確認: 製品画像・ドキュメントのアップロードには2つのパターンがある。新規作成時（ウィザード）は親エンティティが未登録のためdeferred（一括後送）、編集時は親エンティティが存在するためimmediate（即時API呼び出し）。

**2パターン:**

| パターン | タイミング | 適用場面 | API呼び出し |
|---|---|---|---|
| Deferred（一括後送） | 親エンティティ登録後にforkJoinで並列アップロード | 新規作成ウィザード（親IDが存在しない） | POST /api/{resource} → POST /api/{resource}/{id}/images, POST /api/{resource}/{id}/documents を forkJoin で並列実行 |
| Immediate（即時） | ファイル選択/削除のたびに即座にAPI呼び出し | 編集画面（親IDが存在する） | POST /api/{resource}/{id}/images（追加）、DELETE /api/{resource}/{id}/images/{imageId}（削除）を即時実行 |

**共通ルール:**
- クライアントサイドプレビュー: FileReader.readAsDataURL()で選択直後に画像プレビューを表示（アップロード前）
- ファイル種別制限: accept属性で制限（画像: .png,.jpg,.jpeg、ドキュメント: .pdf）
- 複数ファイル選択: multiple属性対応
- Deferredパターンのエラーハンドリング: 親エンティティ登録成功後に画像/ドキュメントアップロードが部分的に失敗した場合、親エンティティは登録済みだがファイルが不完全な状態になる。エラーメッセージで通知し、編集画面から再アップロードを促す
- Immediateパターンの注意: 「キャンセル」ボタンで画面を離れても、既に実行された追加/削除APIは取り消されない（現行の技術的負債: canDeactivateガード未実装を解消するが、画像/ドキュメントの即時操作は取り消し対象外）
- 既存のapp-file-uploadコンポーネントをdeferred/immediateの両モードに対応させる（mode: 'deferred' | 'immediate'）

**適用箇所:** F-03-05（製品画像・ドキュメント）、F-11（インポート/エクスポート）

### バージョン番号管理方針

F-12で確認: バージョン番号「v1.0.0」がサイドバーとフッターの2箇所にハードコードされている（二重管理）。

- バージョン番号はenvironment.tsで一元管理: `environment.version`
- ビルド時にpackage.jsonのversionフィールドから自動注入（angular.jsonのfileReplacements等）
- サイドバー・フッターはenvironment.versionを参照

---

## BE構成

### レイヤ構成

```
migrated/backend/
├── src/main/java/com/proquip/
│   ├── ProQuipApplication.java            # Quarkus Application（@ApplicationPath不要）
│   ├── resource/                          # REST Resource（JAX-RS）= Controller層
│   │   ├── DashboardResource.java
│   │   ├── ProductResource.java
│   │   ├── SupplierResource.java
│   │   ├── RequisitionResource.java
│   │   ├── PurchaseOrderResource.java
│   │   ├── InventoryResource.java
│   │   ├── WarehouseResource.java
│   │   ├── PriceListResource.java
│   │   ├── ReportResource.java
│   │   ├── UserResource.java
│   │   ├── DepartmentResource.java
│   │   ├── BudgetResource.java
│   │   ├── AdminResource.java
│   │   ├── NotificationResource.java
│   │   ├── NotificationTemplateResource.java
│   │   ├── DelegationResource.java
│   │   ├── ReturnResource.java
│   │   ├── MasterDataResource.java
│   │   ├── ImportJobResource.java
│   │   └── HealthResource.java
│   ├── service/                           # ビジネスロジック層
│   │   ├── ProductService.java
│   │   ├── SupplierService.java
│   │   ├── RequisitionService.java
│   │   ├── PurchaseOrderService.java
│   │   ├── InventoryService.java
│   │   ├── BudgetService.java
│   │   ├── NotificationService.java
│   │   ├── AuditService.java
│   │   ├── ImportExportService.java
│   │   └── notification/
│   │       ├── NotificationSender.java       # インターフェース
│   │       ├── EmailNotificationSender.java
│   │       ├── InAppNotificationSender.java
│   │       └── NotificationSenderFactory.java
│   ├── repository/                        # データアクセス層（Panache）
│   │   ├── ProductRepository.java
│   │   ├── SupplierRepository.java
│   │   ├── PurchaseOrderRepository.java
│   │   ├── InventoryRepository.java
│   │   ├── BudgetRepository.java
│   │   ├── UserProfileRepository.java
│   │   ├── WarehouseRepository.java
│   │   └── ...
│   ├── entity/                            # JPA Entity
│   │   ├── base/
│   │   │   ├── BaseEntity.java            # @Id, @Version（楽観ロック）
│   │   │   └── AuditableEntity.java       # createdAt, createdBy, updatedAt, updatedBy
│   │   ├── organization/
│   │   ├── product/
│   │   ├── supplier/
│   │   ├── procurement/
│   │   ├── inventory/
│   │   ├── pricing/
│   │   └── system/
│   ├── dto/                               # リクエスト/レスポンスDTO
│   │   ├── request/
│   │   │   ├── ProductCreateRequest.java
│   │   │   ├── ProductUpdateRequest.java
│   │   │   └── ...
│   │   ├── response/
│   │   │   ├── ProductResponse.java
│   │   │   ├── PageResult.java            # 共通ページング結果
│   │   │   ├── ErrorResponse.java         # 共通エラーレスポンス
│   │   │   └── ...
│   │   └── mapper/                        # MapStruct マッパー
│   │       ├── ProductMapper.java
│   │       └── ...
│   ├── validator/                         # カスタムバリデーション
│   │   ├── ProductValidator.java
│   │   ├── SupplierValidator.java
│   │   ├── PurchaseOrderValidator.java
│   │   └── RequisitionValidator.java
│   ├── exception/                         # 例外クラス
│   │   ├── BusinessException.java         # 基底ビジネス例外
│   │   ├── EntityNotFoundException.java
│   │   ├── ValidationException.java
│   │   ├── ApprovalException.java
│   │   ├── BudgetExceededException.java
│   │   ├── InsufficientStockException.java
│   │   └── ImportException.java
│   ├── filter/                            # JAX-RS フィルタ
│   │   ├── GlobalExceptionMapper.java
│   │   ├── ValidationExceptionMapper.java
│   │   ├── CorsFilter.java               # Quarkusでは application.properties で設定可能
│   │   └── RequestLoggingFilter.java
│   ├── scheduler/                         # スケジューラー（@Scheduled）
│   │   ├── BudgetAlertScheduler.java
│   │   ├── LowStockAlertScheduler.java
│   │   ├── OverdueOrderScheduler.java
│   │   ├── NotificationCleanupScheduler.java
│   │   └── ImportJobCleanupScheduler.java
│   ├── event/                             # CDIイベント
│   │   ├── InventoryEvent.java
│   │   ├── InventoryEventObserver.java
│   │   ├── OrderEvent.java
│   │   └── OrderEventObserver.java
│   └── config/                            # Quarkus設定
│       └── AppConfig.java
├── src/main/resources/
│   ├── application.properties             # Quarkus設定
│   ├── db/migration/                      # Flyway マイグレーション
│   │   ├── V001__create_organization_tables.sql
│   │   └── ...
│   └── META-INF/
│       └── resources/                     # 静的ファイル（Angular ビルド成果物）
└── src/test/java/
    └── com/proquip/
        ├── resource/                      # REST Resource テスト
        ├── service/                       # Service テスト
        └── repository/                    # Repository テスト
```

### DTO / Entity方針

**Entity → DTO変換の原則:**
- Entityを直接APIレスポンスに使用しない
- Request DTO: バリデーションアノテーション付き（@NotNull, @NotEmpty, @Valid等）
- Response DTO: API公開用の表現。内部構造を隠蔽
- MapStructでEntity ↔ DTO変換を自動化（現行のMapStruct 1.5.5を継続使用）
- 共通ページネーションDTO（PageResult<T>）を全一覧APIで統一使用

**DTOマッピング完全性（F-03-02で確認）:**
- 現行のProductDetailDtoに以下のフィールドがマッピング漏れしている（技術的負債）:
  - createdAt / updatedAt（AuditableEntityに存在するがDTOに未定義）
  - notes（Product Entityに存在するがDTOに未定義）
  - unit（UnitOfMeasure名、DTOに未定義）
  - leadTimeDays（Product Entityに存在するがDTOに未定義）
  - width / height / depth（DTOに定義あるがAPIレスポンスに未含）
- 移行時の方針: Response DTOには画面表示に必要な全フィールドをマッピングする。MapStructの`@Mapping`でEntity→DTO変換を網羅的に定義し、マッピング漏れをコンパイル時に検出する（`unmappedTargetPolicy = ReportingPolicy.ERROR`）
- specifications フィールド: 現行はDB上のProductSpecification別テーブル（specKey/specValue）をJSON文字列に変換してAPIレスポンスに含めている。移行後もJSON文字列形式を維持するが、FE側ではJSON.parse()のフォールバック処理（パース失敗時にプレーンテキスト表示）を実装する

**Entity基底クラス:**
- BaseEntity: @Id (Long, @GeneratedValue IDENTITY), @Version (int, 楽観ロック)
- AuditableEntity extends BaseEntity: createdAt, createdBy, updatedAt, updatedBy（@PrePersist, @PreUpdate）

### Repository方針

- Quarkus Panache（Repository パターン）を採用
- PanacheRepository<Entity> を継承し、ドメイン固有クエリメソッドを定義
- 複雑なクエリはJPQL、集計系はネイティブSQLを許容
- 現行のAbstractBaseDao系基底クラスはPanache標準機能で代替

```java
@ApplicationScoped
public class ProductRepository implements PanacheRepository<Product> {
    public List<Product> findByCategory(Long categoryId) { ... }
    public PanacheQuery<Product> search(String keyword, Long categoryId, String status) { ... }
}
```

**N+1クエリの解消（F-03-01で確認）:**
- 現行の在庫数取得は製品ごとに個別クエリ（N+1問題、技術的負債）
- 移行後: JOIN FETCH またはサブクエリで一括取得する
- 一覧APIで集計値（SUM, COUNT等）が必要な場合は、JPQLのJOINまたはDBビュー（v_inventory_summary等）を活用
- インメモリフィルタ（現行のmanufacturerIdフィルタ）はDB側WHERE句に移行する

### Service方針

- CDI管理Bean（@ApplicationScoped）
- 1ドメイン = 1 Serviceを基本とする
- トランザクション管理: @Transactional（Quarkus CDI管理）
- 現行のAbstractBase*ServiceBean階層は廃止し、Panache標準メソッドで代替
- ビジネスルール・ステータス遷移・承認ワークフローはServiceに集約
- CDIイベント（@Observes / @ObservesAsync）は現行と同様に維持

### Controller方針（Resource）

- JAX-RS（RESTEasy Reactive）を使用
- クラスレベルで @Path, @Produces(APPLICATION_JSON), @Consumes(APPLICATION_JSON) を宣言
- 各メソッドに @RolesAllowed を明示（現行の技術的負債を解消）
- リクエストバリデーション: @Valid + Bean Validation
- レスポンス: Response オブジェクトまたは DTO 直接返却
- ページネーションパラメータ: @QueryParam("page") @DefaultValue("0"), @QueryParam("size") @DefaultValue("20")
- **ソートパラメータ**: @QueryParam("sort") で `column,direction` 形式を受け取り、サーバーサイドでORDER BYを生成する。現行の技術的負債（sortパラメータが@QueryParam未定義で無視される）を解消。許可カラムのホワイトリストでSQLインジェクションを防止
- **sizeパラメータ上限**: MAX_PAGE_SIZE（100）を超えるリクエストは100に制限（現行と同一）

```java
@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Authenticated
public class ProductResource {
    @GET
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER", "WAREHOUSE_STAFF", "VIEWER"})
    public PageResult<ProductResponse> list(@QueryParam("page") @DefaultValue("0") int page, ...) { ... }

    @POST
    @RolesAllowed({"ADMIN", "MANAGER", "BUYER"})
    public Response create(@Valid ProductCreateRequest request) { ... }
}
```

### バリデーション方針（BE側）

- **第1層（JAX-RS）**: Bean Validation（@NotNull, @NotEmpty, @Size, @Pattern, @Min, @Max等）をRequest DTOに適用
- **第2層（Service）**: カスタムバリデーター（ProductValidator等）でビジネスルールを検証
- **SKUパターンの統一**: `[A-Z]{2,5}-[0-9]{4,8}` に統一（現行のProductValidator/PurchaseOrderValidator間の不一致を解消）
- ValidationExceptionMapper: ConstraintViolationException → 422 Unprocessable Entity

### エラーレスポンス方針

全APIで統一的なエラーレスポンス形式を使用する:

```json
{
  "code": 404,
  "errorCode": "ENTITY_NOT_FOUND",
  "message": "指定された製品が見つかりません",
  "details": ["productId: 999"]
}
```

**例外 → HTTPステータスマッピング:**

| 例外クラス | HTTPステータス | errorCode |
|---|---|---|
| EntityNotFoundException | 404 | ENTITY_NOT_FOUND |
| ValidationException | 422 | VALIDATION_ERROR |
| ConstraintViolationException | 422 | VALIDATION_ERROR |
| ApprovalException | 400 | APPROVAL_ERROR |
| BudgetExceededException | 400 | BUDGET_EXCEEDED |
| InsufficientStockException | 400 | INSUFFICIENT_STOCK |
| ImportException | 400 | IMPORT_ERROR |
| OptimisticLockException | 409 | CONFLICT |
| その他 | 500 | INTERNAL_ERROR |

**現行の技術的負債を解消:**
- DashboardResourceの例外握りつぶし（空DTO返却）を廃止し、適切なエラーレスポンスを返す

### 認証・認可方針（BE側）

- quarkus-oidc を使用（現行のカスタムAuthenticationFilterを廃止）
- Keycloak 26.6.2 から JWT を検証（署名検証を含む → 現行の技術的負債を解消）
- application.properties で OIDC 設定:

```properties
quarkus.oidc.auth-server-url=http://keycloak:8080/realms/proquip
quarkus.oidc.client-id=proquip-api
quarkus.oidc.credentials.secret=${OIDC_CLIENT_SECRET}
quarkus.oidc.tls.verification=none
```

- @Authenticated: 認証必須（HealthResource以外の全リソース）
- @RolesAllowed: ロールベースアクセス制御（全リソースの全メソッドに明示的に設定）

**ロール別アクセス制御方針:**

| リソース | ADMIN | MANAGER | BUYER | WAREHOUSE_STAFF | VIEWER |
|---|---|---|---|---|---|
| 参照系（GET） | ○ | ○ | ○ | ○ | ○ |
| 作成系（POST） | ○ | ○ | ○ | △（在庫系のみ） | × |
| 更新系（PUT） | ○ | ○ | △ | △ | × |
| 削除系（DELETE） | ○ | △ | × | × | × |
| 管理系（/admin/**） | ○ | × | × | × | × |
| 承認系 | ○ | ○ | × | × | × |

△ = 一部機能のみ（機能ごとに詳細を決定）

### サブリソースAPI方針

F-03-02で確認: 製品詳細画面では複数のサブリソースAPIが存在する（/api/products/{id}/change-log, /api/products/{id}/suppliers, /api/products/{id}/alternatives）。このサブリソースパターンはF-04-02（/api/suppliers/{id}/contacts, /ratings等）、F-05-06（/api/purchase-orders/{id}/approval-history, /status-history等）でも出現する。

**方針:**
- 1:N の関連データで、親リソースのメインレスポンスに含めると肥大化するものはサブリソースAPIとして分離する
- パス形式: `GET /api/{resource}/{id}/{sub-resource}` （RESTful慣例に従う）
- メインAPIのレスポンスに含めるか分離するかの判断基準:
  - **含める**: 親リソースと常にセットで表示されるデータ（例: product.images, product.documents — 詳細画面で常に取得）
  - **分離する**: 特定のタブや操作でのみ必要なデータ（例: change-log — 変更履歴タブ選択時のみ取得）、データ量が大きいもの
- サブリソースAPIは親リソースの存在チェックを行い、親が存在しない場合は404を返す（現行のchange-logはこの挙動を実装済み）

**現行の技術的負債を解消:**
- 代替品タブ（F-03-02-012）: フロントエンドがGET /api/products?page=0&size=5（一般製品リスト先頭5件）を使用して代替品を偽装。移行後はGET /api/products/{id}/alternatives（ProductAlternativeエンティティに基づく正しい代替品データ）を使用する
- サプライヤータブ（F-03-02-013）: BEにGET /api/products/{id}/suppliersが存在するがFEから呼び出されていない。移行後はこのAPIを正しく使用する

### エンティティ変更履歴方針

F-03-02で確認: 製品変更履歴タブ（F-03-02-015）はProductChangeLogエンティティから変更日時・フィールド名・旧値→新値・変更者のタイムラインを表示する。これはシステム全体の監査ログ（AuditLog / F-10-06）とは粒度・用途が異なる。

**システム監査ログ（AuditLog）との使い分け:**

| 観点 | エンティティ変更履歴 | システム監査ログ |
|---|---|---|
| 粒度 | フィールドレベル（oldValue → newValue） | 操作レベル（JSONB old/new値） |
| 用途 | 業務担当者が変更経緯を確認 | システム管理者が操作履歴を監査 |
| 表示場所 | 各詳細画面の変更履歴タブ | 管理者設定 > 監査ログ画面（F-10-06） |
| データ量 | 少（ドメインエンティティごとに数十件程度） | 多（全操作を記録） |
| ページング | 不要（全件取得） | 必要 |

**方針:**
- エンティティ変更履歴はドメインごとのChangeLogエンティティ（ProductChangeLog等）で管理する
- 変更種別: CREATE, UPDATE, STATUS_CHANGE（Enum）
- 変更者の名前解決: changedByUserId → UserProfile.displayNameをAPIレスポンス時に解決
- FE表示: タイムラインUI（変更日時降順、CREATE/UPDATE/STATUS_CHANGEでアイコン分け）
- 現行ではProductChangeLogのみ確認済みだが、同パターンを他ドメイン（PurchaseOrderStatusHistory等）にも適用する
- **ChangeLogService（BE共通処理）**: 変更履歴の記録・取得を共通化し、ドメインごとのChangeLogエンティティに対応する

### 削除保護方針

F-03-03で確認: カテゴリ削除時に子カテゴリ・紐付き製品の存在チェックを行い、存在する場合は409 Conflictで拒否する。この参照整合性チェック+物理削除パターンはマスターデータ系エンティティに共通する。

**方針:**
- 物理削除を行うエンティティには、削除前に参照整合性チェックを実施する
- チェック対象: 子エンティティ（自己参照FK）、関連エンティティ（外部FK）
- チェックはServiceレイヤで実装（SELECT COUNTクエリ）
- 参照が存在する場合: BusinessExceptionをスロー → GlobalExceptionMapper → 409 Conflict
- エラーメッセージは具体的な理由を含める（「子カテゴリが存在するため削除できません。」「製品が紐付いているため削除できません。」等）
- FE側: APIエラーレスポンスのmessageをそのままバナー表示する

### 自己参照エンティティのバリデーション方針

F-03-03で確認: カテゴリは自己参照FK（parent_id）を持つが、循環参照の防止がFE/BEともに未実装（技術的負債 TD-F03-03-003）。

**方針:**
- 更新時のServiceバリデーションで循環参照を検出する:
  - 自身を親に設定 → 即拒否（id == parentId）
  - 子孫を親に設定 → 祖先チェーンを辿って検出（parentを再帰的にロードし、自身のidと一致するか確認）
- 循環検出時: ValidationException → 422 Unprocessable Entity
- 同パターンを部門管理（Department.parent_id）にも適用する

### エンティティコード自動生成方針

F-03-03で確認: カテゴリコード（category_code）は `CAT-{System.currentTimeMillis()}` で自動生成されている（技術的負債 TD-F03-03-002: 高負荷時の衝突リスク）。

**方針:**
- コード自動生成はDBシーケンスベースに変更する: `{PREFIX}-{sequenceValue, zero-padded}`
- 例: CAT-000001, BDL-000001, ...
- プレフィックス: CAT（カテゴリ）、BDL（バンドル）、他のエンティティも同様に3文字プレフィックスで統一
- PostgreSQLシーケンス（category_code_seq、bundle_code_seq等）を使用し、衝突リスクをゼロにする
- 同パターンを他のコード自動生成エンティティ（SKU以外）にも適用する
- SKUコードはユーザー入力のため対象外

### 通知システム方針

F-12で確認: 現行の通知API（NotificationResource）に複数の技術的負債がある。移行時に以下を解消する。

**エンドポイント構成（現行を踏襲 + 改善）:**
- GET /api/notifications — ユーザーの通知一覧取得（ページング対応に変更）
- GET /api/notifications/unread-count — 未読件数取得
- PUT /api/notifications/{id}/read — 個別既読化
- POST /api/notifications/mark-all-read — 一括既読化

**技術的負債の解消:**
1. **resolveUserId のデフォルトID=1L**: SecurityContextから確実にユーザーIDを解決し、解決失敗時は401を返す（デフォルト値でのフォールバックを廃止）
2. **mark-all-read のuserIdパラメータ**: リクエストボディからのuserId取得を廃止し、SecurityContextから取得
3. **HashMap → 型安全DTO**: UnreadCountResponseをHashMapではなくRecord/DTOクラスで返す
4. **Entity/DB定義の不一致**: Notification.priorityをEnum化（LOW/NORMAL/HIGH/URGENT）、Notification.statusもEnum化（UNREAD/READ/ARCHIVED）。DBマイグレーションV031以降でカラム型を修正
5. **通知タイトル長**: DB定義（500文字）とEntity制約（300文字）の不一致を解消（500文字に統一）

### ログ方針

- Quarkus標準ログ（JBoss Logging → SLF4J互換）
- ログレベル:
  - ERROR: 業務に影響するエラー（例外発生時）
  - WARN: 注意が必要な状態（予算超過警告、在庫不足等）
  - INFO: 主要な業務操作（ログイン、CRUD操作、ステータス変更、承認/却下）
  - DEBUG: 開発時のデバッグ情報
- 構造化ログ（JSON形式）を採用: quarkus-logging-json
- 監査ログ: AuditServiceによるDBへの記録（現行と同様）
- リクエストログ: Quarkus access-log で対応（カスタムFilterは不要）

---

## DB

### migration方針

- Flyway を継続使用（Quarkus Flyway拡張: quarkus-flyway）
- 現行のV001〜V030マイグレーションをそのまま移行（スキーマ互換性を維持）
- 新規マイグレーションはV031以降で追加
- ストアドプロシージャ（V011）の3本は移行対象外。アプリケーション層に移行する:
  - sp_calculate_reorder_suggestions → InventoryService
  - sp_generate_spend_report → ReportService
  - sp_adjust_inventory_after_count → InventoryService
- 起動時に自動マイグレーション実行: `quarkus.flyway.migrate-at-start=true`

### スキーマ設計方針

- 現行の57テーブル + 4ビューのスキーマを基本的に維持
- テーブル・カラム命名: snake_case（PostgreSQL慣例、現行と同一）
- Entity命名: PascalCase（Java慣例、現行と同一）
- 全テーブルにid（BIGSERIAL PRIMARY KEY）、version（INT, 楽観ロック）を持つ
- 監査カラム（created_at, created_by, updated_at, updated_by）はAuditableEntityで共通化
- 階層構造（category, department）: 自己参照FK（parent_id）を維持
- 削除戦略:
  - **論理削除（原則）**: ビジネスエンティティ（Product, PurchaseOrder, Supplier等）はstatusカラムでの論理削除を維持。履歴・監査の観点からデータを保持する
  - **物理削除（例外）**: 分類・マスターデータ系エンティティ（Category, 将来的にTag等）はstatusベースの管理が不適切なため物理削除（em.remove）を使用。物理削除の前提条件として参照整合性チェック（子レコード・紐付きレコードの存在確認）を必ず行い、違反時は409 Conflictを返す

---

## テスト

### E2Eテスト構成

```
tests/e2e/
├── playwright.config.ts
├── fixtures/
│   └── test-data.ts           # テストデータ定義
├── pages/                     # Page Object Model
│   ├── login.page.ts          # F-01
│   ├── dashboard.page.ts      # F-02
│   ├── product-list.page.ts   # F-03
│   ├── product-detail.page.ts # F-03
│   ├── ...
│   └── components/            # 共通コンポーネントのPage Object
│       ├── data-table.po.ts
│       ├── search-box.po.ts
│       ├── confirm-dialog.po.ts
│       ├── sidebar.po.ts
│       └── header.po.ts
├── specs/
│   ├── F-01/                  # 機能ID別テストファイル
│   │   └── login.spec.ts
│   ├── F-02/
│   │   └── dashboard.spec.ts
│   └── ...
└── helpers/
    ├── auth.helper.ts         # 認証ヘルパー（Keycloakログイン）
    └── api.helper.ts          # APIヘルパー（テストデータ操作）
```

### adapter / selector構成

- Page Object Model（POM）パターンを採用
- 共通コンポーネント（data-table, search-box等）は共通Page Objectとして定義
- セレクター戦略:
  - 優先: data-testid属性（`[data-testid="product-name"]`）
  - 次点: role属性（`role="button"`）
  - 最終: CSSセレクター

```typescript
// pages/product-list.page.ts
export class ProductListPage {
  readonly searchBox: SearchBoxPO;
  readonly dataTable: DataTablePO;

  constructor(private page: Page) {
    this.searchBox = new SearchBoxPO(page, '[data-testid="product-search"]');
    this.dataTable = new DataTablePO(page, '[data-testid="product-table"]');
  }

  async search(keyword: string) { await this.searchBox.search(keyword); }
  async getRowCount() { return this.dataTable.getRowCount(); }
  async clickRow(index: number) { await this.dataTable.clickRow(index); }
}
```

### テストデータ方針

- Flywayシードデータ（V020〜V030）を基本テストデータとして利用
- テスト固有データ: APIヘルパー経由でsetup/teardown
- 各テストは独立実行可能にする（テスト間の依存を排除）
- 認証: テストヘルパーでKeycloakに直接APIログイン（UI操作を省略してテスト高速化）

### CI/CD方針

- GitHub Actionsを想定（ただし具体的なCI/CDツールは未決定）
- パイプラインステージ:
  1. lint + type check（FE: ng lint + tsc, BE: checkstyle）
  2. unit test（FE: Jest/Karma, BE: JUnit 5 + QuarkusTest）
  3. build（FE: ng build, BE: mvn package -Dnative or JVM）
  4. E2E test（Playwright, Podman Compose で全サービス起動）
  5. deploy（Podman Compose でデプロイ）

---

## 共通コンポーネント候補

### FE共通コンポーネント

| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |
|---|---|---|---|
| app-data-table | ソート・ページング付き汎用テーブル | F-02, F-03, F-04, F-05, F-06, F-07, F-08, F-09, F-10, F-11 | 高 |
| app-search-box | 検索テキストボックス | F-03, F-04, F-05, F-08, F-10 | 高 |
| app-confirm-dialog | 確認ダイアログ（削除確認等） | F-03, F-04, F-05, F-06, F-07, F-08, F-10 | 高 |
| app-status-badge | ステータスバッジ（色分け表示） | F-02, F-03, F-04, F-05, F-06, F-07, F-08 | 高 |
| app-loading-spinner | ローディングスピナー | 全画面 | 高 |
| app-page-header | ページヘッダ（タイトル + アクションボタン） | 全画面 | 高 |
| app-form-field | フォームフィールド（ラベル + 入力 + エラー） | F-03, F-04, F-05, F-06, F-07, F-08, F-10 | 高 |
| app-file-upload | ファイルアップロード | F-03, F-11 | 中 |
| app-notification-toast | トースト通知 | 全画面 | 高 |
| app-notification-panel | 通知ドロップダウンパネル（未読一覧・既読化・一括既読） | F-12 (全画面ヘッダー) | 中 |
| app-empty-state | 空状態表示 | F-02, F-03, F-04, F-05, F-06, F-09 | 中 |
| app-filter-bar | 一覧画面のフィルタバー（検索+ドロップダウン+リセットリンク） | F-03, F-04, F-05, F-06, F-08, F-10 | 高 |
| app-export-button | CSVエクスポートボタン（ローディング+ダウンロード） | F-03, F-05, F-09, F-10, F-11 | 中 |
| app-tab-panel | タブパネル（タブ切替UI、遅延レンダリング対応） | F-03-02, F-04-02, F-05-02, F-05-06, F-07-02 | 高 |
| app-image-gallery | 画像グリッド表示（メインバッジ、フォールバック画像） | F-03-02, F-11 | 低 |
| app-tree-view | 階層ツリー表示（展開/折りたたみ、アクションボタン、インデント） | F-03-03, F-10 | 中 |
| app-autocomplete | 検索選択UI（debounce付きテキスト入力→ドロップダウン候補→クリック選択） | F-03-04, F-05, F-06 | 中 |
| app-wizard | ウィザード（マルチステップフォーム）コンテナ + ステップインジケーター | F-03-05 | 中 |
| app-star-rating | 星評価表示（0.0〜5.0、半星対応、数値併記） | F-04-01, F-04-02, F-09-03 | 中 |

### FE共通処理

| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |
|---|---|---|---|
| ApiService | HTTP基底サービス（ベースURL、JSON変換） | 全機能 | 高 |
| AuthService | 認証/ロール管理（Keycloak連携） | F-01, 全画面 | 高 |
| NotificationService | トースト通知管理 | 全画面 | 高 |
| LoadingService | ローディング状態管理 | 全画面 | 高 |
| japaneseDate パイプ | 日付「YYYY年MM月DD日」形式 | F-02, F-05, F-09 | 中 |
| currencyJp パイプ | 金額「¥1,234,567」形式 | F-02, F-05, F-06, F-08, F-09 | 中 |
| statusLabel パイプ | ステータスコード→表示ラベル変換 | F-02, F-03, F-04, F-05, F-06, F-07, F-08 | 中 |
| truncate パイプ | 長い文字列の省略 | 全画面 | 低 |
| orderNumber パイプ | 発注番号フォーマット | F-05 | 低 |
| hasRole ディレクティブ | ロール別表示制御 | 全画面 | 高 |
| autoFocus ディレクティブ | 入力要素の自動フォーカス | フォーム画面全般 | 低 |
| clickOutside ディレクティブ | 要素外クリック検知 | ドロップダウン、モーダル、通知パネル（F-12） | 低 |
| custom-validators | カスタムバリデーター集 | フォーム画面全般 | 中 |
| asyncUniqueValidator | 非同期一意性チェックバリデーターファクトリ（debounce+ステータスインジケーター） | F-03-05, F-04 | 中 |
| roleLabelPipe パイプ | ロールコード→日本語ラベル変換 | F-12（ユーザーメニュー） | 低 |
| debounceSearch ユーティリティ | テキスト検索のデバウンス制御（300ms） | F-03, F-04, F-05, F-08, F-10 | 中 |
| fileDownload ユーティリティ | Blobダウンロードヘルパー（CSVエクスポート・ドキュメントDL） | F-03, F-05, F-09, F-10, F-11 | 中 |
| fileSize パイプ | ファイルサイズ表示変換（B/KB/MB/GB） | F-03-02, F-11 | 低 |

### BE共通処理

| 名称 | 用途 | 使用箇所（機能ID） | 優先度 |
|---|---|---|---|
| BaseEntity | @Id, @Version 共通基底 | 全Entity | 高 |
| AuditableEntity | 監査カラム（created/updated） | ほぼ全Entity | 高 |
| PageResult<T> | 共通ページング結果DTO | 全一覧API | 高 |
| ErrorResponse | 共通エラーレスポンスDTO | 全API | 高 |
| GlobalExceptionMapper | グローバル例外→HTTPレスポンス変換 | 全API | 高 |
| ValidationExceptionMapper | Bean Validation例外→422変換 | 全API | 高 |
| AuditService | 監査ログ記録 | 全CRUD操作 | 中 |
| NotificationService | 通知作成・配信・既読管理 | F-05, F-06, F-10, F-12, F-13 | 中 |
| MapStruct マッパー群 | Entity ↔ DTO 変換 | 全機能 | 高 |
| BudgetAlertScheduler | 予算消化率チェック（毎日8:00） | F-13 | 中 |
| LowStockAlertScheduler | 在庫不足検知 | F-13 | 中 |
| OverdueOrderScheduler | 発注遅延検知 | F-13 | 中 |
| CsvExportService | StreamingOutputによるCSVエクスポート共通処理 | F-03, F-05, F-09, F-10, F-11 | 中 |
| SortParameterParser | sortクエリパラメータ解析・ホワイトリスト検証 | 全一覧API | 中 |
| ChangeLogService | エンティティ変更履歴の記録・取得（ドメイン横断） | F-03, F-05 | 中 |

---

## インフラ構成

### Podman Compose構成

```yaml
services:
  postgres:
    image: postgres:15.7
    # 現行と同一バージョンを維持
  keycloak:
    image: quay.io/keycloak/keycloak:26.6.2
    # /auth プレフィックスなし
  backend:
    # Quarkus JVMモード（Java 21）
    build: ./migrated/backend
  frontend:
    # nginx で Angular SPA 配信 + リバースプロキシ
    image: nginx:1.25.4
    # /api/ → backend, /realms/ → keycloak
```

### nginx リバースプロキシ

```
location /api/ {
    proxy_pass http://backend:8080/api/;
}
location /realms/ {
    proxy_pass http://keycloak:8080/realms/;
}
location / {
    root /usr/share/nginx/html;
    try_files $uri $uri/ /index.html;
}
```

**現行との差異:** `/auth/` プレフィックスのプロキシルールを削除（Keycloak 26.xでは不要）

---

## 設計判断ログ

| 判断項目 | 選択肢 | 採用 | 理由 |
|---|---|---|---|
| BE フレームワーク | Quarkus / Spring Boot | Quarkus | CLAUDE.md の Target Architecture で指定。Jakarta EE 互換性が高く、現行の JAX-RS/CDI コードの移行コストが低い |
| FE フレームワーク | Angular / React / Vue | Angular | CLAUDE.md の Target Architecture で指定。現行の Angular 17 からの移行が最もスムーズ |
| FE コンポーネント方式 | NgModule / Standalone | Standalone | Angular の推奨方向。ツリーシェイキング向上、ボイラープレート削減 |
| 状態管理 | Signals / NgRx / RxJS | Signals | アプリの複雑度に対して NgRx はオーバースペック。Signals は Angular 標準で学習コストが低い |
| ORM | Hibernate Panache / JPA直接 | Panache | Quarkus 推奨。ボイラープレート削減。現行の Hibernate Entity をほぼそのまま流用可能 |
| DB マイグレーション | Flyway / Liquibase | Flyway | 現行と同一ツール。既存マイグレーションファイルを流用可能 |
| 認証（BE） | quarkus-oidc / カスタムフィルタ | quarkus-oidc | Quarkus 標準。JWT 署名検証を含み、現行の技術的負債（署名検証なし）を解消 |
| 認証（FE） | keycloak-angular / oidc-client | keycloak-angular | 現行と同一ライブラリ。Keycloak 26.x 対応版にアップグレード |
| DTO変換 | MapStruct / 手動変換 | MapStruct | 現行と同一。コンパイル時生成で実行時オーバーヘッドなし |
| UIライブラリ | Material / PrimeNG / なし | なし | 現行の独自スタイルを維持。UIライブラリ導入はスコープ外 |
| テストフレームワーク | Playwright / Cypress | Playwright | CLAUDE.md の Target Architecture で指定。マルチブラウザ対応 |
| ログ形式 | テキスト / JSON | JSON | 構造化ログにより検索・集計が容易。Quarkus quarkus-logging-json で対応 |
| ストアドプロシージャ | 移行 / アプリ層移行 | アプリ層移行 | アプリ層に移行することでテスタビリティ向上、DB依存度低減 |
| CORS | カスタムフィルタ / Quarkus設定 | Quarkus設定 | application.properties での設定が推奨。カスタムフィルタは不要 |
| bean-discovery-mode | all / annotated | annotated | 現行の "all" は技術的負債。"annotated" が推奨。起動時間短縮 |
| 通知取得方式 | ポーリング / WebSocket / SSE | ポーリング（60秒） | F-12で確認。通知更新頻度が低く（分単位で十分）、WebSocket/SSEの運用コスト（接続管理、再接続）に見合わない。RxJS timerベースに改善 |
| サイドバー状態永続化 | なし / localStorage / バックエンド | localStorage | F-12で確認。ブラウザローカルの設定で十分。ユーザー跨ぎの永続化は不要 |
| バージョン番号管理 | ハードコード / environment注入 | environment注入 | F-12で確認。現行はサイドバー+フッターの二重ハードコード。package.jsonから自動注入に変更 |
| ロール別メニュー表示 | 全表示 / フィルタリング | フィルタリング | F-12で確認。現行は未実装で全メニュー全ユーザー表示。移行時にmenuItemsにroles属性を追加しフィルタ |
| 通知resolveUserId | デフォルトID=1L / 401エラー | 401エラー | F-12で確認。セキュリティリスクのためデフォルトID返却を廃止。SecurityContextから解決不可時は401 |
| CSVエクスポート方式 | クライアントサイド生成 / バックエンドStreamingOutput | バックエンドStreamingOutput | F-03-01で確認。クライアント側はsize=10000で全件取得→CSV生成だが、MAX_PAGE_SIZE(100)制限で不完全。バックエンドは件数制限なし、メモリ効率良好、フィルタ条件も適用可能 |
| メーカーフィルタデータソース | 全製品取得→ユニーク抽出 / 専用APIエンドポイント | 専用APIエンドポイント | F-03-01で確認。現行はGET /api/products?size=1000から抽出（技術的負債）。GET /api/master-data/manufacturers が既に存在するため、こちらを使用 |
| サーバーサイドソート | フロント側のみ / バックエンド実装 | バックエンド実装 | F-03-01で確認。現行はsortパラメータが@QueryParam未定義で無視される。移行後はPanacheのpage().sort()でサーバーサイドソートを実装 |
| N+1クエリ解消 | 個別クエリ / JOIN FETCH / DBビュー | JOIN FETCH + DBビュー併用 | F-03-01で確認。在庫数取得が製品ごとに個別クエリ。一覧表示の集計値はJOIN/サブクエリで一括取得、レポート系はDBビュー(v_inventory_summary等)を活用 |
| ステータスラベル管理 | FE/BE個別定義 / BE一元管理 | BE一元管理 | F-03-01で確認。DISCONTINUED=「廃番」(FE) vs「販売終了」(BE)の不一致。BE EnumにdisplayName定義、APIレスポンスに含めてFEはそれを表示 |
| インメモリフィルタ | インメモリ / DB WHERE句 | DB WHERE句 | F-03-01で確認。manufacturerIdフィルタが全件取得後のインメモリremoveIf。移行後はJPQL WHERE句でDB側フィルタに変更 |
| 詳細画面タブ管理 | コンポーネントstate / URLハッシュ / クエリパラメータ | コンポーネントstate（Signal） | F-03-02で確認。タブ状態のブックマーク・永続化は不要。URLハッシュフラグメントは運用コストに見合わない |
| エンティティ変更履歴 | ドメイン別ChangeLog / 汎用AuditLog統合 | ドメイン別ChangeLog | F-03-02で確認。フィールドレベルの変更追跡（oldValue→newValue）はシステム監査ログ（操作レベル）と粒度が異なる。業務担当者向けのUI表示に特化 |
| サブリソースAPI | メインレスポンスに全含 / サブリソース分離 | 選択的分離 | F-03-02で確認。常にセットで表示されるデータ（images, documents）は含める。タブ選択時のみ必要なデータ（change-log）は分離 |
| 代替品API | 一般製品リスト流用 / 専用alternatives API | 専用alternatives API | F-03-02で確認。現行はGET /api/products?page=0&size=5から自身除外の偽実装（技術的負債）。ProductAlternativeエンティティに基づく正しいAPIを使用 |
| ファイル配信方式 | 静的ファイル（nginx直接） / APIストリーミング | 静的ファイル（nginx直接） | F-03-02で確認。製品画像・ドキュメントは既存パスでnginxから配信。APIストリーミングはCSVエクスポート専用 |
| DTOマッピング検証 | 手動確認 / MapStruct unmappedTargetPolicy | MapStruct ERROR ポリシー | F-03-02で確認。現行は8フィールドのマッピング漏れ。移行後はコンパイル時に未マッピングフィールドを検出 |
| 削除戦略 | 全エンティティ論理削除 / 論理+物理使い分け | 使い分け | F-03-03で確認。ビジネスエンティティは論理削除（status管理）、分類・マスターデータ系は物理削除（参照整合性チェック付き）。カテゴリにはstatusカラムがなく論理削除は不適切 |
| 階層ツリーデータ管理 | BE側ツリー構築 / FE側ツリー構築 | FE側ツリー構築 | F-03-03で確認。APIはフラットリスト（parentId付き）を返し、FEでbuildTree()によりツリー構造を再構築。BE側ツリー構築は再帰的JSON生成が複雑でキャッシュ・ソートの柔軟性が低い |
| エンティティコード生成 | タイムスタンプベース / DBシーケンスベース | DBシーケンスベース | F-03-03で確認。現行のCAT-{currentTimeMillis}は高負荷時の衝突リスクあり。シーケンスで一意性を保証 |
| 循環参照防止 | なし / BEバリデーション | BEバリデーション | F-03-03で確認。自己参照FK（parent_id）の循環を更新時にServiceレイヤで検出。祖先チェーン走査で検出し422を返す |
| 管理画面レイアウト | 画面遷移型 / インラインCRUD（2カラム） / インラインCRUD（トグル） | インラインCRUD（2種併用） | F-03-03, F-03-04で確認。2カラム型: リストを見ながら編集（カテゴリ管理）。トグル型: フォームが大きい場合に一覧⇔フォーム排他切替（バンドル管理） |
| 一覧表示方式 | データテーブル / カードリスト | 使い分け | F-03-04で確認。テーブル: 件数多・ページング・ソート必要（製品一覧等）。カード: 件数少・リッチ情報表示（バンドル管理等） |
| オートコンプリートデータソース | 事前全件取得+FEフィルタ / サーバーサイド検索API | サーバーサイド検索API | F-03-04で確認。現行はsize=100の先頭100件をFEフィルタ（101件目以降は追加不可、技術的負債）。移行後はkeywordクエリパラメータでサーバーサイド検索（size=10）に変更 |
| 派生フィールド計算 | FEのみ / BEのみ / FE+BE二重計算 | FE+BE二重計算 | F-03-04で確認。FEはリアルタイムプレビュー用、BEは権威的計算。単純な四則演算であれば二重計算は許容。端数処理はFE/BE統一（Math.floor↔RoundingMode.FLOOR） |
| ウィザード vs 単一ページフォーム | 全項目1ページ / マルチステップウィザード | 使い分け | F-03-05で確認。新規作成は入力項目が多くウィザード（初回ガイダンス）、編集は既存データの部分更新で単一ページ（直接アクセス）。同一ドメインの作成/編集でUI構成を分離するのは妥当 |
| 非同期フィールドバリデーション | 送信時一括チェック / リアルタイムチェック | リアルタイムチェック（AsyncValidator） | F-03-05で確認。SKU重複をdebounce(300ms)でリアルタイム検証。ステータスインジケーター（idle/checking/available/duplicate）で即時フィードバック |
| ファイルアップロード戦略 | Deferred一括 / Immediate即時 | 使い分け | F-03-05で確認。新規作成（親ID未存在）はDeferred+forkJoin並列アップロード、編集（親ID存在）はImmediate即時API呼び出し |
| 作成/編集フォーム共通化 | コンポーネント共用（mode切替） / フォーム定義のみ共有 / 完全分離 | フォーム定義のみ共有 | F-03-05で確認。作成（ウィザード）と編集（単一ページ）でUI構成が異なるためコンポーネント共用は困難。FormGroup定義を共有サービスに抽出し約90%の重複を排除 |
| 比較選択UI | 行クリック兼用 / チェックボックス分離 | チェックボックス分離 | F-04-01で確認。行クリックは詳細遷移に使用するため、比較選択はチェックボックスで分離。選択操作と詳細遷移を混同しない |
| 比較画面遷移 | モーダル表示 / 専用ページ遷移 | 専用ページ遷移（クエリパラメータ） | F-04-01で確認。比較データ量が多く（評価詳細・パフォーマンス・連絡先等）モーダルでは収まらない。/suppliers/compare?ids=1,5,10 形式で遷移 |
| 星評価表示 | テキスト表示のみ / 星アイコン+数値 | 星アイコン+数値 | F-04-01で確認。視覚的な星表示により一覧でのスキャナビリティが向上。半星対応で0.5単位の評価差を表現可能 |
| サプライヤーフィルタ移行 | クライアントサイド維持 / サーバーサイド移行 | サーバーサイド移行 | F-04-01で確認。現行は全フィルタ（検索・ステータス・評価）がクライアントサイド実装（技術的負債）。BE側にsearchByName()やstatusクエリパラメータが既に存在するため、移行後はサーバーサイドフィルタに統一 |

---

## 未確認事項

- 各機能（F-04〜F-11, F-13）のUI仕様・API仕様の詳細（順次確認予定。F-03-01〜F-03-05は確認済み）
- Quarkus のバージョン選定（安定版を明示的に指定する。CLAUDE.md ルールに従う）
- Angular のバージョン選定（17.x の最新パッチ or 18.x への更新判断）
- keycloak-angular / keycloak-js のバージョン選定
- Quarkus ネイティブビルド（GraalVM）の採否（JVMモードを基本とする想定）
- メール送信機能の移行方針（現行は MAIL_ENABLED=false がデフォルト）
- CDIイベント（InventoryEvent, OrderEvent）の具体的な処理内容
- ロール別アクセス制御の詳細（各リソース・各メソッドの具体的なロール設定。F-03-01は現行@RolesAllowed未設定、移行後は全メソッドにロール制御を明示）
- 4スケジューラの正確な実行スケジュール（BudgetAlertScheduler以外）
- チャートライブラリの選定（ダッシュボードの棒グラフ/円グラフの実装方式）
- 通知パネルのUI設計（現行未実装、移行時に新規実装する場合の画面仕様）
- 通知のEntity/DB不一致解消のマイグレーション（V031以降のスキーマ変更内容）
- Keycloak 26.xでのユーザープロフィール取得の正確なAPI（loadUserProfile vs /account）
- 親カテゴリ選択時の子カテゴリ製品包含（F-03-01で確認: 現行は完全一致のみ。移行後もこの動作を維持するか、階層検索に変更するか）
- DRAFTステータスのフィルタ選択肢への追加要否（F-03-01で確認: インポート機能で使用されるがフィルタ選択肢に未掲載）
- 検索のデバウンス実装詳細（F-03-01で確認: 現行はデバウンスなし。移行後は300msデバウンスを標準化）
- 変更履歴が多数ある場合のページング対応（F-03-02で確認: 現行はページングなし・全件取得。一般的には数十件程度でページング不要だが、大量変更がある場合は検討）
- ProductAlternativeエンティティのデータ件数とFE表示の対応（F-03-02で確認: product ID=1ではalternatives=[]）
- ドキュメントダウンロードの実ファイル存在確認（F-03-02で確認: filePathが設定されているがファイルの実在は未確認）
- 画像のサムネイル/フルサイズ切替機能の要否（F-03-02で確認: 現行は単一サイズ表示のみ）
- ロール別の編集・削除ボタン表示制御（F-03-02で確認: 現行は全ロールで表示。移行後はVIEWERに編集不可、VIEWER/BUYERに削除不可の制御が必要な可能性）
- カテゴリ並べ替えの永続化要否（F-03-03で確認: 現行は上下移動がクライアントサイドのみで非永続化。移行時にsort_orderカラム+APIを追加するか要判断）
- productCountの累計表示要否（F-03-03で確認: 現行は直接属する製品数のみ。子カテゴリの製品数を含む累計が業務上必要かは未確認）
- カテゴリ管理のロール制限（F-03-03で確認: 現行は@RolesAllowed未設定。移行後はADMIN/MANAGERのみCRUD可能とするのが妥当だが、要件として確認が必要）
- バンドル管理のロール制限（F-03-04で確認: 現行は@RolesAllowed未設定。カテゴリ管理と同様、ADMIN/MANAGERのみCRUD可能とするのが妥当）
- バンドル有効期間（F-03-04で確認: DB上にvalid_from/valid_untilカラムがあるがFEでは使用していない。有効期間による自動ステータス変更機能の要否）
- バンドル価格の整合性（F-03-04で確認: 一覧カードのtotalPriceはAPI応答時にbundleItemsの現在の製品単価から再計算されるが、bundlePriceはDB保存値。製品単価変更時に乖離する。移行後の対応方針）
- バンドル構成製品のsort_order（F-03-04で確認: DB上にsort_orderカラムがあるがFEで未使用。構成製品の表示順序の保証要否）
- 製品登録成功後のリダイレクト先（F-03-05で確認: 製品一覧 or 製品詳細。現行ソースは製品一覧へ遷移）
- 製品登録後の画像/ドキュメント部分アップロード失敗時のリカバリーUX（F-03-05で確認: 親エンティティは登録済みだがファイル不完全。編集画面への誘導メッセージの要否）
- 製品登録/更新のロール制限（F-03-05で確認: 現行は@RolesAllowed未設定。ADMIN/MANAGER/BUYERのみCRUD可能とするのが妥当）
- ファイルアップロードのサイズ制限（F-03-05で確認: 現行はフロント/バックエンドともにサイズ制限なし。移行後の制限値）
- 他の新規作成画面（サプライヤー、発注書等）のウィザード化要否（F-03-05で確認: 製品は5ステップウィザード。同様のパターンが他にもあるか）
- サプライヤー比較画面の詳細表示内容（F-04-01で確認: 比較画面はローディング中で完全確認できず。F-04-02の仕様確認時に比較画面もカバーする可能性）
- サプライヤー管理のロール制限（F-04-01で確認: 現行は@RolesAllowed未設定。ADMIN/MANAGER/BUYERのみCRUD可能、VIEWERは参照のみとするのが妥当）
- サプライヤーステータス値の正規化（F-04-01で確認: DB値ACTIVE/INACTIVE/SUSPENDED/PENDING_APPROVAL、FEフィルタ値ACTIVE/INACTIVE/PENDING/BLOCKED、テーブル表示ラベル有効/停止中/承認待ちの三重不一致。BLOCKEDはDBに存在しない。移行時にEnum統一が必要）
- サプライヤー一覧のemail/phone空問題（F-04-01で確認: enrichDto()がprimary contactから取得するがコンタクトデータ未設定で全件空文字。移行後のサプライヤー一覧表示項目の妥当性）
- 星評価の入力（評価登録）UIの要否（F-04-01で確認: 現時点ではapp-star-ratingは読み取り専用。F-04-02の評価履歴タブで新規評価登録が必要な場合、interactive modeの追加を検討）
- 比較API（GET /api/suppliers/compare）のN+1クエリ解消（F-04-01で確認: getPerformanceReport()内でサプライヤーごとに複数の集計クエリが発生。移行後はJOIN/サブクエリで一括取得）
- 比較API（GET /api/suppliers/compare）のcurrentRating常にnull問題（F-04-01で確認: Supplierエンティティからratingフィールドが削除されたため。移行後はSupplierRatingの平均値を使用）
