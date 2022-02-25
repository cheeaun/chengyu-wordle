import content from '@originjs/vite-plugin-content';
import preact from '@preact/preset-vite';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';

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
      additionalLegacyPolyfills: ['unfetch/polyfill/polyfill.mjs'],
      modernPolyfills: true,
    }),
  ],
  server: {
    port: 3030,
    host: true,
  },
  preview: {
    host: true,
    https: true,
  },
  build: {
    assetsInlineLimit: 0,
    target: ['es2020', 'chrome61', 'safari11'],
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // console.log(id);
          if (id.includes('.css')) return; // Do nothing for CSS
          if (id.includes('all-idioms')) return 'all-idioms';
          if (id.includes('game-idioms')) return 'game-idioms';
          if (id.includes('node_modules/pinyin-pro/data')) return 'pinyin-data';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
