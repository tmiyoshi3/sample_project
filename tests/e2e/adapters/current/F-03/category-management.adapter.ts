import { Page } from '@playwright/test';
import type { CategoryManagementPageAdapter } from '../../types.js';

export class CurrentCategoryManagementPageAdapter implements CategoryManagementPageAdapter {
  constructor(readonly page: Page) {}

  async navigateToCategoryManagement(): Promise<void> {
    await this.page.goto('/products/categories');
    await this.page.waitForSelector('.category-container', { timeout: 15_000 });
  }

  async waitForCategoryManagementLoad(): Promise<void> {
    await this.page.waitForSelector('.tree-list', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- ツリー表示 ---

  private getTreeItem(categoryName: string) {
    return this.page.locator('.tree-item').filter({
      has: this.page.locator('.category-name', { hasText: new RegExp(`^${this.escapeRegex(categoryName)}$`) }),
    });
  }

  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async isCategoryTreeVisible(): Promise<boolean> {
    return await this.page.locator('.tree-list').isVisible().catch(() => false);
  }

  async getRootCategoryCount(): Promise<number> {
    const items = this.page.locator('.tree-list > .tree-item');
    const count = await items.count();
    let rootCount = 0;
    for (let i = 0; i < count; i++) {
      const paddingLeft = await items.nth(i).evaluate(el =>
        parseInt(window.getComputedStyle(el).paddingLeft) || 0
      );
      if (paddingLeft <= 16) rootCount++;
    }
    return rootCount;
  }

  async getCategoryNames(): Promise<string[]> {
    const names = this.page.locator('.tree-item .category-name');
    return await names.allTextContents().then(texts => texts.map(t => t.trim()));
  }

  async getChildCategoryNames(parentName: string): Promise<string[]> {
    const allItems = this.page.locator('.tree-item');
    const count = await allItems.count();
    const result: string[] = [];
    let foundParent = false;
    let parentLevel = -1;

    for (let i = 0; i < count; i++) {
      const item = allItems.nth(i);
      const name = (await item.locator('.category-name').textContent() ?? '').trim();
      const paddingLeft = await item.evaluate(el => {
        return parseInt(window.getComputedStyle(el).paddingLeft) || 0;
      });
      const level = Math.round((paddingLeft - 16) / 28);

      if (name === parentName) {
        foundParent = true;
        parentLevel = level;
        continue;
      }

      if (foundParent) {
        if (level <= parentLevel) break;
        if (level === parentLevel + 1) {
          result.push(name);
        }
      }
    }
    return result;
  }

  async getProductCount(categoryName: string): Promise<string> {
    const item = this.getTreeItem(categoryName);
    const countText = (await item.locator('.product-count').textContent() ?? '').trim();
    const match = countText.match(/(\d+)/);
    return match ? match[1] : '0';
  }

  async isCategoryVisible(categoryName: string): Promise<boolean> {
    const item = this.getTreeItem(categoryName);
    return await item.isVisible().catch(() => false);
  }

  // --- 展開/折りたたみ ---

  async hasToggleIcon(categoryName: string): Promise<boolean> {
    const item = this.getTreeItem(categoryName);
    return await item.locator('.btn-toggle').isVisible().catch(() => false);
  }

  async isExpandedIcon(categoryName: string): Promise<boolean> {
    const item = this.getTreeItem(categoryName);
    const toggleText = (await item.locator('.btn-toggle').textContent() ?? '').trim();
    return toggleText === '▼';
  }

  async clickToggleIcon(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.locator('.btn-toggle').click();
    await this.page.waitForTimeout(300);
  }

  async areChildrenVisible(parentName: string): Promise<boolean> {
    const children = await this.getChildCategoryNames(parentName);
    return children.length > 0;
  }

  async isAllExpanded(): Promise<boolean> {
    const toggleButtons = this.page.locator('.tree-item .btn-toggle');
    const count = await toggleButtons.count();
    for (let i = 0; i < count; i++) {
      const text = (await toggleButtons.nth(i).textContent() ?? '').trim();
      if (text === '▶') return false;
    }
    return true;
  }

  // --- 新規カテゴリボタン ---

  async clickNewCategoryButton(): Promise<void> {
    await this.page.locator('.btn-add').filter({ hasText: '新規カテゴリ' }).click();
    await this.page.waitForTimeout(300);
  }

  async isNewCategoryButtonVisible(): Promise<boolean> {
    return await this.page.locator('.btn-add').filter({ hasText: '新規カテゴリ' }).isVisible().catch(() => false);
  }

  // --- フォーム ---

  async isCreateFormVisible(): Promise<boolean> {
    const panel = this.page.locator('.edit-panel');
    if (!(await panel.isVisible().catch(() => false))) return false;
    const title = (await panel.locator('.panel-title').textContent() ?? '').trim();
    return title === 'カテゴリ作成';
  }

  async isEditFormVisible(): Promise<boolean> {
    const panel = this.page.locator('.edit-panel');
    if (!(await panel.isVisible().catch(() => false))) return false;
    const title = (await panel.locator('.panel-title').textContent() ?? '').trim();
    return title === 'カテゴリ編集';
  }

  async isFormClosed(): Promise<boolean> {
    return !(await this.page.locator('.edit-panel').isVisible().catch(() => false));
  }

  async getFormTitle(): Promise<string> {
    return (await this.page.locator('.edit-panel .panel-title').textContent() ?? '').trim();
  }

  async getCategoryNameInputValue(): Promise<string> {
    return await this.page.locator('.edit-panel input[formcontrolname="name"]').inputValue();
  }

  async getDescriptionInputValue(): Promise<string> {
    return await this.page.locator('.edit-panel textarea[formcontrolname="description"]').inputValue();
  }

  async getParentCategorySelectValue(): Promise<string> {
    const select = this.page.locator('.edit-panel select[formcontrolname="parentId"]');
    const selectedOption = select.locator('option:checked');
    return (await selectedOption.textContent() ?? '').trim();
  }

  async fillCategoryName(name: string): Promise<void> {
    await this.page.locator('.edit-panel input[formcontrolname="name"]').fill(name);
  }

  async clearCategoryName(): Promise<void> {
    await this.page.locator('.edit-panel input[formcontrolname="name"]').fill('');
  }

  async fillCategoryNameWithLength(length: number): Promise<void> {
    const str = 'あ'.repeat(length);
    await this.page.locator('.edit-panel input[formcontrolname="name"]').fill(str);
  }

  async fillDescription(description: string): Promise<void> {
    await this.page.locator('.edit-panel textarea[formcontrolname="description"]').fill(description);
  }

  async selectParentCategory(parentName: string): Promise<void> {
    const select = this.page.locator('.edit-panel select[formcontrolname="parentId"]');
    const options = select.locator('option');
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const text = (await options.nth(i).textContent() ?? '').trim();
      if (text.includes(parentName)) {
        const value = await options.nth(i).getAttribute('value');
        await select.selectOption(value!);
        return;
      }
    }
    throw new Error(`Parent category "${parentName}" not found in select options`);
  }

  async clickSaveButton(): Promise<void> {
    await this.page.locator('.edit-panel .btn-save').click();
    await this.page.waitForTimeout(500);
  }

  async clickFormCancelButton(): Promise<void> {
    await this.page.locator('.edit-panel .btn-cancel').click();
    await this.page.waitForTimeout(300);
  }

  async isSaveButtonDisabled(): Promise<boolean> {
    return await this.page.locator('.edit-panel .btn-save').isDisabled();
  }

  async getValidationError(): Promise<string> {
    return (await this.page.locator('.edit-panel .form-error').first().textContent() ?? '').trim();
  }

  async getCategoryNameValidationError(): Promise<string> {
    const nameGroup = this.page.locator('.edit-panel .form-group').filter({
      has: this.page.locator('label', { hasText: 'カテゴリ名' }),
    });
    return (await nameGroup.locator('.form-error').textContent() ?? '').trim();
  }

  // --- 子カテゴリ追加 ---

  async clickAddChildButton(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
    await item.locator('.btn-icon[title="子カテゴリを追加"]').click();
    await this.page.waitForTimeout(300);
  }

  // --- 編集 ---

  async hoverCategory(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
  }

  async clickEditButton(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
    await item.locator('.btn-icon[title="編集"]').click();
    await this.page.waitForTimeout(300);
  }

  async isEditButtonVisibleOnHover(): Promise<boolean> {
    return await this.page.locator('.tree-item:hover .btn-icon[title="編集"]').isVisible().catch(() => false);
  }

  async isCategoryHighlighted(categoryName: string): Promise<boolean> {
    const item = this.getTreeItem(categoryName);
    return await item.evaluate(el => el.classList.contains('editing'));
  }

  // --- 上下移動 ---

  async clickMoveUpButton(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
    await item.locator('.btn-icon[title="上へ移動"]').click();
    await this.page.waitForTimeout(300);
  }

  async clickMoveDownButton(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
    await item.locator('.btn-icon[title="下へ移動"]').click();
    await this.page.waitForTimeout(300);
  }

  // --- 削除 ---

  async clickDeleteButton(categoryName: string): Promise<void> {
    const item = this.getTreeItem(categoryName);
    await item.hover();
    await this.page.waitForTimeout(200);
    await item.locator('.btn-icon[title="削除"]').click();
    await this.page.waitForTimeout(300);
  }

  async isConfirmDialogVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog').isVisible().catch(() => false);
  }

  async getConfirmDialogTitle(): Promise<string> {
    return (await this.page.locator('.confirm-dialog .dialog-title').textContent() ?? '').trim();
  }

  async getConfirmDialogMessage(): Promise<string> {
    return (await this.page.locator('.confirm-dialog .dialog-body p').textContent() ?? '').trim();
  }

  async clickDialogConfirmButton(): Promise<void> {
    await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').click();
    await this.page.waitForTimeout(500);
  }

  async clickDialogCancelButton(): Promise<void> {
    await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').click();
    await this.page.waitForTimeout(300);
  }

  async isDialogDeleteButtonVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog .dialog-footer .btn-primary').isVisible().catch(() => false);
  }

  async isDialogCancelButtonVisible(): Promise<boolean> {
    return await this.page.locator('.confirm-dialog .dialog-footer .btn-outline').isVisible().catch(() => false);
  }

  // --- メッセージ ---

  async getSuccessMessage(): Promise<string> {
    return (await this.page.locator('.success-banner').textContent() ?? '').trim();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator('.error-banner').textContent() ?? '').trim();
  }

  async isSuccessMessageVisible(): Promise<boolean> {
    return await this.page.locator('.success-banner').isVisible().catch(() => false);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.page.locator('.error-banner').isVisible().catch(() => false);
  }

  // --- リロード ---

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForSelector('.tree-list', { timeout: 15_000 });
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  // --- URL ---

  getCurrentUrl(): string {
    return this.page.url();
  }
}
