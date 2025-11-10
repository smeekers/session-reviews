import { expect, test } from '@playwright/test';

test.describe('Live Session Page', () => {
  test('should load live session page from home', async ({ page }) => {
    // Start from home and create a new session
    await page.goto('/');

    // Wait for page to load
    await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

    // Create a new session
    const newSessionButton = page.getByRole('button', { name: 'New Session' });
    await newSessionButton.click();

    // Wait for dialog and fill in session name
    await expect(page.getByRole('dialog')).toBeVisible();
    const sessionNameInput = page.getByLabel('Session Name');
    await sessionNameInput.fill('Live Session Test');
    
    // Create the session
    await page.getByRole('button', { name: 'Create Session' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

    // Wait for session card to appear and click it
    await page.waitForSelector('[data-testid="session-card"]', { timeout: 10000 });
    const firstSessionCard = page.locator('[data-testid="session-card"]').first();
    await firstSessionCard.click();

    // Wait for navigation to live session
    await page.waitForURL(/\/live-session\/session_\d+/, { timeout: 5000 });
    await page.waitForLoadState('networkidle');

    // Verify we're on the live session page
    // The page should have a whiteboard and webcam panel
    await expect(page.locator('canvas')).toBeVisible({ timeout: 10000 });

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/live-session-full.png', fullPage: true });
  });
});

