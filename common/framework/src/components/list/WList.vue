<template lang="pug">
  component.w-list(
    :is="props.tag",
    :class="cssClasses")
    slot(name="default")
</template>

<script lang="ts" setup>
  import { provide, useSlots } from 'vue';
  // prettier-ignore
  import { boolProp, borderProp, directionProp,
    tagProp, usePropsCssClasses } from '../../composables';
  import type { SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...borderProp(),
    ...directionProp(),
    spacing: boolProp()
  });

  // Provide the config to items.
  provide('listConfig', props);

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { borderCssClass,
    directionCssClass } = $(usePropsCssClasses());

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    borderCssClass,
    directionCssClass,
    { 'w-list--spacing': props.spacing }
  ]);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use './WList' as *

  .w-list
    &--spacing
      gap: $list__gap

    &--vertical
      +flex-col

    &--horizontal
      +flex-row

    &--border
      border-style: solid
      border-width: $list__border-width
      border-color: var(--list-border-color, $list__border-color)
</style>
