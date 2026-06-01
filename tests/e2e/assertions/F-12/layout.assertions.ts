import { expect } from '@playwright/test';
import type {
  LayoutNavigationAdapter,
  NotificationAdapter,
  UserMenuAdapter,
  SystemIdentityAdapter,
} from '../../adapters/types.js';

export async function assertAllMenuItemsVisible(
  adapter: LayoutNavigationAdapter,
  expectedMenus: string[],
): Promise<void> {
  const labels = await adapter.getMenuLabels();
  for (const menu of expectedMenus) {
    expect(labels).toContain(menu);
  }
}

export async function assertMenuCount(
  adapter: LayoutNavigationAdapter,
  expectedCount: number,
): Promise<void> {
  const count = await adapter.getMenuItemCount();
  expect(count).toBe(expectedCount);
}

export async function assertSidebarExpanded(adapter: LayoutNavigationAdapter): Promise<void> {
  expect(await adapter.isSidebarExpanded()).toBe(true);
  expect(await adapter.areLabelsVisible()).toBe(true);
}

export async function assertSidebarCollapsed(adapter: LayoutNavigationAdapter): Promise<void> {
  expect(await adapter.isSidebarCollapsed()).toBe(true);
}

export async function assertNotificationBadgeVisible(adapter: NotificationAdapter): Promise<void> {
  expect(await adapter.isBadgeVisible()).toBe(true);
  const count = await adapter.getBadgeCount();
  expect(count).toBeGreaterThan(0);
}

export async function assertNotificationBadgeHidden(adapter: NotificationAdapter): Promise<void> {
  expect(await adapter.isBadgeVisible()).toBe(false);
}

export async function assertUserMenuShowsInfo(
  adapter: UserMenuAdapter,
): Promise<void> {
  const username = await adapter.getDropdownUsername();
  expect(username.length).toBeGreaterThan(0);
}

export async function assertSystemIdentity(adapter: SystemIdentityAdapter): Promise<void> {
  expect(await adapter.getSystemName()).toBe('ProQuip');
  expect(await adapter.getSubtitle()).toBe('調達・在庫管理');
}
