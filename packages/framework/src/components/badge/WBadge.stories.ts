import { Case, createStory, Story } from '@internal/storybook';
import WBadge from './WBadge.vue';

// Create the metadata with general information.
const story: Story = createStory('Framework/Badge', WBadge)
  .setBooleanArgType('top', false, 'Absolute align top')
  .setBooleanArgType('right', false, 'Absolute align right')
  .setBooleanArgType('left', false, 'Absolute align left')
  .setBooleanArgType('bottom', false, 'Absolute align bottom')
  .setBooleanArgType('rounded', false, 'Rounded border radius')
  .setBooleanArgType('floating', false, 'Define with absolute position');

// Story
const Dot: Case = story
  .createCase()
  // Disable redundant arg.
  .disableArg('floating');

// Story
const Default: Case = story
  .createCase({ content: 9 })
  // Disable redundant arg.
  .disableArg('floating');

// Story
const Target: Case = story.createCase({
  content: `
    <span>New</span>
    <template #target>
      <span style="line-height: 24px">
        Target
      </span>
    </template>`
});

export default story;
export { Dot, Default, Target };
