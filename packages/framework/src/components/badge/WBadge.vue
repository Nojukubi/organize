<template lang="pug">
  //- Mixin reuse badge.
  mixin bagde-component
    component.w-badge(
      :is="tag",
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
  import type { SetupContext } from 'vue';
  import type { Variant, Styling } from '../../types';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      top?: boolean;
      right?: boolean;
      bottom?: boolean;
      left?: boolean;
      tile?: boolean;
      rounded?: boolean;
      variant?: Variant;
      styling?: Styling | string;
      floating?: boolean;
    }>(),
    {
      tag: 'div',
      styling: 'flat',
      variant: 'primary'
    }
  );

  // Default accessibility attrs.
  const a11y: object = {
    role: 'status',
    ariaLive: 'polite',
    ariaLabel: 'badge',
    ariaAtomic: true
  };

  // Composable to handle the Attrs.
  const attrs: SetupContext['attrs'] = useAttrs();

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    // prettier-ignore
    return typeof props.floating === 'boolean'
      ? props.floating
      : !!slots.target;
  });

  // Create the CSS classes based on context.
  const cssClasses: object = $computed(() => ({
    'w-badge--dot': !slots.default,
    'w-badge--inline': !isFloating,
    'w-badge--tile': props.tile,
    'w-badge--rounded': props.rounded,
    'w-badge--floating': isFloating,
    'w-badge--left': props.left && !props.right,
    'w-badge--right': props.right || !props.left,
    'w-badge--top': props.top || (isFloating && !props.bottom),
    'w-badge--bottom': props.bottom && isFloating && !props.top,
    [`w-badge--${props.styling}`]: true,
    [`w-badge--${props.variant}`]: true
  }));
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *
  @use '@stylize/sass-shape' as *
  @use './WBadge' as *

  .w-badge
    line-height: 1
    box-sizing: content-box
    white-space: nowrap
    padding: var(--badge-padding, $badge__padding)
    min-width: var(--badge-min-width, $badge__min-width)
    font-size: var(--badge-font-size, $badge__font-size)
    font-weight: var(--badge-font-weight, $badge__font-weight)
    border-radius: var(--badge-radius, $badge__radius)

    &, &-target
      position: relative
      +inline-flex-row-center

    &--dot
      +circle(min auto)
      padding: var(--badge-dot-padding, $badge-dot__padding)

    &--tile
      border-radius: 0

    &--inline#{&}--left
      order: -1

    &--inline#{&}--top
      align-self: flex-start

    &--inline#{&}--bottom
      align-self: flex-end

    &--floating#{&}--top#{&}--left
      transform: translate(-50%, -50%)
      +absolute(0, $left: 0, $z: 1)

    &--floating#{&}--top#{&}--right
      transform: translate(50%, -50%)
      +absolute(0, $right: 0, $z: 1)

    &--floating#{&}--bottom#{&}--left
      transform: translate(-50%, 50%)
      +absolute($bottom: 0, $left: 0, $z: 1)

    &--floating#{&}--bottom#{&}--right
      transform: translate(50%, 50%)
      +absolute($bottom: 0, $right: 0, $z: 1)

    &--rounded:not(&--dot)
      box-sizing: border-box
      padding: var(--badge-rounded-padding, $badge-rounded__padding)
      border-radius: var(--badge-rounded-radius, $badge-rounded__radius)

    &--primary#{&}--flat
      color: var(--badge-primary-color, var(--primary-color, $badge-primary__color))
      border: 1px solid var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))
      background: var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))

    &--primary#{&}--outline
      color: var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))

    &--standard#{&}--flat
      color: var(--badge-standard-color, var(--standard-color, $badge-standard__color))
      border: 1px solid var(--badge-standard-bg, var(--standard-bg, $badge-standard__bg))
      background: var(--badge-standard-bg, var(--standard-bg, $badge-standard__bg))

    &--standard#{&}--outline
      color: var(--badge-standard-bg, var(--standard-bg, $badge-standard__bg))

    &--success#{&}--flat
      color: var(--badge-success-color, var(--success-color, $badge-success__color))
      border: 1px solid var(--badge-success-bg, var(--success-bg, $badge-success__bg))
      background: var(--badge-success-bg, var(--success-bg, $badge-success__bg))

    &--success#{&}--outline
      color: var(--badge-success-bg, var(--success-bg, $badge-success__bg))

    &--danger#{&}--flat
      color: var(--badge-danger-color, var(--danger-color, $badge-danger__color))
      border: 1px solid var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))
      background: var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))

    &--danger#{&}--outline
      color: var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))

    &--warning#{&}--flat
      color: var(--badge-warning-color, var(--warning-color, $badge-warning__color))
      border: 1px solid var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))
      background: var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))

    &--warning#{&}--outline
      color: var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))

    &--outline
      border: 1px solid currentColor

    &--outline#{&}--dot
      box-shadow: inset 0 0 0.5em 0 currentColor
</style>
