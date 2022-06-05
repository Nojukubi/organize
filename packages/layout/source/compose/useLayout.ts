import { inject, UnwrapRef } from 'vue';
import type { LayoutConfig } from '../layout/wLayoutConfig';

// Composable to handle the layout with additional helpers.
export function useLayout() {
  // Inject the reactive config from the parent Layout.
  const layout: UnwrapRef<LayoutConfig> = inject<LayoutConfig>('$layout');

  // Make sure that config exists and component under layout.
  if (!layout) console.error('Component must be wrapped by Layout');

  // Create the CSS class based on the block position in CSS grid.
  function getBlockAreaClass(block: string): string {
    return `area-${layout?.blocks[block][0]}-${layout?.blocks[block][1]}`;
  }

  return { layout, getBlockAreaClass };
}
