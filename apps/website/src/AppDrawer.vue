<template lang="pug">
  w-drawer.app-drawer(:width="300")
    w-list.app-drawer__nav(spacing)
      w-list-item(:to="habitLocation()")
        w-list-item-section(left)
          w-icon(:name="mdiAccountBoxMultipleOutline")
        w-list-item-section
          w-list-item-text
            | Habits
        w-list-item-section(right)
          w-badge
            | 1
      w-list-item(:to="{ name: 'goal' }")
        w-list-item-section(left)
          w-icon(:name="mdiCalendarCheckOutline")
        w-list-item-section
          w-list-item-text
            | Goals
      w-list-item
        w-list-item-section(left)
          w-icon(:name="mdiNotebook")
        w-list-item-section
          w-list-item-text
            | Diary
      w-list-item(disabled)
        w-list-item-section(left)
          w-icon(:name="mdiCurrencyUsd")
        w-list-item-section
          w-list-item-text
            | Budget
</template>

<script lang="ts" setup>
  import { inject } from 'vue';
  // prettier-ignore
  import { WDrawer, WIcon, WList, WListItem, WBadge,
    WListItemSection, WListItemText } from '@internal/framework';
  // prettier-ignore
  import { mdiCalendarCheckOutline, mdiNotebook, mdiCurrencyUsd,
    mdiAccountBoxMultipleOutline } from '@mdi/js';

  const { habitLocation, goalLocation } = inject('routeLocations') ?? {};
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *

  .app-drawer
    border-right: 1px solid #eee

    +media('<=sm')
      margin-left: -300px !important

    &__nav
      margin: 8px

      --list-item-color: #8e9ab3
      --list-item-color-hover: #212325
      --list-item-bg-hover: #eaeef8

    &__calendar
      margin: 16px auto
</style>
