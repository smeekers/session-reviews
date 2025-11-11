import { expect, test } from '@playwright/test';
import { createSessionAndNavigateToDetails } from './helpers';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Wait for home page to load
    await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

    // Note: Initial home page screenshot is taken in global-setup.ts
    // This ensures it captures the state before other tests modify it

    // Create a new session and navigate to its details page
    // This ensures we're testing with a known session state
    await createSessionAndNavigateToDetails(page, 'Navigation Test');

    // Verify we're on the session details page
    await page.waitForLoadState('networkidle');
    await expect(
      page.getByRole('heading', { level: 4 }).or(page.getByText('Add a title...'))
    ).toBeVisible({ timeout: 5000 });

    // Take screenshot of session details
    await page.screenshot({ path: 'tests/screenshots/navigation-session-details.png' });

    // Navigate back using breadcrumb
    const breadcrumbLink = page.getByRole('link', { name: 'Sessions' });
    if (await breadcrumbLink.isVisible()) {
      await breadcrumbLink.click();
      await page.waitForURL('/', { timeout: 5000 });
      await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();
    }
  });
});

