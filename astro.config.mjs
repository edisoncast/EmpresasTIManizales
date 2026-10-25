import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Cambia SITE_URL al desplegar en tu dominio o dominio de CloudFront.
const SITE_URL = process.env.SITE_URL ?? 'https://ticmanizales.edisoncastrosanchez.app';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  // Astro 7 cambió el valor por defecto a 'jsx', que elimina espacios entre elementos en línea.
  // Se conserva la compresión HTML anterior para no alterar el texto renderizado.
  compressHTML: true,
  build: {
    format: 'directory',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
