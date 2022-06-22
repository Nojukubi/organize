import pluginVue from '@vitejs/plugin-vue';
import pluginEslint from 'vite-plugin-eslint';
import pluginDeIndent from './plugin/deIndent';
import type { Linter } from 'eslint';
import type { AliasOptions, UserConfig } from 'vite';

// Eslint configs.
const EsLintConfigs: Linter.Config = {};

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
const alias: AliasOptions = [
  // Alias for sass node_modules.
  { find: /~(.+)/, replacement: '$1' }
];

// Define and export vite configs.
// https://vitejs.dev/config
export default <UserConfig>{
  resolve: { alias },
  plugins: [
    pluginDeIndent(),
    pluginVue({
      reactivityTransform: true
    }),
    pluginEslint({
      baseConfig: EsLintConfigs
    })
  ]
};
