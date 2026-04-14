/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          500: '#1d4ed8',
          600: '#1e40af',
          700: '#193a94',
          900: '#0f172a'
        },
        accent: '#f97316'
      },
      boxShadow: {
        panel: '0 20px 45px -25px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};
