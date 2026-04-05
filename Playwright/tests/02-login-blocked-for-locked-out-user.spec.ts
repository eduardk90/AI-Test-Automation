import { test, expect } from '@playwright/test';
import { gotoLogin, USERS } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Login blocked for locked out user', async ({ page }) => {
    // 1. Open https://www.saucedemo.com.
    await gotoLogin(page);

    // 2. Enter username `locked_out_user`.
    await page.locator('[data-test="username"]').fill(USERS.lockedOut);

    // 3. Enter password `secret_sauce`.
    await page.locator('[data-test="password"]').fill(USERS.password);

    // 4. Select the login action.
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });
});
