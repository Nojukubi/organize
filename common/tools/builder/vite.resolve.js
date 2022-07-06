'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolve = exports.alias = void 0;
// Create the module aliases.
exports.alias = [
  // Alias for sass node_modules.
  { find: /^~(.+)/, replacement: '$1' }
];
// Create the resolve options.
exports.resolve = { alias: exports.alias };
