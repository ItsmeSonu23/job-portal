import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      external: ['@mantine/dates', '@mantine/form', '@mantine/tiptap', '@mantine/core', '@mantine/carousel'],
    },
  },
  optimizeDeps: {
    include: ['@mantine/core', '@mantine/carousel', '@mantine/dates', '@mantine/form', '@mantine/tiptap'],
  },
});
