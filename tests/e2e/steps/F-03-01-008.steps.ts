import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- ボタン表示 ---

Then('{string} ボタンが表示されている', async ({ page }, buttonLabel: string) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isButtonVisible(buttonLabel)).toBe(true);
});

// --- ボタンクリック遷移 ---

When('{string} ボタンをクリックする', async ({ page }, buttonLabel: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickButton(buttonLabel);
});

Then('カテゴリ管理画面が表示される', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toContain('/products/categories');
  }).toPass({ timeout: 10_000 });
});

Then('バンドル管理画面が表示される', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toContain('/products/bundles');
  }).toPass({ timeout: 10_000 });
});

Then('製品新規登録画面が表示される', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toContain('/products/new');
  }).toPass({ timeout: 10_000 });
});
