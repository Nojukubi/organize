<template lang="pug">
  //- Mixin reuse badge.
  mixin bagde-component
    component.w-badge(
      :is="props.tag",
      :class="cssClasses",
      v-bind="{ ...a11y, ...attrs }")
      slot(name="default")
  //- Standalone badge.
  template(v-if="!slots.target")
    +bagde-component
  //- Badge with target.
  .w-badge-target(v-else)
    slot(name="target")
    +bagde-component
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  };
</script>

<script lang="ts" setup>
  import { useAttrs, useSlots } from 'vue';
  // prettier-ignore
  import { boolProp, tagProp, topProp, leftProp, tileProp,
    bottomProp, stylingProp, variantProp, rightProp,
    roundedProp, usePropsCssClasses } from '../../composables';
  import type { SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...topProp(),
    ...rightProp(),
    ...bottomProp(),
    ...leftProp(),
    ...tileProp(),
    ...roundedProp(),
    ...stylingProp(),
    ...variantProp(),
    floating: boolProp(),
    transparent: boolProp()
  });

  // Default accessibility attrs.
  const a11y: Record<string, unknown> = {
    role: 'status',
    ariaLive: 'polite',
    ariaLabel: 'badge',
    ariaAtomic: true
  };

  // Composable to handle the Attrs.
  const attrs: SetupContext['attrs'] = useAttrs();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { tileCssClass, roundedCssClass, stylingCssClass,
    variantCssClass } = usePropsCssClasses();

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    return props.floating ?? !!slots.target;
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    tileCssClass.value,
    stylingCssClass.value,
    variantCssClass.value,
    roundedCssClass.value,
    {
      'w-badge--dot': !slots.default,
      'w-badge--inline': !isFloating,
      'w-badge--floating': isFloating,
      'w-badge--transparent': props.transparent,
      'w-badge--left': props.left && !props.right,
      'w-badge--bottom': props.bottom && !props.top,
      'w-badge--top': props.top || (isFloating && !props.bottom),
      'w-badge--right': props.right || (isFloating && !props.left)
    }
  ]);
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *
  @use '@stylize/sass-shape' as *
  @use '../../styles/mixin' as *
  @use './WBadge' as *

  .w-badge
    cursor: default
    white-space: nowrap
    box-sizing: content-box
    padding: var(--badge-padding, $badge__padding)
    min-width: var(--badge-min-width, $badge__min-width)
    font-size: var(--badge-font-size, $badge__font-size)
    line-height: var(--badge-line-height, $badge__line-height)
    font-weight: var(--badge-font-weight, $badge__font-weight)
    border-radius: var(--badge-border-radius, $badge__radius)

    +tile
    +styling-plain
    +styling-outlined
    +styling-elevated

    &, &-target
      position: relative
      +inline-flex-row-center

    &-target
      gap: var(--badge-inline-gap, $badge-inline__gap)

    &--dot
      +circle(min auto)
      padding: var(--badge-dot-padding, $badge-dot__padding)

    &--inline#{&}--left
      order: -1

    &--inline#{&}--top
      align-self: flex-start

    &--inline#{&}--bottom
      align-self: flex-end

    &--floating#{&}--top#{&}--left
      transform: translate(-50%, -50%)
      +absolute($top: 0, $left: 0, $z: 1)

    &--floating#{&}--top#{&}--right
      transform: translate(50%, -50%)
      +absolute($top: 0, $right: 0, $z: 1)

    &--floating#{&}--bottom#{&}--left
      transform: translate(-50%, 50%)
      +absolute($bottom: 0, $left: 0, $z: 1)

    &--floating#{&}--bottom#{&}--right
      transform: translate(50%, 50%)
      +absolute($bottom: 0, $right: 0, $z: 1)

    &--transparent
      opacity: var(--badge-transparent-opacity, $badge-transparent__opacity)

    &--rounded:not(&--dot)
      padding: var(--badge-rounded-padding, $badge-rounded__padding)
      min-width: var(--badge-rounded-min-width, $badge-rounded__min-width)
      border-radius: var(--badge-rounded-radius, $badge-rounded__radius)

    &--primary#{&}--flat,
    &--primary#{&}--elevated
      color: var(--badge-primary-color, var(--primary-color, $badge-primary__color))
      border: 1px solid var(--badge-primary-border, var(--primary-bg, $badge-primary__bg))
      background: var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))

    &--primary#{&}--plain,
    &--primary#{&}--outlined
      color: var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))

    &--standard#{&}--flat,
    &--standard#{&}--elevated
      color: var(--badge-standard-color, var(--standard-color, $badge-standard__color))
      border: 1px solid var(--badge-standard-border, var(--standard-bg, $badge-standard__bg))
      background: var(--badge-standard-bg, var(--standard-bg, $badge-standard__bg))

    &--standard#{&}--plain,
    &--standard#{&}--outlined
      color: var(--badge-standard-bg, var(--standard-bg, $badge-standard__bg))

    &--success#{&}--flat,
    &--success#{&}--elevated
      color: var(--badge-success-color, var(--success-color, $badge-success__color))
      border: 1px solid var(--badge-success-border, var(--success-bg, $badge-success__bg))
      background: var(--badge-success-bg, var(--success-bg, $badge-success__bg))

    &--success#{&}--plain,
    &--success#{&}--outlined
      color: var(--badge-success-bg, var(--success-bg, $badge-success__bg))

    &--danger#{&}--flat,
    &--danger#{&}--elevated
      color: var(--badge-danger-color, var(--danger-color, $badge-danger__color))
      border: 1px solid var(--badge-danger-border, var(--danger-bg, $badge-danger__bg))
      background: var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))

    &--danger#{&}--plain,
    &--danger#{&}--outlined
      color: var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))

    &--warning#{&}--flat,
    &--warning#{&}--elevated
      color: var(--badge-warning-color, var(--warning-color, $badge-warning__color))
      border: 1px solid var(--badge-warning-border, var(--warning-bg, $badge-warning__bg))
      background: var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))

    &--warning#{&}--plain,
    &--warning#{&}--outlined
      color: var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))
</style>
