import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { request as pwRequest } from '@playwright/test';
import { createSupplierDetailAdapter } from '../adapters/factory.js';
import { DEFAULT_USER } from '../fixtures/users.js';

const { Given, When, Then, Before } = createBdd();

// --- Auth helper ---

async function getAuthHeaders(): Promise<Record<string, string>> {
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
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

function getBaseURL(): string {
  return process.env.TARGET_ENV === 'migrated' ? 'http://localhost:4201' : 'http://localhost:4200';
}

// --- State ---
let testSupplierId: number | null = null;
let productRowCountBefore = 0;
let contractRowCountBefore = 0;
let certCardCountBefore = 0;
let ratingSummaryBefore = '';

// --- Cleanup ---

Before({ tags: '@F-04-02-004' }, async () => {
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    const res = await ctx.get('/api/suppliers?page=0&size=100', { headers });
    if (res.ok()) {
      const data = await res.json();
      const suppliers = data.content || data;
      for (const s of suppliers) {
        if (s.code && s.code.startsWith('TEST-SUP')) {
          await ctx.delete(`/api/suppliers/${s.id}`, { headers }).catch(() => {});
        }
      }
    }
  } catch { /* ignore */ } finally {
    await ctx.dispose();
  }
  testSupplierId = null;
});

Before({ tags: '@F-04-02-010' }, async () => {
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    for (const supplierId of [1, 12]) {
      const res = await ctx.get(`/api/suppliers/${supplierId}/certifications`, { headers });
      if (res.ok()) {
        const certs = await res.json();
        for (const c of certs) {
          const certNum = c.certNumber || c.certificationNumber || '';
          if (certNum.startsWith('TEST-CERT')) {
            await ctx.delete(`/api/suppliers/${supplierId}/certifications/${c.id}`, { headers }).catch(() => {});
          }
        }
      }
    }
  } catch { /* ignore */ } finally {
    await ctx.dispose();
  }
});

Before({ tags: '@F-04-02-008' }, async () => {
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    for (const supplierId of [1, 12]) {
      const res = await ctx.get(`/api/suppliers/${supplierId}/contracts`, { headers });
      if (res.ok()) {
        const contracts = await res.json();
        for (const c of contracts) {
          if (c.contractNumber && c.contractNumber.startsWith('TEST-CNT')) {
            await ctx.delete(`/api/suppliers/${supplierId}/contracts/${c.id}`, { headers }).catch(() => {});
          }
        }
      }
    }
  } catch { /* ignore */ } finally {
    await ctx.dispose();
  }
});

// --- Navigation ---

Given(/^SD_サプライヤー詳細画面（ID=(\d+)）にアクセスしている$/, async ({ page }, id: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.navigateToSupplierDetail(Number(id));
});

When(/^SD_サプライヤー詳細画面（ID=(\d+)）にアクセスする$/, async ({ page }, id: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.navigateToSupplierDetail(Number(id));
});

Given('SD_連絡先0件のサプライヤー詳細画面にアクセスしている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.navigateToSupplierDetail(12);
});

Given('SD_テスト用サプライヤー（連絡先なし）が作成されている', async () => {
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    const res = await ctx.get('/api/suppliers?page=0&size=100', { headers });
    if (res.ok()) {
      const data = await res.json();
      const suppliers = data.content || data;
      const existing = suppliers.find((s: any) => s.code === 'TEST-SUP-NOCONTACT');
      if (existing) {
        testSupplierId = existing.id;
        return;
      }
    }
    const createRes = await ctx.post('/api/suppliers', {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { name: 'テスト連絡先なしサプライヤー', code: 'TEST-SUP-NOCONTACT', status: 'ACTIVE' },
    });
    if (createRes.ok()) {
      const body = await createRes.json();
      testSupplierId = body.id;
    }
  } finally {
    await ctx.dispose();
  }
});

Given('SD_テスト用サプライヤー詳細画面にアクセスしている', async ({ page }) => {
  if (!testSupplierId) throw new Error('テスト用サプライヤーが作成されていません');
  const adapter = createSupplierDetailAdapter(page);
  await adapter.navigateToSupplierDetail(testSupplierId);
});

Given('SD_テスト専用サプライヤー詳細画面にアクセスしている', async ({ page }) => {
  if (!testSupplierId) throw new Error('テスト専用サプライヤーが作成されていません');
  const adapter = createSupplierDetailAdapter(page);
  await adapter.navigateToSupplierDetail(testSupplierId);
});

// --- ヘッダ情報 ---

Then(/^SD_ページタイトル「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getPageTitle()).toContain(expected);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_会社名「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getSupplierName()).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_ステータスバッジ「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getStatusBadgeText()).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_コード「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getSupplierCode()).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_評価「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getRatingText()).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

// --- 基本情報タブ ---

Then('SD_基本情報タブが選択されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isTabActive('基本情報')).toBe(true);
});

Then('SD_会社情報セクションが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isCompanyInfoSectionVisible()).toBe(true);
});

Then(/^SD_会社情報「(.+?)」に「(.+?)」が表示されている$/, async ({ page }, field: string, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getCompanyInfoValue(field)).toBe(expected);
  }).toPass({ timeout: 5_000 });
});

// --- 連絡先 ---

Then('SD_連絡先セクションが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContactSectionVisible()).toBe(true);
});

Then(/^SD_連絡先カードが (\d+) 件表示されている$/, async ({ page }, count: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getContactCardCount()).toBe(Number(count));
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_連絡先「(.+?)」に主担当バッジが表示されている$/, async ({ page }, name: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContactPrimaryBadgeVisible(name)).toBe(true);
});

Then(/^SD_連絡先「(.+?)」の部署が「(.+?)」である$/, async ({ page }, name: string, dept: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.getContactDepartment(name)).toBe(dept);
});

Then(/^SD_連絡先「(.+?)」に電話番号が表示されている$/, async ({ page }, name: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContactPhoneVisible(name)).toBe(true);
});

Then(/^SD_連絡先「(.+?)」にメールアドレスが表示されている$/, async ({ page }, name: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContactEmailVisible(name)).toBe(true);
});

Then(/^SD_連絡先「(.+?)」に主担当バッジが表示されていない$/, async ({ page }, name: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContactPrimaryBadgeVisible(name)).toBe(false);
});

Then('SD_連絡先空状態メッセージが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContactEmptyMessageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- タブ ---

When(/^SD_「(.+?)」タブをクリックする$/, async ({ page }, tabName: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickTab(tabName);
});

Given(/^SD_「(.+?)」タブをクリックしている$/, async ({ page }, tabName: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickTab(tabName);
});

Then('SD_タブコンテンツが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isTabContentVisible('')).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- ナビゲーション ---

When('SD_「← 一覧に戻る」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickBackToListButton();
});

Then('SD_サプライヤー一覧画面に遷移している', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/suppliers\/?$/);
  }).toPass({ timeout: 5_000 });
});

When('SD_「編集」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickEditButton();
});

Then('SD_サプライヤー編集画面に遷移している', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/suppliers\/\d+\/edit/);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「← 一覧に戻る」ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isBackToListButtonVisible()).toBe(true);
});

Then('SD_「編集」ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isEditButtonVisible()).toBe(true);
});

// --- 削除 ---

When('SD_「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickDeleteButton();
});

Then('SD_確認ダイアログが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isConfirmDialogVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_ダイアログタイトル「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.getConfirmDialogTitle()).toBe(expected);
});

Then('SD_ダイアログメッセージに削除警告が表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  const msg = await adapter.getConfirmDialogMessage();
  expect(msg).toContain('削除');
});

Then('SD_ダイアログ「キャンセル」ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isDialogCancelButtonVisible()).toBe(true);
});

Then('SD_ダイアログ「削除する」ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isDialogConfirmButtonVisible()).toBe(true);
});

Then('SD_「削除」ボタンが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isDeleteButtonVisible()).toBe(true);
});

Given('SD_テスト専用サプライヤーが作成されている', async () => {
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    const res = await ctx.post('/api/suppliers', {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { name: 'テスト削除用サプライヤー', code: 'TEST-SUP-DEL', status: 'ACTIVE' },
    });
    if (res.ok()) {
      const body = await res.json();
      testSupplierId = body.id;
    } else {
      const all = await ctx.get('/api/suppliers?page=0&size=100', { headers });
      if (all.ok()) {
        const data = await all.json();
        const suppliers = data.content || data;
        const found = suppliers.find((s: any) => s.code === 'TEST-SUP-DEL');
        if (found) testSupplierId = found.id;
      }
    }
  } finally {
    await ctx.dispose();
  }
});

When('SD_ダイアログ「削除する」をクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickDialogConfirmButton();
});

When('SD_ダイアログ「キャンセル」をクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickDialogCancelButton();
});

Then('SD_確認ダイアログが閉じている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isConfirmDialogVisible()).toBe(false);
  }).toPass({ timeout: 5_000 });
});

Then('SD_サプライヤー詳細画面が表示されている', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/suppliers\/\d+/);
  }).toPass({ timeout: 5_000 });
});

// --- 製品タブ ---

Then('SD_製品テーブルが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isProductTableVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_製品テーブルに (\d+) 件の行がある$/, async ({ page }, count: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getProductRowCount()).toBe(Number(count));
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_製品テーブルに「(.+?)」列がある$/, async ({ page }, col: string) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isProductColumnVisible(col)).toBe(true);
});

When('SD_製品テーブル先頭行の「詳細」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickProductDetailButton(0);
});

Then('SD_製品詳細画面に遷移している', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toMatch(/\/products\/\d+/);
  }).toPass({ timeout: 5_000 });
});

Given('SD_テスト用製品紐付けを追加している', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  productRowCountBefore = await adapter.getProductRowCount();
  const headers = await getAuthHeaders();
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    await ctx.post('/api/suppliers/12/products', {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { productId: 1, supplierSku: 'TEST-SKU', unitCost: 100, leadTimeDays: 5, minOrderQty: 1, isPreferred: false },
    });
  } finally {
    await ctx.dispose();
  }
  await page.reload();
  await adapter.waitForSupplierDetailLoad();
  await adapter.clickTab('製品');
});

When('SD_追加した製品の「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  const count = await adapter.getProductRowCount();
  await adapter.clickProductDeleteButton(count - 1);
});

Then('SD_製品テーブルから該当行が削除されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getProductRowCount()).toBe(productRowCountBefore);
  }).toPass({ timeout: 5_000 });
});

When('SD_製品テーブル先頭行の「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  productRowCountBefore = await adapter.getProductRowCount();
  await adapter.clickProductDeleteButton(0);
});

Then('SD_製品テーブルの行数が変わっていない', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getProductRowCount()).toBe(productRowCountBefore);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「取扱製品はありません」と表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isProductEmptyMessageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 契約タブ ---

Then('SD_契約テーブルが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContractTableVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_契約テーブルに「(.+?)」がある$/, async ({ page }, contractNo: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContractRowVisible(contractNo)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_契約テーブルにステータス「(.+?)」がある$/, async ({ page }, expected: string) => {
  const body = await page.locator('.tab-panel .data-table').textContent() ?? '';
  expect(body).toContain(expected);
});

When('SD_「+ 新規契約」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickNewContractButton();
});

Then('SD_契約モーダルが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContractModalVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

When(/^SD_契約番号に「(.+?)」を入力する$/, async ({ page }, value: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.fillContractNumber(value);
});

When(/^SD_契約名に「(.+?)」を入力する$/, async ({ page }, value: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.fillContractTitle(value);
});

When('SD_契約開始日を入力する', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.fillContractStartDate('2026-01-01');
});

When('SD_契約終了日を入力する', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.fillContractEndDate('2027-12-31');
});

When(/^SD_契約ステータスに「(.+?)」を選択する$/, async ({ page }, label: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.selectContractStatus(label);
});

When('SD_モーダル保存ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  if (await adapter.isContractModalVisible()) {
    await adapter.clickContractSaveButton();
  } else if (await adapter.isRatingModalVisible()) {
    await adapter.clickRatingSaveButton();
  } else if (await adapter.isCertModalVisible()) {
    await adapter.clickCertSaveButton();
  }
});

Given(/^SD_テスト用契約「(.+?)」が作成されている$/, async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  const headers = await getAuthHeaders();
  const supplierId = page.url().match(/\/suppliers\/(\d+)/)?.[1];
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    await ctx.post(`/api/suppliers/${supplierId}/contracts`, {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { contractNumber: 'TEST-CNT-001', title: 'テスト契約', startDate: '2026-01-01', endDate: '2027-12-31', status: 'DRAFT', terms: '' },
    });
  } finally {
    await ctx.dispose();
  }
  await page.reload();
  await adapter.waitForSupplierDetailLoad();
  await adapter.clickTab('契約');
});

When('SD_テスト用契約の「編集」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickContractEditButton('TEST-CNT-001');
});

Then('SD_契約モーダルに既存値がセットされている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  expect(await adapter.isContractFormPrefilled()).toBe(true);
});

When(/^SD_契約名を「(.+?)」に変更する$/, async ({ page }, newTitle: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.updateContractTitle(newTitle);
});

When(/^SD_契約条件を「(.+?)」に変更する$/, async ({ page }, newTerms: string) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /契約/ }) });
  const group = modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: '条件' }) });
  await group.locator('textarea').fill(newTerms);
});

Then(/^SD_契約テーブルに「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel .data-table').textContent() ?? '';
    expect(body).toContain(expected);
  }).toPass({ timeout: 5_000 });
});

Then('SD_契約テーブルに更新内容が反映されている', async ({ page }) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel .data-table').textContent() ?? '';
    expect(body).toContain('テスト契約（更新）');
  }).toPass({ timeout: 5_000 });
});

When('SD_テスト用契約の「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await adapter.clickContractDeleteButton('TEST-CNT-001');
});

Then(/^SD_契約テーブルから「(.+?)」が削除されている$/, async ({ page }, contractNo: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContractRowVisible(contractNo)).toBe(false);
  }).toPass({ timeout: 5_000 });
});

When('SD_契約テーブル先頭行の「削除」ボタンをクリックする', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  contractRowCountBefore = await adapter.getContractRowCount();
  const firstContractNo = (await page.locator('.tab-panel .data-table tbody tr').first().locator('td.mono').textContent() ?? '').trim();
  await adapter.clickContractDeleteButton(firstContractNo);
});

Then('SD_契約テーブルの行数が変わっていない', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getContractRowCount()).toBe(contractRowCountBefore);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「契約はありません」と表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isContractEmptyMessageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 評価履歴タブ ---

Then('SD_平均評価サマリーが表示されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.isRatingSummaryVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_評価件数「(.+?)」が表示されている$/, async ({ page }, expected: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getRatingCountText()).toContain(expected);
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_評価エントリが (\d+) 件表示されている$/, async ({ page }, count: string) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    expect(await adapter.getRatingEntryCount()).toBe(Number(count));
  }).toPass({ timeout: 5_000 });
});

Then('SD_品質スコアバーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isQualityBarVisible()).toBe(true);
});

Then('SD_納期スコアバーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isDeliveryBarVisible()).toBe(true);
});

Then('SD_価格スコアバーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isPriceBarVisible()).toBe(true);
});

Then('SD_対応スコアバーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isServiceBarVisible()).toBe(true);
});

Then('SD_評価コメントが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isRatingCommentVisible()).toBe(true);
});

Then('SD_評価者が表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isRatingEvaluatorVisible()).toBe(true);
});

When('SD_「+ 新規評価」ボタンをクリックする', async ({ page }) => {
  await createSupplierDetailAdapter(page).clickNewRatingButton();
});

Then('SD_評価モーダルが表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).isRatingModalVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('SD_品質スライダーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isQualitySliderVisible()).toBe(true);
});

Then('SD_納期スライダーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isDeliverySliderVisible()).toBe(true);
});

Then('SD_価格スライダーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isPriceSliderVisible()).toBe(true);
});

Then('SD_対応スライダーが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isServiceSliderVisible()).toBe(true);
});

When(/^SD_品質スコアに「(.+?)」を設定する$/, async ({ page }, v: string) => {
  await createSupplierDetailAdapter(page).setQualityScore(v);
});

When(/^SD_納期スコアに「(.+?)」を設定する$/, async ({ page }, v: string) => {
  await createSupplierDetailAdapter(page).setDeliveryScore(v);
});

When(/^SD_価格スコアに「(.+?)」を設定する$/, async ({ page }, v: string) => {
  await createSupplierDetailAdapter(page).setPriceScore(v);
});

When(/^SD_対応スコアに「(.+?)」を設定する$/, async ({ page }, v: string) => {
  await createSupplierDetailAdapter(page).setServiceScore(v);
});

When(/^SD_コメントに「(.+?)」を入力する$/, async ({ page }, text: string) => {
  await createSupplierDetailAdapter(page).fillRatingComment(text);
});

Then('SD_評価リストに新しいエントリが追加されている', async ({ page }) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel').textContent() ?? '';
    expect(body).toContain('TEST-RATING');
  }).toPass({ timeout: 5_000 });
});

Given('SD_新規評価を追加している', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  ratingSummaryBefore = await adapter.getRatingSummaryText();
  await adapter.clickNewRatingButton();
  await adapter.setQualityScore('4');
  await adapter.setDeliveryScore('3.5');
  await adapter.setPriceScore('4.5');
  await adapter.setServiceScore('4');
  await adapter.fillRatingComment('TEST-RATING-SUMMARY');
  await adapter.clickRatingSaveButton();
});

Then('SD_平均評価サマリーが更新されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  await expect(async () => {
    const current = await adapter.getRatingSummaryText();
    expect(current).not.toBe(ratingSummaryBefore);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「評価履歴はありません」と表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).isRatingEmptyMessageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「+ 新規評価」ボタンが表示されている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isNewRatingButtonVisible()).toBe(true);
});

// --- 認証タブ ---

Then(/^SD_認証カードが (\d+) 件表示されている$/, async ({ page }, count: string) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).getCertCardCount()).toBe(Number(count));
  }).toPass({ timeout: 5_000 });
});

Then(/^SD_認証カード「(.+?)」が表示されている$/, async ({ page }, certName: string) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).isCertCardVisible(certName)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('SD_認証カードが表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).getCertCardCount()).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then('SD_認証カードにステータスが表示されている', async ({ page }) => {
  const text = await page.locator('.cert-card').first().locator('.cert-status').textContent() ?? '';
  expect(text.trim().length).toBeGreaterThan(0);
});

Then('SD_認証カードに認証番号が表示されている', async ({ page }) => {
  const text = await page.locator('.cert-card').first().locator('.cert-details').textContent() ?? '';
  expect(text).toContain('認証番号');
});

Then('SD_認証カードに発行日が表示されている', async ({ page }) => {
  const text = await page.locator('.cert-card').first().locator('.cert-details').textContent() ?? '';
  expect(text).toContain('発行日');
});

Then('SD_認証カードに有効期限が表示されている', async ({ page }) => {
  const text = await page.locator('.cert-card').first().locator('.cert-details').textContent() ?? '';
  expect(text).toContain('有効期限');
});

When('SD_「+ 新規認証」ボタンをクリックする', async ({ page }) => {
  await createSupplierDetailAdapter(page).clickNewCertButton();
});

Then('SD_認証モーダルが表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).isCertModalVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

When(/^SD_認証種別に「(.+?)」を選択する$/, async ({ page }, type: string) => {
  await createSupplierDetailAdapter(page).selectCertType(type);
});

When(/^SD_認証番号に「(.+?)」を入力する$/, async ({ page }, value: string) => {
  await createSupplierDetailAdapter(page).fillCertNumber(value);
});

When('SD_認証発行日を入力する', async ({ page }) => {
  await createSupplierDetailAdapter(page).fillCertIssuedDate('2025-01-15');
});

When('SD_認証有効期限を入力する', async ({ page }) => {
  await createSupplierDetailAdapter(page).fillCertExpiryDate('2028-01-15');
});

When(/^SD_認証ステータスに「(.+?)」を選択する$/, async ({ page }, label: string) => {
  await createSupplierDetailAdapter(page).selectCertStatus(label);
});

Then('SD_認証カードリストに新しいカードが追加されている', async ({ page }) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel').textContent() ?? '';
    expect(body).toContain('TEST-CERT-001');
  }).toPass({ timeout: 5_000 });
});

Then('SD_認証カードリストに新しいカードが追加されていない', async ({ page }) => {
  await page.waitForTimeout(2000);
  const body = await page.locator('.tab-panel').textContent() ?? '';
  expect(body).not.toContain('TEST-CERT-001');
});

Then('SD_認証モーダルに種別セレクトがある', async ({ page }) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /認証/ }) });
  expect(await modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: '認証種別' }) }).locator('select').isVisible()).toBe(true);
});

Then('SD_認証モーダルに認証番号入力がある', async ({ page }) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /認証/ }) });
  expect(await modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: '認証番号' }) }).locator('input').isVisible()).toBe(true);
});

Then('SD_認証モーダルに発行日入力がある', async ({ page }) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /認証/ }) });
  expect(await modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: '発行日' }) }).locator('input').isVisible()).toBe(true);
});

Then('SD_認証モーダルに有効期限入力がある', async ({ page }) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /認証/ }) });
  expect(await modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: '有効期限' }) }).locator('input').isVisible()).toBe(true);
});

Then('SD_認証モーダルにステータスセレクトがある', async ({ page }) => {
  const modal = page.locator('.modal-overlay').filter({ has: page.locator('h3', { hasText: /認証/ }) });
  expect(await modal.locator('.rating-form-group').filter({ has: page.locator('label', { hasText: 'ステータス' }) }).locator('select').isVisible()).toBe(true);
});

Given('SD_テスト用認証がAPI経由で作成されている', async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  certCardCountBefore = await adapter.getCertCardCount();
  const headers = await getAuthHeaders();
  const supplierId = page.url().match(/\/suppliers\/(\d+)/)?.[1];
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    await ctx.post(`/api/suppliers/${supplierId}/certifications`, {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { certType: 'ISO_9001', certNumber: 'TEST-CERT-API', issuedDate: '2025-01-15', expiryDate: '2028-01-15', status: 'VALID' },
    });
  } finally {
    await ctx.dispose();
  }
  await page.reload();
  await adapter.waitForSupplierDetailLoad();
  await adapter.clickTab('認証');
});

Given(/^SD_テスト用認証「(.+?)」が作成されている$/, async ({ page }) => {
  const adapter = createSupplierDetailAdapter(page);
  certCardCountBefore = await adapter.getCertCardCount();
  const headers = await getAuthHeaders();
  const supplierId = page.url().match(/\/suppliers\/(\d+)/)?.[1];
  const ctx = await pwRequest.newContext({ baseURL: getBaseURL() });
  try {
    await ctx.post(`/api/suppliers/${supplierId}/certifications`, {
      headers: { ...headers, 'Content-Type': 'application/json' },
      data: { certType: 'ISO_9001', certNumber: 'TEST-CERT-001', issuedDate: '2025-01-15', expiryDate: '2028-01-15', status: 'ACTIVE' },
    });
  } finally {
    await ctx.dispose();
  }
  await page.reload();
  await adapter.waitForSupplierDetailLoad();
  await adapter.clickTab('認証');
});

When('SD_テスト用認証の「編集」ボタンをクリックする', async ({ page }) => {
  const certCards = page.locator('.cert-card');
  const count = await certCards.count();
  for (let i = 0; i < count; i++) {
    const text = await certCards.nth(i).textContent() ?? '';
    if (text.includes('TEST-CERT-API') || text.includes('TEST-CERT-001')) {
      await certCards.nth(i).locator('.btn-link').filter({ hasText: '編集' }).click();
      await page.waitForTimeout(300);
      return;
    }
  }
  throw new Error('テスト用認証カードが見つかりません');
});

Then('SD_認証モーダルに既存値がセットされている', async ({ page }) => {
  expect(await createSupplierDetailAdapter(page).isCertFormPrefilled()).toBe(true);
});

When('SD_認証有効期限を変更する', async ({ page }) => {
  await createSupplierDetailAdapter(page).updateCertExpiryDate('2029-06-30');
});

Then('SD_認証カードが更新されている', async ({ page }) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel').textContent() ?? '';
    expect(body).toContain('2029/06/30');
  }).toPass({ timeout: 5_000 });
});

When('SD_テスト用認証の「削除」ボタンをクリックする', async ({ page }) => {
  const certCards = page.locator('.cert-card');
  const count = await certCards.count();
  for (let i = 0; i < count; i++) {
    const text = await certCards.nth(i).textContent() ?? '';
    if (text.includes('TEST-CERT-API') || text.includes('TEST-CERT-001')) {
      await certCards.nth(i).locator('.btn-link').filter({ hasText: '削除' }).click();
      await page.waitForTimeout(300);
      return;
    }
  }
  throw new Error('テスト用認証カードが見つかりません');
});

Then(/^SD_認証カードリストから「(.+?)」が削除されている$/, async ({ page }, certNo: string) => {
  await expect(async () => {
    const body = await page.locator('.tab-panel').textContent() ?? '';
    expect(body).not.toContain(certNo);
  }).toPass({ timeout: 5_000 });
});

When('SD_先頭認証カードの「削除」ボタンをクリックする', async ({ page }) => {
  certCardCountBefore = await createSupplierDetailAdapter(page).getCertCardCount();
  await page.locator('.cert-card').first().locator('.btn-link').filter({ hasText: '削除' }).click();
  await page.waitForTimeout(300);
});

Then('SD_認証カードの数が変わっていない', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).getCertCardCount()).toBe(certCardCountBefore);
  }).toPass({ timeout: 5_000 });
});

Then('SD_「認証情報はありません」と表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await createSupplierDetailAdapter(page).isCertEmptyMessageVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});
