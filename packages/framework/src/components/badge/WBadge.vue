<template lang="pug">
  component.w-badge(
    v-if="!$slots.target",
    :is="tag",
    :class="classCss")
    slot(name="default")

  .w-badge-target(v-else)
    slot(name="target")
    component.w-badge(
      :is="tag",
      :class="classCss")
      slot(name="default")
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue';
  import type { SetupContext } from 'vue';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      top?: boolean;
      right?: boolean;
      bottom?: boolean;
      left?: boolean;
      variant?: string;
      rounded?: boolean;
      floating?: boolean;
    }>(),
    {
      tag: 'div',
      variant: 'primary'
    }
  );

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Determine whether badge is dot.
  const isDot: boolean = $computed(() => {
    return !slots.default;
  });

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    return props.floating || !!slots.target;
  });

  // Create the class names based on the props.
  const classCss: (string | object)[] = $computed(() => [
    `w-badge--${props.variant}`,
    {
      'w-badge--dot': isDot,
      'w-badge--floating': isFloating,
      'w-badge--rounded': props.rounded,
      'w-badge--v-top': !isFloating && props.top,
      'w-badge--v-bottom': !isFloating && props.bottom,
      'w-badge--left': isFloating && props.left,
      'w-badge--bottom': isFloating && props.bottom,
      'w-badge--top': isFloating && (props.top || !props.bottom),
      'w-badge--right': isFloating && (props.right || !props.left)
    }
  ]);
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *
  @use '@stylize/sass-func/unit' as *
  @use '../../styles/variables' as *

  .w-badge
    font-size: var(--badge-font, $fs)
    padding: $offset-xs $offset-md
    min-width: 4px
    border-radius: var(--badge-radius, $radius-xs)
    +inline-flex-row-center

    &-target
      +relative
      display: inline-block

    &--dot
      min-height: 4px
      border-radius: 50%
      padding: $offset-xs

    &--primary
      color: var(--badge-color, $primary-color)
      background: var(--badge-bg, $primary-bg)

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
