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
      function decimalToPercentString(i) {
        return Math.floor(100 * i / (numFadingElements + 1)).toString() + "%";
      }
      for (let i = 0; i < numFadingElements; i++) {
        const prevEnd = decimalToPercentString(i);
        const begin = decimalToPercentString(i+1);
        const end = decimalToPercentString(i+2);
        utilities[`@keyframes fade-in-out-${i}`] = {
          "0%": { opacity: 0 },
          [prevEnd]: {opacity: 0},
          [begin]: { opacity: 1 },
          [end]: { opacity: 0 },
          "100%": { opacity: 0 },
        };
      }
      addComponents(utilities);
    }),
  ],
}
