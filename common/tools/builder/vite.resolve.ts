import { join } from 'path';
import type { Alias } from 'vite';

// Current working directory.
const cwd: string = process.cwd();

// Create the module aliases.
export const alias: Alias[] = [
  // Alias sass node_modules.
  { find: /^~(.+)/, replacement: '$1' },
  // Alias project source code.
  { find: /^#(.+)/, replacement: join(cwd, 'src', '$1') }
];

// Create the resolve options.
export const resolve = { alias };
