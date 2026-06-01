import { Page } from '@playwright/test';
import type { UserMenuAdapter } from '../../types.js';

export class CurrentUserMenuAdapter implements UserMenuAdapter {
  constructor(readonly page: Page) {}

  async getHeaderUsername(): Promise<string> {
    return (await this.page.locator('.user-menu .user-name').textContent() ?? '').trim();
  }

  async getUserAvatar(): Promise<string> {
    return (await this.page.locator('.user-menu .user-avatar').textContent() ?? '').trim();
  }

  async openUserMenu(): Promise<void> {
    const isOpen = await this.isUserMenuOpen();
    if (!isOpen) {
      await this.page.locator('button.user-btn').click();
      await this.page.locator('.user-dropdown').waitFor({ state: 'visible', timeout: 5_000 });
    }
  }

  async isUserMenuOpen(): Promise<boolean> {
    return await this.page.locator('.user-dropdown').isVisible().catch(() => false);
  }

  async getDropdownUsername(): Promise<string> {
    return (await this.page.locator('.user-dropdown .user-fullname').textContent() ?? '').trim();
  }

  async getDropdownRole(): Promise<string> {
    return (await this.page.locator('.user-dropdown .user-role').textContent() ?? '').trim();
  }

  async clickSettingsLink(): Promise<void> {
    await this.page.locator('.user-dropdown .dropdown-item[routerLink="/admin"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickLogoutButton(): Promise<void> {
    await this.page.locator('.user-dropdown .logout-btn').click();
    await this.page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
  }

  async clickOutsideUserMenu(): Promise<void> {
    await this.page.evaluate(() => {
      document.querySelector('h1')?.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      );
    });
    await this.page.waitForTimeout(500);
  }
}
