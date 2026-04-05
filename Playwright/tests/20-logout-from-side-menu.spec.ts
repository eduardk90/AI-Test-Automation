import { test, expect } from '@playwright/test';
import { loginAsStandardUser, logout } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Logout from side menu', async ({ page }) => {
    // 1. Open the side menu.
    await loginAsStandardUser(page);

    // 2. Select logout.
    await logout(page);

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).not.toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
