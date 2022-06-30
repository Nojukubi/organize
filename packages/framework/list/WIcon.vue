<template lang="pug">
  svg.w-icon(
    xmlns="http://www.w3.org/2000/svg",
    viewBox="0 0 24 24",
    role="img",
    aria-hidden="true")
    path(:d="icons[`mdi${name}`]")
</template>

<script lang="ts" setup>
  import * as icons from '@mdi/js';

  // Defines the props.
  const props = defineProps<{
    name: string;
  }>();
</script>

<style lang="sass" scoped>
  .w-icon
    display: block
    width: var(--icon-width, 24px)
    height: var(--icon-height, 24px)
</style>
