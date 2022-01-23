import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import content from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [preact(), content()],
  build: {
    sourcemap: true,
  },
});
