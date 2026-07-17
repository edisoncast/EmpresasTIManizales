/**
 * Carga y valida todos los datasets del ecosistema en tiempo de build.
 * Si algún archivo no cumple su schema Zod, el build falla con un mensaje claro.
 * Esta es la única puerta de entrada a los datos para páginas y componentes.
 */
import companiesRaw from '../data/companies.json';
import universitiesRaw from '../data/universities.json';
import programsRaw from '../data/programs.json';
import peopleRaw from '../data/people.json';
import communitiesRaw from '../data/communities.json';
import eventsRaw from '../data/events.json';
import supportEntitiesRaw from '../data/supportEntities.json';

import {
  companiesSchema,
  universitiesSchema,
  programsSchema,
  peopleSchema,
  communitiesSchema,
  eventsSchema,
  supportEntitiesSchema,
  type Company,
  type University,
  type Program,
  type Person,
  type Community,
  type Event,
  type SupportEntity,
} from '../schemas';

function parseOrThrow<T>(schema: { parse: (v: unknown) => T }, raw: unknown, name: string): T {
  try {
    return schema.parse(raw);
  } catch (err) {
    // Re-lanzamos con contexto del archivo para facilitar el diagnóstico en build.
    throw new Error(`Error validando ${name}: ${(err as Error).message}`);
  }
}

const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name, 'es');

export const companies: Company[] = parseOrThrow(
  companiesSchema,
  companiesRaw,
  'companies.json',
).sort(byName);
export const universities: University[] = parseOrThrow(
  universitiesSchema,
  universitiesRaw,
  'universities.json',
).sort(byName);
export const programs: Program[] = parseOrThrow(programsSchema, programsRaw, 'programs.json').sort(
  byName,
);
export const people: Person[] = parseOrThrow(peopleSchema, peopleRaw, 'people.json').sort(byName);
export const communities: Community[] = parseOrThrow(
  communitiesSchema,
  communitiesRaw,
  'communities.json',
).sort(byName);
export const events: Event[] = parseOrThrow(eventsSchema, eventsRaw, 'events.json');
export const supportEntities: SupportEntity[] = parseOrThrow(
  supportEntitiesSchema,
  supportEntitiesRaw,
  'supportEntities.json',
).sort(byName);

/** Métricas para la home y la página de ecosistema. */
export const stats = {
  companies: companies.length,
  universities: universities.length,
  programs: programs.length,
  people: people.length,
  communities: communities.length,
  events: events.length,
  supportEntities: supportEntities.length,
};

/* ---------- Accesores por slug ---------- */
export const getCompany = (slug: string) => companies.find((c) => c.slug === slug);
export const getUniversity = (slug: string) => universities.find((u) => u.slug === slug);
export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
export const getPerson = (slug: string) => people.find((p) => p.slug === slug);
export const getCommunity = (slug: string) => communities.find((c) => c.slug === slug);

/* ---------- Relaciones ---------- */
/** Programas que pertenecen a una universidad (por institutionSlug o por lista programs). */
export function programsForUniversity(university: University): Program[] {
  return programs
    .filter((p) => p.institutionSlug === university.slug || university.programs.includes(p.slug))
    .sort(byName);
}

/** Universidad de un programa, si está registrada. */
export function universityForProgram(program: Program): University | undefined {
  if (program.institutionSlug) return getUniversity(program.institutionSlug);
  return universities.find((u) => u.programs.includes(program.slug));
}

/** Comunidades organizadas por una persona. */
export function communitiesForPerson(person: Person): Community[] {
  return communities.filter((c) => c.organizerSlug === person.slug);
}

/** Persona organizadora de una comunidad, si está registrada. */
export function organizerForCommunity(community: Community): Person | undefined {
  return community.organizerSlug ? getPerson(community.organizerSlug) : undefined;
}

export type { Company, University, Program, Person, Community, Event, SupportEntity };
