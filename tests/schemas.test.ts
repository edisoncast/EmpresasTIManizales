import { describe, it, expect } from 'vitest';
import {
  companiesSchema,
  universitiesSchema,
  programsSchema,
  peopleSchema,
  communitiesSchema,
  personSchema,
  companySchema,
  slugSchema,
} from '../src/schemas';

import companies from '../src/data/companies.json';
import universities from '../src/data/universities.json';
import programs from '../src/data/programs.json';
import people from '../src/data/people.json';
import communities from '../src/data/communities.json';

describe('los datasets reales cumplen su schema', () => {
  it('companies.json', () => {
    expect(companiesSchema.safeParse(companies).success).toBe(true);
  });
  it('universities.json', () => {
    expect(universitiesSchema.safeParse(universities).success).toBe(true);
  });
  it('programs.json', () => {
    expect(programsSchema.safeParse(programs).success).toBe(true);
  });
  it('people.json', () => {
    expect(peopleSchema.safeParse(people).success).toBe(true);
  });
  it('communities.json', () => {
    expect(communitiesSchema.safeParse(communities).success).toBe(true);
  });
});

describe('slugSchema', () => {
  it('acepta kebab-case', () => {
    expect(slugSchema.safeParse('universidad-de-caldas').success).toBe(true);
  });
  it('rechaza mayúsculas y espacios', () => {
    expect(slugSchema.safeParse('Universidad De Caldas').success).toBe(false);
    expect(slugSchema.safeParse('con espacio').success).toBe(false);
  });
});

describe('reglas de privacidad de personas', () => {
  const base = {
    name: 'Ejemplo Público',
    slug: 'ejemplo-publico',
    areas: ['Comunidad'],
    isPublicProfile: true,
    sourceUrl: 'https://ejemplo.com',
    needsVerification: false,
  };

  it('acepta un perfil público con fuente', () => {
    expect(personSchema.safeParse(base).success).toBe(true);
  });

  it('rechaza perfiles no públicos', () => {
    expect(personSchema.safeParse({ ...base, isPublicProfile: false }).success).toBe(false);
  });

  it('exige fuente o needsVerification', () => {
    const { sourceUrl: _sourceUrl, ...noSource } = base;
    expect(personSchema.safeParse(noSource).success).toBe(false);
    expect(personSchema.safeParse({ ...noSource, needsVerification: true }).success).toBe(true);
  });
});

describe('companySchema', () => {
  it('exige needsVerification', () => {
    const { needsVerification: _needsVerification, ...rest } = {
      name: 'X',
      slug: 'x',
      city: 'Manizales',
      department: 'Caldas',
      country: 'Colombia',
      categories: [],
      needsVerification: false,
    };
    expect(companySchema.safeParse(rest).success).toBe(false);
  });
  it('rechaza URLs inválidas', () => {
    expect(
      companySchema.safeParse({
        name: 'X',
        slug: 'x',
        city: 'Manizales',
        department: 'Caldas',
        country: 'Colombia',
        categories: [],
        website: 'no-es-url',
        needsVerification: true,
      }).success,
    ).toBe(false);
  });
});
