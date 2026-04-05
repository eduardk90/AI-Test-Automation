import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Open product detail from product name', async ({ page }) => {
    // 1. Click any product name from inventory.
    await loginAsStandardUser(page);

    const selectedName = (await page.locator('.inventory_item_name').first().textContent())?.trim() ?? '';
    await page.locator('.inventory_item_name').first().click();

    await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
    await expect(page.locator('.inventory_details_name')).toHaveText(selectedName);
  });
});
