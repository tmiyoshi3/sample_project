import { Page } from '@playwright/test';
import type { ProductEditPageAdapter } from '../../types.js';

export class MigratedProductEditPageAdapter implements ProductEditPageAdapter {
  constructor(readonly page: Page) {}

  // --- Navigation ---

  async navigateToEditPage(productId: string): Promise<void> {
    await this.page.goto(`/products/${productId}/edit`);
    await this.page.waitForSelector('.edit-container', { timeout: 15_000 });
  }

  async waitForEditFormLoad(): Promise<void> {
    await this.page.waitForSelector('.edit-container', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- Page title ---

  async getPageTitle(): Promise<string> {
    return (await this.page.locator('app-page-header').getAttribute('title') ?? '').trim();
  }

  // --- Basic info ---

  async getProductNameValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="name"]').inputValue();
  }

  async getSkuValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="sku"]').inputValue();
  }

  async getDescriptionValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="description"]').inputValue();
  }

  async getCategorySelectedText(): Promise<string> {
    const select = this.page.locator('[formcontrolname="categoryId"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async getManufacturerSelectedText(): Promise<string> {
    const select = this.page.locator('[formcontrolname="manufacturerId"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async getStatusSelectedText(): Promise<string> {
    const select = this.page.locator('[formcontrolname="status"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async getStatusOptionCount(): Promise<number> {
    return await this.page.locator('[formcontrolname="status"] option').count();
  }

  async fillProductName(name: string): Promise<void> {
    await this.page.locator('[formcontrolname="name"]').fill(name);
  }

  async clearProductName(): Promise<void> {
    await this.page.locator('[formcontrolname="name"]').fill('');
  }

  async fillSku(sku: string): Promise<void> {
    await this.page.locator('[formcontrolname="sku"]').fill(sku);
    await this.page.locator('[formcontrolname="sku"]').blur();
    await this.page.waitForTimeout(300);
  }

  async selectStatus(statusLabel: string): Promise<void> {
    await this.page.locator('[formcontrolname="status"]').selectOption({ label: statusLabel });
  }

  async isSkuCheckLoading(): Promise<boolean> {
    const indicator = this.page.locator('.sku-check').first();
    if (!(await indicator.isVisible().catch(() => false))) return false;
    const hasOk = await indicator.evaluate(el => el.classList.contains('sku-ok'));
    const hasNg = await indicator.evaluate(el => el.classList.contains('sku-ng'));
    return !hasOk && !hasNg;
  }

  async isSkuAvailable(): Promise<boolean> {
    return await this.page.locator('.sku-check.sku-ok').isVisible().catch(() => false);
  }

  async isSkuDuplicate(): Promise<boolean> {
    return await this.page.locator('.sku-check.sku-ng').isVisible().catch(() => false);
  }

  async getSkuCheckIndicatorText(): Promise<string> {
    const indicators = this.page.locator('.sku-check');
    const count = await indicators.count();
    for (let i = 0; i < count; i++) {
      if (await indicators.nth(i).isVisible()) {
        return (await indicators.nth(i).textContent() ?? '').trim();
      }
    }
    return '';
  }

  // --- Price/Inventory ---

  async getUnitPriceValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="unitPrice"]').inputValue();
  }

  async getNotesValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="notes"]').inputValue();
  }

  async fillUnitPrice(price: string): Promise<void> {
    await this.page.locator('[formcontrolname="unitPrice"]').fill(price);
  }

  // --- Sections visibility ---

  async isSectionVisible(sectionTitle: string): Promise<boolean> {
    const section = this.page.locator('.form-section').filter({
      has: this.page.locator('.section-title', { hasText: sectionTitle }),
    });
    return await section.isVisible().catch(() => false);
  }

  // --- Specifications ---

  async getSpecRowCount(): Promise<number> {
    return await this.page.locator('.spec-row').count();
  }

  async getSpecKeyValue(rowIndex: number): Promise<string> {
    return await this.page.locator('.spec-row').nth(rowIndex).locator('input[formcontrolname="key"]').inputValue();
  }

  async getSpecValueValue(rowIndex: number): Promise<string> {
    return await this.page.locator('.spec-row').nth(rowIndex).locator('input[formcontrolname="value"]').inputValue();
  }

  async fillSpecKey(rowIndex: number, key: string): Promise<void> {
    await this.page.locator('.spec-row').nth(rowIndex).locator('input[formcontrolname="key"]').fill(key);
  }

  async fillSpecValue(rowIndex: number, value: string): Promise<void> {
    await this.page.locator('.spec-row').nth(rowIndex).locator('input[formcontrolname="value"]').fill(value);
  }

  async clickAddSpecRow(): Promise<void> {
    await this.page.locator('.btn-add-row').click();
    await this.page.waitForTimeout(300);
  }

  async clickRemoveSpecRow(rowIndex: number): Promise<void> {
    await this.page.locator('.spec-row').nth(rowIndex).locator('.btn-remove').click();
    await this.page.waitForTimeout(300);
  }

  async isRemoveSpecRowDisabled(rowIndex: number): Promise<boolean> {
    return await this.page.locator('.spec-row').nth(rowIndex).locator('.btn-remove').isDisabled();
  }

  // --- Images ---

  async getExistingImageCount(): Promise<number> {
    return await this.page.locator('.image-card').count();
  }

  async isPrimaryBadgeVisible(): Promise<boolean> {
    return await this.page.locator('.image-badge').isVisible().catch(() => false);
  }

  async isDeleteImageButtonVisible(index: number): Promise<boolean> {
    return await this.page.locator('.image-card').nth(index).locator('.btn-delete-sm').isVisible().catch(() => false);
  }

  async clickDeleteImageButton(index: number): Promise<void> {
    await this.page.locator('.image-card').nth(index).locator('.btn-delete-sm').click();
    await this.page.waitForTimeout(300);
  }

  async isAddImageButtonVisible(): Promise<boolean> {
    const section = this.page.locator('.form-section').filter({
      has: this.page.locator('.section-title', { hasText: '製品画像' }),
    });
    return await section.locator('.upload-label').isVisible().catch(() => false);
  }

  async uploadImage(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"][accept="image/png,image/jpeg"]');
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(500);
  }

  async isImageEmptyMessageVisible(): Promise<boolean> {
    const section = this.page.locator('.form-section').filter({
      has: this.page.locator('.section-title', { hasText: '製品画像' }),
    });
    return await section.locator('.empty-message').isVisible().catch(() => false);
  }

  // --- Documents ---

  async getExistingDocumentCount(): Promise<number> {
    return await this.page.locator('.doc-item').count();
  }

  async getDocumentName(index: number): Promise<string> {
    return (await this.page.locator('.doc-item').nth(index).locator('.doc-link').textContent() ?? '').trim();
  }

  async isDeleteDocumentButtonVisible(index: number): Promise<boolean> {
    return await this.page.locator('.doc-item').nth(index).locator('.btn-delete-sm').isVisible().catch(() => false);
  }

  async clickDeleteDocumentButton(index: number): Promise<void> {
    await this.page.locator('.doc-item').nth(index).locator('.btn-delete-sm').click();
    await this.page.waitForTimeout(300);
  }

  async isAddDocumentButtonVisible(): Promise<boolean> {
    const section = this.page.locator('.form-section').filter({
      has: this.page.locator('.section-title', { hasText: 'ドキュメント' }),
    });
    return await section.locator('.upload-label').isVisible().catch(() => false);
  }

  async selectDocumentType(docType: string): Promise<void> {
    await this.page.locator('.upload-row select').selectOption({ label: docType });
  }

  async uploadDocument(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"][accept=".pdf,application/pdf"]');
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(500);
  }

  async isDocumentEmptyMessageVisible(): Promise<boolean> {
    const section = this.page.locator('.form-section').filter({
      has: this.page.locator('.section-title', { hasText: 'ドキュメント' }),
    });
    return await section.locator('.empty-message').isVisible().catch(() => false);
  }

  // --- Action buttons ---

  async clickUpdateButton(): Promise<void> {
    await this.page.locator('.form-actions .btn-submit').click();
    await this.page.waitForTimeout(500);
  }

  async clickCancelButton(): Promise<void> {
    await this.page.locator('.form-actions .btn-cancel').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isUpdateButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.form-actions .btn-submit').isDisabled();
  }

  async isUpdateButtonVisible(): Promise<boolean> {
    return await this.page.locator('.form-actions .btn-submit').isVisible().catch(() => false);
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return await this.page.locator('.form-actions .btn-cancel').isVisible().catch(() => false);
  }

  // --- Messages ---

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.page.locator('.success-banner').isVisible().catch(() => false);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.locator('.error-banner').isVisible().catch(() => false);
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator('.error-banner').textContent() ?? '').trim();
  }

  // --- Validation ---

  async isValidationErrorVisible(message: string): Promise<boolean> {
    const errors = this.page.locator('.error-message');
    const count = await errors.count();
    for (let i = 0; i < count; i++) {
      const text = (await errors.nth(i).textContent() ?? '').trim();
      if (text.includes(message)) return true;
    }
    return false;
  }

  // --- Error state ---

  async isErrorContainerVisible(): Promise<boolean> {
    return await this.page.locator('.error-container').isVisible().catch(() => false);
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
