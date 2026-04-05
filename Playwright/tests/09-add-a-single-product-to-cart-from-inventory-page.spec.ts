import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  expectCartBadgeCount,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Add a single product to cart from inventory page', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add one product from the inventory list to the cart.
    await addProductByName(page, PRODUCTS.backpack);
    await expect(page.locator('.inventory_item').filter({ hasText: PRODUCTS.backpack }).locator('button')).toHaveText('Remove');

    // 3. Observe the cart badge.
    await expectCartBadgeCount(page, 1);

    // 4. Open the cart page.
    await openCart(page);

    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual([PRODUCTS.backpack]);
  });
});
