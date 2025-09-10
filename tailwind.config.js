/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3470FF', // main blue
          dark: '#0B44CD',
        },
        gray: {
          100: '#F7F7F7',
          200: '#F2F4F7',
          300: '#DADDE1',
          400: '#8E929A',
          900: '#101828',
        },
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
