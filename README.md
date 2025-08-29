# Cypress E2E Framework – Beckett (TypeScript)

## Goal
This repository contains an end‑to‑end (E2E) Cypress framework prepared for a recruitment assignment.  
It automates the **guest CARDS order flow** on [beckett.com](https://beckett.com/) and stops at the **Checkout** screen (no payment is performed).

---

## Test Scenario (happy path)
1. Open `https://beckett.com/`.
2. Start submission → **Submit → CARDS → Continue as Guest**.
3. Select service: **Standard**.
4. Add **5 cards**:
   - `Quantity = 1` for each card.
   - `Declared Value` grows per card: **$100, $200, $300, $400, $500**.
   - For the **first card** tick **Oversized Card ($8)**.
5. Proceed, fill **Shipping Address** (generated with Faker).
6. Choose **Return Shipping: International ($64)**.
7. Accept required checkboxes (Terms of Service, Expiration Policy; Newsletter optional).
8. Click **Checkout** (end of test).
9. Verify key assertions for cards, values, and shipping details.

---

## Project Structure (POM)
```
root
   cypress/
   ├─ components/                 # Small, reusable UI pieces (e.g., LoginModalComponent)
   ├─ constants/                  # Application constants: base URL(s) and other fixed values (route paths, API endpoints)
   ├─ pages/                      # Page Objects (BasePage, SubmitPage, CardsPage, ShippingPage, ReviewPage, PaymentPage)
   ├─ reports/                    # Mochawesome JSON & HTML reports
   ├─ support/                    # Cypress e2e.ts file
   ├─ types/                      # Types & enums (UiText, CardNames, ShippingAddress, etc.)
   ├─ utils/                      # Helpers, e.g., DataGenerator (Faker)
└─ tests/                         # Spec files (e.g., checkout-five-carts.spec.ts)

```
Key design:
- **Page Object Model (POM)** organizes tests by pages/components; each page exposes high-level actions (e.g., `fillShipping()`, `submitOrder()`), hides locators, and keeps specs readable and maintainable.
- **BasePage / BaseComponent** encapsulate safe actions: `safeClick`, `safeType`, `safeSelect`, `safeCheck`, and `find`.
- **Enums** (`UiText`, `CardNames`) centralize UI strings and card names.
- **DataGenerator (Faker)** provides realistic shipping addresses.
- **Selectors** prefer `data-test-id` and stable semantic hooks; text-based fallbacks

---

## Tech Stack
- **Cypress** `^14.5.4`
- **TypeScript** `^5.x`
- **@faker-js/faker** – test data generation
- **Mochawesome** + **mochawesome-merge** + **mochawesome-report-generator** – reporting

---

## Requirements
- **Node.js** = `23.9.0`
- macOS/Linux/Windows (CI runs on Ubuntu runners).  
- Chrome/Firefox/Edge installed locally if you want to run those browser targets.

---

## Installation
```bash
# clone the repo
git clone https://github.com/Stawowcz/tukano-main.git
cd tukano-main

# install dependencies
npm install
# (or) npm install
```
---

## How to Run
### Interactive runner (GUI)
```bash
npm run cy:open
```

### Specific browsers
```bash
npm run cy:chrome
npm run cy:firefox
npm run cy:edge
```

### All browsers sequentially
```bash
npm run cy:all
```
---

## Reporting (Mochawesome)
The project is configured to produce per‑browser **JSON** reports and then merge them into a single **HTML** report.

```bash
# then merge + create HTML
npm run report
```

**Typical flow:**
```bash
# run in one or more browsers first
npm run cy:all

# then merge + create HTML
npm run report
```

Outputs:
- Per‑browser JSON: `cypress/reports/mochawesome/mochawesome-*.json`
- Merged JSON: `cypress/reports/mochawesome.json`
- Final HTML: `cypress/reports/html/mochawesome.html`

> If merging fails with “no report files”, ensure test runs completed and produced JSON files in `cypress/reports/*/`.

---

## Environment Variables & Fixtures
- No external secrets are required.
- No fixtures are strictly needed; dynamic data comes from Faker.
- Base URL is set via `cypress.config.*`

---

## Troubleshooting
- **Retries**: consider enabling `retries` in `cypress.config` for CI flakiness.
- **Overlays/Popups**: when 3rd-party overlays block elements, use `{ force: true }` (documented in tests/pages).
- **Browser not found**: install the browser locally (Chrome/Firefox/Edge) or switch to a supported one.

---
