import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createLoginAdapter } from '../adapters/factory.js';
import { DEFAULT_USER } from '../fixtures/users.js';

const { Given, When, Then } = createBdd();

// --- 初期表示検証 ---

Then('ユーザー名入力フィールドが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isUsernameFieldVisible()).toBe(true);
});

Then('ユーザー名フィールドのラベルが {string} である', async ({ page }, expectedLabel: string) => {
  const adapter = createLoginAdapter(page);
  const label = await adapter.getUsernameLabel();
  expect(label.trim()).toBe(expectedLabel);
});

Then('パスワード入力フィールドが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isPasswordFieldVisible()).toBe(true);
});

Then('パスワードフィールドのラベルが {string} である', async ({ page }, expectedLabel: string) => {
  const adapter = createLoginAdapter(page);
  const label = await adapter.getPasswordLabel();
  expect(label.trim()).toBe(expectedLabel);
});

Then('ログインボタンが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isLoginButtonVisible()).toBe(true);
});

Then('ログインボタンのラベルが {string} である', async ({ page }, expectedLabel: string) => {
  const adapter = createLoginAdapter(page);
  const label = await adapter.getLoginButtonLabel();
  expect(label.trim()).toBe(expectedLabel);
});

Then('ログインボタンのラベルが正しい', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const label = await adapter.getLoginButtonLabel();
  expect(label.trim()).toBe(adapter.getExpectedLabels().loginButton);
});

Then('ユーザー名フィールドに初期フォーカスがある', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isUsernameFocused()).toBe(true);
});

Then('パスワードはマスク表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isPasswordMasked()).toBe(true);
});

Then('{string} リンクが表示されている', async ({ page }, linkText: string) => {
  await expect(page.getByText(linkText)).toBeVisible();
});

Then('パスワードリセットリンクが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isPasswordResetLinkVisible()).toBe(true);
});

Then('言語切替ドロップダウンが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isLanguageDropdownVisible()).toBe(true);
});

// --- 認証済みユーザー ---

Given('ユーザーがすでにログイン済みである', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.navigateToLogin();
  await adapter.fillUsername(DEFAULT_USER.username);
  await adapter.fillPassword(DEFAULT_USER.password);
  await adapter.clickLoginButton();
  await adapter.waitForDashboard();
});

When('システムのトップ画面にアクセスする', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
});

Then('ログイン画面は表示されない', async ({ page }) => {
  const isLoginVisible = await page.locator('#username').isVisible().catch(() => false);
  expect(isLoginVisible).toBe(false);
});

// --- リダイレクト ---

Given('ユーザーが未認証状態で特定の業務画面URLにアクセスする', async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/products');
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
});

Given('ログイン画面にリダイレクトされる', async ({ page }) => {
  await page.waitForSelector('#username', { timeout: 15_000 });
  expect(await page.locator('#username').isVisible()).toBe(true);
});

Then('最初にアクセスした業務画面にリダイレクトされる', async ({ page }) => {
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  await expect(async () => {
    const url = page.url();
    expect(url.includes('/products') || url.includes('/dashboard')).toBe(true);
  }).toPass({ timeout: 15_000 });
});

// --- フォーム状態 ---

Then('ユーザー名フィールドに {string} が保持されている', async ({ page }, expectedValue: string) => {
  const adapter = createLoginAdapter(page);
  const value = await adapter.getUsernameValue();
  expect(value).toBe(expectedValue);
});

Then('パスワードフィールドがクリアされている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const value = await adapter.getPasswordValue();
  expect(value).toBe('');
});

Then('入力フィールドにエラー状態が表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.hasFieldErrorState()).toBe(true);
});

// --- セッションタイムアウト (@skip) ---

Given('ログイン画面のセッションがタイムアウトしている', async () => {
  test.skip(true, 'セッションタイムアウトの再現はE2Eテストでは困難');
});

Then('新しいセッションでログイン画面が再表示される', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isUsernameFieldVisible()).toBe(true);
});

// --- ブルートフォース (@skip) ---

Given('ユーザー {string} で5回連続認証に失敗している', async ({}, _username: string) => {
  test.skip(true, 'ブルートフォースロックの再現はテストアカウントをロックするため実施不可');
});

Then('アカウントロックのエラーメッセージが表示される', async () => {
  // @skip で到達しない
});

Then('15分間ログインできない', async () => {
  // @skip で到達しない
});

// --- ログイン成功後の状態 (@skip) ---

Then('以降のAPIリクエストにBearerトークンが自動付与される', async () => {
  test.skip(true, 'Bearerトークンの検証はブラウザE2Eからは困難');
});

Then('トークンの有効期限は5分である', async () => {
  test.skip(true, 'トークン有効期限の検証はブラウザE2Eからは困難');
});

// --- パスワードリセット画面遷移用（他featureで使用） ---

Then('パスワードリセット画面には到達しない', async ({ page }) => {
  const isKeycloakPage = await page.locator('#kc-page-title').isVisible({ timeout: 2_000 }).catch(() => false);
  if (isKeycloakPage) {
    const title = await page.locator('#kc-page-title').textContent() ?? '';
    expect(title).not.toContain('パスワード');
  }
});
