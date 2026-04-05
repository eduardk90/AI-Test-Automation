import { test, expect } from '@playwright/test';
import { gotoLogin } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Login validation when username is blank only', async ({ page }) => {
    // 1. Leave username empty.
    // 2. Enter `secret_sauce` as password.
    // 3. Click **Login**.
    await gotoLogin(page);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
