/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,md,mdx}"
  ],

  safelist: ['hidden'], // Ensures the "hidden" class is always included

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f3e8ff',
          300: '#e9d5ff',
          400: '#d8b4fe',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.700'),
            maxWidth: 'none',
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            strong: { 
              color: theme('colors.neutral.900'),
              fontWeight: '600'
            },
            h1: { 
              color: theme('colors.neutral.900'),
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '2.5rem'
            },
            h2: { 
              color: theme('colors.neutral.900'),
              fontWeight: '600',
              fontSize: '1.875rem',
              lineHeight: '2.25rem'
            },
            h3: { 
              color: theme('colors.neutral.800'),
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '2rem'
            },
            h4: {
              color: theme('colors.neutral.800'),
              fontWeight: '600'
            },
            code: { 
              color: theme('colors.primary.600'),
              backgroundColor: theme('colors.neutral.100'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem'
            },
            blockquote: {
              color: theme('colors.neutral.600'),
              borderLeftColor: theme('colors.primary.500'),
              backgroundColor: theme('colors.neutral.50'),
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem'
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.neutral.100')
            }
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-animate'),
  ],
};