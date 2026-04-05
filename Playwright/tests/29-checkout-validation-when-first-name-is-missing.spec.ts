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
  test('Checkout validation when first name is missing', async ({ page }) => {
    // 1. Leave first name blank.
    // 2. Enter valid last name and postal code.
    // 3. Click **Continue**.
    await loginAsStandardUser(page);
    await addProductByName(page, PRODUCTS.backpack);
    await openCart(page);
    await startCheckout(page);
    await fillCheckoutInformation(page, { lastName: 'Tester', postalCode: '90210' });
    await continueCheckout(page);

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
