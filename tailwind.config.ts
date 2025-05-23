import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        roboto: ["var(--font-roboto)"],
        montserrat: ["var(--font-montserrat)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "#008080",
        secondary1: "#F7F7F8",
        secondary2: "#87def1",
        text_title: "#333333",
        text_des: "#666666",
        trackbtn: "#555555",
      },
    },
  },
  plugins: [],
} satisfies Config;
