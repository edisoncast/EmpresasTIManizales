import { z } from 'zod';
import { slugSchema, urlSchema, auditableFields, enforceVerificationRules } from './common';

/**
 * Entidades de apoyo al ecosistema: cámaras de comercio, gremios, incubadoras,
 * clústeres, entidades públicas de fomento, fondos, etc.
 */
export const supportEntitySchema = z
  .object({
    name: z.string().trim().min(1),
    slug: slugSchema,
    description: z.string().optional(),
    kind: z
      .enum([
        'cluster',
        'chamber',
        'guild',
        'incubator',
        'accelerator',
        'public',
        'fund',
        'ngo',
        'other',
        'unknown',
      ])
      .default('unknown'),
    city: z.string().optional(),
    department: z.string().optional(),
    website: urlSchema.optional(),
    linkedin: urlSchema.optional(),
    focus: z.array(z.string().min(1)).default([]),
    ...auditableFields,
  })
  .superRefine(enforceVerificationRules);

export type SupportEntity = z.infer<typeof supportEntitySchema>;
export const supportEntitiesSchema = z.array(supportEntitySchema);
