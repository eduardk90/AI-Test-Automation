import { test, expect } from '@playwright/test';
import { gotoLogin } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Login validation when password is blank only', async ({ page }) => {
    // 1. Enter `standard_user`.
    // 2. Leave password empty.
    // 3. Click **Login**.
    await gotoLogin(page);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
  });
});
