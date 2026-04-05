# SauceDemo Test Plan

## Scope

Application under test: https://www.saucedemo.com

This plan covers the main user journeys for SauceDemo:
- Authentication
- Product browsing
- Product sorting
- Cart management
- Checkout flow
- Navigation and session controls
- Validation and error handling

## Assumptions

- Each scenario starts from a blank/fresh browser state.
- No user is logged in unless explicitly stated.
- Public demo credentials are used where applicable.
- Primary happy-path credentials:
  - Username: `standard_user`
  - Password: `secret_sauce`

## Success Criteria

A scenario passes when:
- All steps can be completed as written.
- The expected UI state appears after each critical action.
- No unexpected error, broken navigation, or incorrect data appears.

## Failure Conditions

A scenario fails when:
- Expected content, controls, or pages do not appear.
- Validation messages are missing or incorrect.
- Cart, checkout, or login state becomes inconsistent.
- The user can bypass intended restrictions or validations.
- Runtime issues block completion of the scenario.

---

# Test Scenarios

## 1. Successful login with valid credentials

**Starting state:** Fresh browser session on the login page.

### Steps
1. Open https://www.saucedemo.com.
2. Enter username `standard_user`.
3. Enter password `secret_sauce`.
4. Select the login action.

### Expected results
- Login succeeds.
- The inventory page is displayed.
- Product list is visible.
- Cart icon is visible.
- No login error message is shown.

### Success criteria
- User reaches the inventory page and can interact with products.

### Failure conditions
- Login fails with valid credentials.
- Inventory page does not load.
- An unexpected error appears.

---

## 2. Login blocked for locked out user

**Starting state:** Fresh browser session on the login page.

### Steps
1. Open https://www.saucedemo.com.
2. Enter username `locked_out_user`.
3. Enter password `secret_sauce`.
4. Select the login action.

### Expected results
- Login is rejected.
- A clear error message is shown.
- User remains on the login page.

### Success criteria
- Locked user cannot enter the application.

### Failure conditions
- Locked user reaches the inventory page.
- No error message is displayed.

---

## 3. Login validation with blank username and password

**Starting state:** Fresh browser session on the login page.

### Steps
1. Open https://www.saucedemo.com.
2. Leave username blank.
3. Leave password blank.
4. Select the login action.

### Expected results
- Login is rejected.
- A validation error message is displayed.
- User remains on the login page.

### Success criteria
- The page prevents submission without credentials.

### Failure conditions
- Login proceeds without credentials.
- No validation message appears.

---

## 4. Inventory page shows core controls after login

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Observe the inventory page.

### Expected results
- Inventory title is visible.
- Product cards are listed.
- Sort control is visible.
- Cart icon is visible.
- Menu button is visible.

### Success criteria
- Core inventory controls are present and usable.

### Failure conditions
- Key controls are missing or disabled unexpectedly.

---

## 5. Sort products by Name A to Z

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Change sorting to `Name (A to Z)`.
3. Review the product order.

### Expected results
- Products are displayed in ascending alphabetical order.

### Success criteria
- Sort order updates correctly.

### Failure conditions
- Product order does not change or is incorrect.

---

## 6. Sort products by Name Z to A

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Change sorting to `Name (Z to A)`.
3. Review the product order.

### Expected results
- Products are displayed in descending alphabetical order.

### Success criteria
- Sort order updates correctly.

### Failure conditions
- Product order does not change or is incorrect.

---

## 7. Sort products by Price low to high

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Change sorting to `Price (low to high)`.
3. Review the visible prices.

### Expected results
- Products are ordered from lowest price to highest price.

### Success criteria
- Numeric ascending price sorting is correct.

### Failure conditions
- Prices are not in ascending order.

---

## 8. Sort products by Price high to low

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Change sorting to `Price (high to low)`.
3. Review the visible prices.

### Expected results
- Products are ordered from highest price to lowest price.

### Success criteria
- Numeric descending price sorting is correct.

### Failure conditions
- Prices are not in descending order.

---

## 9. Add a single product to cart from inventory page

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add one product from the inventory list to the cart.
3. Observe the cart badge.
4. Open the cart page.

### Expected results
- The selected product changes from `Add to cart` to `Remove`.
- Cart badge shows `1`.
- The cart page lists the selected product exactly once.

### Success criteria
- The correct product is added and tracked in the cart.

### Failure conditions
- Badge count is wrong.
- Wrong product appears in cart.
- Product appears more than once.

---

## 10. Add multiple products to cart

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add at least three different products.
3. Observe the cart badge.
4. Open the cart page.

### Expected results
- Cart badge shows the correct item count.
- All selected products appear in the cart.
- Each item appears once.

### Success criteria
- Multi-item cart state is accurate.

### Failure conditions
- Item count or product list is incorrect.

---

## 11. Remove a product from inventory page

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add one product to the cart.
3. Select `Remove` for the same product.

### Expected results
- The product button returns to `Add to cart`.
- Cart badge is removed or updated correctly.
- The product no longer appears in the cart.

### Success criteria
- Removal updates both inventory and cart state.

### Failure conditions
- Removed item still appears in cart.
- Badge count does not update.

---

## 12. Remove a product from cart page

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add two products to the cart.
3. Open the cart page.
4. Remove one product.

### Expected results
- Only the removed product disappears.
- Remaining product stays in cart.
- Cart badge updates to the remaining count.

### Success criteria
- Cart page removal works without affecting unrelated items.

### Failure conditions
- Wrong item is removed.
- Badge count is incorrect.

---

## 13. Open product detail page and verify product data

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Select a product name or image.
3. Review the product detail page.

### Expected results
- Product detail page opens.
- Product name, description, and price match the selected item.
- Add/remove control is available.

### Success criteria
- Product detail information is accurate.

### Failure conditions
- Wrong product opens.
- Product information does not match.

---

## 14. Add product to cart from product detail page

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Open any product detail page.
3. Add the product to the cart.
4. Open the cart.

### Expected results
- Cart badge updates to `1`.
- The chosen product appears in the cart.
- Button state changes appropriately.

### Success criteria
- Detail-page add-to-cart behavior matches inventory behavior.

### Failure conditions
- Cart state does not reflect the action.

---

## 15. Start checkout with items in cart

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add at least one product to the cart.
3. Open the cart page.
4. Select the checkout action.

### Expected results
- Checkout information page is displayed.
- First name, last name, and postal code fields are visible.

### Success criteria
- User can enter checkout information.

### Failure conditions
- Checkout page does not open.
- Required fields are missing.

---

## 16. Checkout validation with all fields blank

**Starting state:** Fresh browser session with at least one item in cart and checkout information page open.

### Steps
1. Leave first name blank.
2. Leave last name blank.
3. Leave postal code blank.
4. Continue checkout.

### Expected results
- Checkout does not proceed.
- A validation error is shown.
- User remains on the checkout information page.

### Success criteria
- Required checkout fields are enforced.

### Failure conditions
- Checkout proceeds without required data.
- No validation message appears.

---

## 17. Checkout validation when postal code is missing

**Starting state:** Fresh browser session with at least one item in cart and checkout information page open.

### Steps
1. Enter valid first name.
2. Enter valid last name.
3. Leave postal code blank.
4. Continue checkout.

### Expected results
- Checkout does not proceed.
- Postal code validation is shown.

### Success criteria
- Postal code is required.

### Failure conditions
- Checkout continues without postal code.
- Validation is missing or incorrect.

---

## 18. Complete checkout successfully

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add at least one product to the cart.
3. Start checkout.
4. Enter valid first name, last name, and postal code.
5. Continue to the overview page.
6. Review items and totals.
7. Finish checkout.

### Expected results
- Overview page shows correct items and pricing.
- Completion page confirms the order was placed.
- Cart is cleared after completion.

### Success criteria
- User can complete the full purchase flow successfully.

### Failure conditions
- Incorrect totals appear.
- Checkout cannot be completed.
- Completion confirmation is missing.

---

## 19. Cancel checkout from information page

**Starting state:** Fresh browser session with at least one item in cart and checkout information page open.

### Steps
1. Select the cancel action.

### Expected results
- User returns to the cart page.
- Cart contents remain unchanged.

### Success criteria
- Cancel exits checkout without data loss.

### Failure conditions
- Navigation is incorrect.
- Cart contents are modified unexpectedly.

---

## 20. Logout from side menu

**Starting state:** Logged-in session on the inventory page.

### Steps
1. Open the side menu.
2. Select logout.

### Expected results
- User is returned to the login page.
- Inventory page is no longer accessible without logging in again.

### Success criteria
- Session ends correctly.

### Failure conditions
- User remains authenticated.
- Protected pages remain accessible.

---

## 21. Cart state persists during in-session navigation

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Add one or more products to the cart.
3. Navigate between inventory, product detail, and cart pages.

### Expected results
- Cart badge count remains accurate.
- Selected products remain in the cart throughout navigation.

### Success criteria
- In-session cart state is preserved.

### Failure conditions
- Cart contents are lost or count becomes inconsistent.

---

## 22. Browser back navigation does not break state

**Starting state:** Fresh browser session.

### Steps
1. Log in as `standard_user`.
2. Navigate to a product detail page.
3. Use browser back and forward navigation.

### Expected results
- Navigation works without errors.
- Displayed page content remains consistent.
- Cart state remains accurate.

### Success criteria
- Browser navigation does not corrupt state.

### Failure conditions
- Broken pages, missing content, or inconsistent state appear.
