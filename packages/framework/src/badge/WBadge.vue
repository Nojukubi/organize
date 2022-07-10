<template lang="pug">
  .w-badge(
    v-if="!$slots.target",
    :class="classCss")
    slot(name="default")

  .w-badge-target(v-else)
    slot(name="target")
    .w-badge(:class="classCss")
      slot(name="default")
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue';
  import type { SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps<{
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    rounded?: boolean;
    floating?: boolean;
  }>();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Determine whether badge is floating.
  const isFloating: boolean = $computed((): boolean => {
    return props.floating || !!slots.target;
  });

  // Create the class names based on the props.
  const classCss: object = $computed((): object => ({
    'w-badge--floating': isFloating,
    'w-badge--rounded': props.rounded,
    'w-badge--v-top': !isFloating && props.top,
    'w-badge--v-bottom': !isFloating && props.bottom,
    'w-badge--left': isFloating && props.left,
    'w-badge--bottom': isFloating && props.bottom,
    'w-badge--top': isFloating && (props.top || !props.bottom),
    'w-badge--right': isFloating && (props.right || !props.left)
  }));
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *
  @use '@stylize/sass-func/unit' as *

  .w-badge
    color: var(--badge-color, white)
    font-size: var(--badge-font, rem(12px))
    background: var(--badge-bg, #1976d2)
    padding: rem(2px) rem(6px)
    min-width: rem(4px)
    border-radius: 4px
    +inline-flex-row-center

    &-target
      +relative
      display: inline-block

    &--floating
      +absolute($z: 1)

    &--rounded
      border-radius: 1.25em

    &--top
      top: -50%

    &--right
      right: -50%

    &--left
      left: -50%

    &--bottom
      bottom: -50%

    &--v-top
      vertical-align: top

    &--v-bottom
      vertical-align: bottom
</style>
