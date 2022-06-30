import WBadge from './WBadge.vue';

export default {
  title: 'Base/Badge',
  component: WBadge,
  argTypes: {}
};

const Template: any = (args) => {
  return {
    // Components used in your story `template` are defined in the `components` object
    components: { WBadge },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
      return { args };
    },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: `
      <w-badge v-bind="args">
        1
      </w-badge>
    `
  };
};

export const Primary = Template.bind({});
Primary.args = {};
