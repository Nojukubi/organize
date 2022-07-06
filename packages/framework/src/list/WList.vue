<template lang="pug">
  .w-list
    .w-list__header(v-if="$slots.header")
      slot(name="header")
    slot(name="default")
</template>

<style lang="sass" scoped>
  .w-list
    &__header
      margin: 0 16px 8px
</style>
