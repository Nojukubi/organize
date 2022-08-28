<template lang="pug">
  mixin bagde-component
    component.w-badge(
      :is="props.tag",
      :class="cssClasses",
      v-bind="{ ...a11y, ...attrs }")
      slot(name="default")
  //- Standalone badge.
  template(v-if="!slots.target")
    +bagde-component
  //- Badge around target.
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
  import { cornerProp, boolProp, bottomProp,
    leftProp, rightProp, stylingProp, tagProp,
    topProp, transparentProp, usePropsCssClasses,
    variantProp } from '../../composables';
  import type { SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...topProp(),
    ...rightProp(),
    ...bottomProp(),
    ...leftProp(),
    ...cornerProp(),
    ...stylingProp(),
    ...variantProp(),
    ...transparentProp(),
    floating: boolProp()
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
  const { cornerCssClass, transparentCssClass,
    stylingCssClass, variantCssClass } =
      $(usePropsCssClasses());

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    return props.floating ?? !!slots.target;
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    cornerCssClass,
    stylingCssClass,
    variantCssClass,
    transparentCssClass,
    {
      'w-badge--dot': !slots.default,
      'w-badge--inline': !isFloating,
      'w-badge--floating': isFloating,
      'w-badge--left': props.left && !props.right,
      'w-badge--bottom': props.bottom && !props.top,
      'w-badge--top': props.top || (isFloating && !props.bottom),
      'w-badge--right': props.right || (isFloating && !props.left)
    }
  ]);
</script>

<style lang="sass">
  @use '~@stylize/sass-mixin' as *
  @use '../variable' as *
  @use '../mixin' as *
  @use './WBadge' as *

  .w-badge
    cursor: default
    white-space: nowrap
    box-sizing: content-box
    padding: var(--badge-padding, $badge__padding)
    min-width: var(--badge-min-width, $badge__min-width)
    font-size: var(--badge-font-size, $badge__font-size)
    font-weight: var(--badge-font-weight, $badge__font-weight)
    line-height: var(--badge-line-height, $badge__line-height)

    +corner-tile
    +corner-circle
    +styling-flat
    +styling-plain
    +styling-outline
    +styling-elevate

    &, &-target
      position: relative
      +inline-flex-row-center

    &-target
      gap: var(--badge-inline-gap, $badge-inline__gap)

    &--dot
      min-width: auto
      border-radius: 50%
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

    &--pill:not(&--dot)
      padding: var(--badge-pill-padding, $badge-pill__padding)
      min-width: var(--badge-pill-min-width, $badge-pill__min-width)
      border-radius: var(--badge-pill-radius, $badge-pill__radius)

    &--round:not(&--dot)
      border-radius: var(--badge-round-radius, $badge-round__radius)

    &--primary#{&}--flat,
    &--primary#{&}--elevate
      color: var(--badge-primary-color, var(--primary-color, $primary-color))
      background: border-box var(--badge-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--plain,
    &--primary#{&}--outline
      color: var(--badge-primary-bg, var(--primary-bg, $primary-bg))

    &--standard#{&}--flat,
    &--standard#{&}--elevate
      color: var(--badge-standard-color, var(--standard-color, $standard-color))
      background: border-box var(--badge-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--plain,
    &--standard#{&}--outline
      color: var(--badge-standard-bg, var(--standard-bg, $standard-bg))

    &--success#{&}--flat,
    &--success#{&}--elevate
      color: var(--badge-success-color, var(--success-color, $success-color))
      background: border-box var(--badge-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--plain,
    &--success#{&}--outline
      color: var(--badge-success-bg, var(--success-bg, $success-bg))

    &--danger#{&}--flat,
    &--danger#{&}--elevate
      color: var(--badge-danger-color, var(--danger-color, $danger-color))
      background: border-box var(--badge-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--plain,
    &--danger#{&}--outline
      color: var(--badge-danger-bg, var(--danger-bg, $danger-bg))

    &--warning#{&}--flat,
    &--warning#{&}--elevate
      color: var(--badge-warning-color, var(--warning-color, $warning-color))
      background: border-box var(--badge-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--plain,
    &--warning#{&}--outline
      color: var(--badge-warning-bg, var(--warning-bg, $warning-bg))
</style>
