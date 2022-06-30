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
    inline?: boolean;
    left?: boolean;
    bottom?: boolean;
    rounded?: boolean;
  }>();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Determine whether badge is inline.
  const isInline: boolean = $computed((): boolean => {
    return props.inline ? true : !slots.target;
  });

  // Create the class names based on the defined props.
  const classCss: object = $computed((): object => ({
    'w-badge--inline': isInline,
    'w-badge--rounded': props.rounded,
    'w-badge--left': !isInline && props.left,
    'w-badge--bottom': !isInline && props.bottom
  }));
</script>

<style lang="sass" scoped>
  @use '../node_modules/@stylize/sass-mixin/index' as *

  .w-badge
    display: inline-flex
    font-size: 12px
    color: var(--badge-color, white)
    padding: 3px 6px
    border-radius: 4px
    background: var(--badge-bg, #1976d2)
    +absolute($z: 1)

    &--inline
      position: relative

    &--rounded
      border-radius: 14px

    :not(&--inline)
      top: 0
      right: 0

    &--left
      right: auto
      left: 0

    &--bottom
      top: auto
      bottom: 0

    &-target
      +relative
</style>
