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
  test('Add multiple products to cart', async ({ page }) => {
    const selectedProducts = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.onesie];

    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add at least three different products.
    for (const product of selectedProducts) {
      await addProductByName(page, product);
    }

    // 3. Observe the cart badge.
    await expectCartBadgeCount(page, selectedProducts.length);

    // 4. Open the cart page.
    await openCart(page);

    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual(selectedProducts);
  });
});
