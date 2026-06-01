import { expect } from '@playwright/test';
import type { LoginPageAdapter } from '../../adapters/types.js';

export async function assertLoginFormInitialState(adapter: LoginPageAdapter): Promise<void> {
  expect(await adapter.isUsernameFieldVisible()).toBe(true);
  expect(await adapter.isPasswordFieldVisible()).toBe(true);
  expect(await adapter.isLoginButtonVisible()).toBe(true);
  expect(await adapter.isUsernameFocused()).toBe(true);
  expect(await adapter.isPasswordMasked()).toBe(true);
  expect(await adapter.isPasswordResetLinkVisible()).toBe(true);
  expect(await adapter.isLanguageDropdownVisible()).toBe(true);
}

export async function assertLoginSuccess(adapter: LoginPageAdapter): Promise<void> {
  await adapter.waitForDashboard();
  expect(await adapter.isDashboardVisible()).toBe(true);
}

export async function assertLoginError(adapter: LoginPageAdapter, expectedMessage: string): Promise<void> {
  await expect(async () => {
    const msg = await adapter.getErrorMessage();
    expect(msg?.trim()).toContain(expectedMessage);
  }).toPass({ timeout: 5_000 });
}

export async function assertFormStateAfterError(
  adapter: LoginPageAdapter,
  expectedUsername: string,
): Promise<void> {
  expect(await adapter.getUsernameValue()).toBe(expectedUsername);
  expect(await adapter.getPasswordValue()).toBe('');
  expect(await adapter.hasFieldErrorState()).toBe(true);
}
