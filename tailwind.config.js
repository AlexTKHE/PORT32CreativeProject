/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#E6703E',
        'off-white': '#F8F8F6',
        'slate-blue': '#3B4755',
        'cool-blue': '#4DA6D9',
      },
    },
  },
  plugins: [],
}

