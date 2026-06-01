import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createDashboardAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- 発注テーブル正常系 ---

Given('発注書データが10件以上存在する', async () => {
  // シードデータには20件の発注書が存在するため、前提条件は自動的に満たされている
});

Then('最近の発注テーブルに10件表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.getRecentOrderRowCount()).toBe(10);
});

Then('発注テーブルに発注番号が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0].orderNumber).toMatch(/^PO-/);
});

Then('発注テーブルにサプライヤー名が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  expect(rows[0].supplier.length).toBeGreaterThan(0);
});

Then('発注テーブルに発注日が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  expect(rows[0].orderDate.length).toBeGreaterThan(0);
});

Then('発注テーブルに金額が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  expect(rows[0].amount).toMatch(/^¥/);
});

Then('発注テーブルにステータスが表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  expect(rows[0].status.length).toBeGreaterThan(0);
});

// --- フォーマット ---

Then('発注テーブルの発注日が {string} 形式で表示されている', async ({ page }, _format: string) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  for (const row of rows) {
    expect(row.orderDate).toMatch(/^\d{4}年\d{2}月\d{2}日$/);
  }
});

Then('発注テーブルの金額が {string} 形式で表示されている', async ({ page }, _format: string) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  for (const row of rows) {
    expect(row.amount).toMatch(/^¥[\d,]+$/);
  }
});

// --- ナビゲーション ---

When('最近の発注テーブルの行をクリックする', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  await adapter.clickOrderRow(0);
});

Then('該当発注書の発注詳細画面に遷移する', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/procurement\/orders\/\d+/);
  }).toPass({ timeout: 10_000 });
});

When('最近の発注セクションの {string} リンクをクリックする', async ({ page }, _linkText: string) => {
  const adapter = createDashboardAdapter(page);
  await adapter.clickViewAllOrdersLink();
});

Then('発注書一覧画面に遷移する', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toContain('/procurement/orders');
  }).toPass({ timeout: 10_000 });
});

// --- データ状態 ---

Given('発注書データが存在しない', async () => {
  test.skip(true, 'テスト環境に20件の発注書データが存在するため0件状態の再現不可');
});

Then('最近の発注テーブルに {string} と表示されている', async ({ page }, expectedMessage: string) => {
  const adapter = createDashboardAdapter(page);
  const message = await adapter.getOrderTableEmptyMessage();
  expect(message).toContain(expectedMessage);
});

// --- ステータスラベル ---

Given('ステータスが {string} の発注書が存在する', async ({}, _status: string) => {
  // シードデータに各ステータスの発注書が存在するため、前提条件は自動的に満たされている
});

Then('発注テーブルに {string} というステータスラベルが表示されている', async ({ page }, label: string) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  const found = rows.some(row => row.status === label);
  expect(found).toBe(true);
});
