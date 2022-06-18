import { bin, execute } from './exec';

// An array containing the cli args.
const [, , name]: string[] = process.argv;

// Command execution based on the args.
if (name === 'dev')
  // Run the command to start the dev server.
  execute(bin('vite'));
else if (name === 'preview')
  // Run the command to start the prod server.
  execute(`${bin('vite')} preview`);
else if (name === 'build')
  // Run the command to start the build with type checking.
  execute(`${bin('vue-tsc')} --noEmit && ${bin('vite')} build`);
