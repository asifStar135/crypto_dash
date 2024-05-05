/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#00000089",
        ytext: "#D99800FF",
        darkBlue: "#171c21",
        fadeBg: "#2f3026a1",
      },
    },
  },
  plugins: [],
};
