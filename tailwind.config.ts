import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wilson: {
          blue: "#123E7A",
          "blue-deep": "#0B2C57",
          sand: "#D8C2A0",
          ivory: "#F5F1EA",
          graphite: "#444444",
          gold: "#d4a970",
        },
      },
      fontFamily: {
        garamond: ["var(--font-garamond)", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-wilson": "linear-gradient(135deg, #0B2C57 0%, #123E7A 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
