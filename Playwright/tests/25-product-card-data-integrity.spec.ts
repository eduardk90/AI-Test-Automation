import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Product card data integrity', async ({ page }) => {
    // 1. Inspect all product cards.
    // 2. Verify each card has name, description, price, and add/remove action.
    await loginAsStandardUser(page);

    const cards = page.locator('.inventory_item');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      await expect(card.locator('.inventory_item_name')).toBeVisible();
      await expect(card.locator('.inventory_item_desc')).toBeVisible();
      await expect(card.locator('.inventory_item_price')).toContainText('$');
      await expect(card.locator('button')).toContainText(/Add to cart|Remove/);
    }
  });
});
