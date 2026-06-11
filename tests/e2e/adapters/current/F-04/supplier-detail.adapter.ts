import { Page } from '@playwright/test';
import type { SupplierDetailPageAdapter } from '../../types.js';

export class CurrentSupplierDetailPageAdapter implements SupplierDetailPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToSupplierDetail(supplierId: number): Promise<void> {
    await this.page.goto(`/suppliers/${supplierId}`);
    await this.waitForSupplierDetailLoad();
  }

  async waitForSupplierDetailLoad(): Promise<void> {
    await this.page.waitForSelector('.detail-container, .error-banner', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- ヘッダ情報 ---

  async getPageTitle(): Promise<string> {
    return (await this.page.locator('app-page-header .page-title, app-page-header h1').first().textContent() ?? '').trim();
  }

  async getSupplierName(): Promise<string> {
    return (await this.page.locator('.supplier-name').textContent() ?? '').trim();
  }

  async getStatusBadgeText(): Promise<string> {
    return (await this.page.locator('.detail-header app-status-badge .status-badge, .detail-header .status-badge').first().textContent() ?? '').trim();
  }

  async getSupplierCode(): Promise<string> {
    const metaItems = this.page.locator('.supplier-meta .meta-item');
    const count = await metaItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await metaItems.nth(i).textContent() ?? '').trim();
      if (text.startsWith('コード:')) return text.replace('コード:', '').trim();
    }
    return '';
  }

  async getRatingText(): Promise<string> {
    const metaItems = this.page.locator('.supplier-meta .meta-item');
    const count = await metaItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await metaItems.nth(i).textContent() ?? '').trim();
      if (text.startsWith('評価:')) {
        const match = text.match(/[\d.]+$/);
        return match ? match[0] : '';
      }
    }
    return '';
  }

  // --- ナビゲーションボタン ---

  async isBackToListButtonVisible(): Promise<boolean> {
    return await this.page.locator('.header-actions .btn-secondary').filter({ hasText: '一覧に戻る' }).isVisible().catch(() => false);
  }

  async clickBackToListButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-secondary').filter({ hasText: '一覧に戻る' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isEditButtonVisible(): Promise<boolean> {
    return await this.page.locator('.header-actions .btn-primary').filter({ hasText: '編集' }).isVisible().catch(() => false);
  }

  async clickEditButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-primary').filter({ hasText: '編集' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isDeleteButtonVisible(): Promise<boolean> {
    return await this.page.locator('.header-actions .btn-danger').filter({ hasText: '削除' }).isVisible().catch(() => false);
  }

  async clickDeleteButton(): Promise<void> {
    await this.page.locator('.header-actions .btn-danger').filter({ hasText: '削除' }).click();
    await this.page.waitForTimeout(300);
  }

  // --- タブ ---

  async clickTab(tabName: string): Promise<void> {
    await this.page.locator('.tab-button').filter({ hasText: tabName }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async isTabActive(tabName: string): Promise<boolean> {
    return await this.page.locator('.tab-button.active').filter({ hasText: tabName }).isVisible().catch(() => false);
  }

  async isTabContentVisible(tabName: string): Promise<boolean> {
    const tabPanels = this.page.locator('.tab-panel');
    return await tabPanels.first().isVisible().catch(() => false);
  }

  // --- 基本情報タブ — 会社情報 ---

  async isCompanyInfoSectionVisible(): Promise<boolean> {
    return await this.page.locator('.section-subtitle').filter({ hasText: '会社情報' }).isVisible().catch(() => false);
  }

  async getCompanyInfoValue(fieldName: string): Promise<string> {
    const rows = this.page.locator('.info-table tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const th = (await rows.nth(i).locator('th').textContent() ?? '').trim();
      if (th === fieldName) {
        return (await rows.nth(i).locator('td').textContent() ?? '').trim();
      }
    }
    return '';
  }

  // --- 基本情報タブ — 連絡先 ---

  async isContactSectionVisible(): Promise<boolean> {
    return await this.page.locator('.section-subtitle').filter({ hasText: '連絡先' }).isVisible().catch(() => false);
  }

  async getContactCardCount(): Promise<number> {
    return await this.page.locator('.contact-card').count();
  }

  private getContactCard(contactName: string) {
    return this.page.locator('.contact-card').filter({
      has: this.page.locator('.contact-name', { hasText: contactName }),
    });
  }

  async isContactPrimaryBadgeVisible(contactName: string): Promise<boolean> {
    return await this.getContactCard(contactName).locator('.primary-tag').isVisible().catch(() => false);
  }

  async getContactDepartment(contactName: string): Promise<string> {
    const card = this.getContactCard(contactName);
    const detail = card.locator('.contact-detail').filter({
      has: this.page.locator('.detail-label', { hasText: '部署' }),
    });
    const spans = detail.locator('span');
    return (await spans.last().textContent() ?? '').trim();
  }

  async isContactPhoneVisible(contactName: string): Promise<boolean> {
    const card = this.getContactCard(contactName);
    return await card.locator('.contact-detail').filter({
      has: this.page.locator('.detail-label', { hasText: '電話' }),
    }).isVisible().catch(() => false);
  }

  async isContactEmailVisible(contactName: string): Promise<boolean> {
    const card = this.getContactCard(contactName);
    return await card.locator('.contact-detail').filter({
      has: this.page.locator('.detail-label', { hasText: 'メール' }),
    }).isVisible().catch(() => false);
  }

  async isContactEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('.info-section app-empty-state .empty-message').filter({ hasText: '連絡先は登録されていません' }).isVisible().catch(() => false);
  }

  // --- 製品タブ ---

  async isProductTableVisible(): Promise<boolean> {
    const panel = this.page.locator('.tab-panel').filter({ has: this.page.locator('.tab-panel-header .btn-primary', { hasText: '製品紐付け追加' }) });
    return await panel.locator('.data-table').isVisible().catch(() => false);
  }

  async getProductRowCount(): Promise<number> {
    return await this.page.locator('.tab-panel .data-table tbody tr').count();
  }

  async isProductColumnVisible(columnName: string): Promise<boolean> {
    const headers = await this.page.locator('.tab-panel .data-table thead th').allTextContents();
    return headers.some(h => h.includes(columnName));
  }

  async clickProductDetailButton(rowIndex: number): Promise<void> {
    await this.page.locator('.tab-panel .data-table tbody tr').nth(rowIndex).locator('.btn-link').filter({ hasText: '詳細' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickProductDeleteButton(rowIndex: number): Promise<void> {
    await this.page.locator('.tab-panel .data-table tbody tr').nth(rowIndex).locator('.btn-link').filter({ hasText: '削除' }).click();
    await this.page.waitForTimeout(300);
  }

  async isProductEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('app-empty-state .empty-message').filter({ hasText: '取扱製品はありません' }).isVisible().catch(() => false);
  }

  // --- 契約タブ ---

  async isContractTableVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel .data-table').isVisible().catch(() => false);
  }

  async getContractRowCount(): Promise<number> {
    return await this.page.locator('.tab-panel .data-table tbody tr').count();
  }

  async isContractRowVisible(contractNumber: string): Promise<boolean> {
    return await this.page.locator('.tab-panel .data-table tbody tr').filter({
      has: this.page.locator('td', { hasText: contractNumber }),
    }).isVisible().catch(() => false);
  }

  async getContractStatusText(contractNumber: string): Promise<string> {
    const row = this.page.locator('.tab-panel .data-table tbody tr').filter({
      has: this.page.locator('td.mono', { hasText: contractNumber }),
    });
    return (await row.locator('td').nth(2).textContent() ?? '').trim();
  }

  async clickNewContractButton(): Promise<void> {
    await this.page.locator('.tab-panel-header .btn-primary').filter({ hasText: '新規契約' }).click();
    await this.page.waitForTimeout(300);
  }

  async isContractModalVisible(): Promise<boolean> {
    return await this.page.locator('.modal-overlay .modal-content').filter({
      has: this.page.locator('.modal-header h3', { hasText: /契約/ }),
    }).isVisible().catch(() => false);
  }

  async fillContractNumber(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '契約番号' }) });
    await group.locator('input').fill(value);
  }

  async fillContractTitle(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '契約名' }) });
    await group.locator('input').fill(value);
  }

  async fillContractStartDate(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '開始日' }) });
    await group.locator('input[type="date"]').fill(value);
  }

  async fillContractEndDate(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '終了日' }) });
    await group.locator('input[type="date"]').fill(value);
  }

  async selectContractStatus(label: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: 'ステータス' }) });
    await group.locator('select').selectOption({ label });
  }

  async clickContractSaveButton(): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    await modal.locator('.modal-footer .btn-primary').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickContractEditButton(contractNumber: string): Promise<void> {
    const row = this.page.locator('.tab-panel .data-table tbody tr').filter({
      has: this.page.locator('td.mono', { hasText: contractNumber }),
    });
    await row.locator('.btn-link').filter({ hasText: '編集' }).click();
    await this.page.waitForTimeout(300);
  }

  async isContractFormPrefilled(): Promise<boolean> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const val = await modal.locator('.rating-form-group').first().locator('input').inputValue();
    return val.length > 0;
  }

  async updateContractTitle(newTitle: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /契約/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '契約名' }) });
    await group.locator('input').fill(newTitle);
  }

  async clickContractDeleteButton(contractNumber: string): Promise<void> {
    const row = this.page.locator('.tab-panel .data-table tbody tr').filter({
      has: this.page.locator('td.mono', { hasText: contractNumber }),
    });
    await row.locator('.btn-link').filter({ hasText: '削除' }).click();
    await this.page.waitForTimeout(300);
  }

  async isContractEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('app-empty-state .empty-message').filter({ hasText: '契約はありません' }).isVisible().catch(() => false);
  }

  // --- 評価履歴タブ ---

  async isRatingSummaryVisible(): Promise<boolean> {
    return await this.page.locator('.rating-summary').isVisible().catch(() => false);
  }

  async getRatingCountText(): Promise<string> {
    return (await this.page.locator('.avg-count').textContent() ?? '').trim();
  }

  async getRatingEntryCount(): Promise<number> {
    return await this.page.locator('.rating-entry').count();
  }

  async isQualityBarVisible(): Promise<boolean> {
    return await this.page.locator('.rating-category').filter({ has: this.page.locator('.cat-label', { hasText: '品質' }) }).locator('.cat-bar').first().isVisible().catch(() => false);
  }

  async isDeliveryBarVisible(): Promise<boolean> {
    return await this.page.locator('.rating-category').filter({ has: this.page.locator('.cat-label', { hasText: '納期' }) }).locator('.cat-bar').first().isVisible().catch(() => false);
  }

  async isPriceBarVisible(): Promise<boolean> {
    return await this.page.locator('.rating-category').filter({ has: this.page.locator('.cat-label', { hasText: '価格' }) }).locator('.cat-bar').first().isVisible().catch(() => false);
  }

  async isServiceBarVisible(): Promise<boolean> {
    return await this.page.locator('.rating-category').filter({ has: this.page.locator('.cat-label', { hasText: '対応' }) }).locator('.cat-bar').first().isVisible().catch(() => false);
  }

  async isRatingCommentVisible(): Promise<boolean> {
    return await this.page.locator('.rating-comment').first().isVisible().catch(() => false);
  }

  async isRatingEvaluatorVisible(): Promise<boolean> {
    return await this.page.locator('.rating-evaluator').first().isVisible().catch(() => false);
  }

  async clickNewRatingButton(): Promise<void> {
    await this.page.locator('.tab-panel-header .btn-primary').filter({ hasText: '新規評価' }).click();
    await this.page.waitForTimeout(300);
  }

  async isNewRatingButtonVisible(): Promise<boolean> {
    return await this.page.locator('.tab-panel-header .btn-primary').filter({ hasText: '新規評価' }).isVisible().catch(() => false);
  }

  async isRatingModalVisible(): Promise<boolean> {
    return await this.page.locator('.modal-overlay .modal-content').filter({
      has: this.page.locator('.modal-header h3', { hasText: '新規評価登録' }),
    }).isVisible().catch(() => false);
  }

  async isQualitySliderVisible(): Promise<boolean> {
    return await this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '品質スコア' }) }).locator('input[type="range"]').isVisible().catch(() => false);
  }

  async isDeliverySliderVisible(): Promise<boolean> {
    return await this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '納期スコア' }) }).locator('input[type="range"]').isVisible().catch(() => false);
  }

  async isPriceSliderVisible(): Promise<boolean> {
    return await this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '価格スコア' }) }).locator('input[type="range"]').isVisible().catch(() => false);
  }

  async isServiceSliderVisible(): Promise<boolean> {
    return await this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '対応スコア' }) }).locator('input[type="range"]').isVisible().catch(() => false);
  }

  async setQualityScore(value: string): Promise<void> {
    await this.setSliderValue('品質スコア', value);
  }

  async setDeliveryScore(value: string): Promise<void> {
    await this.setSliderValue('納期スコア', value);
  }

  async setPriceScore(value: string): Promise<void> {
    await this.setSliderValue('価格スコア', value);
  }

  async setServiceScore(value: string): Promise<void> {
    await this.setSliderValue('対応スコア', value);
  }

  private async setSliderValue(label: string, value: string): Promise<void> {
    const slider = this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: label }) }).locator('input[type="range"]');
    await slider.evaluate((el, val) => {
      const input = el as HTMLInputElement;
      input.value = val;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
    await this.page.waitForTimeout(100);
  }

  async fillRatingComment(text: string): Promise<void> {
    const group = this.page.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: 'コメント' }) });
    await group.locator('textarea').fill(text);
  }

  async clickRatingSaveButton(): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: '新規評価登録' }) });
    await modal.locator('.modal-footer .btn-primary').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async getRatingSummaryText(): Promise<string> {
    return (await this.page.locator('.average-rating').textContent() ?? '').trim();
  }

  async isRatingEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('app-empty-state .empty-message').filter({ hasText: '評価履歴はありません' }).isVisible().catch(() => false);
  }

  // --- 認証タブ ---

  async getCertCardCount(): Promise<number> {
    return await this.page.locator('.cert-card').count();
  }

  private getCertCard(certName: string) {
    return this.page.locator('.cert-card').filter({
      has: this.page.locator('.cert-name', { hasText: certName }),
    });
  }

  async isCertCardVisible(certName: string): Promise<boolean> {
    return await this.getCertCard(certName).isVisible().catch(() => false);
  }

  async getCertStatusBadgeText(certName: string): Promise<string> {
    return (await this.getCertCard(certName).locator('.cert-status').textContent() ?? '').trim();
  }

  async isCertNumberVisible(certName: string): Promise<boolean> {
    const card = this.getCertCard(certName);
    return await card.locator('.cert-details tr').filter({ has: this.page.locator('th', { hasText: '認証番号' }) }).isVisible().catch(() => false);
  }

  async isCertIssueDateVisible(certName: string): Promise<boolean> {
    const card = this.getCertCard(certName);
    return await card.locator('.cert-details tr').filter({ has: this.page.locator('th', { hasText: '発行日' }) }).isVisible().catch(() => false);
  }

  async isCertExpiryDateVisible(certName: string): Promise<boolean> {
    const card = this.getCertCard(certName);
    return await card.locator('.cert-details tr').filter({ has: this.page.locator('th', { hasText: '有効期限' }) }).isVisible().catch(() => false);
  }

  async clickNewCertButton(): Promise<void> {
    await this.page.locator('.tab-panel-header .btn-primary').filter({ hasText: '新規認証' }).click();
    await this.page.waitForTimeout(300);
  }

  async isCertModalVisible(): Promise<boolean> {
    return await this.page.locator('.modal-overlay .modal-content').filter({
      has: this.page.locator('.modal-header h3', { hasText: /認証/ }),
    }).isVisible().catch(() => false);
  }

  async selectCertType(type: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '認証種別' }) });
    await group.locator('select').selectOption(type);
  }

  async fillCertNumber(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '認証番号' }) });
    await group.locator('input').fill(value);
  }

  async fillCertIssuedDate(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '発行日' }) });
    await group.locator('input[type="date"]').fill(value);
  }

  async fillCertExpiryDate(value: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: '有効期限' }) });
    await group.locator('input[type="date"]').fill(value);
  }

  async selectCertStatus(label: string): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const group = modal.locator('.rating-form-group').filter({ has: this.page.locator('label', { hasText: 'ステータス' }) });
    await group.locator('select').selectOption({ label });
  }

  async clickCertSaveButton(): Promise<void> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    await modal.locator('.modal-footer .btn-primary').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickCertEditButton(certName: string): Promise<void> {
    const card = this.getCertCard(certName);
    await card.locator('.btn-link').filter({ hasText: '編集' }).click();
    await this.page.waitForTimeout(300);
  }

  async isCertFormPrefilled(): Promise<boolean> {
    const modal = this.page.locator('.modal-overlay').filter({ has: this.page.locator('h3', { hasText: /認証/ }) });
    const val = await modal.locator('.rating-form-group').nth(1).locator('input').inputValue();
    return val.length > 0;
  }

  async updateCertExpiryDate(value: string): Promise<void> {
    await this.fillCertExpiryDate(value);
  }

  async clickCertDeleteButton(certName: string): Promise<void> {
    const card = this.getCertCard(certName);
    await card.locator('.btn-link').filter({ hasText: '削除' }).click();
    await this.page.waitForTimeout(300);
  }

  async isCertEmptyMessageVisible(): Promise<boolean> {
    return await this.page.locator('app-empty-state .empty-message').filter({ hasText: '認証情報はありません' }).isVisible().catch(() => false);
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
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickDialogCancelButton(): Promise<void> {
    await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').click();
    await this.page.waitForTimeout(300);
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
