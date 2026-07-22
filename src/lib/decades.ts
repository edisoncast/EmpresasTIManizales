/**
 * Métricas de la sección "Evolución por décadas", calculadas siempre desde los
 * datos versionados (companies.json) y nunca escritas a mano. Funciones puras y
 * sin DOM para poder probarlas en unit tests y reutilizarlas entre décadas.
 */
import type { Company } from '../schemas';
import type { Decade } from '../schemas/decade.schema';
import { resolveVerification, type VerificationState } from './verification';

export interface YearCount {
  year: number;
  count: number;
}

export interface LabeledCount {
  label: string;
  count: number;
  slugs?: string[];
}

/** Año de matrícula mercantil del registro, si existe. */
export function registeredYear(company: Pick<Company, 'registeredAt'>): number | undefined {
  if (!company.registeredAt) return undefined;
  const year = Number(company.registeredAt.slice(0, 4));
  return Number.isFinite(year) ? year : undefined;
}

/** Empresas cuya matrícula cae dentro del rango [startYear, endYear]. */
export function companiesInRange<T extends Pick<Company, 'registeredAt'>>(
  companies: T[],
  startYear: number,
  endYear: number,
): T[] {
  return companies.filter((company) => {
    const year = registeredYear(company);
    return year !== undefined && year >= startYear && year <= endYear;
  });
}

/**
 * Matrículas por año dentro del rango, incluyendo los años sin registros (0),
 * para que la línea de tiempo no oculte los vacíos.
 */
export function yearDistribution(
  companies: Pick<Company, 'registeredAt'>[],
  startYear: number,
  endYear: number,
): YearCount[] {
  const counts = new Map<number, number>();
  for (const company of companiesInRange(companies, startYear, endYear)) {
    const year = registeredYear(company)!;
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  const result: YearCount[] = [];
  for (let year = startYear; year <= endYear; year++) {
    result.push({ year, count: counts.get(year) ?? 0 });
  }
  return result;
}

/** Distribución de estados de verificación resueltos (misma lógica del resto del sitio). */
export function verificationDistribution(
  companies: Array<{
    verificationStatus?: VerificationState;
    needsVerification?: boolean;
    status?: 'active' | 'inactive' | 'unknown';
  }>,
): Record<VerificationState, number> {
  const dist: Record<VerificationState, number> = {
    verified: 0,
    partially_verified: 0,
    unknown: 0,
    inactive_or_unverified: 0,
    archived: 0,
  };
  for (const company of companies) dist[resolveVerification(company)]++;
  return dist;
}

/**
 * Convierte los grupos de una clasificación de investigación en filas contables
 * y calcula cuántas empresas de la década quedaron sin clasificar. Así el
 * tamaño de muestra siempre acompaña a los porcentajes.
 */
export function classificationRows(
  groups: Array<{ label: string; slugs: string[] }>,
  decadeCompanySlugs: string[],
): { rows: LabeledCount[]; classified: number; unclassified: number } {
  const rows = groups.map((group) => ({
    label: group.label,
    count: group.slugs.length,
    slugs: group.slugs,
  }));
  const classifiedSlugs = new Set(groups.flatMap((group) => group.slugs));
  const classified = classifiedSlugs.size;
  const unclassified = decadeCompanySlugs.filter((slug) => !classifiedSlugs.has(slug)).length;
  return { rows, classified, unclassified };
}

/** Décadas ordenadas cronológicamente. */
export function sortedDecades(decades: Decade[]): Decade[] {
  return [...decades].sort((a, b) => a.startYear - b.startYear);
}
