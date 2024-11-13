/** @type {import('tailwindcss').Config} */
  module.exports = {
    darkMode: 'class',
    content: [
      './index.html',
      './*.js',
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
      extend: {
        colors: {
          dark: {
            background: '#1a1a1a',
            secondaryBackground: '#282828',
            primary: '#a3a3a3',
            secondary: '#666666',
            accent: '#3d3d3d',
            border: '#333333',
            highlight: '#ffffff',
          },
          light: {
            background: '#ffffff',
            primary: '#333333',
            secondary: '#555555',
            accent: '#e5e5e5',
            border: '#dddddd',
            highlight: '#000000',
          },
        },
      },
    },
    plugins: [],
}