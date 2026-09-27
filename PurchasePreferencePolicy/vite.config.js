import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // BRLPP/ is kept only as the reference project and is not part of this app.
  server: { watch: { ignored: ['**/BRLPP/**'] } },
  optimizeDeps: { entries: ['index.html'] },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions', 'firebase/storage'] },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
