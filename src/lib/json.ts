/**
 * Serializa JSON para insertarlo dentro de una etiqueta <script> sin permitir
 * que contenido contribuido cierre la etiqueta o cree markup ejecutable.
 */
export function serializeJsonForHtml(value: unknown): string {
  const escapes: Record<string, string> = {
    '<': '\\u003c',
    '>': '\\u003e',
    '&': '\\u0026',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029',
  };

  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => escapes[character]);
}
