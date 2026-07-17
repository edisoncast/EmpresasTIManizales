/**
 * Verifica con Playwright si las empresas de companies.json siguen existiendo,
 * consultando el directorio público einforma por su nombre/NIT.
 *
 * einforma es un SPA con protección anti-bot y rate-limiting: por eso usamos un
 * navegador real, de forma SECUENCIAL y con pausas. Es una herramienta de
 * mantenimiento (best-effort), no parte del build ni de CI.
 *
 * Uso:
 *   node scripts/verify-companies.mjs                  # reporta, no modifica datos
 *   node scripts/verify-companies.mjs --write          # actualiza companies.json
 *   node scripts/verify-companies.mjs --limit=10       # solo N empresas
 *   node scripts/verify-companies.mjs --only=nit       # solo las que tienen NIT
 *
 * Requiere navegadores de Playwright instalados (ver README).
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '..', 'src', 'data', 'companies.json');

const args = process.argv.slice(2);
const write = args.includes('--write');
const onlyNit = args.includes('--only=nit');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Infinity;
const DELAY = 3000;
const SEARCH = 'https://directorio-empresas.einforma.co/buscar-empresas?q=';
const today = new Date().toISOString().slice(0, 10);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const companies = JSON.parse(readFileSync(file, 'utf-8'));
let targets = companies;
if (onlyNit) targets = targets.filter((c) => c.nit);
if (Number.isFinite(limit)) targets = targets.slice(0, limit);

console.log(`Verificando ${targets.length} empresa(s) en einforma (secuencial)…\n`);

const browser = await chromium.launch();
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  locale: 'es-CO',
});
const page = await context.newPage();

let found = 0;
let notFound = 0;

for (const company of targets) {
  const query = encodeURIComponent(company.nit ? company.nit : company.name);
  let status = 'desconocido';
  let recordUrl = null;
  try {
    await page.goto(SEARCH + query, { timeout: 30000, waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    // Primer resultado que apunte a una ficha de empresa.
    const link = await page
      .locator('a[href*="/informacion-empresa/"]')
      .first()
      .getAttribute('href')
      .catch(() => null);

    if (link) {
      recordUrl = new URL(link, 'https://directorio-empresas.einforma.co').toString();
      await page.goto(recordUrl, { timeout: 30000, waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
      const text = (await page.locator('body').innerText().catch(() => '')).toLowerCase();
      if (/cancelad|liquidad|inactiv/.test(text)) status = 'inactiva';
      else if (/activa|vigente|balance|renovaci/.test(text)) status = 'activa';
      else status = 'ficha-encontrada';
      found++;
    } else {
      notFound++;
    }
  } catch (err) {
    status = `error: ${String(err.message ?? err).split('\n')[0]}`;
    notFound++;
  }

  console.log(`${status.padEnd(18)} ${company.name}${recordUrl ? '  → ' + recordUrl : ''}`);

  if (write && recordUrl && status === 'activa') {
    company.sourceUrl = recordUrl;
    company.lastVerifiedAt = today;
    company.needsVerification = false;
  }

  await sleep(DELAY);
}

await browser.close();

if (write) {
  writeFileSync(file, JSON.stringify(companies, null, 2) + '\n');
  console.log('\n✓ companies.json actualizado con las empresas verificadas como activas.');
}

console.log(`\nResumen: ${found} ficha(s) encontradas · ${notFound} sin ficha/errores`);
