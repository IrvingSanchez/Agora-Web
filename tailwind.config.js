/** @type {import('tailwindcss').Config} */
const config = {
  presets: [require("shared/tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        primarySecond: "var(--primary-color-second)",
        secondary: "var(--secondary-color)",
        secondarySecond: "var(--secondary-color-second)",

        greyOne: "var(--grey-one)",
        greyTwo: "var(--grey-two)",
        greyThree: "var(--grey-three)",
        greyFour: "var(--grey-four)",

        bg: "var(--bg-color)",
        bgSecond: "var(--bg-second)",

        textColor: "var(--text-color)",
        textLight: "var(--text-light)",
        textCustom: "var(--text-custom)",

        error: "var(--error-color)",
        errorLight: "var(--error-light)",
        success: "var(--success-color)",
        successLight: "var(--success-light)",
        warning: "var(--warning-color)",
        warningLight: "var(--warning-light)",

        graphOne: "var(--graph-one)",
        graphTwo: "var(--graph-two)",
        graphThree: "var(--graph-three)",
        graphFour: "var(--graph-four)",
        graphFive: "var(--graph-five)",
      },
      fontFamily: {
        primary: ["var(--primary-font)"],
        secondary: ["var(--secondary-font)"],
      },
      screens: {
        "xs-2": "320px", // teléfono muy pequeño
        xs: "375px", // teléfono estándar
        sm: "535px", // phablet / teléfono grande
        md: "768px", // tablet vertical
        "lg-2": "991px", // tablet horizontal / laptop chica
        lg: "1024px", // laptop mediana
        xl: "1200px", // laptop grande
        "2xl": "1536px", // desktop grande
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  
  plugins: [],
};

export default config;
