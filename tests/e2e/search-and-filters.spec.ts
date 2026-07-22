import { test, expect } from '@playwright/test';

test.describe('Búsqueda y filtros', () => {
  test('el buscador global devuelve un resultado relevante y navegable', async ({ page }) => {
    await page.goto('/');
    const search = page.locator('#global-search-input');
    await search.fill('Venus ingeniería');
    const result = page.getByRole('link', { name: /Venus Ingenieria De Software/i }).first();
    await expect(result).toBeVisible();
    await result.click();
    await expect(page).toHaveURL(/\/empresas\/venus-ingenieria-de-software\/?$/);
  });

  test('la búsqueda tolera tildes y caracteres especiales', async ({ page }) => {
    await page.goto('/programas');
    const search = page.locator('[data-search-input]');
    await search.fill('ingenieria');
    expect(await page.locator('[data-item]:visible').count()).toBeGreaterThan(0);
    await search.fill('<script>&áéíóú[]');
    await expect(page.locator('[data-empty-wrapper]')).toBeVisible();
    await expect(page.locator('script')).not.toContainText('<script>&áéíóú[]');
  });

  test('combina filtros y limpiar restaura todos los resultados', async ({ page }) => {
    await page.goto('/empresas');
    const total = await page.locator('[data-item]').count();
    await page.locator('select[data-facet-key="city"]').selectOption({ index: 1 });
    await page.locator('select[data-facet-key="category"]').selectOption({ index: 1 });
    const filtered = await page.locator('[data-item]:visible').count();
    expect(filtered).toBeLessThan(total);
    await page.locator('[data-clear-filters]').click();
    await expect(page.locator('[data-count-value]')).toHaveText(String(total));
    await expect(page.locator('[data-item]:visible')).toHaveCount(total);
  });

  test('empresas filtra por década de matrícula con rangos legibles', async ({ page }) => {
    await page.goto('/empresas');
    const select = page.locator('select[data-facet-key="decade"]');
    await expect(select).toBeVisible();
    // Las opciones son rangos por década (ej. 1990–1999, 2020–2026), no años sueltos.
    const options = await select.locator('option:not([value=""])').allTextContents();
    expect(options.length).toBeGreaterThan(0);
    for (const opt of options) expect(opt).toMatch(/^\d{4}–\d{4}$/);
    const total = await page.locator('[data-item]').count();
    await select.selectOption({ index: 1 });
    const filtered = await page.locator('[data-item]:visible').count();
    expect(filtered).toBeGreaterThan(0);
    expect(filtered).toBeLessThan(total);
  });

  test('universidades, programas y personas exponen filtros utilizables', async ({ page }) => {
    for (const path of ['/universidades', '/programas', '/personas']) {
      await page.goto(path);
      const select = page.locator('select[data-facet-select]').first();
      await expect(select).toBeVisible();
      await select.selectOption({ index: 1 });
      expect(await page.locator('[data-item]:visible').count()).toBeGreaterThan(0);
    }
  });
});
