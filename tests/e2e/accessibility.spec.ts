import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/empresas',
  '/personas',
  '/contribuir',
  '/empresas/venus-ingenieria-de-software',
  '/decadas/1990-1999',
];

for (const path of pages) {
  test(`${path} no tiene violaciones axe serias o críticas`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const severe = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical',
    );
    expect(severe).toEqual([]);
  });
}
