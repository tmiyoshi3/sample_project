import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createLoginAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- 言語ドロップダウン ---

Then('画面右上に言語切替ドロップダウンが表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  expect(await adapter.isLanguageDropdownVisible()).toBe(true);
});

Then('現在の言語が {string} と表示されている', async ({ page }, expected: string) => {
  const adapter = createLoginAdapter(page);
  const current = await adapter.getCurrentLanguage();
  expect(current.trim()).toBe(expected);
});

When('言語切替ドロップダウンをクリックする', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.openLanguageDropdown();
});

Then('{string} の選択肢が表示される', async ({ page }, option: string) => {
  const adapter = createLoginAdapter(page);
  const options = await adapter.getLanguageOptions();
  expect(options.map(o => o.trim())).toContain(option);
});

Then('英語の選択肢が表示される', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const options = await adapter.getLanguageOptions();
  const labels = adapter.getExpectedLabels();
  expect(options.map(o => o.trim())).toContain(labels.langOptionEnglish);
});

// --- 言語選択 ---

When('{string} を選択する', async ({ page }, language: string) => {
  const adapter = createLoginAdapter(page);
  await adapter.selectLanguage(language);
});

When('英語を選択する', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const labels = adapter.getExpectedLabels();
  await adapter.selectLanguage(labels.langOptionEnglish);
});

When('日本語を選択する', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const labels = adapter.getExpectedLabels();
  await adapter.selectLanguage(labels.langOptionJapanese);
});

Then('ログイン画面の全テキストが英語で表示される', async ({ page }) => {
  await expect(page.locator('label[for="username"]')).toContainText('Username or email');
  await expect(page.locator('label[for="password"]')).toContainText('Password');
});

Then('言語切替ドロップダウンの表示が {string} に変わる', async ({ page }, expected: string) => {
  const adapter = createLoginAdapter(page);
  const current = await adapter.getCurrentLanguage();
  expect(current.trim()).toBe(expected);
});

Then('言語切替ドロップダウンの表示が英語に変わる', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const labels = adapter.getExpectedLabels();
  const current = await adapter.getCurrentLanguage();
  expect(current.trim()).toBe(labels.currentLangAfterEnglish);
});

Given('ログイン画面が英語で表示されている', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  await adapter.openLanguageDropdown();
  const labels = adapter.getExpectedLabels();
  await adapter.selectLanguage(labels.langOptionEnglish);
  await page.waitForSelector('#username', { timeout: 10_000 });
});

Then('ログイン画面の全テキストが日本語で表示される', async ({ page }) => {
  await expect(page.locator('label[for="username"]')).toContainText('ユーザー名またはメールアドレス');
  await expect(page.locator('label[for="password"]')).toContainText('パスワード');
});

// --- 同一言語選択 ---

Then('ログイン画面が再表示される', async ({ page }) => {
  await page.waitForSelector('#username', { timeout: 10_000 });
  expect(await page.locator('#username').isVisible()).toBe(true);
});

Then('表示内容は変わらない', async ({ page }) => {
  await expect(page.locator('label[for="username"]')).toContainText('ユーザー名またはメールアドレス');
});

// --- データ状態 ---

Then('選択肢は {string} と {string} の2つのみ表示される', async ({ page }, lang1: string, lang2: string) => {
  const adapter = createLoginAdapter(page);
  const options = await adapter.getLanguageOptions();
  const trimmed = options.map(o => o.trim());
  expect(trimmed).toHaveLength(2);
  expect(trimmed).toContain(lang1);
  expect(trimmed).toContain(lang2);
});

Then('選択肢は日本語と英語の2言語のみ表示される', async ({ page }) => {
  const adapter = createLoginAdapter(page);
  const options = await adapter.getLanguageOptions();
  const labels = adapter.getExpectedLabels();
  const trimmed = options.map(o => o.trim());
  expect(trimmed).toHaveLength(2);
  expect(trimmed).toContain('日本語');
  expect(trimmed).toContain(labels.langOptionEnglish);
});
