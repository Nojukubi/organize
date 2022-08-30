// prettier-ignore
import { Case, createCase,
  createStory } from '@internal/storybook';
import WBadge from './WBadge.vue';

// prettier-ignore
// Create the story metadata.
export default createStory({ title: 'Framework/Badge', component: WBadge })
  .setStringArgType('tag', { value: 'div', hint: 'Root html tag' })
  .setSelectArgType('size', { value: 'normal', options:
    ['small', 'normal', 'large'], hint: 'Size type' })
  .setSelectArgType('variant', { value: 'primary', options: ['primary',
    'standard', 'success', 'danger', 'warning'], hint: 'Variant name' })
  .setSelectArgType('styling', { value: 'flat', options:
    ['flat', 'outline', 'elevate', 'plain'], hint: 'Styling name' })
  .setSelectArgType('corner', { value: 'tile', options:
    ['tile', 'pill', 'circle', 'round'], hint: 'Border radius' })
  .setBooleanArgType('floating', { hint: 'Absolute or inline' })
  .setBooleanArgType('top', { hint: 'Align position top' })
  .setBooleanArgType('right', { hint: 'Align position right' })
  .setBooleanArgType('bottom', { hint: 'Align position bottom' })
  .setBooleanArgType('left', { hint: 'Align position left' })
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
  .disableArg('corner')
  .disableArg('styling');
