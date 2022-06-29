import { sync as findLocal } from 'npm-which';
import { spawn, SpawnOptions, ChildProcess } from 'child_process';

// Current working directory.
const cwd: string = __dirname;

// An array containing the cli args.
const [, , name]: string[] = process.argv;

// Options for spawn to inherit stdio.
const spawnOptions: SpawnOptions = { stdio: 'inherit' };

// Run the command to start the dev server.
if (name === 'dev') execVite();
// Run the command to start the prod server.
else if (name === 'prod') execVite(['preview']);
// Run the command to build with type checking.
else if (name === 'build')
  execVueTsc().on('close', (code: number): void => {
    if (code === 0) execVite(['build']);
  });

// Execute the local vue tsc executable with args.
function execVueTsc(): ChildProcess {
  // Path to the local vue tsc executable.
  const vueTsc: string = findLocal('vue-tsc', { cwd });
  // Execute local executable with arguments.
  return spawn(vueTsc, ['--noEmit'], spawnOptions);
}

// Execute the local vite executable with args.
function execVite(args: string[] = []): ChildProcess {
  // Path to the local vite executable.
  const vite: string = findLocal('vite', { cwd });
  // Execute local executable with arguments.
  return spawn(vite, args, spawnOptions);
}
