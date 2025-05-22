import { test, expect } from '@playwright/test';
import { test as baseTest, expect as baseExpect } from './fixtures/base-page';

// dotenv.config();

baseTest('home page has correct content', async ({ page }) => {
  // Check for the subtitle
  const subtitle = await page.locator('p.text-brown-600');
  await baseExpect(subtitle).toHaveText('Your personal coffee bean collection');

  // Verify the hero section heading
  const heroHeading = await page.locator('h2:has-text("Your Coffee Journey")');
  await baseExpect(heroHeading).toBeVisible();

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

  test('should navigate to Browse All Beans page when button is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Browse All Beans');
    await expect(page).toHaveURL('/beans');
  });

  test.skip('should display modal when Add New Bean button is clicked', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=Add New Bean');
    
    // Check that the modal is displayed
    await expect(page.locator('//div[@role="dialog"]//div[@data-headlessui-state="open"]')).toBeVisible();
  });

  test.skip('should display main content correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('Brew Notes');
    await expect(
      page.locator('text=Your personal coffee bean collection')
    ).toBeVisible();
    await expect(page.locator('footer')).toHaveText(
      'Brew Notes - Track your coffee journey'
    );
  });
});
