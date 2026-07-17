/**
 * Verifica con Playwright (Chromium) que las URLs presentes en los datos estén vivas.
 * Recorre website, sourceUrl, linkedin, github, x, meetup, contact, url y personalBrandLinks
 * de todos los datasets, visita cada URL única y reporta su estado.
 *
 * Uso:
 *   node scripts/validate-urls.mjs                # reporta, no falla
 *   node scripts/validate-urls.mjs --strict       # exit 1 si hay enlaces rotos
 *   node scripts/validate-urls.mjs --limit=20     # solo las primeras N URLs
 *   node scripts/validate-urls.mjs --filter=snies # solo URLs que contengan el texto
 *
 * Requiere navegadores de Playwright instalados (ver README, sección validación).
 */
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const limitArg = args.find((a) => a.startsWith('--limit='));
const filterArg = args.find((a) => a.startsWith('--filter='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
const filter = filterArg ? filterArg.split('=')[1] : null;
const CONCURRENCY = 4;
const TIMEOUT = 20000;

const URL_FIELDS = ['website', 'sourceUrl', 'linkedin', 'github', 'x', 'meetup', 'contact', 'url'];

function load(file) {
  try {
    return JSON.parse(readFileSync(join(dataDir, file), 'utf-8'));
  } catch {
    return [];
  }
}

const files = [
  'companies.json',
  'universities.json',
  'programs.json',
  'people.json',
  'communities.json',
  'events.json',
  'supportEntities.json',
];

// Recolecta URLs únicas con su origen (para reportes útiles).
const urlMap = new Map(); // url -> Set(origen)
for (const file of files) {
  for (const item of load(file)) {
    const origin = `${file}:${item.slug ?? item.name ?? '?'}`;
    for (const field of URL_FIELDS) {
      const v = item[field];
      if (typeof v === 'string' && /^https?:\/\//.test(v)) addUrl(v, origin);
    }
    for (const v of item.personalBrandLinks ?? []) {
      if (typeof v === 'string' && /^https?:\/\//.test(v)) addUrl(v, origin);
    }
  }
}
function addUrl(url, origin) {
  if (filter && !url.includes(filter)) return;
  if (!urlMap.has(url)) urlMap.set(url, new Set());
  urlMap.get(url).add(origin);
}

let urls = [...urlMap.keys()];
if (Number.isFinite(limit)) urls = urls.slice(0, limit);

console.log(`Verificando ${urls.length} URL(s) únicas con Chromium…\n`);

const results = [];
const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (compatible; EcosistemaTIC-linkcheck/1.0; +https://ticmanizales.edisoncastrosanchez.app)',
  ignoreHTTPSErrors: true,
});

async function check(url) {
  const page = await context.newPage();
  try {
    const resp = await page.goto(url, { timeout: TIMEOUT, waitUntil: 'domcontentloaded' });
    const status = resp ? resp.status() : 0;
    const ok = status > 0 && status < 400;
    results.push({ url, status, ok, origins: [...urlMap.get(url)] });
    console.log(`${ok ? '✓' : '✗'} ${status || 'ERR'}  ${url}`);
  } catch (err) {
    results.push({
      url,
      status: 0,
      ok: false,
      error: String(err.message ?? err),
      origins: [...urlMap.get(url)],
    });
    console.log(`✗ ERR  ${url}  (${String(err.message ?? err).split('\n')[0]})`);
  } finally {
    await page.close();
  }
}

// Pool de concurrencia simple.
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    await check(url);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

await browser.close();

const broken = results.filter((r) => !r.ok);
console.log(`\nResumen: ${results.length - broken.length} OK · ${broken.length} con problemas`);
if (broken.length) {
  console.log('\nEnlaces con problemas:');
  for (const b of broken) {
    console.log(`  ✗ ${b.status || 'ERR'}  ${b.url}`);
    for (const o of b.origins) console.log(`      ↳ ${o}`);
  }
}

if (strict && broken.length) process.exit(1);
