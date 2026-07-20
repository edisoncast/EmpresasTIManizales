import { z } from 'zod';
import {
  slugSchema,
  urlSchema,
  isoDateSchema,
  workModelSchema,
  companySizeSchema,
  auditableFields,
  enforceVerificationRules,
} from './common';

export const companySchema = z
  .object({
    name: z.string().trim().min(1),
    slug: slugSchema,
    description: z.string().optional(),
    website: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    instagram: urlSchema.optional(),
    facebook: urlSchema.optional(),
    // Perfil de X/Twitter, cuando la organización lo enlace o se confirme públicamente.
    x: urlSchema.optional(),
    github: urlSchema.optional(),
    youtube: urlSchema.optional(),
    // NIT (sin dígito de verificación o con guion), solo para personas jurídicas.
    nit: z.string().optional(),
    // Código CIIU de actividad económica principal, cuando esté disponible.
    ciiu: z.string().optional(),
    // Forma jurídica (S.A.S., Persona natural, Establecimiento de comercio, etc.).
    legalForm: z.string().optional(),
    // Fecha de matrícula mercantil (ISO). Indica antigüedad del registro.
    registeredAt: isoDateSchema.optional(),
    // Año de última renovación de matrícula mercantil (dato heredado, opcional).
    lastRenewalYear: z.number().int().optional(),
    city: z.string().min(1),
    department: z.string().min(1),
    country: z.string().min(1),
    categories: z.array(z.string().min(1)).default([]),
    technologies: z.array(z.string().min(1)).optional(),
    hasSoftwareDevelopmentHouse: z.boolean().optional(),
    workModel: workModelSchema.optional(),
    size: companySizeSchema.optional(),
    ...auditableFields,
  })
  .superRefine(enforceVerificationRules);

export type Company = z.infer<typeof companySchema>;
export const companiesSchema = z.array(companySchema);
