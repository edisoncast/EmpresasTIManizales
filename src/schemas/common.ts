import { z } from 'zod';

/**
 * Piezas reutilizables para todos los schemas del ecosistema.
 * Mantener aquí los enums y validadores compartidos evita divergencias.
 */

// slug: minúsculas, números y guiones. Es la clave de las rutas /entidad/[slug].
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug debe ser kebab-case (ej. universidad-de-caldas)');

// URL http/https opcional. Rechaza cadenas vacías para no dejar enlaces rotos.
export const urlSchema = z
  .string()
  .trim()
  .url('Debe ser una URL válida (http/https)')
  .refine((u) => u.startsWith('http://') || u.startsWith('https://'), {
    message: 'La URL debe iniciar con http:// o https://',
  });

// Fecha ISO 8601 (YYYY-MM-DD o con hora). Se valida como cadena parseable.
export const isoDateSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2}))?$/,
    'Debe usar formato ISO 8601 (YYYY-MM-DD o fecha y hora con zona)',
  )
  .refine((v) => {
    if (v.length === 10) {
      return new Date(`${v}T00:00:00Z`).toISOString().startsWith(v);
    }
    return !Number.isNaN(Date.parse(v));
  }, 'Debe ser una fecha ISO válida');

// Estado de verificación explícito (opcional). Si no se define, se deriva de
// needsVerification y del estado propio de la entidad (ver lib/verification.ts).
export const verificationStatusSchema = z.enum([
  'verified',
  'partially_verified',
  'unknown',
  'inactive_or_unverified',
  'archived',
]);

export const sourceSchema = z.object({
  url: urlSchema,
  title: z.string().trim().min(1).optional(),
  reviewedAt: isoDateSchema.optional(),
});

/** Campos de procedencia compartidos. sourceUrl se conserva por compatibilidad. */
export const auditableFields = {
  sourceUrl: urlSchema.optional(),
  sources: z.array(sourceSchema).min(1).optional(),
  firstSeenAt: isoDateSchema.optional(),
  lastVerifiedAt: isoDateSchema.optional(),
  verificationStatus: verificationStatusSchema.optional(),
  needsVerification: z.boolean(),
  notes: z.string().trim().min(1).optional(),
};

interface AuditableEntity {
  sourceUrl?: string;
  sources?: Array<{ url: string }>;
  verificationStatus?: z.infer<typeof verificationStatusSchema>;
  needsVerification: boolean;
}

/** Reglas semánticas que evitan presentar registros sin evidencia como verificados. */
export function enforceVerificationRules(entity: AuditableEntity, ctx: z.RefinementCtx): void {
  const hasSource = Boolean(entity.sourceUrl) || Boolean(entity.sources?.length);
  const state = entity.verificationStatus ?? (entity.needsVerification ? 'unknown' : 'verified');

  if (state === 'verified' && !hasSource) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['sourceUrl'],
      message: 'Un registro verificado debe incluir al menos una fuente pública.',
    });
  }

  if (state === 'verified' && entity.needsVerification) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['needsVerification'],
      message: 'Un registro verificado no puede quedar marcado como pendiente.',
    });
  }

  if (
    ['partially_verified', 'unknown', 'inactive_or_unverified'].includes(state) &&
    !entity.needsVerification
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['needsVerification'],
      message: 'Los estados no concluyentes deben conservar needsVerification: true.',
    });
  }
}

export const workModelSchema = z.enum(['remote', 'hybrid', 'onsite', 'unknown']);
export const companySizeSchema = z.enum(['micro', 'small', 'medium', 'large', 'unknown']);
export const institutionTypeSchema = z.enum(['public', 'private', 'unknown']);
export const modalitySchema = z.enum(['onsite', 'remote', 'hybrid', 'unknown']);

export const programLevelSchema = z.enum([
  'technical',
  'technological',
  'undergraduate',
  'specialization',
  'masters',
  'doctorate',
  'bootcamp',
  'unknown',
]);

// Etiquetas legibles en español para los enums (usadas en la UI).
export const labels = {
  workModel: {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial',
    unknown: 'Sin definir',
  },
  size: {
    micro: 'Micro',
    small: 'Pequeña',
    medium: 'Mediana',
    large: 'Grande',
    unknown: 'Sin definir',
  },
  institutionType: {
    public: 'Oficial / Pública',
    private: 'Privada',
    unknown: 'Sin definir',
  },
  modality: {
    onsite: 'Presencial',
    remote: 'Virtual / Remoto',
    hybrid: 'Híbrido',
    unknown: 'Sin definir',
  },
  programLevel: {
    technical: 'Técnico',
    technological: 'Tecnológico',
    undergraduate: 'Pregrado',
    specialization: 'Especialización',
    masters: 'Maestría',
    doctorate: 'Doctorado',
    bootcamp: 'Bootcamp',
    unknown: 'Sin definir',
  },
} as const;
