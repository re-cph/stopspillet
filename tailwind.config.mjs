const defaultTheme = require("tailwindcss/defaultTheme");

console.log(defaultTheme.screens);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      white: "#FFF",
      black: "#000",
      primary: "#13113a",
      light: "#96b4dc",
      lightAlt: "#9abde9",
      accent: "#ef7535",
      accentAlt: "#EC6C27",
      shuttleGray: "#5d6673",
      slateGray: "#6a7a90",
      boulder: "#757575",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
    listStyleType: {
      decimal: "decimal",
      square: "square",
    },
    extend: {
      fontFamily: {
        sans: ['"Republic"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
