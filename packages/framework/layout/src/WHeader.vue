<template lang="pug">
  header.w-header(:class="classCss")
    slot
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useLayout } from './compose';
  import type { ComputedRef } from 'vue';

  // Composable to handle the Layout.
  const { getBlockAreaClass } = useLayout();

  // Create the class name based on the defined layout blocks.
  const classCss: ComputedRef<string> = computed(getBlockAreaClass.bind(null, 'header'));
</script>

<style lang="sass" scoped>
  .w-header
    @for $col-start from 1 through 2
      @for $col-end from 3 through 4
        &.area-#{$col-start}-#{$col-end}
          grid-area: 1 / #{$col-start} / 2 / #{$col-end}
</style>
