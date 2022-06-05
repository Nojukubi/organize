import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import deIndent from './build/deIndent';
import manifest from './pwa/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: '$1'
      }
    ]
  },
  plugins: [
    deIndent(),
    vue(),
    pwa({
      srcDir: './pwa',
      strategies: 'injectManifest',
      filename: 'service-worker.js',
      manifest
    })
  ]
});
