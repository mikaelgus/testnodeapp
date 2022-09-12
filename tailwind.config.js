/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "mg-quick-silver": "#A8A8A8",
        "mg-white": "#FFFFFF",
        "mg-jet": "#2C2C2C",
        "mg-davys-grey": "#595959",
        "mg-safety-yellow": "#F1D302",
        "mg-corn": "#FCEC52",
      },
    },
    backgroundImage: {
      "header-image": "url('/src/media/mahdollisuus_bg.png')",
    },
  },
  plugins: [],
};
