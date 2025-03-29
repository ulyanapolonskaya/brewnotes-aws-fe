// import { test, expect } from '@playwright/test';
import { test, expect } from '../fixtures/base-page';

// dotenv.config();

test('home page has correct content', async ({ page }) => {
  // Check for the subtitle
  const subtitle = await page.locator('p.text-brown-600');
  await expect(subtitle).toHaveText('Your personal coffee bean collection');

  // Verify the hero section heading
  const heroHeading = await page.locator('h2');
  await expect(heroHeading).toHaveText('Your Coffee Journey');

  // Check that buttons are present
  await expect(page.getByText('Browse All Beans')).toBeVisible();
  await expect(page.getByText('Add New Bean')).toBeVisible();
});

test('navigation buttons work correctly', async ({ page }) => {
  // Click the Browse All Beans button and check navigation
  await page.getByText('Browse All Beans').click();
  await expect(page).toHaveURL(/\/beans$/);
});
