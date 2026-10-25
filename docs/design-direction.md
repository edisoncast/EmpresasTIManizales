# Dirección de diseño

> Un observatorio editorial y abierto del ecosistema tecnológico de Manizales y Caldas, construido con datos verificables, identidad regional sutil y una experiencia moderna, clara y humana.

Esta dirección entiende el sitio como infraestructura pública de conocimiento: un lugar para consultar, relacionar, verificar y mejorar información del territorio. La interfaz debe dar protagonismo a los datos, las fuentes y las relaciones entre actores. Debe sentirse contemporánea sin adoptar la estética intercambiable de una landing SaaS.

La expresión visual es una **hoja de registro pública**: un formulario que alguien llena con bolígrafo azul, marca con resaltador amarillo y archiva. Cada entidad es una ficha con casillas, un sello de verificación y fuentes numeradas. La referencia regional aparece en detalles concretos —niebla, coordenadas, la línea de cable que une entidades— y no en fotografías turísticas ni símbolos literales. El resultado debe ser implementable con HTML semántico, Astro y Tailwind, con JavaScript únicamente donde la interacción lo requiera.

## Personalidad visual

1. **Confiable.** Jerarquías predecibles, contraste alto, fuentes visibles y estados de verificación explícitos. La interfaz distingue hechos verificados, información parcial y registros pendientes sin ocultar incertidumbre.
2. **Local.** Niebla fría, coordenadas y la línea de cable que evoca el cable aéreo de Manizales, con lenguaje propio del territorio. La identidad regional no depende de postales, monumentos o clichés cafeteros.
3. **Editorial.** Titulares con carácter, columnas de lectura cómodas, pies y metadatos claros, composiciones con ritmo y espacios en blanco. Las páginas se leen como fichas de un archivo vivo, no como módulos de un dashboard.
4. **Técnica.** Datos estructurados, etiquetas precisas, fechas ISO traducidas para lectura humana y una tipografía monoespaciada usada con moderación para slugs, cifras o metadatos.
5. **Abierta.** Las fuentes, criterios, fecha de verificación y vías de contribución están a la vista. Los CTA invitan a aportar evidencia, no a “registrarse” ni a entrar en un embudo comercial.
6. **Sobria.** Color, movimiento, radios y sombras tienen funciones concretas. Se evita llenar cada bloque con íconos, efectos o superficies decorativas.
7. **Comunitaria y viva.** El contenido muestra conexiones y contribuciones entre empresas, academia, comunidades y personas. La sensación de actividad proviene de datos actualizados y relaciones reales, no de animaciones llamativas.

## Lo que el sitio debe transmitir

Al entrar, una persona debe entender en pocos segundos que existe un ecosistema tecnológico diverso en Manizales y Caldas y que este sitio ayuda a observarlo, no a calificarlo. Debe percibir:

- que empresas, universidades, programas, comunidades, eventos, personas y entidades de apoyo forman un sistema conectado;
- que el proyecto conserva una historia iniciada en 2020 y está revalidando esa información comunitariamente en 2026;
- que cada dato tiene un grado de confianza, una fecha y, cuando aplica, fuentes consultables;
- que la incertidumbre se reconoce con honestidad y se convierte en una invitación a contribuir;
- que estudiantes, equipos técnicos, academia, empresas y comunidades comparten el mismo espacio sin que una audiencia domine a las demás;
- que el directorio no ordena actores por mérito, popularidad, tamaño ni prestigio;
- que no se ofrecen vacantes ni se presenta el sitio como una bolsa de empleo.

## Lo que el sitio no debe parecer

- Una plantilla SaaS con hero centrado genérico, gradiente morado/azul, mockup flotante y múltiples CTA comerciales.
- Un sitio generado por IA, lleno de frases intercambiables, íconos en cada título o ilustraciones de robots, cerebros, circuitos y nodos.
- Un directorio abandonado: no deben ocultarse las fechas de revisión ni los estados pendientes.
- Un ranking, listado de “mejores”, concurso de popularidad o catálogo patrocinado.
- Una bolsa de empleo, portal de reclutamiento o vitrina de beneficios laborales.
- Una presentación institucional rígida, saturada de logos, bloques simétricos y lenguaje protocolario.
- Un dashboard corporativo con todos los datos encerrados en tarjetas iguales.
- Una experiencia basada en glassmorphism, sombras fuertes, neón o radios excesivos.
- Un sitio turístico sobre Manizales: la identidad territorial debe acompañar, no desplazar, el propósito tecnológico y documental.
- Una interfaz que dependa de ilustraciones genéricas para crear personalidad.

## Referencias conceptuales

Estas referencias describen cualidades, no marcas ni diseños que deban copiarse:

- **Observatorio regional:** datos legibles, metodología visible y contexto territorial.
- **Archivo vivo de comunidad:** memoria de 2020, revisiones de 2026 y contribución continua.
- **Mapa de ecosistema:** relaciones entre academia, industria, comunidad, talento y apoyo, sin forzar un mapa geográfico literal.
- **Revista digital sobria:** jerarquía editorial, lectura tranquila, ritmo visual y uso intencional de tipografía.
- **Producto cívico-tecnológico:** abierto, accesible, auditable y útil para tomar decisiones informadas.
- **Directorio editorial moderno:** capacidad de explorar y filtrar sin estética de CRM o marketplace.
- **Sistema de fichas verificables:** cada entidad se presenta como un registro con procedencia, estado y fecha.

No se deben reproducir identidades, composiciones o sistemas visuales de marcas específicas. Estas ideas son criterios para construir una expresión propia.

## Paleta de color

La paleta es la de una hoja de registro: niebla fría de fondo, hojas blancas, grafito para el texto, **tinta azul** para lo que se puede tocar y **resaltador amarillo** para marcar. Ningún estado se comunica únicamente mediante color. Las variables viven en `:root` de `src/styles/global.css` con el prefijo `--color-`.

| Token | Hex | Uso recomendado | Accesibilidad |
|---|---:|---|---|
| `fog` | `#EEF1F3` | Fondo general: niebla fría, nunca crema. | Texto `graphite` ≈ 14.9:1. |
| `sheet` | `#FFFFFF` | Fichas, casillas, filtros y campos. | |
| `sheet-alt` | `#E3E8EB` | Footer, bandas secundarias, iniciales, pista de barras, fichas archivadas. | `graphite-2` ≈ 5.9:1. |
| `rule` | `#C3CCD3` | Líneas de casilla y bordes de ficha. | Estructural: nunca el único indicador de foco o estado. |
| `rule-strong` | `#7D8A95` | Borde de controles y sello "por confirmar". | ≥ 3:1 sobre `sheet` y `fog`. |
| `graphite` | `#161D24` | Titulares, texto principal y la regla gruesa de 2px. | ≈ 16.9:1 sobre blanco. |
| `graphite-2` | `#4B5763` | Texto secundario, etiquetas de casilla y metadatos. | ≈ 7.4:1 sobre blanco. |
| `ink-blue` | `#2340B8` | Enlaces, botón principal, sello Verificado, casillas marcadas. | ≈ 8.4:1; texto blanco encima. |
| `ink-blue-hover` / `ink-blue-soft` | `#172F8A` / `#E4E9FA` | Hover del botón principal / opción de filtro activa. | |
| `highlight` | `#F5D33B` | Resaltador: hover y foco de enlaces, banda de contribución, coincidencias. | Solo relleno; texto encima siempre `on-highlight` (≈ 11.5:1). |
| `highlight-soft` | `#FBEFB0` | Notas de auditoría y avisos de verificación. | Texto `graphite`. |
| `rust` / `rust-soft` | `#A2461B` / `#FAE6DA` | Exclusivo del estado "Posiblemente inactivo". | ≈ 5.1:1 sobre `rust-soft`. |

Reglas: una sola banda amarilla a pleno ancho por vista (la de contribución); el amarillo nunca es texto ni borde informativo. El verde bosque, el crema y el café del sistema anterior quedan retirados. La variante oscura está definida en el sistema de diseño pero aún no se implementa: exige redefinir todos los pares, no invertirlos.

## Tipografía

- **Titulares y cifras: Archivo** (Omnibus-Type), siempre ancha: `font-stretch: 112%` en `h1`, `h2`, display y cifras; 108% en `h3`; 125% solo en el wordmark. Pesos 700–800. Paquete `@fontsource-variable/archivo/wdth.css` (incluye el eje de ancho).
- **Cuerpo e interfaz: Atkinson Hyperlegible Next**, diseñada para lectura con baja visión. Pesos 400, 500, 600 y 700.
- **Datos: Atkinson Hyperlegible Mono**, solo para códigos CIIU/SNIES, NIT de personas jurídicas, fechas ISO, dominios de fuentes, conteos y coordenadas. No usar en párrafos ni en etiquetas.

Las fuentes se sirven localmente en WOFF2 (`@fontsource-variable/*`) para respetar la CSP `font-src 'self'`. Las etiquetas de casilla (`.field-label`) usan la sans en mayúsculas, 12px, peso 700 y tracking 0.05em; el kicker monoespaciado anterior se retira.

Jerarquía base:

- `display`: 56 px desktop / 40 px móvil, interlineado 1.0, solo para el hero;
- `h1`: 40 px desktop / 32 px móvil, interlineado 1.05;
- `h2`: 28 px, interlineado 1.15;
- `h3`: 20 px, interlineado 1.2;
- cuerpo principal: 17 px, interlineado 1.6;
- cuerpo de interfaz: 14–15 px, interlineado 1.45;
- etiquetas y metadatos: 12 px, nunca por debajo.

Evitar titulares enteros en mayúsculas; las mayúsculas quedan para etiquetas de casilla, sellos y el wordmark.

## Sistema de layout

- **Mobile-first.** El flujo de contenido debe funcionar desde 320 px sin depender de hover, columnas laterales ni anchos fijos.
- **Grilla flexible.** Usar una grilla conceptual de 4 columnas en móvil, 8 en tablet y 12 en desktop, con gutters de 16, 24 y 32 px. No es necesario exponerla como cuadrícula rígida en cada página.
- **Ancho máximo.** Contenedor general de 1.200–1.280 px; texto editorial de 680–760 px; fichas detalle de hasta 1.080 px.
- **Espacio.** Separación vertical de secciones entre 64 y 112 px en desktop y entre 40 y 72 px en móvil. Dentro de componentes, usar la escala de 4 px definida en tokens.
- **Asimetría moderada.** Títulos, métricas y notas pueden ocupar anchos distintos o desplazarse una columna. La asimetría debe ayudar a leer y no crear saltos arbitrarios.
- **Listados.** Encabezado compacto, barra de búsqueda, filtros y conteo forman una herramienta de consulta. En desktop, filtros en columna lateral de 240–280 px o banda superior según complejidad; resultados en una lista o grilla editorial de 2–3 columnas.
- **Detalles.** Cabecera editorial de ancho amplio; cuerpo principal para descripción, relaciones y fuentes; columna secundaria de 280–340 px para estado y metadatos. En móvil, estado y fecha aparecen inmediatamente después del título antes de apilar el resto.
- **Filtros.** En desktop permanecen visibles si hay espacio, sin convertir toda la pantalla en dashboard. En móvil se abren en un panel o sección colapsable accesible, muestran cantidad activa y ofrecen “Aplicar” y “Limpiar”.
- **Buscador global.** Debe ser prominente en home y accesible desde header. Muestra alcance (“empresas, programas, personas…”) y resultados agrupados por tipo; en móvil ocupa el ancho disponible. No debe dominar permanentemente páginas detalle.

## Componentes visuales principales

| Componente | Propósito | Comportamiento visual y estados | Debe evitar |
|---|---|---|---|
| **Header** | Orientar y dar acceso rápido a exploración, búsqueda y contribución. | Barra sobria, fondo sólido, nombre del proyecto a la izquierda y navegación textual. Estado actual visible; menú móvil con botón nombrado, foco controlado y cierre claro. Wordmark tipográfico `OBSERVATORIO TIC` en Archivo ancha y regla inferior de 2px en grafito; la página actual se marca con línea azul de 3px. | Megamenús, header transparente sobre contenido, demasiados CTA o íconos sin label. |
| **Footer** | Cerrar con contexto, metodología, repositorio y mantenimiento. | Composición en 2–4 columnas desiguales, borde superior, nota “2020 → 2026”, licencia y enlaces a fuentes/contribución. | Repetir toda la navegación, mosaico de logos o aspecto corporativo pesado. |
| **Hero** | Explicar propósito y abrir la exploración. | Titular editorial fuerte, párrafo concreto, buscador global y nota histórica. Coordenadas de Manizales en datos y casillas "Qué es / Para quién / Qué puedes hacer"; no más de dos CTA. | Promesas grandilocuentes, gradientes AI, ilustración genérica o métricas sin contexto. |
| **SearchBar** | Consultar entidades con rapidez. | Label visible o asociado, icono opcional no indispensable, borde nítido y foco de 2–3 px. Estados: vacío, escritura, cargando si aplica, resultados y sin resultados. | Placeholder como único label, animaciones largas o autocomplete inaccesible. |
| **FilterPanel** | Refinar listados de forma comprensible. | Grupos con leyenda, checkboxes/radios nativos estilizados con moderación, conteo activo y acciones claras. En móvil es panel apilado, no una fila desbordada. | Chips infinitos, controles sin label, filtros ocultos sin indicar que están activos. |
| **EntityCard** | Resumir un registro y llevar a su ficha. | Ficha de registro recta: tipo y código (CIIU, SNIES) en la cabecera junto al sello, nombre, descripción, tags y casillas etiquetadas al pie. En hover el borde pasa a grafito y el nombre se resalta en amarillo. Variaciones sutiles por entidad mediante label y composición, no mediante arcoíris. Estados hover, foco y archivado. | Cards idénticas altas, sombra flotante, logo como protagonista o toda la tarjeta llena de badges. |
| **PersonCard** | Mostrar contribuciones públicas y contexto profesional. | Nombre, rol contextual, 1–2 contribuciones, áreas y verificación. Retrato solo si existe, tiene procedencia y alt adecuado; inicial o composición tipográfica como fallback. | Métricas de seguidores, prominencia, estrellas, trofeos o lenguaje de celebridad. |
| **EntityDetail** | Presentar una ficha de investigación completa. | Cabecera con tipo, nombre, estado y fecha; cuerpo con descripción, atributos, relaciones y bloque de fuentes numerado. CTA de corrección cerca de fuentes. | Hero comercial, información crítica enterrada o paneles iguales para cada campo. |
| **VerificationStatus** | Expresar confianza y vigencia. | Badge textual compacto con símbolo, color y tooltip/explicación; versión extendida en detalle con fecha y mensaje. Cinco variantes coherentes. | Binario “válido/inválido”, solo color, rojo alarmista para incertidumbre. |
| **SourceBadge** | Hacer visible la evidencia. | Label “Fuente 1”, dominio y, cuando sea útil, fecha de consulta. Enlace externo con indicador textual/visual y foco visible. Estado de enlace no disponible documentado. | URL cruda extensa, favicon remoto o insinuar que una fuente equivale a aprobación. |
| **StatsGrid** | Dar escala al ecosistema con contexto. | Cifras tipográficas separadas por divisores o una grilla abierta; cada cifra tiene categoría y nota de corte temporal. | Dashboard de KPI, flechas de crecimiento no sustentadas o tarjetas clonadas con íconos. |
| **EmptyState** | Explicar ausencia de resultados y ofrecer salida. | Título claro, criterio que no produjo resultados, acciones “Limpiar filtros” y “Sugerir registro”. Hoja con borde punteado, sin ilustraciones. | Chistes, ilustración enorme o culpar a la persona usuaria. |
| **CTA de contribución** | Convertir incertidumbre y faltantes en colaboración. | Banda editorial diferenciada, texto específico y enlaces a Issue/PR. Variantes: agregar, corregir y aportar fuente. | Lenguaje de marketing, urgencia artificial o botón ambiguo “Empezar”. |

## Fichas de entidades

Todas las fichas comparten una anatomía de registro: tipo en texto, nombre como enlace principal, localidad, descripción breve, metadatos esenciales, estado de verificación, disponibilidad de fuentes y tags limitados. El borde inferior, una numeración opcional o una pequeña marca lateral puede evocar archivo/observatorio mejor que una card flotante. Las listas deben aceptar densidad media y comparación visual.

- **Empresas:** mostrar categoría, ciudad, naturaleza tecnológica o presencia de equipo interno de desarrollo, modelo de trabajo solo si está verificado, 2–3 tecnologías representativas y estado. No presentar vacantes, beneficios ni “empresa destacada”.
- **Universidades:** mostrar carácter público/privado, ciudad, cantidad de programas relacionados y estado. La institución no debe reducirse a su logo.
- **Programas:** priorizar nivel académico, institución, modalidad, ciudad y área. El estado debe referirse a existencia/vigencia del programa, no a su calidad.
- **Personas:** destacar trayectoria pública, aportes y áreas de acción. Mostrar organización solo como contexto. Fotografías son opcionales y nunca deben crear una jerarquía de popularidad.
- **Comunidades:** mostrar enfoque, ciudad, periodicidad o último dato público disponible y estado de actividad. Evitar declarar “activa” si no hay evidencia reciente.
- **Eventos:** mostrar fecha, lugar/modalidad, comunidad u organización y estado temporal (próximo, pasado o por verificar). Los eventos pasados pueden conservarse como archivo sin parecer convocatorias vigentes.

Reglas comunes:

- limitar descripciones a 2–4 líneas en listados sin ocultar información crítica;
- mostrar como máximo cuatro tags y resumir el resto con texto accesible;
- indicar “Sin fuente pública registrada” cuando corresponda, no dejar el área en blanco;
- usar “Dato por verificar” en campos puntuales si la verificación del registro es parcial;
- permitir que fichas archivadas sigan siendo consultables con tratamiento visual atenuado, sin deshabilitar contraste.

## Estados de verificación

| Estado de datos | Label visible | Tono y color sugerido | Mensaje corto | Cuándo usarlo |
|---|---|---|---|---|
| `verified` | **Verificado** | Sello sólido en tinta azul `#2340B8`, texto blanco. | “Verificado con fuentes públicas.” | Los campos principales tienen evidencia reciente y fuentes registradas. |
| `partially_verified` | **Verificación parcial** | Sello de contorno azul sobre blanco. | “Parte de la información está verificada.” | Hay fuentes, pero faltan campos importantes o la vigencia no está completamente confirmada. |
| `unknown` | **Estado por confirmar** | Sello de contorno punteado gris `#7D8A95`. | “Aún no contamos con evidencia suficiente.” | Información heredada o aportada sin fuente pública concluyente. |
| `inactive_or_unverified` | **Posiblemente inactivo** | Óxido `#A2461B` sobre `#FAE6DA`; cauteloso, no alarmista. | “No se confirmó actividad reciente.” | Hay indicios de inactividad o no fue posible verificar vigencia; no equivale a cierre definitivo. |
| `archived` | **Archivo histórico** | Relleno gris `#E3E8EB` con texto `#4B5763`; documental. | “Se conserva como parte del archivo.” | El registro ya no está vigente o pertenece al conjunto histórico de 2020 y se conserva con contexto. |

Cada representación debe incluir label, símbolo sencillo y, en detalle, fecha de última verificación. El estado global no reemplaza notas por campo. Los mensajes deben invitar a aportar una fuente sin convertir la incertidumbre en error.

## Personas relevantes

La sección debe llamarse **“Personas que construyen ecosistema”** o una variante igualmente descriptiva. No usar “top personas”, “influencers”, “gurús”, “líderes imperdibles” ni numeraciones competitivas.

La selección y presentación deben basarse en información pública sobre:

- organización de comunidades y eventos;
- mentoría y formación;
- docencia e investigación;
- liderazgo técnico y creación de capacidades;
- contribuciones abiertas o cívico-tecnológicas;
- construcción de organizaciones y conexiones regionales.

La UI debe explicar el criterio, permitir correcciones y evitar señales de estatus como estrellas, medallas, seguidores o posición. Se muestran únicamente perfiles profesionales públicos y contribuciones relevantes para el ecosistema. No se incluyen teléfono, dirección, correo privado, información familiar ni detalles personales ajenos al propósito. El orden por defecto debe ser alfabético o responder a filtros explícitos, nunca a una puntuación opaca.

## Microcopy y tono

La voz es humana, clara, local y profesional. Prefiere verbos concretos: consultar, verificar, explorar, aportar, actualizar y relacionar. Reconoce límites y fechas. Evita superlativos, anglicismos innecesarios, promesas no sustentadas y lenguaje promocional.

Frases recomendadas:

- “Un mapa abierto del ecosistema tecnológico de Manizales y Caldas.”
- “Datos abiertos, verificables y mantenidos por comunidad.”
- “Proyecto iniciado en 2020 y revalidado comunitariamente en 2026.”
- “Este registro necesita verificación.”
- “Ayúdanos a actualizar esta información con una fuente pública.”
- “Encontramos 18 programas para estos filtros.”
- “No encontramos resultados. Prueba con menos filtros o sugiere un registro.”
- “La fuente confirma la existencia del programa, pero no su modalidad actual.”
- “Este archivo conserva información histórica; no implica que siga vigente.”

Frases prohibidas:

- “Unlocking the future of innovation.”
- “Empowering the next generation.”
- “Revolutionizing the tech ecosystem.”
- “Las mejores empresas de tecnología.”
- “Los top referentes tech.”
- “Descubre oportunidades laborales increíbles.”
- “El hub definitivo de innovación.”
- “Liderando la transformación del futuro.”

## Home

La home debe tener una apertura fuerte, editorial y útil:

1. **Hero:** eyebrow territorial discreto, titular “Mapa abierto del ecosistema tecnológico de Manizales y Caldas”, explicación breve y buscador global. Como segundo nivel, dos acciones: “Explorar el ecosistema” y “Contribuir con datos”.
2. **Nota histórica 2020 → 2026:** una franja o anotación editorial explica el origen y la revalidación actual, enlazando a metodología/auditoría.
3. **Métricas del ecosistema:** cifras por tipo con fecha de corte y aclaración de que son registros, no indicadores de desempeño.
4. **Accesos principales:** empresas, universidades, programas, personas, comunidades, eventos y apoyo; usar una composición de índice editorial, no siete cards idénticas.
5. **Conexiones:** una sección breve muestra relaciones reales o categorías del ecosistema, por ejemplo universidad → programa → comunidad, sin inventar causalidad.
6. **Verificación:** muestra la distribución de estados y explica cómo leerlos.
7. **CTA de contribución:** termina con acciones específicas para sugerir, corregir o aportar fuentes.

El elemento visual propio es la **línea de cable** (`RelationLine` en el sistema de diseño): paradas en casilla unidas por un trazo grafito de 2px con una estación redonda, en referencia al cable aéreo que salía de Manizales. Solo se usa para relaciones que los datos sostienen (programa → universidad, comunidad → persona, evento → comunidad), nunca como decoración. Las coordenadas de Manizales (`5.07° N, 75.52° O`) aparecen en el hero y en el footer.

## Páginas de listado

Empresas, universidades, programas, personas, comunidades y eventos comparten una estructura reconocible sin perder particularidad:

- **Título y descripción:** un solo `h1`, nombre directo de la categoría y una frase que explique alcance y criterio de inclusión.
- **Contexto:** fecha de corte y enlace a metodología cerca del encabezado.
- **Buscador local:** label específico, por ejemplo “Buscar empresas por nombre o tecnología”. No reutilizar un placeholder genérico para todo.
- **Filtros:** solo atributos útiles y con suficientes datos. Mostrar selección, cantidad activa y acción de limpieza. No presentar filtros vacíos.
- **Conteo:** frase legible y anunciable por tecnologías de asistencia: “24 resultados” o “6 de 24 resultados”.
- **Cards:** densidad media, alineación consistente y variaciones definidas en “Fichas de entidades”. En desktop pueden alternarse anchos si la lectura continúa siendo predecible; en móvil ocupan una columna.
- **Verificación:** estado visible en cada ficha; opción de filtrar por estado cuando sea útil. No ocultar registros pendientes por defecto.
- **Estado vacío:** explicar qué combinación no produjo resultados y ofrecer limpiar filtros o contribuir. Conservar header, buscador y contexto.

Eventos deben separar “Próximos”, “Pasados” y “Por verificar” cuando las fechas lo permitan. Personas se ordena alfabéticamente. Empresas y universidades no deben tener posiciones numeradas que sugieran ranking.

## Páginas detalle

Cada detalle debe sentirse como una ficha de investigación legible:

- etiqueta de casilla con el tipo de entidad y, si aporta, el código (CIIU, SNIES) o la ciudad;
- nombre como único `h1`;
- descripción precisa, sin copy promocional añadido por el sitio;
- bloque de estado con label, fecha de última verificación, alcance de la verificación y mensaje de ayuda;
- metadatos estructurados en lista de definición, no una colección de badges;
- tags limitados para áreas, tecnologías o categorías;
- fuentes numeradas con dominio, título, fecha de consulta si existe y apertura segura;
- notas de auditoría para datos heredados o decisiones editoriales;
- relaciones con otras entidades sustentadas por los datos;
- CTA “Sugerir una corrección” y “Aportar una fuente” cerca del bloque de evidencia.

En desktop, la columna de estado y metadatos puede quedar a la derecha, pero el orden del DOM debe conservar una secuencia lógica. En móvil, nombre, descripción y estado preceden a cualquier relación secundaria. Un registro archivado conserva lectura completa y contexto histórico.

## Accesibilidad

- Alcanzar al menos WCAG 2.2 AA en contraste de texto, controles, foco y estados.
- Mantener un solo `h1` por página y una jerarquía de encabezados sin saltos arbitrarios.
- Garantizar navegación completa por teclado, orden de foco lógico y enlace “Saltar al contenido”.
- Usar foco visible de al menos 2 px con separación suficiente del componente; nunca eliminar `outline` sin reemplazo equivalente.
- Asociar cada input con un `label`; el placeholder es ayuda, no nombre accesible.
- Dar nombre accesible a botones de menú, búsqueda, limpiar y cerrar; comunicar estados expandidos con `aria-expanded` cuando aplique.
- Mantener cuerpo principal de al menos 16 px y ancho de línea cercano a 60–75 caracteres.
- No depender únicamente del color: todo estado incluye texto y símbolo; los gráficos incluyen alternativa textual.
- Usar `alt` descriptivo para imágenes informativas y `alt=""` para decoración. No repetir el nombre si ya está contiguo sin aportar información.
- Anunciar cambios de conteo o resultados con una región viva moderada, sin interrumpir cada pulsación.
- Respetar `prefers-reduced-motion` y evitar desplazamientos de layout al cargar fuentes o imágenes.

## Animaciones e interacción

- Transiciones de 120–180 ms para color, borde y pequeños cambios de posición; easing suave y consistente.
- Hover discreto: cambio de borde, subrayado o desplazamiento máximo de 1–2 px. Toda señal hover debe tener equivalente de foco.
- Menús y filtros pueden aparecer con opacidad y desplazamiento corto; nunca con rebotes, parallax o recorridos largos.
- No animar cifras para simular crecimiento ni usar carruseles automáticos.
- Desactivar movimiento no esencial bajo `prefers-reduced-motion: reduce`.
- Priorizar CSS; no añadir una librería de animación para interacciones que caben en transiciones nativas.
- La interacción no debe retrasar el acceso a contenido estático ni generar layout shift.

## Responsive design

- Diseñar primero para una columna y mejorar progresivamente a partir del contenido, no de dispositivos concretos.
- Header móvil con identidad, búsqueda accesible y botón de menú; navegación simple, sin niveles profundos.
- Mantener el buscador global visible en home sin obligar a abrir un modal.
- Filtros móviles en panel accesible o bloque colapsable; controles de al menos 44 × 44 px, resumen de activos y acciones siempre alcanzables.
- Cards con orden estable: tipo, nombre, descripción, metadatos, estado y tags. Evitar truncar nombres en una sola línea.
- Páginas detalle apilan estado y metadatos; ninguna información esencial queda en un aside que desaparece.
- Evitar tablas complejas. Transformar datos comparables en listas de definición o filas apiladas con encabezado visible.
- No usar layouts cuyo significado dependa de posición izquierda/derecha, hover o puntero preciso.
- Probar como mínimo 320, 375, 768, 1.024 y 1.440 px, además de zoom al 200 %.

## Performance visual

- Mantener Astro estático como base y usar islas solo para búsqueda, filtros o menú cuando no pueda resolverse con HTML/CSS.
- Evitar React si un componente no necesita estado de cliente; no hidratar listas completas.
- No introducir librerías visuales, paquetes de íconos o animación pesados. Preferir SVG locales pequeños o símbolos tipográficos con significado.
- Servir fuentes WOFF2 locales, limitar familias/pesos y precargar únicamente el recurso crítico.
- Optimizar imágenes con dimensiones explícitas, formatos AVIF/WebP cuando aplique y carga diferida fuera del primer viewport.
- Sin patrones decorativos de fondo, canvas ni video: la identidad sale de casillas, tipografía y color.
- Evitar sombras grandes, blur y filtros costosos; además son ajenos a la dirección visual.
- Objetivo: Lighthouse superior a 90 en Performance, Accessibility, Best Practices y SEO en páginas representativas, con especial atención a LCP, CLS e INP.

## Validación visual con Playwright

La validación debe combinar assertions semánticas con un conjunto pequeño de screenshots estables. No conviene capturar toda ruta o cada registro: haría el CI frágil y convertiría cambios de datos en ruido.

Cobertura mínima:

- home desktop (1.440 × 900) y móvil (375 × 812);
- listados de empresas, universidades, personas y comunidades;
- páginas de ecosistema y contribuir;
- una ficha detalle verificada y otra pendiente/parcial;
- estado vacío provocado por un filtro o búsqueda conocida;
- navegación móvil abierta, foco de teclado y cierre;
- panel de filtros en móvil;
- ausencia de overflow horizontal en 320 px.

Prácticas recomendadas:

- desactivar animaciones y fijar viewport, zona horaria y fuentes antes de screenshots;
- usar fixtures locales controlados o seleccionar elementos por `data-testid` semántico cuando el texto cambie con datos reales;
- capturar componentes o regiones críticas para estados de verificación y vacío, y página completa solo en las vistas principales;
- usar tolerancia mínima documentada para diferencias de renderizado, sin ocultar regresiones reales;
- separar tests funcionales de snapshots visuales;
- actualizar snapshots únicamente con revisión humana de la diferencia;
- ejecutar Chromium en CI y complementar manualmente con otros motores antes de releases importantes.

## Tokens de diseño

Los valores son una base de implementación; cualquier ajuste debe conservar las relaciones y documentarse en el sistema.

| Categoría | Tokens propuestos | Valor / regla |
|---|---|---|
| Colores | `fog`, `sheet`, `sheet-alt`, `rule`, `rule-strong`, `graphite`, `graphite-2`, `ink-blue`, `highlight`, `rust` | Usar los hex de "Paleta de color". El amarillo solo como relleno; una banda amarilla por vista. |
| Estados | `.stamp-verified`, `.stamp-partial`, `.stamp-unknown`, `.stamp-inactive`, `.stamp-archived` | Sellos que se distinguen por forma (sólido, contorno, punteado, tinte, gris), siempre con label y símbolo. |
| Tipografía | `font-display`, `font-sans`, `font-mono` | Archivo (ancha), Atkinson Hyperlegible Next, Atkinson Hyperlegible Mono; fallbacks locales obligatorios. |
| Tamaño | `text-xs` a `text-display` | 12, 14, 16, 17, 20, 28, 36, 40 y 56 px, usando `clamp()` en `h1`/display. |
| Interlineado | `leading-tight`, `leading-heading`, `leading-body` | 1.05, 1.2 y 1.6. |
| Espaciado | `space-1` a `space-24` | Escala base 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Evitar valores sueltos salvo necesidad documentada. |
| Bordes | `border-default`, `border-strong`, `focus-ring` | 1 px `border`; 2 px para énfasis; foco de 2–3 px en `accent` con offset de 2 px. |
| Radios | `rounded-none`, `rounded-control` | 0 en fichas, casillas, bandas y paneles (la grilla de 1px no admite curvas); 4 px en botones, campos, tags, sellos y chips de fuente. |
| Sombras | `shadow-overlay` | `0 6px 20px rgb(22 29 36 / 0.16)`, solo para menú y paneles flotantes. Las fichas no llevan sombra. |
| Sellos | `.stamp` | 26 px de alto; 2 px × 8 px; 12 px bold en mayúsculas; borde de 1.5 px. Label siempre visible. |
| Contenedores | `content-wide`, `content-reading`, `content-detail` | 1.280, 720 y 1.080 px máximos. |
| Breakpoints | `sm`, `md`, `lg`, `xl` | 640, 768, 1.024 y 1.280 px; cambiar por necesidad del contenido, no por modelo de dispositivo. |
| Movimiento | `duration-fast`, `duration-base`, `ease-standard` | 120 ms, 180 ms, `cubic-bezier(0.2, 0, 0, 1)`. |

## Criterios de aceptación visual

- [ ] El sitio no parece generado por IA ni usa copy intercambiable.
- [ ] El sitio no parece una plantilla SaaS, dashboard corporativo o landing comercial.
- [ ] Existe una identidad regional sutil reconocible en color, tipografía, composición o patrón, sin clichés turísticos.
- [ ] La interfaz es clara, sobria, humana y confiable para empresas, academia y comunidad.
- [ ] Los estados de verificación se muestran con label, color, símbolo, fecha y explicación cuando aplica.
- [ ] El sitio explica de forma visible que nació en 2020 y se revalida comunitariamente en 2026.
- [ ] Ningún orden, título, métrica o tratamiento visual hace parecer el sitio un ranking.
- [ ] La experiencia no parece una bolsa de empleo ni utiliza lenguaje de reclutamiento.
- [ ] La home comunica propósito, contexto, búsqueda, métricas, categorías y contribución sin sobrecarga.
- [ ] Los listados permiten buscar, filtrar, entender el conteo y recuperarse de estados vacíos.
- [ ] Los detalles se perciben como fichas de investigación con fuentes, metadatos y corrección comunitaria.
- [ ] La sección de personas se enfoca en contribuciones públicas y no expone datos personales sensibles.
- [ ] El sitio funciona desde 320 px, con navegación, búsqueda, filtros y fichas usables en móvil.
- [ ] La estructura cumple WCAG 2.2 AA básica: contraste, teclado, foco, labels, jerarquía y alternativas textuales.
- [ ] El movimiento es sutil, opcional y respeta `prefers-reduced-motion`.
- [ ] La implementación conserva un enfoque static-first, evita dependencias visuales innecesarias y alcanza Lighthouse > 90.
- [ ] Playwright cubre las vistas y estados visuales críticos sin snapshots excesivos ni frágiles.
- [ ] La UI final está alineada con el propósito de observatorio abierto y verificable del ecosistema regional.

---

Este documento define intención, reglas y límites. La siguiente fase deberá traducirlos a tokens de Tailwind, componentes Astro y pruebas visuales sin alterar su principio central: **los datos, su procedencia y las relaciones del ecosistema son la identidad principal del producto**.
