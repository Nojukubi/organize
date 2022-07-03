export * from '@storybook/vue3';
import { Component, defineComponent } from 'vue';
import type { StoryFn, Args } from '@storybook/vue3';

/**
 * Custom configs used to define the component.
 * @property content Component content.
 */
interface StoryConfig {
  content?: number | string;
}

/**
 * Create story and define component based on the configs.
 * @param target Vue component rendered by the story.
 * @param configs Custom configs used to define the component.
 * @returns Storybook story with defined component and configs.
 */
export function createStory(target: Component, configs?: StoryConfig): StoryFn {
  return createProxyComponent(target, configs);
}

/**
 * Create the component which will proxy the storybook data.
 * @param target Vue component rendered by the story.
 * @param configs Custom configs used to define the component.
 * @returns Vue Proxy wrapped around target with reactive props.
 */
function createProxyComponent<T>(target: T, configs?: StoryConfig): StoryFn {
  // High order component which wraps target and get story context.
  return function Proxy(args: Args) {
    return defineComponent({
      template: `
        <component :is="target" v-bind="args">
          ${configs?.content}
        </component>`,
      setup: () => ({ target, args })
    });
  };
}
