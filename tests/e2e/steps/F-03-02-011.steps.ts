import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Then } = createBdd();

// --- 画像タブ: データあり ---

Then(/^製品画像が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isImageGridVisible();
    expect(visible).toBe(true);
    const count = await adapter.getImageCardCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^「メイン」バッジが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isPrimaryBadgeVisible();
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 画像タブ: フォールバック ---

Then(/^フォールバック画像カードが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isImageGridVisible();
    expect(visible).toBe(true);
    const count = await adapter.getImageCardCount();
    expect(count).toBe(1);
  }).toPass({ timeout: 5_000 });
});

Then(/^画像のaltテキストに「画像なし」が含まれている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const altText = await adapter.getImageAltText(0);
    expect(altText).toContain('画像なし');
  }).toPass({ timeout: 5_000 });
});
