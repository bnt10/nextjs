/** @type {import('tailwindcss').Config} */
const pxToRem = (px, base = 16) => `${px / base}rem`;
const range = (start, end) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    spacing: {
      ...range(0, 1000).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },

    screens: {
      mobile: '360px',
      foldable: '523px',
      tablet: '768px',
      'under-foldable': { max: '522px' },
      'under-tablet': { max: '767px' },
      'under-mobile': { max: '359px' },
      dssktop: '1200px',
    },
    fontSize: {
      xsm: '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        'footer-gray': '#363636',
        'app-bg': '#121212',
        primary: '#8687E7',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#AFAFAF',
          900: '#979797',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
    },
  },
  plugins: [],
};
