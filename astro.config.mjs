import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Cambia SITE_URL al desplegar en tu dominio o dominio de CloudFront.
const SITE_URL = process.env.SITE_URL ?? 'https://ticmanizales.edisoncastrosanchez.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
});
