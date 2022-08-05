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
  import { cornerProp, boolProp, borderProp,
    bottomProp, leftProp, rightProp, stylingProp,
    tagProp, topProp, transparentProp, usePropsCssClasses,
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
    ...borderProp(),
    ...transparentProp(),
    ...stylingProp(),
    ...variantProp(),
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
  const { borderCssClass, cornerCssClass,
    transparentCssClass, stylingCssClass,
    variantCssClass } = usePropsCssClasses();

  // Determine whether badge is floating.
  const isFloating: boolean = $computed(() => {
    return props.floating ?? !!slots.target;
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    cornerCssClass.value,
    borderedCssClass.value,
    transparentCssClass.value,
    stylingCssClass.value,
    variantCssClass.value,
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
  @use '@stylize/sass-mixin' as *
  @use '../../styles/vars' as *
  @use '../../styles/mixin' as *
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

    +tile
    +circle
    +styling-flat
    +styling-plain
    +styling-outlined
    +styling-elevated

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
      border-radius: var(--badge-pill-border-radius, $badge-pill__radius)

    &--round:not(&--dot)
      border-radius: var(--badge-round-border-radius, $badge-round__radius)

    &--primary#{&}--flat,
    &--primary#{&}--elevated
      color: var(--badge-primary-color, var(--primary-color, $primary-color))
      background: border-box var(--badge-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--plain,
    &--primary#{&}--outlined
      color: var(--badge-primary-bg, var(--primary-bg, $primary-bg))

    &--primary#{&}--border
      border-color: var(--badge-primary-border-color, var(--primary-bg, darken($primary-bg, 10%)))

    &--standard#{&}--flat,
    &--standard#{&}--elevated
      color: var(--badge-standard-color, var(--standard-color, $standard-color))
      background: border-box var(--badge-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--plain,
    &--standard#{&}--outlined
      color: var(--badge-standard-bg, var(--standard-bg, $standard-bg))

    &--standard#{&}--border
      border-color: var(--badge-standard-border-color, var(--standard-bg, darken($standard-bg, 10%)))

    &--success#{&}--flat,
    &--success#{&}--elevated
      color: var(--badge-success-color, var(--success-color, $success-color))
      background: border-box var(--badge-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--plain,
    &--success#{&}--outlined
      color: var(--badge-success-bg, var(--success-bg, $success-bg))

    &--success#{&}--border
      border-color: var(--badge-success-border-color, var(--success-bg, darken($success-bg, 10%)))

    &--danger#{&}--flat,
    &--danger#{&}--elevated
      color: var(--badge-danger-color, var(--danger-color, $danger-color))
      background: border-box var(--badge-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--plain,
    &--danger#{&}--outlined
      color: var(--badge-danger-bg, var(--danger-bg, $danger-bg))

    &--danger#{&}--border
      border-color: var(--badge-danger-border-color, var(--danger-bg, darken($danger-bg, 10%)))

    &--warning#{&}--flat,
    &--warning#{&}--elevated
      color: var(--badge-warning-color, var(--warning-color, $warning-color))
      background: border-box var(--badge-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--plain,
    &--warning#{&}--outlined
      color: var(--badge-warning-bg, var(--warning-bg, $warning-bg))

    &--warning#{&}--border
      border-color: var(--badge-warning-border-color, var(--warning-bg, darken($warning-bg, 10%)))
</style>
