<template lang="pug">
  .w-layout(:class="cssClass")
    slot
</template>

<script lang="ts" setup>
  import { computed, provide, shallowReactive } from 'vue';
  import type { PropType, ComputedRef } from 'vue';
  import type { LayoutConfig } from './WLayoutConfig';

  // Defines the props.
  const props = defineProps({
    theme: {
      type: String as PropType<string>,
      default: 'light'
    },
    view: {
      type: String as PropType<string>,
      // Header and footer are stretched by default.
      default: 'hhh lcr fff',
      // Need to validate as it's critical for layout.
      validator: (v: string): boolean =>
        // Validate the view prop based on defined format.
        /^([hl])h([hl]) lcr ([fr])f([fr])$/.test(v.toLowerCase() ?? '')
    }
  });

  // Create the reactive with general layout config.
  const layout: LayoutConfig = shallowReactive({
    theme: props.theme,
    blocks: {}
  });

  // Propagate the layout config to its children.
  provide('$layout', layout);

  // Create the class name based on the defined theme.
  const cssClass: ComputedRef<string> = computed((): string => {
    return `w-layout--${props.theme}`;
  });

  // Create the 2d grid based on the defined prop view.
  const grid: ComputedRef<string[][]> = computed(
    // prettier-ignore
    (): string[][] => props.view.match(/(\w)+/g)
      ?.map((row: string): string[] => row.split('')) ?? []
  );

  // Calculated CSS grid position of the header.
  layout.blocks.header = computed((): number[] => {
    return getAreaPosition('h', grid.value[0]);
  });

  // Calculated CSS grid position of the footer.
  layout.blocks.footer = computed((): number[] => {
    return getAreaPosition('f', grid.value[2]);
  });

  // Calculated CSS grid position of the drawer left.
  layout.blocks.left = computed((): number[] => {
    // prettier-ignore
    const blocks: string[] = grid.value.reduce((output: string[],
      [block]: string[]): string[] => [...output, block], []);
    return getAreaPosition('l', blocks);
  });

  // Calculated CSS grid position of the drawer right.
  layout.blocks.right = computed((): number[] => {
    // prettier-ignore
    const blocks: string[] = grid.value.reduce((output: string[],
      [,,block]: string[]): string[] => [...output, block], []);
    return getAreaPosition('r', blocks);
  });

  /**
   * Determine the position of block in the CSS grid.
   * @param id View ID of the block which is placed on grid.
   * @param blocks Part of CSS grid where block can be rendered.
   * @returns CSS grid start and end position for specified block.
   */
  function getAreaPosition(id: string, blocks: string[]): number[] {
    return [blocks.indexOf(id) + 1, blocks.lastIndexOf(id) + 2];
  }
</script>

<style lang="sass" scoped>
  @use '~@stylize/sass-mixin' as *

  .w-layout
    display: grid
    flex: 1 1 auto
    overflow: hidden
    grid-row-gap: 0
    grid-column-gap: 0
    grid-template-rows: auto 1fr auto
    grid-template-columns: auto 1fr auto
    +size([100%, max 100%], [100%])
</style>
