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
  import { cornerProp, boolProp, bottomProp, leftProp,
    rightProp, sizeProp, stylingProp, tagProp,
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
    ...sizeProp(),
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
    sizeCssClass, stylingCssClass, variantCssClass } =
      $(usePropsCssClasses());

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    return props.floating ?? !!slots.target;
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    sizeCssClass,
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
    line-height: 1
    box-sizing: content-box
    white-space: nowrap
    padding: $badge__padding
    min-width: $badge__min-width

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

    &--small
      font-size: var(--badge-small-font-size, $badge-small__font-size)

    &--normal
      font-size: var(--badge-normal-font-size, $badge-normal__font-size)

    &--large
      font-size: var(--badge-large-font-size, $badge-large__font-size)

    &--transparent
      opacity: var(--badge-transparent-opacity, $badge-transparent__opacity)

    &--circle
      padding: var(--badge-circle-padding, $badge-circle__padding)

    &--circle:not(&--dot)
      min-width: var(--badge-circle-min-width, $badge-circle__min-width)

    &--pill:not(&--dot)
      border-radius: var(--badge-pill-radius, $badge-pill__radius)

    &--round#{&}--small:not(&--dot)
      border-radius: var(--badge-small-round-radius, $badge-small__radius)

    &--round#{&}--normal:not(&--dot)
      border-radius: var(--badge-normal-round-radius, $badge-normal__radius)

    &--round#{&}--large:not(&--dot)
      border-radius: var(--badge-large-round-radius, $badge-large__radius)

    &--primary#{&}--flat,
    &--primary#{&}--elevate
      color: var(--badge-primary-color, var(--primary-color, $primary-color))
      background: border-box var(--badge-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--plain
      color: var(--badge-primary-plain-color, var(--primary-bg, $primary-bg))

    &--primary#{&}--outline
      color: var(--badge-primary-outline-color, var(--primary-bg, $primary-bg))

    &--standard#{&}--flat,
    &--standard#{&}--elevate
      color: var(--badge-standard-color, var(--standard-color, $standard-color))
      background: border-box var(--badge-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--plain
      color: var(--badge-standard-plain-color, var(--standard-bg, $standard-bg))

    &--standard#{&}--outline
      color: var(--badge-standard-outline-color, var(--standard-bg, $standard-bg))

    &--success#{&}--flat,
    &--success#{&}--elevate
      color: var(--badge-success-color, var(--success-color, $success-color))
      background: border-box var(--badge-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--plain
      color: var(--badge-success-plain-color, var(--success-bg, $success-bg))

    &--success#{&}--outline
      color: var(--badge-success-outline-color, var(--success-bg, $success-bg))

    &--danger#{&}--flat,
    &--danger#{&}--elevate
      color: var(--badge-danger-color, var(--danger-color, $danger-color))
      background: border-box var(--badge-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--plain
      color: var(--badge-danger-plain-color, var(--danger-bg, $danger-bg))

    &--danger#{&}--outline
      color: var(--badge-danger-outline-color, var(--danger-bg, $danger-bg))

    &--warning#{&}--flat,
    &--warning#{&}--elevate
      color: var(--badge-warning-color, var(--warning-color, $warning-color))
      background: border-box var(--badge-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--plain
      color: var(--badge-warning-plain-color, var(--warning-bg, $warning-bg))

    &--warning#{&}--outline
      color: var(--badge-warning-outline-color, var(--warning-bg, $warning-bg))
</style>
