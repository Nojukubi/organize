<template lang="pug">
  w-layout.application(
    view="lhr lcr lfr",
    data-application)
    w-header.application__header
      | Header
    app-drawer
    w-content.application__content
      router-view
    w-footer
      | Footer
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { WLayout, WHeader, WFooter,
    WContent } from '@organize/framework';
  import AppDrawer from './AppDrawer.vue';
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *

  +font-face(Roboto, '/fonts/roboto')

  body
    margin: 0

  .application
    min-height: 100vh
    font-family: Roboto, sans-serif

    &__calendar
      margin: 16px auto
</style>
