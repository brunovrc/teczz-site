import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('@splinetool') || id.includes('spline')) return 'vendor-spline';
          if (id.includes('framer-motion')) return 'vendor-framer';
          if (id.includes('animejs')) return 'vendor-anime';
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
          return 'vendor-misc';
        },
      },
    },
    chunkSizeWarningLimit: 2500,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
