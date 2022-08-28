<template lang="pug">
  component.w-overlay(
    :is="props.tag",
    :class="cssClasses")
    .w-overlay__backdrop(@click="emits('click', $event)")
    slot(name="default")
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { absoluteProp, tagProp, transparentProp,
    usePropsCssClasses } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...absoluteProp(),
    ...transparentProp()
  });

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'click', evt: MouseEvent): void;
  }>();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { absoluteCssClass,
    transparentCssClass } = usePropsCssClasses();

  // prettier-ignore
  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    absoluteCssClass.value,
    transparentCssClass.value
  ]);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use './WOverlay' as *

  .w-overlay
    display: grid
    border-radius: inherit

    &--absolute
      +absolute-cover($z: 2)

    &:not(&--absolute)
      +fixed-cover($z: 2)

    &__backdrop
      +absolute-cover($z: -1)
      border-radius: inherit
      opacity: $overlay__opacity
      background: $overlay__bg
</style>
