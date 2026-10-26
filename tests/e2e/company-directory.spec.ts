import { test, expect } from '@playwright/test';

test.describe('Directorio de empresas', () => {
  test('pliega la explicación y permite abrirla con teclado', async ({ page }) => {
    await page.goto('/empresas');
    const summary = page.locator('summary', { hasText: '¿Cómo leer estos datos y tamaños?' });
    const overview = page.locator('[data-company-size-overview]');
    await expect(summary).toBeVisible();
    await expect(overview).not.toBeVisible();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(overview).toBeVisible();
    await page.keyboard.press('Space');
    await expect(overview).not.toBeVisible();
  });

  test('muestra filtros y el primer resultado sin scroll en escritorio', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/empresas');
    await expect(page.locator('[data-item]').first()).toBeInViewport();
    for (const control of await page.locator('[data-facet-key]').all()) {
      await expect(control).toBeInViewport();
      await expect(control).toHaveAccessibleName(/.+/);
    }
    const grid = page.locator('[data-facet-key="city"]').locator('..').locator('..');
    expect(
      await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length),
    ).toBe(3);
    await page.setViewportSize({ width: 375, height: 667 });
    expect(
      await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length),
    ).toBe(1);
  });

  test('busca por nombre y NIT antes de las facetas', async ({ page }) => {
    await page.goto('/empresas');
    const search = page.getByRole('searchbox', { name: 'Buscar por nombre o NIT' });
    await expect(search).toBeVisible();
    expect(
      await search.evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(document.querySelector('[data-facet-key]')!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    ).toBe(true);
    const card = page
      .locator('[data-item]')
      .filter({ hasText: /NIT \d/ })
      .first();
    const name = await card.locator('h3').innerText();
    const nit = (await card.innerText()).match(/NIT ([\d.-]+)/)![1];
    await search.fill(name);
    await expect(card).toBeVisible();
    await search.fill(nit);
    await expect(card).toBeVisible();
    expect(await page.locator('[data-item]:visible').count()).toBeGreaterThan(0);
    expect(await page.locator('[data-item]:visible').count()).toBeLessThan(
      await page.locator('[data-item]').count(),
    );
  });

  test('categoría ofrece sugerencias, respeta la URL y se limpia con los demás filtros', async ({
    page,
  }) => {
    await page.goto('/empresas');
    const category = page.getByRole('combobox', { name: 'Categoría', exact: true });
    await expect(category).toHaveAttribute('list', 'facet-category-options');
    const value = await page
      .locator('#facet-category-options option')
      .first()
      .getAttribute('value');
    await category.fill(value!);
    await page.keyboard.press('Tab');
    const count = await page.locator('[data-item]:visible').count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(await page.locator('[data-item]').count());
    await page.goto(`/empresas?category=${encodeURIComponent(value!)}`);
    await expect(category).toHaveValue(value!);
    await expect(page.locator('[data-item]:visible')).toHaveCount(count);
    await page.locator('[data-clear-filters]').click();
    await expect(category).toHaveValue('');
    await expect(page.locator('[data-item]:visible')).toHaveCount(
      await page.locator('[data-item]').count(),
    );
  });

  test('el estado vacío invita a contribuir y permite recuperar los resultados', async ({
    page,
  }) => {
    await page.goto('/empresas');
    await page.locator('[data-search-input]').fill('empresa-inexistente-xyz');
    const empty = page.locator('[data-empty-wrapper]');
    await expect(empty.getByRole('heading')).toHaveText(
      'No encontramos empresas que coincidan con estos filtros.',
    );
    await expect(page.locator('[data-count-value]')).toHaveText('0');
    await expect(page.locator('[data-item]:visible')).toHaveCount(0);
    const cta = empty.getByRole('link', {
      name: '¿Conoces alguna empresa con este perfil? Añádela al directorio',
    });
    await expect(cta).toHaveAttribute('href', '/contribuir');
    await expect(cta).toHaveClass(/btn-primary/);
    await empty.getByRole('button', { name: 'Limpiar filtros' }).click();
    await expect(empty).not.toBeVisible();
    await expect(page.locator('[data-search-input]')).toHaveValue('');
  });

  test('el enlace de ficha cubre la tarjeta y funciona con teclado', async ({ page }) => {
    await page.goto('/empresas');
    const card = page.locator('[data-item]').first();
    const link = card.getByRole('link', { name: /Ver ficha/ });
    const href = await link.getAttribute('href');
    await expect(link).toHaveClass(/stretched-link/);
    await card.click({ position: { x: 5, y: 5 } });
    await expect(page).toHaveURL(new RegExp(`${href}/?$`));
    await page.goBack();
    await link.focus();
    await expect(link).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  });
});
