import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- Background ---

Given('製品一覧画面が表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.navigateToProductList();
  await adapter.waitForProductListLoad();
});

When('製品一覧画面にアクセスする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.navigateToProductList();
  await adapter.waitForProductListLoad();
});

// --- 検索 ---

When('検索ボックスに {string} と入力する', async ({ page }, keyword: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.fillSearchKeyword(keyword);
});

Given('検索ボックスに {string} と入力している', async ({ page }, keyword: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.fillSearchKeyword(keyword);
});

When('検索ボックスのクリアボタンをクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clearSearchKeyword();
});

Then('検索ボックスが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isSearchBoxVisible()).toBe(true);
});

// --- カテゴリフィルタ ---

When('カテゴリフィルタで {string} を選択する', async ({ page }, categoryName: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectCategory(categoryName);
});

Given('カテゴリフィルタで {string} を選択している', async ({ page }, categoryName: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectCategory(categoryName);
});

When('カテゴリフィルタで製品数0のカテゴリを選択する', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const options = await adapter.getCategoryOptions();
  for (const opt of options) {
    if (opt === 'すべて') continue;
    await adapter.selectCategory(opt);
    const count = await adapter.getTableRowCount();
    const isEmpty = await adapter.isEmptyStateVisible();
    if (count === 0 || isEmpty) return;
  }
  throw new Error('製品数0のカテゴリが見つかりません');
});

Then('カテゴリフィルタが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isCategoryFilterVisible()).toBe(true);
});

Then('カテゴリフィルタの選択肢に {string} が含まれている', async ({ page }, optionName: string) => {
  const adapter = createProductListAdapter(page);
  const options = await adapter.getCategoryOptions();
  expect(options.some(o => o.includes(optionName))).toBe(true);
});

Then('カテゴリフィルタの選択肢が{int}件表示されている', async ({ page }, expectedCount: number) => {
  const adapter = createProductListAdapter(page);
  const count = await adapter.getCategoryOptionCount();
  expect(count).toBe(expectedCount);
});

// --- メーカーフィルタ ---

When('メーカーフィルタで {string} を選択する', async ({ page }, manufacturerName: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectManufacturer(manufacturerName);
});

Then('メーカーフィルタが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isManufacturerFilterVisible()).toBe(true);
});

Then('メーカーフィルタの選択肢に {string} が含まれている', async ({ page }, optionName: string) => {
  const adapter = createProductListAdapter(page);
  const options = await adapter.getManufacturerOptions();
  expect(options.some(o => o.includes(optionName))).toBe(true);
});

Then('メーカーフィルタの選択肢が{int}件表示されている', async ({ page }, expectedCount: number) => {
  const adapter = createProductListAdapter(page);
  const count = await adapter.getManufacturerOptionCount();
  expect(count).toBe(expectedCount);
});

// --- ステータスフィルタ ---

When('ステータスフィルタで {string} を選択する', async ({ page }, statusLabel: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectStatus(statusLabel);
});

Given('ステータスフィルタで {string} を選択している', async ({ page }, statusLabel: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectStatus(statusLabel);
});

Then('ステータスフィルタが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isStatusFilterVisible()).toBe(true);
});

Then('ステータスフィルタの選択肢に {string} が含まれている', async ({ page }, optionName: string) => {
  const adapter = createProductListAdapter(page);
  const options = await adapter.getStatusOptions();
  expect(options.some(o => o.includes(optionName))).toBe(true);
});

// --- フィルタリセット ---
// '{string} リンクをクリックする' → F-01-02-001.steps.ts で定義済み（page.getByText）
// '{string} リンクが表示されている' → F-01-01-001.steps.ts で定義済み（page.getByText）

Then('{string} リンクが表示されていない', async ({ page }, linkText: string) => {
  await expect(async () => {
    const visible = await page.getByText(linkText, { exact: true }).isVisible().catch(() => false);
    expect(visible).toBe(false);
  }).toPass({ timeout: 5_000 });
});

// --- テーブル件数 ---

Then('製品一覧テーブルに{int}件の製品が表示されている', async ({ page }, expectedCount: number) => {
  const adapter = createProductListAdapter(page);
  await expect(async () => {
    const count = await adapter.getTableRowCount();
    expect(count).toBe(expectedCount);
  }).toPass({ timeout: 10_000 });
});

Then('製品一覧テーブルに1件以上の製品が表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await expect(async () => {
    const count = await adapter.getTableRowCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 10_000 });
});

Then('製品一覧テーブルに製品が表示されていない', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await expect(async () => {
    const count = await adapter.getTableRowCount();
    expect(count).toBe(0);
  }).toPass({ timeout: 10_000 });
});

// --- テーブル列 ---

Then('製品一覧テーブルに {string} 列が表示されている', async ({ page }, columnName: string) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isColumnVisible(columnName)).toBe(true);
});

// --- テーブル内容検証 ---

Then('製品一覧テーブルに表示されている全製品の製品名に {string} が含まれている', async ({ page }, keyword: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.name.toLowerCase()).toContain(keyword.toLowerCase());
  }
});

Then('製品一覧テーブルに表示されている製品のSKUに {string} が含まれている', async ({ page }, keyword: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  const hasMatch = rows.some(r => r.sku.includes(keyword));
  expect(hasMatch).toBe(true);
});

Then('製品一覧テーブルに表示されている全製品のカテゴリが {string} である', async ({ page }, categoryName: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.categoryName).toBe(categoryName);
  }
});

Then('製品一覧テーブルに表示されている全製品のメーカーが {string} である', async ({ page }, manufacturerName: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.manufacturerName).toBe(manufacturerName);
  }
});

Then('製品一覧テーブルに表示されている全製品のステータスが {string} である', async ({ page }, statusLabel: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.status).toBe(statusLabel);
  }
});

// --- 空状態 ---

Then('空状態メッセージが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isEmptyStateVisible()).toBe(true);
});

// --- ページング: フィルタ適用時のリセット ---

Given('2ページ目を表示している', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickPageNumber(2);
});

Then('ページ番号 {string} がアクティブである', async ({ page }, pageNum: string) => {
  const adapter = createProductListAdapter(page);
  await expect(async () => {
    const active = await adapter.getActivePageNumber();
    expect(active).toBe(parseInt(pageNum));
  }).toPass({ timeout: 10_000 });
});
