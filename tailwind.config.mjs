/** @type {import('tailwindcss').Config} */
// Tokens derivados de docs/design-direction.md — observatorio editorial,
// paleta mineral/vegetal (papel cálido + verde bosque), sobriedad y confianza.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    // Breakpoints del documento (por contenido, no por dispositivo).
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        // --- Tokens semánticos (fuente de verdad en :root de global.css) ---
        paper: 'var(--color-background)',
        surface: 'var(--color-surface)',
        mist: 'var(--color-surface-muted)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          ink: 'var(--color-accent-ink)',
        },
        coffee: 'var(--color-coffee)',
        // Estados de verificación (pares fg/bg sobrios).
        verified: { DEFAULT: '#256B4A', bg: '#DDEDE4' },
        partial: { DEFAULT: '#8A6418', bg: '#F4EBCF' },
        pending: { DEFAULT: '#765B38', bg: '#EFE6D8' },
        inactive: { DEFAULT: '#8B4A3F', bg: '#F3E1DD' },
        archived: { DEFAULT: '#66706B', bg: '#E5E9E6' },

        // --- Escala neutra mineral (alias `ink`) ---
        ink: {
          50: '#F5F3ED', // papel cálido (fondo)
          100: '#E8ECE7', // superficie tenue / bandas
          200: '#C8CFC9', // bordes y divisores
          300: '#AAB4AC',
          400: '#8A968D',
          500: '#526059', // texto secundario
          600: '#46534B',
          700: '#38423B',
          800: '#262F29',
          900: '#17211C', // texto primario
          950: '#0F1613',
        },
        // --- Escala de acento verde (alias `brand`) ---
        brand: {
          50: '#DCEAE3', // accent-soft
          100: '#C9E0D5',
          200: '#A9CFBE',
          300: '#7BB49E',
          400: '#4A8F77',
          500: '#2A6F57',
          600: '#1F5C4A', // acento
          700: '#174638', // acento-ink
          800: '#123A2E',
          900: '#0E2C24',
          950: '#081813',
        },
      },
      fontFamily: {
        display: ['"Newsreader Variable"', 'Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: [
          '"Public Sans Variable"',
          'Public Sans',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Escala editorial (docs). h1/display con clamp para fluidez.
        xs: ['0.75rem', { lineHeight: '1.4' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.55' }],
        md: ['1.0625rem', { lineHeight: '1.65' }],
        lg: ['1.3125rem', { lineHeight: '1.3' }],
        xl: ['1.75rem', { lineHeight: '1.2' }],
        '2xl': ['2.25rem', { lineHeight: '1.1' }],
        '3xl': ['clamp(2.25rem, 1.6rem + 2.8vw, 3rem)', { lineHeight: '1.08' }],
        display: ['clamp(2.5rem, 1.4rem + 4.6vw, 4rem)', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        kicker: '0.08em',
      },
      borderRadius: {
        none: '0',
        sm: '3px',
        DEFAULT: '6px',
        md: '6px',
        lg: '10px',
        xl: '10px',
        '2xl': '10px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        subtle: '0 1px 2px rgb(23 33 28 / 0.06)',
        sm: '0 1px 2px rgb(23 33 28 / 0.06)',
        DEFAULT: '0 1px 2px rgb(23 33 28 / 0.06)',
        md: '0 1px 2px rgb(23 33 28 / 0.06)',
        overlay: '0 8px 24px rgb(23 33 28 / 0.12)',
        lg: '0 8px 24px rgb(23 33 28 / 0.12)',
        xl: '0 8px 24px rgb(23 33 28 / 0.12)',
      },
      maxWidth: {
        content: '1280px',
        reading: '720px',
        detail: '1080px',
      },
      transitionDuration: {
        fast: '120ms',
        DEFAULT: '180ms',
        base: '180ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
