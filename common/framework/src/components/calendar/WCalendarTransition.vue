<template lang="pug">
  transition-group(:name="anim")
    slot
</template>

<script lang="ts" setup>
  // Defines the props.
  const props = defineProps<{
    name?: string;
  }>();

  // Compute transition animation name.
  const anim: string = $computed((): string => {
    return `w-calendar-${props.name}`;
  });
</script>

<style lang="sass">
  @use '~@stylize/sass-mixin' as *

  @at-root :root
    --slide-timing: ease
    --slide-duration: 0.15s
    --slide-translate: 25px

  .w-calendar-slide-left-enter-active,
  .w-calendar-slide-left-leave-active,
  .w-calendar-slide-right-enter-active,
  .w-calendar-slide-right-leave-active
    transition: transform var(--slide-duration) var(--slide-timing), opacity var(--slide-duration) var(--slide-timing)
    backface-visibility: hidden
    pointer-events: none

  .w-calendar-slide-left-leave-active,
  .w-calendar-slide-right-leave-active
    position: absolute
    width: 100%

  .w-calendar-slide-left-enter-from,
  .w-calendar-slide-left-leave-to,
  .w-calendar-slide-right-enter-from,
  .w-calendar-slide-right-leave-to
    opacity: 0

  .w-calendar-slide-left-enter-from,
  .w-calendar-slide-right-leave-to
    transform: translateX(var(--slide-translate))

  .w-calendar-slide-right-enter-from,
  .w-calendar-slide-left-leave-to
    transform: translateX(calc(-1 * var(--slide-translate)))
</style>
