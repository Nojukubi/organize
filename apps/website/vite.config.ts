import { defineConfig } from 'vite';
import buildConfig from '@internal/builder';
import { VitePWA as pluginPWA } from 'vite-plugin-pwa';
import manifest from './pwa/manifest.json';

// Register the pwa plugin.
buildConfig.plugins?.push([
  pluginPWA({
    srcDir: './pwa',
    strategies: 'injectManifest',
    filename: 'service-worker.js',
    manifest
  })
]);

// Define and export vite configs.
// https://vitejs.dev/config
export default defineConfig(buildConfig);
