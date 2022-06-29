'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const plugin_vue_1 = __importDefault(require('@vitejs/plugin-vue'));
const vite_plugin_eslint_1 = __importDefault(require('vite-plugin-eslint'));
const deIndent_1 = __importDefault(require('./plugin/deIndent'));
const vite_eslint_1 = require('./vite.eslint');
const vite_resolve_1 = require('./vite.resolve');
// Define and export vite configs.
// https://vitejs.dev/config
exports.default = {
  resolve: vite_resolve_1.resolve,
  plugins: [
    (0, deIndent_1.default)(),
    (0, plugin_vue_1.default)({
      reactivityTransform: true
    }),
    (0, vite_plugin_eslint_1.default)({
      baseConfig: vite_eslint_1.eslint
    })
  ]
};
