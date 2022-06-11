<template lang="pug">
  .w-calendar-day(:class="classCss")
    slot
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { DayEntity } from './compose/useCalendar';
  import type { ComputedRef } from 'vue';

  // Defines the props.
  const props = defineProps<{
    day: DayEntity;
  }>();

  // Create the class names based on the day props.
  const classCss: ComputedRef = computed(() => {
    return { [`w-calendar-day--today`]: props.day.isToday, [`w-calendar-day--weekend`]: props.day.isWeekend };
  });
</script>

<style lang="sass" scoped>
  .w-calendar-day
    width: 40px
    height: 40px
    text-align: center
</style>
