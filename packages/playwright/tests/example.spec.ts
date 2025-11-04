import { expect, test } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check that the main heading is visible
  await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

  // Check that the welcome message is visible
  await expect(page.getByText('Welcome to the Session Reviews application.')).toBeVisible();
});

test('page has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Session Reviews');
});

