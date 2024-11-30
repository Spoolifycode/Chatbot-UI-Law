/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'system-ui', 'sans-serif'],
      },
      colors: {
        'chat': {
          'dark-navy': '#0F172A',
          'darker': '#1E293B',
          'slate': '#334155',
          'light-slate': '#94A3B8',
          'blue-accent': '#3B82F6',
          'cyan-accent': '#06B6D4'
        }
      },
      backgroundColor: {
        'chat-gradient': 'linear-gradient(to right, #3B82F6, #06B6D4)'
      }
    },
  },
  plugins: [],
}