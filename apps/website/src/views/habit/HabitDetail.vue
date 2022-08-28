<template lang="pug">
  w-drawer.habit-detail(
    width="320",
    side="right")
    w-calendar
</template>

<script lang="ts" setup>
  import { WDrawer, WCalendar } from '@internal/framework';
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .habit-detail
    padding: 16px
    border-left: 1px solid #eee
    +flex-row(center)

    +media('<=lg')
      margin-right: -320px !important
</style>
