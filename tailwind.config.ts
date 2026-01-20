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
        background: "#F5F0E6",
        foreground: "#1A1A1A",
        naga: {
          purple: "#6D6AFE",
          green: "#16A34A",
          brown: "#4B3621",
          red: "#FF1744",
          cotton: "#F5F0E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;
