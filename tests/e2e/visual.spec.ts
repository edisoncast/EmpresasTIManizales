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
    // El hero responde de entrada qué es el sitio, para quién es y qué se puede hacer.
    await expect(page.getByText('Qué es', { exact: true })).toBeVisible();
    await expect(page.getByText('Para quién', { exact: true })).toBeVisible();
    await expect(page.getByText('Qué puedes hacer', { exact: true })).toBeVisible();
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

  test('la década 1990-1999 cuenta un relato con datos, muestra y vacíos', async ({ page }) => {
    await page.goto('/decadas');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/evolución por décadas/i);
    // Índice: la década publicada enlaza y las demás quedan como investigación en curso.
    await page.getByRole('link', { name: /1990 → 1999/ }).click();
    await expect(page).toHaveURL(/\/decadas\/1990-1999\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /software para operar organizaciones/i,
    );
    // Métricas con contexto y tamaño de muestra visible.
    await expect(page.getByText('Empresas registradas', { exact: true })).toBeVisible();
    await expect(page.getByText(/de 9/).first()).toBeVisible();
    // Línea de tiempo y vacíos reconocidos.
    await expect(page.getByRole('heading', { name: /matrículas por año/i })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /lo que aún no se puede afirmar/i }),
    ).toBeVisible();
    // Fuentes de la investigación enlazadas.
    await expect(page.getByRole('link', { name: /análisis de empresas 1990–1999/i })).toBeVisible();
    // Sin lenguaje de ranking.
    await expect(page.getByText(/las mejores|top \d|más importantes/i)).toHaveCount(0);
  });

  test('programas homónimos se distinguen por su badge de modalidad', async ({ page }) => {
    await page.goto('/programas');
    // Dos registros con el mismo nombre e institución, distinta modalidad.
    const homonyms = page.locator('[data-item]').filter({
      has: page.getByRole('heading', {
        name: 'Técnico Profesional en Programación Web',
        exact: true,
      }),
    });
    await expect(homonyms).toHaveCount(2);
    await expect(homonyms.filter({ hasText: 'Modalidad: Presencial' })).toHaveCount(1);
    await expect(homonyms.filter({ hasText: 'Modalidad: A distancia' })).toHaveCount(1);
    // La faceta separa virtual de a distancia.
    await page.locator('select[data-facet-key="modality"]').selectOption('A distancia');
    expect(await page.locator('[data-item]:visible').count()).toBeGreaterThan(0);
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
