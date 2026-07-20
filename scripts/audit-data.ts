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
import { applyCompanyReview } from '../src/lib/company-review.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

const load = (f: string): any[] => JSON.parse(readFileSync(join(dataDir, f), 'utf-8'));

const datasets: Record<string, any[]> = {
  companies: load('companies.json').map(applyCompanyReview),
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
const hasSource = (e: any) => Boolean(e.sourceUrl) || Boolean(e.sources?.length);
const withoutSource = all.filter((e) => !hasSource(e)).length;
const verifiedWithoutSource = all.filter(
  (e) => resolveVerification(e as VerifiableLike) === 'verified' && !hasSource(e),
).length;
const pending = all.filter((e) => e.needsVerification === true).length;
const missingVerificationDate = all.filter((e) => !e.lastVerifiedAt).length;
const companiesInLiquidation = (datasets.companies ?? []).filter((c) =>
  /\ben liquidaci[oó]n\b/i.test(c.name),
).length;
const naturalPersonBusinesses = (datasets.companies ?? []).filter(
  (c) => c.legalForm === 'Persona natural',
).length;
const inactiveCommunities = (datasets.communities ?? []).filter(
  (c) => c.status === 'inactive',
).length;
const duplicateCompanyNames = Object.values(
  (datasets.companies ?? []).reduce<Record<string, number>>((counts, company) => {
    const key = company.name.trim().toLocaleLowerCase('es');
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {}),
).filter((count) => count > 1).length;

// Conteos reproducibles del material legacy preservado. El listado empresarial
// de 2020 remitía a un Google Drive que no está incluido, por eso queda en null.
const legacyBaseline = {
  companies: null,
  universities: 9,
  programs: 30,
  communities: 5,
  structuredRecordsFound: 44,
};

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
console.log(`  Verificados sin fuente:         ${verifiedWithoutSource}`);
console.log(`  Pendientes de verificación:    ${pending} (${pct(pending)}%)`);
console.log(`  Sin fecha de verificación:      ${missingVerificationDate}`);
console.log(`  Empresas “En liquidación”:      ${companiesInLiquidation}`);
console.log(`  Negocios de persona natural:    ${naturalPersonBusinesses}`);
console.log(`  Nombres empresariales repetidos:${duplicateCompanyNames}`);
console.log(`  Comunidades marcadas inactivas: ${inactiveCommunities}`);
console.log('\nLínea base 2020 preservada:');
console.log(`  Registros estructurados encontrados: ${legacyBaseline.structuredRecordsFound}`);
console.log('  Empresas originales: no cuantificables (el archivo remitía a un Drive externo)');

// Resumen legible por máquina (sirve para la página de metodología en el futuro).
const summary = {
  generatedFrom: 'scripts/audit-data.ts',
  totals: Object.fromEntries(Object.entries(datasets).map(([k, v]) => [k, v.length])),
  total: all.length,
  verification: dist,
  legacyBaseline,
  gaps: {
    withoutSource,
    verifiedWithoutSource,
    pending,
    missingVerificationDate,
    companiesInLiquidation,
    naturalPersonBusinesses,
    duplicateCompanyNames,
    inactiveCommunities,
  },
};
writeFileSync(join(dataDir, 'data-audit.json'), JSON.stringify(summary, null, 2) + '\n');
console.log('\n✓ Resumen escrito en src/data/data-audit.json');
