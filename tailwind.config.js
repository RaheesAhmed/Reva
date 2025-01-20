/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Real Estate Palette
        reva: {
          50: "#F0F7FF", // Lightest blue, for backgrounds
          100: "#E0EFFE", // Light blue for hover states
          200: "#BAE0FD", // Soft blue for borders
          300: "#7CC5FB", // Medium blue for secondary elements
          400: "#36A9F9", // Bright blue for interactive elements
          500: "#0294F7", // Primary blue
          600: "#0170CD", // Deep blue for emphasis
          700: "#015CAE", // Dark blue for text
          800: "#014A8F", // Darker blue for headers
          900: "#013B70", // Darkest blue for contrast
        },
        // Supporting Colors
        success: {
          50: "#ECFDF3",
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
        },
        destructive: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        // Neutral shades for text and backgrounds
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
        body: ["SF Pro Display", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
        card: "0 4px 12px rgba(0, 0, 0, 0.05)",
        elevated: "0 8px 24px rgba(0, 0, 0, 0.08)",
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
