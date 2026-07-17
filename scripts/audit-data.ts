/**
 * Auditoría de datos 2026: reporta el grado de verificación y las brechas del
 * archivo (registros sin fuente, pendientes, heredados de 2020, comunidades sin
 * actividad confirmada). Es informativo: siempre sale con código 0.
 *
 * Uso: npm run audit:data
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  resolveVerification,
  verificationOrder,
  verificationMeta,
  type VerifiableLike,
} from '../src/lib/verification.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const load = (f: string): any[] => JSON.parse(readFileSync(join(dataDir, f), 'utf-8'));

const datasets: Record<string, any[]> = {
  companies: load('companies.json'),
  universities: load('universities.json'),
  programs: load('programs.json'),
  people: load('people.json'),
  communities: load('communities.json'),
  events: load('events.json'),
  supportEntities: load('supportEntities.json'),
};

const all = Object.values(datasets).flat();

// Distribución por estado de verificación.
const dist: Record<string, number> = {};
verificationOrder.forEach((s) => (dist[s] = 0));
for (const e of all) dist[resolveVerification(e as VerifiableLike)]++;

// Brechas.
const withoutSource = all.filter((e) => !e.sourceUrl).length;
const pending = all.filter((e) => e.needsVerification === true).length;
const heritage2019 = (datasets.companies ?? []).filter(
  (c) => c.lastRenewalYear && c.lastRenewalYear <= 2019,
).length;
const inactiveCommunities = (datasets.communities ?? []).filter(
  (c) => c.status === 'inactive',
).length;

const pct = (n: number) => (all.length ? Math.round((n / all.length) * 100) : 0);

console.log('=== Auditoría de datos ===\n');
console.log(`Registros totales: ${all.length}`);
for (const [k, v] of Object.entries(datasets)) {
  console.log(`  ${k.padEnd(16)} ${v.length}`);
}

console.log('\nEstado de verificación:');
for (const s of verificationOrder) {
  const bar = '█'.repeat(Math.round((dist[s] / Math.max(all.length, 1)) * 30));
  console.log(`  ${verificationMeta[s].label.padEnd(24)} ${String(dist[s]).padStart(3)}  ${bar}`);
}

console.log('\nBrechas de calidad:');
console.log(`  Sin fuente pública registrada: ${withoutSource} (${pct(withoutSource)}%)`);
console.log(`  Pendientes de verificación:    ${pending} (${pct(pending)}%)`);
console.log(`  Empresas heredadas (≤2019):     ${heritage2019}`);
console.log(`  Comunidades marcadas inactivas: ${inactiveCommunities}`);

// Resumen legible por máquina (sirve para la página de metodología en el futuro).
const summary = {
  generatedFrom: 'scripts/audit-data.ts',
  totals: Object.fromEntries(Object.entries(datasets).map(([k, v]) => [k, v.length])),
  total: all.length,
  verification: dist,
  gaps: { withoutSource, pending, heritage2019, inactiveCommunities },
};
writeFileSync(join(dataDir, 'data-audit.json'), JSON.stringify(summary, null, 2) + '\n');
console.log('\n✓ Resumen escrito en src/data/data-audit.json');
