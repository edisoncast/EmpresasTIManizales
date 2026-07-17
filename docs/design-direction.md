# Dirección de diseño

> Un observatorio editorial y abierto del ecosistema tecnológico de Manizales y Caldas, construido con datos verificables, identidad regional sutil y una experiencia moderna, clara y humana.

Esta dirección entiende el sitio como infraestructura pública de conocimiento: un lugar para consultar, relacionar, verificar y mejorar información del territorio. La interfaz debe dar protagonismo a los datos, las fuentes y las relaciones entre actores. Debe sentirse contemporánea sin adoptar la estética intercambiable de una landing SaaS.

La referencia regional aparecerá en el ritmo, los materiales visuales y algunos detalles —topografía abstracta, niebla, café, concreto y coordenadas—, no en fotografías turísticas ni símbolos literales. El resultado debe ser implementable con HTML semántico, Astro y Tailwind, con JavaScript únicamente donde la interacción lo requiera.

## Personalidad visual

1. **Confiable.** Jerarquías predecibles, contraste alto, fuentes visibles y estados de verificación explícitos. La interfaz distingue hechos verificados, información parcial y registros pendientes sin ocultar incertidumbre.
2. **Local.** Colores minerales y vegetales, referencias discretas al relieve y lenguaje propio del territorio. La identidad regional no depende de postales, monumentos o clichés cafeteros.
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

La paleta clara parte de papel cálido, niebla, vegetación de montaña, concreto y café tostado. El verde profundo funciona como acento territorial y técnico; los tonos de verificación se mantienen sobrios. Ningún estado debe comunicarse únicamente mediante color.

| Token | Hex sugerido | Uso recomendado | Accesibilidad |
|---|---:|---|---|
| `--color-background` | `#F5F3ED` | Fondo general, semejante a papel cálido bajo niebla. | Texto primario ofrece contraste superior a 12:1. |
| `--color-surface` | `#FFFFFF` | Fichas, paneles de lectura y controles. | Evitar texto secundario menor de 14 px si pierde contraste. |
| `--color-surface-muted` | `#E8ECE7` | Bandas editoriales, filtros y metadatos agrupados. | Separar también con borde o espaciado. |
| `--color-text-primary` | `#17211C` | Títulos y texto principal. | Contraste AAA sobre fondos claros propuestos. |
| `--color-text-secondary` | `#526059` | Descripciones, ayudas y metadatos. | Contraste aproximado AA sobre blanco; no aclararlo para texto pequeño. |
| `--color-border` | `#C8CFC9` | Divisores, contornos de controles y tablas simples. | Es apoyo estructural, nunca el único indicador de foco. |
| `--color-accent` | `#1F5C4A` | Enlaces, CTA principal, foco y elementos activos. | Apto para texto sobre blanco; con texto blanco requiere tamaños y pesos AA verificados. |
| `--color-accent-soft` | `#DCEAE3` | Fondo de selección, callouts y acentos secundarios. | Usar texto `#174638`, no el acento como texto pequeño sin verificar. |
| `--color-verified` | `#256B4A` | Estado verificado. | Combinar con label y símbolo; blanco solo en badges de peso medio. |
| `--color-partial` | `#8A6418` | Estado parcialmente verificado. | Usar sobre fondo `#F4EBCF` con texto oscuro. |
| `--color-pending` | `#765B38` | Estado desconocido o pendiente. | Usar sobre fondo `#EFE6D8`; evitar amarillo pálido con texto blanco. |
| `--color-inactive` | `#8B4A3F` | Posiblemente inactivo o no verificado. | Tono terracota no alarmista; acompañar con explicación. |
| `--color-archived` | `#66706B` | Registro archivado o histórico. | Fondo gris verdoso claro y label textual obligatorio. |

El café puede aparecer como acento auxiliar puntual (`#6D4C3D`) en fechas históricas o referencias al archivo 2020, nunca como segundo color dominante. No usar más de un acento principal por vista.

Una variante oscura puede estudiarse después del MVP. Deberá redefinir todos los pares de contraste y superficies; no basta con invertir colores.

## Tipografía

- **Títulos: Newsreader**, serif editorial de formas contemporáneas. Aporta voz propia al observatorio y contrasta con la precisión del cuerpo sin sentirse decorativa. Pesos recomendados: 500 y 600.
- **Cuerpo e interfaz: Public Sans**, sans serif concebida para información pública y lectura digital. Es clara en tamaños pequeños y funciona bien en filtros, navegación y texto largo. Pesos: 400, 500, 600 y, excepcionalmente, 700.
- **Metadatos y código: IBM Plex Mono**, opcional para fechas, coordenadas, slugs, conteos compactos o fragmentos de datos. No usar en párrafos ni en todas las etiquetas.

Si cargar fuentes web afecta rendimiento, se pueden alojar localmente en WOFF2 con subconjuntos necesarios y `font-display: swap`. La pila de respaldo debe incluir serif y sans del sistema. El carácter no debe depender solo de la fuente: también proviene de la jerarquía, el ancho de columna, los divisores y el uso editorial del espacio.

Jerarquía base sugerida:

- `display`: 44–64 px desktop / 36–44 px móvil, interlineado 0.98–1.05, para el hero solamente;
- `h1`: 36–48 px desktop / 30–36 px móvil, interlineado 1.05–1.15;
- `h2`: 26–32 px, interlineado 1.15–1.25;
- `h3`: 19–23 px, interlineado 1.25;
- cuerpo principal: 17–18 px, interlineado 1.55–1.7;
- cuerpo de interfaz: 14–16 px, interlineado 1.4–1.55;
- metadatos: 12–14 px, nunca por debajo de 12 px.

Evitar titulares enteros en mayúsculas. Reservar versales o monoespaciada para etiquetas breves, con espaciado moderado.

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
| **Header** | Orientar y dar acceso rápido a exploración, búsqueda y contribución. | Barra sobria, fondo sólido, nombre del proyecto a la izquierda y navegación textual. Estado actual visible; menú móvil con botón nombrado, foco controlado y cierre claro. Puede usar una línea topográfica mínima como detalle. | Megamenús, header transparente sobre contenido, demasiados CTA o íconos sin label. |
| **Footer** | Cerrar con contexto, metodología, repositorio y mantenimiento. | Composición en 2–4 columnas desiguales, borde superior, nota “2020 → 2026”, licencia y enlaces a fuentes/contribución. | Repetir toda la navegación, mosaico de logos o aspecto corporativo pesado. |
| **Hero** | Explicar propósito y abrir la exploración. | Titular editorial fuerte, párrafo concreto, buscador global y nota histórica. Patrón topográfico o coordenadas en baja opacidad; no más de dos CTA. | Promesas grandilocuentes, gradientes AI, ilustración genérica o métricas sin contexto. |
| **SearchBar** | Consultar entidades con rapidez. | Label visible o asociado, icono opcional no indispensable, borde nítido y foco de 2–3 px. Estados: vacío, escritura, cargando si aplica, resultados y sin resultados. | Placeholder como único label, animaciones largas o autocomplete inaccesible. |
| **FilterPanel** | Refinar listados de forma comprensible. | Grupos con leyenda, checkboxes/radios nativos estilizados con moderación, conteo activo y acciones claras. En móvil es panel apilado, no una fila desbordada. | Chips infinitos, controles sin label, filtros ocultos sin indicar que están activos. |
| **EntityCard** | Resumir un registro y llevar a su ficha. | Se parece a una ficha catalográfica: kicker de tipo, nombre, descripción, metadatos, tags y estado alineado. Variaciones sutiles por entidad mediante label y composición, no mediante arcoíris. Estados hover, foco y archivado. | Cards idénticas altas, sombra flotante, logo como protagonista o toda la tarjeta llena de badges. |
| **PersonCard** | Mostrar contribuciones públicas y contexto profesional. | Nombre, rol contextual, 1–2 contribuciones, áreas y verificación. Retrato solo si existe, tiene procedencia y alt adecuado; inicial o composición tipográfica como fallback. | Métricas de seguidores, prominencia, estrellas, trofeos o lenguaje de celebridad. |
| **EntityDetail** | Presentar una ficha de investigación completa. | Cabecera con tipo, nombre, estado y fecha; cuerpo con descripción, atributos, relaciones y bloque de fuentes numerado. CTA de corrección cerca de fuentes. | Hero comercial, información crítica enterrada o paneles iguales para cada campo. |
| **VerificationStatus** | Expresar confianza y vigencia. | Badge textual compacto con símbolo, color y tooltip/explicación; versión extendida en detalle con fecha y mensaje. Cinco variantes coherentes. | Binario “válido/inválido”, solo color, rojo alarmista para incertidumbre. |
| **SourceBadge** | Hacer visible la evidencia. | Label “Fuente 1”, dominio y, cuando sea útil, fecha de consulta. Enlace externo con indicador textual/visual y foco visible. Estado de enlace no disponible documentado. | URL cruda extensa, favicon remoto o insinuar que una fuente equivale a aprobación. |
| **StatsGrid** | Dar escala al ecosistema con contexto. | Cifras tipográficas separadas por divisores o una grilla abierta; cada cifra tiene categoría y nota de corte temporal. | Dashboard de KPI, flechas de crecimiento no sustentadas o tarjetas clonadas con íconos. |
| **EmptyState** | Explicar ausencia de resultados y ofrecer salida. | Título claro, criterio que no produjo resultados, acciones “Limpiar filtros” y “Sugerir registro”. Puede usar una forma topográfica simple. | Chistes, ilustración enorme o culpar a la persona usuaria. |
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
| `verified` | **Verificado** | Verde bosque `#256B4A` sobre `#DDEDE4`; seguro y sereno. | “Verificado con fuentes públicas.” | Los campos principales tienen evidencia reciente y fuentes registradas. |
| `partially_verified` | **Verificación parcial** | Ocre `#8A6418` sobre `#F4EBCF`; atención moderada. | “Parte de la información está verificada.” | Hay fuentes, pero faltan campos importantes o la vigencia no está completamente confirmada. |
| `unknown` | **Estado por confirmar** | Café grisáceo `#765B38` sobre `#EFE6D8`; neutral. | “Aún no contamos con evidencia suficiente.” | Información heredada o aportada sin fuente pública concluyente. |
| `inactive_or_unverified` | **Posiblemente inactivo** | Terracota sobrio `#8B4A3F` sobre `#F3E1DD`; cauteloso, no alarmista. | “No se confirmó actividad reciente.” | Hay indicios de inactividad o no fue posible verificar vigencia; no equivale a cierre definitivo. |
| `archived` | **Archivo histórico** | Gris verdoso `#66706B` sobre `#E5E9E6`; documental. | “Se conserva como parte del archivo.” | El registro ya no está vigente o pertenece al conjunto histórico de 2020 y se conserva con contexto. |

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

El elemento visual propio recomendado es un **patrón topográfico abstracto** construido como SVG ligero, combinado con las coordenadas de Manizales (`5.07° N, 75.52° O`) y una retícula editorial. Debe tener opacidad baja, no competir con el texto y poder ocultarse en móvil si añade ruido. Como alternativa, líneas finas pueden conectar etiquetas “universidad”, “empresa”, “comunidad” y “personas”; no deben simular relaciones que los datos no soporten.

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

- kicker con tipo de entidad y, si aporta, identificador o ciudad;
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
- Mantener el patrón topográfico como SVG comprimido o CSS, sin canvas ni video de fondo.
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
| Colores | `background`, `surface`, `surface-muted`, `text-primary`, `text-secondary`, `border`, `accent`, `accent-soft` | Usar los hex definidos en “Paleta de color”. Máximo un acento dominante por vista. |
| Estados | `verified`, `partial`, `pending`, `inactive`, `archived` | Siempre en pares foreground/background con label y símbolo. No reutilizar como categorías decorativas. |
| Tipografía | `font-display`, `font-body`, `font-mono` | `Newsreader`, `Public Sans`, `IBM Plex Mono`; fallbacks locales obligatorios. |
| Tamaño | `text-xs` a `text-display` | 12, 14, 16, 18, 21, 28, 36, 48 y 64 px, usando `clamp()` en `h1`/display. |
| Interlineado | `leading-tight`, `leading-heading`, `leading-body` | 1.05, 1.2 y 1.6. |
| Espaciado | `space-1` a `space-24` | Escala base 4 px: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Evitar valores sueltos salvo necesidad documentada. |
| Bordes | `border-default`, `border-strong`, `focus-ring` | 1 px `border`; 2 px para énfasis; foco de 2–3 px en `accent` con offset de 2 px. |
| Radios | `radius-sm`, `radius-md`, `radius-lg`, `radius-pill` | 3, 6, 10 y 999 px. `pill` solo para badges/controles compactos, no contenedores. |
| Sombras | `shadow-subtle`, `shadow-overlay` | `0 1px 2px rgb(23 33 28 / 0.06)` y `0 8px 24px rgb(23 33 28 / 0.12)`; overlay solo para menú/panel flotante. |
| Badges | `badge-height`, `badge-padding`, `badge-font` | 24–28 px; 4 px × 8 px; 12–13 px semibold. Label siempre visible. |
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
