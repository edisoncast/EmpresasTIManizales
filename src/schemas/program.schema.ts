import { z } from 'zod';
import {
  slugSchema,
  urlSchema,
  programLevelSchema,
  modalitySchema,
  auditableFields,
  enforceVerificationRules,
} from './common';

export const programSchema = z
  .object({
    name: z.string().trim().min(1),
    slug: slugSchema,
    institutionName: z.string().min(1),
    // slug de la universidad (relación programa -> universidad). Opcional para
    // programas de instituciones aún no registradas como universidad.
    institutionSlug: slugSchema.optional(),
    level: programLevelSchema,
    modality: modalitySchema.optional(),
    city: z.string().min(1),
    area: z.array(z.string().min(1)).default([]),
    credits: z.number().int().positive().optional(),
    durationSemesters: z.number().positive().optional(),
    sniesCode: z.string().optional(),
    senaProgramCode: z.string().trim().min(1).optional(),
    website: urlSchema.optional(),
    ...auditableFields,
  })
  .superRefine(enforceVerificationRules);

export type Program = z.infer<typeof programSchema>;
export const programsSchema = z.array(programSchema);
