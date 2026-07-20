# Auditoría de datos 2026

Fecha de corte: **2026-07-20**  
Comando reproducible: `npm run audit:data`  
Resumen legible por máquina: `src/data/data-audit.json`

> Las cifras vigentes se calculan en vivo desde los datos (ver `/metodologia` en el sitio y `src/data/data-audit.json`). Esta bitácora es una lectura fechada del inventario en el corte indicado; cada ficha además lleva su propia fecha de revisión, que puede ser posterior.

## Resumen ejecutivo

El repositorio contiene **778 registros**. La curaduría pública de empresas 2020–2026 confirmó evidencia adicional para 22 registros y reclasificó 268 como pendientes, pues una matrícula o actividad declarada no prueba por sí sola operación vigente. El corte resultante presenta **384** registros verificados, **302** parcialmente verificados, **91** posiblemente inactivos y **1** archivado. Los posiblemente inactivos incluyen 88 empresas cuya razón social contiene “En liquidación” y programas sin actividad confirmada en HECAA. No existen registros en estado desconocido ni registros verificados sin fuente declarada.

La auditoría sintáctica y referencial pasa, pero la cadena de procedencia no es completa: las empresas apuntan a un portal registral general y no a permalinks individuales; universidades y programas heredados no tenían fecha de revisión; el listado empresarial original de 2020 estaba en un Drive externo no preservado. Por estas razones se requiere mantenimiento humano continuo y no se debe interpretar el directorio como certificación de actividad.

## Línea base original encontrada

El material preservado en `legacy/` permite reproducir **44 registros estructurados**:

| Tipo | Registros encontrados | Observación |
|---|---:|---|
| Empresas | No cuantificable | El Markdown original remite a un Google Drive externo que no está preservado. |
| Universidades / centros | 9 | Tabla en `legacy/Estudio/Universidades/Resultados.md`. |
| Programas académicos | 30 | Totales declarados en el estudio original. |
| Comunidades / meetups | 5 | Tabla en `legacy/Meetups/Eventos.md`. |

Los cinco organizadores del documento de meetups son referencias a personas, pero no se contabilizan como fichas originales independientes. Esta decisión evita inflar el baseline.

## Inventario actual

| Conjunto | Registros |
|---|---:|
| Empresas | 661 |
| Universidades | 9 |
| Programas | 68 |
| Personas | 24 |
| Comunidades | 4 |
| Eventos | 0 |
| Entidades de apoyo | 12 |
| **Total** | **778** |

## Estado de verificación

| Estado | Registros | Interpretación |
|---|---:|---|
| `verified` | 384 | Fuente registrada y sin señal pendiente en el modelo actual. Incluye empresas con evidencia corporativa o empresarial adicional, perfiles de personas con LinkedIn público contrastado, instituciones verificadas, programas con evidencia oficial y entidades de apoyo con fuente pública. |
| `partially_verified` | 302 | Empresas, instituciones, programas y personas con fuente, pero con verificación incompleta o pendiente de una URL pública específica. Incluye 268 empresas 2020–2026 sin evidencia pública adicional que confirme continuidad operativa. |
| `unknown` | 0 | No hay fichas en estado desconocido. |
| `inactive_or_unverified` | 91 | 88 empresas cuya razón social contiene “En liquidación” y otros registros preservados sin actividad confirmada (programas inactivos en HECAA); se conservan con trazabilidad y requieren revisión humana. |
| `archived` | 1 | Antecedente comunitario conservado con fuente histórica; no se presenta como actividad actual. |

Otros indicadores:

- **393** registros mantienen `needsVerification: true`.
- **9** registros no tienen `lastVerifiedAt`.
- **0** registros carecen de fuente declarada.
- **0** registros `verified` carecen de fuente.
- **94** registros empresariales corresponden a negocios registrados como persona natural; no exponen NIT, teléfono, correo ni dirección personal.
- **0** nombres empresariales se repiten. Los 19 pares empresa/establecimiento de comercio se consolidaron con trazabilidad en `docs/company-consolidation-2026.md`.

## Cambios relevantes frente a 2020

- El alcance empresarial pasó de un archivo externo no reproducible a 661 registros JSON consultables y validados. Se consolidaron pares empresa/establecimiento de comercio para evitar duplicados en el directorio.
- Las 9 instituciones y los 30 programas del estudio histórico se preservan. La conciliación SNIES de 2026 incorporó y normalizó la oferta de la Universidad de Caldas, Universidad Autónoma de Manizales, Universidad Católica de Manizales, Universidad Nacional de Colombia - Sede Manizales, Universidad de Manizales y SENA Regional Caldas, para un total actual de **68 programas**; las fichas permanecen parciales o pendientes cuando no existe evidencia específica suficiente.
- El conjunto actual contiene 3 comunidades activas: Manizales Tech Talks, AWS User Group Manizales y AI Tinkerers Manizales. ManizalesJS, CoffeeDev y Seguridad Informática Hacking Manizales se reconocen como iniciativas históricas que ayudaron a abrir camino, pero no se presentan como comunidades activas. DragonJAR se conserva como antecedente histórico: la evidencia pública confirma que nació como comunidad en línea en 2001 y tuvo encuentros en Manizales, sin clasificarla como meetup local activo.
- El conjunto actual contiene 24 personas basadas en contribuciones públicas, sin ranking. La mayoría tiene una URL pública de LinkedIn o de perfil académico contrastada y se consideran completos según el criterio editorial definido por el mantenedor. Andrés Marino Álvarez Meza y Herman Freddy Hincapié Ochoa conservan estado parcial porque no se encontró una URL personal atribuible sin ambigüedad.
- Eventos y entidades de apoyo tienen schema y UI, pero no contienen registros; el estado vacío es intencional y no se llenó con datos ficticios.
- Se introdujeron estados de verificación, fechas, fuentes, notas y conservación del material `legacy/`.

## Registros que requieren revisión humana

1. Las **88 empresas “En liquidación”**: confirmar estado jurídico y actividad operativa; archivar solo con evidencia.
2. Las **302 fichas parcialmente verificadas**: completar la revisión humana y, de ser posible, registrar una URL específica por entidad o programa. La curaduría empresarial 2020–2026 está detallada en `docs/companies/companies-validation-2020-2026.md`; la conciliación SNIES pendiente está detallada en `docs/snies-validation-2026.md`.
3. Los **94 negocios de persona natural**: revisar periódicamente minimización de datos y pertinencia para el ecosistema; nunca incorporar identificadores personales.
4. Las cuatro comunidades heredadas ausentes del dataset actual: decidir entre revalidar, marcar inactivas o archivar con fuente.
5. Los artefactos XLSX: documentar origen, fecha, licencia/condiciones de uso, checksum y transformación a JSON.
6. Los 14 perfiles incorporados durante la revisión: contrastar cargos, vínculos regionales y contribuciones con una segunda fuente pública antes de marcarlos como verificados.

## Supuestos tomados

- “Verificado” describe la evidencia del registro, no calidad, recomendación ni actividad comercial actual.
- La frase “En liquidación” en la razón social es evidencia suficiente para evitar presentar vigencia, pero no para afirmar cierre definitivo.
- Una fuente general de consulta se acepta temporalmente, aunque tiene menor reproducibilidad que un permalink individual.
- La ausencia de fecha impide presentar una ficha heredada como completamente verificada, aunque exista una fuente pública.
- Las coincidencias de razón social entre empresa y establecimiento de comercio se consolidan en una ficha canónica, preservando los slugs retirados en la documentación de trazabilidad.
- Los conteos de 2020 incluyen únicamente tablas y cifras preservadas en el repositorio.

## Riesgos de calidad de datos

| Riesgo | Severidad | Mitigación actual |
|---|---|---|
| Fuente empresarial general sin enlace por registro | `HIGH` | Estado visible, fecha, NIT solo para personas jurídicas y revisión humana pendiente. |
| XLSX sin importador/checksum versionado | `HIGH` | Artefactos conservados; no se afirma trazabilidad completa. |
| Vigencia académica sin fecha | `MEDIUM` | Reclasificación a parcial/pendiente. |
| Empresas en liquidación mezcladas con el directorio | `MEDIUM` | Estado `inactive_or_unverified`, nota visible y conservación histórica. |
| Dos perfiles de personas sin LinkedIn público atribuible | `MEDIUM` | Se mantienen como `partially_verified`; no se asignó una coincidencia por inferencia. |
| Conjuntos vacíos de eventos y apoyo | `LOW` | UI de estado vacío y contribución; no se inventan fixtures públicos. |
| Enlaces externos que cambian | `LOW` | Link check semanal informativo. |

## Próximos pasos recomendados

1. Crear un importador reproducible para la exportación registral, con checksum, fecha de corte y reporte de altas/cambios/bajas.
2. Obtener enlaces o identificadores específicos de consulta para cada entidad cuando la fuente lo permita.
3. Revisar las 88 empresas en liquidación por lotes documentados.
4. Revalidar universidades y programas contra HECAA/SNIES, guardando fecha y fuente por ficha.
5. Resolver el estado de las comunidades heredadas y poblar eventos/apoyo solo con fuentes actuales.
6. Definir una periodicidad: empresas trimestral o semestral; academia semestral; comunidades/eventos mensual.
7. Añadir revisión por segunda persona para cambios de estado y datos de personas naturales.

## Reproducibilidad

```bash
npm ci
npm run validate:data
npm run audit:data
```

El script falla indirectamente mediante la validación Zod si un registro verificado carece de fuente o si un estado no concluyente no conserva `needsVerification: true`. El resumen debe revisarse como evidencia; un exit code `0` no reemplaza la evaluación curatorial.
