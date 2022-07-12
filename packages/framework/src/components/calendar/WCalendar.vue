<template lang="pug">
  .w-calendar
    w-calendar-nav.w-calendar__nav(
      @next="goNext",
      @prev="goPrev")
    WCalendarTransition(:name="anim")
      template(v-for="(months, id) in views")
        w-calendar-view(
          v-if="id === activeViewId",
          :style="viewStyleCss",
          :key="id",
          :months="months")
          template(
            #day="day",
            v-if="$slots.day")
            slot(
              name="day",
              v-bind="day")
</template>

<script lang="ts" setup>
  import addMonths from 'date-fns/addMonths';
  import subMonths from 'date-fns/subMonths';
  import { shallowReactive, watch } from 'vue';
  import WCalendarNav from './WCalendarNav.vue';
  import WCalendarView from './WCalendarView.vue';
  import WCalendarTransition from './WCalendarTransition.vue';
  import { useCalendar } from './compose';
  import type { Locale } from 'date-fns';
  import type { CSSProperties } from 'vue';
  import type { MonthEntity } from './compose';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      rows?: number;
      cols?: number;
      from?: Date;
      min?: Date;
      max?: Date;
      locale?: Locale;
      monthFormat?: string;
      weekdayFormat?: string;
      firstDayOfWeek?: number;
    }>(),
    {
      rows: 1,
      cols: 1,
      monthFormat: 'MMMM yyyy',
      weekdayFormat: 'cccccc',
      firstDayOfWeek: 1
    }
  );

  // Compose to handle the calendar.
  const { createMonth, createMonthId } = useCalendar();

  // Animation for switching the calendar.
  let anim: string = $ref('none');

  // Number of months to display in the view.
  const viewSize: number = $computed((): number => {
    return props.rows * props.cols;
  });

  // Views which need to support the animation.
  const views: Record<string, MonthEntity[]> = shallowReactive({});

  // Cache of the months to improve performance.
  const monthsCache: Record<string, MonthEntity> = {};

  // Cache of the months to improve performance.
  const viewStyleCss: CSSProperties = $computed(
    (): CSSProperties => ({
      gridTemplateColumns: `repeat(${props.cols}, 1fr)`
    })
  );

  // First month of the currently active view.
  let activeViewMonth: Date = $ref(new Date());

  // All months included to currently active view.
  const activeViewMonths: MonthEntity[] = $computed((): MonthEntity[] =>
    Array.from({ length: viewSize }).map(
      (_: unknown, index: number): MonthEntity =>
        createData({
          date: addMonths(activeViewMonth, index)
        })
    )
  );

  // Unique id of currently active view based on months.
  const activeViewId: string = $computed((): string =>
    // prettier-ignore
    createMonthId(activeViewMonths[0].date).concat(':period:',
      createMonthId(activeViewMonths[viewSize - 1].date))
  );

  // prettier-ignore
  // Watch the active months and add it to the view.
  watch((): MonthEntity[] => activeViewMonths, watchActiveViewMonths,
    { immediate: true });

  // Handle to watch the changes to active view months.
  function watchActiveViewMonths(newActiveMonths: MonthEntity[]): void {
    views[activeViewId] = newActiveMonths;
  }

  function createData(options: { date: Date }): MonthEntity {
    const monthId = createMonthId(options.date);

    if (!monthsCache[monthId])
      monthsCache[monthId] = createMonth({
        locale: props.locale,
        monthFormat: props.monthFormat,
        weekdayFormat: props.weekdayFormat,
        firstDayOfWeek: props.firstDayOfWeek,
        ...options
      });

    return monthsCache[monthId];
  }

  function goNext(): void {
    anim = 'slide-left';
    activeViewMonth = addMonths(activeViewMonth, viewSize);
  }

  function goPrev(): void {
    anim = 'slide-right';
    activeViewMonth = subMonths(activeViewMonth, viewSize);
  }
</script>

<style lang="sass">
  @use '~@stylize/sass-mixin' as *

  .w-calendar
    overflow: hidden
    width: max-content
    position: relative

    &__nav
      +absolute(0, 0, null, 0)

    &__view
      display: grid
</style>
