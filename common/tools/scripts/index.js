'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const exec_1 = require('./exec');
// An array containing the cli args.
const [, , name] = process.argv;
// Command execution based on the args.
if (name === 'dev')
  // Run the command to start the dev server.
  (0, exec_1.execute)((0, exec_1.bin)('vite'));
else if (name === 'preview')
  // Run the command to start the prod server.
  (0, exec_1.execute)(`${(0, exec_1.bin)('vite')} preview`);
else if (name === 'build')
  // Run the command to start the build with type checking.
  (0, exec_1.execute)(`${(0, exec_1.bin)('vue-tsc')} --noEmit && ${(0, exec_1.bin)('vite')} build`);
