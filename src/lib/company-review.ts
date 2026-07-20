/**
 * Resultado de la curaduría pública 2020–2026.
 *
 * La base mercantil confirma una inscripción y una actividad declarada, pero no
 * basta para presentar una organización como vigente. Este módulo aplica la
 * decisión editorial al directorio sin borrar el registro de origen: los casos
 * sin evidencia pública adicional se muestran como pendientes de verificación.
 */
export interface CompanyReviewable {
  slug: string;
  registeredAt?: string;
  legalForm?: string;
  name: string;
  verificationStatus?:
    'verified' | 'partially_verified' | 'unknown' | 'inactive_or_unverified' | 'archived';
  needsVerification: boolean;
  notes?: string;
}

const includedSlugs = new Set([
  'am-soft',
  'meeteam',
  'calima-technologies-colombia',
  'porter-data',
  'fazzil',
  'appis-group',
  'odoo-xpert',
  'kivio',
  'dateando',
  'nat-io',
  'maquinando-controls',
  'notarias-web',
  'santisite',
  'formativa-technologies',
  'latinia',
  'startti',
  'megapagos-co',
  'desarrollando-ando',
  'colombia-tech-festival',
  'datalab-tech-systems-sociedad-por-acciones-simplificada',
  'iaconexiones',
  'chatforse',
  'zeissen-software',
  'adminsoft',
  'ardor-learning-colombia',
  'atrion-systems',
  'box-360',
  'envirox-ecotech',
  'estratec-360',
  'estructura-tech-company',
  'mia-tech-cloud',
  'bibisoft',
  'bit-technologies-colombia',
  'geek-bunker-solutions',
  'pixel-house-technologies',
  'softory',
  'appsernet',
  'barco-vision-producciones',
  'it-forensic-company',
  'scribette',
  'nativo-digital-lab',
  'onepay',
  'openmarkt',
]);

/** Casos con evidencia explícita para no aparecer en el directorio público. */
export const excludedCompanySlugs = new Set([
  'advancit', // Canales corporativos sitúan la operación en Bogotá/Bucaramanga, no Caldas.
  'tecnnia', // La actividad mercantil descrita es comercialización/extracción de metales.
  'gabotech', // Comercio electrónico de productos; no se confirmó oferta tecnológica propia.
  'aramo-legal-consulting', // Oferta jurídica, no tecnológica, como actividad sustantiva.
  'magos-de-la-ciencia', // Comunicación y apropiación de ciencia, sin capacidad tecnológica comprobada.
  'brandtiva-2', // Agencia de branding y comunicación sin desarrollo tecnológico confirmado.
  'peludines-pet-shop', // Comercio de productos para mascotas.
  'mago-agencia-digital', // Agencia de contenido y redes, sin oferta tecnológica sustantiva confirmada.
  'click-and-blue-agencia-de-ecommerce-y-marketing-digital', // Publicidad y marketing sin producto tecnológico confirmado.
]);

const isReviewPeriod = (company: CompanyReviewable) => {
  const year = Number(company.registeredAt?.slice(0, 4));
  return year >= 2020 && year <= 2026;
};

const isLiquidation = (company: CompanyReviewable) => /\ben liquidaci[oó]n\b/i.test(company.name);

export function applyCompanyReview<T extends CompanyReviewable>(company: T): T {
  if (
    !isReviewPeriod(company) ||
    company.legalForm === 'Persona natural' ||
    isLiquidation(company) ||
    company.verificationStatus === 'inactive_or_unverified' ||
    includedSlugs.has(company.slug) ||
    excludedCompanySlugs.has(company.slug)
  ) {
    return company;
  }

  const reviewNote =
    'Revisión 2020–2026: la matrícula y la actividad declarada están registradas, pero falta una fuente corporativa o empresarial adicional que confirme operación actual, oferta y canales oficiales.';

  return {
    ...company,
    verificationStatus: 'partially_verified',
    needsVerification: true,
    notes: company.notes ? `${company.notes} ${reviewNote}` : reviewNote,
  };
}

export const isExcludedFromPublicDirectory = (
  company: Pick<CompanyReviewable, 'slug' | 'legalForm'>,
) => company.legalForm === 'Persona natural' || excludedCompanySlugs.has(company.slug);
