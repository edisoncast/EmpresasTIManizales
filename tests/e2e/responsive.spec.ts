import { test, expect } from '@playwright/test';

const widths = [320, 375, 768, 1024, 1440];
const paths = ['/', '/empresas', '/personas', '/ecosistema'];

test.describe('Responsive', () => {
  for (const path of paths) {
    test(`sin overflow horizontal en ${path}`, async ({ page }) => {
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        // El documento no debe desbordar horizontalmente (tolerancia de 1px).
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `overflow en ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('el buscador global es visible en la home sin abrir modales', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('#global-search-input')).toBeVisible();
  });
});
