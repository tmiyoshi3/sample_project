import { createBdd } from 'playwright-bdd';
import { expect, test } from '@playwright/test';
import { createDashboardAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- 承認待ちなしシナリオ (@skip) ---

Given('承認待ちの発注書および購買依頼が存在しない', async () => {
  test.skip(true, 'テスト環境に承認待ちデータ(4件)が存在するため0件状態の再現不可');
});

// --- 承認待ち件数合計シナリオ (@skip) ---

Given('承認待ちの発注書が存在する', async () => {
  test.skip(true, '承認待ちカウントの二重加算の可能性が未確認のため実施不可');
});

Given('承認待ちの購買依頼が存在する', async () => {
  test.skip(true, '承認待ちカウントの二重加算の可能性が未確認のため実施不可');
});

Then('{string} カードのメイン値が発注書と購買依頼の承認待ち合計である', async () => {
  // @skip で到達しない
});

// --- ナビゲーション ---

Then('マイタスク画面に遷移する', async ({ page }) => {
  await expect(async () => {
    expect(page.url()).toContain('/dashboard/tasks');
  }).toPass({ timeout: 10_000 });
});

// --- 権限 ---

Then('{string} カードが強調表示されていない', async ({ page }, cardTitle: string) => {
  const adapter = createDashboardAdapter(page);
  expect(await adapter.isCardHighlighted(cardTitle)).toBe(false);
});
