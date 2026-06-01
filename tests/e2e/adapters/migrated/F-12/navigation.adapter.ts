import { Page } from '@playwright/test';
import type { LayoutNavigationAdapter } from '../../types.js';

export class MigratedNavigationAdapter implements LayoutNavigationAdapter {
  constructor(readonly page: Page) {}

  async getMenuLabels(): Promise<string[]> {
    const labels = this.page.locator('nav.sidebar .nav-list .nav-item .nav-label');
    return await labels.allTextContents();
  }

  async getMenuItemCount(): Promise<number> {
    return await this.page.locator('nav.sidebar .nav-list .nav-item').count();
  }

  async clickMenuItem(menuName: string): Promise<void> {
    await this.page
      .locator('nav.sidebar .nav-item .nav-label', { hasText: menuName })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isMenuItemActive(menuName: string): Promise<boolean> {
    const item = this.page
      .locator('nav.sidebar .nav-item', { has: this.page.locator('.nav-label', { hasText: menuName }) })
      .first();
    const classes = await item.getAttribute('class') ?? '';
    return classes.includes('active');
  }

  async isSidebarExpanded(): Promise<boolean> {
    const classes = await this.page.locator('nav.sidebar').getAttribute('class') ?? '';
    return !classes.includes('collapsed');
  }

  async isSidebarCollapsed(): Promise<boolean> {
    const classes = await this.page.locator('nav.sidebar').getAttribute('class') ?? '';
    return classes.includes('collapsed');
  }

  async areLabelsVisible(): Promise<boolean> {
    const labels = this.page.locator('nav.sidebar .nav-label');
    const count = await labels.count();
    return count > 0;
  }

  async areIconsVisible(): Promise<boolean> {
    const icons = this.page.locator('nav.sidebar .nav-icon');
    const count = await icons.count();
    return count > 0;
  }

  async clickMenuToggle(): Promise<void> {
    await this.page.locator('button.sidebar-toggle').click();
    await this.page.waitForTimeout(300);
  }

  async fillSearchKeyword(keyword: string): Promise<void> {
    await this.page.locator('input.search-input').fill(keyword);
  }

  async clickSearchButton(): Promise<void> {
    await this.page.locator('button.search-btn').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async submitSearchByEnter(): Promise<void> {
    await this.page.locator('input.search-input').press('Enter');
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async getSearchInputValue(): Promise<string> {
    return await this.page.locator('input.search-input').inputValue();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }

  async waitForUrlContaining(path: string): Promise<void> {
    await this.page.waitForURL(`**${path}**`, { timeout: 10_000 });
  }
}
