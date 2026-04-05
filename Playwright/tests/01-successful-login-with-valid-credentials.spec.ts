import { test, expect } from '@playwright/test';
import { gotoLogin } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    // 1. Open https://www.saucedemo.com.
    await gotoLogin(page);

    // 2. Enter username `standard_user`.
    await page.locator('[data-test="username"]').fill('standard_user');

    // 3. Enter password `secret_sauce`.
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 4. Select the login action.
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveCount(0);
  });
});
