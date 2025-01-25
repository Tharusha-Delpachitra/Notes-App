/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#08171E'
      },
      width: {
        '160': '70rem',
        '140': '60rem',
        '120' : '40rem',
      },
    }
  },
  plugins: [],
}