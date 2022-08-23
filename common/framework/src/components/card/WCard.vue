<template lang="pug">
  component.w-card(:is="props.tag")
    .w-card__header(v-if="slots.header")
      slot(name="header")
    .w-card__content
      slot(name="default")
    .w-card__footer(v-if="slots.footer")
      slot(name="footer")
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue';
  import { tagProp, usePropsCssStyles } from '../../composables';
  import type { CSSProperties, SetupContext } from 'vue';

  // Defines the props.
  const props = defineProps({
    ...tagProp()
  });

  // Composable to handle the Slots.
  const slots: SetupContext['slots'] = useSlots();

  // Composable to handle the CSS Styles.
  const { widthCssStyle, heightCssStyle } = usePropsCssStyles();

  // Create the CSS styles based on context.
  const cssStyles: CSSProperties = $computed(() => ({
    width: widthCssStyle.value,
    height: heightCssStyle.value
  }));
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *
  @use './WCard' as *

  .w-card
    padding: $card__padding
    background: $card__bg
</style>
