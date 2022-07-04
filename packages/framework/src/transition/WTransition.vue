<template lang="pug">
  transition(
    v-if="name",
    :name="name")
    slot
  slot(v-else)
</template>

<script lang="ts" setup>
  // Defines the props.
  const props = defineProps<{
    name?: string;
  }>();
</script>
