/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olive': {
          100: '#f5f5dc',
          600: '#6b8e23',
        }
      }
    },
  },
  plugins: [],
}
