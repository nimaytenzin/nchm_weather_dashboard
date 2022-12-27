/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#62A2AF",
          hovered: "#7AABB5",
          light: "#F7F7FC",
          dark: "#100A55",
          text: "#857BF2",
          textOnPrimary: "#FFFFFF",
          heading1: "#000929",
          heading2: "#3e445e",
          label: "#9193a3",
          paragraph: "#4c5369",
          borderLight: "#eff0f3",
          medium: "#8896BA88",
          surfaceLight: "#f9fafb",
          surfaceHighlight: "#f0effb",
          surfaceHighlightLight: "#f7f7fd",
        },
        linear: {
          from: "#FFFFFF",
          to: "#A1C7CF",
        },
        destructive: {
          DEFAULT: "#ef6464",
          hovered: "#d75a5a",
          disabled: "#f1f1f1",
          text: "#d72c0c",
          textonDestructive: "#ffffff",
          surfaceHighlight: "#fce3e3",
        },
        success: {
          DEFAULT: "#64ab49",
          light: "#e6f4e1",
        },
        critical: {
          DEFAULT: "#ed6564",
          light: "#fce3e3",
        },
        info: {
          DEFAULT: "#ffb359",
          light: "#fff6eb",
        },
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
