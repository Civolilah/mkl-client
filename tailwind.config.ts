import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    'src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'src/common/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2E6CBD',
        accent: '#34495e',
        'instagram-brand': '#E1306C',
      },
    },
  },
  plugins: [],
};
export default config;
