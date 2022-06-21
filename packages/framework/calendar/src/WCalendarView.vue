<template lang="pug">
  .w-calendar-view
    w-calendar-month(
      v-for="month in months",
      :key="month.date.getMonth()",
      :month="month")
      template(
        #day="day",
        v-if="$slots.day")
        slot(
          name="day",
          v-bind="day")
</template>

<script lang="ts" setup>
  import WCalendarMonth from './WCalendarMonth.vue';
  import type { MonthEntity } from './compose';

  // Defines the props.
  const props = defineProps<{
    months: MonthEntity[];
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-view
    display: grid
</style>
