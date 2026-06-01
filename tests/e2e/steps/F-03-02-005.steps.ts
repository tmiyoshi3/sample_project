import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- Tab state ---

Then('基本情報タブが選択されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const activeTab = await adapter.getActiveTabName();
    expect(activeTab).toBe('基本情報');
  }).toPass({ timeout: 5_000 });
});

Given(/^「(.+)」タブをクリックしている$/, async ({ page }, tabName: string) => {
  const adapter = createProductDetailAdapter(page);
  await adapter.clickTab(tabName);
});

// --- 基本属性セクション (F-03-02-005) ---

Then(/^製品名「(.+)」が基本情報に表示されている$/, async ({ page }, expectedName: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const name = await adapter.getBasicInfoProductName();
    expect(name).toBe(expectedName);
  }).toPass({ timeout: 5_000 });
});

Then('SKUが基本情報に表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const sku = await adapter.getBasicInfoSku();
    expect(sku.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then('説明が基本情報に表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const description = await adapter.getBasicInfoDescription();
    expect(description.length).toBeGreaterThan(0);
    expect(description).not.toBe('-');
  }).toPass({ timeout: 5_000 });
});

Then(/^説明「(.+)」が基本情報に表示されている$/, async ({ page }, expectedDesc: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const description = await adapter.getBasicInfoDescription();
    expect(description).toBe(expectedDesc);
  }).toPass({ timeout: 5_000 });
});

Then(/^カテゴリ「(.+)」が基本情報に表示されている$/, async ({ page }, expectedCategory: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const category = await adapter.getBasicInfoCategory();
    expect(category).toBe(expectedCategory);
  }).toPass({ timeout: 5_000 });
});

Then(/^メーカー「(.+)」が基本情報に表示されている$/, async ({ page }, expectedManufacturer: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const manufacturer = await adapter.getBasicInfoManufacturer();
    expect(manufacturer).toBe(expectedManufacturer);
  }).toPass({ timeout: 5_000 });
});

Then(/^ステータス「(.+)」が基本情報に表示されている$/, async ({ page }, expectedStatus: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const status = await adapter.getBasicInfoStatus();
    expect(status).toBe(expectedStatus);
  }).toPass({ timeout: 5_000 });
});

// --- 価格・数量セクション (F-03-02-006) ---

Then(/^単価「(.+)」が表示されている$/, async ({ page }, expectedPrice: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const price = await adapter.getUnitPrice();
    expect(price).toBe(expectedPrice);
  }).toPass({ timeout: 5_000 });
});

Then('単位が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const unit = await adapter.getUnit();
    expect(unit).toBeDefined();
  }).toPass({ timeout: 5_000 });
});

Then('最低発注数が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const qty = await adapter.getMinOrderQuantity();
    expect(qty).toBeDefined();
  }).toPass({ timeout: 5_000 });
});

Then('リードタイムが表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const leadTime = await adapter.getLeadTime();
    expect(leadTime).toBeDefined();
  }).toPass({ timeout: 5_000 });
});

// --- 物理情報セクション (F-03-02-007) ---

Then(/^重量「(.+)」が表示されている$/, async ({ page }, expectedWeight: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const weight = await adapter.getWeight();
    expect(weight).toBe(expectedWeight);
  }).toPass({ timeout: 5_000 });
});

Then(/^寸法「(.+)」が表示されている$/, async ({ page }, expectedDimensions: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const dimensions = await adapter.getDimensions();
    expect(dimensions).toBe(expectedDimensions);
  }).toPass({ timeout: 5_000 });
});

// --- 在庫状況セクション (F-03-02-008) ---

Then(/^合計在庫「(.+)」が表示されている$/, async ({ page }, expectedStock: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const stock = await adapter.getTotalStock();
    expect(stock).toBe(expectedStock);
  }).toPass({ timeout: 5_000 });
});

Then(/^予約済み「(.+)」が表示されている$/, async ({ page }, expectedReserved: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const reserved = await adapter.getTotalReserved();
    expect(reserved).toBe(expectedReserved);
  }).toPass({ timeout: 5_000 });
});

Then(/^利用可能「(.+)」が表示されている$/, async ({ page }, expectedAvailable: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const available = await adapter.getTotalAvailable();
    expect(available).toBe(expectedAvailable);
  }).toPass({ timeout: 5_000 });
});

Then('合計在庫に0以外の値が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const stock = await adapter.getTotalStock();
    expect(Number(stock)).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- 管理情報セクション (F-03-02-009) ---

Then('登録日が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const createdAt = await adapter.getCreatedAt();
    expect(createdAt).toBeDefined();
    expect(createdAt.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then('最終更新日が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const updatedAt = await adapter.getUpdatedAt();
    expect(updatedAt).toBeDefined();
    expect(updatedAt.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then('備考が表示されている', async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const notes = await adapter.getNotes();
    expect(notes).toBeDefined();
    expect(notes.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- データ状態: 説明未設定の製品 ---

When('説明が未設定の製品の製品詳細画面にアクセスする', async ({ page, request }) => {
  const sku = `TEST-NODESC-${Date.now()}`;
  const response = await request.post('/api/products', {
    data: {
      skuCode: sku,
      name: `テスト説明なし製品 ${sku}`,
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
  const adapter = createProductDetailAdapter(page);
  await adapter.navigateToProductDetail(String(body.id));
  await adapter.waitForProductDetailLoad();
});
