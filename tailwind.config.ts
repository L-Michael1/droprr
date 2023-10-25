import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22c55e",
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
