import { createBdd } from 'playwright-bdd';
import { expect, request as pwRequest } from '@playwright/test';
import { createBundleManagementAdapter } from '../adapters/factory.js';
import { DEFAULT_USER } from '../fixtures/users.js';

const { Given, When, Then, Before } = createBdd();

let testBundleIds: number[] = [];
let lastAddedProductPrice = 0;
let lastTotalPriceBefore = '';
let lastDiscountAmountBefore = '';
let lastBundlePriceBefore = '';

async function getAuthHeaders(baseURL: string): Promise<Record<string, string>> {
  const ctx = await pwRequest.newContext({ baseURL });
  try {
    const tokenRes = await ctx.post('/realms/proquip/protocol/openid-connect/token', {
      form: {
        grant_type: 'password',
        client_id: 'proquip-web',
        username: DEFAULT_USER.username,
        password: DEFAULT_USER.password,
      },
    });
    if (!tokenRes.ok()) return {};
    const tokenData = await tokenRes.json();
    return { Authorization: `Bearer ${tokenData.access_token}` };
  } catch {
    return {};
  } finally {
    await ctx.dispose();
  }
}

Before({ tags: '@F-03-04-001 or @F-03-04-002 or @F-03-04-005 or @F-03-04-006' }, async ({ request }) => {
  const baseURL = process.env.TARGET_ENV === 'migrated' ? 'http://localhost:4201' : 'http://localhost:4200';
  const headers = await getAuthHeaders(baseURL);
  const response = await request.get('/api/products/bundles', { headers });
  if (response.ok()) {
    const bundles = await response.json();
    const testBundles = bundles.filter((b: any) => b.name && b.name.startsWith('TEST-BDL'));
    for (const bundle of testBundles) {
      await request.delete(`/api/products/bundles/${bundle.id}`, { headers }).catch(() => {});
    }
  }
  testBundleIds = [];
});

// --- Helper: create a test bundle via API ---

async function createTestBundle(request: any, name: string, status: string = 'ACTIVE', headers: Record<string, string> = {}): Promise<number> {
  const productsRes = await request.get('/api/products?page=0&size=5', { headers });
  const productsData = await productsRes.json();
  const products = productsData.content || productsData;
  const firstProduct = products[0];

  const response = await request.post('/api/products/bundles', {
    headers,
    data: {
      name,
      description: `テスト用バンドル ${name}`,
      discountPercentage: 5,
      status,
      items: [{ productId: firstProduct.id, quantity: 1 }],
    },
  });
  expect(response.ok()).toBe(true);
  const body = await response.json();
  testBundleIds.push(body.id);
  return body.id;
}

// --- Background / Navigation ---

Given('バンドル管理画面を表示する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.navigateToBundleManagement();
  await adapter.waitForBundleManagementLoad();
});

Given('バンドル管理画面を再表示する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.reloadPage();
});

// --- テストデータ作成 ---

Given(/^テスト用バンドル「([^」]+)」がINACTIVEステータスで作成されている$/, async ({ request, page }, bundleName: string) => {
  const baseURL = process.env.TARGET_ENV === 'migrated' ? 'http://localhost:4201' : 'http://localhost:4200';
  const headers = await getAuthHeaders(baseURL);
  await createTestBundle(request, bundleName, 'INACTIVE', headers);
  const adapter = createBundleManagementAdapter(page);
  await adapter.navigateToBundleManagement();
});

Given(/^テスト用バンドル「([^」]+)」がDRAFTステータスで作成されている$/, async ({ request, page }, bundleName: string) => {
  const baseURL = process.env.TARGET_ENV === 'migrated' ? 'http://localhost:4201' : 'http://localhost:4200';
  const headers = await getAuthHeaders(baseURL);
  await createTestBundle(request, bundleName, 'DRAFT', headers);
  const adapter = createBundleManagementAdapter(page);
  await adapter.navigateToBundleManagement();
});

Given(/^テスト用バンドル「([^」]+)」が作成されている$/, async ({ request }, bundleName: string) => {
  const baseURL = process.env.TARGET_ENV === 'migrated' ? 'http://localhost:4201' : 'http://localhost:4200';
  const headers = await getAuthHeaders(baseURL);
  await createTestBundle(request, bundleName, 'ACTIVE', headers);
});

// --- バンドル一覧 (F-03-04-001) ---

Then(/^バンドルカードが(\d+)件以上表示されている$/, async ({ page }, minCount: number) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getBundleCardCount();
    expect(count).toBeGreaterThanOrEqual(minCount);
  }).toPass({ timeout: 10_000 });
});

Then('バンドルカードがバンドル名の昇順で表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  const names = await adapter.getBundleCardNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b, 'ja'));
  expect(names).toEqual(sorted);
});

Then(/^バンドルカード「([^」]+)」が表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isBundleCardVisible(bundleName)).toBe(true);
  }).toPass({ timeout: 10_000 });
});

Then(/^バンドルカード「([^」]+)」に説明が表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const desc = await adapter.getBundleCardDescription(bundleName);
    expect(desc.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^バンドルカード「([^」]+)」に構成製品チップが表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const chips = await adapter.getBundleProductChips(bundleName);
    expect(chips.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then('構成製品チップに「製品名 × 数量」形式で表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  const chips = await adapter.getBundleProductChips('会議室セット');
  for (const chip of chips) {
    expect(chip).toMatch(/× \d+/);
  }
});

Then(/^バンドルカード「([^」]+)」に定価合計が打ち消し線付きで表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const price = await adapter.getBundleTotalPrice(bundleName);
    expect(price.length).toBeGreaterThan(0);
    expect(await adapter.isTotalPriceStrikethrough(bundleName)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^バンドルカード「([^」]+)」に割引率が表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const discount = await adapter.getBundleDiscountPercentage(bundleName);
    expect(discount).toContain('%');
  }).toPass({ timeout: 5_000 });
});

Then(/^バンドルカード「([^」]+)」にバンドル価格が表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const price = await adapter.getBundleBundlePrice(bundleName);
    expect(price.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- ステータスバッジ ---

Then(/^バンドルカード「([^」]+)」にステータスバッジ「([^」]+)」が表示されている$/, async ({ page }, bundleName: string, statusLabel: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const badge = await adapter.getBundleStatusBadgeText(bundleName);
    expect(badge).toBe(statusLabel);
  }).toPass({ timeout: 10_000 });
});

// --- 新規作成 (F-03-04-002) ---

When('「+ 新規バンドル作成」ボタンをクリックする', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.clickCreateButton();
});

Then('「+ 新規バンドル作成」ボタンが表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isCreateButtonVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^「(バンドル作成|バンドル編集)」フォームが表示される$/, async ({ page }, formTitle: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const title = await adapter.getFormTitle();
    expect(title).toBe(formTitle);
  }).toPass({ timeout: 5_000 });
});

Then('バンドル名が空である', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  const value = await adapter.getBundleNameInputValue();
  expect(value).toBe('');
});

Then(/^ステータスが「([^」]+)」に設定されている$/, async ({ page }, statusLabel: string) => {
  const adapter = createBundleManagementAdapter(page);
  const value = await adapter.getStatusSelectValue();
  expect(value).toBe(statusLabel);
});

Then('構成製品テーブルが空である', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  expect(await adapter.getBundleItemCount()).toBe(0);
});

Then('「上の検索欄から製品を追加してください」メッセージが表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  expect(await adapter.isNoItemsMessageVisible()).toBe(true);
  const msg = await adapter.getNoItemsMessage();
  expect(msg).toContain('上の検索欄から製品を追加してください');
});

Then('バンドル一覧が非表示である', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  expect(await adapter.isBundleListHidden()).toBe(true);
});

Then('バンドル一覧が表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isBundleListVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- フォーム入力 ---

When(/^バンドル名に「([^」]+)」を入力する$/, async ({ page }, name: string) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillBundleName(name);
});

When(/^バンドル名を「([^」]+)」に変更する$/, async ({ page }, name: string) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillBundleName(name);
});

When(/^ステータスを「([^」]+)」に変更する$/, async ({ page }, status: string) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.selectStatus(status);
});

// --- 製品検索・追加 ---

When('製品検索欄で製品を検索して追加する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillProductSearch('a');
  await expect(async () => {
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
  await adapter.clickSearchResult(0);
});

When('製品検索欄にキーワードを入力する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillProductSearch('Think');
});

When('同じ製品を再度検索して追加する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillProductSearch('a');
  await expect(async () => {
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
  await adapter.clickSearchResult(0);
});

When('製品検索欄で製品を2件追加する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillProductSearch('a');
  await expect(async () => {
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(1);
  }).toPass({ timeout: 5_000 });
  await adapter.clickSearchResult(0);
  await adapter.fillProductSearch('b');
  await expect(async () => {
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
  await adapter.clickSearchResult(0);
});

When('製品検索欄で別の製品を検索して追加する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.fillProductSearch('b');
  await expect(async () => {
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
  await adapter.clickSearchResult(0);
});

Then('検索ドロップダウンに候補が最大10件表示される', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isSearchDropdownVisible()).toBe(true);
    const count = await adapter.getSearchResultCount();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(10);
  }).toPass({ timeout: 5_000 });
});

Then('候補にSKU・製品名・単価が表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  const texts = await adapter.getSearchResultTexts();
  expect(texts.length).toBeGreaterThan(0);
  for (const text of texts) {
    expect(text.split(' ').length).toBeGreaterThanOrEqual(3);
  }
});

Then('構成製品テーブルに追加された製品が表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getBundleItemCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^追加された製品の数量が(\d+)である$/, async ({ page }, expectedQty: number) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const qty = await adapter.getBundleItemQuantity(0);
    expect(Number(qty)).toBe(expectedQty);
  }).toPass({ timeout: 5_000 });
});

Then('価格計算エリアが表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isPriceCalculationVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 数量・割引変更 ---

When('構成製品の数量を変更する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  lastTotalPriceBefore = await adapter.getCalculatedTotalPrice();
  lastBundlePriceBefore = await adapter.getCalculatedBundlePrice();
  await adapter.setBundleItemQuantity(0, '3');
});

When('割引率を変更する', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  lastDiscountAmountBefore = await adapter.getCalculatedDiscountAmount();
  lastBundlePriceBefore = await adapter.getCalculatedBundlePrice();
  await adapter.fillDiscountPercentage('10');
});

Then('合計・割引額・バンドル価格が再計算されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const totalPrice = await adapter.getCalculatedTotalPrice();
    const bundlePrice = await adapter.getCalculatedBundlePrice();
    expect(totalPrice !== lastTotalPriceBefore || bundlePrice !== lastBundlePriceBefore).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('割引額・バンドル価格が再計算されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const discountAmount = await adapter.getCalculatedDiscountAmount();
    const bundlePrice = await adapter.getCalculatedBundlePrice();
    expect(discountAmount !== lastDiscountAmountBefore || bundlePrice !== lastBundlePriceBefore).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 構成製品テーブル操作 ---

When('構成製品テーブルの1行目の削除ボタンをクリックする', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  lastTotalPriceBefore = await adapter.isPriceCalculationVisible() ? await adapter.getCalculatedTotalPrice() : '';
  lastBundlePriceBefore = await adapter.isPriceCalculationVisible() ? await adapter.getCalculatedBundlePrice() : '';
  await adapter.clickRemoveBundleItem(0);
});

Then(/^構成製品テーブルが(\d+)件になっている$/, async ({ page }, expectedCount: number) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getBundleItemCount();
    expect(count).toBe(expectedCount);
  }).toPass({ timeout: 5_000 });
});

Then(/^バンドル一覧に「([^」]+)」が表示されている$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isBundleCardVisible(bundleName)).toBe(true);
  }).toPass({ timeout: 10_000 });
});

Then(/^バンドル一覧に「([^」]+)」が表示されていない$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isBundleCardVisible(bundleName)).toBe(false);
  }).toPass({ timeout: 10_000 });
});

// --- バリデーション ---

Then('作成フォームが表示されたままである', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  expect(await adapter.isFormVisible()).toBe(true);
});

// --- 編集 (F-03-04-005) ---

When(/^バンドルカード「([^」]+)」の「編集」ボタンをクリックする$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.clickEditButton(bundleName);
});

Then(/^バンドル名に「([^」]+)」がプリセットされている$/, async ({ page }, expectedName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const value = await adapter.getBundleNameInputValue();
    expect(value).toBe(expectedName);
  }).toPass({ timeout: 5_000 });
});

Then('構成製品テーブルに既存の構成製品が表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getBundleItemCount();
    expect(count).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- 削除 (F-03-04-006) ---

When(/^バンドルカード「([^」]+)」の「削除」ボタンをクリックする$/, async ({ page }, bundleName: string) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.clickDeleteButton(bundleName);
});

Then('確認ダイアログが表示される', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isConfirmDialogVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^確認メッセージに「([^」]+)」が含まれている$/, async ({ page }, expectedText: string) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    const msg = await adapter.getConfirmDialogMessage();
    expect(msg).toContain(expectedText);
  }).toPass({ timeout: 5_000 });
});

When('確認ダイアログの「削除する」ボタンをクリックする', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.clickDialogConfirmButton();
});

When('確認ダイアログの「キャンセル」ボタンをクリックする', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await adapter.clickDialogCancelButton();
});

// --- 権限 ---

Then('バンドルカードに「削除」ボタンが表示されている', async ({ page }) => {
  const adapter = createBundleManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isDeleteButtonVisibleOnCard()).toBe(true);
  }).toPass({ timeout: 5_000 });
});
