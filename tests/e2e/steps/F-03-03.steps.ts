import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { createCategoryManagementAdapter } from '../adapters/factory.js';

const { Given, When, Then, Before } = createBdd();

let testCategoryIds: number[] = [];

Before({ tags: '@F-03-03-002 or @F-03-03-005 or @F-03-03-006 or @F-03-03-007' }, async ({ request }) => {
  const response = await request.get('/api/products/categories');
  if (response.ok()) {
    const categories = await response.json();
    const testCats = categories
      .filter((c: any) => c.name && c.name.startsWith('TEST-CAT'))
      .sort((a: any, b: any) => (a.parentId === null ? 1 : 0) - (b.parentId === null ? 1 : 0));
    for (const cat of testCats) {
      await request.delete(`/api/products/categories/${cat.id}`).catch(() => {});
    }
  }
  testCategoryIds = [];
});

// --- Background / Navigation ---

Given('カテゴリ管理画面を表示する', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.navigateToCategoryManagement();
  await adapter.waitForCategoryManagementLoad();
});

Given(/^テスト用カテゴリ「(.+)」がルートカテゴリとして作成されている$/, async ({ request, page }, catName: string) => {
  const response = await request.post('/api/products/categories', {
    data: { name: catName, description: '', parentId: null },
  });
  expect(response.ok()).toBe(true);
  const body = await response.json();
  testCategoryIds.push(body.id);
  const adapter = createCategoryManagementAdapter(page);
  await adapter.reloadPage();
});

// --- ツリー表示 (F-03-03-001) ---

Then('カテゴリツリーが表示されている', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.isCategoryTreeVisible()).toBe(true);
});

Then('ルートカテゴリが{int}件表示されている', async ({ page }, expectedCount: number) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getRootCategoryCount();
    expect(count).toBe(expectedCount);
  }).toPass({ timeout: 5_000 });
});

Then('全ノードが展開状態である', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.isAllExpanded()).toBe(true);
});

Then(/^「([^」]+)」の子カテゴリとして「([^」]+)」「([^」]+)」「([^」]+)」が表示されている$/, async ({ page }, parentName: string, child1: string, child2: string, child3: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const children = await adapter.getChildCategoryNames(parentName);
    expect(children).toContain(child1);
    expect(children).toContain(child2);
    expect(children).toContain(child3);
  }).toPass({ timeout: 5_000 });
});

Then(/^「(.+)」の製品数が「(\d+)」と表示されている$/, async ({ page }, categoryName: string, expectedCount: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const count = await adapter.getProductCount(categoryName);
    expect(count).toBe(String(expectedCount));
  }).toPass({ timeout: 5_000 });
});

Then(/^「(.+)」に展開\/折りたたみアイコンが表示されていない$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.hasToggleIcon(categoryName)).toBe(false);
});

Then(/^「(.+)」に展開アイコンが表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.hasToggleIcon(categoryName)).toBe(true);
  expect(await adapter.isExpandedIcon(categoryName)).toBe(true);
});

// --- 折りたたみ (F-03-03-003) ---

When(/^「(.+)」の折りたたみアイコンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickToggleIcon(categoryName);
});

When(/^「(.+)」の展開アイコンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickToggleIcon(categoryName);
});

Given(/^「(.+)」を折りたたんでいる$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  if (await adapter.isExpandedIcon(categoryName)) {
    await adapter.clickToggleIcon(categoryName);
  }
});

Then(/^「(.+)」の子カテゴリが非表示になっている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.areChildrenVisible(categoryName)).toBe(false);
});

Then(/^「(.+)」の子カテゴリが表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.areChildrenVisible(categoryName)).toBe(true);
});

Then(/^「(.+)」に折りたたみアイコン（▶）が表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.hasToggleIcon(categoryName)).toBe(true);
  expect(await adapter.isExpandedIcon(categoryName)).toBe(false);
});

Then(/^「(.+)」に展開アイコン（▼）が表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.hasToggleIcon(categoryName)).toBe(true);
  expect(await adapter.isExpandedIcon(categoryName)).toBe(true);
});

// --- 作成 (F-03-03-002, F-03-03-005) ---

When('「+ 新規カテゴリ」ボタンをクリックする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickNewCategoryButton();
});

Then('「カテゴリ作成」フォームが表示される', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isCreateFormVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^親カテゴリが「(.+)」に設定されている$/, async ({ page }, parentName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const value = await adapter.getParentCategorySelectValue();
    expect(value).toContain(parentName);
  }).toPass({ timeout: 5_000 });
});

Then('カテゴリ名が空である', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  const value = await adapter.getCategoryNameInputValue();
  expect(value).toBe('');
});

Then('説明が空である', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  const value = await adapter.getDescriptionInputValue();
  expect(value).toBe('');
});

When(/^カテゴリ名に「(.+)」を入力する$/, async ({ page }, name: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.fillCategoryName(name);
});

When(/^説明に「(.+)」を入力する$/, async ({ page }, description: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.fillDescription(description);
});

When('「保存」ボタンをクリックする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickSaveButton();
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
});

When('「キャンセル」ボタンをクリックする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickFormCancelButton();
});

Then(/^成功メッセージ「(.+)」が表示される$/, async ({ page }, expectedMessage: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isSuccessMessageVisible()).toBe(true);
    const msg = await adapter.getSuccessMessage();
    expect(msg).toContain(expectedMessage);
  }).toPass({ timeout: 10_000 });
});

Then(/^カテゴリツリーに「(.+)」が表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isCategoryVisible(categoryName)).toBe(true);
  }).toPass({ timeout: 10_000 });
});

Then(/^カテゴリツリーに「(.+)」が表示されていない$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isCategoryVisible(categoryName)).toBe(false);
  }).toPass({ timeout: 10_000 });
});

When(/^「(.+)」の子カテゴリ追加ボタンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickAddChildButton(categoryName);
});

When(/^親カテゴリを「(.+)」に変更する$/, async ({ page }, parentName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.selectParentCategory(parentName);
});

Then('作成フォームが閉じている', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isFormClosed()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^保存中は「保存」ボタンが無効化されている$/, async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  expect(await adapter.isSaveButtonDisabled()).toBe(true);
});

Then(/^「([^」]+)」の子カテゴリとして「([^」]+)」が表示されている$/, async ({ page }, parentName: string, childName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const children = await adapter.getChildCategoryNames(parentName);
    expect(children).toContain(childName);
  }).toPass({ timeout: 10_000 });
});

// --- バリデーション ---

Then(/^バリデーションエラー「(.+)」が表示される$/, async ({ page }, expectedError: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const error = await adapter.getValidationError();
    expect(error).toContain(expectedError);
  }).toPass({ timeout: 5_000 });
});

When('カテゴリ名に101文字の文字列を入力する', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.fillCategoryNameWithLength(101);
});

Then('カテゴリ名のバリデーションエラーが表示される', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const error = await adapter.getCategoryNameValidationError();
    expect(error.length).toBeGreaterThan(0);
  }).toPass({ timeout: 5_000 });
});

// --- エラー (API) ---

When('APIがエラーを返す状態で「保存」ボタンをクリックする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickSaveButton();
});

Then(/^エラーメッセージ「(.+)」が表示される$/, async ({ page }, expectedMessage: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isErrorMessageVisible()).toBe(true);
    const msg = await adapter.getErrorMessage();
    expect(msg).toContain(expectedMessage);
  }).toPass({ timeout: 10_000 });
});

// --- 権限 ---

Then('「+ 新規カテゴリ」ボタンが表示されている', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isNewCategoryButtonVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 上下移動 (F-03-03-004) ---

// Given/Then 両方で使われるため Given で定義（playwright-bdd は Given/Then を同一ステップとして扱う）
Given(/^「([^」]+)」の子カテゴリが「([^」]+)」「([^」]+)」「([^」]+)」の順で表示されている$/, async ({ page }, parentName: string, child1: string, child2: string, child3: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const children = await adapter.getChildCategoryNames(parentName);
    expect(children[0]).toBe(child1);
    expect(children[1]).toBe(child2);
    expect(children[2]).toBe(child3);
  }).toPass({ timeout: 5_000 });
});

When(/^「(.+)」の「上へ移動」ボタンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickMoveUpButton(categoryName);
});

When(/^「(.+)」の「下へ移動」ボタンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickMoveDownButton(categoryName);
});

When('カテゴリ管理画面をリロードする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.reloadPage();
});

// --- 編集 (F-03-03-006) ---

When(/^「(.+)」の編集ボタンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickEditButton(categoryName);
});

Then('「カテゴリ編集」フォームが表示される', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isEditFormVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then(/^カテゴリ名に「(.+)」が入力されている$/, async ({ page }, expectedName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    const value = await adapter.getCategoryNameInputValue();
    expect(value).toBe(expectedName);
  }).toPass({ timeout: 5_000 });
});

Then(/^ツリー上で「(.+)」がハイライト表示されている$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isCategoryHighlighted(categoryName)).toBe(true);
  }).toPass({ timeout: 5_000 });
});

When(/^カテゴリ名を「(.+)」に変更する$/, async ({ page }, newName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.fillCategoryName(newName);
});

When('カテゴリ名を空にする', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clearCategoryName();
});

Then('編集フォームが閉じている', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isFormClosed()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

When(/^「(.+)」にホバーする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.hoverCategory(categoryName);
});

Then('編集ボタンが表示されている', async ({ page }) => {
  const adapter = createCategoryManagementAdapter(page);
  await expect(async () => {
    expect(await adapter.isEditButtonVisibleOnHover()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

// --- 削除 (F-03-03-007) ---

When(/^「(.+)」の削除ボタンをクリックする$/, async ({ page }, categoryName: string) => {
  const adapter = createCategoryManagementAdapter(page);
  await adapter.clickDeleteButton(categoryName);
});

// 確認ダイアログ「...」が表示される / 確認メッセージ「...」が表示される /
// 確認ダイアログで「削除する」ボタンをクリックする / 確認ダイアログで「キャンセル」ボタンをクリックする /
// 確認ダイアログが閉じている → F-03-02-004.steps.ts で定義済み（同一CSSセレクタで動作する）

Then('「削除する」ボタンが表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await page.locator('.confirm-dialog .dialog-footer .btn-primary').isVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});

Then('「キャンセル」ボタンが表示されている', async ({ page }) => {
  await expect(async () => {
    expect(await page.locator('.confirm-dialog .dialog-footer .btn-outline').isVisible()).toBe(true);
  }).toPass({ timeout: 5_000 });
});
