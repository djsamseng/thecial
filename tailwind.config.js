const plugin = require("tailwindcss/plugin")

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
        "headline": ["Guardian-EgypTT","Charter","Charter Bitstream","Cambria","Noto Serif Light","Droid Serif","Georgia","serif"]
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
