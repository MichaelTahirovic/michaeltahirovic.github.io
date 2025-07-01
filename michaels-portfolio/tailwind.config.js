/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
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
      white: '#ffffff',
      black: '#000000',
      cyan: '#00bcd4',
      blue: '#2196f3'
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      helvetica: ['Helvetica', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}