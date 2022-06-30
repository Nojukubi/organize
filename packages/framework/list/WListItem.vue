<template lang="pug">
  a.w-list-item(
    v-if="href",
    :class="classCss",
    :href="href",
    :target="target")
    slot

  router-link.w-list-item(
    v-else-if="to",
    :to="to",
    :class="classCss",
    active-class="w-list-item--active",
    exact-active-class="w-list-item--exact-active")
    slot

  component.w-list-item(
    v-else,
    :is="tag",
    :class="classCss")
    slot
</template>

<script lang="ts" setup>
  import type { RouteLocationRaw } from 'vue-router';

  // Defines the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      href?: string;
      to?: string | RouteLocationRaw;
      target?: string;
      inactive?: boolean;
      clickable?: boolean;
    }>(),
    {
      tag: 'div'
    }
  );

  const isLink: boolean = $computed((): boolean => {
    return !!props.to || !!props.href;
  });

  const isClickable: boolean = $computed((): boolean => {
    return !props.inactive && (props.clickable || isLink);
  });

  const classCss: object = $computed((): object => ({
    'w-list-item--clickable': isClickable
  }));
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-list-item
    color: inherit
    padding: 8px 16px
    position: relative
    min-height: 32px
    text-decoration: none
    transition: color .3s, background-color .3s
    +flex-row(flex-start center nowrap)

    &--active
      background: grey

    &--clickable
      +support-hover
        &:hover
          background: darkgray
</style>
