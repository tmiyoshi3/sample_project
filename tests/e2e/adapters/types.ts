import { Page } from '@playwright/test';

// ============================================================
// F-12: 共通機能 — ナビゲーション・ヘッダー・フッター
// ============================================================

export interface LayoutNavigationAdapter {
  readonly page: Page;

  getMenuLabels(): Promise<string[]>;
  getMenuItemCount(): Promise<number>;
  clickMenuItem(menuName: string): Promise<void>;
  isMenuItemActive(menuName: string): Promise<boolean>;

  isSidebarExpanded(): Promise<boolean>;
  isSidebarCollapsed(): Promise<boolean>;
  areLabelsVisible(): Promise<boolean>;
  areIconsVisible(): Promise<boolean>;

  clickMenuToggle(): Promise<void>;

  fillSearchKeyword(keyword: string): Promise<void>;
  clickSearchButton(): Promise<void>;
  submitSearchByEnter(): Promise<void>;
  getSearchInputValue(): Promise<string>;

  getCurrentUrl(): string;
  waitForUrlContaining(path: string): Promise<void>;
}

export interface NotificationAdapter {
  readonly page: Page;

  isNotificationButtonVisible(): Promise<boolean>;
  isBadgeVisible(): Promise<boolean>;
  getBadgeCount(): Promise<number>;
  clickNotificationButton(): Promise<void>;
}

export interface UserMenuAdapter {
  readonly page: Page;

  getHeaderUsername(): Promise<string>;
  getUserAvatar(): Promise<string>;

  openUserMenu(): Promise<void>;
  isUserMenuOpen(): Promise<boolean>;

  getDropdownUsername(): Promise<string>;
  getDropdownRole(): Promise<string>;

  clickSettingsLink(): Promise<void>;
  clickLogoutButton(): Promise<void>;
  clickOutsideUserMenu(): Promise<void>;
}

export interface SystemIdentityAdapter {
  readonly page: Page;

  getSystemName(): Promise<string>;
  getSubtitle(): Promise<string>;

  isVersionVisible(): Promise<boolean>;
  getVersionText(): Promise<string>;

  getFooterText(): Promise<string>;
}

// ============================================================
// F-01: 認証
// ============================================================

export interface LoginExpectedLabels {
  loginButton: string;
  passwordResetLink: string;
  passwordResetTitle: string;
  langOptionEnglish: string;
  langOptionJapanese: string;
  currentLangAfterEnglish: string;
}

export interface LoginPageAdapter {
  readonly page: Page;

  getExpectedLabels(): LoginExpectedLabels;

  navigateToLogin(): Promise<void>;
  getPageTitle(): Promise<string>;

  getUsernameLabel(): Promise<string>;
  getPasswordLabel(): Promise<string>;
  getLoginButtonLabel(): Promise<string>;

  isUsernameFieldVisible(): Promise<boolean>;
  isPasswordFieldVisible(): Promise<boolean>;
  isLoginButtonVisible(): Promise<boolean>;
  isUsernameFocused(): Promise<boolean>;
  isPasswordMasked(): Promise<boolean>;

  fillUsername(username: string): Promise<void>;
  clearAndFillUsername(username: string): Promise<void>;
  fillPassword(password: string): Promise<void>;
  clickLoginButton(): Promise<void>;

  getErrorMessage(): Promise<string | null>;
  getInfoMessage(): Promise<string | null>;
  getUsernameValue(): Promise<string>;
  getPasswordValue(): Promise<string>;
  hasFieldErrorState(): Promise<boolean>;

  isPasswordResetLinkVisible(): Promise<boolean>;
  getPasswordResetLinkText(): Promise<string>;
  clickPasswordResetLink(): Promise<void>;

  isLanguageDropdownVisible(): Promise<boolean>;
  getCurrentLanguage(): Promise<string>;
  openLanguageDropdown(): Promise<void>;
  getLanguageOptions(): Promise<string[]>;
  selectLanguage(language: string): Promise<void>;

  isDashboardVisible(): Promise<boolean>;
  waitForDashboard(): Promise<void>;
  getCurrentUrl(): string;
}

export interface PasswordResetPageAdapter {
  readonly page: Page;

  isVisible(): Promise<boolean>;
  getPageTitle(): Promise<string>;
  getDescription(): Promise<string>;

  isUsernameFieldVisible(): Promise<boolean>;
  isSubmitButtonVisible(): Promise<boolean>;
  isBackToLoginLinkVisible(): Promise<boolean>;
  isLanguageDropdownVisible(): Promise<boolean>;

  getBackToLoginLinkText(): Promise<string>;

  fillUsername(username: string): Promise<void>;
  clickSubmitButton(): Promise<void>;
  clickBackToLogin(): Promise<void>;

  getErrorMessage(): Promise<string | null>;
}

// ============================================================
// F-03: 製品カタログ — 製品一覧画面
// ============================================================

export interface ProductRow {
  sku: string;
  name: string;
  categoryName: string;
  manufacturerName: string;
  unitPrice: string;
  status: string;
  stockQuantity: string;
}

export interface ProductListPageAdapter {
  readonly page: Page;

  navigateToProductList(): Promise<void>;
  waitForProductListLoad(): Promise<void>;

  // 検索
  fillSearchKeyword(keyword: string): Promise<void>;
  clearSearchKeyword(): Promise<void>;
  isSearchBoxVisible(): Promise<boolean>;

  // カテゴリフィルタ
  selectCategory(categoryName: string): Promise<void>;
  selectCategoryByProductCount(maxCount: number): Promise<void>;
  getCategoryOptionCount(): Promise<number>;
  getCategoryOptions(): Promise<string[]>;
  isCategoryFilterVisible(): Promise<boolean>;

  // メーカーフィルタ
  selectManufacturer(manufacturerName: string): Promise<void>;
  getManufacturerOptionCount(): Promise<number>;
  getManufacturerOptions(): Promise<string[]>;
  isManufacturerFilterVisible(): Promise<boolean>;

  // ステータスフィルタ
  selectStatus(statusLabel: string): Promise<void>;
  getStatusOptions(): Promise<string[]>;
  isStatusFilterVisible(): Promise<boolean>;

  // フィルタリセット
  isResetLinkVisible(): Promise<boolean>;
  clickResetLink(): Promise<void>;

  // テーブル
  getTableRowCount(): Promise<number>;
  getTableRows(): Promise<ProductRow[]>;
  getColumnHeaders(): Promise<string[]>;
  isColumnVisible(columnName: string): Promise<boolean>;
  clickTableRow(index: number): Promise<void>;

  // ソート
  clickColumnHeader(columnName: string): Promise<void>;
  hasSortIndicator(columnName: string): Promise<boolean>;
  getSortDirection(columnName: string): Promise<'asc' | 'desc' | null>;

  // ページング
  getActivePageNumber(): Promise<number>;
  clickPageNumber(page: number): Promise<void>;
  clickFirstPageButton(): Promise<void>;
  clickPreviousPageButton(): Promise<void>;
  clickNextPageButton(): Promise<void>;
  clickLastPageButton(): Promise<void>;
  isFirstPageButtonDisabled(): Promise<boolean>;
  isPreviousPageButtonDisabled(): Promise<boolean>;
  isNextPageButtonDisabled(): Promise<boolean>;
  isLastPageButtonDisabled(): Promise<boolean>;
  getPageNumbers(): Promise<number[]>;
  getPaginationInfo(): Promise<string>;
  getResultCountInfo(): Promise<string>;

  // ボタン
  isButtonVisible(buttonLabel: string): Promise<boolean>;
  clickButton(buttonLabel: string): Promise<void>;

  // 空状態
  isEmptyStateVisible(): Promise<boolean>;

  // CSV
  clickCsvExportButton(): Promise<void>;

  // URL
  getCurrentUrl(): string;
}

// ============================================================
// F-03: 製品カタログ — 製品詳細画面
// ============================================================

export interface ProductDetailPageAdapter {
  readonly page: Page;

  navigateToProductDetail(productId: string): Promise<void>;
  waitForProductDetailLoad(): Promise<void>;

  // ヘッダ情報
  getPageTitle(): Promise<string>;
  getProductName(): Promise<string>;
  getStatusBadgeText(): Promise<string>;
  getSku(): Promise<string>;
  getCategoryName(): Promise<string>;
  getManufacturerName(): Promise<string>;

  // エラー状態
  isErrorBannerVisible(): Promise<boolean>;
  getErrorBannerMessage(): Promise<string>;
  isBackToListButtonVisible(): Promise<boolean>;

  // アクションボタン
  clickBackToListButton(): Promise<void>;
  clickEditButton(): Promise<void>;
  clickDeleteButton(): Promise<void>;
  isDeleteButtonVisible(): Promise<boolean>;

  // 確認ダイアログ
  isConfirmDialogVisible(): Promise<boolean>;
  getConfirmDialogTitle(): Promise<string>;
  getConfirmDialogMessage(): Promise<string>;
  isDialogCancelButtonVisible(): Promise<boolean>;
  isDialogConfirmButtonVisible(): Promise<boolean>;
  clickDialogConfirmButton(): Promise<void>;
  clickDialogCancelButton(): Promise<void>;

  // タブ
  getTabNames(): Promise<string[]>;
  clickTab(tabName: string): Promise<void>;
  getActiveTabName(): Promise<string>;

  // 基本情報タブ — 基本属性セクション
  getBasicInfoProductName(): Promise<string>;
  getBasicInfoSku(): Promise<string>;
  getBasicInfoDescription(): Promise<string>;
  getBasicInfoCategory(): Promise<string>;
  getBasicInfoManufacturer(): Promise<string>;
  getBasicInfoStatus(): Promise<string>;

  // 基本情報タブ — 価格・数量セクション
  getUnitPrice(): Promise<string>;
  getUnit(): Promise<string>;
  getMinOrderQuantity(): Promise<string>;
  getLeadTime(): Promise<string>;

  // 基本情報タブ — 物理情報セクション
  getWeight(): Promise<string>;
  getDimensions(): Promise<string>;

  // 基本情報タブ — 在庫状況セクション
  getTotalStock(): Promise<string>;
  getTotalReserved(): Promise<string>;
  getTotalAvailable(): Promise<string>;

  // 基本情報タブ — 管理情報セクション
  getCreatedAt(): Promise<string>;
  getUpdatedAt(): Promise<string>;
  getNotes(): Promise<string>;

  // 仕様タブ
  isSpecTableVisible(): Promise<boolean>;
  getSpecTableRowCount(): Promise<number>;
  isSpecItemVisible(key: string): Promise<boolean>;
  getSpecItemValue(key: string): Promise<string>;
  isSpecEmptyMessageVisible(): Promise<boolean>;
  getSpecEmptyMessage(): Promise<string>;

  // 画像タブ
  isImageGridVisible(): Promise<boolean>;
  getImageCardCount(): Promise<number>;
  isPrimaryBadgeVisible(): Promise<boolean>;
  getImageAltText(index: number): Promise<string>;
  isImageEmptyMessageVisible(): Promise<boolean>;
  getImageEmptyMessage(): Promise<string>;

  // 代替品タブ
  isAlternativesTableVisible(): Promise<boolean>;
  getAlternativesRowCount(): Promise<number>;
  isAlternativesColumnVisible(columnName: string): Promise<boolean>;
  clickAlternativesDetailButton(index: number): Promise<void>;
  isAlternativesEmptyMessageVisible(): Promise<boolean>;
  getAlternativesEmptyMessage(): Promise<string>;

  // サプライヤータブ
  isSupplierTableVisible(): Promise<boolean>;
  getSupplierRowCount(): Promise<number>;
  isSupplierColumnVisible(columnName: string): Promise<boolean>;
  clickSupplierDetailButton(index: number): Promise<void>;
  isSupplierEmptyMessageVisible(): Promise<boolean>;
  getSupplierEmptyMessage(): Promise<string>;

  // ドキュメントタブ
  isDocumentListVisible(): Promise<boolean>;
  getDocumentItemCount(): Promise<number>;
  isDocumentIconVisible(index: number): Promise<boolean>;
  getDocumentName(index: number): Promise<string>;
  getDocumentMeta(index: number): Promise<string>;
  isDownloadButtonVisible(index: number): Promise<boolean>;
  isDocumentEmptyMessageVisible(): Promise<boolean>;
  getDocumentEmptyMessage(): Promise<string>;

  // 変更履歴タブ
  isChangelogVisible(): Promise<boolean>;
  getChangelogEntryCount(): Promise<number>;
  getChangelogField(index: number): Promise<string>;
  getChangelogOldValue(index: number): Promise<string>;
  getChangelogNewValue(index: number): Promise<string>;
  getChangelogUser(index: number): Promise<string>;
  isChangelogEmptyMessageVisible(): Promise<boolean>;
  getChangelogEmptyMessage(): Promise<string>;

  // URL
  getCurrentUrl(): string;
}

// ============================================================
// F-03: 製品カタログ — カテゴリ管理画面
// ============================================================

export interface CategoryManagementPageAdapter {
  readonly page: Page;

  navigateToCategoryManagement(): Promise<void>;
  waitForCategoryManagementLoad(): Promise<void>;

  // ツリー表示
  isCategoryTreeVisible(): Promise<boolean>;
  getRootCategoryCount(): Promise<number>;
  getCategoryNames(): Promise<string[]>;
  getChildCategoryNames(parentName: string): Promise<string[]>;
  getProductCount(categoryName: string): Promise<string>;
  isCategoryVisible(categoryName: string): Promise<boolean>;

  // 展開/折りたたみ
  hasToggleIcon(categoryName: string): Promise<boolean>;
  isExpandedIcon(categoryName: string): Promise<boolean>;
  clickToggleIcon(categoryName: string): Promise<void>;
  areChildrenVisible(parentName: string): Promise<boolean>;
  isAllExpanded(): Promise<boolean>;

  // 新規カテゴリボタン
  clickNewCategoryButton(): Promise<void>;
  isNewCategoryButtonVisible(): Promise<boolean>;

  // フォーム
  isCreateFormVisible(): Promise<boolean>;
  isEditFormVisible(): Promise<boolean>;
  isFormClosed(): Promise<boolean>;
  getFormTitle(): Promise<string>;
  getCategoryNameInputValue(): Promise<string>;
  getDescriptionInputValue(): Promise<string>;
  getParentCategorySelectValue(): Promise<string>;
  fillCategoryName(name: string): Promise<void>;
  clearCategoryName(): Promise<void>;
  fillCategoryNameWithLength(length: number): Promise<void>;
  fillDescription(description: string): Promise<void>;
  selectParentCategory(parentName: string): Promise<void>;
  clickSaveButton(): Promise<void>;
  clickFormCancelButton(): Promise<void>;
  isSaveButtonDisabled(): Promise<boolean>;
  getValidationError(): Promise<string>;
  getCategoryNameValidationError(): Promise<string>;

  // 子カテゴリ追加
  clickAddChildButton(categoryName: string): Promise<void>;

  // 編集
  hoverCategory(categoryName: string): Promise<void>;
  clickEditButton(categoryName: string): Promise<void>;
  isEditButtonVisibleOnHover(): Promise<boolean>;
  isCategoryHighlighted(categoryName: string): Promise<boolean>;

  // 上下移動
  clickMoveUpButton(categoryName: string): Promise<void>;
  clickMoveDownButton(categoryName: string): Promise<void>;

  // 削除
  clickDeleteButton(categoryName: string): Promise<void>;
  isConfirmDialogVisible(): Promise<boolean>;
  getConfirmDialogTitle(): Promise<string>;
  getConfirmDialogMessage(): Promise<string>;
  clickDialogConfirmButton(): Promise<void>;
  clickDialogCancelButton(): Promise<void>;
  isDialogDeleteButtonVisible(): Promise<boolean>;
  isDialogCancelButtonVisible(): Promise<boolean>;

  // メッセージ
  getSuccessMessage(): Promise<string>;
  getErrorMessage(): Promise<string>;
  isSuccessMessageVisible(): Promise<boolean>;
  isErrorMessageVisible(): Promise<boolean>;

  // リロード
  reloadPage(): Promise<void>;

  // URL
  getCurrentUrl(): string;
}

// ============================================================
// F-03: 製品カタログ — バンドル管理画面
// ============================================================

export interface BundleManagementPageAdapter {
  readonly page: Page;

  navigateToBundleManagement(): Promise<void>;
  waitForBundleManagementLoad(): Promise<void>;

  // バンドルカード一覧
  getBundleCardCount(): Promise<number>;
  getBundleCardNames(): Promise<string[]>;
  isBundleCardVisible(bundleName: string): Promise<boolean>;
  getBundleCardDescription(bundleName: string): Promise<string>;

  // ステータスバッジ
  getBundleStatusBadgeText(bundleName: string): Promise<string>;

  // 構成製品チップ（カード内）
  getBundleProductChips(bundleName: string): Promise<string[]>;

  // 価格情報（カード内）
  getBundleTotalPrice(bundleName: string): Promise<string>;
  getBundleDiscountPercentage(bundleName: string): Promise<string>;
  getBundleBundlePrice(bundleName: string): Promise<string>;
  isTotalPriceStrikethrough(bundleName: string): Promise<boolean>;

  // 新規作成ボタン
  isCreateButtonVisible(): Promise<boolean>;
  clickCreateButton(): Promise<void>;

  // バンドル一覧表示状態
  isBundleListVisible(): Promise<boolean>;
  isBundleListHidden(): Promise<boolean>;

  // フォーム
  isCreateFormVisible(): Promise<boolean>;
  isEditFormVisible(): Promise<boolean>;
  isFormVisible(): Promise<boolean>;
  getFormTitle(): Promise<string>;

  // フォーム入力
  getBundleNameInputValue(): Promise<string>;
  fillBundleName(name: string): Promise<void>;
  getStatusSelectValue(): Promise<string>;
  selectStatus(status: string): Promise<void>;
  getDescriptionValue(): Promise<string>;
  fillDescription(description: string): Promise<void>;
  getDiscountPercentageValue(): Promise<string>;
  fillDiscountPercentage(value: string): Promise<void>;

  // 製品検索（フォーム内）
  fillProductSearch(keyword: string): Promise<void>;
  getSearchResultCount(): Promise<number>;
  getSearchResultTexts(): Promise<string[]>;
  clickSearchResult(index: number): Promise<void>;
  isSearchDropdownVisible(): Promise<boolean>;

  // 構成製品テーブル（フォーム内）
  getBundleItemCount(): Promise<number>;
  getBundleItemQuantity(index: number): Promise<string>;
  setBundleItemQuantity(index: number, quantity: string): Promise<void>;
  clickRemoveBundleItem(index: number): Promise<void>;
  isNoItemsMessageVisible(): Promise<boolean>;
  getNoItemsMessage(): Promise<string>;

  // 価格計算エリア（フォーム内）
  isPriceCalculationVisible(): Promise<boolean>;
  getCalculatedTotalPrice(): Promise<string>;
  getCalculatedDiscountAmount(): Promise<string>;
  getCalculatedBundlePrice(): Promise<string>;

  // フォームアクション
  clickSaveButton(): Promise<void>;
  clickCancelButton(): Promise<void>;

  // 編集・削除ボタン（カード内）
  clickEditButton(bundleName: string): Promise<void>;
  clickDeleteButton(bundleName: string): Promise<void>;
  isDeleteButtonVisibleOnCard(): Promise<boolean>;

  // 確認ダイアログ
  isConfirmDialogVisible(): Promise<boolean>;
  getConfirmDialogMessage(): Promise<string>;
  clickDialogConfirmButton(): Promise<void>;
  clickDialogCancelButton(): Promise<void>;
  isDialogConfirmButtonVisible(): Promise<boolean>;
  isDialogCancelButtonVisible(): Promise<boolean>;

  // メッセージ
  getSuccessMessage(): Promise<string>;
  getErrorMessage(): Promise<string>;
  isSuccessMessageVisible(): Promise<boolean>;
  isErrorMessageVisible(): Promise<boolean>;

  // リロード
  reloadPage(): Promise<void>;

  // URL
  getCurrentUrl(): string;
}

// ============================================================
// F-03: 製品カタログ — 製品登録画面（ウィザード）
// ============================================================

export interface ProductCreatePageAdapter {
  readonly page: Page;

  // Navigation
  navigateToCreateWizard(): Promise<void>;
  waitForWizardLoad(): Promise<void>;

  // Step indicator
  getStepCount(): Promise<number>;
  getActiveStepIndex(): Promise<number>;
  getActiveStepTitle(): Promise<string>;
  isStepCompleted(stepIndex: number): Promise<boolean>;
  getStepTitle(stepIndex: number): Promise<string>;

  // Page title
  getPageTitle(): Promise<string>;

  // Navigation buttons
  isPrevButtonVisible(): Promise<boolean>;
  isNextButtonVisible(): Promise<boolean>;
  isCancelButtonVisible(): Promise<boolean>;
  isSubmitButtonVisible(): Promise<boolean>;
  isSubmitButtonDisabled(): Promise<boolean>;
  clickPrevButton(): Promise<void>;
  clickNextButton(): Promise<void>;
  clickCancelButton(): Promise<void>;
  clickSubmitButton(): Promise<void>;

  // Step 1: Basic info
  fillProductName(name: string): Promise<void>;
  fillSku(sku: string): Promise<void>;
  fillDescription(description: string): Promise<void>;
  selectCategory(categoryName: string): Promise<void>;
  selectManufacturer(manufacturerName: string): Promise<void>;
  getStatusValue(): Promise<string>;
  selectStatus(statusLabel: string): Promise<void>;
  getCategoryOptionCount(): Promise<number>;
  getManufacturerOptionCount(): Promise<number>;
  isSkuCheckLoading(): Promise<boolean>;
  isSkuAvailable(): Promise<boolean>;
  isSkuDuplicate(): Promise<boolean>;
  getSkuCheckIndicatorText(): Promise<string>;
  getValidationErrors(): Promise<string[]>;
  isValidationErrorVisible(message: string): Promise<boolean>;
  getProductNameValue(): Promise<string>;
  getSkuValue(): Promise<string>;

  // Step 2: Price/Inventory
  fillUnitPrice(price: string): Promise<void>;
  selectUnit(unit: string): Promise<void>;
  fillMinOrderQuantity(qty: string): Promise<void>;
  fillLeadTime(days: string): Promise<void>;
  fillWeight(weight: string): Promise<void>;
  fillDimensions(dimensions: string): Promise<void>;
  getUnitPriceValue(): Promise<string>;
  getUnitValue(): Promise<string>;
  getMinOrderQuantityValue(): Promise<string>;
  getLeadTimeValue(): Promise<string>;
  getUnitOptionCount(): Promise<number>;
  isMinOrderQtyErrorVisible(): Promise<boolean>;
  isLeadTimeErrorVisible(): Promise<boolean>;

  // Step 3: Specifications
  getSpecRowCount(): Promise<number>;
  fillSpecKey(rowIndex: number, key: string): Promise<void>;
  fillSpecValue(rowIndex: number, value: string): Promise<void>;
  clickAddSpecRow(): Promise<void>;
  clickRemoveSpecRow(rowIndex: number): Promise<void>;
  isRemoveSpecRowDisabled(rowIndex: number): Promise<boolean>;
  isAddSpecRowButtonVisible(): Promise<boolean>;
  fillNotes(notes: string): Promise<void>;
  isNotesTextareaVisible(): Promise<boolean>;

  // Step 4: Media
  isImageSectionVisible(): Promise<boolean>;
  isDocumentSectionVisible(): Promise<boolean>;
  getImageSectionTitle(): Promise<string>;
  getDocumentSectionTitle(): Promise<string>;
  getImageHintText(): Promise<string>;
  getDocumentHintText(): Promise<string>;
  isAddImageButtonVisible(): Promise<boolean>;
  isAddDocumentButtonVisible(): Promise<boolean>;
  uploadImage(filePath: string): Promise<void>;
  uploadDocument(filePath: string): Promise<void>;
  getImagePreviewCount(): Promise<number>;
  getDocumentItemCount(): Promise<number>;

  // Step 5: Review
  isReviewSectionVisible(): Promise<boolean>;
  getReviewGroupTitles(): Promise<string[]>;
  getReviewValue(groupTitle: string, label: string): Promise<string>;

  // Messages
  isSuccessMessageVisible(): Promise<boolean>;
  isErrorMessageVisible(): Promise<boolean>;
  getErrorMessage(): Promise<string>;

  // URL
  getCurrentUrl(): string;
}

// ============================================================
// F-03: 製品カタログ — 製品編集画面
// ============================================================

export interface ProductEditPageAdapter {
  readonly page: Page;

  // Navigation
  navigateToEditPage(productId: string): Promise<void>;
  waitForEditFormLoad(): Promise<void>;

  // Page title
  getPageTitle(): Promise<string>;

  // Basic info (editForm)
  getProductNameValue(): Promise<string>;
  getSkuValue(): Promise<string>;
  getDescriptionValue(): Promise<string>;
  getCategorySelectedText(): Promise<string>;
  getManufacturerSelectedText(): Promise<string>;
  getStatusSelectedText(): Promise<string>;
  getStatusOptionCount(): Promise<number>;
  fillProductName(name: string): Promise<void>;
  clearProductName(): Promise<void>;
  fillSku(sku: string): Promise<void>;
  selectStatus(statusLabel: string): Promise<void>;
  isSkuCheckLoading(): Promise<boolean>;
  isSkuAvailable(): Promise<boolean>;
  isSkuDuplicate(): Promise<boolean>;
  getSkuCheckIndicatorText(): Promise<string>;

  // Price/Inventory
  getUnitPriceValue(): Promise<string>;
  getNotesValue(): Promise<string>;
  fillUnitPrice(price: string): Promise<void>;

  // Sections visibility
  isSectionVisible(sectionTitle: string): Promise<boolean>;

  // Specifications
  getSpecRowCount(): Promise<number>;
  getSpecKeyValue(rowIndex: number): Promise<string>;
  getSpecValueValue(rowIndex: number): Promise<string>;
  fillSpecKey(rowIndex: number, key: string): Promise<void>;
  fillSpecValue(rowIndex: number, value: string): Promise<void>;
  clickAddSpecRow(): Promise<void>;
  clickRemoveSpecRow(rowIndex: number): Promise<void>;
  isRemoveSpecRowDisabled(rowIndex: number): Promise<boolean>;

  // Images
  getExistingImageCount(): Promise<number>;
  isPrimaryBadgeVisible(): Promise<boolean>;
  isDeleteImageButtonVisible(index: number): Promise<boolean>;
  clickDeleteImageButton(index: number): Promise<void>;
  isAddImageButtonVisible(): Promise<boolean>;
  uploadImage(filePath: string): Promise<void>;
  isImageEmptyMessageVisible(): Promise<boolean>;

  // Documents
  getExistingDocumentCount(): Promise<number>;
  getDocumentName(index: number): Promise<string>;
  isDeleteDocumentButtonVisible(index: number): Promise<boolean>;
  clickDeleteDocumentButton(index: number): Promise<void>;
  isAddDocumentButtonVisible(): Promise<boolean>;
  selectDocumentType(docType: string): Promise<void>;
  uploadDocument(filePath: string): Promise<void>;
  isDocumentEmptyMessageVisible(): Promise<boolean>;

  // Action buttons
  clickUpdateButton(): Promise<void>;
  clickCancelButton(): Promise<void>;
  isUpdateButtonDisabled(): Promise<boolean>;
  isUpdateButtonVisible(): Promise<boolean>;
  isCancelButtonVisible(): Promise<boolean>;

  // Messages
  isSuccessMessageVisible(): Promise<boolean>;
  isErrorMessageVisible(): Promise<boolean>;
  getErrorMessage(): Promise<string>;

  // Validation
  isValidationErrorVisible(message: string): Promise<boolean>;

  // Error state (product not found)
  isErrorContainerVisible(): Promise<boolean>;

  // URL
  getCurrentUrl(): string;
}

export interface OrderRow {
  orderNumber: string;
  supplier: string;
  orderDate: string;
  amount: string;
  status: string;
  statusClass: string;
}

export interface CategoryItem {
  name: string;
  percentage: string;
  amount: string;
}

export interface DashboardPageAdapter {
  readonly page: Page;

  navigateToDashboard(): Promise<void>;
  isDashboardVisible(): Promise<boolean>;
  waitForDashboardLoad(): Promise<void>;

  getSummaryCardCount(): Promise<number>;
  isCardVisible(cardTitle: string): Promise<boolean>;
  getCardMainValue(cardTitle: string): Promise<string>;
  getCardDescription(cardTitle: string): Promise<string>;
  isCardHighlighted(cardTitle: string): Promise<boolean>;
  clickCard(cardTitle: string): Promise<void>;

  getOrderCardPendingCount(): Promise<string>;
  getOrderCardApprovedCount(): Promise<string>;

  isBudgetProgressBarVisible(): Promise<boolean>;
  getBudgetDetail(): Promise<string>;

  isSectionVisible(sectionTitle: string): Promise<boolean>;

  isMonthlySpendingChartVisible(): Promise<boolean>;
  isPlaceholderNoteVisible(): Promise<boolean>;

  getCategoryItems(): Promise<CategoryItem[]>;
  isCategoryBarVisible(index: number): Promise<boolean>;

  getRecentOrderRows(): Promise<OrderRow[]>;
  getRecentOrderRowCount(): Promise<number>;
  clickOrderRow(index: number): Promise<void>;
  isOrderTableEmpty(): Promise<boolean>;
  getOrderTableEmptyMessage(): Promise<string>;

  getInventoryAlertCount(): Promise<number>;
  isInventoryAlertEmpty(): Promise<boolean>;
  getInventoryAlertEmptyMessage(): Promise<string>;
  getInventoryAlertProductNames(): Promise<string[]>;
  getInventoryAlertProductSkus(): Promise<string[]>;

  clickViewAllOrdersLink(): Promise<void>;
  clickViewAllInventoryLink(): Promise<void>;

  getCurrentUrl(): string;
}
