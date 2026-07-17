import { labels } from '../schemas/common';

/** Traduce un valor de enum a su etiqueta legible en español; si no existe, devuelve el valor. */
export function label<K extends keyof typeof labels>(
  group: K,
  value: string | undefined | null,
): string {
  if (!value) return labels[group]['unknown' as keyof (typeof labels)[K]] as string;
  const map = labels[group] as Record<string, string>;
  return map[value] ?? value;
}

/** Formatea una fecha ISO a formato legible (es-CO). Devuelve '' si no hay fecha. */
export function formatDate(iso: string | undefined | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Quita el esquema y el www de una URL para mostrarla más corta. */
export function displayUrl(url: string | undefined | null): string {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}
