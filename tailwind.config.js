/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "#F5F7FF",
        secondaryBg: "#FFFFFF",
        blackText: "#131313",
        primaryColor: "#2C14DD",
        secondaryColor: "#6C727F",
        dotColor: "#BBBBBB",
        placeholderColor: "#8F94A3",
        borderRed: "#CA7081",
        redText: "#681923",
        balanceColor: "#009218",
      },
    },
  },
  plugins: [],
};
