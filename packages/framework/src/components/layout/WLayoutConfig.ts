import type { ComputedRef } from 'vue';

// Describes the layout config.
export interface LayoutConfig {
  theme: string;
  blocks: Record<string, ComputedRef<number[]>>;
}
