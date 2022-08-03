<template lang="pug">
  component.w-button(
    :is="dynamicTag",
    :class="cssClasses",
    :disabled="props.disabled",
    v-bind="{ ...a11y, ...dynamicAttrs, ...attrs }")
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
  import { blockProp, borderProp, cornerProp,
    disabledProp, sizeProp, stylingProp, stringProp,
    routeToProp, routeHrefProp, routeReplaceProp,
    routeTargetProp, usePropsCssClasses, usePropsLink,
    variantProp } from '../../composables';
  import type { Component, SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...sizeProp(),
    ...blockProp(),
    ...cornerProp(),
    ...borderProp(),
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
  const { linkTag, linkAttrs } = usePropsLink();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { blockCssClass, borderCssClass, cornerCssClass,
    disabledCssClass, sizeCssClass, stylingCssClass,
    variantCssClass } = usePropsCssClasses();

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    sizeCssClass.value,
    blockCssClass.value,
    cornerCssClass.value,
    borderCssClass.value,
    disabledCssClass.value,
    stylingCssClass.value,
    variantCssClass.value
  ]);

  // Determine the root tag based on context.
  const dynamicTag: Component | string = $computed(() => {
    return linkTag.value ?? 'button';
  });

  // Determine the dynamic attrs based on context.
  const dynamicAttrs: unknown = $computed(() =>
    linkAttrs.value ?? props.type !== 'button' ? { type: props.type } : {}
  );
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *
  @use '../../styles/vars' as *
  @use '../../styles/mixin' as *
  @use './WButton' as *

  .w-button
    cursor: pointer
    outline: none
    appearance: none
    position: relative
    user-select: none
    box-sizing: border-box
    text-decoration: none
    font-weight: var(--button-font-weight, $button__font-weight)
    line-height: var(--button-line-height, $button__line-height)
    border-radius: var(--button-border-radius, $button__radius)
    +inline-flex-col-center

    +tile
    +circle
    +styling-flat
    +styling-plain
    +styling-outlined
    +styling-elevated

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

    &--small#{&}--round
      border-radius: var(--button-small-border-radius, $min-height-xs)

    &--normal
      padding: var(--button-normal-padding, $button-normal__padding)
      font-size: var(--button-normal-font-size, $button-normal__font-size)
      min-height: var(--button-normal-min-height, $min-height-sm)

    &--normal#{&}--circle
      min-width: var(--button-normal-min-width, $min-height-sm)

    &--normal#{&}--round
      border-radius: var(--button-normal-border-radius, $min-height-sm)

    &--large
      padding: var(--button-large-padding, $button-large__padding)
      font-size: var(--button-large-font-size, $button-large__font-size)
      min-height: var(--button-large-min-height, $min-height-md)

    &--normal#{&}--circle
      min-width: var(--button-large-min-width, $min-height-md)

    &--large#{&}--round
      border-radius: var(--button-large-border-radius, $min-height-md)

    &--primary#{&}--flat,
    &--primary#{&}--elevated
      color: var(--button-primary-color, var(--primary-color, $primary-color))
      background: var(--button-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--plain,
    &--primary#{&}--outlined
      color: var(--button-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--border
      border-color: var(--button-primary-border-color, var(--primary-bg, darken($primary-bg, 10%)))

    &--standard#{&}--flat,
    &--standard#{&}--elevated
      color: var(--button-standard-color, var(--standard-color, $standard-color))
      background: var(--button-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--plain,
    &--standard#{&}--outlined
      color: var(--button-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--border
      border-color: var(--button-standard-border-color, var(--standard-bg, darken($standard-bg, 10%)))

    &--success#{&}--flat,
    &--success#{&}--elevated
      color: var(--button-success-color, var(--success-color, $success-color))
      background: var(--button-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--plain,
    &--success#{&}--outlined
      color: var(--button-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--border
      border-color: var(--button-success-border-color, var(--success-bg, darken($success-bg, 10%)))

    &--danger#{&}--flat,
    &--danger#{&}--elevated
      color: var(--button-danger-color, var(--danger-color, $danger-color))
      background: var(--button-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--plain,
    &--danger#{&}--outlined
      color: var(--button-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--border
      border-color: var(--button-danger-border-color, var(--danger-bg, darken($danger-bg, 10%)))

    &--warning#{&}--flat,
    &--warning#{&}--elevated
      color: var(--button-warning-color, var(--warning-color, $warning-color))
      background: var(--button-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--plain,
    &--warning#{&}--outlined
      color: var(--button-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--border
      border-color: var(--button-warning-border-color, var(--warning-bg, darken($warning-bg, 10%)))
</style>
