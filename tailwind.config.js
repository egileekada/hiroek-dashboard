/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37137F",
        primary30: "#37137F4D",
        secondary: "#883DCF"
      }
    },
  },
  plugins: [],
}

