import { expect } from '@playwright/test';
import type { DashboardPageAdapter } from '../../adapters/types.js';

export async function assertDashboardInitialState(adapter: DashboardPageAdapter): Promise<void> {
  expect(await adapter.isDashboardVisible()).toBe(true);
  expect(await adapter.getSummaryCardCount()).toBe(4);
  expect(await adapter.isCardVisible('発注件数')).toBe(true);
  expect(await adapter.isCardVisible('在庫アラート')).toBe(true);
  expect(await adapter.isCardVisible('承認待ち')).toBe(true);
  expect(await adapter.isCardVisible('予算消化率')).toBe(true);
}

export async function assertOrderCardHasData(adapter: DashboardPageAdapter): Promise<void> {
  const value = await adapter.getCardMainValue('発注件数');
  expect(parseInt(value)).toBeGreaterThan(0);
  const pending = await adapter.getOrderCardPendingCount();
  expect(pending).toBeDefined();
  const approved = await adapter.getOrderCardApprovedCount();
  expect(approved).toBeDefined();
}

export async function assertRecentOrdersTableFormat(adapter: DashboardPageAdapter): Promise<void> {
  const rows = await adapter.getRecentOrderRows();
  expect(rows.length).toBeGreaterThan(0);
  expect(rows.length).toBeLessThanOrEqual(10);
  for (const row of rows) {
    expect(row.orderNumber).toMatch(/^PO-/);
    expect(row.orderDate).toMatch(/^\d{4}年\d{2}月\d{2}日$/);
    expect(row.amount).toMatch(/^¥[\d,]+$/);
    expect(row.status.length).toBeGreaterThan(0);
  }
}
