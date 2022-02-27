import { expect, test } from '@playwright/test';

test.describe('Localization', () => {
  test('Load English if English locale', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      locale: 'en-US', // English, US
    });
    const page = await context.newPage();
    await page.goto(baseURL);
    const selector = page.locator('.locale-selector');
    expect(selector).toBeVisible();

    const enLink = page.locator('a[hreflang="en"]');
    expect(enLink).toHaveClass(/selected/i);
    const zhcnLink = page.locator('a[hreflang="zh-CN"]');
    expect(zhcnLink).not.toHaveClass(/selected/i);
  });

  test('Load Chinese if Chinese locale', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      locale: 'zh-CN', // Simplified Chinese
    });
    const page = await context.newPage();
    await page.goto(baseURL);
    const selector = page.locator('.locale-selector');
    expect(selector).toBeVisible();

    const zhcnLink = page.locator('a[hreflang="zh-CN"]');
    expect(zhcnLink).toHaveClass(/selected/i);
    const enLink = page.locator('a[hreflang="en"]');
    expect(enLink).not.toHaveClass(/selected/i);
  });

  test('Load English if for other locale', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      locale: 'ms-MY', // Malay, Malaysia
    });
    const page = await context.newPage();
    await page.goto(baseURL);
    const selector = page.locator('.locale-selector');
    expect(selector).toBeVisible();

    const enLink = page.locator('a[hreflang="en"]');
    expect(enLink).toHaveClass(/selected/i);
    const zhcnLink = page.locator('a[hreflang="zh-CN"]');
    expect(zhcnLink).not.toHaveClass(/selected/i);
  });
});
