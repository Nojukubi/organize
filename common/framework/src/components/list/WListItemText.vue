<template lang="pug">
  component.w-list-item-text(
    :is="props.tag",
    :class="cssClasses",
    :style="cssStyles")
    slot(name="default")
</template>

<script lang="ts" setup>
  import { boolProp, prop, tagProp } from '../../composables';
  import type { CSSProperties } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    header: boolProp(),
    caption: boolProp(),
    overline: boolProp(),
    lines: prop<string | number>([String, Number])
  });

  // Create the CSS classes based on context.
  const cssClasses: object = $computed(() => ({
    'w-list-item-text--header': props.header,
    'w-list-item-text--caption': props.caption,
    'w-list-item-text--overline': props.overline
  }));

  // Amount of lines; default is unlimited.
  const lineAmount: number = $computed(() => +(props.lines ?? 0));

  // Create the CSS styles based on context.
  const cssStyles: CSSProperties | null = $computed(() =>
    lineAmount > 1 ? { ...webkitBox(), '-webkit-line-clamp': lineAmount } : null
  );

  // Create the webkit CSS properties to cut the lines.
  function webkitBox(): CSSProperties {
    return { 'overflow': 'hidden', 'display': '-webkit-box', '-webkit-box-orient': 'vertical' };
  }
</script>

<style lang="sass" scoped>
  @use 'WList' as *

  .w-list-item-text
    color: $list-item-text__color

    &--header
      text-transform: uppercase
      color: $list-item-text-header__color
      margin: $list-item-text-header__margin
      letter-spacing: $list-item-text-header__spacing

    &--caption
      color: $list-item-text-caption__color
      letter-spacing: $list-item-text-caption__spacing

    &--overline
      color: $list-item-text-overline__color
      letter-spacing: $list-item-text-overline__spacing
</style>
