/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ["./app/**/*.{js,ts,tsx,jsx}"],
  purge: [
    './app/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'] // Ensure the font name matches the one you've imported
      }
    },
  },
  plugins: [],
}

