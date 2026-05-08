/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          50:  "#f6f3ee",
          100: "#e8dfd0",
          200: "#d4c3a3",
          300: "#b89e72",
          400: "#a08050",
          500: "#7d6238",
          600: "#5e4826",
          700: "#3f3018",
          800: "#221a0c",
          900: "#110d06",
        },
        leaf: {
          50:  "#edfaf0",
          100: "#d0f2d7",
          200: "#a3e4b0",
          300: "#6dcf82",
          400: "#3db85a",
          500: "#1e9c3c",
          600: "#157a2d",
          700: "#0e5a20",
          800: "#073c14",
          900: "#031e0a",
        },
        soil: "#4a3728",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
      },
    },
  },
  plugins: [],
};