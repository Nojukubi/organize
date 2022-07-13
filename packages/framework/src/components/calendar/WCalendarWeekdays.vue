<template lang="pug">
  .w-calendar-weekdays
    .w-calendar-weekdays__item(
      v-for="weekday in weekdays",
      :key="weekday")
      | {{ weekday }}
</template>

<script lang="ts" setup>
  // Defines the props.
  const props = defineProps<{
    weekdays: string[];
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-weekdays
    +flex-row

    &__item
      +flex-col-center
      width: var(--day-width, 40px)
      height: var(--day-height, 40px)
</style>
