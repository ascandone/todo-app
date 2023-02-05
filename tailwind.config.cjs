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
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },

      boxShadow: {
        soft: "0 2px 32px 0px rgb(0 0 0 / 12%)",
      },
    },
  },
  plugins: [rotateX],
};
