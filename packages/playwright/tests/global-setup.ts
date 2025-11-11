import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';

async function globalSetup(config: FullConfig) {
  // Take a screenshot of the home page before any tests run
  // This ensures we capture the initial state before other tests modify it
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto(config.projects[0].use.baseURL || 'http://localhost:3000');
    await page.waitForSelector('[data-testid="session-card"], h1', { timeout: 30000 });
    
    const screenshotPath = path.join(__dirname, 'screenshots', 'navigation-home.png');
    await page.screenshot({ path: screenshotPath });
  } catch (error) {
    console.warn('Could not take initial home page screenshot:', error);
  } finally {
    await browser.close();
  }
}

export default globalSetup;

