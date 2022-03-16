const plugin = require("tailwindcss/plugin")
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'xs': '300px',
      },
      fontFamily: {
        "headline": ["Guardian-EgypTT","Charter","Charter Bitstream","Cambria","Noto Serif Light","Droid Serif","Georgia","serif"],
      },
      colors: {
        // Dark theme
        'dark-blue-bg-500': '#14274F',
        'dark-gray-fg-500': '#ECE7E3',
        'badger-tail': '#FCEBAC',

        'bg-light': 'rgb(255, 255, 255)', // white
        'bg-light-hover': 'rgb(250 250 249)', // stone-50
        'bg-light-border': 'rgb(231 229 228)', // stone-200
        'bg-dark': 'rgb(17 24 39)', // gray-900
        'bg-dark-hover': 'rgb(31 41 55)', // gray-800
        'bg-dark-border': 'rgb(31 41 55)', // gray-800
        'fg-light': 'rgb(226 232 240)', // text-slate-200
        'fg-light-capture': 'rgb(241 245 249)', // text-slate-100
        'fg-dark': 'rgb(51 65 85)', // 'text-slate-700'
        'fg-dark-capture': 'rgb(15 23 42)' // text-slate-900
      },

      keyframes: {
        fadeOut: {
          "0%, 80%": { opacity: 1 },
          "100%": { opacity: 0 }
        }
      }
    }
  },
  plugins: [
    plugin(function({addBase, addComponents, addUtilities, theme}) {
      const numFadingElements = 4;
      const utilities = {};
      function decimalToPercentString(i, offset=0) {
        return Math.floor(
          (100 * i / numFadingElements) + offset
        ).toString() + "%";
      }
      for (let i = 0; i < numFadingElements; i++) {
        const beginHidden = decimalToPercentString(i);
        const beginShow = decimalToPercentString(i, offset=5);
        const endShow = decimalToPercentString(i+1, offset=-5);
        const endHidden = decimalToPercentString(i+1);
        utilities[`@keyframes fade-in-out-${i}`] = {
          "0%": { opacity: 0 },
          [beginHidden]: {opacity: 0},
          [beginShow]: { opacity: 1 },
          [endShow]: {opacity: 1},
          [endHidden]: { opacity: 0 },
          "100%": { opacity: 0 },
        };
      }
      addComponents(utilities);
    }),
  ],
}
