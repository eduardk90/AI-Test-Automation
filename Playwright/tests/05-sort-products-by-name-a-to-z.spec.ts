import { test, expect } from '@playwright/test';
import { getInventoryNames, loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Sort products by Name A to Z', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Change sorting to `Name (A to Z)`.
    await page.locator('[data-test="product-sort-container"]').selectOption({ label: 'Name (A to Z)' });

    // 3. Review the product order.
    const names = await getInventoryNames(page);
    const sortedNames = [...names].sort((left, right) => left.localeCompare(right));

    expect(names).toEqual(sortedNames);
  });
});
