/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: '#E4572E',
          light: '#F07848',
          dark: '#C43E1C',
        },
        dark: {
          900: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2E2E2E',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        heading: ['Oswald', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'glow-orange': 'radial-gradient(circle, rgba(228,87,46,0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scroll-x': 'scrollX 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(228,87,46,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(228,87,46,0.8)' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
