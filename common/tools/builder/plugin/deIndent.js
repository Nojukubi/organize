'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
// RegExp to replace SFC template content.
const tplRegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;
// Helper to remove the lead indent from code.
function deIndent(code) {
  return code?.replace(/^\s+/, '');
}
// Helper to remove the lead indent from vue template.
function deIndentTpl(code) {
  // Determine whether code is exist in template.
  const tplCode = code.match(tplRegExp)?.[0];
  return tplCode ? code.replace(tplRegExp, deIndent(tplCode)) : code;
}
// Create the plugin output with transformed result.
function createPluginOutput(code) {
  return { code, map: null };
}
// Plugin to remove the lead indent in SFC templates.
function default_1() {
  return {
    // Plugin name.
    name: 'de-indent',
    // Enforce order.
    enforce: 'pre',
    // Code transformation.
    transform(code, path) {
      return path.endsWith('.vue')
        ? createPluginOutput(deIndentTpl(code))
        : path.endsWith('type=template&lang.js')
        ? createPluginOutput(deIndent(code))
        : createPluginOutput(code);
    }
  };
}
exports.default = default_1;
