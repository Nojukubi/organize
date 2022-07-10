<template lang="pug">
  component.w-list-item(
    :is="tagRoot",
    :class="classCss",
    :style="styleCss",
    :target="target",
    v-bind="dynamicProps")
    .w-list-item__content
      slot
</template>

<script lang="ts" setup>
  import { resolveComponent } from 'vue';
  import type { CSSProperties } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      href?: string;
      to?: RouteLocationRaw;
      target?: string;
      rounded?: number | boolean;
      disabled?: boolean;
      interactive?: boolean;
    }>(),
    {
      tag: 'div'
    }
  );

  const isLink: boolean = $computed((): boolean => {
    return !!props.to || !!props.href;
  });

  const tagRoot: any = $computed(() => {
    return props.href ? 'a' : props.to ? resolveComponent('RouterLink') : props.tag;
  });

  const dynamicProps: any = $computed(() => {
    return props.to
      ? { 'to': props.to, 'active-class': 'w-list-item--active', 'exact-active-class': 'w-list-item--exact-active' }
      : {};
  });

  const isInteractive: boolean = $computed((): boolean => {
    return !props.disabled && (props.interactive || isLink);
  });

  const classCss: object = $computed((): object => ({
    'w-list-item--rounded': props.rounded,
    'w-list-item--disabled': props.disabled,
    'w-list-item--interactive': isInteractive
  }));

  const styleCss: CSSProperties = $computed((): CSSProperties => {
    const styleProps: CSSProperties = {};

    if (typeof props.rounded === 'number')
      // Assign the border radius with units.
      styleProps.borderRadius = `${props.rounded}px`;

    return styleProps;
  });
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-list-item
    $root: &
    outline: none
    color: var(--list-item-color, black)
    padding: 8px 16px
    position: relative
    min-height: 32px
    text-decoration: none
    transition: color .3s
    +flex-row

    +before
      +absolute-cover
      transition: background-color .3s
      background: var(--list-item-bg, transparent)

    &__content
      flex: 1 0 0
      position: relative
      +flex-row(flex-start center nowrap)

    &--rounded
      &, &:before
        border-radius: 6px

    &--interactive
      +support-hover
        &:hover
          color: var(--list-item-hover-color, var(--list-item-color, inherit))

          &:before
            background: var(--list-item-hover-bg, darkgrey)

    &--active
      color: var(--list-item-active-color, white)

      &:before
        background: var(--list-item-active-bg, black)

      +support-hover
        &:hover
          color: var(--list-item-active-color, white)

          &:before
            background: var(--list-item-active-bg, black)

    &--disabled
      &:before
        content: none
        user-select: none
        pointer-events: none
</style>
