<template lang="pug">
  .goal-view
    | Goal
</template>

<script lang="ts" setup>
  import { inject, onBeforeUnmount } from 'vue';
  import type { LayoutConfig } from '@internal/framework';

  // Inject the layout config.
  const $layout: LayoutConfig = inject('$layout')!;

  $layout.blocks.header.enabled = false;
  $layout.blocks.footer.enabled = false;

  onBeforeUnmount((): void => {
    $layout.blocks.header.enabled = true;
    $layout.blocks.footer.enabled = true;
  });
</script>
