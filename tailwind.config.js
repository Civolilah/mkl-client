/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs-mid': '0.83rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
