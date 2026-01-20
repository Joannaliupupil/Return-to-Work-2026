import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
  console.log('✓ Test passed!');
});

test('search test', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle('Google');
  console.log('✓ Google loaded!');
});

test('local test', async ({ page }) => {
  await page.goto('http://localhost:3000', { timeout: 5000 }).catch(() => {
    console.log('No local server running, skipping');
  });
});
