import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL);
});

test.describe('App', () => {
  test('should show info modal on first-time load', async ({ page }) => {
    const modal = page.locator('#info-modal');
    await expect(modal).toHaveClass('appear');

    await page.reload();
    await expect(modal).toHaveClass('appear');

    const letsPlayButton = page.locator("text=Let's Play!");
    await letsPlayButton.click();
    await expect(modal).toHaveCSS('opacity', '0');

    await page.reload();
    await expect(modal).toHaveCSS('opacity', '0');
  });
});
