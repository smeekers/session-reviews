import { expect, test } from '@playwright/test';
import { createSessionAndWaitForCard, createSessionAndNavigateToDetails } from './helpers';

test.describe('Session Details Page', () => {
  test('should create session, join live session, and view details', async ({ page }) => {
    // Step 1: Create a new session and navigate to live session
    await createSessionAndWaitForCard(page, 'Session Details Test');

    // Wait for live session to load - check for Share button or webcam panel
    await page.waitForLoadState('networkidle');
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

    // Take screenshot of live session
    await page.screenshot({ path: 'tests/screenshots/live-session-before-details.png', fullPage: true });

    // Step 2: Start recording, then end the session and navigate to details
    const startRecordingButton = page.getByRole('button', { name: /Start Recording/i });
    await startRecordingButton.click();
    
    // Wait a moment for recording to start
    await page.waitForTimeout(1000);
    
    // End the session (will auto-navigate)
    const endSessionButton = page.getByRole('button', { name: /End Session/i });
    await endSessionButton.click();
    
    // Wait for automatic navigation to home after session ends
    await page.waitForURL('/', { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Wait for the banner with "View Now" button to appear (indicates session is processed)
    const viewNowButton = page.getByRole('button', { name: /View Now/i });
    await expect(viewNowButton).toBeVisible({ timeout: 40000 });
    
    // Click the "View Now" button to navigate to details
    await viewNowButton.click();
    await page.waitForURL(/\/sessions\/(session_\d+)/, { timeout: 5000 });
    await page.waitForLoadState('networkidle');

    // Wait for session details to load
    await expect(
      page.getByRole('heading', { level: 4 }).or(page.getByText('Add a title...'))
    ).toBeVisible({ timeout: 5000 });

    // Take screenshot of session details
    await page.screenshot({ path: 'tests/screenshots/session-details.png', fullPage: true });
  });

  test('should display session summary if available', async ({ page }) => {
    // Create a new session and navigate to details
    await createSessionAndNavigateToDetails(page, 'Summary Test');

    // Wait for summary section (may not be available for new sessions)
    const summaryHeading = page.getByRole('heading', { name: 'Summary' });
    if (await summaryHeading.isVisible({ timeout: 5000 })) {
      await page.screenshot({ path: 'tests/screenshots/session-summary.png', fullPage: true });
    }
  });

  test('should display AI suggestions if available', async ({ page }) => {
    // For this test, we'll use an existing completed session from seed data
    // since new sessions won't have AI suggestions yet
    await page.goto('/');

    // Wait for sessions to load
    await page.waitForSelector('[data-testid="session-card"]', { timeout: 10000 });

    // Find a completed/reviewed session (they should have AI suggestions)
    const sessionCards = page.locator('[data-testid="session-card"]');
    const cardCount = await sessionCards.count();
    
    let foundSession = false;
    for (let i = 0; i < cardCount; i++) {
      const card = sessionCards.nth(i);
      const text = await card.textContent();
      // Completed or reviewed sessions should have different action text
      if (text && (text.includes('View Details') || text.includes('Review'))) {
        await card.click();
        await page.waitForURL(/\/sessions\/session_\d+/, { timeout: 5000 });
        foundSession = true;
        break;
      }
    }

    if (!foundSession) {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle');

    // Wait for AI suggestions section
    const suggestionsHeading = page.getByRole('heading', { name: 'AI Suggestions' });
    if (await suggestionsHeading.isVisible({ timeout: 5000 })) {
      await page.screenshot({ path: 'tests/screenshots/ai-suggestions.png', fullPage: true });
    }
  });
});


