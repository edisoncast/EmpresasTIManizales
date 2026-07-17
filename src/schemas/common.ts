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
  .refine((v) => !Number.isNaN(Date.parse(v)), 'Debe ser una fecha ISO válida (YYYY-MM-DD)');

// Estado de verificación explícito (opcional). Si no se define, se deriva de
// needsVerification y del estado propio de la entidad (ver lib/verification.ts).
export const verificationStatusSchema = z.enum([
  'verified',
  'partially_verified',
  'unknown',
  'inactive_or_unverified',
  'archived',
]);

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
