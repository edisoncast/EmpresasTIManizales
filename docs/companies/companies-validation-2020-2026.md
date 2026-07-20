# Validación pública de empresas 2020–2026

Fecha de corte: **2026-07-20**  
Alcance: únicamente registros de `src/data/companies.json` cuya fecha `registeredAt` está entre 2020 y 2026. No se agregaron empresas ni se cambiaron años de matrícula.

## Resultado ejecutivo

Se procesaron **383 registros** en una primera pasada y una **segunda pasada exhaustiva de descubrimiento**. La inscripción de Cámara de Comercio se trató como evidencia de relación registral con Manizales o Caldas y de actividad declarada, no como prueba automática de actividad operativa en 2026. El hallazgo posterior de Zeissen Software corrigió una omisión de la primera pasada y motivó la revisión completa de los pendientes por razón social, nombre comercial, dominio y canales corporativos.

El 20 de julio se aplicó además una revisión reforzada a los registros aún pendientes de 2026: razón social exacta, NIT, variantes del nombre, dominios previsibles, perfiles corporativos y fuentes empresariales públicas. Este corte confirmó ocho empresas adicionales (incluida Adminsoft) y descartó dominios homónimos que no corresponden a sociedades de Caldas.

| Decisión | Registros | Tratamiento público |
| --- | ---: | --- |
| `include` | 43 | Se encontró una fuente corporativa o empresarial adicional que confirma identidad, actividad tecnológica y vínculo regional. |
| `needs_review` | 238 | Se mantiene la ficha con estado **Verificación parcial**; no debe describirse como empresa activa verificada. |
| `exclude_person_natural` | 71 | Se preserva el registro mercantil, pero no se genera tarjeta ni ruta pública de empresa. |
| `exclude_liquidation` | 22 | Se conserva para trazabilidad con estado posiblemente inactivo; no se presenta como vigente. |
| `exclude_no_local_connection` | 1 | `advancit`: sus canales corporativos sitúan su operación en Bogotá y Bucaramanga; no se confirmó vínculo actual con Caldas. |
| `exclude_not_technology_related` | 8 | Incluye `tecnnia` y siete sociedades o establecimientos cuya evidencia identifica comercio, publicidad, comunicación o servicios jurídicos, sin una capacidad tecnológica sustantiva comprobada. |
| **Total** | **383** | |

Los 238 casos pendientes no son una afirmación de cierre: indican que no se obtuvo una segunda fuente pública atribuible para confirmar oferta, operación actual y canales institucionales. La revisión no asignó URLs por coincidencia nominal.

## Empresas con evidencia adicional

| Periodo de matrícula | Empresa | Evidencia principal |
| --- | --- | --- |
| 2020–2022 | Am Soft S.A.S. | Sitio oficial de Manizales: alquiler y desarrollo de software. |
| 2020–2022 | Meeteam S.A.S. | Sitio y LinkedIn corporativo: automatización, IA y talento tecnológico desde Manizales. |
| 2020–2022 | Calima Technologies Colombia S.A.S. | Sitio y LinkedIn corporativo: datos, IA, integración y software. La vigencia jurídica local requiere seguimiento. |
| 2020–2022 | Porter Data S.A.S. | Sitio y LinkedIn corporativo: producto de analítica y reportes de marketing; el vínculo regional actual requiere seguimiento. |
| 2023–2024 | Fazzil S.A.S.; Appis Group S.A.S.; Odoo Xpert S.A.S.; Kivio S.A.S. | Registro empresarial activo o sitio/perfil corporativo con oferta de software. |
| 2023–2024 | Dateando S.A.S.; Nat.io S.A.S.; Maquinando Controls S.A.S.; Notarias Web S.A.S. | IA, datos, automatización industrial o registro empresarial activo. |
| 2023–2024 | Santisite; Formativa Technologies S.A.S.; Latinia S.A.S.; Startti S.A.S. | Sitio corporativo o registro empresarial público adicional. |
| 2025–2026 | Megapagos.co S.A.S.; Desarrollando Ando S.A.S.; Colombia Tech Festival S.A.S. | Plataformas o registro empresarial público adicional con vínculo regional. |
| 2025–2026 | Datalab Tech Systems S.A.S.; IAConexiones S.A.S.; Chatforse S.A.S. | Registro empresarial activo o sitio corporativo con oferta tecnológica y localización. |
| 2025–2026 | Zeissen Software S.A.S. | Sitio oficial: desarrollo a la medida, modernización de sistemas heredados, arquitectura cloud e integración. |
| Segunda pasada | Bibisoft, Bit Technologies, Geek Bunker, Pixel House, Softory, Openmarkt, Appsernet, Barco Visión, IT Forensic, Scribette, Nativo Digital Lab y OnePay. | Sitio corporativo, tienda oficial de aplicaciones o fuente institucional con identidad, oferta y vínculo regional comprobables. |

Las evidencias, los límites de cada conclusión y las fichas de los **383** registros están en los informes por lote:

- [2020–2022](research-2020-2022.md)
- [2023–2024](research-2023-2024.md)
- [2025–2026](research-2025-2026.md)

La segunda pasada queda documentada, por cada pendiente consultado, en:

- [2020–2022: segunda pasada](research-2020-2022-second-pass.md)
- [2023–2024: segunda pasada](research-2023-2024-second-pass.md)
- [2025–2026: segunda pasada](research-2025-2026-second-pass.md)

La revisión reforzada de los registros de 2026 está separada por grupos para facilitar su auditoría:

- [Grupo A](research-2026-reinforced-a.md)
- [Grupo B](research-2026-reinforced-b.md)
- [Grupo C](research-2026-reinforced-c.md)

## Canales públicos incorporados o confirmados

Se añadieron al modelo de empresa los campos de Instagram, Facebook, X/Twitter, GitHub y YouTube, además de sitio y LinkedIn. Sólo se cargaron canales cuando el sitio oficial los enlazaba o la identidad corporativa era inequívoca.

| Canal | Resultado de este corte |
| --- | --- |
| Sitio web | Se incorporaron o confirmaron sitios para Am Soft, Appis, Odoo Xpert, Kivio, Maquinando Controls, Santisite, Megapagos, Desarrollando Ando, IAConexiones y Chatforse, además de los sitios ya registrados de Calima, Latinia, Meeteam y Porter. |
| LinkedIn | Se incorporaron perfiles corporativos de Advancit (excluida), Kivio, Dateando, Maquinando Controls, Latinia, Meeteam y Porter; también se conservaron las referencias de Calima. |
| Instagram | Am Soft y Maquinando Controls, enlazados o identificados desde su presencia corporativa. |
| Facebook | Advancit (excluida por falta de vínculo regional actual). |
| X/Twitter | Am Soft; se incorporó porque el sitio oficial lo enlaza. |
| GitHub y YouTube | No se halló un canal corporativo atribuible con evidencia suficiente en este corte. |

Las fichas que sólo cuentan con la fuente general de Cámara permanecen en revisión. No se añadieron perfiles personales ni cuentas homónimas.

## Exclusiones y trazabilidad

- **Personas naturales:** las 71 del periodo se mantienen en `companies.json` para auditoría de la exportación, sin NIT público y sin generación de ruta o tarjeta. La exclusión se aplica en la capa de datos pública.
- **Liquidación:** las 20 razones sociales que incluyen “En liquidación” se conservan como histórico con `inactive_or_unverified`; la frase no se usa para inferir fecha o causa de cierre.
- **Relación regional:** Advancit conserva su registro y fuentes en el archivo, pero se excluye de la vista pública hasta que exista evidencia de operación en Manizales o Caldas.
- **Pertinencia tecnológica:** Tecnnia se excluye hasta contar con una fuente que contradiga o aclare la actividad de metales y extracción reportada.

## URLs rotas, dudosas o no atribuibles

- `appis.com.co` tuvo una respuesta incompleta en una consulta inicial, pero `appis.com.co/nosotros` se pudo consultar y fue la fuente usada.
- `kivio.com.co` sin subdominio no fue aceptado por el verificador; se normalizó a `https://www.kivio.com.co/` y se corroboró con LinkedIn.
- Los enlaces sociales de Am Soft se tomaron de su sitio oficial; su disponibilidad individual puede variar por las restricciones de cada red.
- No se atribuyeron perfiles para homónimos internacionales o nombres genéricos, entre ellos Hinova, Fubix y Nexora.

## Archivos modificados

- `src/data/companies.json`: fuentes, canales confirmados, descripciones y fechas de 43 casos con evidencia adicional.
- `src/schemas/company.schema.ts`: campos de canales corporativos.
- `src/pages/empresas/[slug].astro`: presentación segura de los canales corporativos disponibles.
- `src/lib/company-review.ts` y `src/lib/data.ts`: decisiones de inclusión pública y estado parcial para casos sin evidencia adicional.
- `scripts/audit-data.ts` y `docs/data-audit-2026.md`: auditoría alineada con el estado público efectivo.

## Validaciones

| Comando | Resultado |
| --- | --- |
| `npm run validate:data` | Pasó en Docker: 661 empresas y todos los conjuntos válidos. |
| `npm run audit:data` | Pasó en Docker; el resumen se regeneró en `src/data/data-audit.json`. |
| `npm run lint` | Pasó en Docker. |
| `npm run test` | Pasó en Docker: 24 pruebas unitarias. |
| `npm run build` | Pasó en Docker: build estático de 683 páginas. |
| `npm run test:e2e` | Pasó en Docker: 85 pruebas Playwright aprobadas; 10 capturas visuales intencionalmente omitidas por matriz de proyecto. |

## Próxima revisión humana

1. Solicitar por el flujo de contribución una URL corporativa o perfil institucional a los 238 pendientes que, aun tras dos pasadas, no tienen una coincidencia pública atribuible.
2. Solicitar a cada organización pendiente una URL corporativa o perfil enlazado desde su propio sitio.
3. Revalidar trimestralmente los casos incluidos con evidencia de directorio empresarial secundario, pues esa evidencia puede cambiar.
4. No promover un registro pendiente a verificado sólo por mantener CIIU tecnológico o por coincidencia de nombre en redes sociales.
