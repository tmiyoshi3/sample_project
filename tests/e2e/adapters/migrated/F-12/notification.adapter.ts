import { Page } from '@playwright/test';
import type { NotificationAdapter } from '../../types.js';

export class MigratedNotificationAdapter implements NotificationAdapter {
  constructor(readonly page: Page) {}

  async isNotificationButtonVisible(): Promise<boolean> {
    return await this.page.locator('button.notification-btn').isVisible();
  }

  async isBadgeVisible(): Promise<boolean> {
    return await this.page.locator('.notification-badge').isVisible().catch(() => false);
  }

  async getBadgeCount(): Promise<number> {
    const text = await this.page.locator('.notification-badge').textContent();
    return text ? parseInt(text.trim(), 10) : 0;
  }

  async clickNotificationButton(): Promise<void> {
    await this.page.locator('button.notification-btn').click();
  }
}
