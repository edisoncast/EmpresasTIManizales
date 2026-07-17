import { z } from 'zod';
import { slugSchema, urlSchema, isoDateSchema, verificationStatusSchema } from './common';

export const communitySchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  description: z.string().optional(),
  focus: z.array(z.string().min(1)).default([]),
  city: z.string().optional(),
  department: z.string().optional(),
  website: urlSchema.optional(),
  meetup: urlSchema.optional(),
  organizer: z.string().optional(),
  // slug de la persona organizadora, si está registrada
  organizerSlug: slugSchema.optional(),
  contact: urlSchema.optional(),
  status: z.enum(['active', 'inactive', 'unknown']).default('unknown'),
  sourceUrl: urlSchema.optional(),
  lastVerifiedAt: isoDateSchema.optional(),
  verificationStatus: verificationStatusSchema.optional(),
  needsVerification: z.boolean(),
});

export type Community = z.infer<typeof communitySchema>;
export const communitiesSchema = z.array(communitySchema);
