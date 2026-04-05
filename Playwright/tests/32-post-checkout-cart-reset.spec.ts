import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  continueCheckout,
  expectCartBadgeCount,
  fillCheckoutInformation,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Post-checkout cart reset', async ({ page }) => {
    // 1. Navigate to cart page after completion.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await fillCheckoutInformation(page, {
      firstName: 'Taylor',
      lastName: 'Tester',
      postalCode: '90210',
    });
    await continueCheckout(page);
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);

    await openCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expectCartBadgeCount(page, 0);
  });
});
