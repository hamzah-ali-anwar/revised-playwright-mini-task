// @ts-check
const { defineConfig, devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  // timeout: 50000,


  
  reporter: 'html',
  
  use: {

    trace: 'retain-on-failure',
    headless: false, // Display the browser UI
    screenshot: 'on',
    launchOptions: {
    // slowMo: 1000,   // Slows down operations by 1000ms

      }
  },

    

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  
  ],

});
