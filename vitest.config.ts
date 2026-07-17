import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Solo tests unitarios en la raíz de tests/. Los e2e (tests/e2e) los corre Playwright.
    include: ['tests/*.{test,spec}.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@schemas': new URL('./src/schemas', import.meta.url).pathname,
      '@data': new URL('./src/data', import.meta.url).pathname,
      '@lib': new URL('./src/lib', import.meta.url).pathname,
    },
  },
});
