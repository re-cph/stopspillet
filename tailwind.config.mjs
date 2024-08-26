const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      md: "660px",
      lg: "1020px",
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
    extend: {
      fontFamily: {
        sans: ['"Republic"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};