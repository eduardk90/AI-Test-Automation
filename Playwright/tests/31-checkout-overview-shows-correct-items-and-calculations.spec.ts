import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  continueCheckout,
  fillCheckoutInformation,
  getCartItemNames,
  getCartItemPrices,
  loginAsStandardUser,
  openCart,
  startCheckout,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Checkout overview shows correct items and calculations', async ({ page }) => {
    const selectedProducts = [PRODUCTS.backpack, PRODUCTS.bikeLight, PRODUCTS.onesie];

    // 1. Reach checkout overview page.
    await loginAsStandardUser(page);
    for (const product of selectedProducts) {
      await addProductByName(page, product);
    }
    await openCart(page);
    await startCheckout(page);
    await fillCheckoutInformation(page, {
      firstName: 'Taylor',
      lastName: 'Tester',
      postalCode: '90210',
    });
    await continueCheckout(page);
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);

    // 2. Verify item names/prices match cart selections.
    const overviewNames = await getCartItemNames(page);
    const overviewPrices = await getCartItemPrices(page);
    expect(overviewNames).toEqual(selectedProducts);

    // 3. Verify subtotal equals sum of item prices.
    const expectedSubtotal = overviewPrices.reduce((sum, price) => sum + price, 0);
    const subtotalText = await page.locator('.summary_subtotal_label').innerText();
    const subtotal = Number(subtotalText.replace('Item total: $', '').trim());
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);

    // 4. Verify displayed total equals subtotal + tax shown.
    const taxText = await page.locator('.summary_tax_label').innerText();
    const totalText = await page.locator('.summary_total_label').innerText();
    const tax = Number(taxText.replace('Tax: $', '').trim());
    const total = Number(totalText.replace('Total: $', '').trim());

    expect(total).toBeCloseTo(subtotal + tax, 2);
  });
});
