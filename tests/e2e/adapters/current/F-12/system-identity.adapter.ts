import { Page } from '@playwright/test';
import type { SystemIdentityAdapter } from '../../types.js';

export class CurrentSystemIdentityAdapter implements SystemIdentityAdapter {
  constructor(readonly page: Page) {}

  async getSystemName(): Promise<string> {
    return (await this.page.locator('.logo .logo-text').textContent() ?? '').trim();
  }

  async getSubtitle(): Promise<string> {
    return (await this.page.locator('.logo .logo-subtitle').textContent() ?? '').trim();
  }

  async isVersionVisible(): Promise<boolean> {
    return await this.page.locator('.sidebar-footer .version-info').isVisible().catch(() => false);
  }

  async getVersionText(): Promise<string> {
    return (await this.page.locator('.sidebar-footer .version-number').textContent() ?? '').trim();
  }

  async getFooterText(): Promise<string> {
    return (await this.page.locator('footer.app-footer span').textContent() ?? '').trim();
  }
}
