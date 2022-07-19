// prettier-ignore
import { Case, createCase,
  createStory } from '@internal/storybook';
import WBadge from './WBadge.vue';

// prettier-ignore
// Create the metadata for story.
export default createStory({ title: 'Framework/Badge', component: WBadge })
  .setStringArgType('tag', { value: 'div', hint: 'Root html tag' })
  .setSelectArgType('variant', { value: 'primary', options: ['primary',
    'secondary', 'success', 'danger', 'warning'], hint: 'Styling variant' })
  .setBooleanArgType('top', { hint: 'Absolute align top' })
  .setBooleanArgType('right', { hint: 'Absolute align right' })
  .setBooleanArgType('bottom', { hint: 'Absolute align bottom' })
  .setBooleanArgType('left', { hint: 'Absolute align left' })
  .setBooleanArgType('rounded', { hint: 'Rounded border radius' })
  .setBooleanArgType('floating', { hint: 'Absolute or inline position' });

// Create an individual case.
export const Default: Case = createCase({
  component: WBadge,
  content: '9'
})
  .disableArg('top')
  .disableArg('right')
  .disableArg('bottom')
  .disableArg('left')
  .disableArg('floating');

// Create an individual case.
export const Target: Case = createCase({
  component: WBadge,
  content: `
    <span>New</span>
    <template #target>
      <span style="line-height: 32px">
        Target
      </span>
    </template>`
})
  .setArg('top', true)
  .setArg('right', true);

// Create an individual case.
export const Indicator: Case = createCase({
  component: WBadge,
  content: `
    <template #target>
      Target
    </template>`
})
  .setArg('top', true)
  .setArg('right', true)
  .disableArg('rounded');
