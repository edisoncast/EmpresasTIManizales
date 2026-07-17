import { describe, it, expect } from 'vitest';
import {
  normalizeText,
  encodeFacet,
  matchesSearch,
  matchesFacet,
  filterItems,
  uniqueSorted,
  type FilterableItem,
} from '../src/lib/search';

describe('normalizeText', () => {
  it('quita acentos y pasa a minúsculas', () => {
    expect(normalizeText('Manizáles')).toBe('manizales');
    expect(normalizeText('  Café  ')).toBe('cafe');
    expect(normalizeText('Ñoño')).toBe('nono');
  });
});

describe('encodeFacet', () => {
  it('codifica valores normalizados y delimitados', () => {
    expect(encodeFacet(['Datos', 'IA'])).toBe('|datos|ia|');
    expect(encodeFacet([])).toBe('');
    expect(encodeFacet(['Sí'])).toBe('|si|');
  });
});

describe('matchesSearch', () => {
  it('coincide sin importar acentos ni mayúsculas', () => {
    expect(matchesSearch('Universidad de Caldas', 'caldas')).toBe(true);
    expect(matchesSearch('Universidad de Caldas', 'CÁLDAS')).toBe(true);
    expect(matchesSearch('Universidad de Caldas', 'bogota')).toBe(false);
  });
  it('consulta vacía siempre coincide', () => {
    expect(matchesSearch('cualquier cosa', '')).toBe(true);
  });
});

describe('matchesFacet', () => {
  const encoded = encodeFacet(['Manizales', 'Chinchiná']);
  it('coincide con un valor presente', () => {
    expect(matchesFacet(encoded, 'Manizales')).toBe(true);
    expect(matchesFacet(encoded, 'Chinchiná')).toBe(true);
  });
  it('no coincide con un valor ausente', () => {
    expect(matchesFacet(encoded, 'Bogotá')).toBe(false);
  });
  it('sin selección siempre coincide', () => {
    expect(matchesFacet(encoded, '')).toBe(true);
  });
});

describe('filterItems', () => {
  const items: FilterableItem[] = [
    {
      searchText: 'Casa de Software Manizales',
      facets: { city: encodeFacet(['Manizales']), category: encodeFacet(['Desarrollo de software']) },
    },
    {
      searchText: 'Estudio de Datos Chinchiná',
      facets: { city: encodeFacet(['Chinchiná']), category: encodeFacet(['Datos e IA']) },
    },
  ];

  it('filtra por búsqueda de texto', () => {
    const out = filterItems(items, { query: 'datos', selections: {} });
    expect(out).toHaveLength(1);
    expect(out[0].searchText).toContain('Datos');
  });

  it('filtra por faceta', () => {
    const out = filterItems(items, { query: '', selections: { city: 'Manizales' } });
    expect(out).toHaveLength(1);
    expect(out[0].facets.city).toBe('|manizales|');
  });

  it('combina búsqueda y facetas', () => {
    const out = filterItems(items, {
      query: 'estudio',
      selections: { category: 'Datos e IA' },
    });
    expect(out).toHaveLength(1);
  });

  it('devuelve vacío cuando nada coincide', () => {
    const out = filterItems(items, { query: 'inexistente', selections: {} });
    expect(out).toHaveLength(0);
  });
});

describe('uniqueSorted', () => {
  it('elimina duplicados y ordena', () => {
    expect(uniqueSorted(['b', 'a', 'b', 'c', ''])).toEqual(['a', 'b', 'c']);
  });
});
