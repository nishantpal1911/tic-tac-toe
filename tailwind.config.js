/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      blur: {
        '2xs': '1px',
        xs: '2px',
      },
    },
  },
  plugins: [],
};
