import deIndent from 'de-indent';
import type { Plugin, TransformResult } from 'vite';

// RegExp to replace SFC template content.
const tplRegExp: RegExp = /(?<=<template[^>]*>)(.|\n)*?(?=<\/template>)/gm;

// Helper to remove the lead indent from code.
function deIndentCode(code: string): string {
  return deIndent(code)?.replace(/^\s+/, '');
}

// Helper to remove the lead indent from vue template.
function deIndentTpl(code: string): string {
  // Determine whether code is exist in template.
  const tplCode: string | undefined = code.match(tplRegExp)?.[0];
  return tplCode ? code.replace(tplRegExp, deIndentCode(tplCode)) : code;
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
        ? createPluginOutput(deIndentCode(code))
        : createPluginOutput(code);
    }
  };
}
