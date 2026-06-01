import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createSupplierListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- Background / ナビゲーション ---

Given('サプライヤー一覧画面にアクセスする', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.navigateToSupplierList();
  await adapter.waitForSupplierListLoad();
});

// --- 検索テキストボックス ---

When(/^サプライヤー検索欄に「(.+?)」と入力する$/, async ({ page }, keyword: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.fillSearchKeyword(keyword);
});

When('サプライヤー検索欄をクリアする', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clearSearchKeyword();
});

// --- ステータスフィルタ ---

When(/^サプライヤーステータスフィルタで「(.+?)」を選択する$/, async ({ page }, label: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.selectStatus(label);
});

// --- 評価フィルタ ---

When(/^サプライヤー評価フィルタで「(.+?)」を選択する$/, async ({ page }, label: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.selectMinRating(label);
});

// --- フィルタリセット ---

When('サプライヤーフィルターをリセットする', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickResetButton();
});

Then('サプライヤーリセットボタンが表示される', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isResetButtonVisible()).toBe(true);
});

Then(/^サプライヤーステータスフィルタが「(.+?)」になっている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierListAdapter(page);
  const text = await adapter.getStatusSelectValue();
  expect(text).toBe(expected);
});

// --- テーブル表示・行数 ---

Then('サプライヤー一覧テーブルが表示される', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isTableVisible()).toBe(true);
});

Then('サプライヤーテーブルに {int} 件表示される', async ({ page }, count: number) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    const actual = await adapter.getTableRowCount();
    expect(actual).toBe(count);
  }).toPass({ timeout: 5_000 });
});

// --- 件数表示 ---

Then(/^サプライヤー件数表示に「(.+?)」と表示される$/, async ({ page }, expected: string) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    const text = await adapter.getResultCountText();
    expect(text).toContain(expected);
  }).toPass({ timeout: 5_000 });
});

// --- 空状態 ---

Then('サプライヤー空状態メッセージが表示される', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    expect(await adapter.isEmptyStateVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- コード表示 ---

Then(/^サプライヤーコード「(.+?)」が表示される$/, async ({ page }, code: string) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    const idx = await adapter.findRowIndexByCode(code);
    expect(idx).toBeGreaterThanOrEqual(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^サプライヤーコード「(.+?)」の会社名が「(.+?)」である$/, async ({ page }, code: string, name: string) => {
  const adapter = createSupplierListAdapter(page);
  const idx = await adapter.findRowIndexByCode(code);
  expect(idx).toBeGreaterThanOrEqual(0);
  const actual = await adapter.getSupplierNameInRow(idx);
  expect(actual).toBe(name);
});

// --- 列構成 ---

Then('サプライヤーテーブルにコード列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('コード'))).toBe(true);
});

Then('サプライヤーテーブルに会社名列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('会社名'))).toBe(true);
});

Then('サプライヤーテーブルにステータス列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('ステータス'))).toBe(true);
});

Then('サプライヤーテーブルに評価列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('評価'))).toBe(true);
});

Then('サプライヤーテーブルにメールアドレス列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('メールアドレス'))).toBe(true);
});

Then('サプライヤーテーブルに電話番号列がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  const headers = await adapter.getColumnHeaders();
  expect(headers.some(h => h.includes('電話番号'))).toBe(true);
});

// --- ステータス・評価・連絡先 ---

Then(/^サプライヤーコード「(.+?)」のステータスが「(.+?)」である$/, async ({ page }, code: string, expected: string) => {
  const adapter = createSupplierListAdapter(page);
  const idx = await adapter.findRowIndexByCode(code);
  expect(idx).toBeGreaterThanOrEqual(0);
  expect(await adapter.getSupplierStatusInRow(idx)).toBe(expected);
});

Then(/^サプライヤーコード「(.+?)」の評価が「(.+?)」である$/, async ({ page }, code: string, expected: string) => {
  const adapter = createSupplierListAdapter(page);
  const idx = await adapter.findRowIndexByCode(code);
  expect(idx).toBeGreaterThanOrEqual(0);
  expect(await adapter.getSupplierRatingInRow(idx)).toBe(expected);
});

Then(/^サプライヤーコード「(.+?)」のメールアドレスが空である$/, async ({ page }, code: string) => {
  const adapter = createSupplierListAdapter(page);
  const idx = await adapter.findRowIndexByCode(code);
  expect(idx).toBeGreaterThanOrEqual(0);
  expect(await adapter.getSupplierEmailInRow(idx)).toBe('');
});

Then(/^サプライヤーコード「(.+?)」の電話番号が空である$/, async ({ page }, code: string) => {
  const adapter = createSupplierListAdapter(page);
  const idx = await adapter.findRowIndexByCode(code);
  expect(idx).toBeGreaterThanOrEqual(0);
  expect(await adapter.getSupplierPhoneInRow(idx)).toBe('');
});

// --- 比較チェックボックス ---

When(/^サプライヤー「(.+?)」の比較チェックを選択する$/, async ({ page }, name: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickCompareCheckbox(name);
});

When(/^サプライヤー「(.+?)」の比較チェックを解除する$/, async ({ page }, name: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickCompareCheckbox(name);
});

// --- 比較ボタン ---

Then(/^サプライヤー比較ボタンのラベルが「(.+?)」である$/, async ({ page }, expected: string) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    const actual = await adapter.getCompareButtonLabel();
    expect(actual).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

Then('サプライヤー比較ボタンが無効である', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isCompareButtonDisabled()).toBe(true);
});

Then('サプライヤー比較ボタンが有効である', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isCompareButtonEnabled()).toBe(true);
});

Then('未選択サプライヤーの比較チェックが無効である', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.areUnselectedCheckboxesDisabled()).toBe(true);
});

Then('未選択サプライヤーの比較チェックが有効である', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.areUnselectedCheckboxesEnabled()).toBe(true);
});

When('サプライヤー比較ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickCompareButton();
});

// --- 比較画面 ---

Then('サプライヤー比較画面が表示される', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    expect(await adapter.isComparePageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^比較画面にサプライヤー「(.+?)」のデータがある$/, async ({ page }, name: string) => {
  const adapter = createSupplierListAdapter(page);
  await expect(async () => {
    expect(await adapter.isSupplierInCompare(name)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('比較画面に評価情報がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isCompareRatingVisible()).toBe(true);
});

Then('比較画面に発注実績がある', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isCompareOrderHistoryVisible()).toBe(true);
});

// --- 新規登録ボタン ---

When('サプライヤー新規登録ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickNewButton();
});

Then('サプライヤー新規登録画面が表示される', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toContain('/suppliers/new');
  }).toPass({ timeout: 5_000 });
});

Then('サプライヤー新規登録ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isNewButtonVisible()).toBe(true);
});

Then('サプライヤー新規登録ボタンが有効である', async ({ page }) => {
  const adapter = createSupplierListAdapter(page);
  expect(await adapter.isNewButtonEnabled()).toBe(true);
});

// --- 行クリック ---

When(/^サプライヤー「(.+?)」の行をクリックする$/, async ({ page }, name: string) => {
  const adapter = createSupplierListAdapter(page);
  await adapter.clickSupplierRow(name);
});

Then('サプライヤー詳細画面が表示される', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/suppliers\/\d+/);
  }).toPass({ timeout: 5_000 });
});

Then(/^サプライヤー詳細画面に「(.+?)」の情報がある$/, async ({ page }, name: string) => {
  await expect(async () => {
    const body = await page.locator('body').textContent() ?? '';
    expect(body).toContain(name);
  }).toPass({ timeout: 5_000 });
});
