<template lang="pug">
  .w-calendar-week
    w-calendar-day(
      v-for="day in week",
      :key="day.label",
      :day="day",
      @click="emits('dayClick', day)")
      // Default slot.
      template(
        #default,
        v-if="!$slots.day")
        | {{ day.date.getDate() }}

      // Custom slot.
      template(
        #custom="day",
        v-else)
        slot(
          name="day",
          v-bind="day")
</template>

<script lang="ts" setup>
  import WCalendarDay from './WCalendarDay.vue';
  import type { DayEntity } from './compose';

  // Defines the props.
  const props = defineProps<{
    week: DayEntity[];
  }>();

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'dayClick', day: DayEntity): void;
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-week
    +flex-row
</style>
