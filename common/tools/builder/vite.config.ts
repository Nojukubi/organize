import { AliasOptions, UserConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import pluginDeIndent from './plugin/deIndent';

// Create the module aliases.
const alias: AliasOptions = [
  // Alias for sass node_modules.
  { find: /~(.+)/, replacement: '$1' }
];

// Define and export vite configs.
// https://vitejs.dev/config
export default <UserConfig>{
  resolve: { alias },
  plugins: [pluginVue(), pluginDeIndent()]
};
