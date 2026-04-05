import { test, expect } from '@playwright/test';
import { gotoLogin } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Error banner dismiss interaction on login validation error', async ({ page }) => {
    // 1. Trigger login validation error (blank submit).
    await gotoLogin(page);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();

    // 2. Dismiss error banner using close control.
    await page.locator('[data-test="error-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeHidden();

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});
