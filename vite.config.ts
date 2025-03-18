import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['@mantine/form'], // Prevent bundling Mantine if it's external
    },
  },
  optimizeDeps: {
    include: ['@mantine/form'],
  },
});
