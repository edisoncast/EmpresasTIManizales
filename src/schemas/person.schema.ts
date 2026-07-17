import { z } from 'zod';
import { slugSchema, urlSchema, isoDateSchema, verificationStatusSchema } from './common';

/**
 * Personas relevantes del ecosistema.
 * Reglas de privacidad aplicadas por el schema:
 * - Solo perfiles públicos (isPublicProfile = true).
 * - No se admiten campos de teléfono, correo privado ni dirección.
 * - El enfoque es el aporte público al ecosistema, no la vida privada.
 */
export const personSchema = z
  .object({
    name: z.string().min(1),
    slug: slugSchema,
    headline: z.string().optional(),
    shortBio: z.string().optional(),
    city: z.string().optional(),
    department: z.string().optional(),
    country: z.string().optional(),
    areas: z.array(z.string().min(1)).default([]),
    roles: z.array(z.string().min(1)).optional(),
    organizations: z.array(z.string().min(1)).optional(),
    contributions: z.array(z.string().min(1)).optional(),
    website: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    github: urlSchema.optional(),
    x: urlSchema.optional(),
    personalBrandLinks: z.array(urlSchema).optional(),
    isPublicProfile: z.boolean(),
    sourceUrl: urlSchema.optional(),
    lastVerifiedAt: isoDateSchema.optional(),
    verificationStatus: verificationStatusSchema.optional(),
    needsVerification: z.boolean(),
  })
  .refine((p) => p.isPublicProfile === true, {
    message: 'Solo se admiten personas con perfil público (isPublicProfile: true).',
    path: ['isPublicProfile'],
  })
  .refine((p) => Boolean(p.sourceUrl) || p.needsVerification === true, {
    message: 'Cada persona debe tener una fuente pública o quedar con needsVerification: true.',
    path: ['sourceUrl'],
  });

export type Person = z.infer<typeof personSchema>;
export const peopleSchema = z.array(personSchema);
