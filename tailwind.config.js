/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xxl: '1536px',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs-mid': '0.85rem',
        'sm-plus': '0.9125rem',
      },
      keyframes: {
        'box-shake': {
          '0%, 100%': { transform: 'translateX(50%) translateY(0)' },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(calc(50% - 3px)) translateY(0)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(calc(50% + 3px)) translateY(0)',
          },
        },
      },
      animation: {
        'box-shake': 'box-shake 0.6s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
