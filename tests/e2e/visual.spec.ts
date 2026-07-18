import { test, expect } from '@playwright/test';

test.describe('Estructura visual y contenido', () => {
  test('la home comunica propósito, contexto 2020→2026 y búsqueda', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto('/');
    // Un solo h1.
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/ecosistema tecnológico/i);
    // Contexto histórico visible.
    await expect(page.getByText(/2020 → 2026|iniciado en 2020/i).first()).toBeVisible();
    // Buscador global.
    await expect(page.locator('#global-search-input')).toBeVisible();
    // No debe parecer bolsa de empleo / ranking.
    await expect(page.getByText(/vacantes|bolsa de empleo|top \d|los mejores/i)).toHaveCount(0);

    expect(errors, 'errores de página').toEqual([]);
    await page.screenshot({ path: 'test-results/home.png' });
  });

  const listings = [
    { path: '/empresas', heading: /empresas/i },
    { path: '/universidades', heading: /universidades/i },
    { path: '/personas', heading: /personas que construyen/i },
    { path: '/comunidades', heading: /comunidades/i },
  ];

  for (const l of listings) {
    test(`el listado ${l.path} tiene h1, conteo y fichas`, async ({ page }) => {
      await page.goto(l.path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(l.heading);
      // Conteo de resultados anunciable.
      await expect(page.locator('[data-count]')).toBeVisible();
      // Al menos una ficha.
      await expect(page.locator('[data-item]').first()).toBeVisible();
    });
  }

  test('las fichas muestran estados de verificación con label textual', async ({ page }) => {
    await page.goto('/empresas');
    const badges = page.getByText(
      /Verificado|Verificación parcial|Estado por confirmar|Posiblemente inactivo|Archivo histórico/,
    );
    expect(await badges.count()).toBeGreaterThan(0);
  });

  test('empresas explica y visualiza el tamaño reportado por Cámara de Comercio', async ({
    page,
  }) => {
    await page.goto('/empresas');
    const overview = page.locator('[data-company-size-overview]');
    await expect(
      overview.getByRole('heading', { name: /qué significa el tamaño de una empresa/i }),
    ).toBeVisible();
    await expect(overview).toContainText(/ingresos por\s+actividades ordinarias anuales/i);
    await expect(overview.getByText('Microempresa', { exact: true }).first()).toBeVisible();
    await expect(overview.getByText(/\d+ · \d+([.,]\d+)? %/).first()).toBeVisible();
    await expect(overview.getByRole('link', { name: /decreto 957/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });

  test('la ficha de Venus aparece como verificada', async ({ page }) => {
    await page.goto('/empresas/venus-ingenieria-de-software');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/venus/i);
    await expect(page.getByText('Verificado', { exact: false }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /fuentes/i })).toBeVisible();
  });

  test('seleccionar un filtro oculta realmente las fichas', async ({ page }) => {
    await page.goto('/universidades');
    const total = await page.locator('[data-item]').count();
    // Las fichas ocultas deben desaparecer visualmente (no solo por atributo).
    await page.locator('select[data-facet-key="type"]').selectOption({ index: 1 });
    const visibleCount = await page.locator('[data-item]:visible').count();
    expect(visibleCount).toBeGreaterThan(0);
    expect(visibleCount).toBeLessThan(total);
    await expect(page.locator('[data-count-value]')).toHaveText(String(visibleCount));
  });

  test('estado vacío al buscar algo inexistente', async ({ page }) => {
    await page.goto('/empresas');
    await page.locator('[data-search-input]').fill('zzz-registro-inexistente-xyz');
    await expect(page.locator('[data-empty-wrapper]')).toBeVisible();
    await expect(page.getByText(/no encontramos resultados/i)).toBeVisible();
  });

  test('ecosistema y contribuir cargan con un h1', async ({ page }) => {
    for (const path of ['/ecosistema', '/contribuir']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    }
  });
});
