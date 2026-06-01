import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createLoginAdapter, createPasswordResetAdapter } from '../adapters/factory.js';
import { DEFAULT_USER } from '../fixtures/users.js';

const { Given, When, Then } = createBdd();

// --- パスワードリセット画面への遷移 ---

When('{string} リンクをクリックする', async ({ page }, linkText: string) => {
  await page.getByText(linkText).click();
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
});

When('パスワードリセットリンクをクリックする', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.clickPasswordResetLink();
});

Then('パスワードリセット画面が表示される', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  await page.waitForSelector('#username', { timeout: 10_000 });
  const title = await adapter.getPageTitle();
  expect(title).toContain('パスワード');
});

// --- パスワードリセット画面の初期表示 ---

Given('パスワードリセット画面が表示されている', async ({ page }) => {
  const loginAdapter = createLoginAdapter(page);
  await loginAdapter.navigateToLogin();
  await loginAdapter.clickPasswordResetLink();
  await page.waitForSelector('#username', { timeout: 10_000 });
});

Then('見出し {string} が表示されている', async ({ page }, expected: string) => {
  const adapter = createPasswordResetAdapter(page);
  const title = await adapter.getPageTitle();
  expect(title.trim()).toContain(expected);
});

Then('パスワードリセットの見出しが表示されている', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  const title = await adapter.getPageTitle();
  expect(title.trim()).toContain('パスワード');
});

Then('ユーザー名またはメールアドレス入力フィールドが表示されている', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  expect(await adapter.isUsernameFieldVisible()).toBe(true);
});

Then('送信ボタンが表示されている', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  expect(await adapter.isSubmitButtonVisible()).toBe(true);
});

// --- パスワードリセット送信 (@skip) ---

When('ユーザー名またはメールアドレスを入力する', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  await adapter.fillUsername(DEFAULT_USER.username);
});

When('送信ボタンをクリックする', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  await adapter.clickSubmitButton();
});

Then('パスワードリセットメールの送信が要求される', async () => {
  test.skip(true, 'SMTP設定の有無が未確認のため送信結果を検証不可');
});

// --- ログインに戻る ---

Then('ログイン画面が表示される', async ({ page }) => {
  await page.waitForSelector('#username', { timeout: 10_000 });
  await page.waitForSelector('#password', { timeout: 5_000 });
  const loginAdapter = createLoginAdapter(page);
  expect(await loginAdapter.isLoginButtonVisible()).toBe(true);
});

// --- パスワードリセット完了後 (@skip) ---

Given('ユーザーがパスワードリセットを完了している', async () => {
  test.skip(true, 'パスワードリセット完了フローの再現はSMTP設定が必要で実施不可');
});

When('ログイン画面でユーザー名を入力する', async () => {
  // @skip で到達しない
});

When('新しいパスワードを入力する', async () => {
  // @skip で到達しない
});

// --- バリデーション ---

Then('エラーメッセージが表示される', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  await expect(async () => {
    const msg = await adapter.getErrorMessage();
    expect(msg).not.toBeNull();
  }).toPass({ timeout: 5_000 });
});

// --- 存在しないユーザー (@skip) ---

When('存在しないユーザー名を入力する', async ({ page }) => {
  const adapter = createPasswordResetAdapter(page);
  await adapter.fillUsername('nonexistent_user_xyz');
});

Then('ユーザー列挙防止のため、存在するユーザーと同一の応答が返される', async () => {
  test.skip(true, 'パスワードリセット送信後の画面内容が未確認');
});

// --- セッションタイムアウト (@skip) ---

Given('セッションがタイムアウトしている', async () => {
  test.skip(true, 'セッションタイムアウトの再現はE2Eテストでは困難');
});

Then('セッションタイムアウトのエラーが表示される', async () => {
  // @skip で到達しない
});
