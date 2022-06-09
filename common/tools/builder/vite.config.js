'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var plugin_vue_1 = __importDefault(require('@vitejs/plugin-vue'));
var deIndent_1 = __importDefault(require('./plugin/deIndent'));
// Create the module aliases.
var alias = [
  // Alias for sass node_modules.
  { find: /~(.+)/, replacement: '$1' }
];
// Define and export vite configs.
// https://vitejs.dev/config
exports['default'] = {
  resolve: { alias: alias },
  plugins: [plugin_vue_1['default'](), deIndent_1['default']()]
};
