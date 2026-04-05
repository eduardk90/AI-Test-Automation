import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  cartItem,
  expectCartBadgeCount,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Remove a product from cart page', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add two products to the cart.
    await addProductByName(page, PRODUCTS.backpack);
    await addProductByName(page, PRODUCTS.bikeLight);

    // 3. Open the cart page.
    await openCart(page);

    // 4. Remove one product.
    await cartItem(page, PRODUCTS.backpack).locator('button').click();

    await expect(cartItem(page, PRODUCTS.backpack)).toHaveCount(0);
    await expect(cartItem(page, PRODUCTS.bikeLight)).toBeVisible();
    await expectCartBadgeCount(page, 1);

    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual([PRODUCTS.bikeLight]);
  });
});
