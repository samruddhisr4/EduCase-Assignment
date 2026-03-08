/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "popx-bg": "#F7F8F9",
        "popx-purple": "#6C25FF",
        "popx-dark": "#1D2226",
        "popx-gray": "#919191",
        "popx-border": "#CBCBCB",
        "popx-error": "#DD4A3D",
        "popx-white": "#FFFFFF",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      width: { mobile: "375px" },
      height: { mobile: "812px" },
    },
  },
  plugins: [],
};
