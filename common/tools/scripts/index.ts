import { bin, execute } from './exec';

// The `process.argv` returns an array containing the command line
// arguments passed when the Node.js process was launched.
const [, , name, ...other]: string[] = process.argv;

if (name === 'dev')
  // Execute the vite to start the dev server.
  execute(`${bin('vite')}`);
else if (name === 'preview')
  // Execute the vite to start the server with dist.
  execute(`${bin('vite')}`);
else if (name === 'build')
  // Execute the vite with type checking and build.
  execute(`${bin('vue-tsc')} --noEmit && ${bin('vite')} build ${other.join(' ')}`);
