/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      helvetica: ['Helvetica', 'sans-serif'],
    },
    extend: {
      colors: {
        background: '#ffffff',
        backgroundAlt: '#e7e7e7',
        backgroundDark: '#2c2c2c',
        headerColor: '#444351',
        headerFont: '#bbc0c6',
        defaultFont: '#373737',
        subContent: '#dbdbdb',
        buttonColor: '#394552',
        buttonHover: '#445566',
        buttonColorAlt: '#4a5b6c',
        buttonHoverAlt: '#556677',
      }
    },
  },
  plugins: [],
}