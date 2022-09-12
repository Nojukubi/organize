<template lang="pug">
  .w-menu
    slot(name="target")
    .w-menu__content
      slot(name="default")
</template>

<script lang="ts" setup>
  import { modelProp } from '../../composables';

  // Defines the props.
  const props = defineProps({
    ...modelProp(Boolean, false)
  });

  // Defines the emits.
  const emits = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-menu
    +relative

    &__content
      +absolute(100% 0 null 0)
</style>
