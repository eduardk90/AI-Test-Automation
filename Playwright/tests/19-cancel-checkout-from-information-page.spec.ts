import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  getCartItemNames,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Cancel checkout from information page', async ({ page }) => {
    // 1. Select the cancel action.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL(/\/cart\.html$/);
    const itemNames = await getCartItemNames(page);
    expect(itemNames).toEqual([PRODUCTS.backpack]);
  });
});
