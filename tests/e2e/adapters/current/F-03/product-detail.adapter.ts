import { Page } from '@playwright/test';
import type { ProductDetailPageAdapter } from '../../types.js';

export class CurrentProductDetailPageAdapter implements ProductDetailPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToProductDetail(productId: string): Promise<void> {
    await this.page.goto(`/products/${productId}`);
    await this.page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  }

  async waitForProductDetailLoad(): Promise<void> {
    await this.page.waitForSelector('.detail-header, .error-banner', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- ヘッダ情報 ---

  async getPageTitle(): Promise<string> {
    return (await this.page.locator('h1').first().textContent() ?? '').trim();
  }

  async getProductName(): Promise<string> {
    return (await this.page.locator('.product-name').textContent() ?? '').trim();
  }

  async getStatusBadgeText(): Promise<string> {
    return (await this.page.locator('.product-title-row app-status-badge, .product-title-row .status-tag, .product-title-row .status-badge').first().textContent() ?? '').trim();
  }

  async getSku(): Promise<string> {
    const metaItems = this.page.locator('.product-meta .meta-item');
    const count = await metaItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await metaItems.nth(i).textContent() ?? '').trim();
      if (text.startsWith('SKU:') || text.includes('SKU')) {
        return text.replace(/^SKU:\s*/, '').trim();
      }
    }
    return '';
  }

  async getCategoryName(): Promise<string> {
    const metaItems = this.page.locator('.product-meta .meta-item');
    const count = await metaItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await metaItems.nth(i).textContent() ?? '').trim();
      if (text.startsWith('カテゴリ:') || text.includes('カテゴリ')) {
        return text.replace(/^カテゴリ:\s*/, '').trim();
      }
    }
    return '';
  }

  async getManufacturerName(): Promise<string> {
    const metaItems = this.page.locator('.product-meta .meta-item');
    const count = await metaItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await metaItems.nth(i).textContent() ?? '').trim();
      if (text.startsWith('メーカー:') || text.includes('メーカー')) {
        return text.replace(/^メーカー:\s*/, '').trim();
      }
    }
    return '';
  }

  // --- エラー状態 ---

  async isErrorBannerVisible(): Promise<boolean> {
    return await this.page.locator('.error-banner').isVisible().catch(() => false);
  }

  async getErrorBannerMessage(): Promise<string> {
    return (await this.page.locator('.error-banner span, .error-banner .error-message').first().textContent() ?? '').trim();
  }

  async isBackToListButtonVisible(): Promise<boolean> {
    const errorBackBtn = this.page.locator('.error-banner .btn-back');
    if (await errorBackBtn.isVisible().catch(() => false)) return true;
    return await this.page.locator('button, a').filter({ hasText: '一覧に戻る' }).isVisible().catch(() => false);
  }

  // --- アクションボタン ---

  async clickBackToListButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-secondary, button').filter({ hasText: '一覧に戻る' }).first().click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickEditButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-primary').filter({ hasText: '編集' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickDeleteButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-danger').filter({ hasText: '削除' }).click();
  }

  async isDeleteButtonVisible(): Promise<boolean> {
    return await this.page.locator('.header-actions .btn-danger').filter({ hasText: '削除' }).isVisible().catch(() => false);
  }

  // --- 確認ダイアログ ---

  async isConfirmDialogVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog').isVisible().catch(() => false);
  }

  async getConfirmDialogTitle(): Promise<string> {
    return (await this.page.locator('.confirm-dialog .dialog-title').textContent() ?? '').trim();
  }

  async getConfirmDialogMessage(): Promise<string> {
    return (await this.page.locator('.confirm-dialog .dialog-body p').textContent() ?? '').trim();
  }

  async isDialogCancelButtonVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').isVisible().catch(() => false);
  }

  async isDialogConfirmButtonVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').isVisible().catch(() => false);
  }

  async clickDialogConfirmButton(): Promise<void> {
    await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').click();
    await this.page.waitForTimeout(500);
  }

  async clickDialogCancelButton(): Promise<void> {
    await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').click();
    await this.page.waitForTimeout(300);
  }

  // --- タブ ---

  async getTabNames(): Promise<string[]> {
    const tabs = this.page.locator('.tab-navigation .tab-button');
    return await tabs.allTextContents().then(texts => texts.map(t => t.trim()));
  }

  async clickTab(tabName: string): Promise<void> {
    await this.page.locator('.tab-navigation .tab-button').filter({ hasText: tabName }).click();
    await this.page.waitForTimeout(300);
  }

  async getActiveTabName(): Promise<string> {
    return (await this.page.locator('.tab-navigation .tab-button.active').textContent() ?? '').trim();
  }

  // --- 基本情報タブ — ヘルパー ---

  private async getInfoFieldValue(sectionTitle: string, fieldLabel: string): Promise<string> {
    const section = this.page.locator('.info-section').filter({
      has: this.page.locator('.section-subtitle', { hasText: sectionTitle }),
    });
    const row = section.locator('.info-table tr').filter({
      has: this.page.locator('th', { hasText: fieldLabel }),
    });
    return (await row.locator('td').first().textContent() ?? '').trim();
  }

  // --- 基本情報タブ — 基本属性セクション ---

  async getBasicInfoProductName(): Promise<string> {
    return this.getInfoFieldValue('基本情報', '製品名');
  }

  async getBasicInfoSku(): Promise<string> {
    return this.getInfoFieldValue('基本情報', 'SKU');
  }

  async getBasicInfoDescription(): Promise<string> {
    return this.getInfoFieldValue('基本情報', '説明');
  }

  async getBasicInfoCategory(): Promise<string> {
    return this.getInfoFieldValue('基本情報', 'カテゴリ');
  }

  async getBasicInfoManufacturer(): Promise<string> {
    return this.getInfoFieldValue('基本情報', 'メーカー');
  }

  async getBasicInfoStatus(): Promise<string> {
    return this.getInfoFieldValue('基本情報', 'ステータス');
  }

  // --- 基本情報タブ — 価格・数量セクション ---

  async getUnitPrice(): Promise<string> {
    return this.getInfoFieldValue('価格・数量', '単価');
  }

  async getUnit(): Promise<string> {
    return this.getInfoFieldValue('価格・数量', '単位');
  }

  async getMinOrderQuantity(): Promise<string> {
    return this.getInfoFieldValue('価格・数量', '最低発注数');
  }

  async getLeadTime(): Promise<string> {
    return this.getInfoFieldValue('価格・数量', 'リードタイム');
  }

  // --- 基本情報タブ — 物理情報セクション ---

  async getWeight(): Promise<string> {
    return this.getInfoFieldValue('物理情報', '重量');
  }

  async getDimensions(): Promise<string> {
    return this.getInfoFieldValue('物理情報', '寸法');
  }

  // --- 基本情報タブ — 在庫状況セクション ---

  async getTotalStock(): Promise<string> {
    const item = this.page.locator('.stock-item').filter({
      has: this.page.locator('.stock-label', { hasText: '合計在庫' }),
    });
    return (await item.locator('.stock-value').textContent() ?? '').trim();
  }

  async getTotalReserved(): Promise<string> {
    const item = this.page.locator('.stock-item').filter({
      has: this.page.locator('.stock-label', { hasText: '予約済み' }),
    });
    return (await item.locator('.stock-value').textContent() ?? '').trim();
  }

  async getTotalAvailable(): Promise<string> {
    const item = this.page.locator('.stock-item').filter({
      has: this.page.locator('.stock-label', { hasText: '利用可能' }),
    });
    return (await item.locator('.stock-value').textContent() ?? '').trim();
  }

  // --- 基本情報タブ — 管理情報セクション ---

  async getCreatedAt(): Promise<string> {
    return this.getInfoFieldValue('管理情報', '登録日');
  }

  async getUpdatedAt(): Promise<string> {
    return this.getInfoFieldValue('管理情報', '最終更新日');
  }

  async getNotes(): Promise<string> {
    return this.getInfoFieldValue('管理情報', '備考');
  }

  // --- 仕様タブ ---

  async isSpecTableVisible(): Promise<boolean> {
    return await this.page.locator('table.spec-table').isVisible().catch(() => false);
  }

  async getSpecTableRowCount(): Promise<number> {
    return await this.page.locator('table.spec-table tbody tr').count();
  }

  async isSpecItemVisible(key: string): Promise<boolean> {
    const row = this.page.locator('table.spec-table tbody tr').filter({
      has: this.page.locator('td.spec-key', { hasText: key }),
    });
    return (await row.count()) > 0;
  }

  async getSpecItemValue(key: string): Promise<string> {
    const row = this.page.locator('table.spec-table tbody tr').filter({
      has: this.page.locator('td.spec-key', { hasText: key }),
    });
    return (await row.locator('td:nth-child(2)').textContent() ?? '').trim();
  }

  async isSpecEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel .empty-state').isVisible().catch(() => false);
  }

  async getSpecEmptyMessage(): Promise<string> {
    return (await this.page.locator('.tab-panel .empty-state .empty-message').textContent() ?? '').trim();
  }

  // --- 画像タブ ---

  async isImageGridVisible(): Promise<boolean> {
    return await this.page.locator('.image-grid').isVisible().catch(() => false);
  }

  async getImageCardCount(): Promise<number> {
    return await this.page.locator('.image-grid .image-card').count();
  }

  async isPrimaryBadgeVisible(): Promise<boolean> {
    return await this.page.locator('.image-grid .primary-badge').isVisible().catch(() => false);
  }

  async getImageAltText(index: number): Promise<string> {
    return (await this.page.locator('.image-grid .image-card').nth(index).locator('.image-alt').textContent() ?? '').trim();
  }

  async isImageEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel .empty-state, app-empty-state').isVisible().catch(() => false);
  }

  async getImageEmptyMessage(): Promise<string> {
    const appEmpty = this.page.locator('app-empty-state');
    if (await appEmpty.isVisible().catch(() => false)) {
      return (await appEmpty.locator('.empty-message, p').first().textContent() ?? '').trim();
    }
    return (await this.page.locator('.tab-panel .empty-state .empty-message').textContent() ?? '').trim();
  }

  // --- 代替品タブ ---

  async isAlternativesTableVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel .data-table').isVisible().catch(() => false);
  }

  async getAlternativesRowCount(): Promise<number> {
    return await this.page.locator('.tab-panel .data-table tbody tr').count();
  }

  async isAlternativesColumnVisible(columnName: string): Promise<boolean> {
    const headers = this.page.locator('.tab-panel .data-table thead th');
    const count = await headers.count();
    for (let i = 0; i < count; i++) {
      const text = (await headers.nth(i).textContent() ?? '').trim();
      if (text === columnName) return true;
    }
    return false;
  }

  async clickAlternativesDetailButton(index: number): Promise<void> {
    await this.page.locator('.tab-panel .data-table tbody tr').nth(index).locator('.btn-link').filter({ hasText: '詳細' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isAlternativesEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel app-empty-state').isVisible().catch(() => false);
  }

  async getAlternativesEmptyMessage(): Promise<string> {
    return (await this.page.locator('.tab-panel app-empty-state .empty-message, .tab-panel app-empty-state p').first().textContent() ?? '').trim();
  }

  // --- サプライヤータブ ---

  async isSupplierTableVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel .data-table').isVisible().catch(() => false);
  }

  async getSupplierRowCount(): Promise<number> {
    return await this.page.locator('.tab-panel .data-table tbody tr').count();
  }

  async isSupplierColumnVisible(columnName: string): Promise<boolean> {
    const headers = this.page.locator('.tab-panel .data-table thead th');
    const count = await headers.count();
    for (let i = 0; i < count; i++) {
      const text = (await headers.nth(i).textContent() ?? '').trim();
      if (text === columnName) return true;
    }
    return false;
  }

  async clickSupplierDetailButton(index: number): Promise<void> {
    await this.page.locator('.tab-panel .data-table tbody tr').nth(index).locator('.btn-link').filter({ hasText: '詳細' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isSupplierEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel app-empty-state').isVisible().catch(() => false);
  }

  async getSupplierEmptyMessage(): Promise<string> {
    return (await this.page.locator('.tab-panel app-empty-state .empty-message, .tab-panel app-empty-state p').first().textContent() ?? '').trim();
  }

  // --- ドキュメントタブ ---

  async isDocumentListVisible(): Promise<boolean> {
    return await this.page.locator('.document-list').isVisible().catch(() => false);
  }

  async getDocumentItemCount(): Promise<number> {
    return await this.page.locator('.document-item').count();
  }

  async isDocumentIconVisible(index: number): Promise<boolean> {
    return await this.page.locator('.document-item').nth(index).locator('.file-type-icon').isVisible().catch(() => false);
  }

  async getDocumentName(index: number): Promise<string> {
    return (await this.page.locator('.document-item').nth(index).locator('.document-name').textContent() ?? '').trim();
  }

  async getDocumentMeta(index: number): Promise<string> {
    return (await this.page.locator('.document-item').nth(index).locator('.document-meta').textContent() ?? '').trim();
  }

  async isDownloadButtonVisible(index: number): Promise<boolean> {
    return await this.page.locator('.document-item').nth(index).locator('.btn-link').filter({ hasText: 'ダウンロード' }).isVisible().catch(() => false);
  }

  async isDocumentEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel app-empty-state').isVisible().catch(() => false);
  }

  async getDocumentEmptyMessage(): Promise<string> {
    return (await this.page.locator('.tab-panel app-empty-state .empty-message, .tab-panel app-empty-state p').first().textContent() ?? '').trim();
  }

  // --- 変更履歴タブ ---

  async isChangelogVisible(): Promise<boolean> {
    return await this.page.locator('.changelog').isVisible().catch(() => false);
  }

  async getChangelogEntryCount(): Promise<number> {
    return await this.page.locator('.changelog-entry').count();
  }

  async getChangelogField(index: number): Promise<string> {
    return (await this.page.locator('.changelog-entry').nth(index).locator('.changelog-field').textContent() ?? '').trim();
  }

  async getChangelogOldValue(index: number): Promise<string> {
    return (await this.page.locator('.changelog-entry').nth(index).locator('.old-value').textContent() ?? '').trim();
  }

  async getChangelogNewValue(index: number): Promise<string> {
    return (await this.page.locator('.changelog-entry').nth(index).locator('.new-value').textContent() ?? '').trim();
  }

  async getChangelogUser(index: number): Promise<string> {
    return (await this.page.locator('.changelog-entry').nth(index).locator('.changelog-user').textContent() ?? '').trim();
  }

  async isChangelogEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel app-empty-state').isVisible().catch(() => false);
  }

  async getChangelogEmptyMessage(): Promise<string> {
    return (await this.page.locator('.tab-panel app-empty-state .empty-message, .tab-panel app-empty-state p').first().textContent() ?? '').trim();
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
