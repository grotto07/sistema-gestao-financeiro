/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
        body: ["IBM Plex Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(2, 6, 23, 0.16)",
        finance: "0 22px 70px rgba(2, 6, 23, 0.28)",
      },
    },
  },
  plugins: [],
};
