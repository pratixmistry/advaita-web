import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) return 'react-dom'
            if (id.includes('react/')) return 'react'
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('lenis')) return 'lenis'
            return 'vendor'
          }
        },
      },
    },
  },
})
