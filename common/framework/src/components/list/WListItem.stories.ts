// prettier-ignore
import { Case, createStory, createCase,
  BaseConfig } from '@internal/storybook';
import WList from './WList.vue';
import WListItem from './WListItem.vue';
import WListItemText from './WListItemText.vue';
import WListItemSection from './WListItemSection.vue';

// Base meta configuration.
const baseConfig: BaseConfig = {
  component: WListItem,
  subcomponents: {
    WList,
    WListItemText,
    WListItemSection
  }
};

// Create the metadata for story.
export default createStory({ title: 'Framework/List/Item', ...baseConfig })
  .setStringArgType('tag', { value: 'div', hint: 'Root html tag' })
  .setBooleanArgType('active', { hint: 'Active state' })
  .setSelectArgType('corner', { value: 'tile', options: ['tile', 'pill', 'round'], hint: 'Border radius' })
  .setBooleanArgType('border', { value: true, hint: 'Border at item' })
  .setBooleanArgType('disabled', { hint: 'Disable state' })
  .setBooleanArgType('interactive', { hint: 'Mark as interactive' });

// Create individual story case.
export const Item: Case = createCase({
  ...baseConfig,
  template: `
    <component :is="WList" style="max-width: 400px">
      <component :is="target">
        <component :is="WListItemText" header>
          Messages
        </component>
      </component>
      <component :is="target" v-bind="args">
        ${createItemTpl(2)}
      </component>
      <component :is="target">
        ${createItemTpl(3)}
      </component>
    </component>`
});

// Helper to create the common list item.
function createItemTpl(lines: number): string {
  return `
    <component :is="WListItemSection">
      <component :is="WListItemText">
        Item with ${lines} lines
      </component>

      <component :is="WListItemText" lines="${lines}" caption>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </component>
    </component>

    <component :is="WListItemSection" top right>
      <component :is="WListItemText" caption>
        ${lines} min ago
      </component>
    </component>`;
}
