import { Page, expect } from '@playwright/test';
import type { LoginPageAdapter, LoginExpectedLabels, PasswordResetPageAdapter } from '../../types.js';

export class CurrentLoginPageAdapter implements LoginPageAdapter {
  constructor(readonly page: Page) {}

  getExpectedLabels(): LoginExpectedLabels {
    return {
      loginButton: 'ログイン',
      passwordResetLink: 'パスワードをお忘れですか?',
      passwordResetTitle: 'パスワードをお忘れですか?',
      langOptionEnglish: 'English',
      langOptionJapanese: '日本語',
      currentLangAfterEnglish: 'English',
    };
  }

  async navigateToLogin(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForSelector('#username', { timeout: 15_000 });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.locator('#kc-page-title').textContent() ?? '';
  }

  async getUsernameLabel(): Promise<string> {
    return await this.page.locator('label[for="username"]').textContent() ?? '';
  }

  async getPasswordLabel(): Promise<string> {
    return await this.page.locator('label[for="password"]').textContent() ?? '';
  }

  async getLoginButtonLabel(): Promise<string> {
    const inputVal = await this.page.locator('#kc-login').inputValue().catch(() => '');
    if (inputVal) return inputVal;
    return (await this.page.locator('#kc-login').textContent()) ?? '';
  }

  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.page.locator('#username').isVisible();
  }

  async isPasswordFieldVisible(): Promise<boolean> {
    return await this.page.locator('#password').isVisible();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.page.locator('#kc-login').isVisible();
  }

  async isUsernameFocused(): Promise<boolean> {
    return await this.page.locator('#username').evaluate(
      (el) => document.activeElement === el,
    );
  }

  async isPasswordMasked(): Promise<boolean> {
    const type = await this.page.locator('#password').getAttribute('type');
    return type === 'password';
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.locator('#username').fill(username);
  }

  async clearAndFillUsername(username: string): Promise<void> {
    await this.page.locator('#username').clear();
    await this.page.locator('#username').fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.locator('#password').fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.locator('#kc-login').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async getErrorMessage(): Promise<string | null> {
    const errorLocator = this.page.locator('#input-error');
    if (await errorLocator.isVisible().catch(() => false)) {
      return await errorLocator.textContent();
    }
    const alertLocator = this.page.locator('.pf-c-alert__title, .kc-feedback-text');
    if (await alertLocator.first().isVisible().catch(() => false)) {
      return await alertLocator.first().textContent();
    }
    return null;
  }

  async getInfoMessage(): Promise<string | null> {
    const infoLocator = this.page.locator('#kc-info-message .kc-feedback-text, .pf-c-alert__title');
    if (await infoLocator.first().isVisible().catch(() => false)) {
      return await infoLocator.first().textContent();
    }
    return null;
  }

  async getUsernameValue(): Promise<string> {
    return await this.page.locator('#username').inputValue();
  }

  async getPasswordValue(): Promise<string> {
    return await this.page.locator('#password').inputValue();
  }

  async hasFieldErrorState(): Promise<boolean> {
    const usernameInvalid = await this.page.locator('#username').getAttribute('aria-invalid');
    const passwordInvalid = await this.page.locator('#password').getAttribute('aria-invalid');
    return usernameInvalid === 'true' || passwordInvalid === 'true';
  }

  async isPasswordResetLinkVisible(): Promise<boolean> {
    return await this.page.getByText('パスワードをお忘れですか?').isVisible();
  }

  async getPasswordResetLinkText(): Promise<string> {
    return await this.page.locator('#kc-form-options a, .kc-form-options a').first().textContent() ?? '';
  }

  async clickPasswordResetLink(): Promise<void> {
    await this.page.getByText('パスワードをお忘れですか?').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isLanguageDropdownVisible(): Promise<boolean> {
    return await this.page.locator('#kc-locale-dropdown, #kc-current-locale-link').first().isVisible();
  }

  async getCurrentLanguage(): Promise<string> {
    return await this.page.locator('#kc-current-locale-link').textContent() ?? '';
  }

  async openLanguageDropdown(): Promise<void> {
    await this.page.locator('#kc-current-locale-link').click();
  }

  async getLanguageOptions(): Promise<string[]> {
    const items = this.page.locator('#kc-locale-dropdown ul li a, .kc-locale-item a');
    return await items.allTextContents();
  }

  async selectLanguage(language: string): Promise<void> {
    await this.page.locator('#kc-locale-dropdown ul li a, .kc-locale-item a')
      .filter({ hasText: language })
      .click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.page.locator('text=ダッシュボード').first().isVisible({ timeout: 5_000 }).catch(() => false);
  }

  async waitForDashboard(): Promise<void> {
    await this.page.waitForURL('**/dashboard**', { timeout: 15_000 });
    await expect(this.page.locator('text=ダッシュボード').first()).toBeVisible({ timeout: 10_000 });
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}

export class CurrentPasswordResetPageAdapter implements PasswordResetPageAdapter {
  constructor(readonly page: Page) {}

  async isVisible(): Promise<boolean> {
    return await this.page.locator('#kc-page-title').isVisible() &&
           (await this.page.locator('#kc-page-title').textContent() ?? '').includes('パスワード');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.locator('#kc-page-title').textContent() ?? '';
  }

  async getDescription(): Promise<string> {
    return await this.page.locator('.instruction, #kc-info .kc-feedback-text, .pf-c-form__helper-text').first().textContent() ?? '';
  }

  async isUsernameFieldVisible(): Promise<boolean> {
    return await this.page.locator('#username').isVisible();
  }

  async isSubmitButtonVisible(): Promise<boolean> {
    return await this.page.locator('input[type="submit"], button[type="submit"]').isVisible();
  }

  async isBackToLoginLinkVisible(): Promise<boolean> {
    return await this.page.getByText('ログインに戻る').isVisible();
  }

  async isLanguageDropdownVisible(): Promise<boolean> {
    return await this.page.locator('#kc-locale-dropdown, #kc-current-locale-link').first().isVisible();
  }

  async getBackToLoginLinkText(): Promise<string> {
    return await this.page.locator('#kc-form-options a, .kc-form-options a').first().textContent() ?? '';
  }

  async fillUsername(username: string): Promise<void> {
    await this.page.locator('#username').fill(username);
  }

  async clickSubmitButton(): Promise<void> {
    await this.page.locator('input[type="submit"], button[type="submit"]').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async clickBackToLogin(): Promise<void> {
    await this.page.getByText('ログインに戻る').click();
    await this.page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
  }

  async getErrorMessage(): Promise<string | null> {
    const errorLocator = this.page.locator('#input-error, .pf-c-alert__title, .kc-feedback-text');
    if (await errorLocator.first().isVisible().catch(() => false)) {
      return await errorLocator.first().textContent();
    }
    return null;
  }
}
