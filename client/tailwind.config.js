/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF1EF',
          100: '#FDDAD6',
          200: '#F9B8B1',
          300: '#F28A80',
          400: '#EC675C',
          500: '#E5483F',
          600: '#CA362F',
          700: '#A92B27',
          800: '#7F201F',
          900: '#571918',
        },
        blush: {
          50: '#FFFAF8',
          100: '#FDE3E0',
          200: '#F9D0CC',
          300: '#F3B9B3',
          400: '#ECA39B',
        },
        ink: {
          DEFAULT: '#1F1A1A',
          100: '#F4EFEE',
          300: '#C4B9B7',
          500: '#746A68',
          700: '#403735',
          900: '#1F1A1A',
        },
        paper: '#FFFAF8',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(67, 33, 30, 0.08)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
    },
  },
}
