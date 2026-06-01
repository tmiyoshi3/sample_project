# ソース構造インベントリ

最終更新: 2026-05-22
ソースパス: proquip/

---

## プロジェクト構成

| モジュール | パッケージ種別 | 役割 |
|---|---|---|
| proquip-parent | POM | 親POM、依存関係管理、プラグイン設定 |
| proquip-common | JAR | 共通DTO、定数、ユーティリティ、例外 |
| proquip-ejb | EJB | ビジネスロジック、JPA Entity、Service、DAO、スケジューラ |
| proquip-web | WAR | REST API（JAX-RS）、フィルタ、例外マッパー |
| proquip-ear | EAR | EJB + WAR + common のパッケージング |
| proquip-db | JAR | Flyway マイグレーション（V001〜V030） |
| proquip-frontend | Angular | Angular 17 SPA（keycloak-angular連携） |

---

## ルーティング

### フロントエンド（Angular）ルーティング

定義ファイル: `proquip-frontend/src/app/app-routing.module.ts`

| パス | コンポーネント/モジュール | 機能ID | ガード | 備考 |
|---|---|---|---|---|
| /dashboard | DashboardModule (lazy) | F-02 | AuthGuard | デフォルトリダイレクト先 |
| /dashboard/tasks | MyTasksComponent | F-02-02 | AuthGuard | 画面未到達 |
| /products | ProductListComponent | F-03-01 | AuthGuard | |
| /products/new | ProductCreateComponent | F-03-05 | AuthGuard | |
| /products/categories | CategoryManagementComponent | F-03-03 | AuthGuard | |
| /products/bundles | BundleManagementComponent | F-03-04 | AuthGuard | |
| /products/:id | ProductDetailComponent | F-03-02 | AuthGuard | |
| /products/:id/edit | ProductEditComponent | F-03-05 | AuthGuard | |
| /suppliers | SupplierListComponent | F-04-01 | AuthGuard | |
| /suppliers/new | SupplierCreateComponent | F-04 | AuthGuard | 画面未到達 |
| /suppliers/compare | SupplierCompareComponent | F-04 | AuthGuard | 画面未到達 |
| /suppliers/:id | SupplierDetailComponent | F-04-02 | AuthGuard | |
| /suppliers/:id/edit | SupplierEditComponent | F-04 | AuthGuard | 画面未到達 |
| /procurement/requisitions | RequisitionListComponent | F-05-01 | AuthGuard | |
| /procurement/requisitions/new | RequisitionCreateComponent | F-05-05 | AuthGuard | 画面未到達 |
| /procurement/requisitions/:id | RequisitionDetailComponent | F-05-02 | AuthGuard | |
| /procurement/orders | OrderListComponent | F-05-03 | AuthGuard | |
| /procurement/orders/new | OrderCreateComponent | F-05-07 | AuthGuard | 画面未到達 |
| /procurement/orders/:id | OrderDetailComponent | F-05-06 | AuthGuard | 画面未到達 |
| /procurement/approvals | ApprovalQueueComponent | F-05-04 | AuthGuard | |
| /procurement/goods-receipt | GoodsReceiptComponent | F-05-08 | AuthGuard | 画面未到達 |
| /procurement/returns | ReturnManagementComponent | F-05-09 | AuthGuard | 画面未到達 |
| /inventory | InventoryOverviewComponent | F-06-01 | AuthGuard | |
| /inventory/:id | InventoryDetailComponent | F-06-02 | AuthGuard | 画面未到達 |
| /inventory/transfer/new | StockTransferCreateComponent | F-06-03 | AuthGuard | 画面未到達 |
| /inventory/transfers | StockTransferListComponent | F-06-04 | AuthGuard | 画面未到達 |
| /inventory/adjustments | InventoryAdjustmentComponent | F-06-05 | AuthGuard | 画面未到達 |
| /inventory/stocktaking | InventoryCountComponent | F-06-06 | AuthGuard | 画面未到達 |
| /inventory/transactions | TransactionHistoryComponent | F-06-07 | AuthGuard | 画面未到達 |
| /warehouses | WarehouseListComponent | F-07-01 | AuthGuard | |
| /warehouses/:id | WarehouseDetailComponent | F-07-02 | AuthGuard | |
| /warehouses/:id/layout | WarehouseLayoutComponent | F-07-03 | AuthGuard | 画面未到達 |
| /pricing | PriceListManagementComponent | F-08-01 | AuthGuard | |
| /pricing/:id/edit | PriceEditComponent | F-08-02 | AuthGuard | 画面未到達 |
| /pricing/compare | PriceCompareComponent | F-08-03 | AuthGuard | 画面未到達 |
| /reports/spending | SpendingAnalysisComponent | F-09-01 | AuthGuard | |
| /reports/inventory-valuation | InventoryValuationComponent | F-09-02 | AuthGuard | 画面未到達 |
| /reports/supplier-performance | SupplierPerformanceComponent | F-09-03 | AuthGuard | 画面未到達 |
| /reports/budget-actual | BudgetActualComponent | F-09-04 | AuthGuard | 画面未到達 |
| /admin/users | UserManagementComponent | F-10-01 | AuthGuard | |
| /admin/roles | RolePermissionComponent | F-10-04 | AuthGuard | 画面未到達 |
| /admin/config | SystemConfigComponent | F-10-05 | AuthGuard | 画面未到達 |
| /admin/audit-log | AuditLogComponent | F-10-06 | AuthGuard | 画面未到達 |
| /admin/departments | DepartmentManagementComponent | F-10-02 | AuthGuard | |
| /admin/budgets | BudgetManagementComponent | F-10-03 | AuthGuard | |
| /admin/master-data | MasterDataComponent | F-10-07 | AuthGuard | 画面未到達 |
| /admin/delegation | DelegationComponent | F-10-08 | AuthGuard | 画面未到達 |
| /admin/notification-settings | NotificationSettingsComponent | F-10-09 | AuthGuard | 画面未到達 |
| /import-export | ImportExportComponent | F-11 | AuthGuard | |

### バックエンド（JAX-RS）ルーティング

アプリケーションベースパス: `/api`（ProQuipApplication.java）

| method | path | Controller | 機能ID | 備考 |
|---|---|---|---|---|
| GET | /api/dashboard/summary | DashboardResource | F-02 | |
| GET | /api/dashboard/recent-orders | DashboardResource | F-02 | |
| GET | /api/dashboard/pending-tasks | DashboardResource | F-02 | |
| GET | /api/dashboard/alerts | DashboardResource | F-02 | |
| GET | /api/dashboard/spending-trend | DashboardResource | F-02 | |
| GET | /api/dashboard/category-spending | DashboardResource | F-02 | |
| GET/POST/PUT/DELETE | /api/products/** | ProductResource | F-03 | 製品CRUD、カテゴリ、バンドル、画像、ドキュメント |
| GET | /api/products/search | ProductResource | F-03 | 検索 |
| GET | /api/products/check-sku | ProductResource | F-03 | SKU重複チェック |
| GET | /api/products/export | ProductResource | F-03 | CSV出力 |
| POST | /api/products/import | ProductResource | F-03 | インポート |
| GET/POST/PUT/DELETE | /api/suppliers/** | SupplierResource | F-04 | サプライヤーCRUD、連絡先、契約、評価、認証 |
| GET | /api/suppliers/compare | SupplierResource | F-04 | サプライヤー比較 |
| POST | /api/suppliers/{id}/rate | SupplierResource | F-04 | 評価登録 |
| GET/POST/PUT/DELETE | /api/requisitions/** | RequisitionResource | F-05 | 購買依頼CRUD |
| POST | /api/requisitions/{id}/submit | RequisitionResource | F-05 | 承認申請 |
| POST | /api/requisitions/{id}/approve | RequisitionResource | F-05 | 承認 |
| POST | /api/requisitions/{id}/reject | RequisitionResource | F-05 | 却下 |
| POST | /api/requisitions/{id}/convert-to-order | RequisitionResource | F-05 | 発注変換 |
| GET/POST/PUT/DELETE | /api/purchase-orders/** | PurchaseOrderResource | F-05 | 発注書CRUD |
| POST | /api/purchase-orders/{id}/submit | PurchaseOrderResource | F-05 | 承認申請 |
| POST | /api/purchase-orders/{id}/approve | PurchaseOrderResource | F-05 | 承認 |
| POST | /api/purchase-orders/{id}/reject | PurchaseOrderResource | F-05 | 却下 |
| POST | /api/purchase-orders/{id}/goods-receipt | PurchaseOrderResource | F-05 | 入荷処理 |
| POST | /api/purchase-orders/{id}/receive | PurchaseOrderResource | F-05 | 受領処理 |
| POST | /api/purchase-orders/{id}/cancel | PurchaseOrderResource | F-05 | キャンセル |
| GET | /api/purchase-orders/{id}/approval-history | PurchaseOrderResource | F-05 | 承認履歴 |
| GET | /api/purchase-orders/{id}/status-history | PurchaseOrderResource | F-05 | ステータス履歴 |
| GET | /api/purchase-orders/pending-approvals | PurchaseOrderResource | F-05 | 承認待ち一覧 |
| GET | /api/purchase-orders/export | PurchaseOrderResource | F-05 | CSV出力 |
| GET | /api/purchase-orders/summary | PurchaseOrderResource | F-05 | サマリー |
| GET/POST | /api/inventory/** | InventoryResource | F-06 | 在庫管理 |
| POST | /api/inventory/stock-in | InventoryResource | F-06 | 入庫 |
| POST | /api/inventory/stock-out | InventoryResource | F-06 | 出庫 |
| POST | /api/inventory/transfer | InventoryResource | F-06 | 在庫移動 |
| POST | /api/inventory/{id}/adjust | InventoryResource | F-06 | 在庫調整 |
| GET | /api/inventory/alerts/low-stock | InventoryResource | F-06 | 在庫不足アラート |
| GET | /api/inventory/transactions | InventoryResource | F-06 | 取引履歴 |
| POST | /api/inventory/count | InventoryResource | F-06 | 棚卸 |
| GET | /api/inventory/valuation | InventoryResource | F-06 | 在庫評価 |
| GET/POST/PUT/DELETE | /api/warehouses/** | WarehouseResource | F-07 | 倉庫CRUD |
| GET/POST/PUT/DELETE | /api/price-lists/** | PriceListResource | F-08 | 価格リストCRUD |
| GET | /api/reports/spending-by-category | ReportResource | F-09 | カテゴリ別支出 |
| GET | /api/reports/spending-by-department | ReportResource | F-09 | 部門別支出 |
| GET | /api/reports/inventory-valuation | ReportResource | F-09 | 在庫評価 |
| GET | /api/reports/supplier-performance | ReportResource | F-09 | サプライヤー実績 |
| GET | /api/reports/top-suppliers | ReportResource | F-09 | トップサプライヤー |
| GET | /api/reports/budget-vs-actual | ReportResource | F-09 | 予算実績対比 |
| GET | /api/reports/order-summary | ReportResource | F-09 | 発注サマリー |
| GET | /api/reports/procurement-summary | ReportResource | F-09 | 調達サマリー |
| GET/PUT | /api/users/** | UserResource | F-10 | ユーザー管理 |
| GET | /api/users/me | UserResource | F-10 | 現在のユーザー |
| POST | /api/users/{userId}/roles | UserResource | F-10 | ロール割当 |
| GET/POST/PUT/DELETE | /api/departments/** | DepartmentResource | F-10 | 部門CRUD |
| GET/POST/PUT | /api/budgets/** | BudgetResource | F-10 | 予算CRUD |
| POST | /api/budgets/close-fiscal-year | BudgetResource | F-10 | 会計年度締め |
| GET/PUT | /api/admin/system-config/** | AdminResource | F-10 | システム設定（ADMIN限定） |
| GET | /api/admin/audit-logs | AdminResource | F-10 | 監査ログ（ADMIN限定） |
| GET | /api/admin/permissions | AdminResource | F-10 | 権限一覧（ADMIN限定） |
| GET | /api/admin/export/{type} | AdminResource | F-10 | マスターデータ出力 |
| POST | /api/admin/import | AdminResource | F-10 | マスターデータ取込 |
| GET/POST/PUT/DELETE | /api/notifications/** | NotificationResource | F-12 | 通知管理 |
| GET/POST/PUT/DELETE | /api/notification-templates/** | NotificationTemplateResource | F-10 | 通知テンプレート |
| GET/POST/PUT/DELETE | /api/delegations/** | DelegationResource | F-10 | 委任管理 |
| GET/POST/PUT/DELETE | /api/returns/** | ReturnResource | F-05 | 返品管理 |
| GET | /api/master-data/** | MasterDataResource | F-10 | マスターデータ参照 |
| GET/POST | /api/import-jobs/** | ImportJobResource | F-11 | インポートジョブ管理 |
| GET | /api/health | HealthResource | - | ヘルスチェック（認証不要） |

---

## 画面コンポーネント

### コアレイアウト

| ファイルパス | コンポーネント名 | 画面 | 機能ID | 備考 |
|---|---|---|---|---|
| app/core/layout/header.component.ts | AppHeader | ヘッダー | F-12-01 | |
| app/core/layout/sidebar.component.ts | AppSidebar | サイドバー | F-12-02 | |
| app/core/layout/footer.component.ts | AppFooter | フッター | F-12-03 | |

### 共通コンポーネント

| ファイルパス | コンポーネント名 | 用途 | 備考 |
|---|---|---|---|
| app/shared/components/data-table/data-table.component.ts | app-data-table | 汎用テーブル | |
| app/shared/components/confirm-dialog/confirm-dialog.component.ts | app-confirm-dialog | 確認ダイアログ | |
| app/shared/components/search-box/search-box.component.ts | app-search-box | 検索ボックス | |
| app/shared/components/status-badge/status-badge.component.ts | app-status-badge | ステータスバッジ | |
| app/shared/components/loading-spinner/loading-spinner.component.ts | app-loading-spinner | ローディング | |
| app/shared/components/page-header/page-header.component.ts | app-page-header | ページヘッダ | |
| app/shared/components/form-field/form-field.component.ts | app-form-field | フォームフィールド | |
| app/shared/components/file-upload/file-upload.component.ts | app-file-upload | ファイルアップロード | |
| app/shared/components/notification-toast/notification-toast.component.ts | app-notification-toast | トースト通知 | |
| app/shared/components/empty-state/empty-state.component.ts | app-empty-state | 空状態表示 | |

### 機能別コンポーネント

| ファイルパス | コンポーネント名 | 画面 | 機能ID | 備考 |
|---|---|---|---|---|
| app/features/dashboard/dashboard-main/dashboard-main.component.ts | app-dashboard-main | ダッシュボード | F-02-01 | |
| app/features/dashboard/my-tasks/my-tasks.component.ts | app-my-tasks | マイタスク | F-02-02 | 画面未到達 |
| app/features/products/product-list/product-list.component.ts | app-product-list | 製品一覧 | F-03-01 | |
| app/features/products/product-detail/product-detail.component.ts | app-product-detail | 製品詳細 | F-03-02 | |
| app/features/products/product-create/product-create.component.ts | app-product-create | 製品新規登録 | F-03-05 | |
| app/features/products/product-edit/product-edit.component.ts | app-product-edit | 製品編集 | F-03-05 | |
| app/features/products/category-management/category-management.component.ts | app-category-management | カテゴリ管理 | F-03-03 | |
| app/features/products/bundle-management/bundle-management.component.ts | app-bundle-management | バンドル管理 | F-03-04 | |
| app/features/suppliers/supplier-list/supplier-list.component.ts | app-supplier-list | サプライヤー一覧 | F-04-01 | |
| app/features/suppliers/supplier-detail/supplier-detail.component.ts | app-supplier-detail | サプライヤー詳細 | F-04-02 | |
| app/features/suppliers/supplier-create/supplier-create.component.ts | app-supplier-create | サプライヤー新規登録 | F-04 | 画面未到達 |
| app/features/suppliers/supplier-edit/supplier-edit.component.ts | app-supplier-edit | サプライヤー編集 | F-04 | 画面未到達 |
| app/features/suppliers/supplier-compare/supplier-compare.component.ts | app-supplier-compare | サプライヤー比較 | F-04 | 画面未到達 |
| app/features/procurement/requisition-list/requisition-list.component.ts | app-requisition-list | 購買依頼一覧 | F-05-01 | |
| app/features/procurement/requisition-create/requisition-create.component.ts | app-requisition-create | 購買依頼新規作成 | F-05-05 | 画面未到達 |
| app/features/procurement/requisition-detail/requisition-detail.component.ts | app-requisition-detail | 購買依頼詳細 | F-05-02 | |
| app/features/procurement/order-list/order-list.component.ts | app-order-list | 発注書一覧 | F-05-03 | |
| app/features/procurement/order-create/order-create.component.ts | app-order-create | 発注書新規作成 | F-05-07 | 画面未到達 |
| app/features/procurement/order-detail/order-detail.component.ts | app-order-detail | 発注書詳細 | F-05-06 | 画面未到達 |
| app/features/procurement/approval-queue/approval-queue.component.ts | app-approval-queue | 承認待ちキュー | F-05-04 | |
| app/features/procurement/goods-receipt/goods-receipt.component.ts | app-goods-receipt | 入荷処理 | F-05-08 | 画面未到達 |
| app/features/procurement/return-management/return-management.component.ts | app-return-management | 返品管理 | F-05-09 | 画面未到達 |
| app/features/inventory/inventory-overview/inventory-overview.component.ts | app-inventory-overview | 在庫一覧 | F-06-01 | |
| app/features/inventory/inventory-detail/inventory-detail.component.ts | app-inventory-detail | 在庫詳細 | F-06-02 | 画面未到達 |
| app/features/inventory/stock-transfer-create/stock-transfer-create.component.ts | app-stock-transfer-create | 在庫移動作成 | F-06-03 | 画面未到達 |
| app/features/inventory/stock-transfer-list/stock-transfer-list.component.ts | app-stock-transfer-list | 在庫移動一覧 | F-06-04 | 画面未到達 |
| app/features/inventory/inventory-adjustment/inventory-adjustment.component.ts | app-inventory-adjustment | 在庫調整 | F-06-05 | 画面未到達 |
| app/features/inventory/inventory-count/inventory-count.component.ts | app-inventory-count | 棚卸 | F-06-06 | 画面未到達 |
| app/features/inventory/transaction-history/transaction-history.component.ts | app-transaction-history | 取引履歴 | F-06-07 | 画面未到達 |
| app/features/warehouses/warehouse-list/warehouse-list.component.ts | app-warehouse-list | 倉庫一覧 | F-07-01 | |
| app/features/warehouses/warehouse-detail/warehouse-detail.component.ts | app-warehouse-detail | 倉庫詳細 | F-07-02 | |
| app/features/warehouses/warehouse-layout/warehouse-layout.component.ts | app-warehouse-layout | 倉庫レイアウト | F-07-03 | 画面未到達 |
| app/features/pricing/price-list-management/price-list-management.component.ts | app-price-list-management | 価格リスト管理 | F-08-01 | |
| app/features/pricing/price-edit/price-edit.component.ts | app-price-edit | 価格編集 | F-08-02 | 画面未到達 |
| app/features/pricing/price-compare/price-compare.component.ts | app-price-compare | 価格比較 | F-08-03 | 画面未到達 |
| app/features/reports/spending-analysis/spending-analysis.component.ts | app-spending-analysis | 支出分析 | F-09-01 | |
| app/features/reports/inventory-valuation/inventory-valuation.component.ts | app-inventory-valuation | 在庫評価レポート | F-09-02 | 画面未到達 |
| app/features/reports/supplier-performance/supplier-performance.component.ts | app-supplier-performance | サプライヤー実績 | F-09-03 | 画面未到達 |
| app/features/reports/budget-actual/budget-actual.component.ts | app-budget-actual | 予算実績対比 | F-09-04 | 画面未到達 |
| app/features/admin/user-management/user-management.component.ts | app-user-management | ユーザー管理 | F-10-01 | |
| app/features/admin/department-management/department-management.component.ts | app-department-management | 部門管理 | F-10-02 | |
| app/features/admin/budget-management/budget-management.component.ts | app-budget-management | 予算管理 | F-10-03 | |
| app/features/admin/role-permission/role-permission.component.ts | app-role-permission | ロール・権限管理 | F-10-04 | 画面未到達 |
| app/features/admin/system-config/system-config.component.ts | app-system-config | システム設定 | F-10-05 | 画面未到達 |
| app/features/admin/audit-log/audit-log.component.ts | app-audit-log | 監査ログ | F-10-06 | 画面未到達 |
| app/features/admin/master-data/master-data.component.ts | app-master-data | マスターデータ管理 | F-10-07 | 画面未到達 |
| app/features/admin/delegation/delegation.component.ts | app-delegation | 委任設定 | F-10-08 | 画面未到達 |
| app/features/admin/notification-settings/notification-settings.component.ts | app-notification-settings | 通知設定 | F-10-09 | 画面未到達 |
| app/features/import-export/import-export/import-export.component.ts | app-import-export | インポート/エクスポート | F-11 | |

---

## APIエンドポイント（REST Resource一覧）

| ファイルパス | クラス名 | ベースパス | 機能ID | 認証 | 認可 | 備考 |
|---|---|---|---|---|---|---|
| proquip-web/.../resource/DashboardResource.java | DashboardResource | /api/dashboard | F-02 | JWT | なし | |
| proquip-web/.../resource/ProductResource.java | ProductResource | /api/products | F-03 | JWT | なし | 25+エンドポイント |
| proquip-web/.../resource/CategoryResource.java | CategoryResource | /api/categories | F-03 | JWT | なし | |
| proquip-web/.../resource/SupplierResource.java | SupplierResource | /api/suppliers | F-04 | JWT | なし | 20+エンドポイント |
| proquip-web/.../resource/RequisitionResource.java | RequisitionResource | /api/requisitions | F-05 | JWT | なし | |
| proquip-web/.../resource/PurchaseOrderResource.java | PurchaseOrderResource | /api/purchase-orders | F-05 | JWT | なし | 17+エンドポイント |
| proquip-web/.../resource/InventoryResource.java | InventoryResource | /api/inventory | F-06 | JWT | なし | 20+エンドポイント |
| proquip-web/.../resource/WarehouseResource.java | WarehouseResource | /api/warehouses | F-07 | JWT | なし | |
| proquip-web/.../resource/PriceListResource.java | PriceListResource | /api/price-lists | F-08 | JWT | なし | |
| proquip-web/.../resource/ReportResource.java | ReportResource | /api/reports | F-09 | JWT | なし | 8エンドポイント |
| proquip-web/.../resource/UserResource.java | UserResource | /api/users | F-10 | JWT | なし | |
| proquip-web/.../resource/DepartmentResource.java | DepartmentResource | /api/departments | F-10 | JWT | なし | |
| proquip-web/.../resource/BudgetResource.java | BudgetResource | /api/budgets | F-10 | JWT | なし | |
| proquip-web/.../resource/AdminResource.java | AdminResource | /api/admin | F-10 | JWT | @RolesAllowed("ADMIN") | 唯一のロール制御 |
| proquip-web/.../resource/NotificationResource.java | NotificationResource | /api/notifications | F-12 | JWT | なし | |
| proquip-web/.../resource/NotificationTemplateResource.java | NotificationTemplateResource | /api/notification-templates | F-10 | JWT | なし | |
| proquip-web/.../resource/DelegationResource.java | DelegationResource | /api/delegations | F-10 | JWT | なし | |
| proquip-web/.../resource/ReturnResource.java | ReturnResource | /api/returns | F-05 | JWT | なし | |
| proquip-web/.../resource/MasterDataResource.java | MasterDataResource | /api/master-data | F-10 | JWT | なし | |
| proquip-web/.../resource/ImportJobResource.java | ImportJobResource | /api/import-jobs | F-11 | JWT | なし | |
| proquip-web/.../resource/HealthResource.java | HealthResource | /api/health | - | なし | なし | ヘルスチェック |

---

## Service

| ファイルパス | クラス名 | 責務 | 機能ID | 備考 |
|---|---|---|---|---|
| proquip-ejb/.../service/ProductServiceBean.java | ProductServiceBean | 製品CRUD、SKU検証、カタログ管理、バンドル、検索、インポート/エクスポート、変更ログ | F-03 | @Stateless |
| proquip-ejb/.../service/SupplierServiceBean.java | SupplierServiceBean | サプライヤーCRUD、評価/認証管理、実績レポート、契約管理 | F-04 | @Stateless |
| proquip-ejb/.../service/RequisitionServiceBean.java | RequisitionServiceBean | 購買依頼CRUD、承認ワークフロー、発注変換 | F-05 | @Stateless |
| proquip-ejb/.../service/PurchaseOrderServiceBean.java | PurchaseOrderServiceBean | 発注書CRUD、承認ワークフロー、入荷処理、ステータス管理、出力、サプライヤーランキング | F-05 | @Stateless |
| proquip-ejb/.../service/InventoryServiceBean.java | InventoryServiceBean | 入出庫、移動、在庫不足アラート、棚卸処理、在庫評価 | F-06 | @Stateless |
| proquip-ejb/.../service/BudgetServiceBean.java | BudgetServiceBean | 予算CRUD、消化率計算、利用可能チェック、会計年度管理 | F-10 | @Stateless |
| proquip-ejb/.../service/NotificationServiceBean.java | NotificationServiceBean | 通知作成、配信（アプリ内・メール）、テンプレート管理 | F-12 | @Stateless |
| proquip-ejb/.../service/AuditServiceBean.java | AuditServiceBean | 監査ログ記録、検索/フィルタリング、統計、出力 | F-10 | @Stateless |
| proquip-ejb/.../service/ImportExportServiceBean.java | ImportExportServiceBean | CSV インポート/エクスポート（製品、サプライヤー、履歴） | F-11 | @Stateless |

### サービス基底クラス

| ファイルパス | クラス名 | 責務 | 備考 |
|---|---|---|---|
| proquip-ejb/.../service/base/AbstractBaseEntityServiceBean.java | AbstractBaseEntityServiceBean | 汎用CRUD | |
| proquip-ejb/.../service/base/AbstractAuditedEntityServiceBean.java | AbstractAuditedEntityServiceBean | 監査付きエンティティ操作 | |
| proquip-ejb/.../service/base/AbstractPaginatedEntityServiceBean.java | AbstractPaginatedEntityServiceBean | ページネーション対応 | |
| proquip-ejb/.../service/base/AbstractSearchableEntityServiceBean.java | AbstractSearchableEntityServiceBean | 検索機能 | |
| proquip-ejb/.../service/base/AbstractValidatedEntityServiceBean.java | AbstractValidatedEntityServiceBean | バリデーション統合 | |

### 通知送信

| ファイルパス | クラス名 | 責務 | 備考 |
|---|---|---|---|
| proquip-ejb/.../service/notification/AbstractNotificationSender.java | AbstractNotificationSender | 通知送信基底クラス | |
| proquip-ejb/.../service/notification/EmailNotificationSender.java | EmailNotificationSender | メール配信 | |
| proquip-ejb/.../service/notification/InAppNotificationSender.java | InAppNotificationSender | アプリ内通知 | |
| proquip-ejb/.../service/notification/NotificationSenderFactory.java | NotificationSenderFactory | Factoryパターン | |

### レガシー

| ファイルパス | クラス名 | 責務 | 備考 |
|---|---|---|---|
| proquip-ejb/.../service/legacy/LegacyReportGenerator.java | LegacyReportGenerator | レガシーレポート生成 | 技術的負債 |
| proquip-ejb/.../service/legacy/OldDataMigrationHelper.java | OldDataMigrationHelper | データ移行ユーティリティ | 技術的負債 |

---

## Repository / DAO

| ファイルパス | クラス名 | 対象テーブル | 機能ID | 備考 |
|---|---|---|---|---|
| proquip-ejb/.../dao/AbstractBaseDao.java | AbstractBaseDao | 汎用 | - | 基底クラス |
| proquip-ejb/.../dao/ProductDao.java | ProductDao | product | F-03 | |
| proquip-ejb/.../dao/SupplierDao.java | SupplierDao | supplier | F-04 | |
| proquip-ejb/.../dao/PurchaseOrderDao.java | PurchaseOrderDao | purchase_order | F-05 | |
| proquip-ejb/.../dao/InventoryDao.java | InventoryDao | inventory_item | F-06 | |
| proquip-ejb/.../dao/BudgetDao.java | BudgetDao | budget | F-10 | |
| proquip-ejb/.../dao/UserProfileDao.java | UserProfileDao | user_profile | F-10 | |
| proquip-ejb/.../dao/WarehouseDao.java | WarehouseDao | warehouse | F-07 | |
| proquip-ejb/.../dao/CustomQueryBuilder.java | CustomQueryBuilder | - | - | クエリビルダーユーティリティ |
| proquip-ejb/.../dao/ReportQueryHelper.java | ReportQueryHelper | - | F-09 | レポートクエリ補助 |

---

## Entity / Model

### 組織系 (organization)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/organization/UserProfile.java | UserProfile | user_profile | Keycloakユーザー連携 |
| proquip-ejb/.../entity/organization/Department.java | Department | department | 階層構造（parent_id） |
| proquip-ejb/.../entity/organization/Role.java | Role | role | |
| proquip-ejb/.../entity/organization/Permission.java | Permission | permission | |
| proquip-ejb/.../entity/organization/DelegationRule.java | DelegationRule | delegation_rule | 承認委任 |

### 製品系 (product)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/product/Product.java | Product | product | SKUベース |
| proquip-ejb/.../entity/product/Category.java | Category | category | 階層構造 |
| proquip-ejb/.../entity/product/Manufacturer.java | Manufacturer | manufacturer | |
| proquip-ejb/.../entity/product/UnitOfMeasure.java | UnitOfMeasure | unit_of_measure | |
| proquip-ejb/.../entity/product/ProductSpecification.java | ProductSpecification | product_specification | キーバリュー |
| proquip-ejb/.../entity/product/ProductImage.java | ProductImage | product_image | |
| proquip-ejb/.../entity/product/ProductDocument.java | ProductDocument | product_document | |
| proquip-ejb/.../entity/product/ProductBundle.java | ProductBundle | product_bundle | |
| proquip-ejb/.../entity/product/ProductBundleItem.java | ProductBundleItem | product_bundle_item | |
| proquip-ejb/.../entity/product/ProductAlternative.java | ProductAlternative | product_alternative | |
| proquip-ejb/.../entity/product/ProductChangeLog.java | ProductChangeLog | product_change_log | |
| proquip-ejb/.../entity/product/ProductTag.java | ProductTag | product_tag | |

### サプライヤー系 (supplier)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/supplier/Supplier.java | Supplier | supplier | リスクレベル付き |
| proquip-ejb/.../entity/supplier/SupplierContact.java | SupplierContact | supplier_contact | |
| proquip-ejb/.../entity/supplier/SupplierAddress.java | SupplierAddress | supplier_address | |
| proquip-ejb/.../entity/supplier/SupplierProduct.java | SupplierProduct | supplier_product | サプライヤー別価格 |
| proquip-ejb/.../entity/supplier/SupplierCertification.java | SupplierCertification | supplier_certification | ISO等 |
| proquip-ejb/.../entity/supplier/SupplierRating.java | SupplierRating | supplier_rating | 品質/納期/価格/サービス |
| proquip-ejb/.../entity/supplier/SupplierContract.java | SupplierContract | supplier_contract | |
| proquip-ejb/.../entity/supplier/SupplierContractItem.java | SupplierContractItem | supplier_contract_item | |

### 調達系 (procurement)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/procurement/PurchaseRequisition.java | PurchaseRequisition | purchase_requisition | |
| proquip-ejb/.../entity/procurement/PurchaseRequisitionItem.java | PurchaseRequisitionItem | purchase_requisition_item | |
| proquip-ejb/.../entity/procurement/PurchaseOrder.java | PurchaseOrder | purchase_order | |
| proquip-ejb/.../entity/procurement/PurchaseOrderItem.java | PurchaseOrderItem | purchase_order_item | 部分受入対応 |
| proquip-ejb/.../entity/procurement/PurchaseOrderStatusHistory.java | PurchaseOrderStatusHistory | purchase_order_status_history | |
| proquip-ejb/.../entity/procurement/ApprovalWorkflow.java | ApprovalWorkflow | approval_workflow | ポリモーフィック |
| proquip-ejb/.../entity/procurement/ApprovalStep.java | ApprovalStep | approval_step | |
| proquip-ejb/.../entity/procurement/GoodsReceipt.java | GoodsReceipt | goods_receipt | |
| proquip-ejb/.../entity/procurement/GoodsReceiptItem.java | GoodsReceiptItem | goods_receipt_item | |
| proquip-ejb/.../entity/procurement/ReturnToSupplier.java | ReturnToSupplier | return_to_supplier | |

### 在庫系 (inventory)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/inventory/InventoryItem.java | InventoryItem | inventory_item | 手持/予約/発注中/輸送中 |
| proquip-ejb/.../entity/inventory/InventoryTransaction.java | InventoryTransaction | inventory_transaction | 監査証跡 |
| proquip-ejb/.../entity/inventory/InventoryCount.java | InventoryCount | inventory_count | |
| proquip-ejb/.../entity/inventory/Warehouse.java | Warehouse | warehouse | |
| proquip-ejb/.../entity/inventory/WarehouseZone.java | WarehouseZone | warehouse_zone | |
| proquip-ejb/.../entity/inventory/StorageLocation.java | StorageLocation | storage_location | 通路-棚-段-ビン階層 |
| proquip-ejb/.../entity/inventory/StockTransfer.java | StockTransfer | stock_transfer | |
| proquip-ejb/.../entity/inventory/StockTransferItem.java | StockTransferItem | stock_transfer_item | |

### 価格系 (pricing)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/pricing/Budget.java | Budget | budget | 部門×会計年度 |
| proquip-ejb/.../entity/pricing/BudgetLineItem.java | BudgetLineItem | budget_line_item | カテゴリ別配分 |
| proquip-ejb/.../entity/pricing/PriceList.java | PriceList | price_list | 有効期間付き |
| proquip-ejb/.../entity/pricing/PriceListItem.java | PriceListItem | price_list_item | 数量階層 |
| proquip-ejb/.../entity/pricing/Currency.java | Currency | currency | 為替レート |
| proquip-ejb/.../entity/pricing/TaxRate.java | TaxRate | tax_rate | 国/地域別 |

### システム系 (system)

| ファイルパス | クラス名 | 対応テーブル | 備考 |
|---|---|---|---|
| proquip-ejb/.../entity/system/AuditLog.java | AuditLog | audit_log | JSONB old/new値 |
| proquip-ejb/.../entity/system/Notification.java | Notification | notification | リトライ/有効期限 |
| proquip-ejb/.../entity/system/NotificationTemplate.java | NotificationTemplate | notification_template | EMAIL/IN_APP/SMS/WEBHOOK |
| proquip-ejb/.../entity/system/ImportJob.java | ImportJob | import_job | CSV/Excelバッチ |
| proquip-ejb/.../entity/system/SystemConfiguration.java | SystemConfiguration | system_configuration | キーバリュー（暗号化対応） |

### 基底クラス

| ファイルパス | クラス名 | 備考 |
|---|---|---|
| proquip-ejb/.../entity/base/BaseEntity.java | BaseEntity | @Id, @Version |
| proquip-ejb/.../entity/base/AuditableEntity.java | AuditableEntity | createdAt, createdBy, updatedAt, updatedBy |

---

## 認証・認可

| 方式 | 実装箇所 | 適用範囲 | 備考 |
|---|---|---|---|
| Keycloak OIDC（Bearer JWT） | proquip-web/.../filter/AuthenticationFilter.java | 全APIエンドポイント（/health除く） | 現行: ContainerRequestFilter、JWT署名検証なし（技術的負債）→ 移行先: quarkus-oidc によるJWT検証（Keycloak 26.6.2） |
| @RolesAllowed | proquip-web/.../filter/RolesAllowedFilter.java | AdminResource のみ | ADMIN ロール必須。他のリソースにはロール制御なし（技術的負債） |
| CORS | proquip-web/.../filter/CorsFilter.java | 全レスポンス | ContainerResponseFilter |
| EJBインターセプター | proquip-ejb/.../interceptor/SecurityInterceptor.java | サービス層メソッド | @RequiresRole アノテーション |
| フロントエンドガード | app/core/auth/auth.guard.ts | 全ルート | KeycloakAuthGuard 拡張。route.data['roles']チェック |
| フロントエンドロールガード | app/core/auth/role.guard.ts | 管理者ルート | AuthService.hasRole()チェック |
| フロントエンド認証インターセプター | app/core/interceptors/auth.interceptor.ts | 全HTTPリクエスト（/assets/, /auth/除く） | Bearer トークン自動付与 |
| Keycloak初期化 | app/app.module.ts (APP_INITIALIZER) | アプリ起動時 | onLoad: 'login-required', PKCE: S256 |

### ロール定義

| ロール | 用途 | ソース |
|---|---|---|
| ADMIN | システム管理者 | Keycloak realm + role テーブル |
| MANAGER | 部門管理者 | Keycloak realm + role テーブル |
| BUYER (PROCUREMENT_MANAGER) | 購買担当者 | Keycloak realm + role テーブル |
| WAREHOUSE_STAFF | 倉庫担当者 | Keycloak realm + role テーブル |
| VIEWER | 閲覧者 | Keycloak realm + role テーブル |

---

## バリデーション

| 対象 | 実装箇所 | ルール | 機能ID | 備考 |
|---|---|---|---|---|
| 製品バリデーション | proquip-ejb/.../validator/ProductValidator.java | SKUパターン: `[A-Za-z]{2,5}-[0-9]{4,8}`、価格、カテゴリ階層、寸法 | F-03 | |
| サプライヤーバリデーション | proquip-ejb/.../validator/SupplierValidator.java | サプライヤーデータ検証 | F-04 | |
| 発注書バリデーション | proquip-ejb/.../validator/PurchaseOrderValidator.java | SKUパターン: `[A-Z]{3}-[0-9]{6}`、品目数量、サプライヤー | F-05 | SKUパターン不一致（技術的負債） |
| 購買依頼バリデーション | proquip-ejb/.../validator/RequisitionValidator.java | 購買依頼データ検証 | F-05 | |
| Bean Validation | DTO各クラス | @NotNull, @NotEmpty, @Valid, @Pattern, @Range | 全般 | Jakarta Bean Validation |
| バリデーション例外マッパー | proquip-web/.../filter/ValidationExceptionMapper.java | ConstraintViolationException → 422 | 全般 | |
| FEカスタムバリデーター | app/shared/validators/custom-validators.ts | skuFormat(), maxAmount(), requiredIf(), dateRange() | 全般 | BE側とSKUパターン不一致（技術的負債） |

---

## バッチ / ジョブ

| 名称 | ファイルパス | スケジュール | 処理内容 | 備考 |
|---|---|---|---|---|
| 予算アラート | proquip-ejb/.../scheduler/BudgetAlertScheduler.java | 毎日 8:00 (@Schedule(hour="8", minute="0")) | 予算消化率チェック（80%/95%閾値）、通知作成 | @Singleton @Startup |
| 在庫不足アラート | proquip-ejb/.../scheduler/LowStockAlertScheduler.java | 要確認 | 在庫不足検知、発注点通知 | @Singleton @Startup |
| 発注遅延検知 | proquip-ejb/.../scheduler/OverdueOrderScheduler.java | 要確認 | 納期超過発注書の検出・アラート | @Singleton @Startup |
| 通知クリーンアップ | proquip-ejb/.../scheduler/NotificationCleanupScheduler.java | 要確認 | 古い・アーカイブ済み通知の削除 | @Singleton @Startup |
| インポートジョブクリーンアップ | proquip-ejb/.../scheduler/ImportJobCleanupScheduler.java | 要確認 | 完了・失敗したインポートジョブの削除 | @Singleton @Startup |

### CDIイベント

| 名称 | ファイルパス | 処理内容 | 備考 |
|---|---|---|---|
| 在庫イベント | proquip-ejb/.../event/InventoryEvent.java + InventoryEventObserver.java | 在庫変動時の非同期処理 | CDI Event/Observer |
| 発注イベント | proquip-ejb/.../event/OrderEvent.java + OrderEventObserver.java | 発注ステータス変更時の非同期処理 | CDI Event/Observer |

---

## 外部連携

| 連携先 | ファイルパス | 方式 | 備考 |
|---|---|---|---|
| Keycloak (OIDC) | proquip-web/.../filter/AuthenticationFilter.java + docker/keycloak/ | Bearer JWT認証、レルム設定 | 現行: keycloak-js 22.0.5 → 移行先: Keycloak 26.6.2 / keycloak-js 26.x |
| メール送信 | proquip-ejb/.../service/notification/EmailNotificationSender.java | JavaMail（SMTP） | MAIL_ENABLED=false（デフォルト無効） |
| PostgreSQL | persistence.xml (java:jboss/datasources/ProQuipDS) | JDBC / JPA (Hibernate 6.4.9) | PostgreSQL 15.7 |

---

## エラーハンドリング

### バックエンド

| 種別 | 実装箇所 | 方式 | 備考 |
|---|---|---|---|
| グローバル例外マッパー | proquip-web/.../filter/GlobalExceptionMapper.java | ExceptionMapper<Exception> | EntityNotFoundException→404, ValidationException→422, BusinessException→400, その他→500 |
| バリデーション例外マッパー | proquip-web/.../filter/ValidationExceptionMapper.java | ExceptionMapper<ConstraintViolationException> | 422 Unprocessable Entity |
| リクエストログ | proquip-web/.../filter/RequestLoggingFilter.java | ContainerRequestFilter | リクエスト/レスポンスログ |

### エラーレスポンス形式

```json
{
  "code": 404,
  "errorCode": "ENTITY_NOT_FOUND",
  "message": "Description of error",
  "details": ["Additional details array"]
}
```

### 例外階層

```
BusinessException (基底)
├─ EntityNotFoundException (404)
├─ ValidationException (422)
├─ ApprovalException (承認ワークフローエラー)
├─ BudgetExceededException (予算制約)
├─ InsufficientStockException (在庫制約)
└─ ImportException (インポートエラー)
```

### フロントエンド

| 種別 | 実装箇所 | 方式 | 備考 |
|---|---|---|---|
| HTTPエラーインターセプター | app/core/interceptors/error.interceptor.ts | HttpInterceptor | 401→Keycloakログイン、403→ダッシュボードリダイレクト、409→楽観ロックエラー、500→アラート |
| ローディングインターセプター | app/core/interceptors/loading.interceptor.ts | HttpInterceptor | アクティブリクエスト数カウント |
| 通知サービス | app/core/services/notification.service.ts | BehaviorSubject | トースト通知（success/error/warning/info） |

---

## インターセプター

| ファイルパス | クラス名 | 用途 | 備考 |
|---|---|---|---|
| proquip-ejb/.../interceptor/AuditInterceptor.java | AuditInterceptor | @Audited アノテーションによる監査ログ | |
| proquip-ejb/.../interceptor/PerformanceInterceptor.java | PerformanceInterceptor | @Monitored アノテーションによるパフォーマンス計測 | |
| proquip-ejb/.../interceptor/TransactionLoggingInterceptor.java | TransactionLoggingInterceptor | トランザクションイベントログ | |
| proquip-ejb/.../interceptor/SecurityInterceptor.java | SecurityInterceptor | @RequiresRole メソッドレベルセキュリティ | |

---

## フロントエンド サービス

| ファイルパス | サービス名 | 主要エンドポイント | 備考 |
|---|---|---|---|
| app/core/auth/auth.service.ts | AuthService | KeycloakService経由 | login/logout/hasRole/getToken |
| app/core/services/loading.service.ts | LoadingService | - | BehaviorSubjectベース |
| app/core/services/notification.service.ts | NotificationService | - | トースト通知管理 |
| app/shared/services/api.service.ts | ApiService | environment.apiUrl | HTTP基底サービス |
| app/shared/services/product.service.ts | ProductService | /products/** | |
| app/shared/services/supplier.service.ts | SupplierService | /suppliers/** | |
| app/shared/services/purchase-order.service.ts | PurchaseOrderService | /purchase-orders/** | |
| app/shared/services/requisition.service.ts | RequisitionService | /requisitions/** | |
| app/shared/services/inventory.service.ts | InventoryService | /inventory/** | |
| app/shared/services/warehouse.service.ts | WarehouseService | /warehouses/** | |
| app/shared/services/budget.service.ts | BudgetService | /budgets/** | |
| app/shared/services/dashboard.service.ts | DashboardService | /dashboard/** | |
| app/shared/services/report.service.ts | ReportService | /reports/** | |
| app/shared/services/user.service.ts | UserService | /users/** | |
| app/shared/services/admin.service.ts | AdminService | /admin/** | |
| app/shared/services/master-data.service.ts | MasterDataService | /master-data/** | |
| app/shared/services/delegation.service.ts | DelegationService | /delegations/** | |
| app/shared/services/department.service.ts | DepartmentService | /departments/** | |
| app/shared/services/notification-template.service.ts | NotificationTemplateService | /notification-templates/** | |

---

## フロントエンド 共通部品

### カスタムパイプ

| ファイルパス | パイプ名 | 用途 |
|---|---|---|
| app/shared/pipes/japanese-date.pipe.ts | japaneseDate | 日付を「YYYY年MM月DD日」形式に変換 |
| app/shared/pipes/currency-jp.pipe.ts | currencyJp | 金額を「¥1,234,567」形式に変換 |
| app/shared/pipes/truncate.pipe.ts | truncate | 長い文字列の省略 |
| app/shared/pipes/status-label.pipe.ts | statusLabel | ステータスコードを表示ラベルに変換 |
| app/shared/pipes/order-number.pipe.ts | orderNumber | 発注番号のフォーマット |

### カスタムディレクティブ

| ファイルパス | ディレクティブ名 | 用途 |
|---|---|---|
| app/shared/directives/has-role.directive.ts | appHasRole | ロールに基づく要素の表示/非表示 |
| app/shared/directives/auto-focus.directive.ts | appAutoFocus | 入力要素の自動フォーカス |
| app/shared/directives/click-outside.directive.ts | appClickOutside | 要素外クリック検知 |

---

## DB マイグレーション

| ファイル | 内容 | テーブル数 |
|---|---|---|
| V001__create_organization_tables.sql | 組織・ユーザー管理 | 7 |
| V002__create_product_tables.sql | 製品マスターデータ | 13 |
| V003__create_supplier_tables.sql | サプライヤー管理 | 8 |
| V004__create_procurement_tables.sql | 調達・承認ワークフロー | 10 |
| V005__create_inventory_tables.sql | 倉庫・在庫管理 | 8 |
| V006__create_pricing_tables.sql | 価格・予算管理 | 6 |
| V007__create_notification_tables.sql | 通知 | 2 |
| V008__create_audit_tables.sql | 監査ログ・システム設定 | 3 |
| V009__create_indexes.sql | パフォーマンスインデックス | 50+索引 |
| V010__create_views.sql | 分析ビュー | 4ビュー |
| V011__add_stored_procedures.sql | ストアドプロシージャ（技術的負債） | 3プロシージャ |
| V020〜V030 | シードデータ・追加カラム | - |

### DBビュー

| ビュー名 | 用途 |
|---|---|
| v_inventory_summary | 製品×全倉庫の在庫集計 |
| v_purchase_order_summary | 発注書詳細と充足率 |
| v_supplier_performance | サプライヤー評価・発注実績・納期遵守率 |
| v_low_stock_alerts | 在庫不足警告・推奨発注数量 |

### ストアドプロシージャ（技術的負債）

| プロシージャ名 | 用途 | 備考 |
|---|---|---|
| sp_calculate_reorder_suggestions() | 発注点ロジック | アプリ層に移行すべき |
| sp_generate_spend_report() | 支出集計レポート | アプリ層+BIツールに移行すべき |
| sp_adjust_inventory_after_count() | 棚卸差異調整 | アプリ層に移行すべき |

---

## 設定ファイル

| ファイルパス | 種別 | 内容 |
|---|---|---|
| proquip-ejb/src/main/resources/META-INF/persistence.xml | JPA | PU: proquipPU, DS: java:jboss/datasources/ProQuipDS, Hibernate PostgreSQL方言, batch_size=25 |
| proquip-web/src/main/webapp/WEB-INF/web.xml | Web | セッションタイムアウト30分 |
| proquip-web/src/main/webapp/WEB-INF/beans.xml | CDI | bean-discovery-mode="all"（技術的負債: "annotated"にすべき） |
| proquip-ejb/src/main/resources/META-INF/beans.xml | CDI | bean-discovery-mode="all" |
| proquip-web/.../ProQuipApplication.java | JAX-RS | ベースパス: /api |
| proquip-web/.../provider/JsonbConfigProvider.java | JSON-B | JSON-Bシリアライズ/デシリアライズ設定 |
| proquip-frontend/src/app/environments/environment.ts | Angular Dev | apiUrl: '/api', keycloak: {url:'/', realm:'proquip', clientId:'proquip-web'}（現行は url:'/auth'、Keycloak 26.xでは /auth プレフィックス廃止） |
| proquip-frontend/src/app/environments/environment.prod.ts | Angular Prod | 同上（enableDebugLog: false） |
| proquip/podman-compose.yml | コンテナ | postgres:15.7, keycloak:26.6.2, wildfly:30→Quarkus, nginx:1.25.4 |
| proquip/docker/wildfly/configure-wildfly.cli | WildFly CLI | DS設定(min5/max50), OIDC設定, CORS, ログ |
| proquip/docker/nginx/nginx.conf | Nginx | リバースプロキシ(/api/→Quarkus, /realms/→Keycloak), SPA fallback（現行: /auth/→Keycloak） |
| proquip/.env.example | 環境変数 | DB接続、Keycloak、メール、アプリ設定 |

---

## 技術スタック

| 層 | 技術 | バージョン |
|---|---|---|
| FE フレームワーク | Angular | 17.3.12 |
| FE 認証 | keycloak-angular / keycloak-js | 16.x / 26.x（現行: 15.3.0 / 22.0.5） |
| FE 言語 | TypeScript | 5.4.5 |
| BE ランタイム | WildFly (Jakarta EE 10) | 30.0.1.Final |
| BE 言語 | Java | 17 |
| ORM | Hibernate | 6.4.9.Final |
| DBマイグレーション | Flyway | 10.15.0 |
| DB | PostgreSQL | 15.7 |
| 認証 | Keycloak | 26.6.2（現行: 22.0.5） |
| ビルド | Maven | 3.9.9 |
| コンテナ | Podman Compose | - |
| マッピング | MapStruct | 1.5.5.Final |
| JSON | Jackson | 2.17.1 |

---

## 画面探索との差分サマリー

### ソースコードで発見されたが画面探索で未到達の画面・機能

| 機能ID | 画面名 | ルート | 根拠 |
|---|---|---|---|
| F-02-02 | マイタスク | /dashboard/tasks | MyTasksComponent |
| F-05-05 | 購買依頼新規作成 | /procurement/requisitions/new | RequisitionCreateComponent |
| F-05-06 | 発注書詳細 | /procurement/orders/:id | OrderDetailComponent |
| F-05-07 | 発注書新規作成 | /procurement/orders/new | OrderCreateComponent |
| F-05-08 | 入荷処理 | /procurement/goods-receipt | GoodsReceiptComponent |
| F-05-09 | 返品管理 | /procurement/returns | ReturnManagementComponent |
| F-06-02 | 在庫詳細 | /inventory/:id | InventoryDetailComponent |
| F-06-03 | 在庫移動作成 | /inventory/transfer/new | StockTransferCreateComponent |
| F-06-04 | 在庫移動一覧 | /inventory/transfers | StockTransferListComponent |
| F-06-05 | 在庫調整 | /inventory/adjustments | InventoryAdjustmentComponent |
| F-06-06 | 棚卸 | /inventory/stocktaking | InventoryCountComponent |
| F-06-07 | 取引履歴 | /inventory/transactions | TransactionHistoryComponent |
| F-07-03 | 倉庫レイアウト | /warehouses/:id/layout | WarehouseLayoutComponent |
| F-08-02 | 価格編集 | /pricing/:id/edit | PriceEditComponent |
| F-08-03 | 価格比較 | /pricing/compare | PriceCompareComponent |
| F-09-02 | 在庫評価レポート | /reports/inventory-valuation | InventoryValuationComponent |
| F-09-03 | サプライヤー実績レポート | /reports/supplier-performance | SupplierPerformanceComponent |
| F-09-04 | 予算実績対比レポート | /reports/budget-actual | BudgetActualComponent |
| F-10-04 | ロール・権限管理 | /admin/roles | RolePermissionComponent |
| F-10-05 | システム設定 | /admin/config | SystemConfigComponent |
| F-10-06 | 監査ログ | /admin/audit-log | AuditLogComponent |
| F-10-07 | マスターデータ管理 | /admin/master-data | MasterDataComponent |
| F-10-08 | 委任設定 | /admin/delegation | DelegationComponent |
| F-10-09 | 通知設定 | /admin/notification-settings | NotificationSettingsComponent |
| F-13-01 | 予算アラートジョブ | - | BudgetAlertScheduler |
| F-13-02 | 在庫不足アラートジョブ | - | LowStockAlertScheduler |
| F-13-03 | 発注遅延検知ジョブ | - | OverdueOrderScheduler |
| F-13-04 | 通知クリーンアップジョブ | - | NotificationCleanupScheduler |
| F-13-05 | インポートジョブクリーンアップ | - | ImportJobCleanupScheduler |

---

## 未確認事項

- LowStockAlertScheduler, OverdueOrderScheduler, NotificationCleanupScheduler, ImportJobCleanupScheduler の実行スケジュール（@Schedule の詳細パラメータ要確認）
- 多くのREST Resourceに@RolesAllowedが未設定（AdminResourceのみ適用）。意図的か技術的負債か要確認
- AuthenticationFilter の JWT署名検証が未実装（Keycloakアダプタに委譲しているが、ローカル検証がない）
- ProductValidator と PurchaseOrderValidator の SKUパターン不一致
- フロントエンド custom-validators.ts の SKUフォーマットがバックエンドと異なる可能性
- ErrorInterceptor で alert() を使用（NotificationService ではない）— 技術的負債
- beans.xml の bean-discovery-mode="all" — "annotated" にすべき
- LegacyReportGenerator, OldDataMigrationHelper の利用状況
- ストアドプロシージャ3本のアプリケーションからの呼び出し有無
- メール送信機能のテスト状況（MAIL_ENABLED=false がデフォルト）
