import { describe, it, expect } from 'vitest';
import {
  registeredYear,
  companiesInRange,
  yearDistribution,
  verificationDistribution,
  classificationRows,
} from '../src/lib/decades';
import { companies, decades } from '../src/lib/data';

const fixture = [
  { slug: 'a', registeredAt: '1991-02-01', needsVerification: false },
  { slug: 'b', registeredAt: '1996-05-10', needsVerification: false },
  { slug: 'c', registeredAt: '1996-11-30', needsVerification: true },
  { slug: 'd', registeredAt: '2004-01-15', needsVerification: false },
  { slug: 'e', needsVerification: true },
];

describe('registeredYear', () => {
  it('extrae el año de matrícula y tolera registros sin fecha', () => {
    expect(registeredYear({ registeredAt: '1991-02-01' })).toBe(1991);
    expect(registeredYear({})).toBeUndefined();
  });
});

describe('companiesInRange', () => {
  it('filtra por rango inclusivo y excluye registros sin fecha', () => {
    const result = companiesInRange(fixture, 1990, 1999);
    expect(result.map((c) => c.slug)).toEqual(['a', 'b', 'c']);
  });
});

describe('yearDistribution', () => {
  it('incluye los años sin registros para no ocultar vacíos', () => {
    const dist = yearDistribution(fixture, 1990, 1999);
    expect(dist).toHaveLength(10);
    expect(dist.find((y) => y.year === 1996)?.count).toBe(2);
    expect(dist.find((y) => y.year === 1995)?.count).toBe(0);
    expect(dist.reduce((sum, y) => sum + y.count, 0)).toBe(3);
  });
});

describe('verificationDistribution', () => {
  it('resuelve estados con la misma lógica del resto del sitio', () => {
    const dist = verificationDistribution([
      { needsVerification: false },
      { needsVerification: true },
      { verificationStatus: 'archived', needsVerification: false },
    ]);
    expect(dist.verified).toBe(1);
    expect(dist.unknown).toBe(1);
    expect(dist.archived).toBe(1);
  });
});

describe('classificationRows', () => {
  it('cuenta clasificadas y no clasificadas para exponer el tamaño de muestra', () => {
    const { rows, classified, unclassified } = classificationRows(
      [
        { label: 'Producto', slugs: ['a', 'b'] },
        { label: 'Servicios', slugs: ['c'] },
      ],
      ['a', 'b', 'c', 'x', 'y'],
    );
    expect(rows.map((r) => r.count)).toEqual([2, 1]);
    expect(classified).toBe(3);
    expect(unclassified).toBe(2);
  });
});

/**
 * Invariantes sobre los datos reales: si la investigación y los datos se
 * desincronizan, estas pruebas fallan antes de publicar métricas rotas.
 */
describe('decades.json es consistente con companies.json', () => {
  const published = decades.filter((d) => d.status === 'published');

  it('existe al menos una década publicada y las cuatro décadas del modelo', () => {
    expect(decades).toHaveLength(4);
    expect(published.length).toBeGreaterThanOrEqual(1);
  });

  for (const decade of published) {
    describe(decade.slug, () => {
      const decadeCompanies = companiesInRange(companies, decade.startYear, decade.endYear);
      const decadeSlugs = new Set(decadeCompanies.map((c) => c.slug));

      it('la línea de tiempo suma el total de empresas del periodo', () => {
        const byYear = yearDistribution(companies, decade.startYear, decade.endYear);
        expect(byYear.reduce((sum, y) => sum + y.count, 0)).toBe(decadeCompanies.length);
      });

      it('toda empresa clasificada existe y pertenece al periodo', () => {
        const referenced = [
          ...(decade.offerClassification?.groups ?? []),
          ...(decade.confidence?.groups ?? []),
        ].flatMap((group) => group.slugs);
        for (const slug of referenced) {
          expect(decadeSlugs.has(slug), `slug fuera del periodo: ${slug}`).toBe(true);
        }
      });

      it('clasificadas + sin clasificar = universo del periodo', () => {
        const { classified, unclassified } = classificationRows(
          decade.offerClassification?.groups ?? [],
          decadeCompanies.map((c) => c.slug),
        );
        expect(classified + unclassified).toBe(decadeCompanies.length);
      });

      it('la señal pública cubre exactamente el universo del periodo', () => {
        const union = [
          ...(decade.publicSignal?.corporateSite ?? []),
          ...(decade.publicSignal?.registralOnly ?? []),
        ];
        expect(new Set(union).size).toBe(union.length);
        expect(new Set(union)).toEqual(decadeSlugs);
      });
    });
  }
});
