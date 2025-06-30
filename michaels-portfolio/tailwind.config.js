/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    colors: {
      background: '#ffffff',
      backgroundAlt: '#383f41',
      headerColor: '#3a3941',
      headerFont: '#97a4b1',
      defaultFont: '#373737',
      subContent: '#dbdbdb',
      boxColor: '#8f6840',
      white: '#ffffff',
      black: '#000000',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      helvetica: ['Helvetica', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}