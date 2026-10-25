/** @type {import('tailwindcss').Config} */
// Tokens derivados de docs/design-direction.md — hoja de registro pública:
// niebla fría, grafito, tinta azul y resaltador amarillo. Todo contenedor es recto.
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
    // Radios reemplazan la escala por defecto: fichas y casillas rectas; 4px en botones, campos, tags y sellos.
    borderRadius: {
      none: '0',
      control: '4px',
      sm: '4px',
      DEFAULT: '4px',
      md: '4px',
      full: '9999px',
    },
    // Las fichas no llevan sombra; solo menús y paneles flotantes.
    boxShadow: {
      none: 'none',
      overlay: '0 6px 20px rgb(22 29 36 / 0.16)',
    },
    extend: {
      colors: {
        // Fuente de verdad en :root de global.css. Sin modificadores de opacidad.
        fog: 'var(--color-fog)',
        sheet: {
          DEFAULT: 'var(--color-sheet)',
          alt: 'var(--color-sheet-alt)',
        },
        rule: {
          DEFAULT: 'var(--color-rule)',
          strong: 'var(--color-rule-strong)',
        },
        graphite: {
          DEFAULT: 'var(--color-graphite)',
          2: 'var(--color-graphite-2)',
        },
        'ink-blue': {
          DEFAULT: 'var(--color-ink-blue)',
          hover: 'var(--color-ink-blue-hover)',
          soft: 'var(--color-ink-blue-soft)',
        },
        'on-ink-blue': 'var(--color-on-ink-blue)',
        highlight: {
          DEFAULT: 'var(--color-highlight)',
          soft: 'var(--color-highlight-soft)',
        },
        'on-highlight': 'var(--color-on-highlight)',
        rust: {
          DEFAULT: 'var(--color-rust)',
          soft: 'var(--color-rust-soft)',
        },
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'Archivo', '"Arial Narrow"', 'Arial', 'sans-serif'],
        sans: [
          '"Atkinson Hyperlegible Next Variable"',
          '"Atkinson Hyperlegible Next"',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"Atkinson Hyperlegible Mono Variable"',
          '"Atkinson Hyperlegible Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      fontSize: {
        // Escala del sistema (12–56 px). h1/display con clamp para fluidez.
        xs: ['0.75rem', { lineHeight: '1.3' }],
        sm: ['0.875rem', { lineHeight: '1.45' }],
        base: ['1rem', { lineHeight: '1.55' }],
        md: ['1.0625rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.2' }],
        xl: ['1.75rem', { lineHeight: '1.15' }],
        '2xl': ['2.25rem', { lineHeight: '1.1' }],
        '3xl': ['clamp(2rem, 1.5rem + 2.2vw, 2.5rem)', { lineHeight: '1.05' }],
        display: ['clamp(2.5rem, 1.6rem + 3.6vw, 3.5rem)', { lineHeight: '1' }],
      },
      letterSpacing: {
        field: '0.05em',
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
