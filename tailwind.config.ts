import type { Config } from "tailwindcss";

/**
 * Harry's Coffee Shop — brand theme.
 * Aesthetic: "Instagrammable Floral Village Cafe".
 * Colours are mapped to CSS-friendly names so the markup reads clearly.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        white: "#FFFFFF",
        blush: "#FDF2F8", // soft blush pink

        // Primary text / nav / footer — matches the navy storefront
        navy: "#1E3A8A",

        // Call-to-action / accents — keep Tailwind's built-in pink scale
        // so pink-600 (#db2777) and pink-700 (#be185d) resolve correctly.

        // Used sparingly for warmth — the wooden tables
        brown: "#4A3728",
      },
      fontFamily: {
        // Clean body font
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Playful cursive for highlight headers (mimics the logo)
        cursive: ["var(--font-pacifico)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(30, 58, 138, 0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
