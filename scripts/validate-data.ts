/**
 * Valida todos los datasets del ecosistema contra sus schemas Zod y verifica
 * la integridad referencial (slugs únicos, relaciones existentes).
 *
 * Se ejecuta en build (`npm run build`) y en CI. Si algo falla, sale con código 1.
 *
 * Uso: npm run validate:data
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { z } from 'zod';

import {
  companiesSchema,
  universitiesSchema,
  programsSchema,
  peopleSchema,
  communitiesSchema,
  eventsSchema,
  supportEntitiesSchema,
} from '../src/schemas/index.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

interface Dataset {
  file: string;
  schema: z.ZodTypeAny;
}

const datasets: Dataset[] = [
  { file: 'companies.json', schema: companiesSchema },
  { file: 'universities.json', schema: universitiesSchema },
  { file: 'programs.json', schema: programsSchema },
  { file: 'people.json', schema: peopleSchema },
  { file: 'communities.json', schema: communitiesSchema },
  { file: 'events.json', schema: eventsSchema },
  { file: 'supportEntities.json', schema: supportEntitiesSchema },
];

const errors: string[] = [];
const parsed: Record<string, any[]> = {};

function loadJson(file: string): unknown {
  const raw = readFileSync(join(dataDir, file), 'utf-8');
  return JSON.parse(raw);
}

// 1) Validación de schema por archivo.
for (const { file, schema } of datasets) {
  try {
    const data = loadJson(file);
    const result = schema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push(`[${file}] ${issue.path.join('.') || '(raíz)'}: ${issue.message}`);
      }
    } else {
      parsed[file] = result.data as any[];
      console.log(`✓ ${file}: ${(result.data as any[]).length} registros válidos`);
    }
  } catch (err) {
    errors.push(`[${file}] No se pudo leer o parsear: ${(err as Error).message}`);
  }
}

// 2) Slugs únicos por dataset.
function checkUniqueSlugs(file: string) {
  const items = parsed[file];
  if (!items) return;
  const seen = new Map<string, number>();
  for (const item of items) {
    if (!item.slug) continue;
    seen.set(item.slug, (seen.get(item.slug) ?? 0) + 1);
  }
  for (const [slug, count] of seen) {
    if (count > 1) errors.push(`[${file}] slug duplicado: "${slug}" (${count} veces)`);
  }
}
datasets.forEach((d) => checkUniqueSlugs(d.file));

// 3) Integridad referencial.
const universitySlugs = new Set((parsed['universities.json'] ?? []).map((u) => u.slug));
const programSlugs = new Set((parsed['programs.json'] ?? []).map((p) => p.slug));
const peopleSlugs = new Set((parsed['people.json'] ?? []).map((p) => p.slug));
const communitySlugs = new Set((parsed['communities.json'] ?? []).map((c) => c.slug));

for (const u of parsed['universities.json'] ?? []) {
  for (const progSlug of u.programs ?? []) {
    if (!programSlugs.has(progSlug)) {
      errors.push(
        `[universities.json] "${u.slug}" referencia un programa inexistente: "${progSlug}"`,
      );
    }
  }
}

for (const p of parsed['programs.json'] ?? []) {
  if (p.institutionSlug && !universitySlugs.has(p.institutionSlug)) {
    errors.push(
      `[programs.json] "${p.slug}" referencia una universidad inexistente: "${p.institutionSlug}"`,
    );
  }
}

for (const c of parsed['communities.json'] ?? []) {
  if (c.organizerSlug && !peopleSlugs.has(c.organizerSlug)) {
    errors.push(
      `[communities.json] "${c.slug}" referencia una persona inexistente: "${c.organizerSlug}"`,
    );
  }
}

for (const e of parsed['events.json'] ?? []) {
  if (e.organizerCommunitySlug && !communitySlugs.has(e.organizerCommunitySlug)) {
    errors.push(
      `[events.json] "${e.slug}" referencia una comunidad inexistente: "${e.organizerCommunitySlug}"`,
    );
  }
}

// Resultado.
if (errors.length > 0) {
  console.error(`\n✗ Validación fallida: ${errors.length} error(es)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('\n✓ Todos los datos son válidos y consistentes.');
