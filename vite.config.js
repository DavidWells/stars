import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'site',
  base: '/stars/',
  plugins: [react()],
  build: {
    outDir: '../.site-build',
    emptyOutDir: true,
  },
})
