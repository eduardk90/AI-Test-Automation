import { test, expect } from '@playwright/test';
import { gotoLogin } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Login validation with blank username and password', async ({ page }) => {
    // 1. Open https://www.saucedemo.com.
    await gotoLogin(page);

    // 2. Leave username blank.
    await expect(page.locator('[data-test="username"]')).toHaveValue('');

    // 3. Leave password blank.
    await expect(page.locator('[data-test="password"]')).toHaveValue('');

    // 4. Select the login action.
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
