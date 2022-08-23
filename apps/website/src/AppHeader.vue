<template lang="pug">
  w-header.app__header(border)
    router-view(name="header")
</template>

<script lang="ts" setup>
  import { WHeader } from '@internal/framework';
</script>

<style lang="sass" scoped>
  .app__header
    padding: 0 8px
</style>
