import { test, expect } from '@playwright/test';
import { loginAsStandardUser, openMenu } from './helpers/saucedemo';

// spec: specs/saucedemo-test-plan.md

test.describe('SauceDemo Test Plan', () => {
  test('Side menu opens and exposes expected options', async ({ page }) => {
    // 1. Open side menu.
    await loginAsStandardUser(page);
    await openMenu(page);

    await expect(page.locator('#inventory_sidebar_link')).toBeVisible();
    await expect(page.locator('#about_sidebar_link')).toBeVisible();
    await expect(page.locator('#logout_sidebar_link')).toBeVisible();
    await expect(page.locator('#reset_sidebar_link')).toBeVisible();
  });
});
