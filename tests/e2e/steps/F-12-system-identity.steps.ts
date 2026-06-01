import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createSystemIdentityAdapter, createNavigationAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

Then('ヘッダーにシステム名 {string} が表示されている', async ({ page }, expectedName: string) => {
  const adapter = createSystemIdentityAdapter(page);
  expect(await adapter.getSystemName()).toBe(expectedName);
});

Then('ヘッダーにサブタイトル {string} が表示されている', async ({ page }, expectedSubtitle: string) => {
  const adapter = createSystemIdentityAdapter(page);
  expect(await adapter.getSubtitle()).toBe(expectedSubtitle);
});

Then('サイドナビゲーション下部にバージョン {string} が表示されている', async ({ page }, expectedVersion: string) => {
  const adapter = createSystemIdentityAdapter(page);
  expect(await adapter.isVersionVisible()).toBe(true);
  expect(await adapter.getVersionText()).toBe(expectedVersion);
});

Then('サイドナビゲーション下部にバージョンが表示されていない', async ({ page }) => {
  const adapter = createSystemIdentityAdapter(page);
  expect(await adapter.isVersionVisible()).toBe(false);
});

Then('フッターに {string} が表示されている', async ({ page }, expectedText: string) => {
  const adapter = createSystemIdentityAdapter(page);
  const footerText = await adapter.getFooterText();
  expect(footerText).toContain(expectedText);
});

Then('フッターにバージョン {string} が表示されている', async ({ page }, expectedVersion: string) => {
  const adapter = createSystemIdentityAdapter(page);
  const footerText = await adapter.getFooterText();
  expect(footerText).toContain(expectedVersion);
});

Then('フッターに現在の年のコピーライト表示がある', async ({ page }) => {
  const adapter = createSystemIdentityAdapter(page);
  const footerText = await adapter.getFooterText();
  const currentYear = new Date().getFullYear().toString();
  expect(footerText).toContain(`© ${currentYear}`);
});
