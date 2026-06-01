import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Then } = createBdd();

// --- 仕様タブ: データあり ---

Then(/^仕様テーブルに「(.+)」の項目が表示されている$/, async ({ page }, key: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isSpecItemVisible(key);
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 仕様タブ: 空状態 ---

Then(/^「仕様情報は登録されていません」メッセージが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isSpecEmptyMessageVisible();
    expect(visible).toBe(true);
    const message = await adapter.getSpecEmptyMessage();
    expect(message).toContain('仕様情報は登録されていません');
  }).toPass({ timeout: 5_000 });
});
