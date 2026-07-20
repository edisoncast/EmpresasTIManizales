import { test, expect } from '@playwright/test';

const details = [
  ['/empresas/venus-ingenieria-de-software', /venus/i],
  ['/universidades/universidad-de-caldas', /universidad de caldas/i],
  ['/programas/ing-informatica-ucaldas', /ingeniería en informática/i],
  ['/personas/jhon-edison-castro-sanchez', /jhon edison castro/i],
  ['/comunidades/manizales-tech-talks', /manizales tech talks/i],
] as const;

test.describe('Páginas detalle', () => {
  for (const [path, heading] of details) {
    test(`${path} corresponde al registro y muestra trazabilidad`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(
        page
          .getByText(
            /Verificado|Verificación parcial|Estado por confirmar|Posiblemente inactivo|Archivo histórico/,
          )
          .first(),
      ).toBeVisible();
      await expect(page.getByRole('heading', { name: /fuentes/i })).toBeVisible();
      await expect(
        page.getByText(/sugerir una corrección|solicitar ajuste o retiro|corregir/i).first(),
      ).toBeVisible();
    });
  }

  test('todo enlace externo en detalle abre de forma segura', async ({ page }) => {
    await page.goto('/empresas/venus-ingenieria-de-software');
    const links = page.locator('a[target="_blank"]');
    for (let index = 0; index < (await links.count()); index++) {
      await expect(links.nth(index)).toHaveAttribute('rel', /noopener/);
      await expect(links.nth(index)).toHaveAttribute('rel', /noreferrer/);
    }
  });
});
