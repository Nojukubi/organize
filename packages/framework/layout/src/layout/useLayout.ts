import { inject, UnwrapRef, ComputedRef } from 'vue';

// Describes the layout config.
export interface LayoutConfig {
  theme: string;
  blocks: Record<string, ComputedRef<number[]>>;
}

// Composable to handle the layout with additional helpers.
export function useLayout() {
  // Inject the reactive config from the parent Layout.
  const layout: UnwrapRef<LayoutConfig> | undefined = inject<LayoutConfig>('$layout');

  // Make sure that config exists and component under layout.
  if (!layout) console.error('Component must be wrapped by Layout');

  // Create the CSS class based on the block position in CSS grid.
  function getBlockAreaClass(block: string): string {
    return `area-${layout?.blocks[block].value[0]}-${layout?.blocks[block].value[1]}`;
  }

  return { layout, getBlockAreaClass };
}
