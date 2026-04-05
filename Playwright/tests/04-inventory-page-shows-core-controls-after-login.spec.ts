import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Inventory page shows core controls after login', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Observe the inventory page.
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
  });
});
