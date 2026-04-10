import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // Change 'localhost' to '127.0.0.1'
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],

})