import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  expectCartBadgeCount,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
  openProductDetails,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Add product to cart from product detail page', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Open any product detail page.
    await openProductDetails(page, PRODUCTS.backpack);

    // 3. Add the product to the cart.
    await page.locator('button').filter({ hasText: 'Add to cart' }).click();
    await expect(page.locator('button').filter({ hasText: 'Remove' })).toBeVisible();

    // 4. Open the cart.
    await expectCartBadgeCount(page, 1);
    await openCart(page);

    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual([PRODUCTS.backpack]);
  });
});
