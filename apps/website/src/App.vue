<template lang="pug">
  w-layout.application(
    view="lhr lcr lfr",
    data-application)
    app-header
    app-drawer
    router-view(name="detail")
    w-content.application__content
      router-view(name="default")
    app-footer
</template>

<script lang="ts" setup>
  import { provide } from 'vue';
  import { WLayout, WContent } from '@internal/framework';
  import AppHeader from './layout/AppHeader.vue';
  import AppFooter from './layout/AppFooter.vue';
  import AppDrawer from './layout/AppDrawer.vue';
  import { useLocations } from './plugins/router';

  // Provide the available route locations.
  provide('routeLocations', useLocations());
</script>

<style lang="sass">
  @use '~@stylize/sass-mixin' as *

  +font-face(Roboto, '/fonts/roboto')

  body
    margin: 0

  .application
    min-height: 100vh
    font-size: 14px
    font-family: Roboto, sans-serif

    &__calendar
      margin: 16px auto
</style>
