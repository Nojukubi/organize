<template lang="pug">
  w-layout.application(
    view="lhr lcr lfr",
    data-application)
    w-header.application__header
      router-view(name="header")
    app-drawer
    router-view(name="helper")
    w-content.application__content
      router-view(name="default")
    w-footer.application__footer
      router-view(name="footer")
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { WLayout, WHeader, WFooter,
    WContent } from '@organize/framework';
  import AppDrawer from './AppDrawer.vue';
  import { provide } from 'vue';
  import { useLocations } from './plugins/router';

  provide('routeLocations', useLocations().locations);
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

    &__header
      border-bottom: 1px solid #eee

    &__footer
      border-top: 1px solid #eee
</style>
