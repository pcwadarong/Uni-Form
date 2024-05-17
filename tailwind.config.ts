import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#1CDE8F',
      font: '#0BC985',
      dark: '#010B13',
    },
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
      },
    },
  },
  plugins: [],
};
export default config;
