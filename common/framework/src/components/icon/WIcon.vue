<template lang="pug">
  svg.w-icon(
    v-if="isIconSvg()",
    xmlns="http://www.w3.org/2000/svg",
    viewBox="0 0 24 24")
    path(:d="name")
</template>

<script lang="ts" setup>
  import { stringProp, useGlobalConfig } from '../../composables';

  // Defines the props.
  const props = defineProps({
    name: stringProp(null, true)
  });

  // Composable to handle the Global Config.
  const { isIconSvg } = useGlobalConfig();
</script>

<style lang="sass" scoped>
  @use './WIcon' as *

  .w-icon
    display: block
    width: var(--icon-width, $icon__size)
    height: var(--icon-height, $icon__size)

    path
      fill: currentColor
</style>
