/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
    colors: {
      primary: "var(--theme-primary)",
      secondary: "var(--theme-secondary)",
      "text-base": "var(--theme-text-base)",
    },
    extend: {
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: [],
};
