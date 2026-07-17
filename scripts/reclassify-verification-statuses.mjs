/**
 * Reglas conservadoras aplicadas durante la revisión preproducción 2026.
 *
 * - Una razón social que declara "En liquidación" no se presenta como vigente.
 * - Un registro sin fecha de verificación no se presenta como completamente verificado.
 *
 * El script es idempotente y conserva los datos y fuentes existentes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dataDir = new URL('../src/data/', import.meta.url);
const files = [
  'companies.json',
  'universities.json',
  'programs.json',
  'people.json',
  'communities.json',
  'events.json',
  'supportEntities.json',
];

let liquidations = 0;
let missingVerificationDate = 0;

for (const file of files) {
  const path = join(dataDir.pathname, file);
  const records = JSON.parse(readFileSync(path, 'utf8'));

  for (const record of records) {
    if (file === 'companies.json' && /\ben liquidaci[oó]n\b/i.test(record.name)) {
      record.verificationStatus = 'inactive_or_unverified';
      record.needsVerification = true;
      record.notes =
        'La razón social consultada incluye “En liquidación”; la actividad operativa requiere revisión humana.';
      liquidations++;
      continue;
    }

    const currentlyPresentedAsVerified =
      record.verificationStatus === 'verified' ||
      (!record.verificationStatus && record.needsVerification === false);
    if (!record.lastVerifiedAt && currentlyPresentedAsVerified) {
      record.verificationStatus =
        record.sourceUrl || record.sources?.length ? 'partially_verified' : 'unknown';
      record.needsVerification = true;
      missingVerificationDate++;
    }
  }

  writeFileSync(path, `${JSON.stringify(records, null, 2)}\n`);
}

console.log(`Registros en liquidación reclasificados: ${liquidations}`);
console.log(`Registros sin fecha reclasificados: ${missingVerificationDate}`);
