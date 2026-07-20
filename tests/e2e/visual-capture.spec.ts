import { mkdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const desktopPages = [
  ['home', '/'],
  ['empresas', '/empresas'],
  ['universidades', '/universidades'],
  ['personas', '/personas'],
  ['ecosistema', '/ecosistema'],
  ['contribuir', '/contribuir'],
  ['detalle', '/empresas/venus-ingenieria-de-software'],
] as const;

test.beforeAll(() => mkdirSync('test-results/screenshots', { recursive: true }));

for (const [name, path] of desktopPages) {
  test(`${name} screenshot desktop`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium');
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.screenshot({
      path: `test-results/screenshots/${name}-desktop.png`,
      fullPage: true,
      animations: 'disabled',
    });
  });
}

test('home screenshot móvil', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium');
  await page.goto('/');
  await page.screenshot({
    path: 'test-results/screenshots/home-mobile.png',
    fullPage: true,
    animations: 'disabled',
  });
});

test('clasificación empresarial screenshot desktop', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium');
  await page.goto('/empresas');
  const overview = page.locator('[data-company-size-overview]');
  await expect(overview).toBeVisible();
  await overview.screenshot({
    path: 'test-results/screenshots/clasificacion-empresarial-desktop.png',
    animations: 'disabled',
  });
});

test('estado vacío y registro pendiente', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium');
  await page.goto('/empresas');
  await page.locator('[data-search-input]').fill('zzz-registro-inexistente-xyz');
  await expect(page.locator('[data-empty-wrapper]')).toBeVisible();
  await page.screenshot({
    path: 'test-results/screenshots/estado-vacio-desktop.png',
    fullPage: true,
    animations: 'disabled',
  });

  await page.goto('/programas/esp-tec-redes-umanizales');
  await expect(page.getByText(/Estado por confirmar|Verificación parcial/i).first()).toBeVisible();
  await page.screenshot({
    path: 'test-results/screenshots/registro-pendiente-desktop.png',
    fullPage: true,
    animations: 'disabled',
  });
});
