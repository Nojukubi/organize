<template lang="pug">
  w-layout.application(
    view="lhr lcr lfr",
    data-application)
    w-header
      | Header
    w-drawer
      | Drawer
    w-content
      | Content
    w-footer
      | Footer
</template>

<script lang="ts" setup>
  import { WLayout, WDrawer, WHeader, WFooter, WContent } from '@framework/layout';
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *

  +font-face(Roboto, '/fonts/roboto')

  body
    margin: 0

  .application
    min-height: 100vh
    font-family: Roboto, sans-serif
</style>
