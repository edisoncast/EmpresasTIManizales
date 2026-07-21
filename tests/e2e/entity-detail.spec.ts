import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { excludedCompanySlugs } from '../../src/lib/company-review';

interface CompanyWithSources {
  slug: string;
  legalForm?: string;
  sources?: Array<{ url: string }>;
}

const companies: CompanyWithSources[] = JSON.parse(
  readFileSync(new URL('../../src/data/companies.json', import.meta.url), 'utf8'),
);

const details = [
  ['/empresas/venus-ingenieria-de-software', /venus/i],
  ['/universidades/universidad-de-caldas', /universidad de caldas/i],
  ['/programas/ing-informatica-ucaldas', /ingeniería en informática/i],
  ['/personas/jhon-edison-castro-sanchez', /jhon edison castro/i],
  ['/comunidades/manizales-tech-talks', /manizales tech talks/i],
] as const;

const companiesWithSources = companies.filter(
  (company) =>
    company.legalForm !== 'Persona natural' &&
    !excludedCompanySlugs.has(company.slug) &&
    company.sources &&
    company.sources.length > 0,
);

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

  test('todas las fuentes estructuradas de empresas son clickeables', async ({ page }) => {
    for (const company of companiesWithSources) {
      await page.goto(`/empresas/${company.slug}`);
      const sourceSection = page.getByRole('heading', { name: 'Fuentes' }).locator('..');
      const sourceLinks = sourceSection.locator('ol > li > a');

      await expect(sourceLinks).toHaveCount(company.sources!.length);
      for (const [index, source] of company.sources!.entries()) {
        await expect(sourceLinks.nth(index)).toHaveAttribute('href', source.url);
        await expect(sourceLinks.nth(index)).toHaveAttribute('target', '_blank');
        await expect(sourceLinks.nth(index)).toHaveAttribute('rel', /noopener/);
        await expect(sourceLinks.nth(index)).toHaveAttribute('rel', /noreferrer/);
      }
    }
  });
});
