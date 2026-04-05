import { test, expect } from '@playwright/test';
import {
  PRODUCTS,
  addProductByName,
  expectCartBadgeCount,
  expectInventoryPage,
  loginAsStandardUser,
  openProductDetails,
} from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Browser back navigation does not break state', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    // 2. Navigate to a product detail page.
    await addProductByName(page, PRODUCTS.backpack);
    await openProductDetails(page, PRODUCTS.backpack);
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack);

    // 3. Use browser back and forward navigation.
    await page.goBack();
    await expectInventoryPage(page);
    await expectCartBadgeCount(page, 1);

    await page.goForward();
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack);
    await expectCartBadgeCount(page, 1);
  });
});