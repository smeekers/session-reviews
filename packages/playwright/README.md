# Playwright Tests

Simple end-to-end tests with screenshots for the Session Reviews application.

## Setup

Tests are already configured. The backend will automatically seed fresh data on startup, so each test run starts with a clean state.

## Running Tests

```bash
# Run all tests
pnpm test:e2e

# Run tests in UI mode
pnpm --filter playwright test:ui

# Run tests in debug mode
pnpm --filter playwright test:debug

# Update snapshots (if using visual regression)
pnpm --filter playwright test:update-snapshots
```

## Test Structure

- `home.spec.ts` - Tests for the home page (sessions list), including creating a new session and navigating to live session
- `live-session.spec.ts` - Tests for the live session page
- `session-details.spec.ts` - Tests for session details page (creates new session, joins live session, then views details)
- `navigation.spec.ts` - Tests for navigation between pages

## Screenshots

Screenshots are saved to `tests/screenshots/` directory:
- `home-page.png` - Full page screenshot of home
- `home-with-new-session.png` - Home page after creating a new session
- `new-session-dialog.png` - New session creation dialog
- `live-session.png` - Live session page
- `live-session-full.png` - Full live session page
- `live-session-before-details.png` - Live session before navigating to details
- `session-details.png` - Full page screenshot of session details
- `session-summary.png` - Session summary section
- `ai-suggestions.png` - AI suggestions section
- `navigation-*.png` - Navigation flow screenshots

## Notes

- Tests wait for data to load before taking screenshots
- Tests skip if no sessions are available (seeded data should always be present)
- Backend automatically seeds fresh data on startup, ensuring consistent test state
- **Deterministic Content**: When `PLAYWRIGHT_TEST=true`, the backend uses deterministic index-based selection (modulo operation) for mock AI content generation, ensuring consistent summaries and suggestions across test runs. Each session gets unique but predictable content based on its session number. Session dates will still vary based on current time, but the content structure is deterministic.
- **Test Flow**: The session details tests create a brand new session (to avoid whiteboard persistence issues), join the live session page, and then navigate to the details page. This ensures a clean whiteboard state for each test run.

