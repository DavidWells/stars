import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { codeInspectorPlugin } from 'code-inspector-plugin'

export default defineConfig(({ command }) => ({
  root: 'site',
  base: '/stars/',
  plugins: [
    command === 'serve' &&
      codeInspectorPlugin({
        bundler: 'vite',
      }),
    react(),
  ].filter(Boolean),
  build: {
    outDir: '../.site-build',
    emptyOutDir: true,
  },
}))
