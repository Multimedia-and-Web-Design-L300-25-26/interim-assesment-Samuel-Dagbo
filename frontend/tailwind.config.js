/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coinbase-blue': '#0052FF',
        'coinbase-dark': '#0A2540',
      }
    },
  },
  plugins: [],
}