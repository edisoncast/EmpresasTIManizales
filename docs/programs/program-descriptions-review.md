# Revisión de descripciones de programas — 2026

Corte: **2026-07-20**. Trabajo editorial para completar la descripción de los programas académicos de las cinco universidades de Manizales, a partir de las URLs oficiales ya registradas.

Método: cinco tareas paralelas (un agente por universidad) que consultaron la URL oficial de cada programa y redactaron una descripción original (qué estudia, capacidades, áreas de aplicación y enfoque), de ~70–120 palabras, en tono neutral. Un coordinador integró los resultados en `src/data/programs.json` para evitar conflictos sobre el mismo archivo. No se agregó ni eliminó ningún programa.

## Resumen

| Métrica | Valor |
| --- | --- |
| Programas en alcance (5 universidades) | 58 |
| Programas con descripción agregada | 54 |
| Programas pendientes (sin fuente oficial suficiente) | 4 |
| Longitud de descripción (palabras) | 94–115 (promedio 103) |
| Programas totales en el dataset (sin cambios) | 70 |

## Actualizados por universidad

| Universidad | En alcance | Actualizados | Pendientes |
| --- | ---: | ---: | ---: |
| Universidad de Caldas | 22 | 22 | 0 |
| Universidad de Manizales | 14 | 12 | 2 |
| Universidad Autónoma de Manizales | 9 | 9 | 0 |
| Universidad Nacional de Colombia — Sede Manizales | 9 | 8 | 1 |
| Universidad Católica de Manizales | 4 | 3 | 1 |
| **Total** | **58** | **54** | **4** |

## Programas pendientes

Se marcaron como pendientes (sin descripción) por no encontrar una fuente oficial dedicada suficiente. No se inventó información ni se usaron fuentes fuera del dominio oficial de cada universidad.

- **esp-tec-redes-umanizales** (Especialización Tecnológica en Redes, U. de Manizales): la URL registrada renderiza la plantilla del sitio sin contenido del programa; las rutas oficiales previsibles devuelven 404. Solo fuentes de terceros (SNIES 52398, registro de 2013) lo mencionan, lo que sugiere un programa antiguo posiblemente inactivo.
- **maestria-tecnologias-informacion-geografica-118930-umanizales** (variante virtual/remota, U. de Manizales): no existe ficha oficial de la entrega virtual (SNIES 118930); la ficha oficial de la maestría (SNIES 102462) declara modalidad presencial. Se evita atribuir datos no verificados de la modalidad virtual.
- **especializacion-aprendizaje-automatico-ia-unal** (UNAL Manizales): sin página oficial específica del programa (SNIES 118852); es un registro distinto de la Especialización en Inteligencia Artificial (SNIES 118019).
- **tecnologia-implementacion-sistemas-iot-ucm** (U. Católica de Manizales): el campo `website` era nulo; la URL previsible devuelve 404 y el programa no aparece en los listados oficiales; parece continuidad propedéutica del técnico en IoT, sin contenido oficial propio publicado.

## URLs rotas, redirecciones o inconsistencias

- **Universidad de Manizales — URLs `?u_course=`:** varias URLs registradas (`?u_course=...`) cargan contenido por JavaScript y no exponen la ficha del programa. Se usó la ruta oficial alternativa del mismo dominio `/oferta/...`, que sí expone perfil, plan y competencias (afecta a `ing-sistemas-telecomunicaciones-umanizales`, `maestria-tecnologias-informacion-geografica-umanizales` y la pendiente `esp-tec-redes-umanizales`).
- **Universidad de Caldas — programas técnicos con `website: null`:** varios técnicos profesionales (depuración de datos para IA, programación web/móvil/videojuegos, marketing digital, analítica predictiva, análisis y reporte de datos) no tienen ficha académica dedicada. Se usaron fuentes oficiales del mismo dominio (`ucaldas.edu.co/portal/...` con notas de registro calificado y lanzamiento de programas virtuales, y categorías del aula virtual `virtual.ucaldas.edu.co`). Las descripciones se acotaron al alcance de la disciplina y la modalidad, sin inventar plan de estudios.
- **doctorado-ingenieria-ucaldas:** la URL `http` redirige a `https`; la página del portal es de carácter informativo (no ficha académica), pero contiene líneas de investigación y perfil. Es un Doctorado en Ingeniería de alcance amplio (no solo computacional).
- **especializacion-nanotecnologia-unal:** `website` nulo; se localizó fuente dentro del dominio oficial (`fcen.unal.edu.co`).
- **Inconsistencia de créditos — ing-sistemas-computacion-ucaldas:** la página oficial de la U. de Caldas indica 163 créditos, mientras el registro SNIES/ficha del dataset indica 175. Para no contradecir la ficha, se retiró el número de la descripción (la ficha conserva el valor registrado). Queda como inconsistencia por revisar entre fuente institucional y SNIES.

## Nota sobre descripciones similares

El control de duplicados detectó pares con frases compartidas. Al revisarlos:

- La mayoría son **variantes de modalidad del mismo programa** (presencial / a distancia / virtual). Cada descripción menciona explícitamente su modalidad y reformula el pasaje correspondiente; la similitud del núcleo es esperada porque es el mismo programa.
- Algunos **programas distintos** comparten la frase de áreas de aplicación (p. ej. Ingeniería en Sistemas y Computación vs. Ingeniería en Informática de la U. de Caldas), pero difieren en enfoque, nivel y contenido, y son distinguibles.

No se encontraron descripciones intercambiables entre programas distintos.

## Archivos modificados

- `src/data/programs.json` — se agregó el campo `description` a 54 programas.
- `src/schemas/program.schema.ts` — se agregó el campo opcional `description`.
- `src/pages/programas/[slug].astro` — la ficha de programa ahora muestra la descripción.

## Validaciones del proyecto

| Comando | Resultado |
| --- | --- |
| `npm run validate:data` | OK — 70 programas válidos, datos consistentes |
| `npm run lint` | OK |
| `npm run test` | OK — 24/24 |
| `npm run build` | OK — 780 páginas |
| `npm run format:check` | OK |
| `npm run test:e2e` (Playwright) | Se ejecuta en CI (job `validate`) sobre el PR |

## Promoción de verificación (2026-07-20)

Los programas estaban en `partially_verified` porque su `sourceUrl` registrado era el portal general de consulta HECAA/SNIES, no un permalink por programa. Como parte de esta investigación se localizó la **página oficial dedicada** de cada programa; con esa evidencia se actualizó el estado:

- **Promovidos a `verified`: 37 programas.** Se actualizó su `sourceUrl` a la ficha oficial dedicada (perfil, plan y competencias) y se verificó que cada URL responde **200 con navegador real** (35 URLs únicas comprobadas; incluye `fadmon.edu.co`, confirmado como dominio oficial de la Facultad de Administración de la UNAL).
- **Se conservan `partially_verified`: 17 programas** cuya fuente encontrada no es una ficha dedicada sino una nota/noticia del portal, un folleto PDF o una categoría del aula virtual (varios técnicos de la U. de Caldas y dos maestrías de la U. de Manizales en PDF). Su `sourceUrl` se conserva sin cambio.
- **Los 4 pendientes** permanecen `partially_verified` (sin descripción).

Distribución de verificación de los 70 programas tras el cambio: **`verified` 44 · `partially_verified` 23 · `inactive_or_unverified` 3**. No se modificó ningún programa fuera de las cinco universidades.

## Confirmaciones

- Se procesaron las cinco universidades.
- No se agregaron ni eliminaron programas (70 antes y después); se conservaron nombres, slugs, niveles, modalidades e institución.
- Cada descripción se basó en la fuente oficial registrada o en una alternativa dentro del dominio oficial de la universidad; lo no verificable quedó pendiente.
- El proyecto sigue compilando y pasando sus validaciones.

---

## Segunda tanda — resto de instituciones (2026-07-20)

Tras la primera tanda (cinco universidades) se completó la descripción de los programas de las **instituciones restantes**: SENA Regional Caldas, Universidad Católica Luis Amigó (FUNLAM), Corporación Universitaria Remington (sede Manizales), Universidad Antonio Nariño, más tres programas que habían quedado pendientes/sin descripción en la Católica de Manizales, la UNAL Manizales y la U. de Manizales.

> Nota de contexto: entre las dos tandas se **eliminaron dos programas posiblemente inactivos** de la Universidad de Manizales (Especialización Tecnológica en Redes y Maestría en Gestión Estratégica de la Información), por decisión editorial del dueño, dejando solo la Maestría en Seguridad de la Información. Por eso el total del dataset pasó de 70 a **68 programas**. Las referencias a `esp-tec-redes-umanizales` en las secciones anteriores son históricas.

Método idéntico: agentes en paralelo (uno por institución) que consultaron la URL oficial de cada programa, con un coordinador integrando por `slug` en `src/data/programs.json` (sin edición concurrente del mismo archivo). Descripciones originales de ~70–120 palabras, sin créditos/semestres/SNIES en la prosa.

### Resumen

| Métrica | Valor |
| --- | --- |
| Programas con descripción agregada (2ª tanda) | 15 |
| Longitud de descripción (palabras) | 99–116 |
| Duplicados intercambiables detectados | 0 |
| Promovidos a `verified` | 4 |
| Conservan `partially_verified` | 11 |

### Promovidos a `verified` (ficha oficial dedicada, 200 con navegador real)

- **tecnologia-construccion-software-uan** — Universidad Antonio Nariño (`uan.edu.co`, página dedicada del programa).
- **tecnologia-adso-sena** — Análisis y Desarrollo de Software (ficha dedicada en `betowa.sena.edu.co`).
- **tecnico-programacion-software-sena** — Programación de Software (ficha dedicada en `betowa.sena.edu.co`).
- **tecnologia-implementacion-gestion-bases-datos-sena** — Implementación y Gestión de Bases de Datos (ficha dedicada en `betowa.sena.edu.co`).

En estos cuatro se reemplazó el `website`/`sourceUrl` no oficial (blogspot/vacío) por la ficha oficial y se fijó `lastVerifiedAt: 2026-07-20`.

### Se conservan `partially_verified` (fuente no dedicada o con reserva)

- **Corrección de dato — ing-sistemas-virtual-remington:** inicialmente se promovió a `verified`, pero se revirtió a `partially_verified`. El SNIES **104431 corresponde a la sede Medellín / registro nacional**, no a una matrícula propia de Caldas; Uniremington ya no ofrece Ingeniería de Sistemas con SNIES de Caldas. La sede Manizales (SNIES IES 2833) sí existe y promueve la modalidad virtual, por lo que el registro se conserva con la descripción y su `sourceUrl` apunta ahora a la página oficial de la sede Manizales (`uniremington.edu.co/manizales/`), sin atribuirle un SNIES de programa local.
- **SENA — fichas de familia / PDF / denominación sucesora:** `tecnologia-adsi-sena` (ADSI, denominación anterior a ADSO), `tecnico-sistemas-sena` (la ruta exacta devuelve "Programa no encontrado"; se apoya en la familia de soporte técnico), `tecnico-programacion-aplicaciones-nube-sena` y `esp-tec-gestion-seguridad-bd-sena` (fuente oficial en PDF de descarga, no ficha web), `esp-tec-seguridad-redes-sena` (sin ficha dedicada; familia de redes) y `esp-tec-desarrollo-moviles-sena` (ficha de la familia de desarrollo móvil, no de la especialización). El website original de varios era un blog/flipbook no oficial.
- **ing-sistemas-funlam** (U. Católica Luis Amigó): la URL registrada estaba rota ("zona restringida"); la oferta oficial es genérica y el contenido sustantivo provino del plegable PDF institucional (sede Apartadó, mismo programa institucional). Sin plegable oficial específico de la sede Manizales.
- **tecnologia-implementacion-sistemas-iot-ucm** (Católica de Manizales): no hay ficha propia publicada del programa tecnológico (SNIES 116625); se usó el contenido oficial del Técnico Profesional en IoT de la misma cadena propedéutica. Recomendable segunda fuente cuando la UCM publique la ficha.
- **especializacion-aprendizaje-automatico-ia-unal** (UNAL Manizales): identidad y adscripción confirmadas en el dominio oficial (`fadmon.unal.edu.co` / `manizales.unal.edu.co`), pero la ficha del programa no renderiza por error de certificado SSL; sin plan de estudios verificable.
- **maestria-tecnologias-informacion-geografica-118930-umanizales** (variante virtual): la ficha oficial declara modalidad presencial (SNIES 102462) mientras el registro marca `remote` (SNIES 118930). Descripción basada en la ficha oficial; discrepancia de modalidad por revisar (no se modificó `modality` por instrucción).

### Distribución final de verificación (68 programas)

**`verified` 47 · `partially_verified` 20 · `inactive_or_unverified` 1.**

### Confirmaciones (2ª tanda)

- Se procesaron las instituciones restantes; 15 descripciones agregadas, 0 pendientes sin descripción.
- No se agregaron ni eliminaron programas en esta tanda; se conservaron nombres, slugs, niveles, modalidades e institución.
- Cada descripción se basó en la fuente oficial registrada o en una alternativa dentro del dominio oficial; lo no verificable quedó como `partially_verified`.
- Se verificaron con navegador real las URLs candidatas; solo se promovieron a `verified` las cuatro con ficha oficial dedicada que responde 200.
- El proyecto compila y pasa `validate:data`, `lint`, `test` (unit) y `format:check`; el `test:e2e` se ejecuta en CI sobre el PR.
