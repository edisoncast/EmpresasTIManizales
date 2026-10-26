import { describe, expect, it } from 'vitest';
import {
  verificationFacetOptions,
  verificationMeta,
  verificationSlug,
} from '../src/lib/verification';
import { encodeFacet, matchesFacet } from '../src/lib/search';

describe('verificationSlug', () => {
  it('usa el estado explícito y cae al derivado cuando falta', () => {
    expect(
      verificationSlug({ verificationStatus: 'partially_verified', needsVerification: false }),
    ).toBe('parcial');
    expect(verificationSlug({ needsVerification: true })).toBe('por-confirmar');
    expect(verificationSlug({ needsVerification: false, status: 'inactive' })).toBe('inactivo');
  });

  it('tiene un slug único por estado', () => {
    const slugs = Object.values(verificationMeta).map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('verificationFacetOptions', () => {
  it('ofrece solo los estados presentes, en orden canónico y con etiqueta visible', () => {
    const options = verificationFacetOptions([
      { verificationStatus: 'archived', needsVerification: false },
      { needsVerification: false },
      { verificationStatus: 'archived', needsVerification: false },
    ]);
    expect(options).toEqual([
      { value: 'verificado', label: 'Verificado' },
      { value: 'archivo', label: 'Archivo histórico' },
    ]);
  });

  it('el valor del filtro coincide con el atributo codificado de la ficha', () => {
    const item = { verificationStatus: 'partially_verified' as const, needsVerification: false };
    const encoded = encodeFacet([verificationSlug(item)]);
    expect(matchesFacet(encoded, 'parcial')).toBe(true);
    expect(matchesFacet(encoded, 'verificado')).toBe(false);
  });
});
