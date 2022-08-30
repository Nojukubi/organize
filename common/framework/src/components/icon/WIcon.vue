<template lang="pug">
  svg.w-icon(
    v-if="isSvgPath",
    :class="cssClasses",
    xmlns="http://www.w3.org/2000/svg",
    viewBox="0 0 24 24")
    path(:d="name")
  i.w-icon(
    v-else,
    :class="[name, cssClasses]")
</template>

<script lang="ts">
  const svgRegExp: RegExp = /^M\d+/;
  export default {};
</script>

<script lang="ts" setup>
  // prettier-ignore
  import { sizeProp, stringProp,
    usePropsCssClasses } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...sizeProp(),
    name: stringProp(null, true)
  });

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { sizeCssClass } = $(usePropsCssClasses());

  // Determine whether the icon is svg path.
  const isSvgPath: boolean = $computed(() => {
    return svgRegExp.test(props.name ?? '');
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [sizeCssClass]);
</script>

<style lang="sass" scoped>
  @use './WIcon' as *

  .w-icon
    display: block

    path
      fill: currentColor

    &--small
      width: var(--icon-small-width, $icon-small__size)
      height: var(--icon-small-height, $icon-small__size)

    &--normal
      width: var(--icon-normal-width, $icon-normal__size)
      height: var(--icon-normal-height, $icon-normal__size)

    &--large
      width: var(--icon-large-width, $icon-large__size)
      height: var(--icon-large-height, $icon-large__size)
</style>
