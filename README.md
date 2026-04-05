# AI-Test-Automation

A modern test automation framework built with **Playwright** and **AI agents**, designed to validate end-to-end user flows with minimal manual maintenance. This project demonstrates how AI-assisted testing can scale quality assurance across complex web applications.

---

## What This Project Does

This framework automates end-to-end testing of a full e-commerce web application (SauceDemo) covering:

- **Authentication** — valid login, locked-out users, blank field validation
- **Inventory & Navigation** — product listing, sorting (A–Z, Z–A, price low/high)
- **Cart Management** — add/remove single and multiple products, cart state persistence across navigation
- **Checkout Flow** — full happy path, field validation, postal code edge cases, cancellation at each step
- **Product Detail Pages** — open, verify, add to cart from detail view
- **Session & Browser Behavior** — session persistence, browser back navigation integrity
- **Logout** — side menu logout flow

22 test specs. All written in TypeScript. All runnable in CI via GitHub Actions.

---

## How AI Is Used

This project goes beyond standard Playwright scripting by integrating **AI agents** directly into the testing workflow:

- **`.playwright-mcp/`** — MCP (Model Context Protocol) server integration, allowing AI models to interact with the browser programmatically. This enables agents to reason about UI state, generate test actions, and assist in exploratory testing.
- **`agents/`** — Custom agent definitions that can autonomously navigate, interact, and validate application behavior.
- **`specs/saucedemo-test-plan.md`** — AI-generated test plan used as the source of truth for what scenarios to cover.
- **`mcp.json`** — Configuration for the MCP server connecting Claude (or other LLMs) to the Playwright browser context.

The result: test coverage that is faster to write, easier to extend, and capable of adapting to UI changes with AI assistance.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation & test runner |
| TypeScript | Type-safe test authoring |
| GitHub Actions | CI/CD pipeline |
| MCP (Model Context Protocol) | AI-to-browser communication layer |
| Claude / LLM Agents | Test generation & exploratory assistance |

---

## Project Structure

AI-Test-Automation/
├── .github/
│   └── workflows/
│       ├── copilot-setup-steps.yml
│       └── playwright.yml          # CI pipeline — runs on push/PR to main
├── Playwright/
│   ├── .playwright/                # Playwright internal config & cache
│   ├── .playwright-mcp/            # MCP server for AI-to-browser communication
│   ├── .vscode/
│   │   └── mcp.json                # VS Code MCP server configuration
│   ├── specs/
│   │   ├── README.md
│   │   └── saucedemo-test-plan.md  # AI-generated test plan (source of truth)
│   ├── test-results/               # Raw test output
│   ├── playwright-report/          # HTML report (uploaded as CI artifact)
│   ├── tests/
│   │   ├── helpers/                # Shared utilities and page abstractions
│   │   ├── 01-successful-login-with-valid-credentials.spec.ts
│   │   ├── 02-login-blocked-for-locked-out-user.spec.ts
│   │   ├── 03-login-validation-with-blank-username-and-password.spec.ts
│   │   ├── 04-inventory-page-shows-core-controls-after-login.spec.ts
│   │   ├── 05-sort-products-by-name-a-to-z.spec.ts
│   │   ├── 06-sort-products-by-name-z-to-a.spec.ts
│   │   ├── 07-sort-products-by-price-low-to-high.spec.ts
│   │   ├── 08-sort-products-by-price-high-to-low.spec.ts
│   │   ├── 09-add-a-single-product-to-cart-from-inventory.spec.ts
│   │   ├── 10-add-multiple-products-to-cart.spec.ts
│   │   ├── 11-remove-a-product-from-inventory-page.spec.ts
│   │   ├── 12-remove-a-product-from-cart-page.spec.ts
│   │   ├── 13-open-product-detail-page-and-verify-product-info.spec.ts
│   │   ├── 14-add-product-to-cart-from-product-detail-page.spec.ts
│   │   ├── 15-start-checkout-with-items-in-cart.spec.ts
│   │   ├── 16-checkout-validation-with-all-fields-blank.spec.ts
│   │   ├── 17-checkout-validation-when-postal-code-is-missing.spec.ts
│   │   ├── 18-complete-checkout-successfully.spec.ts
│   │   ├── 19-cancel-checkout-from-information-page.spec.ts
│   │   ├── 20-logout-from-side-menu.spec.ts
│   │   ├── 21-cart-state-persists-during-in-session-navigation.spec.ts
│   │   └── 22-browser-back-navigation-does-not-break-app-state.spec.ts
│   ├── .gitignore
│   ├── mcp.json
│   ├── package-lock.json
│   ├── package.json
│   └── playwright.config.ts
├── agents/                         # AI agent definitions
├── .gitignore
└── README.md

---

## Running Tests
```bash
# Install dependencies
cd Playwright
npm install

# Install browsers
npx playwright install --with-deps

# Run all tests
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run a specific spec
npx playwright test tests/18-complete-checkout-successfully.spec.ts
```

---

## CI/CD

Tests run automatically on every push and pull request to `main`/`master` via GitHub Actions. The HTML report is uploaded as a build artifact after each run for review without needing a local environment.

---

## Why This Approach

Traditional test automation breaks when UIs change and requires constant manual upkeep. By combining Playwright's reliability with AI agents via MCP, this framework can:

- Generate new test cases from a plain-text test plan
- Explore application flows autonomously
- Reduce the time between feature delivery and test coverage

This is how modern QA scales.