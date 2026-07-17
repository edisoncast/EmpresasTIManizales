import { z } from 'zod';
import {
  slugSchema,
  urlSchema,
  isoDateSchema,
  programLevelSchema,
  modalitySchema,
  verificationStatusSchema,
} from './common';

export const programSchema = z.object({
  name: z.string().min(1),
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
  website: urlSchema.optional(),
  sourceUrl: urlSchema.optional(),
  lastVerifiedAt: isoDateSchema.optional(),
  verificationStatus: verificationStatusSchema.optional(),
  needsVerification: z.boolean(),
});

export type Program = z.infer<typeof programSchema>;
export const programsSchema = z.array(programSchema);
