import { test, expect } from '@playwright/test';
import { getInventoryPrices, loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Sort products by Price high to low', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Change sorting to `Price (high to low)`.
    await page.locator('[data-test="product-sort-container"]').selectOption({ label: 'Price (high to low)' });

    // 3. Review the visible prices.
    const prices = await getInventoryPrices(page);
    const sortedPrices = [...prices].sort((left, right) => right - left);

    expect(prices).toEqual(sortedPrices);
  });
});