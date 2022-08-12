<template lang="pug">
  component.w-list-item(
    :is="dynamicTag",
    :class="cssClasses",
    v-bind="{ ...dynamicAttrs, ...attrs }")
    slot(name="default")
</template>

<script lang="ts" setup>
  import { inject, useAttrs } from 'vue';
  // prettier-ignore
  import { activeProp, borderedProp, disabledProp,
    interactiveProp, roundedProp, routeHrefProp,
    routeReplaceProp, routeTargetProp, routeToProp,
    sizeProp, tagProp, usePropsCssClasses,
    usePropsLink } from '../../composables';
  import type { Component, SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp(),
    ...sizeProp(),
    ...activeProp(),
    ...roundedProp(),
    ...borderedProp(),
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
  const { linkTag, linkAttrs } = usePropsLink();

  // prettier-ignore
  // Composable to handle the CSS Classes.
  const { activeCssClass, borderedCssClass, disabledCssClass,
    roundedCssClass, interactiveCssClass } = usePropsCssClasses();

  // Create the CSS classes based on context.
  const cssClasses: unknown = $computed(() => [
    activeCssClass.value,
    borderedCssClass.value,
    disabledCssClass.value,
    roundedCssClass.value,
    interactiveCssClass.value,
    { [`w-list-item--${config.direction}`]: true }
  ]);

  // Determine whether item is interactive.
  const isInteractive: boolean = $computed(() => {
    return !props.disabled && (props.interactive || !!linkTag.value);
  });

  // Determine the root tag based on context.
  const dynamicTag: Component | string = $computed(() => {
    return linkTag.value ?? props.tag;
  });

  // Determine the dynamic attrs based on context.
  const dynamicAttrs: unknown = $computed(() => linkAttrs.value);
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use '../../styles/vars' as *
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

    &--rounded
      &, &:before
        border-radius: var(--list-item-radius, $list-item__radius)

    &--normal
      min-height: var(--list-item-normal-min-height, $min-height-sm)

    &--bordered
      border-style: solid
      border-color: var(--list-border-color, $list__border-color)

    &--bordered#{&}--vertical
      border-width: $list-item-vertical__border-width

    &--bordered#{&}--horizontal
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
