/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tealSpark: '#1abc9c',
        duskBlue: '#2c3e50',
        parchment: '#fef6e4',
        ember: '#f97316',
      },
      fontFamily: {
        display: ['"Nunito Sans"', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['"Rubik"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        explorer: '0 20px 65px -25px rgba(31, 148, 140, 0.55)',
      },
    },
  },
  plugins: [],
};
