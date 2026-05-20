/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          petrol: {
            DEFAULT: '#15171C',
            light: '#252830',
            dark: '#0C0E11',
          },
          green: {
            DEFAULT: '#2D5B37',
            light: '#3F7A4A',
            dark: '#1B3E22',
          },
          yellow: {
            DEFAULT: '#FF5C00',
            light: '#FF7C2B',
            dark: '#C84600',
          },
          light: '#F8FAFC',
          dark: '#1E2229',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(15, 61, 76, 0.1)',
        'premium-hover': '0 20px 40px -15px rgba(15, 61, 76, 0.2)',
      }
    },
  },
  plugins: [],
}
