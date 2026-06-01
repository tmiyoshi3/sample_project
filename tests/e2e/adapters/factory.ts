import { Page } from '@playwright/test';
import type {
  LoginPageAdapter,
  PasswordResetPageAdapter,
  DashboardPageAdapter,
  LayoutNavigationAdapter,
  NotificationAdapter,
  UserMenuAdapter,
  SystemIdentityAdapter,
  ProductListPageAdapter,
  ProductDetailPageAdapter,
  CategoryManagementPageAdapter,
  BundleManagementPageAdapter,
  ProductCreatePageAdapter,
  ProductEditPageAdapter,
} from './types.js';
import { CurrentLoginPageAdapter, CurrentPasswordResetPageAdapter } from './current/F-01/login.adapter.js';
import { MigratedLoginPageAdapter, MigratedPasswordResetPageAdapter } from './migrated/F-01/login.adapter.js';
import { CurrentDashboardPageAdapter } from './current/F-02/dashboard.adapter.js';
import { MigratedDashboardPageAdapter } from './migrated/F-02/dashboard.adapter.js';
import { CurrentNavigationAdapter } from './current/F-12/navigation.adapter.js';
import { MigratedNavigationAdapter } from './migrated/F-12/navigation.adapter.js';
import { CurrentNotificationAdapter } from './current/F-12/notification.adapter.js';
import { MigratedNotificationAdapter } from './migrated/F-12/notification.adapter.js';
import { CurrentUserMenuAdapter } from './current/F-12/user-menu.adapter.js';
import { MigratedUserMenuAdapter } from './migrated/F-12/user-menu.adapter.js';
import { CurrentSystemIdentityAdapter } from './current/F-12/system-identity.adapter.js';
import { MigratedSystemIdentityAdapter } from './migrated/F-12/system-identity.adapter.js';
import { CurrentProductListPageAdapter } from './current/F-03/product-list.adapter.js';
import { MigratedProductListPageAdapter } from './migrated/F-03/product-list.adapter.js';
import { CurrentProductDetailPageAdapter } from './current/F-03/product-detail.adapter.js';
import { MigratedProductDetailPageAdapter } from './migrated/F-03/product-detail.adapter.js';
import { CurrentCategoryManagementPageAdapter } from './current/F-03/category-management.adapter.js';
import { MigratedCategoryManagementPageAdapter } from './migrated/F-03/category-management.adapter.js';
import { CurrentBundleManagementPageAdapter } from './current/F-03/bundle-management.adapter.js';
import { MigratedBundleManagementPageAdapter } from './migrated/F-03/bundle-management.adapter.js';
import { CurrentProductCreatePageAdapter } from './current/F-03/product-create.adapter.js';
import { MigratedProductCreatePageAdapter } from './migrated/F-03/product-create.adapter.js';
import { CurrentProductEditPageAdapter } from './current/F-03/product-edit.adapter.js';
import { MigratedProductEditPageAdapter } from './migrated/F-03/product-edit.adapter.js';

const isMigrated = process.env.TARGET_ENV === 'migrated';

export function createLoginAdapter(page: Page): LoginPageAdapter {
  return isMigrated
    ? new MigratedLoginPageAdapter(page)
    : new CurrentLoginPageAdapter(page);
}

export function createPasswordResetAdapter(page: Page): PasswordResetPageAdapter {
  return isMigrated
    ? new MigratedPasswordResetPageAdapter(page)
    : new CurrentPasswordResetPageAdapter(page);
}

export function createDashboardAdapter(page: Page): DashboardPageAdapter {
  return isMigrated
    ? new MigratedDashboardPageAdapter(page)
    : new CurrentDashboardPageAdapter(page);
}

export function createNavigationAdapter(page: Page): LayoutNavigationAdapter {
  return isMigrated
    ? new MigratedNavigationAdapter(page)
    : new CurrentNavigationAdapter(page);
}

export function createNotificationAdapter(page: Page): NotificationAdapter {
  return isMigrated
    ? new MigratedNotificationAdapter(page)
    : new CurrentNotificationAdapter(page);
}

export function createUserMenuAdapter(page: Page): UserMenuAdapter {
  return isMigrated
    ? new MigratedUserMenuAdapter(page)
    : new CurrentUserMenuAdapter(page);
}

export function createSystemIdentityAdapter(page: Page): SystemIdentityAdapter {
  return isMigrated
    ? new MigratedSystemIdentityAdapter(page)
    : new CurrentSystemIdentityAdapter(page);
}

export function createProductListAdapter(page: Page): ProductListPageAdapter {
  return isMigrated
    ? new MigratedProductListPageAdapter(page)
    : new CurrentProductListPageAdapter(page);
}

export function createProductDetailAdapter(page: Page): ProductDetailPageAdapter {
  return isMigrated
    ? new MigratedProductDetailPageAdapter(page)
    : new CurrentProductDetailPageAdapter(page);
}

export function createCategoryManagementAdapter(page: Page): CategoryManagementPageAdapter {
  return isMigrated
    ? new MigratedCategoryManagementPageAdapter(page)
    : new CurrentCategoryManagementPageAdapter(page);
}

export function createBundleManagementAdapter(page: Page): BundleManagementPageAdapter {
  return isMigrated
    ? new MigratedBundleManagementPageAdapter(page)
    : new CurrentBundleManagementPageAdapter(page);
}

export function createProductCreateAdapter(page: Page): ProductCreatePageAdapter {
  return isMigrated
    ? new MigratedProductCreatePageAdapter(page)
    : new CurrentProductCreatePageAdapter(page);
}

export function createProductEditAdapter(page: Page): ProductEditPageAdapter {
  return isMigrated
    ? new MigratedProductEditPageAdapter(page)
    : new CurrentProductEditPageAdapter(page);
}
