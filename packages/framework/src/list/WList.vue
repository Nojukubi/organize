<template lang="pug">
  .w-list
    .w-list__header(v-if="$slots.header")
      slot(name="header")
    slot(name="default")
</template>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-list
    gap: 4px
    +flex-col

    &__header
      margin: 0 16px 8px
</style>
