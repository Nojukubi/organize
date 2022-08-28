<template lang="pug">
  component.w-list-item-section(
    :is="props.tag",
    :class="cssClasses")
    slot(name="default")
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { bottomProp, leftProp, rightProp, tagProp,
    topProp, usePropsCssClasses } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...topProp(),
    ...rightProp(),
    ...bottomProp(),
    ...leftProp()
  });

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { bottomCssClass, leftCssClass, rightCssClass,
    topCssClass } = usePropsCssClasses();

  // Create the CSS classes based on context.
  const cssClasses: object = $computed(() => [
    topCssClass.value,
    rightCssClass.value,
    bottomCssClass.value,
    leftCssClass.value,
    { 'w-list-item-section--content': !props.left && !props.right }
  ]);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use 'WList' as *

  .w-list-item-section
    gap: $list-item-section__gap
    +flex-col(center)

    &--top
      align-self: flex-start

    &--bottom
      align-self: flex-end

    &--left
      justify-self: flex-start
      margin-right: $list-item-section__margin

    &--right
      justify-self: flex-end
      margin-left: $list-item-section__margin

    &--content
      width: auto
      min-width: 0
      max-width: 100%
      flex: 2 1 0

      & + &
        margin-left: $list-item-section__margin
</style>
