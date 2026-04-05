# SauceDemo Test Plan

## 1) Purpose

Define a complete, execution-ready test plan for https://www.saucedemo.com covering core user journeys, edge cases, and validation behavior for web UI testing.

## 2) Scope

### In Scope
- Authentication and session behavior
- Inventory page rendering and controls
- Product sorting and data consistency
- Product detail behavior
- Cart add/remove/update behavior
- Checkout information, overview, and completion
- Navigation (header/menu/back navigation)
- Error messaging and required-field validation

### Out of Scope
- Payment gateway integrations (not present in demo app)
- Cross-device native app behavior
- Backend/API contract validation outside UI-observable outcomes
- Performance/load/stress testing

## 3) Test Environment & Data

- Application URL: https://www.saucedemo.com
- Browser(s): Chromium (minimum), plus Firefox/WebKit as optional cross-browser pass
- Execution state: Each scenario starts from a blank/fresh browser context (new session, no cookies/local storage)
- Standard valid credential:
  - Username: `standard_user`
  - Password: `secret_sauce`
- Additional demo users (for behavior checks):
  - `locked_out_user`
  - `problem_user`
  - `performance_glitch_user`
  - `error_user`
  - `visual_user`

## 4) Global Pass/Fail Rules

### Pass
- Every expected result in a scenario is observed.
- No unexpected error, blank page, or broken navigation occurs.
- Business-critical state (auth, cart, checkout) stays consistent.

### Fail
- Any expected result is missing or incorrect.
- Validation or error handling does not trigger when required.
- State is corrupted (wrong items, wrong totals, unauthorized page access, etc.).

---

## 5) Test Scenarios

## A. Authentication & Access Control

### A1. Successful login with valid credentials (Happy Path)
- **Assumption:** Fresh browser session on login page.
- **Steps:**
  1. Open https://www.saucedemo.com.
  2. Enter `standard_user` and `secret_sauce`.
  3. Click **Login**.
- **Expected Outcome:** User lands on inventory page; product list, cart icon, sort dropdown, and menu button are visible.
- **Success Criteria:** Inventory page loads fully and is interactive.
- **Failure Conditions:** Login fails, incorrect page shown, or key controls missing.

### A2. Login blocked for locked account
- **Assumption:** Fresh browser session on login page.
- **Steps:**
  1. Enter `locked_out_user` and `secret_sauce`.
  2. Click **Login**.
- **Expected Outcome:** User remains on login page with locked-user error message.
- **Success Criteria:** Access is denied with clear feedback.
- **Failure Conditions:** User reaches inventory or no error message appears.

### A3. Login validation when both fields are blank
- **Assumption:** Fresh browser session on login page.
- **Steps:**
  1. Leave username and password empty.
  2. Click **Login**.
- **Expected Outcome:** Required-field error appears; user stays on login page.
- **Success Criteria:** Form submission is blocked.
- **Failure Conditions:** Login proceeds or no validation is shown.

### A4. Login validation when username is blank only
- **Assumption:** Fresh browser session on login page.
- **Steps:**
  1. Leave username empty.
  2. Enter `secret_sauce` as password.
  3. Click **Login**.
- **Expected Outcome:** Username-required error appears.
- **Success Criteria:** User cannot proceed without username.
- **Failure Conditions:** Login proceeds or wrong validation message.

### A5. Login validation when password is blank only
- **Assumption:** Fresh browser session on login page.
- **Steps:**
  1. Enter `standard_user`.
  2. Leave password empty.
  3. Click **Login**.
- **Expected Outcome:** Password-required error appears.
- **Success Criteria:** User cannot proceed without password.
- **Failure Conditions:** Login proceeds or wrong validation message.

### A6. Access control after logout
- **Assumption:** Fresh browser session.
- **Steps:**
  1. Log in as `standard_user`.
  2. Open side menu and click **Logout**.
  3. Attempt to navigate directly to `/inventory.html`.
- **Expected Outcome:** User is redirected to login page; protected inventory is not accessible.
- **Success Criteria:** Session is fully terminated.
- **Failure Conditions:** Protected page remains accessible without re-login.

---

## B. Inventory & Product Listing

### B1. Inventory page loads core controls
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Log in as `standard_user`.
  2. Observe inventory page.
- **Expected Outcome:** Page title, product cards, sort dropdown, cart icon, and menu button are visible.
- **Success Criteria:** Core controls are present and usable.
- **Failure Conditions:** Any critical control is missing or non-functional.

### B2. Product card data integrity
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Inspect all product cards.
  2. Verify each card has name, description, price, and add/remove action.
- **Expected Outcome:** No card has missing mandatory fields.
- **Success Criteria:** Product metadata is complete and readable.
- **Failure Conditions:** Missing or malformed product data on any card.

### B3. Sort by Name (A to Z)
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Select **Name (A to Z)** from sort dropdown.
  2. Capture visible product name order.
- **Expected Outcome:** Names appear in ascending alphabetical order.
- **Success Criteria:** Sort order is correct for all items.
- **Failure Conditions:** Any out-of-order item.

### B4. Sort by Name (Z to A)
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Select **Name (Z to A)**.
  2. Validate name order.
- **Expected Outcome:** Names appear in descending alphabetical order.
- **Success Criteria:** Sort order matches selected mode.
- **Failure Conditions:** Any out-of-order item.

### B5. Sort by Price (low to high)
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Select **Price (low to high)**.
  2. Validate visible prices.
- **Expected Outcome:** Products are ordered by ascending numeric price.
- **Success Criteria:** Prices strictly follow low-to-high order.
- **Failure Conditions:** Any price sequence violation.

### B6. Sort by Price (high to low)
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Select **Price (high to low)**.
  2. Validate visible prices.
- **Expected Outcome:** Products are ordered by descending numeric price.
- **Success Criteria:** Prices strictly follow high-to-low order.
- **Failure Conditions:** Any price sequence violation.

### B7. Sort selection persistence during in-session navigation
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Set sort to **Price (high to low)**.
  2. Open a product detail page.
  3. Return to inventory page.
- **Expected Outcome:** Inventory retains selected sort mode and order.
- **Success Criteria:** Sort context is preserved in session.
- **Failure Conditions:** Sort resets unexpectedly.

---

## C. Product Detail Page

### C1. Open product detail from product name
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Click any product name from inventory.
- **Expected Outcome:** Product detail page opens for the selected item.
- **Success Criteria:** Correct item detail is displayed.
- **Failure Conditions:** Wrong product opens or page fails to load.

### C2. Open product detail from product image
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Click any product image from inventory.
- **Expected Outcome:** Product detail page opens for clicked item.
- **Success Criteria:** Name/image click paths are consistent.
- **Failure Conditions:** Image click does nothing or opens wrong product.

### C3. Product detail data consistency with inventory
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Note name/price/description on a chosen inventory card.
  2. Open the product detail page for that item.
  3. Compare displayed values.
- **Expected Outcome:** Name, description, and price exactly match inventory values.
- **Success Criteria:** No data drift between listing and details.
- **Failure Conditions:** Any mismatch in displayed data.

### C4. Add/remove item from detail page updates global cart state
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Open any product detail page.
  2. Add item to cart.
  3. Verify cart badge increments.
  4. Remove item and verify cart badge decrements.
- **Expected Outcome:** Detail page actions immediately sync with cart badge and cart contents.
- **Success Criteria:** Global state reflects detail-page actions correctly.
- **Failure Conditions:** Badge/cart mismatch after add/remove.

---

## D. Cart Behavior

### D1. Add one item from inventory
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Add one product from inventory.
  2. Open cart page.
- **Expected Outcome:** Cart badge shows `1`; cart contains selected item once.
- **Success Criteria:** Single-item add is accurate.
- **Failure Conditions:** Wrong count/item or duplicate entry.

### D2. Add multiple distinct items from inventory
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Add at least three distinct products.
  2. Open cart page.
- **Expected Outcome:** Badge count equals added item count; all selected items appear once.
- **Success Criteria:** Multi-item cart state is accurate.
- **Failure Conditions:** Missing item, extra item, duplicate, or wrong badge count.

### D3. Remove item from inventory page
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Add one item.
  2. Click **Remove** on that same inventory card.
  3. Open cart page.
- **Expected Outcome:** Item is absent from cart; badge updates accordingly.
- **Success Criteria:** Inventory-level removal synchronizes with cart.
- **Failure Conditions:** Removed item still in cart or wrong badge count.

### D4. Remove item from cart page only affects selected item
- **Assumption:** Fresh session; user logged in with at least two items added.
- **Steps:**
  1. Open cart page.
  2. Remove one specific item.
- **Expected Outcome:** Only selected item is removed; remaining items stay unchanged.
- **Success Criteria:** Targeted remove behavior is correct.
- **Failure Conditions:** Wrong item removed or non-target items changed.

### D5. Continue shopping from cart preserves cart state
- **Assumption:** Fresh session; user logged in with items in cart.
- **Steps:**
  1. Open cart page.
  2. Click **Continue Shopping**.
  3. Return to inventory and then back to cart.
- **Expected Outcome:** Previously added items remain in cart.
- **Success Criteria:** Navigation does not clear cart.
- **Failure Conditions:** Cart content unexpectedly changes.

### D6. Cart state consistency under browser back/forward
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Add items to cart.
  2. Navigate among inventory, detail, and cart pages.
  3. Use browser back/forward buttons.
- **Expected Outcome:** Page transitions work and cart state stays accurate.
- **Success Criteria:** Browser history navigation does not corrupt session state.
- **Failure Conditions:** Broken pages, stale UI state, or incorrect badge count.

---

## E. Checkout Flow

### E1. Start checkout with at least one cart item
- **Assumption:** Fresh session; user logged in with item(s) in cart.
- **Steps:**
  1. Open cart.
  2. Click **Checkout**.
- **Expected Outcome:** Checkout information page appears with first name, last name, and postal code fields.
- **Success Criteria:** User can begin checkout.
- **Failure Conditions:** Checkout page fails to load or required fields missing.

### E2. Checkout validation with all fields blank
- **Assumption:** Fresh session; user at checkout info page with cart item(s).
- **Steps:**
  1. Leave all fields blank.
  2. Click **Continue**.
- **Expected Outcome:** Validation error appears; user remains on info page.
- **Success Criteria:** Required-field validation blocks continuation.
- **Failure Conditions:** User reaches overview without input.

### E3. Checkout validation when first name is missing
- **Assumption:** Fresh session; user at checkout info page with cart item(s).
- **Steps:**
  1. Leave first name blank.
  2. Enter valid last name and postal code.
  3. Click **Continue**.
- **Expected Outcome:** First-name validation error appears.
- **Success Criteria:** Missing first name is correctly blocked.
- **Failure Conditions:** Flow proceeds or wrong validation message.

### E4. Checkout validation when last name is missing
- **Assumption:** Fresh session; user at checkout info page with cart item(s).
- **Steps:**
  1. Enter valid first name.
  2. Leave last name blank.
  3. Enter valid postal code.
  4. Click **Continue**.
- **Expected Outcome:** Last-name validation error appears.
- **Success Criteria:** Missing last name is correctly blocked.
- **Failure Conditions:** Flow proceeds or wrong validation message.

### E5. Checkout validation when postal code is missing
- **Assumption:** Fresh session; user at checkout info page with cart item(s).
- **Steps:**
  1. Enter valid first and last name.
  2. Leave postal code blank.
  3. Click **Continue**.
- **Expected Outcome:** Postal-code validation error appears.
- **Success Criteria:** Missing postal code is correctly blocked.
- **Failure Conditions:** Flow proceeds or wrong validation message.

### E6. Cancel checkout from information page
- **Assumption:** Fresh session; user at checkout info page with cart item(s).
- **Steps:**
  1. Click **Cancel**.
- **Expected Outcome:** User returns to cart page; cart contents unchanged.
- **Success Criteria:** Cancel exits checkout safely.
- **Failure Conditions:** Wrong redirect or cart state loss.

### E7. Checkout overview shows correct items and calculations
- **Assumption:** Fresh session; user has multiple known-price items and submits valid info.
- **Steps:**
  1. Reach checkout overview page.
  2. Verify item names/prices match cart selections.
  3. Verify subtotal equals sum of item prices.
  4. Verify displayed total equals subtotal + tax shown.
- **Expected Outcome:** Overview data and arithmetic are consistent.
- **Success Criteria:** No mismatch in items or price calculations.
- **Failure Conditions:** Any item/tax/total discrepancy.

### E8. Complete checkout successfully
- **Assumption:** Fresh session; user on checkout overview page with valid data.
- **Steps:**
  1. Click **Finish**.
- **Expected Outcome:** Order confirmation page appears with completion message.
- **Success Criteria:** Checkout completes end-to-end.
- **Failure Conditions:** Confirmation missing or flow interrupted.

### E9. Post-checkout cart reset
- **Assumption:** Fresh session; user has just completed checkout.
- **Steps:**
  1. Navigate to cart page after completion.
- **Expected Outcome:** Cart is empty; cart badge is cleared.
- **Success Criteria:** Order completion resets cart state.
- **Failure Conditions:** Residual items remain after completed order.

---

## F. Session, Menu, and Error-Resilience

### F1. Side menu opens and exposes expected options
- **Assumption:** Fresh session; user logged in.
- **Steps:**
  1. Open side menu.
- **Expected Outcome:** Menu presents core options (e.g., all items, about, logout, reset app state).
- **Success Criteria:** Menu opens reliably and options are clickable.
- **Failure Conditions:** Menu does not open or options are unusable.

### F2. Reset app state clears cart and UI item state
- **Assumption:** Fresh session; user logged in with items in cart.
- **Steps:**
  1. Add multiple items.
  2. Open side menu and click **Reset App State**.
  3. Return to inventory and cart.
- **Expected Outcome:** Cart is empty, badge cleared, and item buttons return to default add state.
- **Success Criteria:** Reset consistently restores default in-session state.
- **Failure Conditions:** Any stale cart/button state remains.

### F3. Direct access to checkout without cart items
- **Assumption:** Fresh session; user logged in with empty cart.
- **Steps:**
  1. Open cart page.
  2. Attempt to start checkout.
- **Expected Outcome:** Behavior is stable (either blocked with clear UX or allowed with empty-flow handling, per app behavior).
- **Success Criteria:** No crash/broken page; behavior remains consistent across runs.
- **Failure Conditions:** Unhandled error or inconsistent behavior.

### F4. Error banner dismiss interaction on login validation error
- **Assumption:** Fresh session on login page.
- **Steps:**
  1. Trigger login validation error (blank submit).
  2. Dismiss error banner using close control.
- **Expected Outcome:** Error banner closes and page remains functional.
- **Success Criteria:** User can recover and continue interaction.
- **Failure Conditions:** Error cannot be dismissed or UI becomes unstable.

---

## 6) Execution Notes

- Scenarios are intentionally independent and can run in any order.
- Prefer deterministic selectors and assertions if automating with Playwright.
- Capture defects with scenario ID references (e.g., `E7`) for triage clarity.
- Recommended execution order for smoke: `A1`, `B1`, `D1`, `E1`, `E8`, `A6`.
- Recommended full regression: Execute all scenarios `A1` to `F4`.
