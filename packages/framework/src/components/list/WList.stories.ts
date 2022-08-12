// prettier-ignore
import { Case, createStory, createCase,
  BaseConfig } from '@internal/storybook';
import WList from './WList.vue';
import WListItem from './WListItem.vue';
import WListItemText from './WListItemText.vue';
import WListItemSection from './WListItemSection.vue';

// Base meta configuration.
const baseConfig: BaseConfig = {
  component: WList,
  subcomponents: {
    WListItem,
    WListItemText,
    WListItemSection
  }
};

// prettier-ignore
// Create the story metadata.
export default createStory({ title: 'Framework/List/Wrapper', ...baseConfig })
  .setStringArgType('tag', { value: 'div', hint: 'Root html tag' })
  .setSelectArgType('direction', { value: 'vertical', options:
    ['vertical', 'horizontal'], hint: 'Items direction' })
  .setBooleanArgType('bordered', { value: true, hint: 'Border around list' })
  .setBooleanArgType('spacing', { hint: 'Spacing between items' });

// Create the individual case.
export const Wrapper: Case = createCase({
  ...baseConfig,
  content: `
    <component :is="WListItem" interactive active>
      Item 1
    </component>
    <component :is="WListItem" interactive>
      Item 2
    </component>
    <component :is="WListItem" interactive>
      Item 3
    </component>
  `
});
