# Ecosistema TIC · Manizales & Caldas

Mapa abierto y colaborativo del ecosistema tecnológico de **Manizales y Caldas**: empresas de base
tecnológica, universidades, programas académicos, personas referentes, comunidades y eventos.

Sitio **static-first**, económico y mantenible, construido con **Astro + TypeScript + Tailwind**.
Los datos viven versionados en el repositorio (JSON validado con **Zod**) y se actualizan mediante
**Pull Requests**. Se despliega en **AWS S3 + CloudFront** con **Origin Access Control**, con IaC en
**Terraform** y CI/CD en **GitHub Actions** usando **OIDC** (sin llaves de AWS de larga duración).

> Evoluciona el repositorio comunitario original de empresas, centros de formación y meetups hacia
> una experiencia navegable, filtrable y confiable. El repositorio sigue siendo la **fuente de verdad**.

---

## Índice

- [Stack](#stack)
- [Requisitos](#requisitos)
- [1. Correr el proyecto localmente](#1-correr-el-proyecto-localmente)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Modelo de datos](#modelo-de-datos)
- [Cómo agregar registros](#cómo-agregar-registros)
  - [2. Agregar una empresa](#2-agregar-una-empresa)
  - [3. Agregar una universidad](#3-agregar-una-universidad)
  - [4. Agregar un programa](#4-agregar-un-programa)
  - [5. Agregar una persona](#5-agregar-una-persona)
  - [6. Agregar una comunidad](#6-agregar-una-comunidad)
  - [7. Agregar un evento](#7-agregar-un-evento)
- [8. Validar datos](#8-validar-datos)
- [9. Desplegar con Terraform](#9-desplegar-con-terraform)
- [10. Configurar GitHub Actions con OIDC](#10-configurar-github-actions-con-oidc)
- [11. Secretos de GitHub necesarios](#11-secretos-de-github-necesarios)
- [Costos](#costos)
- [Fase 2](#fase-2-futuro)
- [Licencia](#licencia)

---

## Stack

- **Astro 5** + **TypeScript** (strict) — generación estática.
- **Tailwind CSS** — estilos utilitarios, diseño responsive.
- **JavaScript nativo** — búsqueda, filtros y menú sin React ni islas hidratadas innecesarias.
- **Zod** — validación de datos en build time.
- **Vitest** — tests de schemas y de la lógica de filtros.
- **Playwright + axe-core** — pruebas end-to-end, responsive, visuales y de accesibilidad.
- **ESLint + Prettier** — calidad y formato.
- **Terraform** — infraestructura AWS (S3 privado + CloudFront + OAC).
- **GitHub Actions** — CI (validación, lint, test, build) y Deploy (OIDC → AWS).

---

## Requisitos

- **Node.js 24** y npm. Usa la versión fijada en `.nvmrc`.
- Alternativamente, **Docker** (ver más abajo) si no quieres instalar Node localmente.

---

## 1. Correr el proyecto localmente

```bash
npm ci
npm run dev
```

Abre <http://localhost:4321>.

### Con Docker (sin instalar Node)

```bash
# Desarrollo
docker run --rm -it -p 4321:4321 -v "$PWD":/app -w /app node:24-alpine \
  sh -c "npm ci && npm run dev -- --host"

# Build de producción
docker run --rm -it -v "$PWD":/app -w /app node:24-alpine \
  sh -c "npm ci && npm run build"
```

El sitio compilado queda en `dist/`.

---

## Scripts disponibles

| Comando                 | Descripción                                             |
| ----------------------- | ------------------------------------------------------- |
| `npm run dev`           | Servidor de desarrollo.                                 |
| `npm run build`         | Valida datos y compila el sitio estático a `dist/`.     |
| `npm run preview`       | Sirve el build de producción localmente.                |
| `npm run lint`          | ESLint sobre todo el proyecto.                          |
| `npm run format`        | Formatea con Prettier.                                  |
| `npm run test`          | Ejecuta los tests con Vitest.                           |
| `npm run validate:data` | Valida los JSON contra los schemas Zod + integridad.    |
| `npm run audit:data`    | Genera el resumen 2026 y reporta brechas de calidad.   |
| `npm run test:e2e`      | Ejecuta navegación, responsive, axe y revisión visual. |
| `npm run test:e2e:ui`   | Abre la interfaz de Playwright para revisión local.    |
| `npm run validate:urls` | Verifica con Playwright que las URLs de los datos vivan. |
| `npm run verify:companies` | Verifica en einforma si las empresas siguen vigentes.|

---

## Estructura del proyecto

```
src/
  pages/            # Rutas (home, listados, detalles, ecosistema, contribuir, acerca)
  components/       # Layout, Header, Footer, EntityCard, PersonCard, Filtros, etc.
  data/             # Datos versionados en JSON (la fuente de verdad del contenido)
  schemas/          # Schemas Zod + tipos TypeScript
  lib/              # Carga/validación de datos, búsqueda/filtros, formato, config
  styles/           # CSS global (Tailwind)
scripts/
  validate-data.ts  # Validación de datos + integridad referencial
  audit-data.ts     # Auditoría reproducible y resumen legible por máquina
tests/              # Tests Vitest y tests/e2e con Playwright + axe
docs/               # Dirección visual, fuentes, auditoría y revisiones operativas
infra/terraform/    # IaC de AWS (S3 privado + CloudFront + OAC)
.github/            # Workflows CI/CD, plantilla de PR y de Issues
legacy/             # Markdown original preservado como referencia histórica
```

---

## Modelo de datos

Cada dataset en `src/data/*.json` es un arreglo validado por su schema en `src/schemas/`.
Campos transversales importantes:

- `slug`: identificador en **kebab-case**, único y estable (define la URL de detalle).
- `sourceUrl`: fuente pública primaria; `sources` permite varias fuentes estructuradas.
- `firstSeenAt` / `lastVerifiedAt`: trazabilidad temporal cuando está disponible.
- `verificationStatus`: `verified`, `partially_verified`, `unknown`,
  `inactive_or_unverified` o `archived`.
- `notes`: contexto de auditoría, cambios de nombre o señales de inactividad.
- `needsVerification`: `true` cuando el dato no está confirmado. **Cada registro debe tener una
  fuente o quedar marcado como pendiente de verificación.**

Consulta [`CONTRIBUTING.md`](./CONTRIBUTING.md) para el detalle de cada campo.

---

## Cómo agregar registros

> Regla de oro: **no inventes datos**. Si falta información, deja el campo vacío o marca
> `needsVerification: true`. Incluye siempre una fuente cuando sea posible.

### 2. Agregar una empresa

Edita [`src/data/companies.json`](./src/data/companies.json) y agrega un objeto:

```json
{
  "name": "Nombre de la empresa",
  "slug": "nombre-de-la-empresa",
  "description": "Qué hace, en una o dos frases.",
  "website": "https://ejemplo.com",
  "city": "Manizales",
  "department": "Caldas",
  "country": "Colombia",
  "categories": ["Desarrollo de software"],
  "technologies": ["TypeScript", "AWS"],
  "hasSoftwareDevelopmentHouse": true,
  "workModel": "hybrid",
  "size": "small",
  "sourceUrl": "https://fuente-publica.com",
  "needsVerification": false
}
```

### 3. Agregar una universidad

Edita [`src/data/universities.json`](./src/data/universities.json). La relación con programas se hace
por el array `programs` (slugs de programas) o por el `institutionSlug` del programa.

```json
{
  "name": "Universidad de Ejemplo",
  "slug": "universidad-de-ejemplo",
  "website": "https://www.ejemplo.edu.co",
  "city": "Manizales",
  "department": "Caldas",
  "country": "Colombia",
  "institutionType": "private",
  "accredited": true,
  "sniesCode": "0000",
  "programs": ["ing-sistemas-ejemplo"],
  "sourceUrl": "https://snies.mineducacion.gov.co/...",
  "needsVerification": false
}
```

### 4. Agregar un programa

Edita [`src/data/programs.json`](./src/data/programs.json). Usa `institutionSlug` para enlazar con la
universidad.

```json
{
  "name": "Ingeniería de Sistemas",
  "slug": "ing-sistemas-ejemplo",
  "institutionName": "Universidad de Ejemplo",
  "institutionSlug": "universidad-de-ejemplo",
  "level": "undergraduate",
  "modality": "onsite",
  "city": "Manizales",
  "area": ["Desarrollo de software"],
  "credits": 160,
  "durationSemesters": 10,
  "sniesCode": "00000",
  "website": "https://www.ejemplo.edu.co/programa",
  "sourceUrl": "https://snies.mineducacion.gov.co/...",
  "needsVerification": false
}
```

`level`: `technical` · `technological` · `undergraduate` · `specialization` · `masters` ·
`doctorate` · `bootcamp` · `unknown`.

### 5. Agregar una persona

Edita [`src/data/people.json`](./src/data/people.json).

**Reglas especiales:** solo perfiles públicos (`isPublicProfile: true`), sin datos sensibles,
enfoque en aportes al ecosistema, sin lenguaje competitivo (“top”, “mejor”). Cada persona debe tener
al menos una fuente pública o quedar con `needsVerification: true`.

```json
{
  "name": "Nombre Apellido",
  "slug": "nombre-apellido",
  "headline": "Rol o aporte principal",
  "shortBio": "Enfocada en su contribución al ecosistema.",
  "city": "Manizales",
  "department": "Caldas",
  "country": "Colombia",
  "areas": ["Comunidad"],
  "roles": ["Organizador de comunidad"],
  "organizations": ["Nombre de la comunidad"],
  "contributions": ["Organización de la comunidad X"],
  "linkedin": "https://www.linkedin.com/in/usuario",
  "isPublicProfile": true,
  "sourceUrl": "https://fuente-publica.com",
  "needsVerification": false
}
```

### 6. Agregar una comunidad

Edita [`src/data/communities.json`](./src/data/communities.json). Usa `organizerSlug` para enlazar con
una persona registrada.

```json
{
  "name": "ManizalesJS",
  "slug": "manizalesjs",
  "description": "Comunidad de JavaScript.",
  "focus": ["JavaScript"],
  "city": "Manizales",
  "department": "Caldas",
  "meetup": "https://www.meetup.com/es/ManizalesJS/",
  "organizer": "Nombre Apellido",
  "organizerSlug": "nombre-apellido",
  "status": "active",
  "sourceUrl": "https://www.meetup.com/es/ManizalesJS/",
  "needsVerification": false
}
```

### 7. Agregar un evento

Edita [`src/data/events.json`](./src/data/events.json). Usa `organizerCommunitySlug` para enlazar con
una comunidad.

```json
{
  "name": "Meetup de noviembre",
  "slug": "manizalesjs-noviembre-2025",
  "date": "2025-11-20",
  "city": "Manizales",
  "venue": "Universidad de Caldas",
  "modality": "onsite",
  "organizerCommunity": "ManizalesJS",
  "organizerCommunitySlug": "manizalesjs",
  "topics": ["JavaScript"],
  "url": "https://www.meetup.com/...",
  "sourceUrl": "https://www.meetup.com/...",
  "needsVerification": false
}
```

---

## 8. Validar datos, auditoría y pruebas

```bash
npm run validate:data
npm run audit:data
npm run lint
npm run test
npm run build
npm run test:e2e
```

La validación comprueba schemas, estados, fuentes e integridad referencial. La auditoría genera
`src/data/data-audit.json`; revisa también su salida, porque un comando exitoso no sustituye la
decisión curatorial. Consulta [`docs/data-audit-2026.md`](./docs/data-audit-2026.md) y
[`docs/data-sources.md`](./docs/data-sources.md).

Playwright levanta `npm run preview` automáticamente y cubre Chromium desktop/móvil. Para ejecutar
en Docker con navegadores preinstalados:

```bash
docker run --rm -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.61.1-noble \
  sh -c "npm ci && npm run build && npm run test:e2e"
```

### Validación de enlaces y empresas con Playwright

Además de la validación de schema, hay dos herramientas de calidad de datos basadas en
**Playwright** (navegador real):

- `npm run validate:urls` — visita cada URL de los datos (sitios, fuentes, redes) y reporta
  enlaces rotos. Se ejecuta también en el workflow programado
  [`link-check.yml`](./.github/workflows/link-check.yml) (semanal, no bloquea el deploy).
  Opciones: `--strict` (falla si hay enlaces rotos), `--limit=N`, `--filter=texto`.
- `npm run verify:companies` — consulta el directorio público **einforma** por NIT/nombre para
  comprobar si cada empresa sigue vigente. Con `--write` actualiza `companies.json` (marca como
  verificadas las activas). einforma aplica _rate-limiting_ agresivo, por eso el script es
  secuencial y con pausas; es una herramienta de mantenimiento, no parte del build.

Con Docker (imagen oficial con navegadores preinstalados; usa la versión de Playwright del
`package-lock.json`):

```bash
# Verificar enlaces (muestra de 20)
docker run --rm -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.61.1-noble \
  sh -c "npm ci && node scripts/validate-urls.mjs --limit=20"

# Verificar empresas en einforma y actualizar datos
docker run --rm -v "$PWD":/app -w /app mcr.microsoft.com/playwright:v1.61.1-noble \
  sh -c "npm ci && node scripts/verify-companies.mjs --only=nit --write"
```

> Ajusta el tag `v1.61.1` al valor de `playwright` en tu `package-lock.json`.

---

## 9. Desplegar con Terraform

La infraestructura vive en [`infra/terraform`](./infra/terraform): bucket S3 **privado**, CloudFront
con **Origin Access Control**, política de bucket que solo permite lectura desde CloudFront,
cabeceras de seguridad y (opcional) dominio propio con ACM + Route53. Usa el **provider AWS ~> 6.0**
y **Terraform >= 1.10**.

**Estado remoto en S3 con bloqueo nativo (sin DynamoDB).** El estado se guarda en un bucket S3
dedicado y el _locking_ usa escrituras condicionales de S3 (`use_lockfile = true`), disponible desde
Terraform 1.10. El bucket de estado debe existir **antes** del primer `init` (bootstrap único):

```bash
# Bootstrap del backend (una sola vez por cuenta)
BUCKET=ticmanizales-tfstate-$(aws sts get-caller-identity --query Account --output text)
aws s3api create-bucket --bucket "$BUCKET" --region us-east-1
aws s3api put-bucket-versioning --bucket "$BUCKET" --versioning-configuration Status=Enabled
aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

Ajusta `bucket` en [`infra/terraform/backend.tf`](./infra/terraform/backend.tf) al nombre resultante.
Luego:

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars   # ajusta valores (dominio, hosted_zone_id, etc.)
terraform init
terraform plan
terraform apply
```

Al terminar obtendrás los outputs: `bucket_name`, `cloudfront_distribution_id`,
`cloudfront_domain_name` y `site_url`.

Primer despliegue del contenido (o deja que lo haga GitHub Actions):

```bash
npm run build
aws s3 sync dist "s3://$(terraform -chdir=infra/terraform output -raw bucket_name)" --delete
aws cloudfront create-invalidation \
  --distribution-id "$(terraform -chdir=infra/terraform output -raw cloudfront_distribution_id)" \
  --paths "/*"
```

> **Dominio propio (opcional):** pon `enable_custom_domain = true`, `domain_name` y `hosted_zone_id`
> en `terraform.tfvars`. Se creará el certificado ACM (en `us-east-1`) y los registros en Route53.

---

## 10. Configurar GitHub Actions con OIDC

El deploy usa **OIDC**: GitHub Actions asume un rol de IAM sin llaves de larga duración.

1. Crea el **OIDC provider** en tu cuenta AWS (una sola vez):
   `https://token.actions.githubusercontent.com`, audiencia `sts.amazonaws.com`.
2. Crea un **rol de IAM** con una _trust policy_ que confíe en ese provider y limite el
   `sub` a tu repositorio y rama, por ejemplo:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
           "StringLike": { "token.actions.githubusercontent.com:sub": "repo:<OWNER>/<REPO>:ref:refs/heads/main" }
         }
       }
     ]
   }
   ```

3. Otorga al rol permisos mínimos: `s3:ListBucket`, `s3:PutObject`, `s3:DeleteObject` sobre el bucket
   y `cloudfront:CreateInvalidation` sobre la distribución.
4. Guarda el ARN del rol como secreto `AWS_DEPLOY_ROLE_ARN` (ver abajo).

El workflow [`deploy.yml`](./.github/workflows/deploy.yml) ya declara `permissions: id-token: write`.

---

## 11. Secretos de GitHub necesarios

En **Settings → Secrets and variables → Actions** (o en el _environment_ `production`):

| Secreto                       | Descripción                                        |
| ----------------------------- | -------------------------------------------------- |
| `AWS_DEPLOY_ROLE_ARN`         | ARN del rol de IAM que asume GitHub Actions (OIDC).|
| `S3_BUCKET_NAME`              | Nombre del bucket (output `bucket_name`).          |
| `CLOUDFRONT_DISTRIBUTION_ID`  | ID de la distribución (output `cloudfront_distribution_id`). |

---

## Costos

- El MVP opera con **solo S3 + CloudFront**. Sin Lambda, API Gateway, DynamoDB ni Cognito.
- **Cache agresivo** para assets con hash (`max-age=31536000, immutable`) y HTML sin cache.
- **Logs de CloudFront apagados** por defecto (`enable_access_logs = false`) para reducir costos.
- `PriceClass_100` (regiones más económicas) por defecto.
- Costo operativo cercano a cero para tráfico bajo; escala con el uso.

No existe un monto garantizado: transferencia de CloudFront, almacenamiento, invalidaciones,
Route53 y ACM dependen de cuenta, región y tráfico. Revisa AWS Pricing Calculator antes de habilitar
logs o ampliar `price_class`.

## Solución de problemas

- **`@rollup/rollup-linux-*` no encontrado:** no reutilices `node_modules` instalado en Alpine dentro
  de Ubuntu; ejecuta `npm ci` en la misma imagen que correrá build/tests.
- **Playwright no encuentra Chromium:** ejecuta `npx playwright install --with-deps chromium` o usa
  la imagen oficial con la misma versión del `package-lock.json`.
- **Terraform intenta usar backend remoto durante validación:** usa
  `terraform init -backend=false` para revisión local.
- **El build falla por datos:** ejecuta primero `npm run validate:data`; no desactives el schema ni
  cambies un estado sin fuente.

---

## Fase 2 (futuro)

Preparado para crecer **sin rehacer** el modelo:

- Visualización tipo **red/grafo** del ecosistema (los datos ya modelan relaciones).
- Formulario “Sugerir…” que cree un **GitHub Issue** desde el sitio (las plantillas ya existen).
- Migración opcional a **DynamoDB / OpenSearch** si el volumen lo justifica.
- Analytics respetuoso de la privacidad.
- Automatización de verificación de enlaces y frescura de datos.

Nada de esto es necesario para el MVP y **no se incluye todavía** para mantener el costo bajo.

---

## Licencia

Este proyecto usa **licenciamiento por material**:

- **Código** (componentes Astro, scripts, infraestructura Terraform): **MIT** — ver
  [`LICENSE`](./LICENSE).
- **Datos propios y contenido** (personas, comunidades, programas, universidades, textos y
  documentación): **CC BY-SA 4.0** — ver [`LICENSE-DATA`](./LICENSE-DATA).
- **Empresas** (`src/data/companies.json`, derivado de la Cámara de Comercio de Manizales por
  Caldas): **términos de la fuente — atribución + uso no comercial** (equivalente a CC BY-NC-SA
  4.0). Ver [`docs/data-sources.md`](./docs/data-sources.md).
- **Legado 2020** (`legacy/`): **CC0 1.0** (dominio público), como en el repositorio original.

Al reutilizar, cita al **Observatorio TIC de Manizales y Caldas** y las fuentes de cada registro.
