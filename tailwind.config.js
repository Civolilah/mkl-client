/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xs: '0.65rem',
        'xs-mid': '0.71rem',
        'xs-plus': '0.76rem',
        sm: '0.81rem',
        base: '0.89rem',
        lg: '1.00rem',
        'lg-plus': '1.075rem',
        xl: '1.11rem',
        '2xl': '1.34rem',
        '3xl': '1.67rem',
        '4xl': '2.00rem',
        '5xl': '2.67rem',
        '6xl': '3.34rem',
        '7xl': '4.01rem',
        '8xl': '5.34rem',
        '9xl': '7.12rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
