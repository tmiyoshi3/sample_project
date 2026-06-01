import { Page, expect } from '@playwright/test';
import type { DashboardPageAdapter, OrderRow, CategoryItem } from '../../types.js';

const CARD_SELECTOR_MAP: Record<string, string> = {
  '発注件数': '.summary-card.card-orders',
  '在庫アラート': '.summary-card.card-stock',
  '承認待ち': '.summary-card.card-approvals',
  '予算消化率': '.summary-card.card-budget',
};

export class CurrentDashboardPageAdapter implements DashboardPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToDashboard(): Promise<void> {
    await this.page.goto('/dashboard');
    await this.page.waitForSelector('.summary-cards', { timeout: 15_000 }).catch(() => {});
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.page.locator('h1:has-text("ダッシュボード")').isVisible({ timeout: 5_000 }).catch(() => false);
  }

  async waitForDashboardLoad(): Promise<void> {
    await this.page.waitForURL('**/dashboard**', { timeout: 15_000 });
    await expect(this.page.locator('.summary-cards')).toBeVisible({ timeout: 10_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  private getCardSelector(cardTitle: string): string {
    const selector = CARD_SELECTOR_MAP[cardTitle];
    if (!selector) throw new Error(`Unknown card title: ${cardTitle}`);
    return selector;
  }

  async getSummaryCardCount(): Promise<number> {
    return await this.page.locator('.summary-card').count();
  }

  async isCardVisible(cardTitle: string): Promise<boolean> {
    return await this.page.locator(this.getCardSelector(cardTitle)).isVisible();
  }

  async getCardMainValue(cardTitle: string): Promise<string> {
    const card = this.page.locator(this.getCardSelector(cardTitle));
    return (await card.locator('.card-main-value').textContent() ?? '').trim();
  }

  async getCardDescription(cardTitle: string): Promise<string> {
    const card = this.page.locator(this.getCardSelector(cardTitle));
    return (await card.locator('.card-description').textContent() ?? '').trim();
  }

  async isCardHighlighted(cardTitle: string): Promise<boolean> {
    const card = this.page.locator(this.getCardSelector(cardTitle));
    const mainValue = card.locator('.card-main-value');
    const classes = await mainValue.getAttribute('class') ?? '';
    return classes.includes('has-pending') || classes.includes('has-alert') || classes.includes('alert-value');
  }

  async clickCard(cardTitle: string): Promise<void> {
    await this.page.locator(this.getCardSelector(cardTitle)).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async getOrderCardPendingCount(): Promise<string> {
    const card = this.page.locator('.summary-card.card-orders');
    return (await card.locator('.sub-count.pending').textContent() ?? '').trim();
  }

  async getOrderCardApprovedCount(): Promise<string> {
    const card = this.page.locator('.summary-card.card-orders');
    return (await card.locator('.sub-count.approved').textContent() ?? '').trim();
  }

  async isBudgetProgressBarVisible(): Promise<boolean> {
    return await this.page.locator('.card-budget .budget-bar').isVisible();
  }

  async getBudgetDetail(): Promise<string> {
    return (await this.page.locator('.card-budget .budget-detail').textContent() ?? '').trim();
  }

  async isSectionVisible(sectionTitle: string): Promise<boolean> {
    if (sectionTitle === '月別発注金額推移') {
      return await this.page.locator('.charts-section h3:has-text("月別発注金額推移")').isVisible();
    }
    if (sectionTitle === 'カテゴリ別支出割合') {
      return await this.page.locator('.charts-section h3:has-text("カテゴリ別支出割合")').isVisible();
    }
    if (sectionTitle === '最近の発注') {
      return await this.page.locator('.detail-panel.recent-orders').isVisible();
    }
    if (sectionTitle === '在庫アラート') {
      return await this.page.locator('.detail-panel.stock-alerts').isVisible();
    }
    return false;
  }

  async isMonthlySpendingChartVisible(): Promise<boolean> {
    return await this.page.locator('.chart-placeholder.bar-chart').isVisible();
  }

  async isPlaceholderNoteVisible(): Promise<boolean> {
    return await this.page.locator('.chart-note:has-text("プレースホルダー")').first().isVisible();
  }

  async getCategoryItems(): Promise<CategoryItem[]> {
    const items = this.page.locator('.category-item');
    const count = await items.count();
    const result: CategoryItem[] = [];
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      result.push({
        name: (await item.locator('.category-name').textContent() ?? '').trim(),
        percentage: (await item.locator('.category-percentage').textContent() ?? '').trim(),
        amount: (await item.locator('.category-amount').textContent() ?? '').trim(),
      });
    }
    return result;
  }

  async isCategoryBarVisible(index: number): Promise<boolean> {
    return await this.page.locator('.category-item').nth(index).locator('.category-bar').isVisible();
  }

  async getRecentOrderRows(): Promise<OrderRow[]> {
    const rows = this.page.locator('.recent-orders tbody tr');
    const count = await rows.count();
    const result: OrderRow[] = [];
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cells = row.locator('td');
      const statusCell = cells.nth(4);
      const statusTag = statusCell.locator('.status-tag');
      result.push({
        orderNumber: (await cells.nth(0).textContent() ?? '').trim(),
        supplier: (await cells.nth(1).textContent() ?? '').trim(),
        orderDate: (await cells.nth(2).textContent() ?? '').trim(),
        amount: (await cells.nth(3).textContent() ?? '').trim(),
        status: (await statusTag.textContent() ?? '').trim(),
        statusClass: await statusTag.getAttribute('class') ?? '',
      });
    }
    return result;
  }

  async getRecentOrderRowCount(): Promise<number> {
    return await this.page.locator('.recent-orders tbody tr').count();
  }

  async clickOrderRow(index: number): Promise<void> {
    await this.page.locator('.recent-orders tbody tr').nth(index).click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isOrderTableEmpty(): Promise<boolean> {
    return await this.page.locator('.recent-orders .empty-state').isVisible().catch(() => false);
  }

  async getOrderTableEmptyMessage(): Promise<string> {
    return (await this.page.locator('.recent-orders .empty-state').textContent() ?? '').trim();
  }

  async getInventoryAlertCount(): Promise<number> {
    const items = this.page.locator('.stock-alerts .alert-item');
    return await items.count();
  }

  async isInventoryAlertEmpty(): Promise<boolean> {
    return await this.page.locator('.stock-alerts .empty-state').isVisible().catch(() => false);
  }

  async getInventoryAlertEmptyMessage(): Promise<string> {
    return (await this.page.locator('.stock-alerts .empty-state').textContent() ?? '').trim();
  }

  async getInventoryAlertProductNames(): Promise<string[]> {
    const items = this.page.locator('.stock-alerts .alert-item .product-name');
    return await items.allTextContents();
  }

  async getInventoryAlertProductSkus(): Promise<string[]> {
    const items = this.page.locator('.stock-alerts .alert-item .product-sku');
    return await items.allTextContents();
  }

  async clickViewAllOrdersLink(): Promise<void> {
    await this.page.locator('.recent-orders .link-more').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickViewAllInventoryLink(): Promise<void> {
    await this.page.locator('.stock-alerts .link-more').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
