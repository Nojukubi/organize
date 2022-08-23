// Eslint configs.
const eslint = {};

// Env global variables.
eslint.env = {
  node: true
};

// Custom global variables.
eslint.globals = {
  $: 'readonly',
  $$: 'readonly',
  $ref: 'readonly',
  $computed: 'readonly',
  $shallowRef: 'readonly',
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly'
};

// Custom parser options.
eslint.parserOptions = {
  ecmaVersion: 2020,
  ecmaFeatures: {
    modules: true
  }
};

// Extend by 3rd party configs.
eslint.extends = [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/typescript/recommended',
  'plugin:prettier/recommended'
];

// Configure and override rules.
eslint.rules = {
  'vue/script-setup-uses-vars': 1,
  '@typescript-eslint/no-unused-vars': 0,
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/no-empty-interface': 0,
  '@typescript-eslint/no-inferrable-types': 0
};

// Exports the Eslint custom configs.
module.exports = eslint;
