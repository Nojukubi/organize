<template lang="pug">
  .w-calendar-nav
    .w-calendar-nav__item.prev(@click="emits('prev')")
      | prev
    .w-calendar-nav__item.next(@click="emits('next')")
      | next
</template>

<script lang="ts" setup>
  // Defines the emits.
  const emits = defineEmits<{
    (e: 'next'): void;
    (e: 'prev'): void;
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-nav
    height: 0
    +flex-row($main: space-between)

    &__item
      cursor: pointer
</style>
