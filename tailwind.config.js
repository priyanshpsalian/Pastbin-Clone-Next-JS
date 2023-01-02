// import colors
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.tsx'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: colors.amber,
      secondary: colors.gray,
      white: colors.white,
      black: colors.black
    },
    fontFamily: {
      sans: ['"Recursive"', 'sans-serif']
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
