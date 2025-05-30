/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        green: '#34C759',
        red: '#FF3B30',
        yellow: '#FFA500',
        muted: '#9BA2B1',
        primary: '#2A7FBA',
        primaryDark: '#174666',
        light: '#F1F2F4',
        dark: '#2E3035'
      }
    }
  },
  plugins: []
}
