import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  continueCheckout,
  fillCheckoutInformation,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Checkout validation when postal code is missing', async ({ page }) => {
    // 1. Enter valid first name.
    // 2. Enter valid last name.
    // 3. Leave postal code blank.
    // 4. Continue checkout.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await fillCheckoutInformation(page, { firstName: 'Taylor', lastName: 'Tester' });
    await continueCheckout(page);

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });
});
