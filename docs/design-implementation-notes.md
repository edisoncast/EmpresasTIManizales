# Notas de implementación visual

Traducción de [`design-direction.md`](./design-direction.md) a tokens, componentes y pruebas.
El principio se mantiene: **los datos, su procedencia y las relaciones son la identidad del producto.**

## Tokens implementados

Definidos como variables CSS en [`src/styles/global.css`](../src/styles/global.css) (`:root`) y
expuestos a Tailwind en [`tailwind.config.mjs`](../tailwind.config.mjs).

- **Color (semántico):** `--color-background` (papel cálido `#F5F3ED`), `--color-surface`,
  `--color-surface-muted`, `--color-text-primary`, `--color-text-secondary`, `--color-border`,
  `--color-accent` (verde bosque `#1F5C4A`), `--color-accent-soft`, `--color-accent-ink`,
  `--color-coffee` (acento auxiliar para lo histórico). En Tailwind: `paper`, `surface`, `mist`,
  `accent`/`accent.soft`/`accent.ink`, `coffee`.
- **Estados de verificación (pares fg/bg):** `verified`, `partial`, `pending`, `inactive`,
  `archived`, cada uno con `.DEFAULT` y `.bg`.
- **Escalas alias** `ink` (neutros minerales 50–950) y `brand` (verde 50–950): permiten que el
  marcado existente adopte la paleta nueva sin reescribir cada clase; el acento vive en `brand-600`
  = `accent` y el texto primario en `ink-900`.
- **Tipografía:** `font-display` (Newsreader Variable), `font-sans` (Public Sans Variable),
  `font-mono` (IBM Plex Mono). Self-hosted vía `@fontsource*` (WOFF2, `font-display: swap`), sin
  CDNs — respeta la CSP `font-src 'self'`.
- **Tamaños:** escala editorial `xs…3xl` + `display`, con `clamp()` en `h1`/display.
- **Radios:** `sm 3 / md 6 / lg 10 / full 9999`. **Sombras:** `subtle` y `overlay` (el resto de
  utilidades de sombra se remapean a `subtle` para sobriedad).
- **Motion:** `duration-fast 120ms`, `duration-base 180ms`, `ease-standard`. Todo se desactiva bajo
  `prefers-reduced-motion: reduce` (regla global en `global.css`).
- **Contenedores:** `content 1280`, `reading 720`, `detail 1080`. **Breakpoints:** 640/768/1024/1280.

## Componentes actualizados o creados

- **Nuevos:** `ContributionCTA.astro` (variantes agregar/corregir/aportar fuente), `TopoPattern.astro`
  (curvas de nivel SVG decorativas), `lib/verification.ts` (helper de estados).
- **Reescritos:** `Layout`, `Header`, `Footer`, `EntityCard`, `PersonCard`, `EntityDetail`,
  `PersonDetail`, `VerificationStatus`, `SourceBadge`, `StatsGrid`, `EmptyState`, `SearchBar`,
  `PageHeader`, `Browser`, `Tag`, `GlobalSearch` (estilos).
- **Páginas:** home (hero editorial + patrón topográfico + coordenadas + nota 2020→2026 + métricas
  con corte + índice editorial + conexiones reales + distribución de verificación + CTA), todos los
  listados y detalles, `ecosistema` y `contribuir`.

## Estados de verificación

Cinco estados sobrios con **label + símbolo + color + mensaje** (nunca solo color):
`verified`, `partially_verified`, `unknown`, `inactive_or_unverified`, `archived`.

- Campo opcional `verificationStatus` añadido a todos los schemas.
- Si no se define, se **deriva** (`resolveVerification`): `needsVerification=false` → verificado;
  `true` → por confirmar; comunidades con `status: inactive` → posiblemente inactivo.
- En detalle se muestra el mensaje y la fecha de última verificación; en listados, el badge compacto.

## Decisiones visuales

- **Identidad regional sutil:** paleta mineral/vegetal, patrón topográfico y coordenadas
  `5.07° N, 75.52° O`; sin postales ni clichés cafeteros. El café aparece solo como acento en lo
  histórico (2020 → 2026).
- **Wordmark “Observatorio TIC”** en header/footer para reforzar el marco de observatorio; el
  `<title>`/SEO conserva el nombre completo del proyecto.
- **Fichas tipo archivo:** kicker de tipo, nombre como enlace, metadatos, tags (máx. 4 + “+N más”),
  estado alineado; sin sombras flotantes ni logos protagonistas.
- **Sin gradientes AI, sin íconos en cada título, sin ilustraciones genéricas.** Íconos reducidos a
  símbolos tipográficos con significado.
- **React no está instalado**: búsqueda y filtros usan JavaScript nativo y el resto permanece
  estático.

## Pendientes / recomendaciones

- Variante oscura (post-MVP): redefinir todos los pares de contraste, no invertir.
- La auditoría y metodología están documentadas en `data-audit-2026.md` y `data-sources.md`; una
  página dedicada que consuma `src/data/data-audit.json` queda para una fase posterior.
- Visualización de red del ecosistema (los datos ya modelan relaciones).
- Retratos de personas con procedencia y `alt` (hoy se usa iniciales tipográficas como fallback).
- Snapshots visuales con baseline revisado por humanos (hoy se prioriza assertions semánticas +
  captura de artefactos solo en fallo para no fragilizar el CI).

## Validación visual con Playwright

Config en [`playwright.config.ts`](../playwright.config.ts): Chromium desktop (1440×900) y móvil
(375×812), `screenshot: 'only-on-failure'`, `trace: 'on-first-retry'`, `video: 'retain-on-failure'`,
  locale/timezone fijos y viewports 1440×900 / 375×667. Los tests viven en `tests/e2e/`:

- `navigation.spec.ts` — navegación, ruta activa, menú móvil, “saltar al contenido”.
- `responsive.spec.ts` — sin overflow horizontal en 320/375/768/1024/1440; buscador visible en móvil.
- `visual.spec.ts` — h1 único, contexto 2020→2026, buscador, listados con conteo y fichas, estados de
  verificación textuales, ficha verificada (Venus), estado vacío, ausencia de lenguaje de ranking/empleo.
- `search-and-filters.spec.ts`, `entity-detail.spec.ts`, `contribution.spec.ts` y
  `accessibility.spec.ts` — flujos críticos, seguridad de enlaces y axe WCAG 2.2 AA.
- `visual-capture.spec.ts` — screenshots explícitos de vistas representativas para revisión humana,
  sin actualización automática de baselines.

```bash
# Local (con navegadores instalados)
npm run test:e2e
npm run test:e2e:ui

# Con Docker (imagen oficial, navegadores incluidos)
docker run --rm -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.61.1-noble \
  sh -c "npm ci && npm run build && npm run test:e2e"
```

## Revisar el sitio localmente

```bash
npm ci
npm run dev      # http://localhost:4321
# o con Docker:
docker run --rm -it -p 4321:4321 -v "$PWD":/app -w /app node:24-alpine \
  sh -c "npm ci && npm run dev -- --host 0.0.0.0"
```
