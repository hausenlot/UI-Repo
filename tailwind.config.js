/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
    './data/**/*.json'
  ],
  safelist: [
    'bg-blue-500',
    'text-white',
    'px-4',
    'py-2',
    'rounded',
    'mt-2',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}