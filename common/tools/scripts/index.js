'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const npm_which_1 = require('npm-which');
const child_process_1 = require('child_process');
// Current working directory.
const cwd = __dirname;
// An array containing the cli args.
const [, , name] = process.argv;
// Options for spawn to inherit stdio.
const spawnOptions = { stdio: 'inherit' };
// Run the command to start the dev server.
if (name === 'dev') execVite();
// Run the command to start the prod server.
else if (name === 'prod') execVite(['preview']);
// Run the command to build with type checking.
else if (name === 'build')
  execVueTsc().on('close', (code) => {
    if (code === 0) execVite(['build']);
  });
// Execute the local vue tsc executable with args.
function execVueTsc() {
  // Path to the local vue tsc executable.
  const vueTsc = (0, npm_which_1.sync)('vue-tsc', { cwd });
  // Execute local executable with arguments.
  return (0, child_process_1.spawn)(vueTsc, ['--noEmit'], spawnOptions);
}
// Execute the local vite executable with args.
function execVite(args = []) {
  // Path to the local vite executable.
  const vite = (0, npm_which_1.sync)('vite', { cwd });
  // Execute local executable with arguments.
  return (0, child_process_1.spawn)(vite, args, spawnOptions);
}
