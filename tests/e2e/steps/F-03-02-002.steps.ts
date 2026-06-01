import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { When, Then } = createBdd();

When('「一覧に戻る」ボタンをクリックする', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickBackToListButton();
});

Then('製品一覧画面に遷移している', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toMatch(/\/products\/?$/);
  }).toPass({ timeout: 10_000 });
});

When('「編集」ボタンをクリックする', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickEditButton();
});

Then('製品編集画面に遷移している', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toMatch(/\/products\/\d+\/edit/);
  }).toPass({ timeout: 10_000 });
});
