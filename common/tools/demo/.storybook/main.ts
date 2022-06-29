import pluginVue from '@vitejs/plugin-vue';
import pluginDeIndent from '@internal/builder/plugin/deIndent';
import { alias } from '@internal/builder/vite.resolve';
import type { CoreConfig, Preset } from '@storybook/core-common';

// Core builder configuration.
const core: CoreConfig = {
  builder: '@storybook/builder-vite'
};

// Addons and presets to include.
const addons: Preset[] = ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'];

// Find by pattern inside of framework.
const stories: string[] = [
  '../node_modules/@organize/**/*.stories.mdx',
  '../node_modules/@organize/**/*.stories.@(js|jsx|ts|tsx)'
];

// Define the framework which used in stories.
const framework: string = '@storybook/vue3';

// Customize the default storybook vite configs.
async function viteFinal(config) {
  // Filter out the plugins which is need customization.
  config.plugins = config.plugins.filter(({ name }: Plugin): boolean => {
    return name !== 'vue-docgen' && name !== 'vite:vue';
  });

  // Dedupe modules to avoid duplications of diff versions.
  config.resolve.dedupe = ['@storybook/client-api', 'react', 'react-dom'];

  // Add aliases to resolve or replace the modules on build.
  config.resolve.alias = [...alias, { find: /^vue$/, replacement: 'vue/dist/vue.esm-bundler.js' }];

  // Add plugin to de-indent the lead space of the pug templates.
  config.plugins.push(pluginDeIndent());

  // Add plugin to compile the SCF files and turn on reactivity.
  config.plugins.push(pluginVue({ reactivityTransform: true }));

  return config;
}

export default { core, stories, addons, framework, viteFinal };
