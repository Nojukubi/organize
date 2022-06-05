<template lang="pug">
  component.w-drawer(
    :is="tag",
    :class="classCss",
    :style="styleCss")
    slot
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useLayout } from '../compose';
  import type { ComputedRef, CSSProperties } from 'vue';

  // Defines the props.
  const props = defineProps({
    tag: {
      type: String,
      default: 'div'
    },
    side: {
      type: String,
      default: 'left'
    },
    width: {
      type: Number,
      default: 256
    },
    widthUnit: {
      type: String,
      default: 'px'
    }
  });

  // Composable to handle the Layout.
  const { getBlockAreaClass } = useLayout();

  // Create the class names based on the defined props.
  const classCss: ComputedRef<string[]> = computed((): string[] => {
    return [`w-drawer--${props.side}`, getBlockAreaClass(props.side)];
  });

  // Create the css styles based on the defined props.
  const styleCss: ComputedRef<CSSProperties> = computed((): CSSProperties => {
    return { width: `${props.width}${props.widthUnit}` };
  });
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *

  .w-drawer
    transition: margin 2s
    background: lightgrey

    +media('>=md')
      margin: 0

    @for $row-start from 1 through 2
      @for $row-end from 3 through 4
        &--left
          &.area-#{$row-start}-#{$row-end}
            grid-area: #{$row-start} / 1 / #{$row-end} / 2

        &--right
          &.area-#{$row-start}-#{$row-end}
            grid-area: #{$row-start} / 3 / #{$row-end} / 4
</style>
