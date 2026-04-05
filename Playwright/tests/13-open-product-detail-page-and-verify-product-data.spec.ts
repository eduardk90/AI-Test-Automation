import { test, expect } from '@playwright/test';
import { PRODUCTS, inventoryItem, loginAsStandardUser, openProductDetails } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Open product detail page and verify product data', async ({ page }) => {
    // 1. Log in as `standard_user`.
    await loginAsStandardUser(page);

    const productCard = inventoryItem(page, PRODUCTS.backpack);
    const expectedDescription = (await productCard.locator('.inventory_item_desc').textContent())?.trim() ?? '';
    const expectedPrice = (await productCard.locator('.inventory_item_price').textContent())?.trim() ?? '';

    // 2. Select a product name or image.
    await openProductDetails(page, PRODUCTS.backpack);

    // 3. Review the product detail page.
    await expect(page.locator('.inventory_details_name')).toHaveText(PRODUCTS.backpack);
    await expect(page.locator('.inventory_details_desc')).toHaveText(expectedDescription);
    await expect(page.locator('.inventory_details_price')).toHaveText(expectedPrice);
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });
});
