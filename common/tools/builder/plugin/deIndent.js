'use strict';
exports.__esModule = true;
// RegExp to determine SFC template.
var fileRegExp = /type=template/g;
// RegExp to replace SFC template content.
var tplRegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;
// Helper to remove the lead indent from code.
function deIndent(code) {
  return code === null || code === void 0 ? void 0 : code.replace(/^\s+/, '');
}
// Helper to remove the lead indent from vue template.
function deIndentTpl(code) {
  return code.replace(tplRegExp, deIndent(code.match(tplRegExp)[0]));
}
// Create the plugin output with transformed result.
function createPluginOutput(code) {
  return { code: code, map: null };
}
// Plugin to remove the lead indent in SFC templates.
function default_1() {
  return {
    // Plugin name.
    name: 'de-indent',
    // Enforce order.
    enforce: 'pre',
    // Code transformation.
    transform: function (code, path) {
      return path.endsWith('.vue')
        ? createPluginOutput(deIndentTpl(code))
        : path.endsWith('type=template&lang.js')
        ? createPluginOutput(deIndent(code))
        : createPluginOutput(code);
    }
  };
}
exports['default'] = default_1;
