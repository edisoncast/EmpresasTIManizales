import { z } from 'zod';
import { slugSchema, isoDateSchema, urlSchema } from './common';

/**
 * Modelo común de la sección "Evolución por décadas".
 *
 * Cada década separa dos planos que nunca deben mezclarse:
 *  - Métricas calculadas en build desde `companies.json` (conteos, línea de
 *    tiempo, verificación). No viven aquí: se derivan en `src/lib/decades.ts`.
 *  - Contenido de investigación (clasificaciones, hallazgos, vacíos), que se
 *    versiona aquí y referencia empresas por `slug`. `validate:data` verifica
 *    que cada slug exista y esté matriculado dentro del rango de la década.
 *
 * `status` controla la publicación: solo las décadas `published` generan página
 * de detalle; las demás aparecen como "investigación en curso" en el índice.
 *
 * Alcance actual: empresas. El plan de producto es que cada década incorpore
 * también universidades, programas, personas y comunidades cuando exista
 * investigación terminada por periodo. Esos frentes se agregarán como bloques
 * OPCIONALES nuevos de este mismo schema (p. ej. `universities`, `communities`)
 * con la misma regla: contenido citado con fuentes, referencias por slug
 * validadas en `validate:data` y métricas calculadas desde los datos.
 */

/** Grupo de empresas bajo una misma clasificación de la investigación. */
const companyGroupSchema = z.object({
  label: z.string().trim().min(1),
  slugs: z.array(slugSchema).min(1),
});

/** Bloque de clasificación con nota metodológica obligatoria (qué significa). */
const classificationSchema = z.object({
  // La nota explica el alcance del número (ej. "oferta observable hoy, no de la década").
  note: z.string().trim().min(1),
  groups: z.array(companyGroupSchema).min(1),
});

export const decadeSchema = z
  .object({
    // kebab: "1990-1999". Debe coincidir con startYear-endYear (lo valida validate:data).
    slug: z.string().regex(/^\d{4}-\d{4}$/, 'El slug de década debe tener el formato AAAA-AAAA'),
    startYear: z.number().int().min(1900),
    endYear: z.number().int().min(1900),
    status: z.enum(['published', 'in_research']),
    // --- Contenido editorial (obligatorio solo en décadas publicadas) ---
    title: z.string().trim().min(1).optional(),
    /** Frase principal que caracteriza el periodo (máx. ~30 palabras). */
    lede: z.string().trim().min(1).optional(),
    /** Descripción editorial de 100–160 palabras. */
    description: z.string().trim().min(1).optional(),
    /** Fecha de corte de la investigación que sustenta el contenido. */
    researchCutoff: isoDateSchema.optional(),
    /** Entre 3 y 5 hallazgos sustentados por la investigación. */
    findings: z.array(z.string().trim().min(1)).min(3).max(5).optional(),
    /** Tipo de oferta observable hoy para las empresas con ficha de investigación. */
    offerClassification: classificationSchema.optional(),
    /** Nivel de confianza de la investigación por empresa. */
    confidence: classificationSchema.optional(),
    /** Evidencia pública actual: sitio corporativo vs. solo señal registral. */
    publicSignal: z
      .object({
        note: z.string().trim().min(1),
        corporateSite: z.array(slugSchema),
        registralOnly: z.array(slugSchema),
      })
      .optional(),
    /** Sectores observables en la comunicación actual (cualitativo, sin cifras). */
    sectorsObserved: z
      .object({
        note: z.string().trim().min(1),
        items: z.array(z.string().trim().min(1)).min(1),
      })
      .optional(),
    /** Lectura prudente del alcance geográfico del periodo. */
    geographyNote: z.string().trim().min(1).optional(),
    /** Capas de oferta que estructuran el relato del periodo. */
    layers: z
      .array(
        z.object({
          title: z.string().trim().min(1),
          text: z.string().trim().min(1),
          slugs: z.array(slugSchema).default([]),
        }),
      )
      .optional(),
    /** Trayectorias que ilustran un patrón documentado (no un ranking). */
    representative: z
      .array(
        z.object({
          pattern: z.string().trim().min(1),
          slugs: z.array(slugSchema).min(1),
        }),
      )
      .optional(),
    /** Cierres/adquisiciones documentados; se registra la nota, no se infiere. */
    closuresNote: z.string().trim().min(1).optional(),
    /**
     * Contexto documentado del periodo que conecta la década con otros frentes
     * del ecosistema (formación, comunidades). Cada nota cita sus fuentes y
     * distingue hechos de vínculos aún no verificados.
     */
    contextNotes: z
      .array(
        z.object({
          title: z.string().trim().min(1),
          text: z.string().trim().min(1),
          sources: z
            .array(
              z.object({
                title: z.string().trim().min(1),
                url: urlSchema,
                consultedAt: isoDateSchema.optional(),
              }),
            )
            .min(1),
        }),
      )
      .optional(),
    /** Qué no se puede afirmar todavía con la evidencia disponible. */
    gaps: z.array(z.string().trim().min(1)).min(1).optional(),
    /** Documentos de investigación en el repositorio que sustentan la década. */
    sources: z
      .array(
        z.object({
          title: z.string().trim().min(1),
          /** Ruta del documento dentro del repositorio (docs/...). */
          path: z.string().trim().min(1),
          consultedAt: isoDateSchema.optional(),
        }),
      )
      .min(1)
      .optional(),
  })
  .superRefine((decade, ctx) => {
    if (decade.endYear < decade.startYear) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endYear'],
        message: 'endYear no puede ser anterior a startYear.',
      });
    }
    if (decade.status === 'published') {
      const required: Array<keyof typeof decade> = [
        'title',
        'lede',
        'description',
        'researchCutoff',
        'findings',
        'offerClassification',
        'publicSignal',
        'gaps',
        'sources',
      ];
      for (const field of required) {
        if (decade[field] === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `Una década publicada requiere "${String(field)}".`,
          });
        }
      }
    }
  });

export type Decade = z.infer<typeof decadeSchema>;
export const decadesSchema = z.array(decadeSchema);
