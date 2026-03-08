/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D9488",
        "primary-dark": "#0F766E",
        secondary: "#F0FDFA",
      },
    },
  },
  plugins: [],
};
