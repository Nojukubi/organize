<template lang="pug">
  w-drawer.habit-drawer(
    width="300",
    side="right")
    w-calendar
</template>

<script lang="ts" setup>
  import { WDrawer, WCalendar } from '@organize/framework';
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .habit-drawer
    +media('<=lg')
      margin-right: -300px !important
</style>
