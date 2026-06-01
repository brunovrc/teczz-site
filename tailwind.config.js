/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'fade-up': 'fadeUp 1s ease forwards',
        'fade-up-delay': 'fadeUp 1s ease 0.3s forwards',
        'fade-up-delay2': 'fadeUp 1s ease 0.6s forwards',
        'fade-up-delay3': 'fadeUp 1s ease 0.9s forwards',
        spotlight: 'spotlight 2s ease 0.75s 1 forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spotlight: {
          '0%': { opacity: '0', transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: '1', transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
