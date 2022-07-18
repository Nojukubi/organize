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

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      top?: boolean;
      right?: boolean;
      bottom?: boolean;
      left?: boolean;
      variant?: string;
      rounded?: boolean;
      floating?: boolean;
    }>(),
    {
      tag: 'div',
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
  const cssClasses: unknown[] = $computed(() => [
    {
      'w-badge--dot': !slots.default,
      'w-badge--rounded': props.rounded,
      [`w-badge--${props.variant}`]: true
    },
    isFloating
      ? {
          'w-badge--floating': true,
          'w-badge--left': props.left && !props.right,
          'w-badge--bottom': props.bottom && !props.top,
          'w-badge--top': props.top || !props.bottom,
          'w-badge--right': props.right || !props.left
        }
      : {
          'w-badge--inline': true,
          'w-badge--v-top': props.top,
          'w-badge--v-bottom': props.bottom,
          'w-badge--h-left': props.left && !props.right,
          'w-badge--h-right': props.right || !props.left
        }
  ]);
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *
  @use '@stylize/sass-func/unit' as *
  @use './WBadge' as *

  .w-badge
    line-height: 1
    box-sizing: border-box
    white-space: nowrap
    padding: var(--badge-padding, $badge__padding)
    min-width: var(--badge-min-width, $badge__min-width)
    font-size: var(--badge-font-size, $badge__font-size)
    font-weight: var(--badge-font-weight, $badge__font-weight)
    border-radius: var(--badge-radius, $badge__radius)

    &, &-target
      position: relative
      +inline-flex-row-center

    &--rounded
      border-radius: var(--badge-rounded-radius, $badge-rounded__radius)

    &--dot
      min-width: auto
      border-radius: 50%

    &--floating
      +absolute($z: 1)

    &--h-left
      order: -1

    &--v-top
      align-self: flex-start

    &--v-bottom
      align-self: flex-end

    &--top
      top: 0

    &--right
      right: 0

    &--bottom
      bottom: 0

    &--left
      left: 0

    &--top#{&}--left
      transform: translate(-50%, -50%)

    &--top#{&}--right
      transform: translate(50%, -50%)

    &--bottom#{&}--left
      transform: translate(-50%, 50%)

    &--bottom#{&}--right
      transform: translate(50%, 50%)

    &--primary
      color: var(--badge-primary-color, var(--primary-color, $badge-primary__color))
      background: var(--badge-primary-bg, var(--primary-bg, $badge-primary__bg))

    &--secondary
      color: var(--badge-secondary-color, var(--secondary-color, $badge-secondary__color))
      background: var(--badge-secondary-bg, var(--secondary-bg, $badge-secondary__bg))

    &--success
      color: var(--badge-success-color, var(--success-color, $badge-success__color))
      background: var(--badge-success-bg, var(--success-bg, $badge-success__bg))

    &--danger
      color: var(--badge-danger-color, var(--danger-color, $badge-danger__color))
      background: var(--badge-danger-bg, var(--danger-bg, $badge-danger__bg))

    &--warning
      color: var(--badge-warning-color, var(--warning-color, $badge-warning__color))
      background: var(--badge-warning-bg, var(--warning-bg, $badge-warning__bg))
</style>
