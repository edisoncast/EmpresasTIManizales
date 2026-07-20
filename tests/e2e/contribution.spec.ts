import { test, expect } from '@playwright/test';

test('contribuir ofrece rutas no tecnicas, fuentes y revision del legado 2020', async ({
  page,
}) => {
  await page.goto('/contribuir');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/cómo contribuir/i);

  const main = page.getByRole('main');

  // Tres formas no tecnicas, cada una hacia un formulario de GitHub (issues).
  for (const action of ['Agregar', 'Corregir', 'Reportar']) {
    const link = main.getByRole('link', { name: action, exact: true });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /\/issues\//);
  }

  await expect(main.getByText(/fuente pública/i).first()).toBeVisible();
  await expect(main.getByText(/2020|heredad/i).first()).toBeVisible();
  await expect(main.getByText(/moderación/i).first()).toBeVisible();

  // El flujo tecnico (Pull Request) sigue disponible en el desplegable.
  await main.getByText(/prefieres editar los datos directamente/i).click();
  await expect(main.getByRole('link', { name: /pull request/i }).first()).toBeVisible();
});
