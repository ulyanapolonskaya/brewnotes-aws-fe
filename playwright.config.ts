import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.VITE_FE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: !!process.env.CI, // Run in headless mode in CI
  },
  testDir: './tests/e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
