<template lang="pug">
  component.w-button(
    :is="dynamicTag",
    :class="cssClasses",
    :disabled="props.disabled",
    v-bind="{ ...a11y, ...attrs, ...dynamicAttrs }")
    slot(name="default")
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  };
</script>

<script lang="ts" setup>
  import { useAttrs, useSlots } from 'vue';
  // prettier-ignore
  import { blockProp, cornerProp, disabledProp,
    sizeProp, stylingProp, stringProp,
    routeToProp, routeHrefProp, routeReplaceProp,
    routeTargetProp, usePropsCssClasses, usePropsLink,
    variantProp } from '../../composables';
  import type { Component, SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...sizeProp(),
    ...blockProp(),
    ...cornerProp(),
    ...disabledProp(),
    ...stylingProp(),
    ...variantProp(),
    ...routeToProp(),
    ...routeHrefProp(),
    ...routeTargetProp(),
    ...routeReplaceProp(),
    type: stringProp<'button' | 'submit' | 'reset'>('button')
  });

  // Default accessibility attrs.
  const a11y: Record<string, unknown> = {
    role: 'button'
  };

  // Composable to handle the Attrs.
  const attrs: SetupContext['attrs'] = useAttrs();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Composable to handle the Link Props.
  const { linkTag, linkAttrs } = $(usePropsLink());

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { blockCssClass, cornerCssClass,
    disabledCssClass, sizeCssClass, stylingCssClass,
    variantCssClass } = $(usePropsCssClasses());

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    blockCssClass,
    cornerCssClass,
    sizeCssClass,
    stylingCssClass,
    variantCssClass,
    disabledCssClass
  ]);

  // Determine the root tag based on context.
  const dynamicTag: Component | string = $computed(() => {
    return linkTag ?? 'button';
  });

  // Determine the dynamic attrs based on context.
  const dynamicAttrs: unknown = $computed(() => {
    return linkAttrs ?? (props.type !== 'button' ? { type: props.type } : {});
  });
</script>

<style lang="sass">
  @use '~@stylize/sass-mixin' as *
  @use '../variable' as *
  @use '../mixin' as *
  @use './WButton' as *

  .w-button
    cursor: pointer
    outline: none
    position: relative
    appearance: none
    user-select: none
    box-sizing: border-box
    text-decoration: none
    font-weight: var(--button-font-weight, $button__font-weight)
    line-height: var(--button-line-height, $button__line-height)
    +inline-flex-row-center

    +corner-tile
    +corner-circle
    +styling-flat
    +styling-plain
    +styling-outline
    +styling-elevate

    +support-hover
      +before
        +absolute-cover(-1px)

      &:hover:before
        opacity: 0.1
        background: currentColor
        border-radius: inherit

    &--block
      display: flex
      min-width: 100%

    &--disabled
      cursor: not-allowed
      pointer-events: none
      opacity: var(--button-disabled-opacity, $button-disabled__opacity)
      +before(null)

    &--small
      padding: var(--button-small-padding, $button-small__padding)
      font-size: var(--button-small-font-size, $button-small__font-size)
      min-height: var(--button-small-min-height, $min-height-xs)

    &--small#{&}--circle
      min-width: var(--button-small-min-width, $min-height-xs)

    &--small#{&}--pill
      border-radius: var(--button-small-pill-radius, $min-height-xs)

    &--small#{&}--round
      border-radius: var(--button-small-round-radius, $button-small__radius)

    &--normal
      padding: var(--button-normal-padding, $button-normal__padding)
      font-size: var(--button-normal-font-size, $button-normal__font-size)
      min-height: var(--button-normal-min-height, $min-height-sm)

    &--normal#{&}--circle
      min-width: var(--button-normal-min-width, $min-height-sm)

    &--normal#{&}--pill
      border-radius: var(--button-normal-pill-radius, $min-height-sm)

    &--normal#{&}--round
      border-radius: var(--button-normal-round-radius, $button-normal__radius)

    &--large
      padding: var(--button-large-padding, $button-large__padding)
      font-size: var(--button-large-font-size, $button-large__font-size)
      min-height: var(--button-large-min-height, $min-height-md)

    &--large#{&}--circle
      min-width: var(--button-large-min-width, $min-height-md)

    &--large#{&}--pill
      border-radius: var(--button-large-pill-radius, $min-height-md)

    &--large#{&}--round
      border-radius: var(--button-large-round-radius, $button-large__radius)

    &--primary#{&}--flat,
    &--primary#{&}--elevate
      color: var(--button-primary-color, var(--primary-color, $primary-color))
      background: var(--button-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--plain,
    &--primary#{&}--outline
      color: var(--button-primary-bg, var(--primary-bg, $primary-bg))

    &--standard#{&}--flat,
    &--standard#{&}--elevate
      color: var(--button-standard-color, var(--standard-color, $standard-color))
      background: var(--button-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--plain,
    &--standard#{&}--outline
      color: var(--button-standard-bg, var(--standard-bg, $standard-bg))

    &--success#{&}--flat,
    &--success#{&}--elevate
      color: var(--button-success-color, var(--success-color, $success-color))
      background: var(--button-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--plain,
    &--success#{&}--outline
      color: var(--button-success-bg, var(--success-bg, $success-bg))

    &--danger#{&}--flat,
    &--danger#{&}--elevate
      color: var(--button-danger-color, var(--danger-color, $danger-color))
      background: var(--button-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--plain,
    &--danger#{&}--outline
      color: var(--button-danger-bg, var(--danger-bg, $danger-bg))

    &--warning#{&}--flat,
    &--warning#{&}--elevate
      color: var(--button-warning-color, var(--warning-color, $warning-color))
      background: var(--button-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--plain,
    &--warning#{&}--outline
      color: var(--button-warning-bg, var(--warning-bg, $warning-bg))
</style>
