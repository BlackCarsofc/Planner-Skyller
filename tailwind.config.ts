import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f6",
          100: "#ffe4ee",
          200: "#ffc8dc",
          300: "#ff9cc1",
          400: "#ff649e",
          500: "#fb357d",
          600: "#e31667",
          700: "#be0d54",
          800: "#9e1048",
          900: "#86133f"
        }
      },
      boxShadow: {
        soft: "0 20px 40px rgba(15, 23, 42, 0.10)"
      }
    },
  },
  plugins: [],
};

export default config;
