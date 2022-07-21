'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolve = exports.alias = void 0;
const path_1 = require('path');
// Create the module aliases.
exports.alias = [
  // Alias for sass node_modules.
  { find: /^~(.+)/, replacement: '$1' },
  // Alias for sass node_modules.
  { find: /^#(.+)/, replacement: (0, path_1.join)(process.cwd(), 'src', '$1') }
];
// Create the resolve options.
exports.resolve = { alias: exports.alias };
