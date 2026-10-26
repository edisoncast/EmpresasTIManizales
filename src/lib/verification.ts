/**
 * Resuelve y describe el estado de verificación de una entidad.
 * Cinco estados (docs/design-direction.md) que se distinguen por forma de sello, nunca comunicados solo por color:
 * cada uno tiene label, símbolo y mensaje.
 */
export type VerificationState =
  'verified' | 'partially_verified' | 'unknown' | 'inactive_or_unverified' | 'archived';

export interface VerificationMeta {
  label: string;
  message: string;
  symbol: string;
  /** Valor corto y estable para filtros en la URL (?estado=parcial). */
  slug: string;
  /** Clases completas del sello (.stamp-*) y del punto, para que el JIT las genere. */
  badge: string;
  dot: string;
}

export const verificationMeta: Record<VerificationState, VerificationMeta> = {
  verified: {
    label: 'Verificado',
    slug: 'verificado',
    message: 'Verificado con fuentes públicas.',
    symbol: '✓',
    badge: 'stamp stamp-verified',
    dot: 'bg-ink-blue',
  },
  partially_verified: {
    label: 'Verificación parcial',
    slug: 'parcial',
    message: 'Parte de la información está verificada.',
    symbol: '◑',
    badge: 'stamp stamp-partial',
    dot: 'border-2 border-ink-blue bg-sheet',
  },
  unknown: {
    label: 'Estado por confirmar',
    slug: 'por-confirmar',
    message: 'Aún no contamos con evidencia suficiente.',
    symbol: '○',
    badge: 'stamp stamp-unknown',
    dot: 'border-2 border-dashed border-rule-strong',
  },
  inactive_or_unverified: {
    label: 'Posiblemente inactivo',
    slug: 'inactivo',
    message: 'No se confirmó actividad reciente.',
    symbol: '–',
    badge: 'stamp stamp-inactive',
    dot: 'bg-rust',
  },
  archived: {
    label: 'Archivo histórico',
    slug: 'archivo',
    message: 'Se conserva como parte del archivo.',
    symbol: '▤',
    badge: 'stamp stamp-archived',
    dot: 'bg-rule-strong',
  },
};

export const verificationOrder: VerificationState[] = [
  'verified',
  'partially_verified',
  'unknown',
  'inactive_or_unverified',
  'archived',
];

export interface VerifiableLike {
  verificationStatus?: VerificationState;
  needsVerification: boolean;
  /** Estado de actividad propio de comunidades. */
  status?: 'active' | 'inactive' | 'unknown';
}

/** Deriva el estado efectivo: explícito si existe; si no, se infiere. */
export function resolveVerification(entity: VerifiableLike): VerificationState {
  if (entity.verificationStatus) return entity.verificationStatus;

  if (entity.status) {
    if (entity.status === 'inactive') return 'inactive_or_unverified';
    if (entity.status === 'active') {
      return entity.needsVerification ? 'partially_verified' : 'verified';
    }
    return entity.needsVerification ? 'unknown' : 'verified';
  }

  return entity.needsVerification ? 'unknown' : 'verified';
}

export function verificationLabel(entity: VerifiableLike): string {
  return verificationMeta[resolveVerification(entity)].label;
}

/** Opción del filtro por estado: valor corto para la URL y etiqueta visible. */
export interface VerificationFacetOption {
  value: string;
  label: string;
}

/** Estados presentes en una colección, en orden canónico; nunca ofrece opciones con conteo cero. */
export function verificationFacetOptions(
  entities: readonly VerifiableLike[],
): VerificationFacetOption[] {
  const present = new Set(entities.map(resolveVerification));
  return verificationOrder
    .filter((state) => present.has(state))
    .map((state) => ({
      value: verificationMeta[state].slug,
      label: verificationMeta[state].label,
    }));
}

/** Slug del estado efectivo de una entidad, para `data-facet-estado`. */
export function verificationSlug(entity: VerifiableLike): string {
  return verificationMeta[resolveVerification(entity)].slug;
}
