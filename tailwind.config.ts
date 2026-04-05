import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D2645',
          blue: '#1A3C6E',
          orange: '#E86C00',
          white: '#FFFFFF',
          gray: {
            light: '#F8F8F6',
            mid: '#E8E8E8',
            text: '#555555',
          },
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
