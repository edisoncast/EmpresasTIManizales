/**
 * Lógica de búsqueda y filtrado, pura y sin dependencias del DOM.
 * Se reutiliza tanto en el script de cliente que filtra tarjetas como en los tests.
 */

/** Normaliza texto: minúsculas y sin acentos, para búsquedas tolerantes. */
export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** Codifica una lista de valores de faceta como cadena delimitada: ['a','b'] -> '|a|b|'. */
export function encodeFacet(values: readonly string[]): string {
  if (values.length === 0) return '';
  return `|${values.map((v) => normalizeText(v)).join('|')}|`;
}

/** ¿El texto (ya normalizado o no) contiene la consulta? */
export function matchesSearch(haystack: string, query: string): boolean {
  const q = normalizeText(query);
  if (q.length === 0) return true;
  return normalizeText(haystack).includes(q);
}

/** ¿La faceta codificada contiene el valor seleccionado? Sin selección => coincide. */
export function matchesFacet(encoded: string, selected: string): boolean {
  if (!selected) return true;
  return encoded.includes(`|${normalizeText(selected)}|`);
}

export interface FilterableItem {
  /** Texto plano donde buscar (nombre, descripción, ciudad, etc.). */
  searchText: string;
  /** Facetas codificadas por clave, ej. { city: '|manizales|', categories: '|datos|ia|' }. */
  facets: Record<string, string>;
}

export interface FilterState {
  query: string;
  /** Selección por clave de faceta (cadena vacía = sin filtro). */
  selections: Record<string, string>;
}

/** Aplica búsqueda + facetas a una lista de items. Función pura, testeable. */
export function filterItems<T extends FilterableItem>(items: T[], state: FilterState): T[] {
  return items.filter((item) => {
    if (!matchesSearch(item.searchText, state.query)) return false;
    for (const [key, selected] of Object.entries(state.selections)) {
      const encoded = item.facets[key] ?? '';
      if (!matchesFacet(encoded, selected)) return false;
    }
    return true;
  });
}

/** Devuelve valores únicos ordenados alfabéticamente (para poblar selects de filtros). */
export function uniqueSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, 'es'));
}
