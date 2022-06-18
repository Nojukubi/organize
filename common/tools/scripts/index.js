'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const exec_1 = require('./exec');
// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , name, ...other] = process.argv;
if (name === 'dev')
  // Execute the vite to start the dev server.
  (0, exec_1.execute)(`${(0, exec_1.bin)('vite')}`);
else if (name === 'preview')
  // Execute the vite to start the server with dist.
  (0, exec_1.execute)(`${(0, exec_1.bin)('vite')}`);
else if (name === 'build')
  // Execute the vite with type checking and build.
  (0, exec_1.execute)(`${(0, exec_1.bin)('vue-tsc')} --noEmit && ${(0, exec_1.bin)('vite')} build ${other.join(' ')}`);
