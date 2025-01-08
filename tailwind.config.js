/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': {'raw': '(min-width: 360px) and (min-height: 800px)'},
        'tablet': {'raw': '(min-width: 600px) and (min-height: 1024px)'},
        'laptop': {'raw': '(min-width: 1024px) and (min-height: 600px)'},
      }
    },
  },
  plugins: [],
}