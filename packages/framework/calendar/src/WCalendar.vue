<template lang="pug">
  w-calendar-week(
    v-for="week in month.weeks",
    :week="week")
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import WCalendarWeek from './WCalendarWeek.vue';
  import { useCalendar } from './compose/useCalendar';
  import type { Locale } from 'date-fns';
  import type { MonthEntity } from './compose/useCalendar';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      month: number;
      year: number;
      locale?: Locale;
      firstDayOfWeek: number;
    }>(),
    {
      firstDayOfWeek: 0
    }
  );

  // Compose to handle the calendar.
  const { createMonth } = useCalendar();

  // Testing the month only for visualization.
  const month: MonthEntity = createMonth({ month: 5, year: 2022, firstDayOfWeek: props.firstDayOfWeek });
</script>
