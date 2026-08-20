/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4b09e6",
          light: "#4DA6FF",
          dark: "#0056CC",
        },
        secondary: {
          DEFAULT: "#3B82F6",
        },
        dark: {
          100: "#0a1628",
          200: "#0d1f3c",
          300: "#010715",
          400: "#122448",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
