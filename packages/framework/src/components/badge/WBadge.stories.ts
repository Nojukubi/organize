import { Case, createStory, createCase } from '@internal/storybook';
import WBadge from './WBadge.vue';

// prettier-ignore
// Create the metadata for story.
export default createStory('Framework/Badge', WBadge)
  .setSelectArgType('variant', 'primary', ['primary', 'secondary',
    'success', 'danger', 'warning'], 'Define the styling variant')
  .setStringArgType('tag', 'div', 'Badge html tag')
  .setBooleanArgType('top', undefined, 'Absolute align top')
  .setBooleanArgType('right', undefined, 'Absolute align right')
  .setBooleanArgType('left', undefined, 'Absolute align left')
  .setBooleanArgType('bottom', undefined, 'Absolute align bottom')
  .setBooleanArgType('rounded', undefined, 'Rounded border radius')
  .setBooleanArgType('floating', undefined, 'Define with absolute position');

// Create individual story case.
export const Default: Case = createCase(WBadge, {
  content: 9
})
  .disableArg('top')
  .disableArg('right')
  .disableArg('bottom')
  .disableArg('left')
  .disableArg('floating')
  .setArg('rounded', false);

// Create individual story case.
export const Target: Case = createCase(WBadge, {
  content: `
    <span>New</span>
    <template #target>
      <span style="line-height: 32px">
        Target
      </span>
    </template>`
});

// Create individual story case.
export const Indicator: Case = createCase(WBadge, {
  content: `
    <template #target>
      Target
    </template>`
}).setArg('rounded', true);
