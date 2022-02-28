import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL + '/#NM8mn');
  const letsPlayButton = page.locator("text=Let's Play!");
  await letsPlayButton.click();
});

test.describe('Gameplay', () => {
  test('play valid idiom', async ({ page }) => {
    await page.click('#keyboard :text("层")');
    await page.click('#keyboard :text("出")');
    await page.click('#keyboard :text("不")');
    await page.click('#keyboard :text("穷")');

    const tiles = page.locator('.row:first-child > .letter');
    await expect(tiles).toHaveText([
      '层(céng)',
      '出(chū)',
      '不(bù)',
      '穷(qióng)',
    ]);

    await page.keyboard.press('Enter');
    const classRegex = /lettered.*🌈/i;
    await expect(tiles).toHaveClass(Array(4).fill(classRegex));
  });

  test('play invalid idiom', async ({ page }) => {
    await page.click('#keyboard :text("层")');
    await page.click('#keyboard :text("层")');
    await page.click('#keyboard :text("层")');
    await page.click('#keyboard :text("层")');

    const tiles = page.locator('.row:first-child > .letter');
    await expect(tiles).toHaveText([
      '层(céng)',
      '层(céng)',
      '层(céng)',
      '层(céng)',
    ]);

    await page.keyboard.press('Enter');
    await expect(tiles).toHaveClass(Array(4).fill(/lettered/i));

    const row = page.locator('.row:first-child');
    await expect(row).toHaveClass(/error/i);
  });

  test('lost game', async ({ page }) => {
    // No answers in this list
    const idioms = [
      '层出不穷',
      '坚持不懈',
      '惊魂不定',
      '惊魂未定',
      '名不虚传',
      '默化潜移',
    ];
    const board = page.locator('#board');
    const rows = board.locator('.row');

    for (let i = 0; i < idioms.length; i++) {
      expect(board).not.toHaveClass(/lost|won/i);

      const idiom = idioms[i];
      const text = idiom.split('');
      for (const letter of text) {
        await page.click(`#keyboard :text("${letter}")`);
      }
      await page.keyboard.press('Enter');

      const tiles = rows.nth(i).locator('.letter');
      await expect(tiles).toHaveClass(Array(4).fill(/lettered/i));
    }

    expect(board).toHaveClass(/lost/i);
    const modal = page.locator('#modal');
    await expect(modal).toHaveClass(/appear/i);
  });

  test('won game', async ({ page }) => {
    // No answers in this list
    const idioms = [
      '层出不穷',
      '坚持不懈',
      '惊魂不定',
      '惊魂未定',
      '名不虚传',
      '坚定不移',
    ];
    const board = page.locator('#board');
    const rows = board.locator('.row');

    for (let i = 0; i < idioms.length; i++) {
      expect(board).not.toHaveClass(/lost|won/i);

      const idiom = idioms[i];
      const text = idiom.split('');
      for (const letter of text) {
        await page.click(`#keyboard :text("${letter}")`);
      }
      await page.keyboard.press('Enter');

      const tiles = rows.nth(i).locator('.letter');
      await expect(tiles).toHaveClass(Array(4).fill(/lettered/i));
    }

    expect(board).toHaveClass(/won/i);
    const modal = page.locator('#modal');
    await expect(modal).toHaveClass(/appear/i);
  });
});
