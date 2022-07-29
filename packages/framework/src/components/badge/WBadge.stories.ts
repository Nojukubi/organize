import { Case, createCase, createStory } from '@internal/storybook';
import WBadge from './WBadge.vue';

// prettier-ignore
// Create the story metadata.
export default createStory({ title: 'Framework/Badge', component: WBadge })
  .setStringArgType('tag', { value: 'div', hint: 'Root html tag' })
  .setSelectArgType('styling', { value: 'flat', options:
    ['flat', 'outlined', 'elevated', 'plain'], hint: 'Styling name' })
  .setSelectArgType('variant', { value: 'primary', options: ['primary',
    'standard', 'success', 'danger', 'warning'], hint: 'Variant name' })
  .setBooleanArgType('floating', { hint: 'Absolute or inline' })
  .setBooleanArgType('top', { hint: 'Absolute align top' })
  .setBooleanArgType('right', { hint: 'Absolute align right' })
  .setBooleanArgType('bottom', { hint: 'Absolute align bottom' })
  .setBooleanArgType('left', { hint: 'Absolute align left' })
  .setBooleanArgType('tile', { hint: 'Tile border radius' })
  .setBooleanArgType('rounded', { hint: 'Rounded border radius' })
  .setBooleanArgType('transparent', { hint: 'Slight transparency' });

// Create the individual case.
export const Default: Case = createCase({
  component: WBadge,
  content: '9'
})
  .disableArg('top')
  .disableArg('right')
  .disableArg('bottom')
  .disableArg('left')
  .disableArg('floating');

// Create the individual case.
export const Target: Case = createCase({
  component: WBadge,
  content: `
    <span>New</span>
    <template #target>
      <span style="line-height: 34px">
        Target
      </span>
    </template>`
})
  .setArg('top', true)
  .setArg('right', true);

// Create the individual case.
export const Indicator: Case = createCase({
  component: WBadge,
  content: `
    <template #target>
      Target
    </template>`
})
  .setArg('top', true)
  .setArg('right', true)
  .disableArg('rounded')
  .disableArg('styling');
