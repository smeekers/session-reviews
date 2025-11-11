import { Page, expect } from '@playwright/test';

/**
 * Creates a new session and waits for the session card with the given name to appear.
 * Returns the session UID extracted from the card or URL.
 */
export async function createSessionAndWaitForCard(
  page: Page,
  sessionName: string
): Promise<string> {
  // Navigate to home if not already there
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

  // Create new session
  const newSessionButton = page.getByRole('button', { name: 'New Session' });
  await newSessionButton.click();
  await expect(page.getByRole('dialog')).toBeVisible();

  // Fill in session name
  const sessionNameInput = page.getByLabel('Session Name');
  await sessionNameInput.fill(sessionName);

  // Create the session
  await page.getByRole('button', { name: 'Create Session' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

  // Wait for the specific session card with the given name to appear
  // The session name is displayed in a Typography element with variant="h6"
  const sessionCard = page
    .locator('[data-testid="session-card"]')
    .filter({ hasText: sessionName });

  await expect(sessionCard).toBeVisible({ timeout: 10000 });

  // Get the session UID from the card's click handler by intercepting navigation
  // or by extracting it from the card's data attributes if available
  // For now, we'll click and extract from URL
  await sessionCard.click();
  
  // Wait for navigation - could be to live session or session details depending on status
  await page.waitForURL(/\/live-session\/(session_\d+)|\/sessions\/(session_\d+)/, { timeout: 5000 });
  
  const url = page.url();
  const match = url.match(/\/(?:live-session|sessions)\/(session_\d+)/);
  
  if (!match || !match[1]) {
    throw new Error(`Could not extract session UID from URL: ${url}`);
  }

  return match[1];
}

/**
 * Creates a new session, ends it, waits for processing, and navigates to its details page.
 * Returns the session UID.
 */
export async function createSessionAndNavigateToDetails(
  page: Page,
  sessionName: string
): Promise<string> {
  // Navigate to home if not already there
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Session Reviews' })).toBeVisible();

  // Create new session
  const newSessionButton = page.getByRole('button', { name: 'New Session' });
  await newSessionButton.click();
  await expect(page.getByRole('dialog')).toBeVisible();

  // Fill in session name
  const sessionNameInput = page.getByLabel('Session Name');
  await sessionNameInput.fill(sessionName);

  // Create the session
  await page.getByRole('button', { name: 'Create Session' }).click();
  await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

  // Wait for the specific session card with the given name to appear
  const sessionCard = page
    .locator('[data-testid="session-card"]')
    .filter({ hasText: sessionName });

  await expect(sessionCard).toBeVisible({ timeout: 10000 });

  // Click the card to navigate to live session
  await sessionCard.click();
  
  // Wait for navigation to live session
  await page.waitForURL(/\/live-session\/(session_\d+)/, { timeout: 5000 });
  
  const url = page.url();
  const match = url.match(/\/live-session\/(session_\d+)/);
  
  if (!match || !match[1]) {
    throw new Error(`Could not extract session UID from URL: ${url}`);
  }

  const sessionUid = match[1];
  
  // Wait for live session to load
  await page.waitForLoadState('networkidle');
  
  // Start recording first (required before ending session)
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
  
  return sessionUid;
}

