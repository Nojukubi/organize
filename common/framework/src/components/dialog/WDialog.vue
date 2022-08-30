<template lang="pug">
  w-overlay(
    :absolute="props.absolute",
    :transparent="!props.overlay",
    @click="outsideClick")
    component.w-dialog(
      :is="props.tag",
      :class="cssClasses")
      slot(name="default")
</template>

<script lang="ts" setup>
  import { WOverlay } from '../overlay';
  // prettier-ignore
  import { absoluteProp, boolProp, bottomProp, heightProp,
    modelProp, leftProp, rightProp, tagProp, topProp,
    widthProp, usePropsCssClasses } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...topProp(),
    ...rightProp(),
    ...bottomProp(),
    ...leftProp(),
    ...widthProp(),
    ...heightProp(),
    ...absoluteProp(),
    ...modelProp(Boolean, false),
    overlay: boolProp(true)
  });

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'close'): void;
    (e: 'update:modelValue', value: boolean): void;
  }>();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { absoluteCssClass, topCssClass, leftCssClass,
    rightCssClass, bottomCssClass } = $(usePropsCssClasses());

  // Create the CSS classes based on context.
  const cssClasses: object = $computed(() => [
    absoluteCssClass,
    topCssClass,
    rightCssClass,
    bottomCssClass,
    leftCssClass
  ]);

  // Handler to emit events on click.
  function outsideClick(): void {
    emits('close');
    emits('update:modelValue', !props.modelValue);
  }
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-dialog
    align-self: center
    justify-self: center

    &--top
      justify-self: flex-start

    &--right
      align-self: flex-end

    &--bottom
      justify-self: flex-end

    &--left
      align-self: flex-start
</style>
