import { createBdd, DataTable } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createNavigationAdapter, createDashboardAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

const SCREEN_URL_MAP: Record<string, string> = {
  'ダッシュボード': '/dashboard',
  '製品カタログ': '/products',
  'サプライヤー': '/suppliers',
  '調達管理': '/procurement',
  '在庫管理': '/inventory',
  '倉庫管理': '/warehouses',
  '価格管理': '/pricing',
  'レポート': '/reports',
  '管理者設定': '/admin',
  'インポート/エクスポート': '/import-export',
};

// --- Sidebar navigation ---

Then('サイドナビゲーションに以下のメニューが表示されている:', async ({ page }, dataTable: DataTable) => {
  const adapter = createNavigationAdapter(page);
  const expectedMenus = dataTable.rows().map((row: string[]) => row[0]);
  const labels = await adapter.getMenuLabels();
  for (const menu of expectedMenus) {
    expect(labels).toContain(menu);
  }
});

When('サイドナビゲーションの {string} をクリックする', async ({ page }, menuName: string) => {
  const adapter = createNavigationAdapter(page);
  await adapter.clickMenuItem(menuName);
});

Then('{string} 画面が表示される', async ({ page }, screenName: string) => {
  const url = SCREEN_URL_MAP[screenName];
  if (!url) throw new Error(`画面名に対応するURLが定義されていません: ${screenName}`);
  await expect(page).toHaveURL(new RegExp(url.replace('/', '\\/')), { timeout: 15_000 });
});

Then('サイドナビゲーションの {string} がアクティブ状態である', async ({ page }, menuName: string) => {
  const adapter = createNavigationAdapter(page);
  await expect(async () => {
    expect(await adapter.isMenuItemActive(menuName)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// 'ダッシュボード画面が表示されている' は F-02-01-001.steps.ts で定義済み

Then('サイドナビゲーションに10個のメニューが表示されている', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  expect(await adapter.getMenuItemCount()).toBe(10);
});

// --- Menu toggle ---

Given('サイドナビゲーションが展開状態である', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  if (await adapter.isSidebarCollapsed()) {
    await adapter.clickMenuToggle();
  }
  expect(await adapter.isSidebarExpanded()).toBe(true);
});

Given('サイドナビゲーションが折りたたみ状態である', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  if (await adapter.isSidebarExpanded()) {
    await adapter.clickMenuToggle();
  }
  expect(await adapter.isSidebarCollapsed()).toBe(true);
});

When('メニュー切替ボタンをクリックする', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  await adapter.clickMenuToggle();
});

Then('サイドナビゲーションが折りたたみ状態になる', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  expect(await adapter.isSidebarCollapsed()).toBe(true);
});

Then('サイドナビゲーションにアイコンのみが表示される', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  expect(await adapter.areIconsVisible()).toBe(true);
  expect(await adapter.areLabelsVisible()).toBe(false);
});

Then('サイドナビゲーションが展開状態になる', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  expect(await adapter.isSidebarExpanded()).toBe(true);
});

Then('サイドナビゲーションにアイコンとラベルが表示される', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  expect(await adapter.areIconsVisible()).toBe(true);
  expect(await adapter.areLabelsVisible()).toBe(true);
});

// --- Global search ---

When('グローバル検索に {string} と入力する', async ({ page }, keyword: string) => {
  const adapter = createNavigationAdapter(page);
  await adapter.fillSearchKeyword(keyword);
});

When('検索を実行する', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  await adapter.clickSearchButton();
});

Then('調達管理画面が表示される', async ({ page }) => {
  await expect(page).toHaveURL(/\/procurement/, { timeout: 15_000 });
});

Then('サプライヤー画面が表示される', async ({ page }) => {
  await expect(page).toHaveURL(/\/suppliers/, { timeout: 15_000 });
});

Then('製品カタログ画面が表示される', async ({ page }) => {
  await expect(page).toHaveURL(/\/products/, { timeout: 15_000 });
});

Then('グローバル検索ボックスが空である', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  await expect(async () => {
    expect(await adapter.getSearchInputValue()).toBe('');
  }).toPass({ timeout: 5_000 });
});

When('グローバル検索に何も入力せずに検索を実行する', async ({ page }) => {
  const adapter = createNavigationAdapter(page);
  await adapter.fillSearchKeyword('');
  await adapter.clickSearchButton();
});

Then('ダッシュボード画面が表示されたままである', async ({ page }) => {
  expect(page.url()).toContain('/dashboard');
});
