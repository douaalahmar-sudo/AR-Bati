/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#eee27d',    
        secondary: '#d6cc6a',  
        dark: '#1a1a1a',       
        light: '#f5f5f5',      
      },
    },
  },
  plugins: [],
}