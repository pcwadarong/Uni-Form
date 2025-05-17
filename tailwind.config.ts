/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  prefix: "",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screenS: { sm: "480px", "2xl": "1400px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
