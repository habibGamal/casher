/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          100: '#E2DBF9',
          200: '#C6B8F3',
          300: '#9D8CDC',
          400: '#7666BA',
          500: '#47388D',
          600: '#352879',
          700: '#261C65',
          800: '#191151',
          900: '#100A43',
        },
        'yellow':{
          100: '#FFF7D4',
          200: '#FFEDAA',
          300: '#FFE07F',
          400: '#FFD460',
          500: '#FFC02B',
          600: '#DB9D1F',
          700: '#B77D15',
          800: '#935F0D',
          900: '#7A4A08',
        }
      },
      
    },
  },
  plugins: [],
}
