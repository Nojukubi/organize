import type { ComputedRef } from 'vue';

// Describes the layout config.
export interface LayoutConfig {
  theme?: string;
  blocks: Record<
    'header' | 'footer' | 'left' | 'right' | string,
    { enabled?: boolean; position: ComputedRef<number[]> }
  >;
}
