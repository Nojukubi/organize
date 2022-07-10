<template lang="pug">
  component.w-drawer(
    v-if="modelValue",
    :is="tag",
    :class="classCss",
    :style="styleCss")
    slot
</template>

<script lang="ts" setup>
  import { useLayout } from './compose';
  import type { CSSProperties } from 'vue';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      modelValue?: boolean;
      tag?: string;
      side?: 'left' | 'right';
      width?: number;
      widthUnit?: 'px' | 'em' | 'rem';
    }>(),
    {
      modelValue: true,
      tag: 'div',
      side: 'left',
      width: 256,
      widthUnit: 'px'
    }
  );

  // Composable to handle the Layout.
  const { layout, getBlockAreaClass } = useLayout();

  // Create the css styles based on the defined props.
  const styleCss: CSSProperties = $computed(
    (): CSSProperties => ({
      width: `${props.width}${props.widthUnit}`,
      [`margin-${props.side}`]: props.modelValue ? 0 : `-${props.width}${props.widthUnit}`
    })
  );

  // Create the class names based on the defined props.
  const classCss: (string | object)[] = $computed((): (string | object)[] => {
    return [`w-drawer--${props.side}`, getBlockAreaClass(props.side), { 'w-drawer--open': props.modelValue }];
  });
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-drawer
    will-change: margin
    transition: margin 1s
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
</style>
