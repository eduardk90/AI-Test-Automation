import { expect, type Locator, type Page } from '@playwright/test';

export const BASE_URL = 'https://www.saucedemo.com/';

export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  password: 'secret_sauce',
} as const;

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export async function gotoLogin(page: Page) {
  await page.goto(BASE_URL);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
}

export async function login(page: Page, username = USERS.standard, password = USERS.password) {
  await gotoLogin(page);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

export async function loginAsStandardUser(page: Page) {
  await login(page);
  await expectInventoryPage(page);
}

export async function expectInventoryPage(page: Page) {
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  await expect(page.locator('.inventory_list')).toBeVisible();
}

export async function expectCartBadgeCount(page: Page, expectedCount: number) {
  const badge = page.locator('.shopping_cart_badge');

  if (expectedCount === 0) {
    await expect(badge).toHaveCount(0);
    return;
  }

  await expect(badge).toHaveText(String(expectedCount));
}

export function inventoryItem(page: Page, productName: string): Locator {
  return page.locator('.inventory_item').filter({
    has: page.locator('.inventory_item_name', { hasText: productName }),
  }).first();
}

export function cartItem(page: Page, productName: string): Locator {
  return page.locator('.cart_item').filter({
    has: page.locator('.inventory_item_name', { hasText: productName }),
  }).first();
}

export async function addProductByName(page: Page, productName: string) {
  await inventoryItem(page, productName).locator('button').click();
}

export async function removeProductByName(page: Page, productName: string) {
  await inventoryItem(page, productName).locator('button').click();
}

export async function openProductDetails(page: Page, productName: string) {
  await page.locator('.inventory_item_name', { hasText: productName }).first().click();
  await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+$/);
}

export async function openCart(page: Page) {
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/\/cart\.html$/);
}

export async function startCheckout(page: Page) {
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
}

export async function fillCheckoutInformation(
  page: Page,
  details: { firstName?: string; lastName?: string; postalCode?: string },
) {
  if (details.firstName !== undefined) {
    await page.locator('[data-test="firstName"]').fill(details.firstName);
  }

  if (details.lastName !== undefined) {
    await page.locator('[data-test="lastName"]').fill(details.lastName);
  }

  if (details.postalCode !== undefined) {
    await page.locator('[data-test="postalCode"]').fill(details.postalCode);
  }
}

export async function continueCheckout(page: Page) {
  await page.locator('[data-test="continue"]').click();
}

export async function openMenu(page: Page) {
  await page.locator('#react-burger-menu-btn').click();
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
}

export async function logout(page: Page) {
  await openMenu(page);
  await page.locator('#logout_sidebar_link').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
}

export async function getInventoryNames(page: Page) {
  const names = await page.locator('.inventory_item_name').allTextContents();
  return names.map((name) => name.trim());
}

export async function getInventoryPrices(page: Page) {
  const prices = await page.locator('.inventory_item_price').allTextContents();
  return prices.map((price) => Number(price.replace('$', '').trim()));
}

export async function getCartItemNames(page: Page) {
  const names = await page.locator('.cart_item .inventory_item_name').allTextContents();
  return names.map((name) => name.trim());
}

export async function getCartItemPrices(page: Page) {
  const prices = await page.locator('.cart_item .inventory_item_price').allTextContents();
  return prices.map((price) => Number(price.replace('$', '').trim()));
}
