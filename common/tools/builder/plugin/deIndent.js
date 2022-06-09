'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var de_indent_1 = __importDefault(require('de-indent'));
// RegExp to determine template file.
var fileRegExp = /vue&type=template/g;
// RegExp to find and replace template content.
var tplRegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;
// Plugin to remove the lead indent in templates.
function default_1() {
  return {
    // Plugin name.
    name: 'de-indent',
    // Enforce order.
    enforce: 'pre',
    // Code transformation.
    transform: function (src, path) {
      if (fileRegExp.test(path))
        // De-indent source of template.
        return { code: de_indent_1['default'](src), map: null };
      if (path.endsWith('.vue'))
        // De-indent template by replacing it.
        return { code: src.replace(tplRegExp, de_indent_1['default'](src.match(tplRegExp)[0])), map: null };
    }
  };
}
exports['default'] = default_1;
