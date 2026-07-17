# Fuentes de datos

Última revisión documental: **2026-07-16**.

Este proyecto publica datos de procedencia diversa. Una fuente demuestra un dato concreto; no implica que el proyecto avale, recomiende o clasifique a una entidad. La presencia en el observatorio tampoco demuestra actividad operativa actual, calidad, tamaño ni capacidad de contratación.

## Fuentes por conjunto

| Conjunto | Fuente declarada | Alcance | Limitaciones |
|---|---|---|---|
| Empresas | [Base de datos de la Cámara de Comercio de Manizales por Caldas](https://ccmpc.org.co/basededatos/) | Registros con actividad económica relacionada con desarrollo de software (principalmente CIIU J6201), forma jurídica, municipio y fechas registrales disponibles. | La URL es un portal de consulta general, no un permalink por registro. Una matrícula o actividad declarada no prueba operación comercial actual. Los registros “En liquidación” se muestran como posiblemente inactivos. |
| Universidades | [Consulta pública de instituciones HECAA/SNIES](https://hecaa.mineducacion.gov.co/consultaspublicas/ies) | Existencia y datos institucionales públicos. | La presencia institucional no confirma por sí sola acreditación, oferta local o vigencia de cada programa. Sin fecha de consulta trazable, el estado es parcial o pendiente. |
| Programas | [Consulta pública de programas HECAA/SNIES](https://hecaa.mineducacion.gov.co/consultaspublicas/programas) | Nombre, institución, nivel y códigos cuando están disponibles. | Una URL general exige buscar nuevamente el código. Modalidad, sede y vigencia deben revisarse por programa. |
| Personas | Perfiles profesionales públicos, páginas de comunidades y perfiles académicos enlazados en cada registro. | Trayectoria pública y contribuciones al ecosistema. | No se valida vida privada, reputación ni popularidad. No se publican teléfonos, direcciones, correos privados ni identificadores personales. |
| Comunidades | Sitios oficiales y páginas públicas de Meetup enlazadas en cada registro. | Existencia, enfoque, organizadores y señales públicas de actividad. | Una página disponible no garantiza actividad reciente; la fecha de última revisión es indispensable. |
| Eventos | Fuente pública específica del evento cuando exista. | Fecha, modalidad, lugar y organización. | El conjunto está vacío a la fecha de corte; no se conservan convocatorias sin una fecha o fuente verificable. |
| Entidades de apoyo | Sitio institucional o registro público específico. | Función y relación con el ecosistema. | El conjunto está vacío a la fecha de corte. |

## Evidencia local y legado

- `legacy/` conserva los Markdown del proyecto de 2020 sin reescribirlos. Son referencia histórica, no datos vigentes.
- El archivo empresarial original de 2020 no está preservado en el repositorio: `legacy/Empresas/empresas.md` remitía a un Google Drive externo. Por eso no es posible reproducir su número original desde esta copia.
- `empresas_tic_manizales.xlsx` e `informacion_exportada_20260716_152547.xlsx` están presentes como artefactos de trabajo. No existe aún un importador versionado ni checksums que demuestren automáticamente qué filas originaron cada registro JSON; esta brecha requiere revisión humana antes de considerar la cadena de procedencia completamente auditable.
- `src/data/data-audit.json` es un resumen generado por `npm run audit:data`; no es una fuente primaria.

## Niveles de verificación

- `verified`: los campos principales tienen una fuente pública registrada y una revisión fechada cuando corresponde.
- `partially_verified`: existe evidencia, pero falta confirmar vigencia, sede, modalidad u otro campo relevante, o no hay fecha de revisión trazable.
- `unknown`: la evidencia no permite afirmar el estado actual.
- `inactive_or_unverified`: hay una señal explícita de posible inactividad —por ejemplo, “En liquidación”— o no se pudo confirmar actividad reciente.
- `archived`: registro preservado exclusivamente como parte del archivo histórico.

Los estados `partially_verified`, `unknown` e `inactive_or_unverified` mantienen `needsVerification: true`. Un registro `verified` debe tener al menos una fuente y no puede quedar marcado como pendiente; los schemas Zod hacen cumplir estas reglas.

## Requisitos para nuevas fuentes

Una fuente debe ser pública, accesible y pertinente al campo respaldado. Se prefieren, en este orden:

1. registros y sistemas oficiales;
2. sitio institucional o página oficial de la entidad;
3. perfil profesional público controlado por la persona;
4. publicación periodística o académica identificable;
5. directorios secundarios, solo como apoyo y nunca como única evidencia de una afirmación sensible.

No se aceptan capturas sin procedencia, contenido generado por IA, resultados de buscador sin abrir la fuente, mensajes privados ni datos personales no relacionados con el propósito del observatorio.

Cuando sea posible, usar el arreglo `sources` con `url`, `title` y `reviewedAt`. `sourceUrl` se conserva como campo compatible para registros con una única fuente.

## Mantenimiento

- Ejecutar `npm run validate:data` en cada cambio.
- Ejecutar `npm run audit:data` y revisar la distribución, no solo el código de salida.
- Ejecutar periódicamente `npm run validate:urls`; un enlace vivo no equivale a dato vigente.
- Conservar nombres anteriores, adquisiciones o cierres en `notes` con fuente, en lugar de sobrescribir la historia.
- No eliminar registros posiblemente inactivos sin trazabilidad; reclasificarlos y documentar la evidencia.

