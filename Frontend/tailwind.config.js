/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        sidebartext:'#2A4978',
        dropdown:'#1D1D26'
      }
    },
  },
  
  plugins: [],
}

