import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  expectCartBadgeCount,
  loginAsStandardUser,
  openCart,
  openMenu,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Reset app state clears cart and UI item state', async ({ page }) => {
    // 1. Add multiple items.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await addProductByName(page, PRODUCTS.bikeLight);
    await expectCartBadgeCount(page, 2);

    // 2. Open side menu and click **Reset App State**.
    await openMenu(page);
    await page.locator('#reset_sidebar_link').click();

    // 3. Return to inventory and cart.
    await page.locator('#react-burger-cross-btn').click();
    await expectCartBadgeCount(page, 0);

    await page.reload();
    await expect(page).toHaveURL(/\/inventory\.html$/);

    await expect(page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();

    await openCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
