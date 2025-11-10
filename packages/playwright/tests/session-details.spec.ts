import { expect, test } from '@playwright/test';

test.describe('Session Details Page', () => {
  test('should create session, join live session, and view details', async ({ page }) => {
    // Step 1: Create a new session from home
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

    // Create new session
    const newSessionButton = page.getByRole('button', { name: 'New Session' });
    await newSessionButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    
    const sessionNameInput = page.getByLabel('Session Name');
    await sessionNameInput.fill('Session Details Test');
    
    await page.getByRole('button', { name: 'Create Session' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

    // Step 2: Wait for session card and navigate to live session
    await page.waitForSelector('[data-testid="session-card"]', { timeout: 10000 });
    const firstSessionCard = page.locator('[data-testid="session-card"]').first();
    await firstSessionCard.click();

    // Wait for live session page
    await page.waitForURL(/\/live-session\/(session_\d+)/, { timeout: 5000 });
    const sessionUid = page.url().match(/\/live-session\/(session_\d+)/)?.[1];
    
    if (!sessionUid) {
      test.skip();
      return;
    }

    // Wait for live session to load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('canvas')).toBeVisible({ timeout: 10000 });

    // Take screenshot of live session
    await page.screenshot({ path: 'tests/screenshots/live-session-before-details.png', fullPage: true });

    // Step 3: Navigate to session details page
    // We can navigate directly using the URL pattern
    await page.goto(`/sessions/${sessionUid}`);
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
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

    // Create new session
    const newSessionButton = page.getByRole('button', { name: 'New Session' });
    await newSessionButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    
    await page.getByLabel('Session Name').fill('Summary Test');
    await page.getByRole('button', { name: 'Create Session' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

    // Navigate to live session first
    await page.waitForSelector('[data-testid="session-card"]', { timeout: 10000 });
    const sessionUid = await page.locator('[data-testid="session-card"]').first().getAttribute('data-session-uid');
    
    if (!sessionUid) {
      // Extract from URL after clicking
      await page.locator('[data-testid="session-card"]').first().click();
      await page.waitForURL(/\/live-session\/(session_\d+)/, { timeout: 5000 });
      const match = page.url().match(/\/live-session\/(session_\d+)/);
      if (!match) {
        test.skip();
        return;
      }
      const uid = match[1];
      await page.goto(`/sessions/${uid}`);
    } else {
      await page.goto(`/sessions/${sessionUid}`);
    }

    await page.waitForLoadState('networkidle');

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


