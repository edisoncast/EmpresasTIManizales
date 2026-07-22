import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 667 },
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];
const paths = ['/', '/empresas', '/personas', '/ecosistema', '/decadas/1990-1999'];

test.describe('Responsive', () => {
  for (const path of paths) {
    test(`sin overflow horizontal en ${path}`, async ({ page }) => {
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto(path);
        // El documento no debe desbordar horizontalmente (tolerancia de 1px).
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow, `overflow en ${viewport.width}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test('el buscador global es visible en la home sin abrir modales', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('#global-search-input')).toBeVisible();
  });

  test('controles táctiles principales tienen al menos 44px en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/empresas');
    const controls = page.locator('header summary, [data-search-input], select[data-facet-select]');
    for (let index = 0; index < (await controls.count()); index++) {
      const box = await controls.nth(index).boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });
});
