import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      white: '#ffffff',
      red: '#FE4E39',
      primary: '#1CDE8F',
      font: '#0BC985',
      dark: '#010B13',
    },
    screenS: { sm: '480px', '2xl': '1400px' },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: {
          light: '#EAFBF5',
          bright: '#29EE9E',
        },
        gray: {
          1: '#F8F8F8',
          2: '#F5F5F5',
          3: '#CCCCCC',
          4: '#949494',
          5: '#38393D',
        },
        width: {
          // '0.1rem': '0.1rem',
          max: '1400px',
        },
      },
    },
  },
  plugins: [],
};
export default config;
