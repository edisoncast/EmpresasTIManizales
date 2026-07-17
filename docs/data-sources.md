# Fuentes de datos

Última revisión documental: **2026-07-17**.

Este proyecto publica datos de procedencia diversa. Una fuente demuestra un dato concreto; no implica que el proyecto avale, recomiende o clasifique a una entidad. La presencia en el observatorio tampoco demuestra actividad operativa actual, calidad, tamaño ni capacidad de contratación.

## Fuentes por conjunto

| Conjunto | Fuente declarada | Alcance | Limitaciones |
|---|---|---|---|
| Empresas | [Base de datos de la Cámara de Comercio de Manizales por Caldas](https://ccmpc.org.co/basededatos/) | Registros con actividad económica relacionada con desarrollo de software (principalmente CIIU J6201), forma jurídica, municipio y fechas registrales disponibles. | La URL es un portal de consulta general, no un permalink por registro. Una matrícula o actividad declarada no prueba operación comercial actual. Los registros “En liquidación” se muestran como posiblemente inactivos. |
| Universidades | [Consulta pública de instituciones HECAA/SNIES](https://hecaa.mineducacion.gov.co/consultaspublicas/ies) | Existencia y datos institucionales públicos. | La presencia institucional no confirma por sí sola acreditación, oferta local o vigencia de cada programa. Sin fecha de consulta trazable, el estado es parcial o pendiente. |
| Programas | [Consulta pública de programas vigentes HECAA/SNIES](https://hecaa.mineducacion.gov.co/consultaspublicas/programasvigentes) | Nombre, institución, nivel, modalidad, sede, vigencia y códigos cuando están disponibles. | La consulta no genera un permalink por resultado; es necesario buscar nuevamente cada código y registrar la fecha de revisión. |
| Personas | Perfiles profesionales públicos, páginas de comunidades y perfiles académicos enlazados en cada registro. | Trayectoria pública y contribuciones al ecosistema. | No se valida vida privada, reputación ni popularidad. No se publican teléfonos, direcciones, correos privados ni identificadores personales. |
| Comunidades | Sitios oficiales y páginas públicas de Meetup enlazadas en cada registro. | Existencia, enfoque, organizadores y señales públicas de actividad. | Una página disponible no garantiza actividad reciente; la fecha de última revisión es indispensable. |
| Eventos | Fuente pública específica del evento cuando exista. | Fecha, modalidad, lugar y organización. | El conjunto está vacío a la fecha de corte; no se conservan convocatorias sin una fecha o fuente verificable. |
| Entidades de apoyo | Sitio institucional o registro público específico. | Función y relación con el ecosistema. | El conjunto está vacío a la fecha de corte. |

## Licencia y términos de uso por material

El repositorio usa licenciamiento por material (ver [`LICENSE`](../LICENSE) y
[`LICENSE-DATA`](../LICENSE-DATA)):

- **Datasets propios** (personas, comunidades, programas, universidades) y el contenido editorial: **CC BY-SA 4.0** (atribución + compartir igual; se permite uso comercial).
- **Empresas** (`companies.json`): derivado de la base de la **Cámara de Comercio de Manizales por Caldas**. Su fuente exige **atribución** y **uso no comercial**; ese dataset se reutiliza bajo esos términos (equivalente a CC BY-NC-SA 4.0), **no** bajo CC BY-SA 4.0. Cita siempre a la Cámara de Comercio de Manizales por Caldas como fuente.
- **Universidades y programas**: consultas públicas HECAA/SNIES del Ministerio de Educación; datos públicos, se citan con la fecha de revisión.
- **Código**: **MIT** (ver `LICENSE`).
- **Legado** (`legacy/`): **CC0 1.0** del repositorio original de 2020.

Nada de esto constituye asesoría legal; ante una reutilización con dudas, verifica los términos vigentes de cada fuente antes de publicar.

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

## Tamaño empresarial y presencia web

El tamaño empresarial publicado para las empresas procede del campo correspondiente en la base de la Cámara de Comercio; el proyecto no lo deduce por cantidad de empleados. El [Decreto 957 de 2019](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=94550) clasifica el tamaño exclusivamente por ingresos ordinarios anuales y establece umbrales distintos por sector. Para los registros de desarrollo de software, la interfaz usa como referencia los rangos del sector servicios y convierte las UVT a pesos con la [UVT 2026](https://normograma.dian.gov.co/dian/compilacion/docs/resolucion_dian_0238_2025.htm). La equivalencia en pesos es orientativa: no reemplaza la vigencia ni los ingresos usados por la Cámara en cada renovación.

La presencia web se revisa separadamente del estado registral. Al corte del 17 de julio de 2026:

- 675 empresas componen el conjunto;
- 560 están clasificadas como microempresa;
- 32 tienen sitio web o producto oficial identificado;
- 5 de las microempresas tienen al menos un enlace oficial identificado;
- 555 microempresas siguen pendientes de búsqueda de sitio web o LinkedIn corporativo.

El primer lote incorporó enlaces públicos para 4Lytics, Advancit, Appis Group, Beenova —mediante su producto DogtorSoftware— y Cinnco. Solo Cinnco obtuvo además un LinkedIn corporativo inequívoco. Un perfil personal que menciona una empresa sirve para investigar, pero no se guarda como LinkedIn corporativo. La búsqueda debe continuar por lotes y exige correspondencia de razón social, ciudad, NIT o una declaración equivalente en el sitio; no se asignan dominios por similitud de nombre.

## Mantenimiento

- Ejecutar `npm run validate:data` en cada cambio.
- Ejecutar `npm run audit:data` y revisar la distribución, no solo el código de salida.
- Ejecutar periódicamente `npm run validate:urls`; un enlace vivo no equivale a dato vigente.
- Conservar nombres anteriores, adquisiciones o cierres en `notes` con fuente, en lugar de sobrescribir la historia.
- No eliminar registros posiblemente inactivos sin trazabilidad; reclasificarlos y documentar la evidencia.

