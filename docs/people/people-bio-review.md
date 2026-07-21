# Revisión de biografías de personas — 2026

Corte: **2026-07-20**. Trabajo editorial para enriquecer el campo `shortBio` de las personas del observatorio, a partir de sus fuentes públicas ya registradas (`sourceUrl` y perfiles públicos), sin cambiar el esquema ni la interfaz.

Método: seis tareas paralelas (un agente por grupo de perfiles afines) que consultaron las fuentes públicas de cada persona (`sourceUrl`, LinkedIn/GitHub/X, sitios propios) mediante fetch y búsqueda web restringida, y reescribieron el `shortBio` en tono neutral y factual (~60–90 palabras), centrado en el aporte público al ecosistema. Un coordinador integró los resultados en `src/data/people.json` por `slug`, reemplazando únicamente `shortBio`. No se agregó ni eliminó ninguna persona; no se tocaron otros campos.

## Resumen

| Métrica | Valor |
| --- | --- |
| Personas en alcance | 24 |
| `shortBio` reescritos (`updated`) | 23 |
| Conservados por fuentes insuficientes (`kept`) | 1 |
| Longitud (palabras) | 30–90 (los `updated`, 68–90) |
| Con lenguaje de ranking en el nuevo bio | 0 |
| Con datos personales (correo/tel/dirección/cédula) | 0 |

## Reglas aplicadas

- **Sin invención:** cada dato nuevo se respalda en una fuente pública consultada (documentada abajo) o en los campos ya provistos (`roles`, `organizations`, `contributions`). Donde las fuentes no permitieron ampliar con solidez, se conservó lo esencial y se marcó `kept`.
- **Tono neutral, sin ranking:** se eliminó el lenguaje valorativo ("referente", superlativos). Excepción factual: "investigador senior por MinCiencias" (categoría oficial, no halago).
- **Privacidad (Ley 1581):** solo actividad pública profesional; sin correos, teléfonos, direcciones ni cédulas.
- **Verificación sin cambios:** esta tanda no modificó `verificationStatus` ni `needsVerification` (el alcance fue el contenido del bio).

## Caso conservado (`kept`)

- **Hernando Acosta Clavijo** — todas sus fuentes estaban inaccesibles al momento de la revisión: el `sourceUrl` (eje21.com) devolvió 403, el sitio corporativo (dsigrupo.com) rechazó la conexión y LinkedIn requiere autenticación. La búsqueda pública no aportó material biográfico adicional. Se conservó el `shortBio` previo (reconstruido solo con los campos ya registrados), sin agregar hechos no respaldados. Queda como candidato a una segunda fuente cuando haya material público disponible.

## Fuentes muertas o con reserva (documentadas por el flujo)

- **Meetup de Seguridad Informática y Hacking Manizales** (`sourceUrl` de Jaime Restrepo): devuelve 404. El bio se sustentó en `dragonjar.org` y la historia pública de la DragonJAR Security Conference.
- **LinkedIn**: no es consultable sin sesión; en todos los casos donde era la fuente, los hechos se corroboraron por vías públicas alternativas (sitios propios, prensa regional, directorios institucionales) o se conservaron de los campos provistos.
- **La Patria** (`lapatria.com`): redirige a `archivo.lapatria.com`, versión efectivamente consultada (CityTaxi, Porter Metrics).
- **Agregadores académicos** (`sciprofiles.com`, `researchgate.net`): varios devolvieron 403 en fetch directo; los datos académicos se tomaron de Google Scholar y de búsquedas restringidas a dominios oficiales.
- **Datos derivados de agregadores/búsqueda** (no de una ficha oficial dedicada): decanato 2014–2018 y coordinación de Talento Tech (Luis Fernando Castillo); empleador actual (Santiago Loaiza); formación de posgrado (Kenny Gómez). Son datos públicos profesionales; convienen una segunda fuente oficial si se quieren afianzar.

## Observaciones fuera de alcance

- El campo `contributions` de **Óscar Giraldo** conserva la frase "Referente del emprendimiento de software de Manizales con alcance global", con lenguaje valorativo. No se modificó por estar fuera del alcance de esta tanda (solo `shortBio`); se recomienda ajustarla a tono neutral en una curaduría de `contributions`.

## Archivos modificados

- `src/data/people.json` — se reescribió `shortBio` en 23 registros (1 conservado). No se tocó ningún otro campo.

## Validaciones del proyecto

| Comando | Resultado |
| --- | --- |
| `npm run validate:data` | OK |
| `npm run lint` | OK |
| `npm run test` | OK |
| `npm run build` | OK |
| `npm run format:check` | OK |
| `npm run test:e2e` (Playwright) | Se ejecuta en CI (job `validate`) sobre el PR |

## Confirmaciones

- Se procesaron las 24 personas; 23 con bio enriquecido, 1 conservado por fuentes insuficientes.
- No se agregó ni eliminó ninguna persona; solo se reescribió `shortBio`.
- Cada bio se basó en fuentes públicas consultadas o en los campos ya registrados; lo no verificable se omitió.
- Sin datos personales, sin lenguaje de ranking en los bios nuevos.
