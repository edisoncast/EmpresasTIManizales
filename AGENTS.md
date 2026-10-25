# AGENTS.md

Instrucciones para agentes de código (Claude Code, Codex, Copilot, Cursor y similares) que trabajen
en este repositorio. Las personas encuentran el contexto general en `README.md` y `CONTRIBUTING.md`.

## Proyecto

**Observatorio TIC de Manizales y Caldas**: mapa web abierto, estático y verificable del ecosistema
tecnológico regional (empresas, universidades, programas, personas, comunidades, eventos y entidades
de apoyo). **Los datos, su procedencia y sus relaciones son la identidad del producto.**

- Sitio: https://ticmanizales.edisoncastrosanchez.app
- Rama por defecto: `master` (protegida). `legacy/` conserva el repositorio comunitario de 2020.
- Licencias por material: código MIT (`LICENSE`), datos y contenido CC BY-SA 4.0 (`LICENSE-DATA`),
  empresas bajo términos de la Cámara de Comercio (atribución, uso no comercial), `legacy/` CC0.

## Stack

- Astro 7 + TypeScript 6 strict, salida estática (`format: 'directory'`, `compressHTML: true` para
  conservar los espacios entre elementos en línea).
- Tailwind CSS 4 con `@tailwindcss/vite` (configurado en `astro.config.mjs`). No hay
  `tailwind.config` ni PostCSS: los tokens viven en `@theme` dentro de `src/styles/global.css`.
- TypeScript se queda en 6.x hasta que typescript-eslint acepte TypeScript 7.
- Sin frameworks de cliente: búsqueda y filtros son JavaScript vanilla en `<script>` de componentes
  `.astro`. No añadir React ni islas hidratadas sin una necesidad real.
- Zod valida los datos en build. Vitest para unit; Playwright + axe para e2e y accesibilidad.
- Node 24 (`engines`), npm 11.

## Comandos

```bash
npm ci                  # instalar
npm run dev             # servidor local en http://localhost:4321
npm run validate:data   # esquemas Zod y relaciones entre slugs
npm run audit:data      # auditoría de calidad de datos
npm run lint            # ESLint
npm run format:check    # Prettier (npm run format para corregir)
npm test                # Vitest
npm run build           # validate:data + astro build
npm run test:e2e        # Playwright + axe (requiere build)
```

Sin Node 24 local, todo corre en Docker:

```bash
docker run --rm -v "$PWD:/app" -w /app node:24-alpine sh -c "npm ci && npm run build"
docker run --rm -v "$PWD:/app" -w /app mcr.microsoft.com/playwright:v1.64.1-noble \
  sh -c "npm ci && npm run build && npm run test:e2e"
```

La etiqueta de la imagen de Playwright debe coincidir con la versión de `@playwright/test` del lockfile.

**Antes de abrir un PR** corre lo mismo que la CI: `validate:data`, `audit:data`, `lint`,
`format:check`, `test`, `build` y `test:e2e`.

## Estructura

- `src/data/*.json` — datasets (cada uno es un array). `src/schemas/*` — esquemas Zod.
- `src/lib/` — lógica pura (formato, búsqueda, verificación, serialización). Probada en `tests/*.test.ts`.
- `src/components/` — componentes Astro. `src/pages/` — rutas. `src/styles/global.css` — tokens.
- `tests/e2e/` — navegación, filtros, responsive (320–1440 px), accesibilidad y fichas.
- `scripts/` — validación, auditoría y verificación de URLs y empresas.
- `infra/terraform/` — S3 privado + CloudFront (OAC, headers de seguridad, función de reescritura).
- `docs/` — dirección de diseño, fuentes y auditoría de datos.

## Reglas de datos (no negociables)

- **No inventar datos.** Cada registro importante lleva `sourceUrl` público o queda con
  `needsVerification: true`. Verifica que cada URL responda antes de agregarla (el SNIES migró a
  `hecaa.mineducacion.gov.co`).
- `slug` en kebab-case, único y estable: define la URL de la ficha.
- Estados de verificación: `verified`, `partially_verified`, `unknown`, `inactive_or_unverified`,
  `archived` (`src/lib/verification.ts`). Si falta `verificationStatus`, se deriva de
  `needsVerification` y `status`.
- Relaciones validadas: programa → universidad (`institutionSlug`), comunidad → persona
  (`organizerSlug`), evento → comunidad (`organizerCommunitySlug`). Los slugs referenciados deben existir.
- **Privacidad (Ley 1581):** nunca publicar correos, teléfonos, direcciones ni cédulas. Las
  exportaciones crudas de la Cámara de Comercio (`*.xlsx`) contienen datos personales: están en
  `.gitignore` y **nunca** se commitean. NIT solo de personas jurídicas.
- **Personas:** solo perfiles públicos con contribución pública, en orden alfabético. Sin lenguaje de
  ranking ("top", "mejores", "destacada") ni orden por tamaño o prestigio.
- Cita las fuentes: Cámara de Comercio de Manizales por Caldas (empresas, CIIU) y SNIES/HECAA
  (universidades y programas).
- Si una persona edita datos en paralelo, agrega registros al final del JSON en lugar de reescribirlo.

## Sistema visual

Fuente de verdad: `docs/design-direction.md` (detalle de implementación en
`docs/design-implementation-notes.md`).

- "Hoja de registro": fondo `fog`, hojas `sheet`, texto `graphite`/`graphite-2`, tinta `ink-blue`
  para lo interactivo y resaltador `highlight` solo como relleno (hover, foco, una banda de
  contribución por vista). Tokens semánticos en `@theme` de `global.css`; no reintroducir escalas
  numéricas de color.
- Fichas, casillas y paneles son rectos; `rounded-control` (4px) solo en botones, campos, tags y
  sellos. `@theme` reinicia la escala de radios: `rounded-lg`/`rounded-xl` no generan CSS.
- En Tailwind 4, `@apply` solo acepta utilidades: una clase propia que otras reglas apliquen
  (`btn`, `mark`, `field-label`) se declara con `@utility`, no dentro de `@layer components`.
- Fuentes self-hosted con `@fontsource-variable/*` (la CSP exige `font-src 'self'`, sin CDNs):
  Archivo con eje de ancho (`archivo/wdth.css`) para titulares, Atkinson Hyperlegible Next para el
  cuerpo y Atkinson Hyperlegible Mono solo para datos.
- Sin emojis, gradientes ni ilustraciones decorativas. Los estados usan sello + símbolo + texto, nunca
  solo color.

## Convenciones y trampas conocidas

- `[hidden] { display: none !important }` en `global.css` es obligatorio: `.ficha` usa `display:flex`
  y sin esa regla el filtrado en cliente deja tarjetas visibles.
- Grillas con `grid-cols-1` de base (no solo `lg:grid-cols-3`) para evitar overflow horizontal.
- JSON-LD y datos embebidos se serializan con `serializeJsonForHtml` (`src/lib/json.ts`), nunca con
  `innerHTML` de datos contribuidos.
- La navegación de escritorio aparece desde `xl` (1280 px); por debajo hay un menú `<details>` (los e2e
  usan `header details summary`).
- Accesibilidad mínima: un solo `h1` por página, foco visible, labels asociados, áreas táctiles ≥ 44 px.
- Textos del sitio y documentación en español neutro.

## Commits y pull requests

- Conventional Commits con alcance: `feat(home): …`, `fix(detalle): …`, `data(empresas): …`,
  `chore(deps): …`, `docs: …`. `data` se usa para cambios de datasets.
- Flujo: rama → PR → CI (`validate`) en verde → merge. `master` no admite push directo ni force-push.
- Un PR por tema; cambios de datos separados de cambios de código cuando sea posible.

## Despliegue

- Un solo ambiente: producción. No crear staging ni workspaces de Terraform.
- `.github/workflows/deploy.yml` despliega automáticamente en cada push a `master` (o manualmente con
  `workflow_dispatch`): valida, prueba, sincroniza `dist/` a S3, invalida CloudFront y corre un smoke
  test contra el sitio.
- Autenticación por OIDC (rol con permisos mínimos); sin llaves de larga duración. Secretos del repo:
  `AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`.
- Rollback: `git revert` + merge a `master` vuelve a desplegar el estado anterior (el bucket tiene
  versionado).
- Cambios de infraestructura: solo `terraform plan` sin aprobación explícita; nunca `apply` desde un agente.
  Terraform 1.17 y provider AWS `~> 6.70`; para revisar sin credenciales:
  `docker run --rm --entrypoint sh -v "$PWD/infra/terraform:/tf" -w /tf hashicorp/terraform:1.17.0 -c "terraform init -backend=false && terraform validate"`.
- Las Actions están fijadas por SHA de commit con la versión en un comentario; Dependabot las
  actualiza. No volver a tags mutables (`@v7`).
- Dependencias: al actualizar, regenera el lockfile con `npm install --before=<fecha>` y revisa
  `npm audit`.
