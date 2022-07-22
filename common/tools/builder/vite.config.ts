import eslint from '@internal/eslint';
import pluginVue from '@vitejs/plugin-vue';
import pluginEslint from 'vite-plugin-eslint';
import pluginDeIndent from './plugin/deIndent';
import { resolve } from './vite.resolve';
import type { UserConfig } from 'vite';

// Define and export vite configs.
// https://vitejs.dev/config
export default <UserConfig>{
  resolve,
  plugins: [
    pluginDeIndent(),
    pluginVue({
      reactivityTransform: true
    }),
    pluginEslint({
      baseConfig: eslint
    })
  ]
};
