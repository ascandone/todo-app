/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const plugin = require("tailwindcss/plugin");

const rotations = [-90, -45, 0, 20, 45, 90];

// Rotate X utilities
const rotateX = plugin(function ({ addUtilities }) {
  for (const rotation of rotations) {
    const sign = rotation >= 0 ? "" : "-";

    addUtilities({
      [`.${sign}rotate-x-${Math.abs(rotation)}`]: {
        transform: `rotateX(${rotation}deg) translateZ(8px)`,
      },
    });
  }

  // addUtilities({
  //   ".rotate-x-0": {
  //     transform: `rotateX(0) translateZ(20px)`,
  //   },
  //   ".rotate-x-90": {
  //     transform: `rotateX(45deg) translateZ(20px)`,
  //   },
  // });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },
    },
  },
  plugins: [rotateX],
};
