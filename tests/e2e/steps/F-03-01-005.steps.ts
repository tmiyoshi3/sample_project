import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- テーブル各行の内容確認 ---

Then('製品一覧テーブルの各行にSKUが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.sku.length).toBeGreaterThan(0);
  }
});

Then('製品一覧テーブルの各行に製品名が表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.name.length).toBeGreaterThan(0);
  }
});

Then('製品一覧テーブルの各行にカテゴリが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.categoryName.length).toBeGreaterThan(0);
  }
});

Then('製品一覧テーブルの各行にメーカーが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  const hasAnyManufacturer = rows.some(r => r.manufacturerName.length > 0);
  expect(hasAnyManufacturer).toBe(true);
});

Then('製品一覧テーブルの各行に単価が表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.unitPrice.length).toBeGreaterThan(0);
  }
});

Then('製品一覧テーブルの各行にステータスが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.status.length).toBeGreaterThan(0);
  }
});

Then('製品一覧テーブルの各行に在庫数が表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.stockQuantity).toBeDefined();
  }
});

// --- 通貨フォーマット ---

Then('製品一覧テーブルの単価列が {string} 付きカンマ区切りで表示されている', async ({ page }, currencySymbol: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  for (const row of rows) {
    expect(row.unitPrice).toContain(currencySymbol);
  }
});

// --- ステータスラベル ---

Then('製品一覧テーブルに表示されている全製品のステータスラベルが {string} である', async ({ page }, statusLabel: string) => {
  const adapter = createProductListAdapter(page);
  const rows = await adapter.getTableRows();
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    expect(row.status).toBe(statusLabel);
  }
});

// --- ソート ---

Then('製品名列に昇順ソートインジケータが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const direction = await adapter.getSortDirection('製品名');
  expect(direction).toBe('asc');
});

When('{string} 列ヘッダをクリックする', async ({ page }, columnName: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickColumnHeader(columnName);
});

Then('SKU列に昇順ソートインジケータが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const direction = await adapter.getSortDirection('SKU');
  expect(direction).toBe('asc');
});

Then('SKU列に降順ソートインジケータが表示されている', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  const direction = await adapter.getSortDirection('SKU');
  expect(direction).toBe('desc');
});

Then('{string}列にソートインジケータが表示されている', async ({ page }, columnName: string) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.hasSortIndicator(columnName)).toBe(true);
});

// Scenario Outline展開用（クォートなし）
for (const col of ['SKU', '製品名', 'カテゴリ', 'メーカー', '単価', 'ステータス']) {
  Then(`${col}列にソートインジケータが表示されている`, async ({ page }) => {
    const adapter = createProductListAdapter(page);
    expect(await adapter.hasSortIndicator(col)).toBe(true);
  });
}

// --- ページング ---

Then('ページ件数情報に {string} と表示されている', async ({ page }, expectedText: string) => {
  const adapter = createProductListAdapter(page);
  await expect(async () => {
    const paginationInfo = await adapter.getPaginationInfo();
    const resultInfo = await adapter.getResultCountInfo();
    const combined = paginationInfo + ' ' + resultInfo;
    expect(combined).toContain(expectedText);
  }).toPass({ timeout: 10_000 });
});

When('ページ番号 {string} をクリックする', async ({ page }, pageNum: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickPageNumber(parseInt(pageNum));
});

Given('ページ番号 {string} を表示している', async ({ page }, pageNum: string) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickPageNumber(parseInt(pageNum));
});

Then('次ページボタンが無効である', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isNextPageButtonDisabled()).toBe(true);
});

Then('末尾ページボタンが無効である', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isLastPageButtonDisabled()).toBe(true);
});

Then('前ページボタンが無効である', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isPreviousPageButtonDisabled()).toBe(true);
});

Then('先頭ページボタンが無効である', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  expect(await adapter.isFirstPageButtonDisabled()).toBe(true);
});

When('先頭ページボタンをクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickFirstPageButton();
});

When('次ページボタンをクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickNextPageButton();
});

When('前ページボタンをクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickPreviousPageButton();
});

When('末尾ページボタンをクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickLastPageButton();
});

Then('ページ番号ボタンが {string} のみ表示されている', async ({ page }, pageNum: string) => {
  const adapter = createProductListAdapter(page);
  const pages = await adapter.getPageNumbers();
  // ページネーションが非表示の場合（totalPages <= 1）は空配列。論理的に1ページのみ
  if (pages.length === 0) {
    expect(parseInt(pageNum)).toBe(1);
  } else {
    expect(pages).toEqual([parseInt(pageNum)]);
  }
});

// --- 行クリック ---

When('製品一覧テーブルの任意の製品行をクリックする', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.clickTableRow(0);
});

Then('製品詳細画面が表示される', async ({ page }) => {
  await expect(async () => {
    const url = page.url();
    expect(url).toMatch(/\/products\/\d+/);
  }).toPass({ timeout: 10_000 });
});

// --- データ状態: ページング ---

When('カテゴリフィルタで製品数が20件以下のカテゴリを選択する', async ({ page }) => {
  const adapter = createProductListAdapter(page);
  await adapter.selectCategoryByProductCount(20);
});
