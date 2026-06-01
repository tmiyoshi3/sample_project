import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createDashboardAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- 在庫不足データありシナリオ (@skip) ---

Given('在庫不足の製品が存在する', async () => {
  test.skip(true, 'テスト環境に在庫不足データが存在しないため実施不可');
});

Given('在庫数が最低在庫数の50%以下の製品が存在する', async () => {
  test.skip(true, 'テスト環境に在庫不足データが存在しないため実施不可');
});

Given('在庫数が最低在庫数以下かつ50%超の製品が存在する', async () => {
  test.skip(true, 'テスト環境に在庫不足データが存在しないため実施不可');
});

// --- ナビゲーション ---

When('{string} カードをクリックする', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  await adapter.clickCard(cardTitle);
});

Then('在庫管理画面に遷移する', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toContain('/inventory');
  }).toPass({ timeout: 10_000 });
});

When('在庫アラートセクションの {string} リンクをクリックする', async ({ page }, _linkText: string) => {
  const adapter = createDashboardAdapter(page);
  await adapter.clickViewAllInventoryLink();
});

When('在庫アラートセクションの製品をクリックする', async () => {
  // @skip で到達しない
});

Then('該当製品の製品詳細画面に遷移する', async () => {
  // @skip で到達しない
});

// --- データ状態 (@skip) ---

Then('該当製品の在庫バーがcritical表示になっている', async () => {
  // @skip で到達しない
});

Then('該当製品の在庫バーがwarning表示になっている', async () => {
  // @skip で到達しない
});

Then('在庫アラートセクションに製品名が表示されている', async () => {
  // @skip で到達しない
});

Then('在庫アラートセクションに製品SKUが表示されている', async () => {
  // @skip で到達しない
});

Then('在庫アラートセクションに現在在庫数が表示されている', async () => {
  // @skip で到達しない
});

Then('在庫アラートセクションに最低在庫数が表示されている', async () => {
  // @skip で到達しない
});

Then('在庫アラートセクションに在庫バーが表示されている', async () => {
  // @skip で到達しない
});
