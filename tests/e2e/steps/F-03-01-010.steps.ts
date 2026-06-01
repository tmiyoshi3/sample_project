import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductListAdapter } from '../adapters/factory.js';

const { Given, When, Then } = createBdd();

// --- CSV出力 ---

When('CSV出力ボタンをクリックする', async ({ page }) => {
  const downloadPromise = page.waitForEvent('download', { timeout: 15_000 });
  const adapter = createProductListAdapter(page);
  await adapter.clickCsvExportButton();
  const download = await downloadPromise;
  // Store download info in page context for later assertions
  (page as any).__lastDownload = download;
  (page as any).__lastDownloadContent = (await download.createReadStream().then(
    stream => new Promise<string>((resolve) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    })
  ));
});

Then('{string} で始まるCSVファイルがダウンロードされる', async ({ page }, prefix: string) => {
  const download = (page as any).__lastDownload;
  expect(download).toBeDefined();
  const filename = download.suggestedFilename();
  expect(filename.startsWith(prefix)).toBe(true);
});

Then('ダウンロードされたCSVファイル名が {string} 形式である', async ({ page }, pattern: string) => {
  const download = (page as any).__lastDownload;
  expect(download).toBeDefined();
  const filename = download.suggestedFilename();
  expect(filename).toMatch(/^products_\d{4}-\d{2}-\d{2}\.csv$/);
});

Then('ダウンロードされたCSVのヘッダ行に {string} が含まれている', async ({ page }, headerName: string) => {
  const content: string = (page as any).__lastDownloadContent;
  expect(content).toBeDefined();
  const headerLine = content.split('\n')[0];
  expect(headerLine).toContain(headerName);
});

Then('ダウンロードされたCSVにデータ行が1件以上含まれている', async ({ page }) => {
  const content: string = (page as any).__lastDownloadContent;
  expect(content).toBeDefined();
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  expect(lines.length).toBeGreaterThan(1);
});

Then('ダウンロードされたCSVにフィルタ適用前と同じ件数のデータ行が含まれている', async ({ page }) => {
  const content: string = (page as any).__lastDownloadContent;
  expect(content).toBeDefined();
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  // ヘッダ行を除いたデータ行が100件（全件）
  const dataRowCount = lines.length - 1;
  expect(dataRowCount).toBe(100);
});

Then('CSVファイルがダウンロードされる', async ({ page }) => {
  const download = (page as any).__lastDownload;
  expect(download).toBeDefined();
  const filename = download.suggestedFilename();
  expect(filename.endsWith('.csv')).toBe(true);
});
