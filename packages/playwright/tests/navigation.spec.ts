import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Wait for home page to load
    await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

    // Take screenshot of home
    await page.screenshot({ path: 'tests/screenshots/navigation-home.png' });

    // Try to navigate to a session if available
    await page.waitForSelector('[data-testid="session-card"]', { timeout: 10000 });
    const sessionCard = page.locator('[data-testid="session-card"]').first();
    
    if (await sessionCard.count() > 0) {
      await sessionCard.click();
      await page.waitForURL(/\/sessions\/session_\d+/, { timeout: 5000 });
      await page.waitForLoadState('networkidle');

      // Take screenshot of session details
      await page.screenshot({ path: 'tests/screenshots/navigation-session-details.png' });

      // Navigate back using breadcrumb
      const breadcrumbLink = page.getByRole('link', { name: 'Sessions' });
      if (await breadcrumbLink.isVisible()) {
        await breadcrumbLink.click();
        await page.waitForURL('/', { timeout: 5000 });
        await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();
      }
    }
  });
});

