<template lang="pug">
  wLayout.application(
    view="lhr lcr lfr",
    data-application)
    wHeader
      | Header
    wDrawer
      | Drawer
    wContent
      | Content
    wFooter
      | Footer
</template>

<script lang="ts" setup>
  import { wLayout, wDrawer, wHeader, wFooter, wContent } from '@framework/layout';
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
