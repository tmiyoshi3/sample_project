import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Then } = createBdd();

// --- ドキュメントタブ: リスト表示 ---

Then(/^ドキュメントリストが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isDocumentListVisible();
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^ドキュメントリストにファイルタイプアイコンが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isDocumentIconVisible(0);
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^ドキュメントリストにドキュメント名が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const name = await adapter.getDocumentName(0);
    expect(name.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^ドキュメントリストにメタ情報が表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const meta = await adapter.getDocumentMeta(0);
    expect(meta.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

Then(/^ドキュメントリストに「ダウンロード」ボタンが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isDownloadButtonVisible(0);
    expect(visible).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- ドキュメントタブ: 空状態 ---

Then(/^「ドキュメントは登録されていません」メッセージが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isDocumentEmptyMessageVisible();
    expect(visible).toBe(true);
    const message = await adapter.getDocumentEmptyMessage();
    expect(message).toContain('ドキュメントは登録されていません');
  }).toPass({ timeout: 5_000 });
});
