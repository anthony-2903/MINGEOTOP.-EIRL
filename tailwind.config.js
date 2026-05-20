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
            DEFAULT: '#0F3D4C',
            light: '#145367',
            dark: '#0a2731',
          },
          green: {
            DEFAULT: '#2E7D5B',
            light: '#3b9e74',
            dark: '#215941',
          },
          yellow: {
            DEFAULT: '#F2B705',
            light: '#ffcc33',
            dark: '#c79604',
          },
          light: '#F5F7FA',
          dark: '#1F2933',
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
