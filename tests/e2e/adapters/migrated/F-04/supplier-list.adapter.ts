import { Page } from '@playwright/test';
import type { SupplierListPageAdapter } from '../../types.js';

export class MigratedSupplierListPageAdapter implements SupplierListPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToSupplierList(): Promise<void> {
    await this.page.goto('/suppliers');
    await this.page.waitForSelector('.supplier-list-container', { timeout: 15_000 });
  }

  async waitForSupplierListLoad(): Promise<void> {
    await this.page.waitForSelector('.supplier-list-container', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- 検索 ---

  async fillSearchKeyword(keyword: string): Promise<void> {
    await this.page.locator('.search-box .search-input').fill(keyword);
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clearSearchKeyword(): Promise<void> {
    const clearBtn = this.page.locator('.search-box .clear-btn');
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      await this.page.waitForTimeout(500);
    } else {
      await this.page.locator('.search-box .search-input').fill('');
      await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      await this.page.waitForTimeout(500);
    }
  }

  // --- ステータスフィルタ ---

  async selectStatus(statusLabel: string): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'ステータス' }).locator('select');
    await select.selectOption({ label: statusLabel });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async getStatusSelectValue(): Promise<string> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'ステータス' }).locator('select');
    const selectedOption = await select.evaluate((el: HTMLSelectElement) => {
      return el.options[el.selectedIndex]?.text ?? '';
    });
    return selectedOption;
  }

  // --- 評価フィルタ ---

  async selectMinRating(label: string): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: '最低評価' }).locator('select');
    await select.selectOption({ label });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- フィルタリセット ---

  async isResetButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-reset').isVisible().catch(() => false);
  }

  async clickResetButton(): Promise<void> {
    await this.page.locator('.btn-reset').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- テーブル ---

  async getTableRowCount(): Promise<number> {
    return await this.page.locator('.supplier-table tbody tr.clickable-row').count();
  }

  async isTableVisible(): Promise<boolean> {
    return await this.page.locator('.supplier-table').isVisible().catch(() => false);
  }

  async getColumnHeaders(): Promise<string[]> {
    return await this.page.locator('.supplier-table thead th').allTextContents();
  }

  private getRow(rowIndex: number) {
    return this.page.locator('.supplier-table tbody tr.clickable-row').nth(rowIndex);
  }

  async getSupplierCodeInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('td').nth(1).textContent() ?? '').trim();
  }

  async getSupplierNameInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('td.supplier-name').textContent() ?? '').trim();
  }

  async getSupplierStatusInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('.status-badge').textContent() ?? '').trim();
  }

  async getSupplierRatingInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('.rating-number').textContent() ?? '').trim();
  }

  async getSupplierEmailInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('td').nth(5).textContent() ?? '').trim();
  }

  async getSupplierPhoneInRow(rowIndex: number): Promise<string> {
    return (await this.getRow(rowIndex).locator('td').nth(6).textContent() ?? '').trim();
  }

  async findRowIndexByCode(code: string): Promise<number> {
    const rows = this.page.locator('.supplier-table tbody tr.clickable-row');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const cellText = (await rows.nth(i).locator('td').nth(1).textContent() ?? '').trim();
      if (cellText === code) return i;
    }
    return -1;
  }

  async findRowIndexByName(name: string): Promise<number> {
    const rows = this.page.locator('.supplier-table tbody tr.clickable-row');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const cellText = (await rows.nth(i).locator('td.supplier-name').textContent() ?? '').trim();
      if (cellText === name) return i;
    }
    return -1;
  }

  async clickSupplierRow(name: string): Promise<void> {
    const row = this.page.locator('.supplier-table tbody tr.clickable-row').filter({
      has: this.page.locator('td.supplier-name', { hasText: name }),
    });
    await row.click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- 件数表示 ---

  async getResultCountText(): Promise<string> {
    return (await this.page.locator('.result-count').textContent() ?? '').trim();
  }

  // --- 空状態 ---

  async isEmptyStateVisible(): Promise<boolean> {
    return await this.page.locator('.empty-state').isVisible().catch(() => false);
  }

  async getEmptyStateMessage(): Promise<string> {
    return (await this.page.locator('.empty-state .empty-message').textContent() ?? '').trim();
  }

  // --- 比較チェックボックス ---

  private getCompareCheckbox(supplierName: string) {
    return this.page.locator('.supplier-table tbody tr.clickable-row').filter({
      has: this.page.locator('td.supplier-name', { hasText: supplierName }),
    }).locator('td.col-check input[type="checkbox"]');
  }

  async clickCompareCheckbox(supplierName: string): Promise<void> {
    await this.getCompareCheckbox(supplierName).click();
    await this.page.waitForTimeout(300);
  }

  async isCompareCheckboxChecked(supplierName: string): Promise<boolean> {
    return await this.getCompareCheckbox(supplierName).isChecked();
  }

  async isCompareCheckboxDisabled(supplierName: string): Promise<boolean> {
    return await this.getCompareCheckbox(supplierName).isDisabled();
  }

  async areUnselectedCheckboxesDisabled(): Promise<boolean> {
    const checkboxes = this.page.locator('.supplier-table tbody tr.clickable-row td.col-check input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      const cb = checkboxes.nth(i);
      const checked = await cb.isChecked();
      if (!checked) {
        const disabled = await cb.isDisabled();
        if (!disabled) return false;
      }
    }
    return true;
  }

  async areUnselectedCheckboxesEnabled(): Promise<boolean> {
    const checkboxes = this.page.locator('.supplier-table tbody tr.clickable-row td.col-check input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
      const cb = checkboxes.nth(i);
      const checked = await cb.isChecked();
      if (!checked) {
        const disabled = await cb.isDisabled();
        if (disabled) return false;
      }
    }
    return true;
  }

  // --- 比較ボタン ---

  async getCompareButtonLabel(): Promise<string> {
    return (await this.page.locator('.btn-compare').textContent() ?? '').trim();
  }

  async isCompareButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.btn-compare').isDisabled();
  }

  async isCompareButtonEnabled(): Promise<boolean> {
    return !(await this.page.locator('.btn-compare').isDisabled());
  }

  async clickCompareButton(): Promise<void> {
    await this.page.locator('.btn-compare').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- 比較画面 ---

  async isComparePageVisible(): Promise<boolean> {
    await this.page.waitForTimeout(1000);
    return this.page.url().includes('/suppliers/compare');
  }

  async isSupplierInCompare(supplierName: string): Promise<boolean> {
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.locator('text=読み込み中').waitFor({ state: 'hidden', timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
    const body = await this.page.locator('body').textContent() ?? '';
    return body.includes(supplierName);
  }

  async isCompareRatingVisible(): Promise<boolean> {
    const body = await this.page.locator('body').textContent() ?? '';
    return body.includes('評価') || body.includes('rating') || body.includes('Rating') || body.includes('総合評価');
  }

  async isCompareOrderHistoryVisible(): Promise<boolean> {
    const body = await this.page.locator('body').textContent() ?? '';
    return body.includes('発注') || body.includes('実績') || body.includes('order') || body.includes('パフォーマンス');
  }

  // --- 新規登録ボタン ---

  async isNewButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-primary').filter({ hasText: '新規登録' }).isVisible();
  }

  async isNewButtonEnabled(): Promise<boolean> {
    return !(await this.page.locator('.btn-primary').filter({ hasText: '新規登録' }).isDisabled());
  }

  async clickNewButton(): Promise<void> {
    await this.page.locator('.btn-primary').filter({ hasText: '新規登録' }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
