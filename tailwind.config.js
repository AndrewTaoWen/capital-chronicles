/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'] // Ensure the font name matches the one you've imported
      }
    },
  },
  plugins: [],
}

