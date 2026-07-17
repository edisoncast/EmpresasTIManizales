/** Configuración global del sitio. Cambia estos valores según tu despliegue. */
export const site = {
  name: 'Ecosistema TIC Manizales & Caldas',
  shortName: 'Ecosistema TIC',
  description:
    'Mapa abierto del ecosistema TIC de Manizales y Caldas: empresas de base tecnológica, universidades, programas, personas, comunidades y eventos. Datos versionados y abiertos a contribuciones vía Pull Request.',
  locale: 'es-CO',
  lang: 'es',
  // Repositorio fuente de verdad. Actualízalo si haces fork.
  repoUrl: 'https://github.com/edisoncast/EmpresasTIManizales',
  get issuesUrl() {
    return `${this.repoUrl}/issues/new/choose`;
  },
  get newPrUrl() {
    return `${this.repoUrl}/compare`;
  },
  author: 'Comunidad TIC de Manizales y Caldas',
  // Contexto histórico del proyecto.
  startedYear: 2020,
  currentYear: 2026,
  // Fecha de corte de la revalidación comunitaria (auditoría 2026).
  auditDate: '2026-07-16',
  coordinates: '5.07° N, 75.52° O',
  // Fuentes institucionales citadas (condición de uso de sus datos).
  sources: {
    ccmpc: {
      name: 'Cámara de Comercio de Manizales por Caldas',
      url: 'https://ccmpc.org.co/basededatos/',
    },
    snies: {
      name: 'SNIES / HECAA — Ministerio de Educación',
      url: 'https://hecaa.mineducacion.gov.co/consultaspublicas/programas',
    },
  },
} as const;

export const nav = [
  { href: '/empresas', label: 'Empresas' },
  { href: '/universidades', label: 'Universidades' },
  { href: '/programas', label: 'Programas' },
  { href: '/personas', label: 'Personas' },
  { href: '/comunidades', label: 'Comunidades' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/ecosistema', label: 'Ecosistema' },
  { href: '/contribuir', label: 'Contribuir' },
] as const;
