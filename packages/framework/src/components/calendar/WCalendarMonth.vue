<template lang="pug">
  .w-calendar-month
    .w-calendar-month__header
      | {{ month.label }}
    w-calendar-weekdays(
      v-if="month.weekdays",
      :weekdays="month.weekdays")
    w-calendar-week(
      v-for="(week, index) in month.weeks",
      :key="index",
      :week="week")
      template(
        #day="day",
        v-if="$slots.day")
        slot(
          name="day",
          v-bind="day")
</template>

<script lang="ts" setup>
  import WCalendarWeek from './WCalendarWeek.vue';
  import WCalendarWeekdays from './WCalendarWeekdays.vue';
  import type { MonthEntity } from './compose';

  // Defines the props.
  const props = defineProps<{
    month: MonthEntity;
  }>();
</script>

<style lang="sass" scoped>
  .w-calendar-month
    &__header
      text-align: center
</style>
