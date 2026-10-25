import { test, expect } from '@playwright/test';

test.describe('Home', () => {
  test('"Empieza por aquí" va justo después del buscador y antes de "Qué es"', async ({ page }) => {
    await page.goto('/');
    const search = await page.locator('#global-search-input').boundingBox();
    const starts = await page.getByRole('heading', { name: 'Empieza por aquí' }).boundingBox();
    const about = await page.getByText('Qué es', { exact: true }).boundingBox();
    expect(search && starts && about).toBeTruthy();
    expect(starts!.y).toBeGreaterThan(search!.y);
    expect(about!.y).toBeGreaterThan(starts!.y);
  });

  test('el buscador tiene label visible y placeholder descriptivo, sin el atajo "/"', async ({
    page,
  }) => {
    await page.goto('/');
    const input = page.getByLabel('Buscar en todo el ecosistema');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', /empresas, programas, personas/i);
    await expect(page.locator('[data-global-search]').getByText('/', { exact: true })).toHaveCount(
      0,
    );
  });

  test('el archivo y sus cifras están en un solo índice', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Explora el archivo' })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: /el ecosistema en cifras/i })).toHaveCount(0);
    const empresas = page
      .locator('section[aria-labelledby="archivo"]')
      .getByRole('link', { name: /Empresas/ });
    await expect(empresas).toContainText(/\d+/);
    await empresas.click();
    await expect(page).toHaveURL(/\/empresas\/?$/);
  });

  test('cada estado de verificación enlaza al listado ya filtrado', async ({ page }) => {
    await page.goto('/');
    const link = page
      .locator('section:has(#verificacion)')
      .getByRole('link', { name: /Verificación parcial: Programas/ });
    const expected = (await link.locator('.data').textContent())?.trim();
    await link.click();
    await expect(page).toHaveURL(/\/programas\/?\?estado=parcial$/);
    await expect(page.locator('select[data-facet-key="estado"]')).toHaveValue('parcial');
    await expect(page.locator('[data-count-value]')).toHaveText(expected ?? '');
  });

  test('toda la tarjeta de persona es clicable y anuncia un solo enlace', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('section[aria-labelledby="personas"] article').first();
    await expect(card.getByRole('link')).toHaveCount(1);
    const href = await card.getByRole('link').getAttribute('href');
    await card.scrollIntoViewIfNeeded();
    // Un punto de la ficha que no es el nombre (esquina inferior izquierda) debe resolver al
    // enlace del perfil. Con content-visibility: auto, una ficha recién entrada al viewport no
    // es clicable hasta el siguiente frame, y cambia de altura al pintarse: por eso se espera
    // un frame y se consulta el punto en ese mismo momento, en lugar de un clic por coordenadas.
    const hit = await card.evaluate(async (el) => {
      el.scrollIntoView({ block: 'center' });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const r = el.getBoundingClientRect();
      const y = Math.min(r.bottom, window.innerHeight) - 12;
      const target = document.elementFromPoint(r.left + 12, y);
      return target?.closest('a')?.getAttribute('href') ?? null;
    });
    expect(hit).toBe(href);
    await card.getByText('Contribución:').click({ force: true });
    await expect(page).toHaveURL(new RegExp(`${href}/?$`));
  });

  test('las coordenadas del hero y del footer llevan al mapa del ecosistema', async ({ page }) => {
    await page.goto('/');
    const coordinates = page.getByRole('link', { name: /^5\.07° N · 75\.52° O/ });
    await expect(coordinates).toHaveCount(2);
    await expect(coordinates.last()).toContainText('2.150 m s. n. m.');
    for (const link of await coordinates.all()) {
      await expect(link).toHaveAttribute('href', '/ecosistema');
      await expect(link).toHaveAccessibleName(/ver el mapa del ecosistema$/);
    }
    await coordinates.first().click();
    await expect(page).toHaveURL(/\/ecosistema\/?$/);
  });

  test('la banda final ofrece acciones concretas', async ({ page }) => {
    await page.goto('/');
    const band = page.locator('main > section').last();
    await expect(band.getByRole('link', { name: 'Añadir mi empresa' })).toHaveAttribute(
      'href',
      /template=suggest-company\.yml/,
    );
    await expect(band.getByRole('link', { name: 'Sugerir una corrección' })).toHaveAttribute(
      'href',
      /template=correct-record\.yml/,
    );
    await expect(band.getByRole('link', { name: 'Cómo contribuir' })).toHaveCount(0);
  });
});
