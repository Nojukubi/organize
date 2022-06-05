import type { ComputedRef } from 'vue';

// Describes the layout config.
export interface LayoutConfig {
  blocks: Record<string, ComputedRef<number[]>>;
}
