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
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    label?: string;
    inline?: boolean;
    rounded?: boolean;
  }>();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Determine whether badge is inline.
  const isInline: boolean = $computed((): boolean => {
    return props.inline ? true : !slots.target;
  });

  // Create the class names based on the props.
  const classCss: object = $computed((): object => ({
    'w-badge--inline': isInline,
    'w-badge--rounded': props.rounded,
    'w-badge--v-top': isInline && props.top,
    'w-badge--v-bottom': isInline && props.bottom,
    'w-badge--left': !isInline && props.left,
    'w-badge--bottom': !isInline && props.bottom,
    'w-badge--top': !isInline && (props.top || !props.bottom),
    'w-badge--right': !isInline && (props.right || !props.left)
  }));
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *

  .w-badge
    +absolute($z: 1)
    display: inline-flex
    padding: 3px 6px
    border-radius: 4px
    color: var(--badge-color, white)
    font-size: var(--badge-font, 12px)
    background: var(--badge-bg, #1976d2)

    &-target
      +relative
      display: inline-block

    &--inline
      position: relative

    &--rounded
      border-radius: 14px

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
