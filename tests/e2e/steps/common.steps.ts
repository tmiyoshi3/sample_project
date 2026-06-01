import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createLoginAdapter, createDashboardAdapter } from '../adapters/factory.js';
import { DEFAULT_USER, TEST_USERS } from '../fixtures/users.js';

const { Given, When, Then } = createBdd();

// --- Background steps ---

Given('ユーザーが未認証状態である', async ({ page }) => {
  await page.context().clearCookies();
});

Given('ログイン画面が表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.navigateToLogin();
  expect(await adapter.isUsernameFieldVisible()).toBe(true);
});

// 'テスト用ユーザー {string} でログインしている' は F-02-01-001.steps.ts で定義済み

Given('テストデータが初期化されている', async () => {
  // Flywayシードデータで管理。E2Eテスト実行前にデータ初期化済みの前提
});

// --- Login with default credentials ---

When('ユーザー名を入力する', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.fillUsername(DEFAULT_USER.username);
});

When('パスワードを入力する', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.fillPassword(DEFAULT_USER.password);
});

When('ログインボタンをクリックする', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.clickLoginButton();
});

// --- Login with specific credentials ---

When('ユーザー名に {string} を入力する', async ({ page }, username: string) => {
  const adapter = createLoginAdapter(page);
  await adapter.fillUsername(username);
});

When('パスワードに {string} を入力する', async ({ page }, password: string) => {
  const adapter = createLoginAdapter(page);
  await adapter.fillPassword(password);
});

When('正しいパスワードを入力する', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.fillPassword(DEFAULT_USER.password);
});

// --- Role-based login ---

When('ロール {string} のテストユーザーでログインする', async ({ page }, role: string) => {
  const user = TEST_USERS[role];
  if (!user) throw new Error(`テストユーザーが定義されていません: ${role}`);
  const adapter = createLoginAdapter(page);
  await adapter.fillUsername(user.username);
  await adapter.fillPassword(user.password);
  await adapter.clickLoginButton();
});

// --- Dashboard assertions ---

Then('ダッシュボード画面が表示される', async ({ page }) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isDashboardVisible()).toBe(true);
});

// --- Error message assertions ---

Then('{string} というエラーメッセージが表示される', async ({ page }, expectedMessage: string) => {
  const adapter = createLoginAdapter(page);
  await expect(async () => {
    const msg = await adapter.getErrorMessage();
    expect(msg?.trim()).toContain(expectedMessage);
  }).toPass({ timeout: 5_000 });
});

Then('{string} というメッセージが表示される', async ({ page }, expectedMessage: string) => {
  const adapter = createLoginAdapter(page);
  await expect(async () => {
    const infoMsg = await adapter.getInfoMessage();
    const errorMsg = await adapter.getErrorMessage();
    const combined = [infoMsg, errorMsg].filter(Boolean).join(' ');
    expect(combined).toContain(expectedMessage);
  }).toPass({ timeout: 5_000 });
});
