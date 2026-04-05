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
  test('Checkout validation when last name is missing', async ({ page }) => {
    // 1. Enter valid first name.
    // 2. Leave last name blank.
    // 3. Enter valid postal code.
    // 4. Click **Continue**.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await fillCheckoutInformation(page, { firstName: 'Taylor', postalCode: '90210' });
    await continueCheckout(page);

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });
});
