# 機能インベントリ

## 大分類一覧

| 大分類番号 | 大分類名 | 画面数 | 担当者 | ステータス |
|---|---|---|---|---|
| F-01 | 認証 | 2 | - | gherkin-created |
| F-02 | ダッシュボード | 2 | - | gherkin-created |
| F-03 | 製品カタログ | 5 | - | discovered |
| F-04 | サプライヤー | 2 | - | discovered |
| F-05 | 調達管理 | 9 | - | discovered |
| F-06 | 在庫管理 | 7 | - | discovered |
| F-07 | 倉庫管理 | 3 | - | discovered |
| F-08 | 価格管理 | 3 | - | discovered |
| F-09 | レポート | 4 | - | discovered |
| F-10 | 管理者設定 | 9 | - | discovered |
| F-11 | インポート/エクスポート | 1 | - | discovered |
| F-12 | 共通機能 | 1 | - | gherkin-created |
| F-13 | バッチ・ジョブ | 0 | - | discovered |

---

## F-01: 認証

### F-01-01: ログイン画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-01-01-001 | ユーザー名入力 | 入力項目 | ユーザー名またはメールアドレス入力 | /realms/proquip/... | specified |
| F-01-01-002 | パスワード入力 | 入力項目 | パスワード入力 | /realms/proquip/... | specified |
| F-01-01-003 | ログインボタン | ボタン | ログイン実行 | /realms/proquip/... | specified |
| F-01-01-004 | 言語切替 | リンク | 表示言語変更 | /realms/proquip/... | specified |
| F-01-01-005 | パスワードリセットリンク | リンク | パスワードリセット画面への遷移 | /realms/proquip/... | specified |

### F-01-02: パスワードリセット画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-01-02-001 | パスワードリセット画面 | 画面 | パスワードリセット用画面 | /realms/proquip/login-actions/reset-credentials | specified |

移行設計方針:
- 現行同様にKeycloakによるOIDC認証を継続（Keycloak 26.6.2）
- Keycloak 26.x（Quarkus版）では `/auth/` プレフィックスが廃止済み → URLは `/realms/proquip/...` に変更
- BE側: quarkus-oidc によるJWT検証（現行のJWT署名検証なしの技術的負債を解消）
- FE側: keycloak-js 26.x を使用（keycloak-angular 15.x → keycloak-angular 16.x 以降へ更新）

未確認事項:
- パスワードリセット画面の詳細（Keycloak管理のため画面構成未確認）
- 認証エラーメッセージの表示パターン
- Keycloak管理画面はスコープ外

---

## F-02: ダッシュボード

### F-02-01: ダッシュボード画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-02-01-001 | 発注件数カード | 表示項目 | 発注件数（保留中・承認済み） | /dashboard | specified |
| F-02-01-002 | 在庫アラートカード | 表示項目 | 在庫不足の製品数 | /dashboard | specified |
| F-02-01-003 | 承認待ちカード | 表示項目 | 承認が必要なタスク数 | /dashboard | specified |
| F-02-01-004 | 予算消化率カード | 表示項目 | 予算消化率表示 | /dashboard | specified |
| F-02-01-005 | 月別発注金額推移グラフ | 表示項目 | 月別発注金額の推移チャート（プレースホルダー） | /dashboard | specified |
| F-02-01-006 | カテゴリ別支出割合 | 表示項目 | カテゴリ別支出円グラフ（プレースホルダー） | /dashboard | specified |
| F-02-01-007 | 最近の発注テーブル | テーブル | 最近の発注一覧表示 | /dashboard | specified |
| F-02-01-008 | すべて表示リンク（発注） | リンク | 発注一覧への遷移 | /dashboard | specified |
| F-02-01-009 | 在庫アラートテーブル | テーブル | 在庫アラート一覧表示 | /dashboard | specified |
| F-02-01-010 | すべて表示リンク（在庫） | リンク | 在庫管理への遷移 | /dashboard | specified |

### F-02-02: マイタスク画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-02-02-001 | マイタスク画面 | 画面 | 自分の承認待ちタスク等を表示 | /dashboard/tasks | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: MyTasksComponent（app/features/dashboard/my-tasks/）
- API: GET /api/dashboard/pending-tasks

---

## F-03: 製品カタログ

### F-03-01: 製品一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-03-01-001 | 検索テキストボックス | 入力項目 | 製品名・SKUの検索 | /products | specified |
| F-03-01-002 | カテゴリフィルタ | 入力項目 | カテゴリでの絞り込み（20カテゴリ） | /products | specified |
| F-03-01-003 | メーカーフィルタ | 入力項目 | メーカーでの絞り込み（15メーカー） | /products | specified |
| F-03-01-004 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（有効/無効/廃番/保留） | /products | specified |
| F-03-01-005 | 製品一覧テーブル | テーブル | SKU・製品名・カテゴリ・メーカー・単価・ステータス・在庫数 | /products | specified |
| F-03-01-006 | テーブルソート | 操作 | 列ヘッダクリックによるソート | /products | specified |
| F-03-01-007 | ページング | ナビゲーション | ページ切り替え（20件/ページ、全100件） | /products | specified |
| F-03-01-008 | カテゴリ管理ボタン | ボタン | カテゴリ管理画面への遷移 | /products | specified |
| F-03-01-009 | バンドル管理ボタン | ボタン | バンドル管理画面への遷移 | /products | specified |
| F-03-01-010 | CSV出力ボタン | ボタン | 製品一覧のCSVエクスポート | /products | specified |
| F-03-01-011 | 新規登録ボタン | ボタン | 製品新規登録画面への遷移 | /products | specified |
| F-03-01-012 | 製品行クリック | 操作 | 製品詳細画面への遷移 | /products | specified |

### F-03-02: 製品詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-03-02-001 | 製品ヘッダ情報 | 表示項目 | 製品名・ステータス・SKU・カテゴリ・メーカー | /products/:id | specified |
| F-03-02-002 | 一覧に戻るボタン | ボタン | 製品一覧への遷移 | /products/:id | specified |
| F-03-02-003 | 編集ボタン | ボタン | 製品編集モードへの切り替え | /products/:id | specified |
| F-03-02-004 | 削除ボタン | ボタン | 製品削除（論理削除: DISCONTINUED） | /products/:id | specified |
| F-03-02-005 | 基本情報タブ | タブ | 製品名・SKU・説明・カテゴリ・メーカー・ステータス | /products/:id | specified |
| F-03-02-006 | 価格・数量セクション | 表示項目 | 単価・単位・最低発注数・リードタイム | /products/:id | specified |
| F-03-02-007 | 物理情報セクション | 表示項目 | 重量・寸法 | /products/:id | specified |
| F-03-02-008 | 在庫状況セクション | 表示項目 | 合計在庫・予約済み・利用可能 | /products/:id | specified |
| F-03-02-009 | 管理情報セクション | 表示項目 | 登録日・最終更新日・備考 | /products/:id | specified |
| F-03-02-010 | 仕様タブ | タブ | 製品仕様（キーバリューテーブル） | /products/:id | specified |
| F-03-02-011 | 画像タブ | タブ | 製品画像 | /products/:id | specified |
| F-03-02-012 | 代替品タブ | タブ | 代替製品一覧 | /products/:id | specified |
| F-03-02-013 | サプライヤータブ | タブ | 取扱サプライヤー一覧 | /products/:id | specified |
| F-03-02-014 | ドキュメントタブ | タブ | 関連ドキュメント | /products/:id | specified |
| F-03-02-015 | 変更履歴タブ | タブ | 製品変更履歴 | /products/:id | specified |

### F-03-03: カテゴリ管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-03-03-001 | カテゴリツリー | 表示項目 | 親子関係を持つカテゴリ一覧 | /products/categories | api-confirmed |
| F-03-03-002 | 新規カテゴリボタン | ボタン | 新規カテゴリ作成 | /products/categories | api-confirmed |
| F-03-03-003 | カテゴリ折りたたみ | 操作 | カテゴリツリーの展開・折りたたみ | /products/categories | api-confirmed |
| F-03-03-004 | 上下移動ボタン | ボタン | カテゴリの表示順変更 | /products/categories | api-confirmed |
| F-03-03-005 | 子カテゴリ追加ボタン | ボタン | 子カテゴリの追加 | /products/categories | api-confirmed |
| F-03-03-006 | カテゴリ編集ボタン | ボタン | カテゴリ名の編集 | /products/categories | api-confirmed |
| F-03-03-007 | カテゴリ削除ボタン | ボタン | カテゴリ削除 | /products/categories | api-confirmed |
| F-03-03-008 | 製品数表示 | 表示項目 | カテゴリに属する製品数 | /products/categories | api-confirmed |

### F-03-04: バンドル管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-03-04-001 | バンドル一覧 | 表示項目 | バンドル商品の一覧表示 | /products/bundles | specified |
| F-03-04-002 | 新規バンドル作成ボタン | ボタン | 新規バンドル作成 | /products/bundles | specified |
| F-03-04-003 | バンドル構成製品 | 表示項目 | バンドルに含まれる製品と数量 | /products/bundles | specified |
| F-03-04-004 | バンドル価格情報 | 表示項目 | 定価合計・割引率・バンドル価格 | /products/bundles | specified |
| F-03-04-005 | バンドル編集ボタン | ボタン | バンドル編集 | /products/bundles | specified |
| F-03-04-006 | バンドル削除ボタン | ボタン | バンドル削除 | /products/bundles | specified |
| F-03-04-007 | バンドルステータス | 表示項目 | バンドルの有効・無効 | /products/bundles | specified |

### F-03-05: 製品新規登録/編集画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-03-05-001 | ウィザードナビゲーション | ナビゲーション | 5ステップウィザードのステップインジケーター・前へ/次へ/キャンセル | /products/new | specified |
| F-03-05-002 | 基本情報入力 | フォーム | 製品名・SKU・説明・カテゴリ・メーカー・ステータス入力 | /products/new | specified |
| F-03-05-003 | SKU重複チェック | バリデーション | SKU入力時のリアルタイム重複チェック（API連携） | /products/new, /products/:id/edit | specified |
| F-03-05-004 | 価格・在庫情報入力 | フォーム | 単価・単位・最低発注数・リードタイム・重量・寸法入力 | /products/new | specified |
| F-03-05-005 | 仕様テーブル入力 | フォーム | 動的キーバリューペア・行追加/削除・備考 | /products/new, /products/:id/edit | specified |
| F-03-05-006 | 画像アップロード | 操作 | PNG/JPG画像アップロード・プレビュー・プライマリ設定 | /products/new | specified |
| F-03-05-007 | ドキュメントアップロード | 操作 | PDFドキュメントアップロード・タイプ選択 | /products/new | specified |
| F-03-05-008 | 確認・登録実行 | 操作 | レビュー画面表示・登録送信 | /products/new | specified |
| F-03-05-009 | 編集フォーム | フォーム | 既存データ読込・セクション配置（ウィザードなし） | /products/:id/edit | specified |
| F-03-05-010 | 画像管理 | 操作 | 既存画像表示・削除・追加（即時反映） | /products/:id/edit | specified |
| F-03-05-011 | ドキュメント管理 | 操作 | 既存ドキュメント表示・削除・追加・タイプ選択 | /products/:id/edit | specified |
| F-03-05-012 | 更新実行 | 操作 | バリデーション・更新送信 | /products/:id/edit | specified |

未確認事項:
- 権限制御の詳細（ProductResourceに@RolesAllowed未設定、全認証ユーザーが操作可能）
- 画像アップロード時のサイズ制限（ソースコード上は制限なし）
- unsaved changesガード未実装

---

## F-04: サプライヤー

### F-04-01: サプライヤー一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-04-01-001 | 検索テキストボックス | 入力項目 | サプライヤー名・コード・メールの部分一致検索（クライアントサイド） | /suppliers | specified |
| F-04-01-002 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（すべて/取引中/取引停止/審査中/ブロック済み） | /suppliers | specified |
| F-04-01-003 | 最低評価フィルタ | 入力項目 | 評価での絞り込み（指定なし/1以上〜5） | /suppliers | specified |
| F-04-01-004 | サプライヤー一覧テーブル | テーブル | 比較・コード・会社名・ステータス・評価・メール・電話番号（7列、全12件） | /suppliers | specified |
| F-04-01-005 | 比較チェックボックス | 入力項目 | サプライヤー比較選択（最大3件、3件選択時に残りdisabled） | /suppliers | specified |
| F-04-01-006 | 比較ボタン | ボタン | 選択サプライヤーの比較（2件以上で有効、/suppliers/compare?ids=へ遷移） | /suppliers | specified |
| F-04-01-007 | 新規登録ボタン | ボタン | サプライヤー新規登録（/suppliers/newへ遷移） | /suppliers | specified |
| F-04-01-008 | サプライヤー行クリック | 操作 | サプライヤー詳細画面（/suppliers/:id）への遷移 | /suppliers | specified |

### F-04-02: サプライヤー詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-04-02-001 | サプライヤーヘッダ情報 | 表示項目 | 会社名(h2)・ステータスバッジ・コード・評価(星+数値、ただしAPI rating=0固定) | /suppliers/:id | specified |
| F-04-02-002 | 一覧に戻るボタン | ボタン | サプライヤー一覧(/suppliers)への遷移 | /suppliers/:id | specified |
| F-04-02-003 | 編集ボタン | ボタン | サプライヤー編集画面(/suppliers/:id/edit)への遷移 | /suppliers/:id | specified |
| F-04-02-004 | 削除ボタン | ボタン | 確認ダイアログ表示→DELETE /api/suppliers/{id}→一覧遷移 | /suppliers/:id | specified |
| F-04-02-005 | 基本情報タブ | タブ | 会社情報テーブル（名前・カナ・コード・住所・電話・メール・Web・支払条件・備考、全てAPI未返却で"-"表示） | /suppliers/:id | specified |
| F-04-02-006 | 連絡先セクション | 表示項目 | 担当者カード（名前・主担当タグ・部署・役職・電話・メール）、空状態対応 | /suppliers/:id | specified |
| F-04-02-007 | 製品タブ | タブ | 取扱製品テーブル(SKU・製品名・仕入先SKU・単価・リードタイム)、追加/詳細遷移/削除、空状態対応 | /suppliers/:id | specified |
| F-04-02-008 | 契約タブ | タブ | 契約テーブル(番号・期間・ステータス・条件)、CRUD(モーダル)、空状態対応 | /suppliers/:id | specified |
| F-04-02-009 | 評価履歴タブ | タブ | 平均評価サマリー、評価エントリリスト(日付・星・4カテゴリバー・コメント)、新規評価モーダル(4スライダー+コメント)、空状態対応 | /suppliers/:id | specified |
| F-04-02-010 | 認証タブ | タブ | 認証カード(種別・ステータス・番号・発行日・有効期限)、CRUD(モーダル)、空状態対応 | /suppliers/:id | specified |

未確認事項:
- サプライヤー新規登録/編集フォームの項目（/suppliers/new, /suppliers/:id/edit）
- ヘッダのrating=0.0問題の移行後対応方針
- 基本情報の各フィールド(nameKana, address, website等)がAPIで返却されない問題

---

## F-05: 調達管理

### F-05-01: 購買依頼一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-01-001 | 新規依頼作成ボタン | ボタン | 購買依頼の新規作成（/procurement/requisitions/newへ遷移） | /procurement/requisitions | specified |
| F-05-01-002 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（すべて/下書き/申請中/承認済み/却下/キャンセル）、サーバーサイドフィルタ | /procurement/requisitions | specified |
| F-05-01-003 | 部門フィルタ | 入力項目 | 部門での絞り込み（ハードコード7部門）、クライアントサイドフィルタ | /procurement/requisitions | specified |
| F-05-01-004 | 作成日開始フィルタ | 入力項目 | 作成日範囲（開始）、HTML5 date input、クライアントサイドフィルタ | /procurement/requisitions | specified |
| F-05-01-005 | 作成日終了フィルタ | 入力項目 | 作成日範囲（終了）、HTML5 date input、クライアントサイドフィルタ | /procurement/requisitions | specified |
| F-05-01-006 | フィルタクリアボタン | ボタン | 全フィルタ条件の初期化（4フィルタ+ページ番号リセット） | /procurement/requisitions | specified |
| F-05-01-007 | 購買依頼一覧テーブル | テーブル | 依頼番号・依頼者・部門・金額・ステータス・作成日・操作（7列）、app-data-table使用、全17件 | /procurement/requisitions | specified |
| F-05-01-008 | テーブルソート | 操作 | 全6列ソート可能（初期: 作成日降順）、クライアントサイドソート | /procurement/requisitions | specified |
| F-05-01-009 | 申請ボタン | ボタン | DRAFTのみ表示、POST /api/requisitions/{id}/submit（DRAFT→SUBMITTED）、確認ダイアログなし | /procurement/requisitions | specified |
| F-05-01-010 | 取消ボタン | ボタン | DRAFT/SUBMITTEDのみ表示、DELETE /api/requisitions/{id}（→CANCELLED）、確認ダイアログなし | /procurement/requisitions | specified |
| F-05-01-011 | 依頼行クリック | 操作 | 購買依頼詳細画面（/procurement/requisitions/:id）への遷移 | /procurement/requisitions | specified |

未確認事項:
- 部門フィルタ選択肢とDB部門マスタの不一致（情報システム部、経営企画部、人事部、調達部が選択肢にない）
- ステータスフィルタにPARTIALLY_ORDERED/ORDERED/CONVERTEDが欠落
- 部門・日付・ソートのクライアントサイド処理（ページサイズ超過時の不具合リスク）
- 申請・取消の確認ダイアログ追加要否
- RequisitionResourceの@RolesAllowed未設定（権限制御なし）

### F-05-02: 購買依頼詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-02-001 | 一覧へ戻るボタン | ボタン | 一覧画面への遷移 | /procurement/requisitions/:id | discovered |
| F-05-02-002 | 基本情報セクション | 表示項目 | 依頼番号・依頼者・部門・ステータス・緊急度・希望納期・作成日・更新日・依頼理由 | /procurement/requisitions/:id | discovered |
| F-05-02-003 | 依頼品目テーブル | テーブル | 製品名・数量・見積単価・小計・備考 | /procurement/requisitions/:id | discovered |
| F-05-02-004 | 合計金額 | 表示項目 | 依頼品目の合計金額 | /procurement/requisitions/:id | discovered |
| F-05-02-005 | 承認申請ボタン | ボタン | 承認申請の実行 | /procurement/requisitions/:id | discovered |

### F-05-03: 発注書一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-03-001 | CSV出力ボタン | ボタン | 発注一覧のCSVエクスポート | /procurement/orders | discovered |
| F-05-03-002 | 新規発注作成ボタン | ボタン | 発注書の新規作成 | /procurement/orders | discovered |
| F-05-03-003 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（下書き/申請中/承認待ち/承認済み/発注済み/一部入荷/入荷済み/キャンセル） | /procurement/orders | discovered |
| F-05-03-004 | サプライヤーフィルタ | 入力項目 | サプライヤーでの絞り込み（12社） | /procurement/orders | discovered |
| F-05-03-005 | 発注日開始フィルタ | 入力項目 | 発注日範囲（開始） | /procurement/orders | discovered |
| F-05-03-006 | 発注日終了フィルタ | 入力項目 | 発注日範囲（終了） | /procurement/orders | discovered |
| F-05-03-007 | 金額下限フィルタ | 入力項目 | 金額範囲（下限） | /procurement/orders | discovered |
| F-05-03-008 | 金額上限フィルタ | 入力項目 | 金額範囲（上限） | /procurement/orders | discovered |
| F-05-03-009 | フィルタクリアボタン | ボタン | フィルタ条件の初期化 | /procurement/orders | discovered |
| F-05-03-010 | 発注書一覧テーブル | テーブル | 発注番号・サプライヤー・ステータス・発注日・納品予定日・合計金額 | /procurement/orders | discovered |
| F-05-03-011 | テーブルソート | 操作 | 発注日でのソート | /procurement/orders | discovered |
| F-05-03-012 | 発注行クリック | 操作 | 発注書詳細画面への遷移 | /procurement/orders | discovered |

### F-05-04: 承認待ちキュー画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-04-001 | すべてタブ | タブ | 全承認待ちアイテム表示 | /procurement/approvals | discovered |
| F-05-04-002 | 購買依頼タブ | タブ | 購買依頼の承認待ち表示 | /procurement/approvals | discovered |
| F-05-04-003 | 発注書タブ | タブ | 発注書の承認待ち表示 | /procurement/approvals | discovered |
| F-05-04-004 | 承認待ちカード | 表示項目 | 依頼番号・日付・依頼者・部門・金額 | /procurement/approvals | discovered |
| F-05-04-005 | 承認ボタン | ボタン | 承認実行 | /procurement/approvals | discovered |
| F-05-04-006 | 却下ボタン | ボタン | 却下実行 | /procurement/approvals | discovered |

### F-05-05: 購買依頼新規作成画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-05-001 | 購買依頼新規作成画面 | 画面 | 購買依頼の新規作成フォーム | /procurement/requisitions/new | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: RequisitionCreateComponent
- API: POST /api/requisitions

### F-05-06: 発注書詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-06-001 | 発注書詳細画面 | 画面 | 発注書の詳細表示・ステータス管理 | /procurement/orders/:id | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: OrderDetailComponent
- API: GET /api/purchase-orders/{id}, GET /api/purchase-orders/{id}/approval-history, GET /api/purchase-orders/{id}/status-history

### F-05-07: 発注書新規作成画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-07-001 | 発注書新規作成画面 | 画面 | 発注書の新規作成フォーム | /procurement/orders/new | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: OrderCreateComponent
- API: POST /api/purchase-orders

### F-05-08: 入荷処理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-08-001 | 入荷処理画面 | 画面 | 発注書に対する入荷検品処理 | /procurement/goods-receipt | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: GoodsReceiptComponent
- API: POST /api/purchase-orders/{id}/goods-receipt, POST /api/purchase-orders/{id}/receive
- Entity: GoodsReceipt, GoodsReceiptItem

### F-05-09: 返品管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-05-09-001 | 返品管理画面 | 画面 | サプライヤーへの返品管理 | /procurement/returns | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: ReturnManagementComponent
- API: /api/returns (ReturnResource)
- Entity: ReturnToSupplier

未確認事項:
- 購買依頼新規作成フォームの詳細項目
- 発注書新規作成フォームの詳細項目
- 発注書詳細画面の内容
- 承認・却下時のコメント入力有無
- ステータス遷移図（下書き→申請中→承認済み→発注済み→入荷済み→完了 等）
- 入荷処理画面の詳細項目
- 返品管理画面の詳細項目
- 購買依頼から発注への変換処理（POST /api/requisitions/{id}/convert-to-order）

---

## F-06: 在庫管理

### F-06-01: 在庫一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-01-001 | サマリーカード（在庫品目数） | 表示項目 | 在庫品目数の表示 | /inventory | discovered |
| F-06-01-002 | サマリーカード（在庫総額） | 表示項目 | 在庫総額の表示 | /inventory | discovered |
| F-06-01-003 | サマリーカード（在庫不足） | 表示項目 | 在庫不足品目数 | /inventory | discovered |
| F-06-01-004 | サマリーカード（過剰在庫） | 表示項目 | 過剰在庫品目数 | /inventory | discovered |
| F-06-01-005 | 倉庫フィルタ | 入力項目 | 倉庫での絞り込み（3倉庫） | /inventory | discovered |
| F-06-01-006 | カテゴリフィルタ | 入力項目 | カテゴリでの絞り込み（5カテゴリ） | /inventory | discovered |
| F-06-01-007 | 在庫ステータスフィルタ | 入力項目 | ステータスでの絞り込み（在庫不足/発注点近傍/適正在庫/過剰在庫） | /inventory | discovered |
| F-06-01-008 | フィルタクリアボタン | ボタン | フィルタ条件の初期化 | /inventory | discovered |
| F-06-01-009 | 在庫一覧テーブル | テーブル | 製品名・SKU・倉庫・数量・引当数・有効在庫・発注点・ステータス | /inventory | discovered |
| F-06-01-010 | テーブルソート | 操作 | 製品名でのソート | /inventory | discovered |
| F-06-01-011 | エクスポートボタン | ボタン | 在庫データのエクスポート | /inventory | discovered |
| F-06-01-012 | 在庫移動ボタン | ボタン | 在庫移動操作 | /inventory | discovered |

### F-06-02: 在庫詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-02-001 | 在庫詳細画面 | 画面 | 在庫アイテムの詳細表示 | /inventory/:id | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: InventoryDetailComponent
- API: GET /api/inventory/{id}

### F-06-03: 在庫移動作成画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-03-001 | 在庫移動作成画面 | 画面 | 倉庫間の在庫移動を作成 | /inventory/transfer/new | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: StockTransferCreateComponent
- API: POST /api/inventory/transfer, POST /api/inventory/transfers

### F-06-04: 在庫移動一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-04-001 | 在庫移動一覧画面 | 画面 | 在庫移動の一覧と状態管理 | /inventory/transfers | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: StockTransferListComponent
- API: GET /api/inventory/transfers, POST /api/inventory/transfers/{id}/complete

### F-06-05: 在庫調整画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-05-001 | 在庫調整画面 | 画面 | 在庫数量の手動調整 | /inventory/adjustments | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: InventoryAdjustmentComponent
- API: POST /api/inventory/{id}/adjust

### F-06-06: 棚卸画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-06-001 | 棚卸画面 | 画面 | 実地棚卸の実施・結果記録 | /inventory/stocktaking | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: InventoryCountComponent
- API: GET /api/inventory/stock-check, POST /api/inventory/stock-check/save, POST /api/inventory/count

### F-06-07: 取引履歴画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-06-07-001 | 取引履歴画面 | 画面 | 在庫取引の履歴表示 | /inventory/transactions | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: TransactionHistoryComponent
- API: GET /api/inventory/transactions

未確認事項:
- 在庫移動画面の詳細
- エクスポートの出力形式
- 在庫詳細画面の表示項目
- 在庫調整の承認フロー有無
- 棚卸結果の差異処理（sp_adjust_inventory_after_countとの関連）
- 取引履歴のフィルタ条件

---

## F-07: 倉庫管理

### F-07-01: 倉庫一覧画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-07-01-001 | 新規作成ボタン | ボタン | 倉庫の新規作成 | /warehouses | discovered |
| F-07-01-002 | 倉庫一覧テーブル | テーブル | コード・倉庫名・住所・キャパシティ・使用率・ゾーン数・ステータス | /warehouses | discovered |
| F-07-01-003 | テーブルソート | 操作 | 倉庫名でのソート | /warehouses | discovered |
| F-07-01-004 | 倉庫行クリック | 操作 | 倉庫詳細画面への遷移 | /warehouses | discovered |

### F-07-02: 倉庫詳細画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-07-02-001 | 倉庫情報セクション | 表示項目 | コード・名称・住所・管理者・電話・ステータス | /warehouses/:id | discovered |
| F-07-02-002 | キャパシティ使用率 | 表示項目 | 使用率と容量表示 | /warehouses/:id | discovered |
| F-07-02-003 | 稼働率推移グラフ | 表示項目 | 稼働率推移グラフ（実装予定） | /warehouses/:id | discovered |
| F-07-02-004 | ゾーン一覧 | 表示項目 | ゾーン名・コード・タイプ・使用率・容量・品目数 | /warehouses/:id | discovered |
| F-07-02-005 | ゾーン追加ボタン | ボタン | ゾーンの追加 | /warehouses/:id | discovered |
| F-07-02-006 | ゾーンロケーション表示ボタン | ボタン | ゾーン内のロケーション表示 | /warehouses/:id | discovered |
| F-07-02-007 | ゾーン編集ボタン | ボタン | ゾーン情報の編集 | /warehouses/:id | discovered |
| F-07-02-008 | ゾーン削除ボタン | ボタン | ゾーンの削除 | /warehouses/:id | discovered |
| F-07-02-009 | 在庫アイテム一覧 | テーブル | 製品名・SKU・数量・引当数・有効在庫・ステータス | /warehouses/:id | discovered |
| F-07-02-010 | レイアウト表示ボタン | ボタン | 倉庫レイアウトの表示 | /warehouses/:id | discovered |
| F-07-02-011 | 一覧へ戻るボタン | ボタン | 倉庫一覧への遷移 | /warehouses/:id | discovered |
| F-07-02-012 | 編集ボタン | ボタン | 倉庫情報の編集 | /warehouses/:id | discovered |
| F-07-02-013 | 削除ボタン | ボタン | 倉庫の削除 | /warehouses/:id | discovered |

### F-07-03: 倉庫レイアウト画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-07-03-001 | 倉庫レイアウト画面 | 画面 | 倉庫のゾーン・ロケーションのレイアウト表示 | /warehouses/:id/layout | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: WarehouseLayoutComponent
- Entity: StorageLocation（通路-棚-段-ビン階層）

未確認事項:
- レイアウト表示画面の詳細
- ロケーション表示の詳細
- ゾーン追加/編集フォームの項目
- 倉庫新規作成/編集フォームの項目

---

## F-08: 価格管理

### F-08-01: 価格リスト管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-08-01-001 | 検索テキストボックス | 入力項目 | 価格リスト名の検索 | /pricing | discovered |
| F-08-01-002 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（有効/下書き/期限切れ/無効） | /pricing | discovered |
| F-08-01-003 | 新規作成ボタン | ボタン | 価格リストの新規作成 | /pricing | discovered |
| F-08-01-004 | 価格リスト一覧テーブル | テーブル | リスト名・説明・通貨・有効開始日・有効終了日・ステータス・アイテム数 | /pricing | discovered |
| F-08-01-005 | 編集ボタン | ボタン | 価格リストの編集 | /pricing | discovered |
| F-08-01-006 | 削除ボタン | ボタン | 価格リストの削除 | /pricing | discovered |

### F-08-02: 価格編集画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-08-02-001 | 価格編集画面 | 画面 | 価格リストの編集（アイテム別価格設定） | /pricing/:id/edit | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: PriceEditComponent
- Entity: PriceListItem（数量階層対応）

### F-08-03: 価格比較画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-08-03-001 | 価格比較画面 | 画面 | 価格リスト間の比較 | /pricing/compare | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: PriceCompareComponent
- DTO: PriceComparisonResult

未確認事項:
- 価格リスト新規作成/編集フォームの項目
- 価格リスト内のアイテム（製品別価格）の管理画面
- 価格比較画面の比較条件

---

## F-09: レポート

### F-09-01: 支出分析レポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-09-01-001 | 開始日フィルタ | 入力項目 | 分析期間の開始日 | /reports/spending | discovered |
| F-09-01-002 | 終了日フィルタ | 入力項目 | 分析期間の終了日 | /reports/spending | discovered |
| F-09-01-003 | 部門フィルタ | 入力項目 | 部門での絞り込み（6部門） | /reports/spending | discovered |
| F-09-01-004 | カテゴリフィルタ | 入力項目 | カテゴリでの絞り込み（5カテゴリ） | /reports/spending | discovered |
| F-09-01-005 | サプライヤーフィルタ | 入力項目 | サプライヤーでの絞り込み（4社） | /reports/spending | discovered |
| F-09-01-006 | リセットボタン | ボタン | フィルタ条件のリセット | /reports/spending | discovered |
| F-09-01-007 | 適用ボタン | ボタン | フィルタ条件の適用 | /reports/spending | discovered |
| F-09-01-008 | 合計支出カード | 表示項目 | 合計支出金額 | /reports/spending | discovered |
| F-09-01-009 | 発注回数カード | 表示項目 | 発注回数 | /reports/spending | discovered |
| F-09-01-010 | 平均発注額カード | 表示項目 | 平均発注額 | /reports/spending | discovered |
| F-09-01-011 | 最多カテゴリカード | 表示項目 | 最多支出カテゴリ | /reports/spending | discovered |
| F-09-01-012 | 支出内訳テーブル | テーブル | カテゴリ/サプライヤー/部門別の発注回数・合計金額・構成比 | /reports/spending | discovered |
| F-09-01-013 | グループ切替 | 入力項目 | カテゴリ別/サプライヤー別/部門別の切替 | /reports/spending | discovered |
| F-09-01-014 | CSVエクスポートボタン | ボタン | レポートのCSVエクスポート | /reports/spending | discovered |

### F-09-02: 在庫評価レポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-09-02-001 | 在庫評価レポート画面 | 画面 | 在庫の金額評価レポート | /reports/inventory-valuation | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: InventoryValuationComponent
- API: GET /api/reports/inventory-valuation
- DBビュー: v_inventory_summary

### F-09-03: サプライヤー実績レポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-09-03-001 | サプライヤー実績レポート画面 | 画面 | サプライヤーの実績・パフォーマンスレポート | /reports/supplier-performance | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: SupplierPerformanceComponent
- API: GET /api/reports/supplier-performance, GET /api/reports/top-suppliers
- DBビュー: v_supplier_performance

### F-09-04: 予算実績対比レポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-09-04-001 | 予算実績対比レポート画面 | 画面 | 予算と実績の対比レポート | /reports/budget-actual | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: BudgetActualComponent
- API: GET /api/reports/budget-vs-actual

未確認事項:
- 各レポートのフィルタ条件・表示項目の詳細
- レポートCSV/Excelエクスポート機能の詳細

---

## F-10: 管理者設定

### F-10-01: ユーザー管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-01-001 | 検索テキストボックス | 入力項目 | ユーザー名・表示名の検索 | /admin/users | discovered |
| F-10-01-002 | ロールフィルタ | 入力項目 | ロールでの絞り込み（システム管理者/倉庫担当者/購買担当者/部門管理者/閲覧者） | /admin/users | discovered |
| F-10-01-003 | 部門フィルタ | 入力項目 | 部門での絞り込み（6部門） | /admin/users | discovered |
| F-10-01-004 | ステータスフィルタ | 入力項目 | ステータスでの絞り込み（有効/無効） | /admin/users | discovered |
| F-10-01-005 | ユーザー一覧テーブル | テーブル | ユーザー名・表示名・メール・部門・ロール・ステータス | /admin/users | discovered |
| F-10-01-006 | ユーザー編集ボタン | ボタン | ユーザー情報の編集 | /admin/users | discovered |
| F-10-01-007 | 注記 | 表示項目 | ユーザー作成はKeycloakで行う旨の注記 | /admin/users | discovered |

### F-10-02: 部門管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-02-001 | 部門追加ボタン | ボタン | 新規部門の追加 | /admin/departments | discovered |
| F-10-02-002 | 部門一覧テーブル | テーブル | コード・部門名・親部門・コストセンター・表示順・状態 | /admin/departments | discovered |
| F-10-02-003 | 部門編集ボタン | ボタン | 部門情報の編集 | /admin/departments | discovered |
| F-10-02-004 | 部門削除ボタン | ボタン | 部門の削除 | /admin/departments | discovered |

### F-10-03: 予算管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-03-001 | 新規予算作成ボタン | ボタン | 新規予算の作成 | /admin/budgets | discovered |
| F-10-03-002 | 会計年度フィルタ | 入力項目 | 会計年度の選択（2023〜2027） | /admin/budgets | discovered |
| F-10-03-003 | 予算データ表示 | 表示項目 | 年度別予算データ | /admin/budgets | discovered |

### F-10-04: ロール・権限管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-04-001 | ロール・権限管理画面 | 画面 | ロールと権限の管理 | /admin/roles | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: RolePermissionComponent
- API: GET /api/users/roles, POST /api/users/roles, PUT /api/users/roles/{roleId}, DELETE /api/users/roles/{roleId}
- Entity: Role, Permission

### F-10-05: システム設定画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-05-001 | システム設定画面 | 画面 | システム全体の設定管理 | /admin/config | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: SystemConfigComponent
- API: GET /api/admin/system-config, PUT /api/admin/system-config/{key}
- Entity: SystemConfiguration（キーバリュー、暗号化対応）

### F-10-06: 監査ログ画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-06-001 | 監査ログ画面 | 画面 | 操作履歴の閲覧・検索・エクスポート | /admin/audit-log | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: AuditLogComponent
- API: GET /api/admin/audit-logs, GET /api/admin/audit-logs/statistics, GET /api/admin/audit-logs/export
- Entity: AuditLog（JSONB old/new値）

### F-10-07: マスターデータ管理画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-07-001 | マスターデータ管理画面 | 画面 | メーカー・単位・通貨・税率等のマスターデータ管理 | /admin/master-data | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: MasterDataComponent
- API: GET /api/master-data/manufacturers, /units, /currencies, /tax-rates
- API: GET /api/admin/export/{type}, POST /api/admin/import

### F-10-08: 委任設定画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-08-001 | 委任設定画面 | 画面 | 承認権限の委任設定 | /admin/delegation | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: DelegationComponent
- API: /api/delegations (DelegationResource)
- Entity: DelegationRule

### F-10-09: 通知設定画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-10-09-001 | 通知設定画面 | 画面 | 通知テンプレートの管理・設定 | /admin/notification-settings | discovered |

ソース構造解析で発見（画面未到達）:
- コンポーネント: NotificationSettingsComponent
- API: /api/notification-templates (NotificationTemplateResource)
- Entity: NotificationTemplate（EMAIL/IN_APP/SMS/WEBHOOK）

未確認事項:
- ユーザー編集フォームの項目
- 部門追加/編集フォームの項目
- 予算作成/編集フォームの項目
- 承認ルール設定画面の有無（/admin/approval-rules はリダイレクトされた）
- ロール・権限管理の詳細項目
- システム設定の設定項目一覧
- 監査ログのフィルタ条件
- マスターデータの編集機能の詳細
- 委任ルールの設定条件
- 通知テンプレートの編集項目

---

## F-11: インポート/エクスポート

### F-11-01: インポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-11-01-001 | インポートタブ | タブ | インポート機能の表示 | /import-export | discovered |
| F-11-01-002 | エンティティタイプ選択 | 入力項目 | インポート対象（製品/サプライヤー/在庫） | /import-export | discovered |
| F-11-01-003 | インポート履歴テーブル | テーブル | ID・タイプ・ファイル名・ステータス・結果・実行日時 | /import-export | discovered |

### F-11-02: エクスポート画面

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-11-02-001 | エクスポートタブ | タブ | エクスポート機能の表示 | /import-export | discovered |
| F-11-02-002 | エンティティタイプ選択 | 入力項目 | エクスポート対象（製品/サプライヤー/在庫） | /import-export | discovered |

未確認事項:
- ファイルアップロード機能の詳細
- エクスポート設定の詳細（フォーマット、フィルタ等）
- インポート時のバリデーション・エラー詳細表示

---

## F-12: 共通機能

### F-12-01: ヘッダー・グローバル機能

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-12-01-001 | メニュー切替ボタン | ボタン | サイドナビゲーションの開閉 | 全画面共通 | specified |
| F-12-01-002 | システムロゴ・タイトル | 表示項目 | ProQuipロゴとシステム名表示 | 全画面共通 | specified |
| F-12-01-003 | グローバル検索 | 入力項目 | グローバル検索ボックス | 全画面共通 | specified |
| F-12-01-004 | 検索ボタン | ボタン | グローバル検索の実行 | 全画面共通 | specified |
| F-12-01-005 | 通知ボタン | ボタン | 通知パネルの表示 | 全画面共通 | specified |
| F-12-01-006 | ユーザーメニュー | ボタン | ユーザー名表示・ドロップダウンメニュー | 全画面共通 | specified |

### F-12-02: サイドナビゲーション

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-12-02-001 | ダッシュボードリンク | リンク | ダッシュボードへの遷移 | 全画面共通 | specified |
| F-12-02-002 | 製品カタログリンク | リンク | 製品カタログへの遷移 | 全画面共通 | specified |
| F-12-02-003 | サプライヤーリンク | リンク | サプライヤーへの遷移 | 全画面共通 | specified |
| F-12-02-004 | 調達管理リンク | リンク | 調達管理への遷移 | 全画面共通 | specified |
| F-12-02-005 | 在庫管理リンク | リンク | 在庫管理への遷移 | 全画面共通 | specified |
| F-12-02-006 | 倉庫管理リンク | リンク | 倉庫管理への遷移 | 全画面共通 | specified |
| F-12-02-007 | 価格管理リンク | リンク | 価格管理への遷移 | 全画面共通 | specified |
| F-12-02-008 | レポートリンク | リンク | レポートへの遷移 | 全画面共通 | specified |
| F-12-02-009 | 管理者設定リンク | リンク | 管理者設定への遷移 | 全画面共通 | specified |
| F-12-02-010 | インポート/エクスポートリンク | リンク | インポート/エクスポートへの遷移 | 全画面共通 | specified |
| F-12-02-011 | バージョン表示 | 表示項目 | システムバージョン（v1.0.0） | 全画面共通 | specified |

### F-12-03: フッター

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-12-03-001 | コピーライト表示 | 表示項目 | コピーライトとバージョン情報 | 全画面共通 | specified |

未確認事項:
- グローバル検索の検索対象・結果表示
- 通知パネルの詳細内容
- ユーザーメニューの詳細（プロフィール、ログアウト等）
- ロール別のメニュー表示制御

---

## F-13: バッチ・ジョブ

ソース構造解析で発見（画面なし・バックエンドのみ）

### F-13-01: 予算アラートジョブ

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-13-01-001 | 予算アラートジョブ | バッチ | 予算消化率チェック（80%/95%閾値）、通知作成 | - | discovered |

- 実装: BudgetAlertScheduler.java（@Singleton @Startup）
- スケジュール: 毎日 8:00（@Schedule(hour="8", minute="0")）

### F-13-02: 在庫不足アラートジョブ

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-13-02-001 | 在庫不足アラートジョブ | バッチ | 在庫不足検知、発注点通知 | - | discovered |

- 実装: LowStockAlertScheduler.java（@Singleton @Startup）
- スケジュール: 要確認

### F-13-03: 発注遅延検知ジョブ

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-13-03-001 | 発注遅延検知ジョブ | バッチ | 納期超過発注書の検出・アラート | - | discovered |

- 実装: OverdueOrderScheduler.java（@Singleton @Startup）
- スケジュール: 要確認

### F-13-04: 通知クリーンアップジョブ

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-13-04-001 | 通知クリーンアップジョブ | バッチ | 古い・アーカイブ済み通知の削除 | - | discovered |

- 実装: NotificationCleanupScheduler.java（@Singleton @Startup）
- スケジュール: 要確認

### F-13-05: インポートジョブクリーンアップ

| 機能ID | 小分類 | 種別 | 概要 | URL | ステータス |
|---|---|---|---|---|---|
| F-13-05-001 | インポートジョブクリーンアップ | バッチ | 完了・失敗したインポートジョブの削除 | - | discovered |

- 実装: ImportJobCleanupScheduler.java（@Singleton @Startup）
- スケジュール: 要確認

未確認事項:
- 各スケジューラの正確な実行スケジュール
- CDIイベント（InventoryEvent, OrderEvent）のObserver処理内容

---

## 全体の未確認事項

- ロール別（ADMIN, MANAGER, BUYER, WAREHOUSE_STAFF, VIEWER）の画面・機能の差異
- 各種新規作成/編集フォームの詳細項目
- Keycloak管理画面（スコープ外だが連携機能として記録）
- 請求書管理の画面（ソースコードにも該当なし）
- REST Resourceの多くに@RolesAllowed未設定（AdminResourceのみ適用）
- ProductValidator と PurchaseOrderValidator のSKUパターン不一致
- フロントエンドとバックエンドのバリデーションルール不一致
- ストアドプロシージャ3本のアプリケーションからの呼び出し有無
- LegacyReportGenerator, OldDataMigrationHelper の利用状況
