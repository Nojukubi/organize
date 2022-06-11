<template lang="pug">
  .w-calendar-week
    w-calendar-day(
      v-for="day in week.days",
      :day="day")
      | {{ day.number }}
</template>

<script lang="ts" setup>
  import WCalendarDay from './WCalendarDay.vue';
  import type { WeekEntity } from './compose/useCalendar';

  // Defines the props.
  const props = defineProps<{
    week: WeekEntity;
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-week
    +flex-row
</style>
