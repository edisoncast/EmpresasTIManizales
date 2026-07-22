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
  decadesSchema,
  universitiesSchema,
  programsSchema,
  peopleSchema,
  communitiesSchema,
  eventsSchema,
  supportEntitiesSchema,
} from '../src/schemas/index.ts';
import { excludedCompanySlugs } from '../src/lib/company-review.ts';

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
  { file: 'decades.json', schema: decadesSchema },
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
  for (const slug of c.organizerSlugs ?? []) {
    if (!peopleSlugs.has(slug)) {
      errors.push(`[communities.json] "${c.slug}" referencia una persona inexistente: "${slug}"`);
    }
  }
}

for (const e of parsed['events.json'] ?? []) {
  if (e.organizerCommunitySlug && !communitySlugs.has(e.organizerCommunitySlug)) {
    errors.push(
      `[events.json] "${e.slug}" referencia una comunidad inexistente: "${e.organizerCommunitySlug}"`,
    );
  }
}

// 4) Décadas: el contenido de investigación debe ser consistente con los datos.
// Evita métricas rotas: slugs inexistentes, empresas fuera del rango, dobles
// clasificaciones o coberturas que no suman el universo del periodo.
{
  const allCompanies = parsed['companies.json'] ?? [];
  const companyBySlug = new Map(allCompanies.map((c) => [c.slug, c]));
  // Universo público del periodo: mismo criterio del sitio (sin personas
  // naturales ni registros excluidos del directorio).
  const publicDecadeSlugs = (start: number, end: number) =>
    allCompanies
      .filter((c) => {
        const year = Number(c.registeredAt?.slice(0, 4));
        return (
          Number.isFinite(year) &&
          year >= start &&
          year <= end &&
          c.legalForm !== 'Persona natural' &&
          !excludedCompanySlugs.has(c.slug)
        );
      })
      .map((c) => c.slug);

  const decadesData = parsed['decades.json'] ?? [];
  for (const decade of decadesData) {
    const label = `[decades.json] "${decade.slug}"`;
    if (decade.slug !== `${decade.startYear}-${decade.endYear}`) {
      errors.push(`${label} el slug no coincide con startYear-endYear.`);
    }
    for (const other of decadesData) {
      if (
        other !== decade &&
        decade.startYear <= other.endYear &&
        other.startYear <= decade.endYear
      ) {
        if (decade.startYear < other.startYear) {
          errors.push(`${label} se solapa con "${other.slug}".`);
        }
      }
    }

    // Recolecta cada referencia a empresas con su contexto.
    const refGroups: Array<{ context: string; slugs: string[] }> = [];
    for (const group of decade.offerClassification?.groups ?? []) {
      refGroups.push({ context: `oferta "${group.label}"`, slugs: group.slugs });
    }
    for (const group of decade.confidence?.groups ?? []) {
      refGroups.push({ context: `confianza "${group.label}"`, slugs: group.slugs });
    }
    if (decade.publicSignal) {
      refGroups.push({
        context: 'publicSignal.corporateSite',
        slugs: decade.publicSignal.corporateSite,
      });
      refGroups.push({
        context: 'publicSignal.registralOnly',
        slugs: decade.publicSignal.registralOnly,
      });
    }
    for (const layer of decade.layers ?? []) {
      refGroups.push({ context: `capa "${layer.title}"`, slugs: layer.slugs });
    }
    for (const entry of decade.representative ?? []) {
      refGroups.push({ context: 'trayectoria representativa', slugs: entry.slugs });
    }

    for (const { context, slugs } of refGroups) {
      for (const slug of slugs) {
        const company = companyBySlug.get(slug);
        if (!company) {
          errors.push(`${label} ${context}: la empresa "${slug}" no existe en companies.json.`);
          continue;
        }
        const year = Number(company.registeredAt?.slice(0, 4));
        if (!Number.isFinite(year) || year < decade.startYear || year > decade.endYear) {
          errors.push(
            `${label} ${context}: "${slug}" tiene matrícula ${company.registeredAt ?? 'sin fecha'}, fuera del rango ${decade.startYear}-${decade.endYear}.`,
          );
        }
      }
    }

    // Sin dobles clasificaciones dentro de un mismo bloque.
    const assertDisjoint = (context: string, groups: Array<{ label: string; slugs: string[] }>) => {
      const seen = new Map<string, string>();
      for (const group of groups) {
        for (const slug of group.slugs) {
          const prev = seen.get(slug);
          if (prev) {
            errors.push(
              `${label} ${context}: "${slug}" aparece en "${prev}" y en "${group.label}" a la vez.`,
            );
          } else {
            seen.set(slug, group.label);
          }
        }
      }
      return new Set(seen.keys());
    };
    const offerSet = decade.offerClassification
      ? assertDisjoint('oferta', decade.offerClassification.groups)
      : undefined;
    const confidenceSet = decade.confidence
      ? assertDisjoint('confianza', decade.confidence.groups)
      : undefined;

    // Oferta y confianza clasifican el mismo universo investigado.
    if (offerSet && confidenceSet) {
      const same =
        offerSet.size === confidenceSet.size && [...offerSet].every((s) => confidenceSet.has(s));
      if (!same) {
        errors.push(
          `${label} la clasificación de oferta (${offerSet.size}) y la de confianza (${confidenceSet.size}) no cubren el mismo conjunto de empresas investigadas.`,
        );
      }
    }

    // La señal pública debe cubrir exactamente el universo público del periodo.
    if (decade.publicSignal) {
      const union = [...decade.publicSignal.corporateSite, ...decade.publicSignal.registralOnly];
      if (new Set(union).size !== union.length) {
        errors.push(
          `${label} publicSignal: hay empresas repetidas entre corporateSite y registralOnly.`,
        );
      }
      const expected = publicDecadeSlugs(decade.startYear, decade.endYear);
      const unionSet = new Set(union);
      const missing = expected.filter((slug) => !unionSet.has(slug));
      const extra = union.filter((slug) => !expected.includes(slug));
      if (missing.length > 0) {
        errors.push(
          `${label} publicSignal no cubre ${missing.length} empresas del periodo: ${missing.join(', ')}. Actualiza la validación de la década.`,
        );
      }
      if (extra.length > 0) {
        errors.push(
          `${label} publicSignal incluye empresas fuera del universo público: ${extra.join(', ')}.`,
        );
      }
    }
  }
}

// 5) Programas homónimos: el mismo nombre en la misma institución solo se
// permite si la modalidad difiere (evita tarjetas que parecen duplicadas).
const seenPrograms = new Map<string, string>();
for (const p of parsed['programs.json'] ?? []) {
  const key = `${p.institutionName}|${p.name}|${p.modality ?? 'unknown'}`;
  const prev = seenPrograms.get(key);
  if (prev) {
    errors.push(
      `[programs.json] "${p.slug}" repite nombre, institución y modalidad de "${prev}" — diferencia la modalidad o consolida los registros`,
    );
  } else {
    seenPrograms.set(key, p.slug);
  }
}

// Resultado.
if (errors.length > 0) {
  console.error(`\n✗ Validación fallida: ${errors.length} error(es)\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('\n✓ Todos los datos son válidos y consistentes.');
