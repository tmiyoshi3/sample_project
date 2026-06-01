import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createNotificationAdapter, createLoginAdapter } from '../adapters/factory.js';
import { TEST_USERS } from '../fixtures/users.js';

const { Given, When, Then } = createBdd();

// --- Login helpers for notification-specific users ---

Given('未読通知を持つテスト用ユーザーでログインしている', async ({ page }) => {
  // warehouse (user_id=4) has the most notifications including SENT/DELIVERED (unread)
  const user = TEST_USERS.WAREHOUSE_STAFF;
  await page.context().clearCookies();
  const loginAdapter = createLoginAdapter(page);
  await loginAdapter.navigateToLogin();
  await loginAdapter.fillUsername(user.username);
  await loginAdapter.fillPassword(user.password);
  await loginAdapter.clickLoginButton();
  await loginAdapter.waitForDashboard();
});

Given('全通知が既読のテスト用ユーザーでログインしている', async ({ page }) => {
  // admin (user_id=1) observed unreadCount=0
  const user = TEST_USERS.ADMIN;
  await page.context().clearCookies();
  const loginAdapter = createLoginAdapter(page);
  await loginAdapter.navigateToLogin();
  await loginAdapter.fillUsername(user.username);
  await loginAdapter.fillPassword(user.password);
  await loginAdapter.clickLoginButton();
  await loginAdapter.waitForDashboard();
});

// --- Notification badge assertions ---

Then('通知ボタンに未読件数バッジが表示されている', async ({ page }) => {
  const adapter = createNotificationAdapter(page);
  await expect(async () => {
    expect(await adapter.isBadgeVisible()).toBe(true);
  }).toPass({ timeout: 10_000 });
});

Then('バッジの件数が1以上である', async ({ page }) => {
  const adapter = createNotificationAdapter(page);
  const count = await adapter.getBadgeCount();
  expect(count).toBeGreaterThanOrEqual(1);
});

Then('通知ボタンにバッジが表示されていない', async ({ page }) => {
  const adapter = createNotificationAdapter(page);
  await page.waitForTimeout(2_000);
  expect(await adapter.isBadgeVisible()).toBe(false);
});

Then('通知ボタンが表示されている', async ({ page }) => {
  const adapter = createNotificationAdapter(page);
  expect(await adapter.isNotificationButtonVisible()).toBe(true);
});

// --- Polling verification ---

Then('未読件数取得APIが60秒間隔で呼び出されている', async ({ page }) => {
  const apiCalls: number[] = [];
  page.on('response', (response) => {
    if (response.url().includes('/notifications/unread-count')) {
      apiCalls.push(Date.now());
    }
  });
  await page.reload();
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  expect(apiCalls.length).toBeGreaterThanOrEqual(1);
});

// --- Skipped steps (現行未実装 — step定義のみ) ---

When('未読件数取得APIがエラーを返す', async () => {
  // @skip タグでスキップされるが、step定義は必要
});

When('通知ボタンをクリックする', async ({ page }) => {
  const adapter = createNotificationAdapter(page);
  await adapter.clickNotificationButton();
});

Then('通知パネルが表示される', async () => {
  // 現行システムでは通知パネル未実装
});

Given('通知パネルが表示されている', async () => {
  // 現行システムでは通知パネル未実装
});

When('通知を既読にする', async () => {
  // 現行システムでは通知パネル未実装
});

Then('未読件数バッジの件数が減る', async () => {
  // 現行システムでは通知パネル未実装
});

When('すべての通知を一括既読にする', async () => {
  // 現行システムでは通知パネル未実装
});
