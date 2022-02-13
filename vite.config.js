import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import content from '@originjs/vite-plugin-content';
import legacy from '@vitejs/plugin-legacy';

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  plugins: [
    preact(),
    content(),
    legacy({
      targets: ['defaults', 'samsung >= 9', 'android >= 4', 'chrome >= 30'],
      additionalLegacyPolyfills: ['unorm', 'unfetch/polyfill/polyfill.mjs'],
      modernPolyfills: ['es.array.flat'],
    }),
  ],
  server: {
    port: 3030,
  },
  build: {
    target: ['es2020', 'chrome61', 'safari11'],
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('.css')) return; // Do nothing for CSS
          if (id.includes('all-idioms')) return 'all-idioms';
          if (id.includes('game-idioms')) return 'game-idioms';
          if (id.includes('node_modules/pinyin')) return 'pinyin';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
