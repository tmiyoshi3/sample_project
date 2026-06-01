import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- サプライヤータブ: テーブル表示 ---

Then(/^サプライヤーテーブルに「(.+)」列が表示されている$/, async ({ page }, columnName: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isSupplierColumnVisible(columnName);
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^サプライヤーテーブルに1件以上のサプライヤーが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const count = await adapter.getSupplierRowCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- サプライヤータブ: 詳細遷移 ---

When(/^サプライヤーの「詳細」ボタンをクリックする$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickSupplierDetailButton(0);
});

Then(/^サプライヤー詳細画面が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const url = adapter.getCurrentUrl();
    expect(url).toMatch(/\/suppliers\/\d+/);
  }).toPass({ timeout: 10_000 });
});

// --- サプライヤータブ: 空状態 ---

Then(/^「サプライヤー情報は登録されていません」メッセージが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isSupplierEmptyMessageVisible();
    expect(visible).toBe(true);
    const message = await adapter.getSupplierEmptyMessage();
    expect(message).toContain('サプライヤー情報は登録されていません');
  }).toPass({ timeout: 5_000 });
});
