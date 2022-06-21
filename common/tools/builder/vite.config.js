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
// Eslint configs.
const EsLintConfigs = {};
// Env global variables.
EsLintConfigs.env = {
  node: true
};
// Custom global variables.
EsLintConfigs.globals = {
  $ref: 'readonly',
  $computed: 'readonly',
  $shallowRef: 'readonly',
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly'
};
// Custom parser options.
EsLintConfigs.parserOptions = {
  ecmaVersion: 2020,
  ecmaFeatures: {
    modules: true
  }
};
// Extend by 3rd party configs.
EsLintConfigs.extends = [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/typescript/recommended',
  'plugin:prettier/recommended'
];
// Configure and override rules.
EsLintConfigs.rules = {
  'vue/script-setup-uses-vars': 1,
  '@typescript-eslint/no-unused-vars': 0
};
// Create the module aliases.
const alias = [
  // Alias for sass node_modules.
  { find: /~(.+)/, replacement: '$1' }
];
// Define and export vite configs.
// https://vitejs.dev/config
exports.default = {
  resolve: { alias },
  plugins: [
    (0, deIndent_1.default)(),
    (0, plugin_vue_1.default)({
      reactivityTransform: true
    }),
    (0, vite_plugin_eslint_1.default)({
      baseConfig: EsLintConfigs
    })
  ]
};
