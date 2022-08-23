<template lang="pug">
  component.w-drawer(
    v-if="props.modelValue",
    :is="props.tag",
    :class="cssClasses",
    :style="cssStyles")
    slot
</template>

<script lang="ts" setup>
  import { useLayout } from './composables';
  // prettier-ignore
  import { modelProp, stringProp, tagProp,
    borderProp, usePropsCssStyles, usePropsCssClasses,
    widthProp } from '../../composables';
  import type { CSSProperties } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...widthProp(),
    ...borderProp(),
    ...modelProp(Boolean, true),
    side: stringProp<'left' | 'right'>('left')
  });

  // Composable to handle the CSS Classes.
  const { borderCssClass } = $(usePropsCssClasses());

  // Composable to handle the CSS Styles.
  const { widthCssStyle } = $(usePropsCssStyles());

  // Composable to handle the Layout.
  const { layout, getBlockAreaClass } = useLayout();

  // Create the CSS styles based on context.
  const cssStyles: CSSProperties = $computed(
    (): CSSProperties => ({
      width: widthCssStyle,
      [`margin-${props.side}`]: props.modelValue ? 0 : `-${widthCssStyle}`
    })
  );

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    borderCssClass,
    `w-drawer--${props.side}`,
    getBlockAreaClass(props.side),
    { 'w-drawer--open': props.modelValue }
  ]);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use './WLayout' as *

  .w-drawer
    box-sizing: border-box
    will-change: margin
    transition: margin 0.5s
    transform: translateZ(0)
    background: var(--drawer-background, white)

    @for $row-start from 1 through 2
      @for $row-end from 3 through 4
        &--left
          &.area-#{$row-start}-#{$row-end}
            grid-area: #{$row-start} / 1 / #{$row-end} / 2

        &--right
          &.area-#{$row-start}-#{$row-end}
            grid-area: #{$row-start} / 3 / #{$row-end} / 4

    &--left#{&}--border,
    &--right#{&}--border
      border-style: solid
      border-color: $drawer__border-color

    &--left#{&}--border
      border-width: 0 1px 0 0

    &--right#{&}--border
      border-width: 0 0 0 1px
</style>
