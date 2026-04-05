import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  continueCheckout,
  expectCartBadgeCount,
  fillCheckoutInformation,
  getCartItemNames,
  getCartItemPrices,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Complete checkout successfully', async ({ page }) => {
    const selectedProducts = [PRODUCTS.backpack, PRODUCTS.bikeLight];

    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Add at least one product to the cart.
    for (const product of selectedProducts) {
      await addProductByName(page, product);
    }

    // 3. Start checkout.
    await openCart(page);
    await startCheckout(page);

    // 4. Enter valid first name, last name, and postal code.
    await fillCheckoutInformation(page, {
      firstName: 'Taylor',
      lastName: 'Tester',
      postalCode: '90210',
    });

    // 5. Continue to the overview page.
    await continueCheckout(page);
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    // 6. Review items and totals.
    const overviewItems = await getCartItemNames(page);
    const overviewPrices = await getCartItemPrices(page);
    const subtotal = overviewPrices.reduce((sum, price) => sum + price, 0);

    expect(overviewItems).toEqual(selectedProducts);
    await expect(page.locator('.summary_subtotal_label')).toHaveText(`Item total: $${subtotal.toFixed(2)}`);
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();

    // 7. Finish checkout.
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expectCartBadgeCount(page, 0);
  });
});
