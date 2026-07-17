# Guía para contribuir

¡Gracias por ayudar a construir el mapa del ecosistema TIC de Manizales y Caldas! 🎉

Este es un proyecto **comunitario**. Los datos viven versionados en el repositorio y se actualizan
mediante **Pull Requests** revisables. El repositorio es la **fuente de verdad**.

## Formas de contribuir

1. **Pull Request (recomendado):** edita el archivo JSON correspondiente en `src/data/` y abre un PR.
2. **Issue (sugerencia):** si prefieres no usar Git, abre un
   [Issue con plantilla](https://github.com/edisoncast/EmpresasTIManizales/issues/new/choose) y
   alguien de la comunidad lo convertirá en un PR.

## Principios de calidad (obligatorios)

- **No inventes datos.** Si falta información, deja el campo vacío o marca `needsVerification: true`.
- **Fuente o verificación:** cada registro importante debe tener un `sourceUrl` público **o** quedar
  con `needsVerification: true`.
- **Estado coherente:** `verified` exige fuente y `needsVerification: false`. Usa
  `partially_verified`, `unknown` o `inactive_or_unverified` junto con
  `needsVerification: true` cuando falte evidencia o vigencia.
- **Trazabilidad:** agrega `lastVerifiedAt` al confirmar una ficha y usa `notes` para cambios de
  nombre, adquisiciones, liquidaciones o decisiones de auditoría.
- **Slugs** en `kebab-case`, únicos y estables (definen la URL de detalle).
- **Sin datos sensibles:** nunca incluyas teléfonos, correos privados ni direcciones personales.
- **Personas:** solo perfiles públicos (`isPublicProfile: true`), con enfoque en aportes al
  ecosistema y **sin lenguaje competitivo** (“top”, “el mejor”). Esta sección es de reconocimiento y
  descubrimiento, no un ranking.
- **URLs** válidas (con `https://`).

## Flujo de trabajo

```bash
# 1. Fork + clone
git clone https://github.com/<tu-usuario>/EmpresasTIManizales.git
cd EmpresasTIManizales

# 2. Instala y levanta
npm ci
npm run dev

# 3. Edita el JSON en src/data/ correspondiente

# 4. Valida y compila
npm run validate:data
npm run audit:data
npm run lint
npm run test
npm run build
npm run test:e2e

# 5. Formatea, commitea y abre el PR
npm run format
git checkout -b agrega-mi-registro
git commit -am "Agrega <registro>"
git push origin agrega-mi-registro
```

Luego abre el Pull Request usando la plantilla. CI ejecutará automáticamente la validación de datos,
lint, tests y build; **si los datos no cumplen el schema, el PR fallará**.

## Dónde va cada cosa

| Tipo         | Archivo                        | Schema                                 |
| ------------ | ------------------------------ | -------------------------------------- |
| Empresa      | `src/data/companies.json`      | `src/schemas/company.schema.ts`        |
| Universidad  | `src/data/universities.json`   | `src/schemas/university.schema.ts`     |
| Programa     | `src/data/programs.json`       | `src/schemas/program.schema.ts`        |
| Persona      | `src/data/people.json`         | `src/schemas/person.schema.ts`         |
| Comunidad    | `src/data/communities.json`    | `src/schemas/community.schema.ts`      |
| Evento       | `src/data/events.json`         | `src/schemas/event.schema.ts`          |
| Entidad apoyo| `src/data/supportEntities.json`| `src/schemas/support-entity.schema.ts` |

Consulta el [README](./README.md#cómo-agregar-registros) para ejemplos completos de cada tipo.

## Relaciones entre datos

- Un **programa** se enlaza a su universidad con `institutionSlug` (o la universidad lo lista en
  `programs`).
- Una **comunidad** se enlaza a su persona organizadora con `organizerSlug`.
- Un **evento** se enlaza a su comunidad con `organizerCommunitySlug`.

El validador comprueba que estas relaciones apunten a slugs existentes.

## Datos heredados de 2020

El contenido de `legacy/` es histórico y no se edita para aparentar vigencia. Para revalidar una
ficha:

1. localiza una fuente pública actual y específica;
2. conserva el nombre anterior, adquisición o cierre en `notes` cuando aplique;
3. actualiza `lastVerifiedAt` con una fecha ISO real;
4. selecciona el estado según [`docs/data-sources.md`](./docs/data-sources.md);
5. no elimines un registro posiblemente inactivo: usa `inactive_or_unverified` o `archived` con
   evidencia;
6. ejecuta validación, auditoría, tests y build antes del PR.

Consulta la línea base y los pendientes en
[`docs/data-audit-2026.md`](./docs/data-audit-2026.md).

## Código de conducta

Sé respetuoso/a. Este espacio busca **sumar** al ecosistema. Las contribuciones que incluyan datos
privados, difamación o lenguaje competitivo hacia personas serán rechazadas.

## Licencia de las contribuciones

Al contribuir aceptas que tu aporte se publique bajo **CC BY-SA 4.0**.
