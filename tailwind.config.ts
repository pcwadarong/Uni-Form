import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    colors: {
      white: '#ffffff',
      lightRed: '#FFEDEA',
      red: '#FE4E39',
      primary: '#1CDE8F',
      font: '#0BC985',
      dark: '#010B13',
    },
    screenS: { sm: '480px', '2xl': '1400px' },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        green: {
          light: '#EAFBF5',
          bright: '#29EE9E',
        },
        gray: {
          1: '#F8F8F8',
          2: '#EAEAEA',
          3: '#CCCCCC',
          4: '#949494',
          5: '#38393D',
        },
        width: {
          max: '1400px',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
