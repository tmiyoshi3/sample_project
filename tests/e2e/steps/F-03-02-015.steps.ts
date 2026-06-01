import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createProductDetailAdapter } from '../adapters/factory.js';

const { Then } = createBdd();

// --- 変更履歴タブ: タイムライン表示 ---

Then(/^変更履歴タイムラインに(\d+)件のエントリが表示されている$/, async ({ page }, count: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const entryCount = await adapter.getChangelogEntryCount();
    expect(entryCount).toBe(Number(count));
  }).toPass({ timeout: 5_000 });
});

// --- 変更履歴タブ: UPDATE詳細 ---

Then(/^変更履歴に変更種別「(.+)」が表示されている$/, async ({ page }, field: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const count = await adapter.getChangelogEntryCount();
    const fields: string[] = [];
    for (let i = 0; i < count; i++) {
      fields.push(await adapter.getChangelogField(i));
    }
    expect(fields).toContain(field);
  }).toPass({ timeout: 5_000 });
});

Then(/^変更履歴に旧値「(.+)」が表示されている$/, async ({ page }, value: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const oldValue = await adapter.getChangelogOldValue(0);
    expect(oldValue).toContain(value);
  }).toPass({ timeout: 5_000 });
});

Then(/^変更履歴に新値「(.+)」が表示されている$/, async ({ page }, value: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const newValue = await adapter.getChangelogNewValue(0);
    expect(newValue).toContain(value);
  }).toPass({ timeout: 5_000 });
});

Then(/^変更履歴に変更者「(.+)」が表示されている$/, async ({ page }, user: string) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const changedBy = await adapter.getChangelogUser(0);
    expect(changedBy).toContain(user);
  }).toPass({ timeout: 5_000 });
});

// --- 変更履歴タブ: 空状態 ---

Then(/^「変更履歴はありません」メッセージが表示されている$/, async ({ page }) => {
  const adapter = createProductDetailAdapter(page);
  await expect(async () => {
    const visible = await adapter.isChangelogEmptyMessageVisible();
    expect(visible).toBe(true);
    const message = await adapter.getChangelogEmptyMessage();
    expect(message).toContain('変更履歴はありません');
  }).toPass({ timeout: 5_000 });
});
