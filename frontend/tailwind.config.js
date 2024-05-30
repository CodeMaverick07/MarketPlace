/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: {
      mont: ["Montserrat", "sans-serif"],
      robo: ["Roboto Mono", "monospace"],
      ai: ["Russo One", "sans-serif", "system-ui"],
      nav: ["Electrolize", "sans-serif"],
      pop: ["Poppins", "sans-serif"],
    }},
  },
  plugins: [],
};
