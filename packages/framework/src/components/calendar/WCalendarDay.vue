<template lang="pug">
  .w-calendar-day(:class="classCss")
    // Allows to define custom content of component with
    // data binding, which you can do with named slots.
    slot(
      name="custom",
      v-if="$slots.custom",
      v-bind="day")

    // Defaut content used by component to render day.
    template(v-else)
      .w-calendar-day__content(
        role="button",
        tabindex="-1",
        :aria-label="day.label",
        :aria-disabled="day.isDisabled")
        slot(name="default")
</template>

<script lang="ts" setup>
  import type { DayEntity } from './compose';

  // Defines the props.
  const props = defineProps<{
    day: DayEntity;
  }>();

  // Create the class names based on the day props.
  const classCss: object = $computed((): object => ({
    [`w-calendar-day--today`]: props.day.isToday,
    [`w-calendar-day--weekend`]: props.day.isWeekend,
    [`w-calendar-day--disabled`]: props.day.isDisabled,
    [`w-calendar-day--out-of-range`]: props.day.isOutOfRange
  }));
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-calendar-day
    $root: &
    +flex-row
    position: relative
    text-align: center
    width: var(--day-width, 40px)
    height: var(--day-height, 40px)

    &__content
      flex: 1 0 0
      cursor: pointer
      +flex-col-center

    &--weekend
      #{$root}__content
        color: var(--day-weekend-color, DimGrey)

    &--out-of-range
      #{$root}__content
        color: var(--day-out-of-range-color, LightGrey)
</style>
