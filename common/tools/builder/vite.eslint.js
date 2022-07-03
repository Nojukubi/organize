'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.eslint = void 0;
// Eslint configs.
exports.eslint = {};
// Env global variables.
exports.eslint.env = {
  node: true
};
// Custom global variables.
exports.eslint.globals = {
  $ref: 'readonly',
  $computed: 'readonly',
  $shallowRef: 'readonly',
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly'
};
// Custom parser options.
exports.eslint.parserOptions = {
  ecmaVersion: 2020,
  ecmaFeatures: {
    modules: true
  }
};
// Extend by 3rd party configs.
exports.eslint.extends = [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/typescript/recommended',
  'plugin:prettier/recommended'
];
// Configure and override rules.
exports.eslint.rules = {
  'vue/script-setup-uses-vars': 1,
  '@typescript-eslint/no-unused-vars': 0
};
