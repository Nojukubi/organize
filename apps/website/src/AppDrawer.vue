<template lang="pug">
  w-drawer.app-drawer(:width="300")
    w-calendar.app-drawer__calendar
    w-list
      w-list-item(:to="{ name: 'home' }")
        w-list-item-section(left)
          w-icon(name="CheckboxMarkedCirclePlusOutline")
        w-list-item-section
          w-list-item-text
            | Habits
        w-list-item-section(right)
          w-badge
            | 1
      w-list-item(:to="{ name: 'goal' }")
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
  import { WDrawer, WCalendar, WIcon, WList, WListItem, WBadge,
    WListItemSection, WListItemText } from '@organize/framework';
</script>

<style lang="sass">
  @use '@stylize/sass-mixin' as *

  .app-drawer
    &__calendar
      margin: 16px auto
</style>
