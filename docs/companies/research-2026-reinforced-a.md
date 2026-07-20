# Revisión reforzada de empresas 2026 — grupo A

**Fecha de consulta:** 2026-07-20  
**Alcance:** Arcaico Research, Ardor Learning Colombia, Atrion Systems, Bodega Elite, Box 360, Bymed, Coreflow, Devix, Elorynsoft, Envirox Ecotech y Estratec 360. Adminsoft fue excluida expresamente de esta revisión.

## Regla aplicada

Una coincidencia se acepta solo cuando conecta la razón social/nombre comercial con la actividad y ubicación del registro de Caldas. Un dominio con el mismo nombre en otro país o sin NIT, ubicación o vínculo societario no se considera canal de la entidad local.

| Empresa / slug | Evidencia comprobada | Canales oficiales verificados | Estado recomendado | Certeza y nota |
| --- | --- | --- | --- | --- |
| Arcaico Research S.A.S. / `arcaico-research` | Se buscó la razón social exacta, variaciones y dominios plausibles; no se encontró una coincidencia empresarial pública que permita confirmar actividad o canal. El archivo aporta matrícula 2026 en Manizales y CIIU J6201 como fuente inicial. | Ninguno. | `needs_review` | Baja. No atribuir perfiles de arqueología o investigación de terceros a esta sociedad. |
| Ardor Learning Colombia S.A.S. / `ardor-learning-colombia` | [Registro RUES replicado](https://empresas.larepublica.co/colombia/caldas/manizales/ardor-learning-colombia-s-a-s-902031125) para NIT 902031125: matrícula activa, Manizales, hosting/procesamiento de datos y desarrollo de sistemas. | Ninguno confirmado. | `include` | Media-alta para existencia, vínculo local y actividad declarada; falta sitio o perfil corporativo. |
| Atrion Systems S.A.S. / `atrion-systems` | [Sitio de Atrion Systems](https://atrionsystems.com/) muestra explícitamente su registro en la Cámara de Comercio de Manizales, contacto en Manizales y oferta de software, automatización e IA. | Sitio oficial: `atrionsystems.com`. | `include` | Alta. El sitio enlaza de forma directa nombre, ubicación y propuesta tecnológica. |
| Bodega Elite S.A.S. / `bodega-elite` | [Dun & Bradstreet](https://www.dnb.com/business-directory/company-information.other_miscellaneous_retailers.co.caldas.html) y [Informa Colombia](https://www.informacolombia.com/directorio-empresas/actividad/J_INFORMACION-Y-COMUNICACIONES/localidad_manizales?qPg=9) la sitúan en Manizales, pero no explican con precisión su actividad tecnológica. | Un formulario titulado «Bodega Elite» aparece en resultados, sin identidad societaria verificable; no se incorpora. | `needs_review` | Media para existencia/localidad, baja para actividad tecnológica. |
| Box 360 S.A.S. / `box-360` | [Ficha empresarial](https://www.informacion-empresas.co/Empresa_BOX-360-SAS.html) asocia NIT 9020393955, Manizales y actividad principal de desarrollo de sistemas informáticos. | Ninguno confirmado. | `include` | Media-alta para identidad, ciudad y actividad declarada. |
| Bymed S.A.S. / `bymed` | Búsquedas por razón social exacta, NIT 902069947-9, variantes y dominios plausibles no devolvieron una coincidencia empresarial colombiana verificable. | Ninguno. | `needs_review` | Baja. No asociar resultados internacionales «Bymed» ni `bymed.com` con la sociedad de Manizales. |
| Coreflow S.A.S. / `coreflow` | Búsquedas por razón social, NIT 902071041-8 y «Riosucio, Caldas» no devolvieron un perfil que conecte inequívocamente la marca con la sociedad local. | Ninguno. | `needs_review` | Baja. No usar plataformas internacionales llamadas Coreflow como evidencia de esta sociedad. |
| Devix S.A.S. / `devix` | No se encontró una coincidencia local que vincule NIT 902062106-1 o Manizales. Los dominios `devix.com.br`, `devix.om`, `devixsystems.com` y otros resultados pertenecen a organizaciones de otros países o sin relación demostrada con la sociedad colombiana. | Ninguno. | `needs_review` | Baja. Los resultados homónimos son falsos positivos y no deben agregarse. |
| Elorynsoft / `elorynsoft` | [Sitio ElorynSoft](https://elorynsoft.com/) se describe como estudio de software de Manizales y muestra software a medida, IA y el producto Eloryn Contable. Su [página de producto](https://elorynsoft.com/contable) nombra «ElorynSoft S.A.S.», Manizales y CIIU 6201. | Sitio oficial: `elorynsoft.com`. | `needs_review` | Alta para marca, oferta y ciudad; media para relación con el registro concreto porque el archivo lo contiene como **establecimiento de comercio** sin NIT/titular y el sitio se identifica como S.A.S. Confirmar la matrícula/titular antes de unirlos. |
| Envirox Ecotech S.A.S. / `envirox-ecotech` | [LinkedIn corporativo](https://www.linkedin.com/company/envirox-ecotech) identifica la firma en Manizales y documenta ingeniería ambiental, integración tecnológica, monitoreo/análisis de datos y una plataforma de sostenibilidad. | LinkedIn corporativo. | `include` | Alta. Tiene capacidad tecnológica relevante, aunque su foco principal es ambiental y no una casa de software generalista. |
| Estratec 360 S.A.S. / `estratec-360` | [Ficha empresarial](https://empresas.portafolio.co/ESTRATEC-360-SAS.html) vincula NIT 9020598381, Manizales y desarrollo de sistemas. [Directorio local](https://aunclic.com.co/business/3652) describe a la razón social exacta como consultoría estratégica, desarrollo tecnológico, automatización y analítica de datos. | Ninguno confirmado. **No usar** `estratec360.com`: su aviso legal identifica a Estratec360, S.L., de Barcelona, España, no a la S.A.S. colombiana. | `include` | Media-alta para registro, localización y capacidad; falta canal corporativo propio verificable. |

## Resultado

| Decisión | Total | Empresas |
| --- | ---: | --- |
| `include` | 5 | Ardor Learning Colombia, Atrion Systems, Box 360, Envirox Ecotech, Estratec 360. |
| `needs_review` | 6 | Arcaico Research, Bodega Elite, Bymed, Coreflow, Devix, Elorynsoft. |
| `exclude_*` | 0 | Ninguna: la ausencia de presencia pública no demuestra liquidación, falta de relación local ni ausencia de actividad. |

## Recomendación antes de modificar datos

Para los seis pendientes, consultar certificado/estado de RUES o CCMPC por NIT y, en los establecimientos de comercio, identificar el titular. Las coincidencias descartadas por homonimia deben quedar fuera del registro para evitar enlaces erróneos.
