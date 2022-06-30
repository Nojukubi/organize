import type { Alias } from 'vite';

// Create the module aliases.
export const alias: Alias[] = [
  // Alias for sass node_modules.
  { find: /^~(.+)/, replacement: '$1' }
];

// Create the vite resolve options.
export const resolve: { alias: Alias[] } = { alias };
