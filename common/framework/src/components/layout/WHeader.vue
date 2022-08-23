<template lang="pug">
  header.w-header(
    v-if="layout.blocks.header.enabled",
    :class="cssClasses")
    slot
</template>

<script lang="ts" setup>
  import { useLayout } from './composables';
  import { borderProp, usePropsCssClasses } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...borderProp()
  });

  // Composable to handle the CSS Classes.
  const { borderCssClass } = $(usePropsCssClasses());

  // Composable to handle the Layout.
  const { layout, getBlockAreaClass } = useLayout();

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [borderCssClass, getBlockAreaClass('header')]);
</script>

<style lang="sass" scoped>
  @use '../variable' as *
  @use './WLayout' as *

  .w-header
    height: var(--header-height, 40px)

    @for $col-start from 1 through 2
      @for $col-end from 3 through 4
        &.area-#{$col-start}-#{$col-end}
          grid-area: 1 / #{$col-start} / 2 / #{$col-end}

    &--border
      border-style: solid
      border-width: 0 0 1px 0
      border-color: var(--header-border-color, $header__border-color)
</style>
