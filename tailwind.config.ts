import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--product-sans)"],
      },
      backgroundImage: {
        transparentPrimaryGradient:
          "linear-gradient(to bottom, #033A2C00 7%, #033A2CFF 70%, #033A2C 75%)",
        primaryGradient:
          "linear-gradient(3.01deg, #3A6C82 7.18%, #3FAB85 97.48%)",
        primaryGradient2:
          "linear-gradient(to bottom, #08AF85 7.18%, #256A5C 97.48%)",
        primaryGradientUndo:
          "linear-gradient(3.01deg, #033A2C 7.18%, #033A2C 97.48%)",
      },
      blur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "20px",
      },
      lineHeight: {
        3.5: "14px",
        4.5: "18px",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(15, 23, 42, 0.06)",
        sm: "0px 1px 3px rgba(15, 23, 42, 0.08), 0px 1px 2px -1px rgba(15, 23, 42, 0.1)",
        md: "0px 4px 6px -1px rgba(15, 23, 42, 0.1), 0px 2px 4px -2px rgba(15, 23, 42, 0.05)",
        lg: "0px 4px 6px rgba(15, 23, 42, 0.05), 0px 10px 15px -3px rgba(15, 23, 42, 0.07)",
        xl: "0px 10px 10px rgba(15, 23, 42, 0.05), 0px 20px 25px -5px rgba(15, 23, 42, 0.1)",
        "2xl": "0px 30px 30px -6px rgba(15, 23, 42, 0.11)",
        "3xl": "0px 30px 60px -12px rgba(15, 23, 42, 0.25)",
        emoji:
          "0px 14.5px 18.125px -3.625px rgba(15, 23, 42, 0.10), 0px 7.25px 7.25px 0px rgba(15, 23, 42, 0.05)",
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },

      colors: {
        // light mode
        tremor: {
          brand: {
            faint: colors.blue[50],
            muted: colors.blue[200],
            subtle: colors.blue[400],
            DEFAULT: colors.blue[500],
            emphasis: colors.blue[700],
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: {
            DEFAULT: colors.gray[200],
          },
          ring: {
            DEFAULT: colors.gray[200],
          },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        // dark mode
        baseBlack: "#151515",
        baseWhite: "#FFFFFF",
        primary: "#075392",
        primaryDark: "#064374",
        primaryLight: "#F0F5F9",
        primaryLightBase: "#0864AF",
        primaryLightLight: "#F4F8FB",
        background: "#FAFAFA",
        error: {
          50: "#FEF2F2",
          75: "#FEE2E2",
          100: "#FECACA",
          200: "#FCA5A5",
          300: "#F87171",
          400: "#EF4444",
          500: "#DC2626",
          600: "#B91C1C",
        },
        grayscale: {
          10: "#FCFCFC",
          50: "#F9FAFB",
          75: "#F7F9FC",
          100: "#F0F2F5",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667185",
          600: "#334155",
        },
        success: {
          50: "#F9FAFB",
          75: "#F0FDF4",
          100: "#BBF7D0",
          200: "#86EFAC",
          300: "#4ADE80",
          400: "#22C55E",
          500: "#16A34A",
          600: "#16A34A",
        },
        warning: {
          50: "#FFFBEB",
          75: "#FEF3C7",
          100: "#FDE68A",
          200: "#FCD34D",
          300: "#FBBF24",
          400: "#F59E0B",
          500: "#D97706",
          600: "#B45309",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar")],
};
export default config;
