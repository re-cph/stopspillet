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
      primary: "#14143c",
      secondary: "#6a7a90",
      accent: "#96b4dc",
      bgFooter: "#5d6673",
      bgNews: "#E9E5E2",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        heading: ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
      },
    },
    keyframes: {
      heroBgScale: {
        "0%": {
          "transform-origin": "bottom left",
          transform: "scale(1)",
        },
        "100%": {
          transform: "scale(1.2)",
        },
      },
      logoSlider: {
        from: {
          transform: "translateX(-196px)",
        },
        to: {
          transform: "translateX(0)",
        },
      },
    },
    animation: {
      heroBgScale: "heroBgScale 4s linear forwards",
      logoSlider: "logoSlider 1s 3s ease-in-out forwards",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
