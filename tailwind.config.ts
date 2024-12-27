import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "#008080",
        secondary1: "#eaf6ff",
        secondary2: "#F7F7F8",
        trackbtn: "#555555",
      },
    },
  },
  plugins: [],
} satisfies Config;
