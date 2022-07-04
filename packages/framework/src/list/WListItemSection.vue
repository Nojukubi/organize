<template lang="pug">
  component.w-list-item-section(
    :is="tag",
    :class="classCss")
    slot
</template>

<script lang="ts" setup>
  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      left?: boolean;
      right?: boolean;
    }>(),
    {
      tag: 'div'
    }
  );

  // Create the class names based on the defined props.
  const classCss: object = $computed((): object => ({
    'w-list-item-section--left': props.left,
    'w-list-item-section--right': props.right,
    'w-list-item-section--content': !props.left && !props.right
  }));
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-list-item-section
    +flex-col(center)

    &--left
      justify-self: flex-start
      margin-right: 12px

    &--right
      justify-self: flex-end
      margin-left: 12px

    &--content
      width: auto
      min-width: 0
      max-width: 100%
      flex: 2 1 0

      & + &
        margin-left: 8px
</style>
