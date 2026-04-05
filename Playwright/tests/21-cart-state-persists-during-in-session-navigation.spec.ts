import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  expectCartBadgeCount,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
  openProductDetails,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Cart state persists during in-session navigation', async ({ page }) => {
    const selectedProducts = [PRODUCTS.backpack, PRODUCTS.bikeLight];

    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add one or more products to the cart.
    for (const product of selectedProducts) {
      await addProductByName(page, product);
    }
    await expectCartBadgeCount(page, selectedProducts.length);

    // 3. Navigate between inventory, product detail, and cart pages.
    await openProductDetails(page, PRODUCTS.backpack);
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack);
    await expectCartBadgeCount(page, selectedProducts.length);

    await openCart(page);
    expect(await getCartItemNames(page)).toEqual(selectedProducts);

    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expectCartBadgeCount(page, selectedProducts.length);

    await openProductDetails(page, PRODUCTS.bikeLight);
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.bikeLight);
    await expectCartBadgeCount(page, selectedProducts.length);

    await openCart(page);
    expect(await getCartItemNames(page)).toEqual(selectedProducts);
  });
});
