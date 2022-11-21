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
    // boxShadow: {
    //   "3xl": "rgba(0, 0, 0, 0.20) 0px 4px 6px",
    //   "4xl": "0px 3px 26px #00000029",
    //   "5xl": "0px 3px 20px #00000029",
    //   "6xl": "0px 20px 20px #DCDEE98A",
    //   "7xl": "0px 3px 60px #00000029",
    //   "8xl": "0px 3px 25px #0000000A",
    //   "9xl": "0px 3px 25px #00000008",
    // },
    // paddingLeft: {
    //   120: "120px",
    // },

    // fontFamily: {
    //   sans: ["Poppins"],
    // },
    // zIndex: {
    //   18: "18",
    //   19: "19",
    //   25: "25",
    //   50: "50",
    //   60: "60",
    //   100: "100",
    // },
    // fontSize: {
    //   xs2: "0.688rem",
    //   xl2: "16px",
    //   "18px": "18px",
    //   xl3: "22px",
    //   55: "55px",
    //   "5xl": "60px",
    //   Xll: "1.75rem",
    // },
    // colors: {
    //   primary: "var(--theme-primary)",
    //   secondary: "var(--theme-secondary)",
    //   "text-base": "var(--theme-text-base)",
    //   pinkInvolv: {
    //     100: "#FFF1FB",
    //     500: "#FF59CF",
    //   },
    //   blackInvolv: {
    //     300: "#333333",
    //     900: "#2C3652",
    //   },
    //   slate: {
    //     300: "#e2e8f3",
    //     200: "#BFBFBF",
    //   },
    //   grayInvolv: {
    //     200: "#70707099",
    //     300: "#E2E8F3",
    //     500: "#777777",
    //     600: "#8B91A9",
    //     800: "#666666",
    //     900: "#2C3652",
    //   },
    //   greenInvolv: {
    //     300: "#09B29B",
    //     400: "#44CC82",
    //   },
    //   indigo: {
    //     700: "#623EDA",
    //     800: "#391E94",
    //     900: "#3246D3",
    //     1200: "#2C3651",
    //   },
    //   red: {
    //     300: "#DC5161",
    //     400: "#E0515E",
    //     700: "#C72A38",
    //   },
    //   violet: {
    //     100: "#F7F7FF",
    //     900: "#6C5AFE",
    //   },
    //   blueInvolv: {
    //     100: "#F6F5FF",
    //     300: "#8A72FF",
    //     600: "#3246D3",
    //     700: "#3246D3",
    //     800: "#2C3652",
    //     900: "#B6BFFF",
    //   },
    // },

    // maxHeight: {
    //   "2/3": "66.666667%",
    //   "3/4": "75%",
    //   200: "127px",
    //   300: "400px",
    //   400: "400px",
    //   500: "500px",
    //   572: "500px",
    // },
    // lineHeight: {
    //   35: "35px",
    //   45: "45px",
    //   46: "46px",
    //   52: "52px",
    //   72: "72px",
    //   83: "83px",
    // },
    // minHeight: {
    //   "2/3": "66.666667%",
    //   "3/4": "75%",
    //   300: "400px",
    //   400: "400px",
    //   500: "500px",
    //   572: "500px",
    // },
    // maxWidth: {
    //   "2/3": "66.666667%",
    //   "3/4": "75%",
    //   500: "500px",
    // },
    // minWidth: {
    //   "3/4": "75%",
    //   "2/3": "66.666667%",
    //   500: "500px",
    // },
    // width: {
    //   300: "300px",
    //   400: "400px",
    //   500: "500px",
    //   650: "650px",
    //   1313: "1313px",
    //   263: "263px",
    //   270: "270px",
    //   813: "813px",
    //   85: "85%",
    //   89: "89%",
    //   13: "13px",
    //   "27px": "27px",
    //   4.5: "18px",
    // },
    // height: {
    //   127: "127px",
    //   350: "350px",
    //   658: "658px",
    //   50: "50px",
    //   813: "813px",
    //   1.3: "5px",
    // },
    // borderWidth: {
    //   30: "30px",
    // },
    // borderRadius: {
    //   xl4: "30px",
    // },
    // borderColor: {
    //   branding: "#2C3652",
    // },
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
