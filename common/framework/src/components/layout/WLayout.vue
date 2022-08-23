<template lang="pug">
  .w-layout(:class="cssClasses")
    slot
</template>

<script lang="ts" setup>
  import { computed, provide, shallowReactive } from 'vue';
  import { stringProp } from '../../composables';
  import type { LayoutConfig } from './WLayoutConfig';

  // Defines the props.
  const props = defineProps({
    theme: stringProp('light'),
    view: stringProp('hhh lcr fff', false, (v: string): boolean =>
      /^([hl])h([hr]) lcr ([fl])f([fr])$/.test(v.toLowerCase() ?? '')
    )
  });

  // Create the reactive with general layout config.
  const layout: LayoutConfig = shallowReactive({
    theme: props.theme,
    blocks: {}
  });

  // Propagate the layout config to its children.
  provide('$layout', layout);

  // Create the class name based on the defined theme.
  const cssClasses: unknown = $computed((): string => {
    return `w-layout--${props.theme}`;
  });

  // Create the 2d grid based on the defined prop view.
  const grid: string[][] = $computed(
    // prettier-ignore
    (): string[][] => props.view.match(/(\w)+/g)
      ?.map((row: string): string[] => row.split('')) ?? []
  );

  // Calculated CSS grid position of the header.
  layout.blocks.header = shallowReactive({
    enabled: true,
    position: computed((): number[] => {
      return getAreaPosition('h', grid[0]);
    })
  });

  // Calculated CSS grid position of the footer.
  layout.blocks.footer = shallowReactive({
    enabled: true,
    position: computed((): number[] => {
      return getAreaPosition('f', grid[2]);
    })
  });

  // Calculated CSS grid position of the drawer left.
  layout.blocks.left = shallowReactive({
    position: computed((): number[] => {
      // prettier-ignore
      const blocks: string[] = grid.reduce((output: string[],
        [block]: string[]): string[] => [...output, block], []);
      return getAreaPosition('l', blocks);
    })
  });

  // Calculated CSS grid position of the drawer right.
  layout.blocks.right = shallowReactive({
    position: computed((): number[] => {
      // prettier-ignore
      const blocks: string[] = grid.reduce((output: string[],
        [,,block]: string[]): string[] => [...output, block], []);
      return getAreaPosition('r', blocks);
    })
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
