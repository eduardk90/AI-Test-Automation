import { test, expect } from '@playwright/test';
import { getInventoryPrices, loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Sort products by Price low to high', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Change sorting to `Price (low to high)`.
    await page.locator('[data-test="product-sort-container"]').selectOption({ label: 'Price (low to high)' });

    // 3. Review the visible prices.
    const prices = await getInventoryPrices(page);
    const sortedPrices = [...prices].sort((left, right) => left - right);

    expect(prices).toEqual(sortedPrices);
  });
});
