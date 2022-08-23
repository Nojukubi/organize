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
  // prettier-ignore
  import { WLayout, WContent,
    useGlobalConfig } from '@internal/framework';
  import { provide } from 'vue';
  import AppHeader from './AppHeader.vue';
  import AppFooter from './AppFooter.vue';
  import AppDrawer from './AppDrawer.vue';
  import { useLocations } from './plugins/router';

  // Composable to handle the Global Config.
  const { changeGlobalConfig } = useGlobalConfig();

  // Change the framework global configuration.
  changeGlobalConfig({ iconType: 'svg' });

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
    font-family: Roboto, sans-serif

    &__calendar
      margin: 16px auto
</style>
