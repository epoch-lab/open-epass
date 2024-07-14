import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
  build: {
    outDir: './dist',
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '_routes.json',
          dest: '',
        },
      ],
    }),
  ],
})
