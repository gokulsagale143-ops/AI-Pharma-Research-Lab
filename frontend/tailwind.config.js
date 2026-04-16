/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pharma: {
          dark: '#0A192F',
          blue: '#112240',
          teal: '#64FFDA',
          light: '#CCD6F6',
          white: '#FFFFFF',
          green: '#00C896',
          red: '#FF4D4D',
          warning: '#FFC800'
        }
      }
    },
  },
  plugins: [],
}