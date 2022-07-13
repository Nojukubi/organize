<template lang="pug">
  w-drawer.habit-drawer(
    width="400",
    side="right")
    w-calendar
</template>

<script lang="ts" setup>
  import { WDrawer, WCalendar } from '@organize/framework';
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .habit-drawer
    border-left: 1px solid #eee

    +media('<=lg')
      margin-right: -400px !important
</style>
