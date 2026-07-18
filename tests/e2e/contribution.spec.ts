import { test, expect } from '@playwright/test';

test('contribuir explica entidades, fuentes y revisión del legado 2020', async ({ page }) => {
  await page.goto('/contribuir');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/cómo contribuir/i);
  const main = page.getByRole('main');
  for (const entity of ['Empresa', 'Universidad', 'Programa', 'Persona', 'Comunidad', 'Evento']) {
    await expect(main.getByText(entity, { exact: true }).first()).toBeVisible();
  }
  await expect(page.getByText(/fuente pública/i).first()).toBeVisible();
  await expect(page.getByText(/2020|heredad/i).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /pull request/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /issue/i }).first()).toBeVisible();
});
