import { test, expect } from '@playwright/test';
import { test as baseTest, expect as baseExpect } from './fixtures/base-page';

// dotenv.config();

baseTest('home page has correct content', async ({ page }) => {
  // Check for the subtitle
  const subtitle = await page.locator('p.text-brown-600');
  await baseExpect(subtitle).toHaveText('Your personal coffee bean collection');

  // Verify the hero section heading
  const heroHeading = await page.locator('h2');
  await baseExpect(heroHeading).toHaveText('Your Coffee Journey');

  // Check that buttons are present
  await baseExpect(page.getByText('Browse All Beans')).toBeVisible();
  await baseExpect(page.getByText('Add New Bean')).toBeVisible();
});

baseTest('navigation buttons work correctly', async ({ page }) => {
  // Click the Browse All Beans button and check navigation
  await page.getByText('Browse All Beans').click();
  await baseExpect(page).toHaveURL(/\/beans$/);
});

test.describe('BrewNotes Homepage', () => {
  test('should navigate to Home page when Home link is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Home');
    await expect(page).toHaveURL('/');
  });

  test('should navigate to Add Bean page when Add Bean link is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Add Bean');
    await expect(page).toHaveURL('/beans/new');
  });

  test.only('should navigate to Browse All Beans page when button is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Browse All Beans');
    await expect(page).toHaveURL('/beans');
  });

  test('should navigate to Add New Bean page when button is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Add New Bean');
    await expect(page).toHaveURL('/beans/new');
  });

  test('should display main content correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('BrewNotes');
    await expect(
      page.locator('text=Your personal coffee bean collection')
    ).toBeVisible();
    await expect(page.locator('footer')).toHaveText(
      'BrewNotes - Track your coffee journey'
    );
  });
});
