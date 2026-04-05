import { test, expect } from '@playwright/test';
import { getInventoryNames, loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Sort products by Name Z to A', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Change sorting to `Name (Z to A)`.
    await page.locator('[data-test="product-sort-container"]').selectOption({ label: 'Name (Z to A)' });

    // 3. Review the product order.
    const names = await getInventoryNames(page);
    const sortedNames = [...names].sort((left, right) => right.localeCompare(left));

    expect(names).toEqual(sortedNames);
  });
});
