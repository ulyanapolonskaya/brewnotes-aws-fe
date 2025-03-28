import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.VITE_FE_URL,
    trace: 'on-first-retry',
    headless: !!process.env.CI, // Run in headless mode in CI
  },
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html'], ['junit']], // Add JUnit reporter for CI systems
  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
