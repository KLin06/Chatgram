import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: "#1C0222",       // deep plum
        grape: "#501760",      // muted purple
        sky: "#5179D6",        // soft blue
        mist: "#F2F2F2",       // pale neutral
        lightgrey: "#a9a9a9",
        charcoal: "#1E1E1E",   // dark text / background
        background: "#0d0d11",
        surface: "#141824",
        panel: "#1d2d48",
        muted: "#1b1f29",
        primary: "#3583f9",
        border: "#3e4657",
        light: "#f7f8fb",
        navbarblue: "#111523",
        navbarpurple: "#170A43"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake", "dark", "light"], 
  },
};
