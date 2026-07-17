import { defineConfig, devices } from '@playwright/test';

/**
 * Validación visual/e2e (docs/design-direction.md).
 * Prioriza assertions semánticas + capturas de artefactos solo en fallo, para
 * evitar un CI frágil por cambios de datos. Chromium en CI; otros motores manual.
 */
const PORT = 4321;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    // Zona horaria y locale fijos para estabilidad de fechas/formatos.
    locale: 'es-CO',
    timezoneId: 'America/Bogota',
  },

  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      // Los tests marcados @mobile no aplican en escritorio: se excluyen (no se saltan).
      grepInvert: /@mobile/,
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 } },
    },
  ],

  webServer: {
    command: 'npm run preview -- --port 4321 --host',
    url: baseURL,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});
