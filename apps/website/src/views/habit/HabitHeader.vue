<template lang="pug">
  .habit-header
    w-button(:to="{ name: 'habit-create' }")
      | Create
</template>

<script lang="ts" setup>
  import { WButton } from '@internal/framework';
</script>

<style lang="sass" scoped>
  @use '@stylize/sass-mixin' as *

  .habit-header
    height: 100%
    +flex-row(flex-end center)
</style>
