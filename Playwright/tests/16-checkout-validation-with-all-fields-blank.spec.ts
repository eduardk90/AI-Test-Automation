import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  continueCheckout,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Checkout validation with all fields blank', async ({ page }) => {
    // 1. Leave first name blank.
    // 2. Leave last name blank.
    // 3. Leave postal code blank.
    // 4. Continue checkout.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await continueCheckout(page);

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
