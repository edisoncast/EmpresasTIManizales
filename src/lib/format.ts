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

/**
 * Agrupa un año en su década como rango legible: 2013 -> '2010–2019'.
 * Si se pasa `maxYear` y cae dentro de la década, recorta el final del rango
 * (ej. 2023 con maxYear 2026 -> '2020–2026') para no anunciar años sin datos.
 */
export function decadeLabel(year: number, maxYear?: number): string {
  if (!Number.isFinite(year)) return '';
  const start = Math.floor(year / 10) * 10;
  const end =
    maxYear !== undefined && maxYear >= start && maxYear < start + 9 ? maxYear : start + 9;
  return `${start}–${end}`;
}

/** Quita el esquema y el www de una URL para mostrarla más corta. */
export function displayUrl(url: string | undefined | null): string {
  if (!url) return '';
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}
