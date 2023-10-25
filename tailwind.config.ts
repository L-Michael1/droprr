import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        heading: "#5b5b71",
        accent: "#6c6c91",
      },
      fontFamily: {
        sans: ["var(--font-walsheim)"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
