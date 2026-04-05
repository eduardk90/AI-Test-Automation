import { test, expect } from '@playwright/test';
import { loginAsStandardUser, openCart } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Direct access to checkout without cart items', async ({ page }) => {
    // 1. Open cart page.
    // 2. Attempt to start checkout.
    await loginAsStandardUser(page);
    await openCart(page);
    await expect(page.locator('.cart_item')).toHaveCount(0);

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });
});
