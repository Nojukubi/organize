import type { Plugin, TransformResult } from 'vite';

// RegExp to determine SFC template.
const fileRegExp: RegExp = /type=template/g;

// RegExp to replace SFC template content.
const tplRegExp: RegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;

// Helper to remove the lead indent from code.
function deIndent(code: string): string {
  return code?.replace(/^\s+/, '');
}

// Helper to remove the lead indent from vue template.
function deIndentTpl(code: string): string {
  return code.replace(tplRegExp, deIndent(code.match(tplRegExp)[0]));
}

// Create the plugin output with transformed result.
function createPluginOutput(code: string): TransformResult {
  return { code, map: null };
}

// Plugin to remove the lead indent in SFC templates.
export default function (): Plugin {
  return {
    // Plugin name.
    name: 'de-indent',
    // Enforce order.
    enforce: 'pre',
    // Code transformation.
    transform(code: string, path: string): TransformResult {
      return path.endsWith('.vue')
        ? createPluginOutput(deIndentTpl(code))
        : path.endsWith('type=template&lang.js')
        ? createPluginOutput(deIndent(code))
        : createPluginOutput(code);
    }
  };
}
