/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./src/**/*.{js,jsx}', './src-ts/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        ['header-height']: 'var(--header-height)',
        ['header-height-sm']: 'var(--header-height-sm)',
      },
      padding: {
        ['container-top']: 'var(--header-height)',
        ['container-top-sm']: 'var(--header-height-sm)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
    },
  },
  plugins: [],
};
