import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        accent: {
          50: "#fef3f1",
          100: "#fde2dd",
          200: "#fac5bc",
          300: "#f79d8c",
          400: "#f36a51",
          500: "#e03b26",
          600: "#c72f1c",
          700: "#a62617",
          800: "#851f14",
          900: "#6b1a12",
        },
        marrakesh: {
          light: "#d1fae5",
          DEFAULT: "#059669",
          dark: "#064e3b",
        },
        navy: {
          50: "#EEF3F9",
          100: "#d6e4f0",
          200: "#b0cfe3",
          300: "#7db2d3",
          400: "#4a95c2",
          500: "#2a6f9e",
          600: "#1e3a5f",
          700: "#16304f",
          800: "#0f172a",
          900: "#0a0f1a",
        },
      },
      fontFamily: { arabic: ["Noto Sans Arabic", "sans-serif"] },
      backgroundColor: {
        page: "#EEF3F9",
      },
    },
  },
  plugins: [],
};
export default config;
