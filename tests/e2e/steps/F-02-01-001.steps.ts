import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createDashboardAdapter } from '../adapters/factory.js';
import { createLoginAdapter } from '../adapters/factory.js';
import { TEST_USERS } from '../fixtures/users.js';

const { Given, When, Then } = createBdd();

// --- Background ---

Given('テスト用ユーザー {string} でログインしている', async ({ page }, role: string) => {
  const user = TEST_USERS[role];
  if (!user) throw new Error(`テストユーザーが定義されていません: ${role}`);
  await page.context().clearCookies();
  const loginAdapter = createLoginAdapter(page);
  await loginAdapter.navigateToLogin();
  await loginAdapter.fillUsername(user.username);
  await loginAdapter.fillPassword(user.password);
  await loginAdapter.clickLoginButton();
  await loginAdapter.waitForDashboard();
});

Given('ダッシュボード画面が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  await adapter.waitForDashboardLoad();
});

When('ダッシュボード画面にアクセスする', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  await adapter.navigateToDashboard();
});

// --- Summary cards ---

Then('サマリーカードが4枚表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.getSummaryCardCount()).toBe(4);
});

Then('{string} カードが表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isCardVisible(cardTitle)).toBe(true);
});

Then('{string} セクションが表示されている', async ({ page }, sectionTitle: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isSectionVisible(sectionTitle)).toBe(true);
});

// --- Order card ---

Then('{string} カードのメイン値に発注書の合計件数が表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  const num = parseInt(value);
  expect(num).toBeGreaterThan(0);
});

Then('{string} カードに保留中の件数が表示されている', async ({ page }, _cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const pendingCount = await adapter.getOrderCardPendingCount();
  expect(pendingCount).toBeDefined();
});

Then('{string} カードに承認済みの件数が表示されている', async ({ page }, _cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const approvedCount = await adapter.getOrderCardApprovedCount();
  expect(approvedCount).toBeDefined();
});

// --- Alert card ---

Then('{string} カードのメイン値に在庫不足製品数が表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(value).toMatch(/^\d+$/);
});

Then('{string} カードに {string} という説明が表示されている', async ({ page }, cardTitle: string, expectedDesc: string) => {
  const adapter = createDashboardAdapter(page);
  const desc = await adapter.getCardDescription(cardTitle);
  expect(desc).toContain(expectedDesc);
});

// --- Approval card ---

Then('{string} カードのメイン値に承認待ち件数が表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(value).toMatch(/^\d+$/);
});

// --- Budget card ---

Then('{string} カードのメイン値に消化率パーセントが表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(value).toMatch(/^\d+%$/);
});

Then('{string} カードにプログレスバーが表示されている', async ({ page }, _cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isBudgetProgressBarVisible()).toBe(true);
});

Then('{string} カードに消化済み金額と予算総額の内訳が表示されている', async ({ page }, _cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const detail = await adapter.getBudgetDetail();
  expect(detail).toMatch(/¥[\d,]+ \/ ¥[\d,]+/);
});

// --- Category spending ---

Then('カテゴリ別支出割合セクションにカテゴリ名が表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const items = await adapter.getCategoryItems();
  expect(items.length).toBeGreaterThan(0);
  expect(items[0].name.length).toBeGreaterThan(0);
});

Then('各カテゴリにパーセント表示がある', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const items = await adapter.getCategoryItems();
  for (const item of items) {
    expect(item.percentage).toMatch(/^\d+%$/);
  }
});

Then('各カテゴリに金額表示がある', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const items = await adapter.getCategoryItems();
  for (const item of items) {
    expect(item.amount).toMatch(/^¥[\d,]+$/);
  }
});

Then('各カテゴリに水平バーが表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const items = await adapter.getCategoryItems();
  for (let i = 0; i < items.length; i++) {
    expect(await adapter.isCategoryBarVisible(i)).toBe(true);
  }
});

Then('{string} という注記が表示されている', async ({ page }, noteText: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isPlaceholderNoteVisible()).toBe(true);
});

// --- Monthly spending ---

Then('月別発注金額推移セクションが表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isMonthlySpendingChartVisible()).toBe(true);
});

// --- Data state ---

Given('当年度の予算データが存在しない', async () => {
  // シードデータでは2026年度の予算データが空のため、前提条件は自動的に満たされている
});

Then('{string} カードのメイン値が {string} である', async ({ page }, cardTitle: string, expectedValue: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(value).toBe(expectedValue);
});

Then('{string} カードの金額内訳が {string} である', async ({ page }, _cardTitle: string, expectedDetail: string) => {
  const adapter = createDashboardAdapter(page);
  const detail = await adapter.getBudgetDetail();
  expect(detail).toBe(expectedDetail);
});

Given('在庫不足の製品が存在しない', async () => {
  // シードデータでは在庫不足製品が0件のため、前提条件は自動的に満たされている
});

Then('在庫アラートセクションに {string} と表示されている', async ({ page }, expectedMessage: string) => {
  const adapter = createDashboardAdapter(page);
  const message = await adapter.getInventoryAlertEmptyMessage();
  expect(message).toContain(expectedMessage);
});

Given('承認待ちの発注書または購買依頼が存在する', async () => {
  // シードデータではpendingApprovals=4のため、前提条件は自動的に満たされている
});

Then('{string} カードのメイン値が0より大きい', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(parseInt(value)).toBeGreaterThan(0);
});

Then('{string} カードが強調表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isCardHighlighted(cardTitle)).toBe(true);
});

Given('発注書データが存在する', async () => {
  // シードデータには20件の発注書が存在するため、前提条件は自動的に満たされている
});

Then('最近の発注テーブルに最大10件表示されている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const count = await adapter.getRecentOrderRowCount();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(10);
});

Then('発注テーブルは発注日の降順でソートされている', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  const rows = await adapter.getRecentOrderRows();
  for (let i = 1; i < rows.length; i++) {
    const prevDate = rows[i - 1].orderDate;
    const currDate = rows[i].orderDate;
    expect(prevDate >= currDate).toBe(true);
  }
});

// --- Card main value display ---

Then('{string} カードのメイン値が表示されている', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  const value = await adapter.getCardMainValue(cardTitle);
  expect(value.length).toBeGreaterThan(0);
});
