import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  expectCartBadgeCount,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
  removeProductByName,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Remove a product from inventory page', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add one product to the cart.
    await addProductByName(page, PRODUCTS.backpack);
    await expectCartBadgeCount(page, 1);

    // 3. Select `Remove` for the same product.
    await removeProductByName(page, PRODUCTS.backpack);

    await expect(page.locator('.inventory_item').filter({ hasText: PRODUCTS.backpack }).locator('button')).toHaveText('Add to cart');
    await expectCartBadgeCount(page, 0);

    await openCart(page);
    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual([]);
  });
});
