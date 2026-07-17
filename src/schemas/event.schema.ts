import { z } from 'zod';
import {
  slugSchema,
  urlSchema,
  isoDateSchema,
  modalitySchema,
  auditableFields,
  enforceVerificationRules,
} from './common';

export const eventSchema = z
  .object({
    name: z.string().trim().min(1),
    slug: slugSchema,
    description: z.string().optional(),
    // Fecha de inicio. Si es un evento recurrente sin fecha fija, dejar vacío y usar needsVerification.
    date: isoDateSchema.optional(),
    endDate: isoDateSchema.optional(),
    city: z.string().optional(),
    venue: z.string().optional(),
    modality: modalitySchema.optional(),
    organizerCommunity: z.string().optional(),
    organizerCommunitySlug: slugSchema.optional(),
    topics: z.array(z.string().min(1)).default([]),
    url: urlSchema.optional(),
    ...auditableFields,
  })
  .superRefine(enforceVerificationRules);

export type Event = z.infer<typeof eventSchema>;
export const eventsSchema = z.array(eventSchema);
