import { test, expect } from '@playwright/test';
import { PRODUCTS, addProductByName, loginAsStandardUser, openCart, startCheckout } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Start checkout with items in cart', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add at least one product to the cart.
    await addProductByName(page, PRODUCTS.backpack);

    // 3. Open the cart page.
    await openCart(page);

    // 4. Select the checkout action.
    await startCheckout(page);

    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });
});
