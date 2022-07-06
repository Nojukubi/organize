<template lang="pug">
  component.w-list-item-text(
    :is="tag",
    :style="styleCss")
    slot
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';

  // Define the props.
  const props = withDefaults(
    defineProps<{
      tag?: string;
      lines?: number;
    }>(),
    {
      tag: 'div',
      lines: 0
    }
  );

  // Create the CSS styles based on the defined props.
  const styleCss: CSSProperties | null = $computed((): CSSProperties | null =>
    props.lines > 1 ? { ...webkitBox(), '-webkit-line-clamp': props.lines } : null
  );

  // Create the webkit CSS properties to cut the lines.
  function webkitBox(): CSSProperties {
    return { 'overflow': 'hidden', 'display': '-webkit-box', '-webkit-box-orient': 'vertical' };
  }
</script>
