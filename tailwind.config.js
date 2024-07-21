/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'modal-in': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-55%) scale(1.02)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
          },
        },
        'modal-out': {
          '0%': {
            opacity: 1,
            transform: 'translateX(-50%) translateY(-50%) scale(1)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateX(-50%) translateY(-55%) scale(1.02)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in .2s',
        'fade-out': 'fade-out .2s',
        'modal-in': 'modal-in .2s',
        'modal-out': 'modal-out .2s',
      },
    },
  },
  plugins: [],
}
