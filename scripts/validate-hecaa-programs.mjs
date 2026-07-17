/**
 * Contrasta los programas con código SNIES contra la consulta pública HECAA.
 *
 * La consulta usa una sesión JSF; por eso se procesa un programa a la vez y
 * este script no modifica los datos. Es una ayuda de curaduría, no parte del
 * build ni debe ejecutarse en CI.
 *
 * Uso:
 *   node scripts/validate-hecaa-programs.mjs
 *   node scripts/validate-hecaa-programs.mjs --code=118930
 *   node scripts/validate-hecaa-programs.mjs --search-institution=SENA
 *   node scripts/validate-hecaa-programs.mjs --audit-sena-caldas
 *   node scripts/validate-hecaa-programs.mjs --limit=10
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const programsFile = join(__dirname, '..', 'src', 'data', 'programs.json');
const base = 'https://hecaa.mineducacion.gov.co/consultaspublicas';
const senaIesCode = '9110';
const sharedSniesInstitutions = {
  // Doctorado interinstitucional de la Red Universitaria Mutis. HECAA puede
  // mostrar cualquiera de las instituciones participantes como sede consultada.
  105180: [
    'Universidad Autónoma de Manizales',
    'Universidad Autónoma de Bucaramanga',
    'Universidad Autónoma de Occidente',
  ],
};
const args = process.argv.slice(2);
const requestedCode = args.find((arg) => arg.startsWith('--code='))?.split('=')[1];
const lookupCode = args.find((arg) => arg.startsWith('--lookup='))?.split('=')[1];
const requestedName = args.find((arg) => arg.startsWith('--search='))?.split('=')[1];
const requestedInstitution = args
  .find((arg) => arg.startsWith('--search-institution='))
  ?.split('=')[1];
const auditSenaCaldas = args.includes('--audit-sena-caldas');
const limit = Number(args.find((arg) => arg.startsWith('--limit='))?.split('=')[1]);
const programs = JSON.parse(readFileSync(programsFile, 'utf8'));
const targets = programs
  .filter((program) => program.sniesCode && (!requestedCode || program.sniesCode === requestedCode))
  .slice(0, Number.isFinite(limit) ? limit : undefined);

function request(path, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const requestBody = body ? Buffer.from(body) : undefined;
    const url = path.startsWith('http') ? path : `${base}${path}`;
    const request = https.request(
      url,
      {
        method,
        headers: {
          'user-agent': 'EmpresasTIManizales data verification/1.0',
          ...(requestBody
            ? {
                'content-length': requestBody.length,
                'content-type': 'application/x-www-form-urlencoded',
              }
            : {}),
          ...headers,
        },
      },
      (response) => {
        let content = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => (content += chunk));
        response.on('end', () =>
          resolve({
            body: content,
            headers: response.headers,
            statusCode: response.statusCode,
          }),
        );
      },
    );
    request.on('error', reject);
    if (requestBody) request.write(requestBody);
    request.end();
  });
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

function field(html, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(
    new RegExp(`<th[^>]*>\\s*${escaped}[\\s\\S]*?<\\/th>\\s*<td[^>]*>([\\s\\S]*?)<\\/td>`, 'i'),
  );
  return match ? decodeHtml(match[1]) : null;
}

function normalized(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function programNameMatches(expected, actual) {
  const expectedCore = expected
    .split('—')[0]
    .replace(/\s*\([^)]*\)\s*/g, ' ')
    .trim();
  if (normalized(expectedCore) === normalized(actual)) return true;

  const stopWords = new Set(['de', 'del', 'en', 'para', 'por', 'y', 'la', 'el']);
  const expectedTerms = new Set(
    normalized(expectedCore)
      .split(' ')
      .filter((term) => !stopWords.has(term)),
  );
  const actualTerms = new Set(
    normalized(actual)
      .split(' ')
      .filter((term) => !stopWords.has(term)),
  );
  const intersection = [...expectedTerms].filter((term) => actualTerms.has(term)).length;
  return intersection / Math.max(expectedTerms.size, actualTerms.size) >= 0.72;
}

function institutionMatches(expected, actual, sniesCode) {
  const expectedNormalized = normalized(expected);
  const actualNormalized = normalized(actual);
  if (expectedNormalized === actualNormalized) return true;
  if (
    sharedSniesInstitutions[sniesCode]?.some((institution) =>
      actualNormalized.startsWith(normalized(institution)),
    )
  ) {
    return true;
  }
  if (expectedNormalized.includes('universidad nacional de colombia')) {
    return actualNormalized.includes('universidad nacional de colombia');
  }
  if (expectedNormalized.startsWith(actualNormalized)) return true;
  if (expectedNormalized.includes('sena') && actualNormalized.includes('sena')) return true;
  return false;
}

function modalityMatches(expected, actual) {
  if (expected === 'unknown' || !actual) return true;
  const actualNormalized = normalized(actual);
  if (expected === 'remote') return /virtual|distancia/.test(actualNormalized);
  if (expected === 'onsite') return actualNormalized === 'presencial';
  return expected === actualNormalized;
}

async function queryProgram(code) {
  const initial = await request('/programas');
  const cookies = (initial.headers['set-cookie'] ?? [])
    .map((cookie) => cookie.split(';', 1)[0])
    .join('; ');
  const viewState = initial.body.match(/name="javax\.faces\.ViewState"[^>]*value="([^"]+)"/)?.[1];
  if (!viewState) throw new Error('HECAA no devolvió el estado de sesión JSF.');

  const searchFields = new URLSearchParams({
    formFiltro: 'formFiltro',
    'formFiltro:codigoPrograma': code,
    'formFiltro:j_idt46': 'formFiltro:j_idt46',
    'javax.faces.ViewState': viewState,
  });
  const searched = await request('/programas', {
    method: 'POST',
    headers: { cookie: cookies, referer: `${base}/programas` },
    body: searchFields.toString(),
  });
  const resultForm = searched.body.match(
    /<form id="(j_idt\d+:\d+:j_idt\d+)"[\s\S]*?<a id="(j_idt\d+:\d+:j_idt\d+:j_idt\d+)"[\s\S]*?<\/a>(\d+)<input[^>]+name="javax\.faces\.ViewState"[^>]+value="([^"]+)"/,
  );
  if (!resultForm || resultForm[3] !== code) return null;

  const [, formId, linkId, , detailViewState] = resultForm;
  const detailFields = new URLSearchParams({
    [formId]: formId,
    [linkId]: linkId,
    'javax.faces.ViewState': detailViewState,
  });
  const selected = await request('/programas', {
    method: 'POST',
    headers: { cookie: cookies, referer: `${base}/programas` },
    body: detailFields.toString(),
  });
  const location = selected.headers.location?.replace(/^http:/, 'https:');
  if (selected.statusCode !== 302 || !location) {
    throw new Error('HECAA no redirigió a la ficha del programa.');
  }
  const detail = await request(location, {
    headers: { cookie: cookies, referer: `${base}/programas` },
  });
  if (detail.statusCode !== 200)
    throw new Error(`Detalle HECAA respondió HTTP ${detail.statusCode}.`);

  const offers = [
    ...(
      detail.body.match(/Oferta del programa[\s\S]*?<tbody>([\s\S]*?)<\/tbody>/)?.[1] ?? ''
    ).matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g),
  ].map((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) =>
      decodeHtml(cell[1]),
    );
    return {
      modality: cells[0],
      coverage: cells[1],
      department: cells[2],
      municipality: cells[3],
      sniesCode: cells[6],
      status: cells[8],
    };
  });

  return {
    name: field(detail.body, 'Nombre del programa'),
    institution: field(detail.body, 'Nombre Institución'),
    status: field(detail.body, 'Estado del programa'),
    modality: field(detail.body, 'Modalidad'),
    credits: field(detail.body, 'Número de créditos'),
    duration: field(detail.body, '¿Cuánto dura el programa?'),
    offers,
  };
}

async function searchProgramsByField(fieldName, value, additionalFields = {}) {
  const initial = await request('/programas');
  const cookies = (initial.headers['set-cookie'] ?? [])
    .map((cookie) => cookie.split(';', 1)[0])
    .join('; ');
  const viewState = initial.body.match(/name="javax\.faces\.ViewState"[^>]*value="([^"]+)"/)?.[1];
  if (!viewState) throw new Error('HECAA no devolvió el estado de sesión JSF.');

  const fields = new URLSearchParams({
    formFiltro: 'formFiltro',
    [fieldName]: value,
    ...additionalFields,
    'formFiltro:j_idt46': 'formFiltro:j_idt46',
    'javax.faces.ViewState': viewState,
  });
  const searched = await request('/programas', {
    method: 'POST',
    headers: { cookie: cookies, referer: `${base}/programas` },
    body: fields.toString(),
  });
  const table =
    searched.body.match(/<table id="programasTab"[\s\S]*?<tbody[^>]*>([\s\S]*?)<\/tbody>/)?.[1] ??
    '';
  const totalText = searched.body.match(/Total de registros:\s*<b[^>]*>\s*([\d.]+)/i)?.[1];
  const total = totalText ? Number(totalText.replaceAll('.', '')) : null;
  const results = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].flatMap((row) => {
    const code = row[1].match(/<\/a>\s*(\d+)\s*<input/)?.[1];
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((cell) =>
      decodeHtml(cell[1]),
    );
    return code
      ? [{ code, institution: cells[0], name: cells[5], status: cells[6], modality: cells[8] }]
      : [];
  });
  return { results, total };
}

function isLocalSenaOffer(offer, code) {
  return (
    offer.sniesCode === code &&
    offer.status === 'Activo' &&
    normalized(offer.department) === 'caldas' &&
    normalized(offer.municipality) === 'manizales'
  );
}

function isEcosystemRelevant(name) {
  return /software|sistemas?|inform[aá]tica|datos?|tic|tecnolog[ií]a de la informaci[oó]n|programaci[oó]n|desarrollo|bases? de datos|redes?|seguridad|ciber|nube|cloud|videojuegos|multimedia|automatizaci[oó]n|mecatr[oó]nica|electr[oó]nic|telecomunicaciones?|instrumentaci[oó]n|control de procesos/i.test(
    name,
  );
}

async function auditSenaCaldasPrograms() {
  const directoryPrograms = programs.filter((program) => program.institutionSlug === 'sena-caldas');
  const directoryByCode = new Map(
    directoryPrograms
      .filter((program) => program.sniesCode)
      .map((program) => [program.sniesCode, program]),
  );
  const inventory = await searchProgramsByField('formFiltro:codigoIes', senaIesCode, {
    'formFiltro:j_idt88_input': '17',
  });
  const activeEntries = inventory.results
    .filter((entry) => entry.status === 'Activo')
    .filter(
      (entry, index, collection) =>
        collection.findIndex((item) => item.code === entry.code) === index,
    );
  const entries = activeEntries.slice(0, Number.isFinite(limit) ? limit : undefined);

  const localOffers = [];
  const errors = [];
  for (const [index, entry] of entries.entries()) {
    try {
      const record = await queryProgram(entry.code);
      const offers = record?.offers.filter((offer) => isLocalSenaOffer(offer, entry.code)) ?? [];
      if (record?.status === 'Activo' && offers.length > 0) {
        localOffers.push({
          code: entry.code,
          name: record.name,
          modality: record.modality,
          credits: record.credits,
          duration: record.duration,
          offers,
          presentInDirectory: directoryByCode.has(entry.code),
          ecosystemRelevant: isEcosystemRelevant(record.name ?? ''),
        });
      }
    } catch (error) {
      errors.push({ code: entry.code, message: error.message });
    }

    if ((index + 1) % 20 === 0 || index + 1 === entries.length) {
      console.error(`HECAA: ${index + 1}/${entries.length} fichas SENA revisadas.`);
    }
  }

  const localOfferByCode = new Map(localOffers.map((program) => [program.code, program]));
  const directorySniesWithoutCurrentLocalOffer = [];
  for (const program of directoryByCode.values()) {
    try {
      const record = await queryProgram(program.sniesCode);
      const offers =
        record?.offers.filter((offer) => isLocalSenaOffer(offer, program.sniesCode)) ?? [];
      if (record?.status === 'Activo' && offers.length > 0) {
        localOfferByCode.set(program.sniesCode, {
          code: program.sniesCode,
          name: record.name,
          modality: record.modality,
          credits: record.credits,
          duration: record.duration,
          offers,
          presentInDirectory: true,
          ecosystemRelevant: isEcosystemRelevant(record.name ?? ''),
        });
      } else {
        directorySniesWithoutCurrentLocalOffer.push({
          code: program.sniesCode,
          name: program.name,
          verificationStatus: program.verificationStatus,
        });
      }
    } catch (error) {
      errors.push({ code: program.sniesCode, message: error.message });
    }
  }

  const allLocalOffers = [...localOfferByCode.values()];
  const report = {
    generatedAt: new Date().toISOString(),
    source: `${base}/programas`,
    scope: `IES SENA ${senaIesCode}, filtro Departamento Caldas; ofertas activas en Manizales según HECAA`,
    reportedSenaPrograms: inventory.total,
    parsedSenaPrograms: inventory.results.length,
    parsedActiveSenaPrograms: activeEntries.length,
    searchedActiveSenaPrograms: entries.length,
    inventoryMayBeIncomplete:
      inventory.total !== null && inventory.results.length < inventory.total,
    localSenaOffersFoundInInventory: localOffers.length,
    localSenaOffersIncludingDirectDirectoryChecks: allLocalOffers.length,
    matchingDirectory: allLocalOffers.filter((program) => program.presentInDirectory),
    missingRelevantCandidates: localOffers.filter(
      (program) => program.ecosystemRelevant && !program.presentInDirectory,
    ),
    localOffersOutsideCurrentScope: localOffers.filter(
      (program) => !program.ecosystemRelevant && !program.presentInDirectory,
    ),
    directorySniesWithoutCurrentLocalOffer,
    directoryProgramsWithoutSnies: directoryPrograms
      .filter((program) => !program.sniesCode)
      .map((program) => ({ name: program.name, slug: program.slug })),
    errors,
  };

  console.log(JSON.stringify(report, null, 2));
  if (errors.length > 0) process.exitCode = 1;
}

if (lookupCode) {
  console.log(JSON.stringify(await queryProgram(lookupCode), null, 2));
} else if (requestedName) {
  const result = await searchProgramsByField('formFiltro:j_idt51', requestedName);
  console.log(JSON.stringify(result, null, 2));
} else if (requestedInstitution) {
  const result = await searchProgramsByField('formFiltro:j_idt25', requestedInstitution);
  console.log(JSON.stringify(result, null, 2));
} else if (auditSenaCaldas) {
  await auditSenaCaldasPrograms();
} else if (targets.length === 0) {
  console.error('No se encontraron programas para los filtros solicitados.');
  process.exitCode = 1;
} else {
  console.log(
    `Verificando ${targets.length} programa(s) con HECAA; el script no modifica archivos.\n`,
  );
  const results = [];

  for (const [index, program] of targets.entries()) {
    try {
      const record = await queryProgram(program.sniesCode);
      if (!record) {
        results.push({ program, status: 'NOT_FOUND' });
        console.log(
          `[${index + 1}/${targets.length}] NOT_FOUND ${program.sniesCode} ${program.name}`,
        );
        continue;
      }

      const mismatches = [];
      if (!programNameMatches(program.name, record.name)) mismatches.push('nombre');
      if (!institutionMatches(program.institutionName, record.institution, program.sniesCode))
        mismatches.push('institución');
      if (!modalityMatches(program.modality, record.modality)) mismatches.push('modalidad');
      const confirmedInactive =
        record.status === 'Inactivo' && program.verificationStatus === 'inactive_or_unverified';
      if (record.status !== 'Activo' && !confirmedInactive) {
        mismatches.push(`estado:${record.status ?? 'sin dato'}`);
      }
      const status = mismatches.length ? 'REVIEW' : confirmedInactive ? 'MATCH_INACTIVE' : 'MATCH';
      results.push({ program, record, status, mismatches });
      console.log(
        `[${index + 1}/${targets.length}] ${mismatches.length ? `REVIEW (${mismatches.join(', ')})` : status} ${program.sniesCode} ${program.name}`,
      );
    } catch (error) {
      results.push({ program, status: 'ERROR', error: error.message });
      console.log(
        `[${index + 1}/${targets.length}] ERROR ${program.sniesCode} ${program.name}: ${error.message}`,
      );
    }
  }

  const summary = results.reduce(
    (totals, result) => ({ ...totals, [result.status]: (totals[result.status] ?? 0) + 1 }),
    {},
  );
  console.log(`\nResumen: ${JSON.stringify(summary)}`);
  for (const result of results.filter(
    (item) => item.status === 'REVIEW' || item.status === 'NOT_FOUND' || item.status === 'ERROR',
  )) {
    console.log(
      JSON.stringify({
        code: result.program.sniesCode,
        expected: {
          name: result.program.name,
          institution: result.program.institutionName,
          modality: result.program.modality,
        },
        hecaa: result.record,
        status: result.status,
        mismatches: result.mismatches,
        error: result.error,
      }),
    );
  }
}
