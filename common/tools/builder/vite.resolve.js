'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolve = exports.alias = void 0;
const path_1 = require('path');
// Current working directory.
const cwd = process.cwd();
// Create the module aliases.
exports.alias = [
  // Alias sass node_modules.
  { find: /^~(.+)/, replacement: '$1' },
  // Alias project source code.
  { find: /^#(.+)/, replacement: (0, path_1.join)(cwd, 'src', '$1') }
];
// Create the resolve options.
exports.resolve = { alias: exports.alias };
