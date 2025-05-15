import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screenS: { sm: "480px", "2xl": "1400px" },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
