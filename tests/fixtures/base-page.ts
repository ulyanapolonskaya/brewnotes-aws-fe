import { test as base } from '@playwright/test';

// Define a custom fixture that includes navigation
export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    // Navigate to base URL before each test
    await page.goto(baseURL || 'hhttp://localhost:3000');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(page);
  },
});

export { expect } from '@playwright/test';
