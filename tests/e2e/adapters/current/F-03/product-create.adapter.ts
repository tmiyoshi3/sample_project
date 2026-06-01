import { Page } from '@playwright/test';
import type { ProductCreatePageAdapter } from '../../types.js';

export class CurrentProductCreatePageAdapter implements ProductCreatePageAdapter {
  constructor(readonly page: Page) {}

  // --- Navigation ---

  async navigateToCreateWizard(): Promise<void> {
    await this.page.goto('/products/new');
    await this.page.waitForSelector('.wizard-container', { timeout: 15_000 });
  }

  async waitForWizardLoad(): Promise<void> {
    await this.page.waitForSelector('.wizard-container', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- Step indicator ---

  async getStepCount(): Promise<number> {
    return await this.page.locator('.step-indicator .step-item').count();
  }

  async getActiveStepIndex(): Promise<number> {
    const items = this.page.locator('.step-indicator .step-item');
    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const isActive = await items.nth(i).evaluate(el => el.classList.contains('active'));
      if (isActive) return i;
    }
    return -1;
  }

  async getActiveStepTitle(): Promise<string> {
    const activeItem = this.page.locator('.step-indicator .step-item.active');
    return (await activeItem.locator('.step-title').textContent() ?? '').trim();
  }

  async isStepCompleted(stepIndex: number): Promise<boolean> {
    const item = this.page.locator('.step-indicator .step-item').nth(stepIndex);
    return await item.evaluate(el => el.classList.contains('completed'));
  }

  async getStepTitle(stepIndex: number): Promise<string> {
    const item = this.page.locator('.step-indicator .step-item').nth(stepIndex);
    return (await item.locator('.step-title').textContent() ?? '').trim();
  }

  // --- Page title ---

  async getPageTitle(): Promise<string> {
    return (await this.page.locator('app-page-header').getAttribute('title') ?? '').trim();
  }

  // --- Navigation buttons ---

  async isPrevButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-prev').isVisible().catch(() => false);
  }

  async isNextButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-next').isVisible().catch(() => false);
  }

  async isCancelButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-cancel').isVisible().catch(() => false);
  }

  async isSubmitButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-submit').isVisible().catch(() => false);
  }

  async isSubmitButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.btn-submit').isDisabled();
  }

  async clickPrevButton(): Promise<void> {
    await this.page.locator('.btn-prev').click();
    await this.page.waitForTimeout(300);
  }

  async clickNextButton(): Promise<void> {
    await this.page.locator('.btn-next').click();
    await this.page.waitForTimeout(300);
  }

  async clickCancelButton(): Promise<void> {
    await this.page.locator('.btn-cancel').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickSubmitButton(): Promise<void> {
    await this.page.locator('.btn-submit').click();
    await this.page.waitForTimeout(500);
  }

  // --- Step 1: Basic info ---

  async fillProductName(name: string): Promise<void> {
    await this.page.locator('[formcontrolname="name"]').fill(name);
  }

  async fillSku(sku: string): Promise<void> {
    await this.page.locator('[formcontrolname="sku"]').fill(sku);
    await this.page.locator('[formcontrolname="sku"]').blur();
    await this.page.waitForTimeout(300);
  }

  async fillDescription(description: string): Promise<void> {
    await this.page.locator('[formcontrolname="description"]').fill(description);
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.page.locator('[formcontrolname="categoryId"]').selectOption({ label: categoryName });
  }

  async selectManufacturer(manufacturerName: string): Promise<void> {
    await this.page.locator('[formcontrolname="manufacturerId"]').selectOption({ label: manufacturerName });
  }

  async getStatusValue(): Promise<string> {
    const select = this.page.locator('[formcontrolname="status"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async selectStatus(statusLabel: string): Promise<void> {
    await this.page.locator('[formcontrolname="status"]').selectOption({ label: statusLabel });
  }

  async getCategoryOptionCount(): Promise<number> {
    return await this.page.locator('[formcontrolname="categoryId"] option').count();
  }

  async getManufacturerOptionCount(): Promise<number> {
    return await this.page.locator('[formcontrolname="manufacturerId"] option').count();
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

  async getValidationErrors(): Promise<string[]> {
    const errors = this.page.locator('.error-message');
    const count = await errors.count();
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = (await errors.nth(i).textContent() ?? '').trim();
      if (text) result.push(text);
    }
    return result;
  }

  async isValidationErrorVisible(message: string): Promise<boolean> {
    const errors = this.page.locator('.error-message');
    const count = await errors.count();
    for (let i = 0; i < count; i++) {
      const text = (await errors.nth(i).textContent() ?? '').trim();
      if (text.includes(message)) return true;
    }
    return false;
  }

  async getProductNameValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="name"]').inputValue();
  }

  async getSkuValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="sku"]').inputValue();
  }

  // --- Step 2: Price/Inventory ---

  async fillUnitPrice(price: string): Promise<void> {
    await this.page.locator('[formcontrolname="unitPrice"]').fill(price);
  }

  async selectUnit(unit: string): Promise<void> {
    await this.page.locator('[formcontrolname="unit"]').selectOption({ label: unit });
  }

  async fillMinOrderQuantity(qty: string): Promise<void> {
    await this.page.locator('[formcontrolname="minimumOrderQuantity"]').fill(qty);
  }

  async fillLeadTime(days: string): Promise<void> {
    await this.page.locator('[formcontrolname="leadTimeDays"]').fill(days);
  }

  async fillWeight(weight: string): Promise<void> {
    await this.page.locator('[formcontrolname="weight"]').fill(weight);
  }

  async fillDimensions(dimensions: string): Promise<void> {
    await this.page.locator('[formcontrolname="dimensions"]').fill(dimensions);
  }

  async getUnitPriceValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="unitPrice"]').inputValue();
  }

  async getUnitValue(): Promise<string> {
    const select = this.page.locator('[formcontrolname="unit"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async getMinOrderQuantityValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="minimumOrderQuantity"]').inputValue();
  }

  async getLeadTimeValue(): Promise<string> {
    return await this.page.locator('[formcontrolname="leadTimeDays"]').inputValue();
  }

  async getUnitOptionCount(): Promise<number> {
    return await this.page.locator('[formcontrolname="unit"] option').count();
  }

  async isMinOrderQtyErrorVisible(): Promise<boolean> {
    const field = this.page.locator('app-form-field').filter({
      has: this.page.locator('label', { hasText: '最低発注数' }),
    });
    return await field.locator('.error-message').isVisible().catch(() => false);
  }

  async isLeadTimeErrorVisible(): Promise<boolean> {
    const field = this.page.locator('app-form-field').filter({
      has: this.page.locator('label', { hasText: 'リードタイム' }),
    });
    return await field.locator('.error-message').isVisible().catch(() => false);
  }

  // --- Step 3: Specifications ---

  async getSpecRowCount(): Promise<number> {
    return await this.page.locator('.spec-row').count();
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

  async isAddSpecRowButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-add-row').isVisible().catch(() => false);
  }

  async fillNotes(notes: string): Promise<void> {
    await this.page.locator('[formcontrolname="notes"]').fill(notes);
  }

  async isNotesTextareaVisible(): Promise<boolean> {
    return await this.page.locator('[formcontrolname="notes"]').isVisible().catch(() => false);
  }

  // --- Step 4: Media ---

  async isImageSectionVisible(): Promise<boolean> {
    const sections = this.page.locator('.upload-section');
    if (await sections.count() < 1) return false;
    return await sections.first().isVisible().catch(() => false);
  }

  async isDocumentSectionVisible(): Promise<boolean> {
    const sections = this.page.locator('.upload-section');
    if (await sections.count() < 2) return false;
    return await sections.nth(1).isVisible().catch(() => false);
  }

  async getImageSectionTitle(): Promise<string> {
    return (await this.page.locator('.upload-section').first().locator('.upload-section-title').textContent() ?? '').trim();
  }

  async getDocumentSectionTitle(): Promise<string> {
    return (await this.page.locator('.upload-section').nth(1).locator('.upload-section-title').textContent() ?? '').trim();
  }

  async getImageHintText(): Promise<string> {
    return (await this.page.locator('.upload-section').first().locator('.upload-hint').textContent() ?? '').trim();
  }

  async getDocumentHintText(): Promise<string> {
    return (await this.page.locator('.upload-section').nth(1).locator('.upload-hint').textContent() ?? '').trim();
  }

  async isAddImageButtonVisible(): Promise<boolean> {
    const label = this.page.locator('.upload-section').first().locator('.upload-label');
    return await label.isVisible().catch(() => false);
  }

  async isAddDocumentButtonVisible(): Promise<boolean> {
    const label = this.page.locator('.upload-section').nth(1).locator('.upload-label');
    return await label.isVisible().catch(() => false);
  }

  async uploadImage(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"][accept="image/png,image/jpeg"]');
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(500);
  }

  async uploadDocument(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"][accept=".pdf,application/pdf"]');
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(500);
  }

  async getImagePreviewCount(): Promise<number> {
    return await this.page.locator('.image-preview-item').count();
  }

  async getDocumentItemCount(): Promise<number> {
    return await this.page.locator('.doc-item').count();
  }

  // --- Step 5: Review ---

  async isReviewSectionVisible(): Promise<boolean> {
    return await this.page.locator('.review-section').isVisible().catch(() => false);
  }

  async getReviewGroupTitles(): Promise<string[]> {
    const titles = this.page.locator('.review-group-title');
    return await titles.allTextContents().then(texts => texts.map(t => t.trim()));
  }

  async getReviewValue(groupTitle: string, label: string): Promise<string> {
    const group = this.page.locator('.review-group').filter({
      has: this.page.locator('.review-group-title', { hasText: groupTitle }),
    });
    const row = group.locator('.review-table tr').filter({
      has: this.page.locator('th', { hasText: label }),
    });
    return (await row.locator('td').textContent() ?? '').trim();
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

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
