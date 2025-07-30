/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs-mid': '0.85rem',
        'sm-plus': '0.9125rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
