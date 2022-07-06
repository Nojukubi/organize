import { Case, createStory, Story } from '@internal/storybook';
import WBadge from './WBadge.vue';

// Create the story metadata to cover Badge component.
const story: Story = createStory('Framework/Badge', WBadge)
  .setBooleanArg('top', false, 'Absolute align top')
  .setBooleanArg('right', false, 'Absolute align right')
  .setBooleanArg('left', false, 'Absolute align left')
  .setBooleanArg('bottom', false, 'Absolute align bottom')
  .setBooleanArg('rounded', false, 'Rounded border radius')
  .setBooleanArg('floating', false, 'Define with absolute position');

// Story 1: Default state of Badge with plain content.
const Default: Case = story.createCase({ content: 9 }).disableArg('floating');

// Story 2: Badge which wraps the content with target.
const Target: Case = story.createCase({
  content: `
    <span>New</span>
    <template #target>
      <span>Target</span>
    </template>`
});

export default story;
export { Default, Target };
