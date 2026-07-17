# CLAUDE.md

Guía para agentes que trabajen en este repositorio. Léela antes de editar.

## Qué es

**Observatorio TIC de Manizales y Caldas** — un mapa web abierto, estático y verificable del
ecosistema tecnológico regional: empresas, universidades, programas, personas, comunidades, eventos
y entidades de apoyo. Evoluciona el repositorio comunitario original de 2020 (preservado en
`legacy/`) hacia un sitio moderno. **Los datos, su procedencia y las relaciones son la identidad del
producto.** Licenciamiento por material: **código MIT**, **datos y contenido CC BY-SA 4.0**,
**empresas** bajo términos de la Cámara de Comercio (atribución + no comercial) y **`legacy/`** en
CC0. Ver `LICENSE`, `LICENSE-DATA` y `docs/data-sources.md`.

- **Sitio en vivo:** https://ticmanizales.edisoncastrosanchez.app
- **Repo:** `edisoncast/EmpresasTIManizales` (rama por defecto `master`, protegida).

## Stack

- **Astro 6** + **TypeScript** (strict) — generación estática, `format: 'directory'`.
- **Tailwind CSS 3.4 vía PostCSS** (`postcss.config.mjs`, autoprefixer). **No** se usa `@astrojs/tailwind`.
- **Sin React ni islas hidratadas.** Búsqueda y filtros son **JavaScript vanilla** en `<script>` de
  componentes `.astro`. No añadir frameworks de cliente salvo necesidad real.
- **Zod** valida los datos en build (`npm run build` corre `validate:data` primero).
- **Fuentes self-hosted** (`@fontsource*`): Newsreader (display), Public Sans (cuerpo), IBM Plex Mono
  (metadatos). Respetan la CSP `font-src 'self'` — no usar CDNs de fuentes.
- **Vitest** (unit) + **Playwright** (`@playwright/test`, `@axe-core/playwright`) para e2e/a11y.
- **Node 24** (ver `engines`). Ver "Cómo ejecutar".

## Cómo ejecutar (IMPORTANTE: Node NO está instalado localmente)

El host es Windows/PowerShell **sin Node ni npm en el PATH**. Todo corre en **Docker**.

```bash
# Dev / build / validaciones (Node 24)
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine sh -c "npm ci && npm run build"
docker run --rm -d --name ticmanizales-dev -p 4321:4321 -v "${PWD}:/app" -w /app \
  node:24-alpine sh -c "npm run dev -- --host 0.0.0.0"   # http://localhost:4321

# e2e / a11y (imagen con navegadores; alinear tag con la versión de @playwright/test)
docker run --rm -v "${PWD}:/app" -w /app mcr.microsoft.com/playwright:v1.61.1-noble \
  sh -c "npm ci && npm run build && npm run test:e2e"
```

- npm 11 en la imagen bloquea install-scripts por defecto, pero esbuild/sharp funcionan (binarios por optionalDependencies).
- Para servir el `dist` dentro de la imagen Playwright sin conflictos de binario, se puede usar
  `python3 -m http.server 4321 --bind 127.0.0.1` desde `dist/` y dejar que Playwright reutilice el server.
- Scripts: `dev`, `build`, `preview`, `lint`, `format`, `format:check`, `test`, `test:e2e`,
  `validate:data`, `audit:data`, `validate:urls`, `verify:companies`.

## Datos y reglas (no negociables)

- Datos versionados en `src/data/*.json`, validados por `src/schemas/*` (Zod). Cada dataset es un
  array; `slug` en kebab-case único y estable (define la URL de detalle).
- **Cada registro importante debe tener `sourceUrl` público o quedar con `needsVerification: true`.**
  **No inventar datos**; si falta algo, dejar vacío o marcar por verificar. **Verificar URLs** antes
  de agregarlas (varias del repo de 2020 estaban muertas; el SNIES migró a `hecaa.mineducacion.gov.co`).
- Estados de verificación (5, sobrios, nunca solo color): `verified`, `partially_verified`,
  `unknown`, `inactive_or_unverified`, `archived` (ver `src/lib/verification.ts`). Campo opcional
  `verificationStatus`; si no está, se deriva de `needsVerification`/`status`.
- **Privacidad (Ley 1581):** no publicar correos, direcciones, teléfonos ni cédulas. Las
  exportaciones crudas de la Cámara de Comercio (`*.xlsx`) están **gitignored** porque contienen
  datos personales — **nunca commitearlas**. Los datos migrados y depurados viven en `companies.json`.
- **Personas:** solo perfiles públicos con contribución pública; enfoque en aportes al ecosistema,
  **sin lenguaje de ranking** ("top", "mejor") ni orden por tamaño/prestigio. Orden alfabético.
  Empresas: NIT solo de personas jurídicas (no de naturales/establecimientos).
- **Fuentes citadas:** Cámara de Comercio de Manizales por Caldas (empresas, CIIU J6201) y
  SNIES/HECAA (universidades/programas). La institución empresarial exige citar la fuente y uso no
  comercial — ya reforzado en `/empresas` y `/acerca`.
- Relaciones que valida `validate-data`: programa→universidad (`institutionSlug`), comunidad→persona
  (`organizerSlug`), evento→comunidad (`organizerCommunitySlug`). Slugs referenciados deben existir.

## Despliegue (AWS, ya en producción)

- Cuenta `362730983676`, región `us-east-1`, usuario IAM local `terraform` (llaves estáticas en `~/.aws`).
- IaC en `infra/terraform`: **S3 privado + CloudFront + OAC + headers de seguridad + CloudFront
  Function** (reescribe rutas de directorio a `index.html`). Provider AWS `~> 6.0`, Terraform >= 1.10,
  **backend S3 con lock nativo** (`use_lockfile`, sin DynamoDB). Correr terraform vía Docker montando
  `~/.aws`: `docker run --entrypoint /bin/sh -v "${PWD}/infra/terraform:/tf" -v "$HOME/.aws:/root/.aws:ro" -w /tf hashicorp/terraform:latest -c "terraform ..."`.
- Recursos: bucket sitio `ticmanizales-prod-362730983676`; CloudFront `E3GZTE04P0B7K0`; bucket de
  estado `ticmanizales-tfstate-362730983676`; dominio en la hosted zone `edisoncastrosanchez.app`.
- **CI/CD con OIDC (sin llaves largas):** proveedor OIDC de GitHub + rol IAM
  `ticmanizales-github-deploy` (permisos mínimos: ese bucket + CreateInvalidation en esa dist).
  Secretos de repo: `AWS_DEPLOY_ROLE_ARN`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`. El workflow
  **Deploy** corre en push a `master` (o `workflow_dispatch`); **CI** valida en cada PR.
- **master protegida:** requiere PR + status check `validate` (CI) verde, sin force-push ni borrado.
  Flujo: rama → PR → CI → merge → deploy automático.
- **Un solo ambiente: prod** (decisión del dueño). No hay staging. La validación pre-producción se
  hace con: (a) **CI obligatoria en el PR** (build + unit + e2e + axe) como gate; (b) **`npm run
  preview` local** (build idéntico a prod) para Lighthouse y QA manual; (c) `terraform plan` (solo
  lectura) contra la cuenta de prod. **Rollback:** el bucket tiene versioning → `git revert` + push
  re-sincroniza el estado anterior (sitio estático, rollback limpio). No crear workspaces/entornos
  de staging.

## Convenciones y gotchas

- Escribir `[hidden] { display:none !important }` sigue vigente en `global.css`: `.card` usa
  `display:flex` y sin eso el atributo `hidden` no oculta las tarjetas filtradas.
- Grids responsive: usar `grid-cols-1` base (no solo `lg:grid-cols-3`) para que `minmax(0,1fr)` evite
  overflow horizontal. Los e2e de responsive lo verifican en 320–1440.
- JSON-LD y datos embebidos en HTML se serializan con `src/lib/serializeJsonForHtml` (`lib/json.ts`),
  no con `innerHTML` de datos contribuidos (seguridad/CSP).
- La navegación de escritorio aparece en `xl` (1280); por debajo hay menú `<details>` (los e2e usan
  `header details summary`).
- Un solo `h1` por página; foco visible; labels; áreas táctiles ≥44px. No romper esto.
- Editar datos con Edit **por anexado** cuando el usuario esté editando en paralelo; leer el final del
  archivo antes de anexar.

## Documentación

- `docs/design-direction.md` — dirección visual (fuente de verdad del diseño).
- `docs/design-implementation-notes.md` — cómo se implementó.
- `docs/data-sources.md`, `docs/data-audit-2026.md` — procedencia y auditoría de datos.
- `docs/pre-deployment-review.md` — revisión preproducción (decisión NO-GO para el estado refactor
  hasta versionarlo y validar CI sobre el SHA; ver "Pendientes").
- `README.md` / `CONTRIBUTING.md` — cómo correr, agregar registros y desplegar.

## Pendientes conocidos (de la revisión preproducción)

1. Versionar el estado refactor (Astro 6 + personas nuevas) en un commit/PR y validar CI sobre ese SHA.
2. Documentar importador reproducible + checksum + fecha de corte de los XLSX empresariales (el XLSX
   crudo NO se versiona por privacidad).
3. Segunda fuente y revisión humana de los perfiles nuevos `partially_verified` antes de promoverlos.
4. `terraform plan` contra la cuenta real; Lighthouse en staging; revisar 3 enlaces externos (503/403).
