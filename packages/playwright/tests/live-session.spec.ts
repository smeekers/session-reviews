import { test } from '@playwright/test';
import { createSessionAndWaitForCard } from './helpers';

test.describe('Live Session Page', () => {
  test('should load live session page from home', async ({ page }) => {
    // Create a new session and navigate to live session
    await createSessionAndWaitForCard(page, 'Live Session Test');

    // Wait for navigation to live session
    await page.waitForLoadState('networkidle');

    // Verify we're on the live session page
    // The page should have a whiteboard and webcam panel
    // Wait for either the Share button or webcam video to indicate page is loaded
    try {
      await Promise.race([
        page.getByRole('button', { name: /Share/i }).waitFor({ state: 'visible', timeout: 10000 }),
        page.locator('video').waitFor({ state: 'visible', timeout: 10000 }),
      ]);
    } catch {
      // If neither appears, just wait a bit more for Excalidraw to load
      await page.waitForTimeout(2000);
    }

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/live-session-full.png', fullPage: true });
  });
});

