/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: [
    "./src/**/*.js",
    "./pages/**/*.js",
    "./components/**/*.js",
    "./plugins/**/*.js",
    "./static/**/*.js",
    "./store/**/*.js",
  ],
  darkMode: "class",
  corePlugins: {
    float: false,
  },
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    transform: {
      180: "rotate(180deg)",
    },
    transitionDuration: {
      2000: "2000ms",
    },
    extend: {
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("tailwindcss-pseudo-elements"),
  ],
};
