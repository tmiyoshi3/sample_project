import { Page } from '@playwright/test';
import type { ProductListPageAdapter, ProductRow } from '../../types.js';

export class MigratedProductListPageAdapter implements ProductListPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToProductList(): Promise<void> {
    await this.page.goto('/products');
    await this.page.waitForSelector('.product-list-container', { timeout: 15_000 });
  }

  async waitForProductListLoad(): Promise<void> {
    await this.page.waitForSelector('.data-table', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
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
    }
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.page.locator('.search-box .search-input').isVisible();
  }

  // --- カテゴリフィルタ ---

  async selectCategory(categoryName: string): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'カテゴリ' }).locator('select');
    await select.selectOption({ label: categoryName });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async selectCategoryByProductCount(maxCount: number): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'カテゴリ' }).locator('select');
    const options = await select.locator('option').allTextContents();
    for (const opt of options) {
      if (opt === 'すべて') continue;
      await select.selectOption({ label: opt });
      await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      await this.page.waitForTimeout(500);
      const rowCount = await this.getTableRowCount();
      if (rowCount <= maxCount) return;
    }
  }

  async getCategoryOptionCount(): Promise<number> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'カテゴリ' }).locator('select');
    return await select.locator('option').count();
  }

  async getCategoryOptions(): Promise<string[]> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'カテゴリ' }).locator('select');
    return await select.locator('option').allTextContents();
  }

  async isCategoryFilterVisible(): Promise<boolean> {
    return await this.page.locator('.filter-group').filter({ hasText: 'カテゴリ' }).locator('select').isVisible();
  }

  // --- メーカーフィルタ ---

  async selectManufacturer(manufacturerName: string): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'メーカー' }).locator('select');
    await select.selectOption({ label: manufacturerName });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async getManufacturerOptionCount(): Promise<number> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'メーカー' }).locator('select');
    return await select.locator('option').count();
  }

  async getManufacturerOptions(): Promise<string[]> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'メーカー' }).locator('select');
    return await select.locator('option').allTextContents();
  }

  async isManufacturerFilterVisible(): Promise<boolean> {
    return await this.page.locator('.filter-group').filter({ hasText: 'メーカー' }).locator('select').isVisible();
  }

  // --- ステータスフィルタ ---

  async selectStatus(statusLabel: string): Promise<void> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'ステータス' }).locator('select');
    await select.selectOption({ label: statusLabel });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async getStatusOptions(): Promise<string[]> {
    const select = this.page.locator('.filter-group').filter({ hasText: 'ステータス' }).locator('select');
    return await select.locator('option').allTextContents();
  }

  async isStatusFilterVisible(): Promise<boolean> {
    return await this.page.locator('.filter-group').filter({ hasText: 'ステータス' }).locator('select').isVisible();
  }

  // --- フィルタリセット ---

  async isResetLinkVisible(): Promise<boolean> {
    return await this.page.locator('.btn-reset:has-text("フィルターをリセット")').isVisible().catch(() => false);
  }

  async clickResetLink(): Promise<void> {
    await this.page.locator('.btn-reset:has-text("フィルターをリセット")').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  // --- テーブル ---

  async getTableRowCount(): Promise<number> {
    const rows = this.page.locator('.data-table tbody tr.data-row');
    return await rows.count();
  }

  async getTableRows(): Promise<ProductRow[]> {
    const rows = this.page.locator('.data-table tbody tr.data-row');
    const count = await rows.count();
    const result: ProductRow[] = [];
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = row.locator('td');
      result.push({
        sku: (await cells.nth(0).textContent() ?? '').trim(),
        name: (await cells.nth(1).textContent() ?? '').trim(),
        categoryName: (await cells.nth(2).textContent() ?? '').trim(),
        manufacturerName: (await cells.nth(3).textContent() ?? '').trim(),
        unitPrice: (await cells.nth(4).textContent() ?? '').trim(),
        status: (await cells.nth(5).textContent() ?? '').trim(),
        stockQuantity: (await cells.nth(6).textContent() ?? '').trim(),
      });
    }
    return result;
  }

  async getColumnHeaders(): Promise<string[]> {
    const headers = this.page.locator('.data-table thead th');
    return await headers.allTextContents();
  }

  async isColumnVisible(columnName: string): Promise<boolean> {
    const headers = await this.getColumnHeaders();
    return headers.some(h => h.includes(columnName));
  }

  async clickTableRow(index: number): Promise<void> {
    await this.page.locator('.data-table tbody tr.data-row').nth(index).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- ソート ---

  async clickColumnHeader(columnName: string): Promise<void> {
    const th = this.page.locator('.data-table thead th.sortable').filter({ hasText: columnName });
    await th.click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async hasSortIndicator(columnName: string): Promise<boolean> {
    const th = this.page.locator('.data-table thead th').filter({ hasText: columnName });
    const sortIcon = await th.locator('.sort-icon').textContent() ?? '';
    return sortIcon.includes('▲') || sortIcon.includes('▼');
  }

  async getSortDirection(columnName: string): Promise<'asc' | 'desc' | null> {
    const th = this.page.locator('.data-table thead th').filter({ hasText: columnName });
    const sortIcon = await th.locator('.sort-icon').textContent() ?? '';
    if (sortIcon.includes('▲')) return 'asc';
    if (sortIcon.includes('▼')) return 'desc';
    return null;
  }

  // --- ページング ---

  async getActivePageNumber(): Promise<number> {
    const pagination = this.page.locator('.pagination');
    if (!(await pagination.isVisible().catch(() => false))) return 1;
    const active = this.page.locator('.pagination-controls .page-btn.active');
    if (!(await active.isVisible().catch(() => false))) return 1;
    const text = await active.textContent() ?? '1';
    return parseInt(text.trim());
  }

  async clickPageNumber(pageNum: number): Promise<void> {
    await this.page.locator(`.pagination-controls .page-btn:not([disabled])`).filter({ hasText: String(pageNum) }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickFirstPageButton(): Promise<void> {
    await this.page.locator('.pagination-controls .page-btn[title="最初のページ"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickPreviousPageButton(): Promise<void> {
    await this.page.locator('.pagination-controls .page-btn[title="前のページ"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickNextPageButton(): Promise<void> {
    await this.page.locator('.pagination-controls .page-btn[title="次のページ"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async clickLastPageButton(): Promise<void> {
    await this.page.locator('.pagination-controls .page-btn[title="最後のページ"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    await this.page.waitForTimeout(500);
  }

  async isFirstPageButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.pagination-controls .page-btn[title="最初のページ"]').isDisabled();
  }

  async isPreviousPageButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.pagination-controls .page-btn[title="前のページ"]').isDisabled();
  }

  async isNextPageButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.pagination-controls .page-btn[title="次のページ"]').isDisabled();
  }

  async isLastPageButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.pagination-controls .page-btn[title="最後のページ"]').isDisabled();
  }

  async getPageNumbers(): Promise<number[]> {
    const buttons = this.page.locator('.pagination-controls .page-btn:not([title])');
    const texts = await buttons.allTextContents();
    return texts.map(t => parseInt(t.trim())).filter(n => !isNaN(n));
  }

  async getPaginationInfo(): Promise<string> {
    return (await this.page.locator('.pagination-info').textContent() ?? '').trim();
  }

  async getResultCountInfo(): Promise<string> {
    return (await this.page.locator('.result-count').textContent() ?? '').trim();
  }

  // --- ボタン ---

  async isButtonVisible(buttonLabel: string): Promise<boolean> {
    return await this.page.locator('.action-bar button').filter({ hasText: buttonLabel }).isVisible();
  }

  async clickButton(buttonLabel: string): Promise<void> {
    await this.page.locator('.action-bar button').filter({ hasText: buttonLabel }).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- 空状態 ---

  async isEmptyStateVisible(): Promise<boolean> {
    return await this.page.locator('.empty-state').isVisible().catch(() => false);
  }

  // --- CSV ---

  async clickCsvExportButton(): Promise<void> {
    await this.page.locator('.btn-export').click();
    await this.page.waitForTimeout(2000);
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
