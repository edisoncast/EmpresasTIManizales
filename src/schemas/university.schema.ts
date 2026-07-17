import { z } from 'zod';
import {
  slugSchema,
  urlSchema,
  isoDateSchema,
  institutionTypeSchema,
  verificationStatusSchema,
} from './common';

export const universitySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
  website: urlSchema.optional(),
  city: z.string().min(1),
  department: z.string().min(1),
  country: z.string().min(1),
  institutionType: institutionTypeSchema,
  accredited: z.boolean().optional(),
  sniesCode: z.string().optional(),
  // slugs de programas relacionados (relación universidad -> programas)
  programs: z.array(slugSchema).default([]),
  sourceUrl: urlSchema.optional(),
  lastVerifiedAt: isoDateSchema.optional(),
  verificationStatus: verificationStatusSchema.optional(),
  needsVerification: z.boolean(),
});

export type University = z.infer<typeof universitySchema>;
export const universitiesSchema = z.array(universitySchema);
