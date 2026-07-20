# Validación pública de empresas 1991–1999

Fecha de corte: **2026-07-20**  
Alcance: empresas de `src/data/companies.json` cuya fecha `registeredAt` está entre 1991 y 1999. No se agregaron empresas ni se modificaron fechas de matrícula.

## Resultado ejecutivo

Se revisaron **13 empresas** ya registradas para complementar sus fichas con información pública actual. La revisión diferencia la oferta actual publicada de la actividad que cada empresa tenía en el momento de su matrícula: un sitio vigente confirma identidad y oferta actual, pero no demuestra por sí solo que esa oferta existiera durante toda la década de 1990.

| Resultado | Empresas | Tratamiento |
| --- | ---: | --- |
| Oferta, identidad y vínculo regional confirmados con sitio corporativo | 12 | Se actualizó la fecha de revisión, la descripción o las capacidades cuando la fuente lo respaldaba. |
| Identidad registral confirmada; oferta pública insuficiente para ampliar | 1 | `Sistemas Municipales S.A.S.` conserva su descripción cauta y requiere una fuente que explique su producto o servicio. |
| Empresas nuevas agregadas | 0 | Fuera de alcance. |
| Fechas de matrícula modificadas | 0 | Fuera de alcance. |

## Complementos aplicados

| Empresa | Evidencia actual consultada | Información incorporada o confirmada |
| --- | --- | --- |
| DSI S.A. | Sitio actual, sitio histórico y LinkedIn corporativo | Se actualizó el sitio principal a `dsi-software.co`, se conservaron las fuentes históricas y se añadieron LinkedIn, Instagram y Facebook enlazados desde el sitio. La descripción incorpora ERP Fortuner, Vision, facturación y nómina electrónica, POS e inteligencia analítica. |
| Azen Consultoría en Sistemas S.A.S. | Sitio oficial | Se precisó su oferta de ERP, aplicaciones móviles, automatización, logística, georreferenciación y arquitectura AWS. |
| Sistemas Municipales S.A.S. | URL pública existente y registro ya documentado | Se renovó la fecha de revisión. La URL no expone contenido comercial suficiente en esta consulta; no se inventaron producto, sector ni canales. |
| Software de Colombia S.A.S. | Claus y canal oficial de YouTube suministrado | Se registró Claus como sitio principal y su canal de YouTube. La ficha describe la plataforma de gestión contable, fiscal y empresarial y sus módulos publicados. |
| Computar S.A.S. | Sitio corporativo, ficha mercantil y documento público ya registrados | Se conserva la verificación del 20 de julio y la descripción de integración, seguridad y continuidad operativa. |
| Apolo Ingeniería S.A.S. | Sitio oficial | Se refinó la descripción de Mekano ERP, facturación y nómina electrónica, IA y desarrollo web; se añadieron capacidades publicadas. |
| Cafenet Comunicaciones S.A. | Sitio oficial | Se confirmaron Facebook, Instagram y X/Twitter desde los enlaces del sitio corporativo y se renovó la revisión del portafolio de telecomunicaciones. |
| Data y Service S.A.S. | Sitio oficial y LinkedIn corporativo | Se añadió LinkedIn; se confirmaron infraestructura TI, ciberseguridad, continuidad, consultoría y datos como oferta vigente. |
| Automatización y Virtualización Ingeniería S.A.S. (AYV) | Sitio oficial | Se precisó el alcance de Albatros Suite y las capacidades de monitoreo, SAT, nube, IoT y APIs. |
| Controlsoft S.A.S. | Sitio oficial | Se renovó la revisión y se añadieron capacidades explícitas de control de pesaje, integración ERP, reconocimiento de matrículas y automatización. |
| Data3.000 S.A.S. | Sitio oficial y LinkedIn corporativo | Se añadieron LinkedIn, Facebook e Instagram enlazados desde el sitio oficial; se conserva la oferta de gestión documental, digitalización y custodia. |
| Insoft S.A.S. | Sitio oficial de ContaPyme y fuentes corporativas existentes | Se completó la descripción de ContaPyme con contabilidad NIIF, facturación electrónica, nómina, inventarios, cartera y proveedores. |
| Venus Ingeniería de Software Ltda. | Sitio oficial | Se renovó la evidencia y se añadieron capacidades públicas de desarrollo, gestión de información, soporte TI y asesoría de hardware. |

## Canales públicos confirmados en este corte

Los canales se incorporaron sólo cuando estaban enlazados desde el sitio de la empresa o cuando la identidad corporativa era inequívoca.

| Empresa | Canales añadidos o confirmados |
| --- | --- |
| DSI S.A. | LinkedIn, Instagram y Facebook. |
| Software de Colombia S.A.S. | YouTube de ClausERP. |
| Cafenet Comunicaciones S.A. | Facebook, Instagram y X/Twitter. |
| Data y Service S.A.S. | LinkedIn. |
| Data3.000 S.A.S. | LinkedIn, Facebook e Instagram. |

No se añadieron cuentas por coincidencia de nombre para Apolo, Azen, AYV, Computar, Controlsoft, Insoft, Sistemas Municipales ni Venus.

## Límites y seguimiento humano

- **Sistemas Municipales:** la URL asociada no permitió identificar una oferta comercial verificable durante esta revisión. La ficha continúa sustentada en el registro mercantil y debe recibir una fuente empresarial directa antes de afirmar productos o sectores atendidos.
- **Oferta histórica:** las capacidades descritas en esta revisión corresponden a las páginas vigentes en 2026. La evolución histórica se debe documentar en las fichas de investigación de 1990–1999, no inferirse a partir del portafolio actual.
- **Sitios accesibles de forma variable:** algunas redes sociales y sitios presentan restricciones de consulta automatizada; no se interpretó una restricción de acceso como evidencia de cierre.

## Archivos modificados

- `src/data/companies.json`: descripciones, capacidades, sitios, canales oficiales, fuentes y fechas de revisión de empresas entre 1991 y 1999.
- `docs/companies/companies-validation-1991-1999.md`: este reporte de trazabilidad.

## Próximos pasos de curaduría

1. Pedir a Sistemas Municipales una fuente pública que describa su producto, mercado y estado actual.
2. Para el relato histórico de cada década, buscar versiones archivadas de los sitios, catálogos, entrevistas o notas de prensa fechadas; los sitios actuales no reemplazan esa evidencia.
3. Revalidar trimestralmente los enlaces sociales y corporativos, priorizando los perfiles que no se pueden consultar sin iniciar sesión.
