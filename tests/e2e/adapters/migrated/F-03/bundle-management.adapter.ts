import { Page } from '@playwright/test';
import type { BundleManagementPageAdapter } from '../../types.js';

export class MigratedBundleManagementPageAdapter implements BundleManagementPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToBundleManagement(): Promise<void> {
    await this.page.goto('/products/bundles');
    await this.page.waitForSelector('.bundle-container', { timeout: 15_000 });
  }

  async waitForBundleManagementLoad(): Promise<void> {
    await this.page.waitForSelector('.bundle-container', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  private getBundleCard(bundleName: string) {
    return this.page.locator('.bundle-card').filter({
      has: this.page.locator('.bundle-name', { hasText: new RegExp(`^${this.escapeRegex(bundleName)}$`) }),
    });
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async getBundleCardCount(): Promise<number> { return await this.page.locator('.bundle-card').count(); }
  async getBundleCardNames(): Promise<string[]> { return await this.page.locator('.bundle-card .bundle-name').allTextContents().then(t => t.map(s => s.trim())); }
  async isBundleCardVisible(bundleName: string): Promise<boolean> { return await this.getBundleCard(bundleName).isVisible().catch(() => false); }
  async getBundleCardDescription(bundleName: string): Promise<string> { return (await this.getBundleCard(bundleName).locator('.bundle-description').textContent() ?? '').trim(); }

  async getBundleStatusBadgeText(bundleName: string): Promise<string> { return (await this.getBundleCard(bundleName).locator('.bundle-status').textContent() ?? '').trim(); }

  async getBundleProductChips(bundleName: string): Promise<string[]> {
    const chips = this.getBundleCard(bundleName).locator('.product-chip');
    const count = await chips.count();
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = (await chips.nth(i).locator('.chip-name').textContent() ?? '').trim();
      const qty = (await chips.nth(i).locator('.chip-qty').textContent() ?? '').trim();
      result.push(`${name} ${qty}`);
    }
    return result;
  }

  async getBundleTotalPrice(bundleName: string): Promise<string> { return (await this.getBundleCard(bundleName).locator('.pricing-value.original').textContent() ?? '').trim(); }
  async getBundleDiscountPercentage(bundleName: string): Promise<string> { return (await this.getBundleCard(bundleName).locator('.pricing-value.discount').textContent() ?? '').trim(); }
  async getBundleBundlePrice(bundleName: string): Promise<string> { return (await this.getBundleCard(bundleName).locator('.pricing-value.bundle-price').textContent() ?? '').trim(); }
  async isTotalPriceStrikethrough(bundleName: string): Promise<boolean> {
    const el = this.getBundleCard(bundleName).locator('.pricing-value.original');
    const td = await el.evaluate(e => window.getComputedStyle(e).textDecorationLine || window.getComputedStyle(e).textDecoration);
    return td.includes('line-through');
  }

  async isCreateButtonVisible(): Promise<boolean> { return await this.page.locator('.top-actions .btn-primary').filter({ hasText: '新規バンドル作成' }).isVisible().catch(() => false); }
  async clickCreateButton(): Promise<void> { await this.page.locator('.top-actions .btn-primary').filter({ hasText: '新規バンドル作成' }).click(); await this.page.waitForTimeout(300); }

  async isBundleListVisible(): Promise<boolean> { return await this.page.locator('.bundle-list').isVisible().catch(() => false); }
  async isBundleListHidden(): Promise<boolean> { return !(await this.page.locator('.bundle-list').isVisible().catch(() => false)); }

  async isCreateFormVisible(): Promise<boolean> {
    const panel = this.page.locator('.edit-panel');
    if (!(await panel.isVisible().catch(() => false))) return false;
    return (await panel.locator('.panel-title').textContent() ?? '').trim() === 'バンドル作成';
  }
  async isEditFormVisible(): Promise<boolean> {
    const panel = this.page.locator('.edit-panel');
    if (!(await panel.isVisible().catch(() => false))) return false;
    return (await panel.locator('.panel-title').textContent() ?? '').trim() === 'バンドル編集';
  }
  async isFormVisible(): Promise<boolean> { return await this.page.locator('.edit-panel').isVisible().catch(() => false); }
  async getFormTitle(): Promise<string> { return (await this.page.locator('.edit-panel .panel-title').textContent() ?? '').trim(); }

  async getBundleNameInputValue(): Promise<string> { return await this.page.locator('.edit-panel input[formcontrolname="name"]').inputValue(); }
  async fillBundleName(name: string): Promise<void> { await this.page.locator('.edit-panel input[formcontrolname="name"]').fill(name); }
  async getStatusSelectValue(): Promise<string> { return (await this.page.locator('.edit-panel select[formcontrolname="status"] option:checked').textContent() ?? '').trim(); }
  async selectStatus(status: string): Promise<void> { await this.page.locator('.edit-panel select[formcontrolname="status"]').selectOption({ label: status }); }
  async getDescriptionValue(): Promise<string> { return await this.page.locator('.edit-panel textarea[formcontrolname="description"]').inputValue(); }
  async fillDescription(description: string): Promise<void> { await this.page.locator('.edit-panel textarea[formcontrolname="description"]').fill(description); }
  async getDiscountPercentageValue(): Promise<string> { return await this.page.locator('.edit-panel input[formcontrolname="discountPercentage"]').inputValue(); }
  async fillDiscountPercentage(value: string): Promise<void> { await this.page.locator('.edit-panel input[formcontrolname="discountPercentage"]').fill(value); await this.page.waitForTimeout(300); }

  async fillProductSearch(keyword: string): Promise<void> { await this.page.locator('.product-search .form-input').fill(keyword); await this.page.waitForTimeout(500); }
  async getSearchResultCount(): Promise<number> { return await this.page.locator('.search-result-item').count(); }
  async getSearchResultTexts(): Promise<string[]> {
    const items = this.page.locator('.search-result-item');
    const count = await items.count();
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const sku = (await items.nth(i).locator('.result-sku').textContent() ?? '').trim();
      const name = (await items.nth(i).locator('.result-name').textContent() ?? '').trim();
      const price = (await items.nth(i).locator('.result-price').textContent() ?? '').trim();
      result.push(`${sku} ${name} ${price}`);
    }
    return result;
  }
  async clickSearchResult(index: number): Promise<void> { await this.page.locator('.search-result-item').nth(index).click(); await this.page.waitForTimeout(300); }
  async isSearchDropdownVisible(): Promise<boolean> { return await this.page.locator('.search-dropdown').isVisible().catch(() => false); }

  async getBundleItemCount(): Promise<number> { return await this.page.locator('.items-table tbody tr').count(); }
  async getBundleItemQuantity(index: number): Promise<string> { return await this.page.locator('.items-table tbody tr').nth(index).locator('.quantity-input').inputValue(); }
  async setBundleItemQuantity(index: number, quantity: string): Promise<void> { await this.page.locator('.items-table tbody tr').nth(index).locator('.quantity-input').fill(quantity); await this.page.waitForTimeout(300); }
  async clickRemoveBundleItem(index: number): Promise<void> { await this.page.locator('.items-table tbody tr').nth(index).locator('.btn-remove-item').click(); await this.page.waitForTimeout(300); }
  async isNoItemsMessageVisible(): Promise<boolean> { return await this.page.locator('.no-items').isVisible().catch(() => false); }
  async getNoItemsMessage(): Promise<string> { return (await this.page.locator('.no-items').textContent() ?? '').trim(); }

  async isPriceCalculationVisible(): Promise<boolean> { return await this.page.locator('.price-calculation').isVisible().catch(() => false); }
  async getCalculatedTotalPrice(): Promise<string> { return (await this.page.locator('.price-row').first().locator('.price-value').textContent() ?? '').trim(); }
  async getCalculatedDiscountAmount(): Promise<string> { return (await this.page.locator('.price-row.discount-row .price-value').textContent() ?? '').trim(); }
  async getCalculatedBundlePrice(): Promise<string> { return (await this.page.locator('.price-row.total-row .price-value').textContent() ?? '').trim(); }

  async clickSaveButton(): Promise<void> { await this.page.locator('.edit-panel .btn-save').click(); await this.page.waitForTimeout(500); }
  async clickCancelButton(): Promise<void> { await this.page.locator('.edit-panel .btn-cancel').click(); await this.page.waitForTimeout(300); }

  async clickEditButton(bundleName: string): Promise<void> { await this.getBundleCard(bundleName).locator('.btn-edit').click(); await this.page.waitForTimeout(500); }
  async clickDeleteButton(bundleName: string): Promise<void> { await this.getBundleCard(bundleName).locator('.btn-delete').click(); await this.page.waitForTimeout(300); }
  async isDeleteButtonVisibleOnCard(): Promise<boolean> { return await this.page.locator('.bundle-card .btn-delete').first().isVisible().catch(() => false); }

  async isConfirmDialogVisible(): Promise<boolean> { return await this.page.locator('.confirm-dialog').isVisible().catch(() => false); }
  async getConfirmDialogMessage(): Promise<string> { return (await this.page.locator('.confirm-dialog .dialog-body p').textContent() ?? '').trim(); }
  async clickDialogConfirmButton(): Promise<void> { await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').click(); await this.page.waitForTimeout(500); }
  async clickDialogCancelButton(): Promise<void> { await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').click(); await this.page.waitForTimeout(300); }
  async isDialogConfirmButtonVisible(): Promise<boolean> { return await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').isVisible().catch(() => false); }
  async isDialogCancelButtonVisible(): Promise<boolean> { return await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').isVisible().catch(() => false); }

  async getSuccessMessage(): Promise<string> { return (await this.page.locator('.success-banner').textContent() ?? '').trim(); }
  async getErrorMessage(): Promise<string> { return (await this.page.locator('.error-banner').textContent() ?? '').trim(); }
  async isSuccessMessageVisible(): Promise<boolean> { return await this.page.locator('.success-banner').isVisible().catch(() => false); }
  async isErrorMessageVisible(): Promise<boolean> { return await this.page.locator('.error-banner').isVisible().catch(() => false); }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForSelector('.bundle-container', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  getCurrentUrl(): string { return this.page.url(); }
}
