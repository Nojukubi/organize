// prettier-ignore
import { Case, createCase,
  createStory } from '@internal/storybook';
import WButton from './WButton.vue';

// prettier-ignore
// Create the story metadata.
export default createStory({ title: 'Framework/Button', component: WButton })
  .setStringArgType('href', { hint: 'Link href' })
  .setSelectArgType('size', { value: 'normal', options:
    ['small', 'normal', 'large'], hint: 'Size type' })
  .setSelectArgType('variant', { value: 'primary', options: ['primary',
    'standard', 'success', 'danger', 'warning'], hint: 'Variant name' })
  .setSelectArgType('styling', { value: 'flat', options:
    ['flat', 'outline', 'elevate', 'plain'], hint: 'Styling name' })
  .setSelectArgType('corner', { value: 'tile', options:
    ['tile', 'pill', 'circle', 'round'], hint: 'Border radius' })
  .setSelectArgType('type', { value: 'button', options:
    ['button', 'submit', 'reset'], hint: 'Button type' })
  .setBooleanArgType('block', { hint: 'As block element' })
  .setBooleanArgType('disabled', { hint: 'Disable the control' });

// Create the individual case.
export const Button: Case = createCase({
  component: WButton,
  content: '{{ args.variant }}'
});
