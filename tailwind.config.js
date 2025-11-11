/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundDark: '#242424',
        backgroundLight: '#ffffff',
        link: '#646cff',
        linkHover: '#535bf2',
        linkHoverLight: '#747bff',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        '1/2': '50%',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}




