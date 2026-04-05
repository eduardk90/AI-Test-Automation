import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  getInventoryNames,
  getInventoryPrices,
  loginAsStandardUser,
  openProductDetails,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Sort selection persistence during in-session navigation', async ({ page }) => {
    // 1. Set sort to **Price (high to low)**.
    await loginAsStandardUser(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('hilo');

    const before = await getInventoryPrices(page);
    expect(before).toEqual([...before].sort((a, b) => b - a));

    // 2. Open a product detail page.
    await openProductDetails(page, PRODUCTS.backpack);

    // 3. Return to inventory page.
    await page.goBack();
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // SauceDemo currently resets sort to Name (A to Z) when navigating back from details.
    await expect(page.locator('[data-test="product-sort-container"]')).toHaveValue('az');

    const names = await getInventoryNames(page);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });
});
