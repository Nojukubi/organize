<template lang="pug">
  component.w-list-item(
    :is="dynamicTag",
    :class="cssClasses",
    v-bind="{ ...attrs, ...dynamicAttrs }")
    slot(name="default")
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  };
</script>

<script lang="ts" setup>
  import { inject, useAttrs } from 'vue';
  // prettier-ignore
  import { activeProp, borderProp, disabledProp,
    interactiveProp, cornerProp, routeHrefProp,
    routeReplaceProp, routeTargetProp,
    routeToProp, tagProp, usePropsCssClasses,
    usePropsLink } from '../../composables';
  import type { Component, SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...activeProp(),
    ...borderProp(),
    ...cornerProp(),
    ...disabledProp(),
    ...routeToProp(),
    ...routeHrefProp(),
    ...routeTargetProp(),
    ...routeReplaceProp(),
    ...interactiveProp()
  });

  // prettier-ignore
  // Retrieve config from parent.
  const config = inject('listConfig',
    { direction: 'vertical' });

  // Composable to handle the Attrs.
  const attrs: SetupContext['attrs'] = useAttrs();

  // Composable to handle the Link Props.
  const { linkTag, linkAttrs } = $(usePropsLink());

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { activeCssClass, borderCssClass, cornerCssClass,
    disabledCssClass } = $(usePropsCssClasses());

  // Determine whether item is interactive.
  const isInteractive: boolean = $computed(() => {
    return !props.disabled && (props.interactive || !!linkTag);
  });

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    activeCssClass,
    borderCssClass,
    cornerCssClass,
    disabledCssClass,
    {
      'w-list-item--interactive': isInteractive,
      [`w-list-item--${config.direction}`]: true
    }
  ]);

  // Determine the root tag based on context.
  const dynamicTag: Component | string = $computed(() => {
    return linkTag ?? props.tag;
  });

  // Determine the dynamic attrs based on context.
  const dynamicAttrs: unknown = $computed(() => linkAttrs);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use '../variable' as *
  @use './WList' as *

  .w-list-item
    flex-grow: 1
    outline: none
    position: relative
    transition: color .5s
    box-sizing: content-box
    text-decoration: none
    color: var(--list-item-color, $list-item__color)
    padding: var(--list-item-padding, $list-item__padding)
    min-height: var(--list-item-min-height, $list-item__min-height)
    +flex-row($cross: center, $wrap: nowrap)

    :deep(img),
    :deep(svg)
      display: inline-block

    +before
      opacity: $list-item__opacity
      transition: background-color .5s, opacity .5s
      background: var(--list-item-bg, $list-item__bg)
      +absolute-cover($z: -1)

    &--interactive
      cursor: pointer

    &--pill
      &, &:before
        border-radius: var(--list-item-pill-radius, $list-item-pill__radius)

    &--round
      &, &:before
        border-radius: var(--list-item-round-radius, $list-item-round__radius)

    &--border
      border-style: solid
      border-color: var(--list-border-color, $list__border-color)

    &--border#{&}--vertical
      border-width: $list-item-vertical__border-width

    &--border#{&}--horizontal
      border-width: $list-item-horizontal__border-width

    &--active
      color: var(--list-item-active-color, $list-item-active__color)

      &:before
        opacity: var(--list-item-active-opacity, $list-item-active__opacity)
        background: var(--list-item-active-bg, $list-item-active__bg)

    &--disabled
      cursor: default
      user-select: none
      pointer-events: none
      opacity: var(--list-item-disabled-opacity, $list-item-disabled__opacity)

      &:before
        content: none

    +support-hover
      &--interactive:hover:not(&--disabled)
        color: var(--list-item-hover-color, var(--list-item-color, inherit))

        &:before
          opacity: var(--list-item-hover-opacity, $list-item-hover__opacity)
          background: var(--list-item-hover-bg, $list-item-hover__bg)

      &--active:hover:not(&--disabled)
        color: var(--list-item-active-color, $list-item-active__color)

        &:before
          opacity: var(--list-item-active-opacity, $list-item-active__opacity)
          background: var(--list-item-active-bg, $list-item-active__bg)
</style>
