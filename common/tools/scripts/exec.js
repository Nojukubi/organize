'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.execute = exports.bin = void 0;
const npm_which_1 = __importDefault(require('npm-which'));
const shelljs_1 = require('shelljs');
// Create an absolute path to the executable module of the command,
// which is installed in the local or global directory.
function bin(name) {
  return (0, npm_which_1.default)(__dirname).sync(name);
}
exports.bin = bin;
// Run the provided command asynchronously, monitor and inform about
// the progress and outcome of its execution.
function execute(command) {
  (0, shelljs_1.exec)(command, {
    async: true,
    stdio: 'inherit',
    env: { FORCE_COLOR: true }
  });
}
exports.execute = execute;
