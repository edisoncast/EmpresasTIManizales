/**
 * Resuelve y describe el estado de verificación de una entidad.
 * Cinco estados sobrios (docs/design-direction.md), nunca comunicados solo por color:
 * cada uno tiene label, símbolo y mensaje.
 */
export type VerificationState =
  'verified' | 'partially_verified' | 'unknown' | 'inactive_or_unverified' | 'archived';

export interface VerificationMeta {
  label: string;
  message: string;
  symbol: string;
  /** Clases Tailwind completas (para que el JIT las genere). */
  badge: string;
  dot: string;
}

export const verificationMeta: Record<VerificationState, VerificationMeta> = {
  verified: {
    label: 'Verificado',
    message: 'Verificado con fuentes públicas.',
    symbol: '✓',
    badge: 'bg-verified-bg text-verified',
    dot: 'bg-verified',
  },
  partially_verified: {
    label: 'Verificación parcial',
    message: 'Parte de la información está verificada.',
    symbol: '◑',
    badge: 'bg-partial-bg text-partial',
    dot: 'bg-partial',
  },
  unknown: {
    label: 'Estado por confirmar',
    message: 'Aún no contamos con evidencia suficiente.',
    symbol: '○',
    badge: 'bg-pending-bg text-pending',
    dot: 'bg-pending',
  },
  inactive_or_unverified: {
    label: 'Posiblemente inactivo',
    message: 'No se confirmó actividad reciente.',
    symbol: '–',
    badge: 'bg-inactive-bg text-inactive',
    dot: 'bg-inactive',
  },
  archived: {
    label: 'Archivo histórico',
    message: 'Se conserva como parte del archivo.',
    symbol: '▤',
    badge: 'bg-archived-bg text-archived',
    dot: 'bg-archived',
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
