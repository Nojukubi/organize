import { createStory, Meta, StoryFn } from '@internal/storybook';
import WBadge from './WBadge.vue';

// Metadata with general config.
const meta: Meta = {};

// Title (path) to the story.
meta.title = 'Framework/Badge';

//
meta.component = WBadge;

meta.args = {
  top: false,
  right: false,
  left: false,
  bottom: false,
  inline: false,
  rounded: false
};

meta.argTypes = {
  top: {
    type: 'boolean',
    description: 'Align top'
  },
  right: {
    type: 'boolean',
    description: 'Align right'
  },
  left: {
    type: 'boolean',
    description: 'Align left'
  },
  bottom: {
    type: 'boolean',
    description: 'Align bottom'
  },
  inline: {
    type: 'boolean',
    description: 'Make display inline'
  },
  rounded: {
    type: 'boolean',
    description: 'Rounded border radius'
  }
};

const Inline: StoryFn = createStory(WBadge, {
  content: 1
});

const Target: StoryFn = createStory(WBadge, {
  content: `
    <span>New</span>
    <template #target>
      <span style="line-height: 30px">
        Target
      </span>
    </template>
  `
});
Target.args = {
  left: false,
  bottom: false,
  inline: false,
  rounded: false
};

export { meta, Inline, Target };
