import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- 代替品タブ: テーブル表示 ---

Then(/^代替品テーブルが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isAlternativesTableVisible();
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^代替品テーブルに「(.+)」列が表示されている$/, async ({ page }, columnName: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isAlternativesColumnVisible(columnName);
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^代替品テーブルに1件以上の代替品が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const count = await adapter.getAlternativesRowCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- 代替品タブ: 詳細遷移 ---

When(/^代替品の「詳細」ボタンをクリックする$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickAlternativesDetailButton(0);
});

Then(/^代替製品の製品詳細画面が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const url = adapter.getCurrentUrl();
    expect(url).toMatch(/\/products\/\d+/);
    const productName = await adapter.getProductName();
    expect(productName.length).toBeGreaterThan(0);
  }).toPass({ timeout: 10_000 });
});

// --- 代替品タブ: 空状態 ---

Then(/^「代替品は登録されていません」メッセージが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isAlternativesEmptyMessageVisible();
    expect(visible).toBe(true);
    const message = await adapter.getAlternativesEmptyMessage();
    expect(message).toContain('代替品は登録されていません');
  }).toPass({ timeout: 5_000 });
});
