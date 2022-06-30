import type { Parameters } from '@storybook/addons';

// Parameters are named metadata about a story, typically used
// to control the behavior of Storybook features and addons.
// https://storybook.js.org/docs/react/writing-stories/parameters
export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
