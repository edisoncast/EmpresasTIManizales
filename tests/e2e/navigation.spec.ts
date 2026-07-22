import { test, expect } from '@playwright/test';

// A partir de 1280px (xl) la navegación de escritorio es visible; por debajo se usa el menú.
const DESKTOP_NAV = 1280;

async function openMobileMenuIfNeeded(page: import('@playwright/test').Page) {
  const width = page.viewportSize()?.width ?? 1440;
  if (width < DESKTOP_NAV) {
    await page.locator('header details summary').click();
  }
}

test.describe('Navegación', () => {
  const publicRoutes = [
    '/',
    '/empresas',
    '/decadas',
    '/decadas/1990-1999',
    '/formacion',
    '/universidades',
    '/programas',
    '/personas',
    '/comunidades',
    '/eventos',
    '/ecosistema',
    '/contribuir',
    '/metodologia',
    '/acerca',
  ];

  test('todas las rutas públicas responden y no emiten errores graves', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(String(error)));
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), route).toBe(true);
      await expect(page.getByRole('heading', { level: 1 }), route).toHaveCount(1);
    }
    expect(errors).toEqual([]);
  });

  test('el header lleva a cada sección principal', async ({ page }) => {
    await page.goto('/');
    await openMobileMenuIfNeeded(page);
    await page.getByRole('link', { name: 'Empresas', exact: true }).first().click();
    await expect(page).toHaveURL(/\/empresas\/?$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/empresas/i);
  });

  test('la ruta activa se marca con aria-current', async ({ page }) => {
    await page.goto('/empresas');
    const width = page.viewportSize()?.width ?? 1440;
    if (width >= DESKTOP_NAV) {
      const active = page.locator(
        'header nav[aria-label="Navegación principal"] a[aria-current="page"]',
      );
      await expect(active).toHaveText(/empresas/i);
    } else {
      await page.locator('header details summary').click();
      await expect(
        page.locator('header nav[aria-label="Navegación"] a[aria-current="page"]'),
      ).toContainText(/empresas/i);
    }
  });

  test('el menú móvil abre y muestra las secciones @mobile', async ({ page }) => {
    await page.goto('/');
    await page.locator('header details summary').click();
    await expect(
      page.locator('header details').getByRole('link', { name: 'Comunidad', exact: true }),
    ).toBeVisible();
    await page.locator('header details summary').click();
    await expect(page.locator('header details')).not.toHaveAttribute('open', '');
  });

  test('el enlace "Saltar al contenido" existe', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /saltar al contenido/i })).toHaveAttribute(
      'href',
      '#main',
    );
  });
});
