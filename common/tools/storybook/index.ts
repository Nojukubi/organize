export * from '@storybook/vue3';
import { Component, defineComponent, reactive, watch } from 'vue';

export function VueStory(target: Component): Component {
  return function VueComponent(args: Record<string, any>, { argTypes }: any) {
    return defineComponent({
      // Create dynamic component.
      template: '<component :is="target" v-bind="args" />',
      // Create props based on arg types.
      props: Object.keys(argTypes),
      // Setup hook of the component.
      setup: (props) => {
        // Create dynamic args.
        const dynamicArgs = reactive(args);
        // Watch changes to props.
        watch(props, (): void => {
          Object.keys(argTypes).forEach((key: string): void => {
            dynamicArgs[key] = props[key];
          });
        });

        return { target, args: dynamicArgs };
      }
    });
  };
}

export function createStory<T = any>(component: Component): typeof VueStory & { args: T } {
  return VueStory(component).bind({});
}
