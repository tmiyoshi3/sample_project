import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter, createProductListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

let testProductId: string = '';
let testProductSku: string = '';

Given('テスト用ACTIVE製品が作成されている', async ({ request }) => {
  testProductSku = `TEST-DEL-${Date.now()}`;
  const response = await request.post('/api/products', {
    data: {
      skuCode: testProductSku,
      name: `テスト削除用製品 ${testProductSku}`,
      unitPrice: 100,
      categoryId: 1,
      manufacturerId: 1,
      status: 'ACTIVE',
      unit: '個',
      minimumOrderQuantity: 1,
      leadTimeDays: 1,
    },
  });
  expect(response.ok()).toBe(true);
  const body = await response.json();
  testProductId = String(body.id);
});

Given('テスト用製品の製品詳細画面を表示している', async ({ page }) => {
  expect(testProductId).not.toBe('');
  const adapter = createProductDetailAdapter(page);
  await adapter.navigateToProductDetail(testProductId);
  await adapter.waitForProductDetailLoad();
});

When('「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickDeleteButton();
});

Then(/^確認ダイアログ「(.+)」が表示される$/, async ({ page }, expectedTitle: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isConfirmDialogVisible()).toBe(true);
    const title = await adapter.getConfirmDialogTitle();
    expect(title).toBe(expectedTitle);
  }).toPass({ timeout: 5_000 });
});

Then(/^確認メッセージ「(.+)」が表示される$/, async ({ page }, expectedMessage: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const message = await adapter.getConfirmDialogMessage();
    expect(message).toBe(expectedMessage);
  }).toPass({ timeout: 5_000 });
});

Then(/^ダイアログに「(.+)」ボタンが表示されている$/, async ({ page }, buttonLabel: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    if (buttonLabel === 'キャンセル') {
      expect(await adapter.isDialogCancelButtonVisible()).toBe(true);
    } else if (buttonLabel === '削除する') {
      expect(await adapter.isDialogConfirmButtonVisible()).toBe(true);
    }
  }).toPass({ timeout: 5_000 });
});

When(/^確認ダイアログで「削除する」ボタンをクリックする$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickDialogConfirmButton();
});

When(/^確認ダイアログで「キャンセル」ボタンをクリックする$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickDialogCancelButton();
});

Then('確認ダイアログが閉じている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isConfirmDialogVisible()).toBe(false);
  }).toPass({ timeout: 5_000 });
});

Then('製品詳細画面が引き続き表示されている', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toMatch(/\/products\/\d+$/);
  }).toPass({ timeout: 5_000 });
});

Then(/^テスト用製品のステータスが「(.+)」と表示されている$/, async ({ page }, expectedStatus: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.fillSearchKeyword(testProductSku);
  await page.waitForTimeout(1_000);
  await expect(async () => {
    const rows = await adapter.getTableRows();
    const target = rows.find(r => r.sku === testProductSku);
    expect(target).toBeDefined();
    expect(target!.status).toContain(expectedStatus);
  }).toPass({ timeout: 10_000 });
});

Then(/^削除エラーメッセージ「(.+)」が表示される$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isErrorBannerVisible()).toBe(true);
    const message = await adapter.getErrorBannerMessage();
    expect(message).toContain('製品の削除に失敗しました。');
  }).toPass({ timeout: 10_000 });
});

Then('「削除」ボタンが表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isDeleteButtonVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});
