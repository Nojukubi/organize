'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var plugin_vue_1 = __importDefault(require('@vitejs/plugin-vue'));
var vite_plugin_eslint_1 = __importDefault(require('vite-plugin-eslint'));
var deIndent_1 = __importDefault(require('./plugin/deIndent'));
// Eslint configs.
var EsLintConfigs = {};
// Env global variables.
EsLintConfigs.env = {
  node: true
};
// Custom global variables.
EsLintConfigs.globals = {
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
EsLintConfigs['extends'] = [
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
var alias = [
  // Alias for sass node_modules.
  { find: /~(.+)/, replacement: '$1' }
];
// Define and export vite configs.
// https://vitejs.dev/config
exports['default'] = {
  resolve: { alias: alias },
  plugins: [
    (0, plugin_vue_1['default'])(),
    (0, deIndent_1['default'])(),
    (0, vite_plugin_eslint_1['default'])({
      baseConfig: EsLintConfigs
    })
  ]
};
