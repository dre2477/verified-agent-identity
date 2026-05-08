import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1a1a2e",
        "charcoal-light": "#252542",
        cream: "#f5f0e8",
        "cream-dark": "#ede7d9",
        gold: "#c9a84c",
        "gold-dark": "#a8882e",
        "gold-light": "#d9bc74",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "inherit",
            a: { color: "#c9a84c" },
            h1: { fontFamily: "Playfair Display, Georgia, serif" },
            h2: { fontFamily: "Playfair Display, Georgia, serif" },
            h3: { fontFamily: "Playfair Display, Georgia, serif" },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
