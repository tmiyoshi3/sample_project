import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- Navigation ---

When('製品ID {string} の製品詳細画面にアクセスする', async ({ page }, productId: string) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.navigateToProductDetail(productId);
  await adapter.waitForProductDetailLoad();
});

Given('製品ID {string} の製品詳細画面を表示している', async ({ page }, productId: string) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.navigateToProductDetail(productId);
  await adapter.waitForProductDetailLoad();
});

// --- Header assertions ---

Then(/^ページタイトル「製品詳細」が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const title = await adapter.getPageTitle();
    expect(title).toContain('製品詳細');
  }).toPass({ timeout: 5_000 });
});

Then(/^製品名「(.+)」が表示されている$/, async ({ page }, expectedName: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const name = await adapter.getProductName();
    expect(name).toBe(expectedName);
  }).toPass({ timeout: 5_000 });
});

Then(/^ステータスバッジ「(.+)」が表示されている$/, async ({ page }, expectedStatus: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const status = await adapter.getStatusBadgeText();
    expect(status).toBe(expectedStatus);
  }).toPass({ timeout: 5_000 });
});

Then(/^SKU「(.+)」が表示されている$/, async ({ page }, expectedSku: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const sku = await adapter.getSku();
    expect(sku).toBe(expectedSku);
  }).toPass({ timeout: 5_000 });
});

Then(/^カテゴリ「(.+)」が表示されている$/, async ({ page }, expectedCategory: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const category = await adapter.getCategoryName();
    expect(category).toBe(expectedCategory);
  }).toPass({ timeout: 5_000 });
});

Then(/^メーカー「(.+)」が表示されている$/, async ({ page }, expectedManufacturer: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const manufacturer = await adapter.getManufacturerName();
    expect(manufacturer).toBe(expectedManufacturer);
  }).toPass({ timeout: 5_000 });
});

// --- Tab operations ---

When(/^「(.+)」タブをクリックする$/, async ({ page }, tabName: string) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickTab(tabName);
});

// --- Error state ---

Then(/^エラーバナー「(.+)」が表示される$/, async ({ page }, expectedMessage: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isErrorBannerVisible()).toBe(true);
    const message = await adapter.getErrorBannerMessage();
    expect(message).toContain(expectedMessage);
  }).toPass({ timeout: 10_000 });
});

Then(/^「一覧に戻る」ボタンが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isBackToListButtonVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});
