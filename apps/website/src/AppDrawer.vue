<template lang="pug">
  w-drawer.app-drawer(:width="300")
    w-list.app-drawer__nav
      w-list-item(
        :to="habitLocation()",
        rounded)
        w-list-item-section(left)
          w-icon(name="CheckboxMarkedCirclePlusOutline")
        w-list-item-section
          w-list-item-text
            | Habits
        w-list-item-section(right)
          w-badge
            | 1
      w-list-item(
        :to="{ name: 'goal' }",
        rounded)
        w-list-item-section(left)
          w-icon(name="CalendarCheckOutline")
        w-list-item-section
          w-list-item-text
            | Goals
        w-list-item-section(right)
          w-badge
            | 10
      w-list-item
        w-list-item-section(left)
          w-icon(name="Notebook")
        w-list-item-section
          w-list-item-text
            | Diary
      w-list-item
        w-list-item-section(left)
          w-icon(name="CurrencyUsd")
        w-list-item-section
          w-list-item-text
            | Budget
</template>

<script lang="ts" setup>
  // prettier-ignore
  import { WDrawer, WIcon, WList, WListItem, WBadge,
    WListItemSection, WListItemText } from '@organize/framework';
  import { inject } from 'vue';

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
      --list-item-hover-bg: #eaeef8
      --list-item-hover-color: #212325
      --list-item-active-bg: #f7f8fa
      --list-item-active-color: #212325

    &__calendar
      margin: 16px auto
</style>
